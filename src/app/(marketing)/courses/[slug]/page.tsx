import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseLanding } from "@/components/marketing/course-landing";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "income-tax-working-framework") return {};
  return { title: "Fundamentals of Income Tax Act, 2023", description: "Act থেকে Return—complete practical Income Tax working framework." };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  if (slug !== "income-tax-working-framework") notFound();
  return <CourseLanding />;
}
