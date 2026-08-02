"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import ImagePlaceholder from "./ImagePlaceholder";

const HOLD_MS = 2500;
const CROSSFADE_MS = 500;

type CycleImage = {
  src: string;
  label: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
};

type CycleImagesProps = {
  images: CycleImage[];
  aspect?: "video" | "square" | "portrait" | "wide";
};

// Auto-advancing sequence, no hover or tap required. The frame itself never
// moves or resizes — every image is cover-fit into the same fixed box, and
// only opacity crosses over between frames.
export default function CycleImages({ images, aspect = "video" }: CycleImagesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion || images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), HOLD_MS);
    return () => clearInterval(id);
  }, [inView, prefersReducedMotion, images.length]);

  return (
    <div ref={ref} className="relative">
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className={i === 0 ? "relative" : "absolute inset-0"}
          style={{
            opacity: prefersReducedMotion ? (i === 0 ? 1 : 0) : i === index ? 1 : 0,
            transition: `opacity ${CROSSFADE_MS}ms ease`,
          }}
        >
          <ImagePlaceholder
            label={img.label}
            aspect={aspect}
            src={img.src}
            objectFit={img.objectFit ?? "cover"}
            objectPosition={img.objectPosition}
            priority={inView}
          />
        </div>
      ))}
    </div>
  );
}
