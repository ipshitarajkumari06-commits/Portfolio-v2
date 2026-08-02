import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#000000",
          color: "#F5F4F0",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 300, letterSpacing: "-0.02em" }}>Ipshita Rajkumari</div>
        <div style={{ marginTop: 20, fontSize: 28, color: "#8C8C86", letterSpacing: "0.02em" }}>
          Brand Strategist &amp; Experience Designer
        </div>
        <div style={{ marginTop: 48, width: 64, height: 3, background: "#B34A22" }} />
      </div>
    ),
    { ...size }
  );
}
