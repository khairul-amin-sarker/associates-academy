import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/dashboard/", "/profile", "/checkout", "/api/"] }], sitemap: `${siteConfig.productionUrl}/sitemap.xml`, host: siteConfig.productionUrl }; }
