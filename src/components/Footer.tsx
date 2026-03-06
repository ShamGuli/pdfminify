import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:text-sm">
        <p className="order-2 sm:order-1">
          © {year} PDF Minify. All rights reserved.
        </p>
        <div className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2 sm:justify-end">
          <Link href="/privacy" className="transition-colors hover:text-slate-800">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-slate-800">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-slate-800">
            Contact
          </Link>
          <a
            href="mailto:hello@pdfminify.com"
            className="transition-colors hover:text-slate-800"
          >
            hello@pdfminify.com
          </a>
        </div>
      </div>
    </footer>
  );
}
