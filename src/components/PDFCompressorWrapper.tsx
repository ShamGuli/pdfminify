"use client";

import dynamic from "next/dynamic";

const PDFCompressor = dynamic(() => import("./PDFCompressor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60">
      <span className="text-sm text-slate-400">Loading compressor…</span>
    </div>
  ),
});

export default function PDFCompressorWrapper() {
  return <PDFCompressor />;
}
