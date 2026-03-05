import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  images: {
    domains: ["mhytrzfianfraueazcypvk.supabase.co"],
  },
  async headers() {
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
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://pagead2.googlesyndication.com 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://mhytrzfianfraueazcypvk.supabase.co; connect-src 'self' https://mhytrzfianfraueazcypvk.supabase.co; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
