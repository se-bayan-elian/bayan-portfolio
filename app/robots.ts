import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function robots(): MetadataRoute.Robots {
  const base = personal.siteUrl.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
