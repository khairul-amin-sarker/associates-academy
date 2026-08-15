import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/courses",
    "/courses/income-tax-working-framework",
    "/ebook",
    "/workshop",
    "/resources",
    "/about",
    "/business-address",
    "/contact",
    "/verify",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
    "/delivery-policy",
  ];
  return routes.map((route) => ({
    url: `${siteConfig.productionUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
