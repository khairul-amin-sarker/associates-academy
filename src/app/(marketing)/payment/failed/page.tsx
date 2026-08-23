import Link from "next/link";
import type { Route } from "next";
import { redirect } from "next/navigation";

type Props = { searchParams: Promise<{ invoice?: string }> };

export default async function LegacyPaymentFailed({ searchParams }: Props) {
  const { invoice } = await searchParams;
  if (invoice)
    redirect(`/payment/result?invoice=${encodeURIComponent(invoice)}` as Route);
  return (
    <main className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <h1 className="font-heading text-3xl font-extrabold">
          Payment verify হয়নি
        </h1>
        <Link
          href={"/payment/recovery" as Route}
          className="text-brand-indigo mt-4 block font-bold"
        >
          Invoice দিয়ে recovery করুন
        </Link>
      </div>
    </main>
  );
}
