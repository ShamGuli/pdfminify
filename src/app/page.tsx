import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import PDFCompressorWrapper from "@/components/PDFCompressorWrapper";

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
        next: { revalidate: 300 },
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

        {/* HERO */}
        <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pt-8 sm:gap-8 sm:px-6 sm:pt-14 lg:pt-16">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <p className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10">
              Compress PDFs in your browser — no upload
            </p>
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Compress PDF Files Online —{" "}
              <span className="text-primary">Free &amp; Instant</span>
            </h1>
            <p className="text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              Reduce PDF file size up to 80% without losing quality. No signup.
              No upload to server. Everything happens securely in your browser.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs sm:gap-3 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm shadow-slate-100 ring-1 ring-slate-200 sm:gap-2 sm:py-1">
              <span aria-hidden>🔒</span> 100% Private
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm shadow-slate-100 ring-1 ring-slate-200 sm:gap-2 sm:py-1">
              <span aria-hidden>⚡</span> Instant
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm shadow-slate-100 ring-1 ring-slate-200 sm:gap-2 sm:py-1">
              <span aria-hidden>✅</span> Free Forever
            </span>
          </div>
        </section>

        {/* COMPRESSOR */}
        <section className="mx-auto mt-6 max-w-5xl px-4 pb-10 sm:mt-8 sm:px-6 sm:pb-14 lg:pb-16">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
            <PDFCompressorWrapper />

            <div className="space-y-4 text-sm text-slate-600">
              <div className="rounded-xl bg-white p-4 shadow-sm shadow-slate-100">
                <h2 className="mb-1 text-sm font-semibold text-slate-900">
                  Why PDF Minify?
                </h2>
                <ul className="space-y-1.5">
                  <li>• Up to 80% smaller PDF files</li>
                  <li>• No uploads — everything stays on your device</li>
                  <li>• Perfect for email, sharing, and archiving</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                <p className="mb-1 font-medium text-slate-700">
                  Tip for best results:
                </p>
                <p>
                  PDFs with embedded images (screenshots, scans, presentations)
                  usually compress the most. Text-only PDFs are often already
                  optimized.
                </p>
              </div>
            </div>
          </div>

          {/* Rectangle ad under compressor */}
          <div className="mt-8 flex justify-center">
            <AdBanner
              className="w-full max-w-sm"
              slot="2222222222"
              style={{ display: "block", width: "100%", height: 280 }}
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
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
                title: "1. Upload",
                  desc: "Drag & drop your PDF files or browse from your device. We only accept PDF — no images or other file types.",
              },
              {
                title: "2. Compress",
                  desc: "PDF Minify optimizes your documents entirely in the browser. No files are ever uploaded to a server.",
              },
              {
                title: "3. Download",
                  desc: "Download individual compressed PDFs or all at once as a ZIP archive, ready to share or upload.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-xl bg-white p-4 shadow-sm shadow-slate-100"
              >
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
                desc: "Each PDF can be up to 50 MB — large enough for most reports, e‑books, and presentations.",
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

        {/* Related tools */}
        <section className="mx-auto max-w-5xl px-4 pb-6 sm:px-6 sm:pb-10">
          <div className="rounded-2xl bg-white p-4 text-xs text-slate-600 shadow-sm shadow-slate-100 sm:text-sm">
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              Related tools
            </h2>
            <p>
              Also try{" "}
              <a
                href="https://pngminify.com"
                className="text-primary underline-offset-2 hover:underline"
              >
                pngminify.com
              </a>
              ,{" "}
              <a
                href="https://miniwebp.com"
                className="text-primary underline-offset-2 hover:underline"
              >
                miniwebp.com
              </a>
              ,{" "}
              <a
                href="https://miniheic.com"
                className="text-primary underline-offset-2 hover:underline"
              >
                miniheic.com
              </a>{" "}
              and{" "}
              <a
                href="https://mp3mini.com"
                className="text-primary underline-offset-2 hover:underline"
              >
                mp3mini.com
              </a>{" "}
              for image and audio compression.
            </p>
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
          </div>
        </section>

        {/* RELATED TOOLS */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Related tools
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Coming soon — a full suite of minify tools.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "miniwebp.com",
                desc: "Compress WEBP images for ultra-light web assets.",
              },
              {
                name: "miniheic.com",
                desc: "Convert and compress HEIC photos from iOS devices.",
              },
              {
                name: "mp3mini.com",
                desc: "Reduce MP3 file size for podcasts and audio files.",
              },
              {
                name: "pdfminify.com",
                desc: "Shrink large PDF documents for faster sharing.",
              },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col justify-between rounded-xl bg-white p-4 text-sm text-slate-600 shadow-sm shadow-slate-100"
              >
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-slate-900">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-600 sm:text-sm">
                    {tool.desc}
                  </p>
                </div>
                <p className="mt-3 text-[11px] text-slate-400">
                  Placeholder — not yet available.
                </p>
              </div>
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
              Blog posts are coming soon. Check back for PNG optimization tips
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
                  {post.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="h-36 w-full object-cover"
                      loading="lazy"
                    />
                  )}
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
