import type { NextConfig } from "next";

const SUPABASE_HOSTNAME = "mhryztriafnzrueacpyk.supabase.co";
const SUPABASE_OLD_HOSTNAME = "esqntamdoeutxrfnwuya.supabase.co";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_HOSTNAME,
      },
      {
        protocol: "https",
        hostname: SUPABASE_OLD_HOSTNAME,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com blob:",
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data: blob: https://${SUPABASE_HOSTNAME} https://${SUPABASE_OLD_HOSTNAME} https://www.google-analytics.com https://www.googletagmanager.com https://www.google.az`,
              `connect-src 'self' https://${SUPABASE_HOSTNAME} https://${SUPABASE_OLD_HOSTNAME} https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com`,
              "font-src 'self' https://fonts.gstatic.com",
              "worker-src 'self' blob:",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, private",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
