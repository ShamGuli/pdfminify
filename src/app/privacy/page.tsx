import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — PDF Minify",
  description:
    "Learn how PDF Minify handles your data. All PDF compression runs entirely in your browser — no uploads, no tracking.",
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10 text-sm text-slate-700 sm:px-6 sm:py-14 lg:py-16">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: {year}</p>
        </header>

        <section className="space-y-3">
          <p>
            PDF Minify is a simple utility for compressing PDF documents in your
            browser. We have designed the tool to be privacy-first by default.
          </p>

          <h2 className="text-sm font-semibold text-slate-900">
            1. No document uploads
          </h2>
          <p>
            All compression happens entirely in your browser using
            JavaScript-based algorithms. Your PDF files are never sent to our
            servers or any third party service. The documents remain on your
            device at all times.
          </p>

          <h2 className="text-sm font-semibold text-slate-900">
            2. No tracking or analytics
          </h2>
          <p>
            We do not use cookies, analytics scripts, or any form of tracking
            to identify you or your usage. We are not interested in who you are
            or what you compress.
          </p>

          <h2 className="text-sm font-semibold text-slate-900">
            3. Temporary in-memory processing
          </h2>
          <p>
            When you drop a PDF file onto PDF Minify, it is processed directly
            in the open browser tab. Once you close or refresh the page,
            everything is cleared from memory by your browser.
          </p>

          <h2 className="text-sm font-semibold text-slate-900">4. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can reach us
            at{" "}
            <a
              href="mailto:hello@pdfminify.com"
              className="text-primary underline-offset-2 hover:underline"
            >
              hello@pdfminify.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

