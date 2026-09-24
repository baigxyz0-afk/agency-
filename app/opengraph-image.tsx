import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf6f0",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#b5622c", letterSpacing: 4 }}>
          {siteConfig.shortName.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, color: "#171614", maxWidth: 900, lineHeight: 1.15 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6f6a61" }}>
            Full-Stack Development &amp; SEO Agency
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
