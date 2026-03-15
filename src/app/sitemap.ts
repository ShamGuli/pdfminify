import type { MetadataRoute } from "next";
import { seoVariants } from "@/lib/seo-variants";

const SITE_URL = "https://pdfminify.com";
const LAST_UPDATED = "2026-03-15T00:00:00Z";

type Post = {
  slug: string;
  updated_at: string | null;
};

async function getBlogPosts(): Promise<Post[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) return [];

    const res = await fetch(
      `${supabaseUrl}/rest/v1/posts?select=slug,updated_at&published=eq.true&order=updated_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];
    return (await res.json()) as Post[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/compress`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/how-it-works`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  // Programmatic SEO variant pages
  const variantRoutes: MetadataRoute.Sitemap = seoVariants.map((v) => ({
    url: `${SITE_URL}/compress/${v.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...variantRoutes];
}
