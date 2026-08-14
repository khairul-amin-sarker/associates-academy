"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return <html lang="bn"><body><main className="grid min-h-screen place-items-center bg-[#f8f3eb] p-6 text-center text-[#111844]"><div><h1 style={{ fontSize: 42, fontWeight: 800 }}>কিছু একটা ঠিকমতো কাজ করেনি</h1><p style={{ color: "#66708b" }}>সমস্যাটি report হয়েছে। আবার চেষ্টা করুন।</p><button onClick={reset} style={{ marginTop: 24, borderRadius: 10, background: "#111844", color: "white", padding: "12px 20px" }}>আবার চেষ্টা করুন</button></div></main></body></html>;
}
