"use client";

import { useEffect, useRef, useState } from "react";

// The logo rationale, cut into segments that scatter and then come together into the
// logo, with the text, once the figure is in view. Plain CSS transitions, so it works in
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
      // Assemble only once the logo sits in the middle of the screen, so the scattered
      // state is seen first and the reader watches it come together.
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
    return { i, c, r, dx: dx * 46, dy: dy * 38, dz, rx, ry, rot: rot * 3 };
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
                transition: `transform 2.2s cubic-bezier(0.2, 0.7, 0.1, 1) ${t.i * 45}ms, opacity 1.4s ease ${t.i * 45}ms`,
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
    </div>
  );
}
