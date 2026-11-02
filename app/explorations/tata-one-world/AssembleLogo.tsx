"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

// The logo rationale, cut into segments that scatter and then come together into the
// logo, with the text, once the figure is in view. The segments lock in from the centre out. Plain CSS transitions, so it works in
// every browser. Visitors who prefer reduced motion see the logo assembled.

const COLS = 6;
const ROWS = 4;

export default function AssembleLogo({
  src,
  alt,
  width = 2000,
  height = 1179,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Escape closes the enlarged slide.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAssembled(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAssembled(true);
          io.disconnect();
        }
      },
      // Assemble once a third of the logo is on screen, so the scattered state is seen first.
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tiles = Array.from({ length: COLS * ROWS }, (_, i) => {
    const c = i % COLS;
    const r = Math.floor(i / COLS);
    // Fixed, varied offsets per segment, so the break-up looks scattered but repeatable.
    const dx = ((i * 37) % 11) - 5;
    const dy = ((i * 53) % 9) - 4;
    const rot = ((i * 29) % 13) - 6;
    // Depth and tilt per segment, so each piece reads as a raised block before it settles.
    const dz = (((i * 17) % 7) + 2) * 30;
    const rx = ((i * 13) % 9) - 4;
    const ry = ((i * 11) % 9) - 4;
    // Distance from the centre, so the pieces lock in from the middle outward.
    const d = Math.hypot((c - (COLS - 1) / 2) / COLS, (r - (ROWS - 1) / 2) / ROWS);
    return { i, c, r, dx: dx * 46, dy: dy * 38, dz, rx, ry, rot: rot * 3, delay: Math.round(d * 1000) };
  });

  // The artwork fits the card at every width, so the whole logo and its labels stay visible.
  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black">
        <div
          ref={ref}
          role="img"
          aria-label={alt}
          className="relative w-full transition-transform duration-700 ease-out"
          style={{ perspective: "1200px", aspectRatio: `${width} / ${height}` }}
          onPointerMove={(e) => {
            const el = ref.current;
            if (!el || !assembled) return;
            const box = el.getBoundingClientRect();
            const px = (e.clientX - box.left) / box.width - 0.5;
            const py = (e.clientY - box.top) / box.height - 0.5;
            el.style.transform = `rotateX(${-py * 10}deg) rotateY(${px * 12}deg)`;
          }}
          onPointerLeave={() => {
            if (ref.current) ref.current.style.transform = "none";
          }}
        >
          {tiles.map((t) => (
            <div
              key={t.i}
              className="absolute overflow-hidden"
              style={{
                left: `${(t.c / COLS) * 100}%`,
                top: `${(t.r / ROWS) * 100}%`,
                width: `${100 / COLS + 0.2}%`,
                height: `${100 / ROWS + 0.2}%`,
                transform: assembled
                  ? "translateZ(0)"
                  : `translate3d(${t.dx}px, ${t.dy}px, ${t.dz}px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) rotate(${t.rot}deg) scale(1.08)`,
                opacity: assembled ? 1 : 0.35,
                transition: `transform 1.6s cubic-bezier(0.22, 1, 0.36, 1) ${t.delay}ms, opacity 1s ease ${t.delay}ms`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                  backgroundPosition: `${(t.c / (COLS - 1)) * 100}% ${(t.r / (ROWS - 1)) * 100}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="font-sans text-sm font-light text-fg/85 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-300"
        >
          View larger
        </button>
      </div>
      {zoomed && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
          onClick={() => setZoomed(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="95vw"
            className="h-auto max-h-[90vh] w-auto max-w-full rounded-[20px] object-contain"
          />
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-6 top-6 font-sans text-sm uppercase tracking-[0.2em] text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-300"
          >
            Close
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
}
