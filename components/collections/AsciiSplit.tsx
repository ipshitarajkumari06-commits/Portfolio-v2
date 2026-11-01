"use client";

import { useEffect, useRef, useState } from "react";

// Characters ordered from darkest to brightest.
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const COLS = 110;

// The left half of the frame stays photographic; the right half is the same
// frame rendered as ASCII, so the picture resolves into text as you read across it.
export default function AsciiSplit({ src, alt }: { src: string; alt: string }) {
  const [ascii, setAscii] = useState("");
  const aspect = useRef(16 / 9);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const rows = Math.round(COLS * (img.naturalHeight / img.naturalWidth) * 0.5);
      const canvas = document.createElement("canvas");
      canvas.width = COLS;
      canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, COLS, rows);
      const { data } = ctx.getImageData(0, 0, COLS, rows);
      const lines: string[] = [];
      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < COLS; x++) {
          const i = (y * COLS + x) * 4;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          line += RAMP[Math.min(RAMP.length - 1, Math.floor((1 - lum) * RAMP.length))];
        }
        lines.push(line);
      }
      setAscii(lines.join("\n"));
    };
  }, [src]);

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: aspect.current }}>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: "inset(0 50% 0 0)" }} />
      <pre
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden whitespace-pre font-mono text-[clamp(4px,0.7vw,9px)] leading-[1.05] text-fg/80"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        {ascii}
      </pre>
    </div>
  );
}
