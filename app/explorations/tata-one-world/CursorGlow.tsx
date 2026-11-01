"use client";

import type { PointerEvent, ReactNode } from "react";

// A soft light that follows the pointer across a section. It fades in on hover, so the
// closing line reads as lit from wherever the reader is looking. Touch screens get the
// static panels only.
export default function CursorGlow({ className = "", children }: { className?: string; children: ReactNode }) {
  function track(e: PointerEvent<HTMLElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - box.top}px`);
  }

  return (
    <section onPointerMove={track} className={`group relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: "radial-gradient(640px circle at var(--gx, 50%) var(--gy, 50%), rgba(253, 230, 138, 0.26), transparent 62%)",
        }}
      />
      {children}
    </section>
  );
}

// Five soft coloured bars that sit behind a closing line.
export function GlowPanels() {
  const panels = [
    "from-fuchsia-500/70 via-violet-700/30",
    "from-violet-500/70 via-indigo-800/25",
    "from-blue-500/75 via-blue-900/25",
    "from-indigo-400/70 via-blue-800/25",
    "from-fuchsia-400/55 via-violet-900/25",
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex gap-3 px-6 opacity-70">
      {panels.map((tone, i) => (
        <div key={i} className={`flex-1 rounded-full bg-gradient-to-t ${tone} to-transparent blur-3xl`} />
      ))}
    </div>
  );
}
