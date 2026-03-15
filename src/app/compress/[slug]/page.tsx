import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PDFCompressorWrapper from "@/components/PDFCompressorWrapper";
import Link from "next/link";
import { seoVariants } from "@/lib/seo-variants";

// ── Static params for all variants ───────────────────────────────────────────

export function generateStaticParams() {
  return seoVariants.map((v) => ({ slug: v.slug }));
}

// ── Dynamic metadata ─────────────────────────────────────────────────────────

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const variant = seoVariants.find((v) => v.slug === slug);
  if (!variant) return {};

  const url = `https://pdfminify.com/compress/${variant.slug}`;

  return {
    title: variant.title,
    description: variant.description,
    keywords: variant.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: variant.title,
      description: variant.description,
      url,
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: variant.title,
      description: variant.description,
    },
  };
}

// ── JSON-LD schemas ──────────────────────────────────────────────────────────

function buildSchemas(variant: (typeof seoVariants)[number]) {
  const url = `https://pdfminify.com/compress/${variant.slug}`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: variant.h1,
    description: variant.description,
    url,
    isPartOf: { "@id": "https://pdfminify.com/#website" },
    about: { "@id": "https://pdfminify.com/#app" },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to ${variant.h1}`,
    description: variant.intro,
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your PDF",
        text: "Drag and drop your PDF file or click to browse from your device. You can upload up to 20 PDF files at once, each up to 50 MB in size.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust compression",
        text: variant.tip,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download compressed PDF",
        text: "Download the compressed file individually or all files as a convenient ZIP archive. Files are ready to email, upload, or share immediately.",
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: variant.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pdfminify.com" },
      { "@type": "ListItem", position: 2, name: "Compress", item: "https://pdfminify.com/compress" },
      { "@type": "ListItem", position: 3, name: variant.h1Short, item: url },
    ],
  };

  return [webPage, howTo, faq, breadcrumb];
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function VariantPage({ params }: PageProps) {
  const { slug } = await params;
  const variant = seoVariants.find((v) => v.slug === slug);
  if (!variant) notFound();

  const schemas = buildSchemas(variant);

  // Related variants (same category, excluding self, max 6)
  const related = seoVariants
    .filter((v) => v.category === variant.category && v.slug !== variant.slug)
    .slice(0, 6);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="flex min-h-screen flex-col bg-page">
        <Header />

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 text-xs text-slate-400"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/compress"
                className="hover:text-primary transition-colors"
              >
                Compress
              </Link>
              <span>/</span>
              <span className="text-slate-600 truncate">{variant.h1Short}</span>
            </nav>
          </div>

          {/* Hero */}
          <section className="mx-auto max-w-5xl px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
            <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 mb-3">
              {variant.category}
            </span>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl lg:text-4xl text-balance">
              {variant.h1}
            </h1>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed sm:text-base max-w-3xl">
              {variant.intro}
            </p>
          </section>

          {/* Tool */}
          <section className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/50 backdrop-blur-sm sm:p-6">
              <PDFCompressorWrapper />
            </div>

            {/* Tip */}
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4">
              <p className="text-xs font-semibold text-amber-800 mb-1">
                💡 Tip for this use case
              </p>
              <p className="text-xs text-amber-700 sm:text-sm">{variant.tip}</p>
            </div>
          </section>

          {/* How it works */}
          <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 sm:pb-12">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              How to {variant.h1Short.toLowerCase()}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  num: "1",
                  title: "Upload your PDF",
                  desc: "Drag & drop or browse. Max 20 files, 50 MB each.",
                },
                {
                  num: "2",
                  title: "Adjust compression",
                  desc: variant.tip,
                },
                {
                  num: "3",
                  title: "Download",
                  desc: "Get your compressed PDF instantly. Or download all as ZIP.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="rounded-xl bg-white p-4 shadow-sm shadow-slate-100"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {step.num}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 sm:text-sm">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          {variant.faqs.length > 0 && (
            <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 sm:pb-12">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {variant.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-900">
                        {faq.q}
                      </span>
                      <span className="text-xs text-slate-500 group-open:hidden">
                        +
                      </span>
                      <span className="hidden text-xs text-slate-500 group-open:inline">
                        −
                      </span>
                    </summary>
                    <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related use cases */}
          {related.length > 0 && (
            <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6 sm:pb-12">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Related use cases
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/compress/${r.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary sm:text-sm"
                  >
                    {r.h1Short}
                  </Link>
                ))}
                <Link
                  href="/compress"
                  className="rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10 sm:text-sm"
                >
                  All use cases →
                </Link>
              </div>
            </section>
          )}

          {/* Back links */}
          <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href="/"
                className="text-primary font-medium hover:underline"
              >
                ← Back to PDF Minify
              </Link>
              <Link
                href="/compress"
                className="text-slate-500 hover:text-primary transition-colors"
              >
                All use cases
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
