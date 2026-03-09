import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { variantCategories } from "@/lib/seo-variants";

export const metadata: Metadata = {
  title: "PDF Compression Use Cases — Compress PDF for Any Situation",
  description:
    "Browse 200+ PDF compression use cases: compress for email, reduce to specific sizes, optimize for platforms and industries. Free online tool.",
  alternates: { canonical: "https://pdfminify.com/compress" },
};

export default function CompressIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12">
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            PDF Compression Use Cases
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Find the perfect compression settings for your specific needs.
            Every use case includes the same free, browser-based PDF compressor.
          </p>
        </section>

        {variantCategories
          .filter((cat) => cat.variants.length > 0)
          .map((cat) => (
            <section
              key={cat.key}
              className="mx-auto max-w-5xl px-4 pb-8 sm:px-6"
            >
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                {cat.label}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cat.variants.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/compress/${v.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary sm:text-sm"
                  >
                    {v.h1Short}
                  </Link>
                ))}
              </div>
            </section>
          ))}
      </main>
      <Footer />
    </div>
  );
}
