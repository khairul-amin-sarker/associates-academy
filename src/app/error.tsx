"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return <main className="grid min-h-[60vh] place-items-center p-6 text-center"><div><h1 className="font-heading text-4xl font-extrabold">Page load করা যায়নি</h1><p className="mt-3 text-muted-foreground">আবার চেষ্টা করুন; সমস্যা চলতে থাকলে support-এ জানান।</p><Button onClick={reset} className="mt-6">আবার চেষ্টা করুন</Button></div></main>;
}
