import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/courses", "/courses/income-tax-working-framework", "/ebook", "/workshop", "/resources", "/about", "/contact", "/verify", "/privacy", "/terms", "/refund-policy"];
  return routes.map((route) => ({ url: `${siteConfig.productionUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "daily" : "weekly", priority: route === "" ? 1 : 0.7 }));
}
