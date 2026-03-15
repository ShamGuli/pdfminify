import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About PDF Minify — Free Browser-Based PDF Compressor",
  description:
    "Learn about PDF Minify — a free, private, browser-based PDF compressor. No uploads, no signups, no watermarks. Compress PDFs directly in your browser.",
  alternates: { canonical: "https://pdfminify.com/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 text-sm text-slate-700 sm:px-6 sm:py-14 lg:py-16">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            About PDF Minify
          </h1>
        </header>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            Our Mission
          </h2>
          <p>
            PDF Minify was built with a simple goal: make PDF compression
            accessible, private, and free for everyone. We believe you
            shouldn&apos;t need to create an account, install software, or
            upload sensitive documents to a server just to make a PDF smaller.
          </p>
          <p>
            Every day, millions of people struggle with PDF files that are too
            large to email, upload, or share. PDF Minify solves this problem in
            seconds — directly in your browser, with zero compromise on privacy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-base font-semibold text-slate-900">
            What Makes PDF Minify Different
          </h2>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              100% Browser-Based
            </h3>
            <p>
              Unlike most PDF compressors that upload your files to remote
              servers, PDF Minify runs entirely in your browser. Your documents
              never leave your device. We use the open-source pdf-lib library to
              process files locally using JavaScript — no server, no cloud, no
              risk.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Truly Free, Forever
            </h3>
            <p>
              No freemium tricks. No &quot;compress 2 files free, then
              pay&quot; limits. No watermarks stamped on your output. PDF Minify
              is free to use for personal and commercial projects alike, with no
              usage limits.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">
              Built for Real Workflows
            </h3>
            <p>
              We support batch processing (up to 20 files at once), adjustable
              compression levels, and ZIP download — features designed for
              people who work with PDFs every day, not just once in a while.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            Our Technology
          </h2>
          <p>
            PDF Minify is powered by modern web technologies. Our compression
            engine runs client-side JavaScript using pdf-lib, an open-source PDF
            manipulation library. This means your files are processed entirely
            within your browser&apos;s memory — nothing is ever transmitted over
            the network.
          </p>
          <p>
            The website is built with Next.js and deployed on Vercel&apos;s edge
            network for fast loading worldwide. We continuously optimize our
            compression algorithms to deliver the best size reduction while
            preserving document quality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            Trust & Privacy
          </h2>
          <p>
            Privacy isn&apos;t a feature we bolt on — it&apos;s the foundation
            of how PDF Minify works. Since all processing happens in your
            browser, we physically cannot access, read, or store your documents.
            There are no analytics on file content, no tracking of what you
            compress, and no server logs containing your data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            Get in Touch
          </h2>
          <p>
            Have questions, feedback, or feature requests? We&apos;d love to
            hear from you.{" "}
            <Link
              href="/contact"
              className="text-primary underline-offset-2 hover:underline"
            >
              Contact us
            </Link>{" "}
            or email us at{" "}
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
