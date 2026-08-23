"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const preferenceKey = "aa_analytics_preference";
const sessionKey = "aa_analytics_session";
const openPreferenceEvent = "aa:open-analytics-preferences";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const metaEventNames: Record<string, string> = {
  page_view: "PageView",
  cta_click: "ViewContent",
  checkout_started: "InitiateCheckout",
  payment_initiated: "AddPaymentInfo",
  verified_purchase: "Purchase",
};

function readPreference() {
  if (typeof window === "undefined") return "enabled";
  return window.localStorage.getItem(preferenceKey) === "disabled"
    ? "disabled"
    : "enabled";
}

function getSessionId() {
  const current = window.localStorage.getItem(sessionKey);
  if (current) return current;
  const id = crypto.randomUUID();
  window.localStorage.setItem(sessionKey, id);
  return id;
}

function sendEvent(name: string, properties: Record<string, unknown> = {}) {
  if (readPreference() === "disabled") return;
  const eventId = crypto.randomUUID();
  const payload = JSON.stringify({
    eventId,
    sessionId: getSessionId(),
    name,
    path: window.location.pathname,
    occurredAt: new Date().toISOString(),
    properties,
  });
  if (
    !navigator.sendBeacon(
      "/api/analytics/events",
      new Blob([payload], { type: "application/json" }),
    )
  ) {
    void fetch("/api/analytics/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }
  const metaEventName = metaEventNames[name];
  if (metaEventName && window.fbq) {
    window.fbq("track", metaEventName, properties, { eventID: eventId });
  }
}

function Runtime() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [preference, setPreference] = useState<"enabled" | "disabled">(() =>
    readPreference(),
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const sentScroll = useRef(new Set<number>());
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (preference === "disabled") return;
    const utm = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"]
        .map((key) => [key, searchParams.get(key)])
        .filter(([, value]) => Boolean(value)),
    );
    sendEvent("page_view", {
      title: document.title,
      referrer: document.referrer || null,
      ...utm,
    });
    sentScroll.current.clear();
  }, [pathname, searchParams, preference]);

  useEffect(() => {
    if (preference === "disabled") return;
    const milestones = [25, 50, 75, 90];
    let ticking = false;
    const measure = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        available > 0 ? Math.round((window.scrollY / available) * 100) : 100;
      milestones.forEach((milestone) => {
        if (percent >= milestone && !sentScroll.current.has(milestone)) {
          sentScroll.current.add(milestone);
          sendEvent("scroll_depth", { percent: milestone });
        }
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, preference]);

  useEffect(() => {
    const openPreferencePanel = () => setPanelOpen(true);
    window.addEventListener(openPreferenceEvent, openPreferencePanel);
    return () =>
      window.removeEventListener(openPreferenceEvent, openPreferencePanel);
  }, []);

  const disable = useCallback(() => {
    window.localStorage.setItem(preferenceKey, "disabled");
    window.localStorage.removeItem(sessionKey);
    document.cookie =
      "aa_analytics_optout=1; Path=/; Max-Age=31536000; SameSite=Lax";
    setPreference("disabled");
    setPanelOpen(false);
  }, []);

  const enable = useCallback(() => {
    window.localStorage.setItem(preferenceKey, "enabled");
    document.cookie = "aa_analytics_optout=; Path=/; Max-Age=0; SameSite=Lax";
    setPreference("enabled");
    setPanelOpen(false);
  }, []);

  return (
    <>
      {preference === "enabled" && gaId ? (
        <GoogleAnalytics gaId={gaId} />
      ) : null}
      {preference === "enabled" && metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');`}
        </Script>
      ) : null}

      {panelOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Analytics privacy settings"
          className="bg-brand-navy/35 fixed inset-0 z-[60] grid place-items-end p-3 sm:place-items-center"
        >
          <div className="bg-card w-full max-w-md rounded-2xl border p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-xl font-bold">
                  Analytics preference
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  সাইট উন্নত করতে anonymous usage data default-ভাবে সংগ্রহ হয়।
                  চাইলে এখনই বন্ধ করতে পারেন।
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPanelOpen(false)}
                aria-label="বন্ধ করুন"
              >
                <X />
              </Button>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {preference === "disabled" ? (
                <Button onClick={enable}>Analytics চালু করুন</Button>
              ) : (
                <Button variant="outline" onClick={disable}>
                  Analytics বন্ধ করুন
                </Button>
              )}
              <Button variant="ghost" onClick={() => setPanelOpen(false)}>
                বর্তমান setting রাখুন
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function AnalyticsRuntime() {
  return (
    <Suspense fallback={null}>
      <Runtime />
    </Suspense>
  );
}

export function AnalyticsPreferenceTrigger({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(openPreferenceEvent))}
      className={className}
      aria-label="Analytics privacy settings"
    >
      <ShieldCheck className="h-4 w-4" aria-hidden />
    </button>
  );
}

export { sendEvent as trackAnalyticsEvent };
