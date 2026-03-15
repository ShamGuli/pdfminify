import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How PDF Compression Works — Browser-Based & Private | PDF Minify",
  description:
    "Learn how PDF Minify compresses documents directly in your browser in three simple steps. No server upload, 100% private, works on any device.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <header className="space-y-3">
          <p className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10">
            How it works
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Compress PDFs in three simple steps
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            PDF Minify runs entirely in your browser. Your documents never leave
            your device — we simply transform them locally using modern
            compression techniques.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4 shadow-sm shadow-slate-100">
            <h2 className="mb-1 text-sm font-semibold text-slate-900">
              1. Upload
            </h2>
            <p className="text-xs text-slate-600 sm:text-sm">
              Drag &amp; drop your PDF files into the upload area or click the
              button to choose files from your computer. PDF Minify accepts PDF
              documents — other formats are gently rejected.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm shadow-slate-100">
            <h2 className="mb-1 text-sm font-semibold text-slate-900">
              2. Compress
            </h2>
            <p className="text-xs text-slate-600 sm:text-sm">
              For each file we run browser-side compression using
              JavaScript-based algorithms. Use the quality slider to balance
              file size and readability. All processing happens locally in your
              browser tab.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm shadow-slate-100">
            <h2 className="mb-1 text-sm font-semibold text-slate-900">
              3. Download
            </h2>
            <p className="text-xs text-slate-600 sm:text-sm">
              Once compression is finished, download individual PDFs or
              everything as a single ZIP. We never store or log your documents —
              after download, the data stays only with you.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

