import type { Metadata } from "next";
import { EbookSalesPage } from "@/components/ebook/ebook-sales-page";

export const metadata: Metadata = {
  title: "Fundamentals of Income Tax Act, 2023 (eBook)",
  description:
    "আয়কর আইন, ২০২৩—১২৩ পৃষ্ঠার বাংলা সচিত্র learning guide। ৬টি module, ৪০+ table, TDS Rate Matrix ও worked example সহ।",
};

export default function EbookPage() {
  return <EbookSalesPage />;
}
