import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — PDF Minify Free Online PDF Compressor",
  description:
    "Answers to common questions about PDF Minify: pricing, privacy, file size limits, compression quality, and how browser-based PDF compression works.",
};

const faqs = [
  {
    q: "Is PDF Minify free?",
    a: "Yes. PDF Minify is completely free to use. There are no hidden fees or usage limits.",
  },
  {
    q: "Does my PDF get uploaded to a server?",
    a: "No. All compression happens locally in your browser using JavaScript. Your PDFs never leave your device.",
  },
  {
    q: "What is the maximum file size?",
    a: "Each PDF file can be up to 50 MB, and you can compress up to 20 files at a time.",
  },
  {
    q: "How much can I compress a PDF?",
    a: "It depends on the document. Many PDFs can be reduced by 30–80% without visible quality loss, especially if they contain large images.",
  },
  {
    q: "Do you support Word, JPG or other formats?",
    a: "PDF Minify focuses on PDF only. For images we recommend tools like pngminify.com, miniwebp.com, and miniheic.com.",
  },
  {
    q: "Can I use PDF Minify for commercial projects?",
    a: "Yes. You can use the compressed documents in any personal or commercial project.",
  },
  {
    q: "Is there a watermark on the output?",
    a: "No. Your documents stay clean — we do not add any watermarks or visual marks to your PDFs.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Frequently Asked Questions
          </h1>
          <p className="max-w-xl text-sm text-slate-600">
            Short answers to the most common questions about PDF Minify.
          </p>
        </header>

        <section className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-900">
                  {item.q}
                </span>
                <span className="text-xs text-slate-500 group-open:hidden">
                  +
                </span>
                <span className="hidden text-xs text-slate-500 group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                {item.a}
              </p>
            </details>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

