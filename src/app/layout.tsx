import type { Metadata, Viewport } from "next";
import { Baloo_Da_2, Hind_Siliguri } from "next/font/google";
import { AppProviders } from "@/components/app-providers";
import { AnalyticsRuntime } from "@/components/analytics/analytics-runtime";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const directionContract = `
THESIS: A complete return is a reviewed client dossier, not a portal-entry course; refuse the generic card-grid course hero.
OWN-WORLD: Warm legal paper, ink navy, muted indigo, brass-gold rules, case folders, exhibit indexes, stamps, and restrained 12–16px corners.
STORY: Recognize the full client-file problem, see the documents-to-submission method, verify the five-module depth and instructor credibility, then enroll through the existing checkout.
FIRST VIEWPORT: Under the shared header, an open dossier fills the screen: a large working sheet carries the Bengali promise and actions; a navy folder, evidence strip, and numbered exhibit index demonstrate the 14-step workflow. Mobile stacks the sheet before a compact index.
FORM: Return Dossier Spread, ranked 1st; Client File Atlas lends route clarity; seed 8503b9c9.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
`.trim();

const bodyFont = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Baloo_Da_2({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: { icon: "/brand/logo.png", apple: "/brand/logo.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111844",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      className={`${bodyFont.variable} ${displayFont.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <div
          aria-hidden="true"
          className="hidden"
          dangerouslySetInnerHTML={{
            __html: `<!-- ${directionContract.replaceAll("--", "—")} -->`,
          }}
        />
        <AppProviders>
          {children}
          <AnalyticsRuntime />
        </AppProviders>
      </body>
    </html>
  );
}
