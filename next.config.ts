import type { NextConfig } from "next";

const SUPABASE_HOSTNAME = "esqntamdoeutxrfnwuya.supabase.co";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_HOSTNAME,
      },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          ...(isDev
            ? []
            : [
                {
                  key: "Content-Security-Policy",
                  value: [
                    "default-src 'self'",
                    "script-src 'self' https://www.googletagmanager.com https://pagead2.googlesyndication.com 'unsafe-inline'",
                    "style-src 'self' 'unsafe-inline'",
                    `img-src 'self' data: https://${SUPABASE_HOSTNAME}`,
                    `connect-src 'self' https://${SUPABASE_HOSTNAME} https://www.google-analytics.com`,
                    "frame-ancestors 'none'",
                  ].join("; "),
                },
              ]),
        ],
      },
    ];
  },
};

export default nextConfig;
