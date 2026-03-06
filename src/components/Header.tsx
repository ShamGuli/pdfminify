import Link from "next/link";
import MobileMenu from "./MobileMenu";

// Server Component — no "use client", no state, SSR-safe
export default function Header() {
  return (
    <header className="relative border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6 md:py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-white shadow-sm">
            PDF
          </span>
          <span className="text-base font-semibold text-slate-900 md:text-lg">
            PDF&nbsp;Minify
          </span>
        </Link>

        {/* Desktop nav — hidden on mobile, visible on md+ */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/blog" className="transition-colors hover:text-slate-900">Blog</Link>
          <Link href="/how-it-works" className="transition-colors hover:text-slate-900">How it works</Link>
          <Link href="/faq" className="transition-colors hover:text-slate-900">FAQ</Link>
        </nav>

        {/* Mobile burger — client component, visible on mobile only */}
        <MobileMenu />

      </div>
    </header>
  );
}
