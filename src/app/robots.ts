import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*",           allow: "/", disallow: ["/api/","/takk"] },
      { userAgent: "GPTBot",      allow: "/" },
      { userAgent: "ClaudeBot",   allow: "/" },
      { userAgent: "PerplexityBot",allow:"/" },
      { userAgent: "Googlebot",   allow: "/" },
    ],
    sitemap: "https://rorlegger.io/sitemap.xml",
  };
}
