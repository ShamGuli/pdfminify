"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

type FileStatus = "idle" | "processing" | "done" | "error" | "warn";

type Item = {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  compressedSize?: number;
  percentSaved?: number;
  status: FileStatus;
  error?: string;
  progress: number;
  downloadUrl?: string;
  compressedBlob?: Blob;
};

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value >= 10 || units[i] === "B" ? 0 : 1)} ${units[i]}`;
}

function calcPercent(original: number, compressed: number): number {
  if (!original || !compressed) return 0;
  return Math.max(0, Math.round(((original - compressed) / original) * 100));
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function renderPdfToBlob(
  buffer: ArrayBuffer,
  scale: number,
  jpegQuality: number,
  onProgress: (pct: number) => void,
): Promise<Blob> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const pdfDoc = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
  const numPages = pdfDoc.numPages;
  const outputPdf = await PDFDocument.create();

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport,
    }).promise;

    const jpeg = canvas.toDataURL("image/jpeg", jpegQuality).split(",")[1];
    const img = await outputPdf.embedJpg(base64ToUint8Array(jpeg));
    const newPage = outputPdf.addPage([canvas.width, canvas.height]);
    newPage.drawImage(img, { x: 0, y: 0, width: canvas.width, height: canvas.height });

    canvas.width = 1;
    canvas.height = 1;

    onProgress(10 + Math.round((i / numPages) * 75));
  }

  onProgress(90);
  const bytes = await outputPdf.save({ useObjectStreams: true });
  return new Blob([bytes], { type: "application/pdf" });
}

async function compressPdfCanvas(
  buffer: ArrayBuffer,
  quality: number,
  originalSize: number,
  onProgress: (pct: number) => void,
): Promise<Blob> {
  onProgress(5);

  // quality 0.1 → scale 0.45, jpegQ 0.18  (aggressive)
  // quality 1.0 → scale 1.3,  jpegQ 0.78  (high quality)
  const scale = 0.45 + quality * 0.85;
  const jpegQuality = 0.18 + quality * 0.6;

  let result = await renderPdfToBlob(buffer, scale, jpegQuality, onProgress);

  // If result is still bigger than original, retry with more aggressive settings
  if (result.size >= originalSize) {
    onProgress(10);
    result = await renderPdfToBlob(buffer, 0.45, 0.18, onProgress);
  }

  onProgress(98);
  return result;
}

const MAX_FILES = 20;
const MAX_SIZE_BYTES = 50 * 1024 * 1024;

export default function PDFCompressor() {
  const [items, setItems] = useState<Item[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(0.4);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateItem = useCallback(
    (id: string, patch: Partial<Item>) =>
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      ),
    [],
  );

  const resetAll = useCallback(() => {
    setItems((current) => {
      current.forEach((item) => {
        if (item.downloadUrl) URL.revokeObjectURL(item.downloadUrl);
      });
      return [];
    });
    setErrorMessage(null);
  }, []);

  const compressFile = useCallback(
    async (item: Item) => {
      try {
        updateItem(item.id, { status: "processing", progress: 5 });

        const buffer = await item.file.arrayBuffer();

        const compressedBlob = await compressPdfCanvas(
          buffer,
          quality,
          item.originalSize,
          (pct) => updateItem(item.id, { progress: pct }),
        );

        const compressedSize = compressedBlob.size;

        if (compressedSize >= item.originalSize) {
          const url = URL.createObjectURL(item.file);
          updateItem(item.id, {
            status: "warn",
            compressedSize,
            percentSaved: 0,
            progress: 100,
            downloadUrl: url,
            compressedBlob: item.file,
            error:
              "Compressed file is not smaller than original. Original will be downloaded.",
          });
          return;
        }

        const downloadUrl = URL.createObjectURL(compressedBlob);
        updateItem(item.id, {
          status: "done",
          compressedSize,
          percentSaved: calcPercent(item.originalSize, compressedSize),
          progress: 100,
          downloadUrl,
          compressedBlob,
        });
      } catch (err) {
        updateItem(item.id, {
          status: "error",
          error: (err as Error)?.message ?? "Compression failed.",
          progress: 100,
        });
      }
    },
    [quality, updateItem],
  );

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setErrorMessage(null);

      const selected = Array.from(files);
      const valid: File[] = [];
      const errors: string[] = [];

      if (selected.length + items.length > MAX_FILES) {
        errors.push(`Maximum ${MAX_FILES} files allowed at once.`);
      }

      for (const file of selected) {
        const isPdf =
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {
          errors.push(
            `Only PDF files are supported. "${file.name}" is not a PDF file.`,
          );
          continue;
        }

        if (file.size > MAX_SIZE_BYTES) {
          errors.push(`"${file.name}" exceeds the 50 MB limit.`);
          continue;
        }

        valid.push(file);
      }

      if (errors.length) setErrorMessage([...new Set(errors)].join(" "));
      if (!valid.length) return;

      const newItems: Item[] = valid.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        file,
        name: file.name,
        originalSize: file.size,
        status: "processing",
        progress: 5,
      }));

      setItems((prev) => [...prev, ...newItems]);

      for (const item of newItems) {
        // eslint-disable-next-line no-await-in-loop
        await compressFile(item);
      }
    },
    [items.length, compressFile],
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(event.target.files);
      event.target.value = "";
    },
    [handleFiles],
  );

  const [isDragInvalid, setIsDragInvalid] = useState(false);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      setIsDragInvalid(false);

      const files = event.dataTransfer.files;
      const allNonPdf =
        files.length > 0 &&
        Array.from(files).every(
          (f) =>
            f.type !== "application/pdf" &&
            !f.name.toLowerCase().endsWith(".pdf"),
        );

      if (allNonPdf) {
        setErrorMessage("Only PDF files are supported. Please drop PDF documents.");
        return;
      }

      handleFiles(files);
    },
    [handleFiles],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const hasNonPdf = Array.from(event.dataTransfer.items).some(
      (item) => item.kind === "file" && item.type !== "application/pdf",
    );
    setIsDragInvalid(hasNonPdf);
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setIsDragInvalid(false);
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const completed = items.filter(
      (item) =>
        (item.status === "done" || item.status === "warn") &&
        item.compressedBlob,
    );
    if (!completed.length) return;

    const zip = new JSZip();
    setIsZipping(true);
    try {
      completed.forEach((item) => {
        if (item.compressedBlob) {
          zip.file(
            item.name.toLowerCase().endsWith(".pdf")
              ? item.name.replace(/\.pdf$/i, "-min.pdf")
              : `${item.name}-min.pdf`,
            item.compressedBlob,
          );
        }
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pdfminify-compressed.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMessage((err as Error)?.message ?? "Failed to create ZIP.");
    } finally {
      setIsZipping(false);
    }
  }, [items]);

  const anyDone = useMemo(
    () => items.some((i) => i.status === "done" || i.status === "warn"),
    [items],
  );

  const qualityLabel =
    quality <= 0.3
      ? "Maximum compression"
      : quality <= 0.55
        ? "Strong compression"
        : quality <= 0.75
          ? "Balanced"
          : "High quality";

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      <div
        className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition-colors sm:px-8 sm:py-10 ${
          isDragging && isDragInvalid
            ? "border-red-400 bg-red-50"
            : isDragging
              ? "border-primary bg-primary/5"
              : "border-slate-300 bg-white/60 hover:border-primary/60 hover:bg-primary/5"
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={onInputChange}
        />

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Drop PDF files here to start
        </div>

        <div className="mt-3 w-full space-y-3">
          <p className="text-sm text-slate-600">
            Drag &amp; drop PDF documents or click to browse.
          </p>
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm shadow-primary/40 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto sm:py-2.5"
            >
              Choose PDF files
            </button>
            <p className="text-xs text-slate-500">
              Max {MAX_FILES} files • PDF only • &lt; 50 MB each.
            </p>
          </div>
        </div>

        {/* Quality slider */}
        <div
          className="mt-5 w-full max-w-sm space-y-2 sm:max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Compression level</span>
            <span className="font-medium text-primary">{qualityLabel}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Pages are rendered as images for maximum compression. Text will not be selectable in output.
          </p>
        </div>

        {errorMessage && (
          <p className="mt-3 w-full max-w-sm text-xs text-red-600 sm:max-w-md">
            {errorMessage}
          </p>
        )}
      </div>

      {/* File list */}
      {items.length > 0 && (
        <div className="space-y-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-100 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-800">
              Files ({items.length})
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDownloadAll}
                disabled={!anyDone || isZipping}
                className="flex-1 rounded-full border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none sm:py-1.5"
              >
                {isZipping ? "Preparing ZIP…" : "Download all"}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="flex-1 rounded-full border border-transparent px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:flex-none sm:py-1.5"
              >
                Compress another
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const isDone = item.status === "done";
              const isWarn = item.status === "warn";
              const isError = item.status === "error";
              const isProcessing = item.status === "processing";

              const barColor = isError
                ? "bg-red-500"
                : isWarn
                  ? "bg-amber-400"
                  : isDone
                    ? "bg-emerald-500"
                    : "bg-primary";

              const statusText = isError
                ? "Error"
                : isWarn
                  ? "No savings"
                  : isDone
                    ? "Done"
                    : isProcessing
                      ? "Compressing…"
                      : "Waiting";

              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-900 sm:text-sm">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {formatBytes(item.originalSize)}
                        {typeof item.compressedSize === "number" && (
                          <>
                            {" "}→ {formatBytes(item.compressedSize)}{" "}
                            {typeof item.percentSaved === "number" &&
                              item.percentSaved > 0 && (
                                <span className="font-semibold text-emerald-600">
                                  (−{item.percentSaved}%)
                                </span>
                              )}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[11px] text-slate-400">
                        {statusText}
                      </span>
                      {item.downloadUrl && (
                        <a
                          href={item.downloadUrl}
                          download={
                            item.name.toLowerCase().endsWith(".pdf")
                              ? item.name.replace(/\.pdf$/i, "-min.pdf")
                              : `${item.name}-min.pdf`
                          }
                          className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-primary/40 transition hover:bg-primary/90 active:scale-95"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-300`}
                      style={{ width: `${Math.min(100, item.progress)}%` }}
                    />
                  </div>

                  {item.error && (
                    <p className="mt-1 text-[11px] text-amber-600">
                      {item.error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
