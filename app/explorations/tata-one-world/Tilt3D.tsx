"use client";

import { useRef } from "react";

// Tilts its child in 3D toward the pointer, and settles flat when the pointer leaves.
// Motion is switched off for visitors who prefer reduced motion.
export default function Tilt3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * 18).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * 18).toFixed(2)}deg`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className={`transform-gpu transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transform-none ${className}`}
      style={{ transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
    >
      {children}
    </div>
  );
}
