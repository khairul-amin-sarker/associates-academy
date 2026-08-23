import { redirect } from "next/navigation";

export default async function LegacyCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  if (product === "fundamentals-income-tax-ebook") redirect("/ebook#checkout");
  redirect(`/checkout/${product || "income-tax-working-framework"}`);
}
