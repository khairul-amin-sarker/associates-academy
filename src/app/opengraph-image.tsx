import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt =
  "Associates Academy — Tax, VAT, Legal & Professional Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f3ecdf",
        color: "#111844",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "70px 80px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
        <div
          style={{
            color: "#c99a2e",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          ASSOCIATES ACADEMY
        </div>
        <div
          style={{
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 28,
          }}
        >
          Tax, VAT, Legal & Professional Learning
        </div>
        <div style={{ color: "#4b5694", fontSize: 28, marginTop: 24 }}>
          {siteConfig.description}
        </div>
      </div>
      <img
        src={`${siteConfig.url}/brand/logo.png`}
        width={260}
        height={260}
        alt=""
        style={{ objectFit: "contain" }}
      />
    </div>,
    size,
  );
}
