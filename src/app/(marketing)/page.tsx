import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/home-page";
import { getHomeContent } from "@/lib/content/pages";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Page() {
  const content = await getHomeContent();
  return <HomePage content={content} />;
}
