import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SchemaOrg from "@/components/SchemaOrg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "Free PDF Compressor Online — Reduce PDF Size | PDF Minify";
const siteDescription =
  "Compress PDF files online for free. Reduce file size up to 80% without losing quality. No upload to server — 100% private.";
const siteUrl = "https://pdfminify.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "compress pdf", "pdf compressor", "reduce pdf size", "shrink pdf",
    "pdf compressor online", "compress pdf free", "pdf file size reducer",
    "compress pdf without losing quality", "pdf minify", "free pdf compressor",
    "reduce pdf file size", "pdf size reducer online", "compress pdf for email",
  ],
  authors: [{ name: "PDF Minify", url: siteUrl }],
  creator: "PDF Minify",
  publisher: "PDF Minify",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "PDF Minify",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PDF Minify — Free PDF Compressor Online",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: "@pdfminify",
    creator: "@pdfminify",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#E53E3E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-FZNJ23Y16C";
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-page text-slate-900`} suppressHydrationWarning>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>

        {adsenseId && (
          <Script
            id="adsense-init"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}

        <SchemaOrg />
        {children}
      </body>
    </html>
  );
}
