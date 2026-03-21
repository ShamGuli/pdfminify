import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import PDFCompressorWrapper from "@/components/PDFCompressorWrapper";
import Link from "next/link";
import { seoVariants } from "@/lib/seo-variants";

type BlogPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  cover_image?: string | null;
  created_at?: string | null;
};

async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) return [];

    const res = await fetch(
      `${supabaseUrl}/rest/v1/posts?select=slug,title,excerpt,cover_image,created_at&published=eq.true&order=created_at.desc&limit=3`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) return [];
    return (await res.json()) as BlogPost[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getLatestPosts();

  // Pick featured variants for internal linking
  const featuredVariants = seoVariants
    .filter((v) => v.category !== "general")
    .slice(0, 12);

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Header />

      <main className="flex-1">
        {/* Top leaderboard ad */}
        <section className="mx-auto mt-2 w-full max-w-5xl px-4 sm:px-6">
          <AdBanner
            className="mx-auto flex justify-center"
            slot="1111111111"
            style={{
              display: "block",
              width: "100%",
              maxWidth: 728,
              height: 90,
            }}
          />
        </section>

        {/* ── HERO + TOOL (combined, tool-first design) ────────────────── */}
        <section className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10">
          {/* Compact hero text */}
          <div className="mb-5 max-w-3xl space-y-2 sm:mb-6 sm:space-y-3">
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Compress PDF Files Online —{" "}
              <span className="text-primary">Free &amp; Instant</span>
            </h1>
            <p className="text-pretty text-sm leading-relaxed text-slate-600">
              Reduce PDF file size up to 80% without losing quality. No signup.
              No upload to server. Everything happens securely in your browser.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm shadow-slate-100 ring-1 ring-slate-200">
                <span aria-hidden>🔒</span> 100% Private
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm shadow-slate-100 ring-1 ring-slate-200">
                <span aria-hidden>⚡</span> Instant
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm shadow-slate-100 ring-1 ring-slate-200">
                <span aria-hidden>✅</span> Free Forever
              </span>
            </div>
          </div>

          {/* TOOL — full width, prominent */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/50 backdrop-blur-sm sm:p-6">
            <PDFCompressorWrapper />
          </div>

          {/* Quick info bar under tool */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm shadow-slate-100 ring-1 ring-slate-100">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm">🛡️</span>
              <div>
                <p className="text-xs font-semibold text-slate-900">100% Browser-Side</p>
                <p className="text-[11px] text-slate-500">Files never leave your device</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm shadow-slate-100 ring-1 ring-slate-100">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm">📦</span>
              <div>
                <p className="text-xs font-semibold text-slate-900">Batch Processing</p>
                <p className="text-[11px] text-slate-500">Up to 20 files, 50 MB each</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm shadow-slate-100 ring-1 ring-slate-100">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-sm">💎</span>
              <div>
                <p className="text-xs font-semibold text-slate-900">No Watermark</p>
                <p className="text-[11px] text-slate-500">Clean output, no branding added</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rectangle ad under compressor */}
        <div className="mx-auto mt-8 flex max-w-5xl justify-center px-4 sm:px-6">
          <AdBanner
            className="w-full max-w-sm"
            slot="2222222222"
            style={{ display: "block", width: "100%", height: 280 }}
          />
        </div>

        {/* HOW IT WORKS */}
        <section className="mx-auto mt-10 max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              How it works
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Three simple steps to smaller PDFs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                num: "1",
                title: "Upload",
                desc: "Drag & drop your PDF files or browse from your device. We only accept PDF — no images or other file types.",
              },
              {
                num: "2",
                title: "Compress",
                desc: "PDF Minify optimizes your documents entirely in the browser. No files are ever uploaded to a server.",
              },
              {
                num: "3",
                title: "Download",
                desc: "Download individual compressed PDFs or all at once as a ZIP archive, ready to share or upload.",
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

        {/* FEATURES */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
          <h2 className="mb-5 text-xl font-semibold text-slate-900 sm:text-2xl">
            Features for modern workflows
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Browser-side only",
                desc: "Compression runs in your browser. Documents are never uploaded to any server.",
              },
              {
                title: "Batch compression",
                desc: "Drop up to 20 PDF files at once and compress them in a single run.",
              },
              {
                title: "Smart document compression",
                desc: "Optimize PDFs while preserving text, images, and structure so they stay easy to read and share.",
              },
              {
                title: "Practical size limits",
                desc: "Each PDF can be up to 50 MB — large enough for most reports, e-books, and presentations.",
              },
              {
                title: "Free forever",
                desc: "No paywalls, no credits. PDF Minify is free to use for everyone.",
              },
              {
                title: "No watermark",
                desc: "Your documents stay clean — we never stamp or modify them beyond compression.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-4 text-sm text-slate-600 shadow-sm shadow-slate-100"
              >
                <h3 className="mb-1 text-sm font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 sm:text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR USE CASES — Programmatic SEO internal linking */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
          <h2 className="mb-5 text-xl font-semibold text-slate-900 sm:text-2xl">
            Popular compression use cases
          </h2>
          <div className="flex flex-wrap gap-2">
            {featuredVariants.map((v) => (
              <Link
                key={v.slug}
                href={`/compress/${v.slug}`}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary sm:text-sm"
              >
                {v.h1Short}
              </Link>
            ))}
            <Link
              href="/compress"
              className="rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10 sm:text-sm"
            >
              View all use cases →
            </Link>
          </div>
        </section>


        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
          <h2 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {[
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
                a: "It depends on the content. Many PDFs can be reduced by 30–80% without visible quality loss, especially if they contain large embedded images.",
              },
              {
                q: "Do you support Word, JPG, or other formats?",
                a: "PDF Minify is focused on PDF only. For images we recommend tools like pngminify.com, miniwebp.com, and miniheic.com.",
              },
              {
                q: "Can I use PDF Minify for commercial projects?",
                a: "Yes. You can use the compressed PDFs in any personal or commercial project.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-900">
                    {item.q}
                  </span>
                  <span className="text-xs text-slate-500 group-open:hidden">+</span>
                  <span className="hidden text-xs text-slate-500 group-open:inline">−</span>
                </summary>
                <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              From the blog
            </h2>
            <a
              href="/blog"
              className="text-xs font-medium text-primary hover:underline sm:text-sm"
            >
              View all posts
            </a>
          </div>

          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">
              Blog posts are coming soon. Check back for PDF compression tips
              and best practices.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col overflow-hidden rounded-xl bg-white text-sm text-slate-700 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover_image || "/og.png"}
                    alt={post.title}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-slate-900">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="line-clamp-3 text-xs text-slate-600 sm:text-sm">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    {post.created_at && (
                      <p className="mt-3 text-[11px] text-slate-400">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
