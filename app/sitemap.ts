import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.domain, lastModified: new Date(), priority: 1 },
    { url: `${SITE.domain}/resume`, lastModified: new Date(), priority: 0.8 },
  ];
}
