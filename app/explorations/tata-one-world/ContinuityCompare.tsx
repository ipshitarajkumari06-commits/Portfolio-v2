"use client";

import { useState } from "react";
import Image from "next/image";

type Visual = { src: string; alt: string; caption: string; width: number; height: number };

const CAPTION = "font-sans text-sm font-light leading-relaxed text-fg/75";

// A before-and-after pair on one frame. Drag the divider, or use the range control
// (keyboard or touch), to wipe between the BELIEVE and F.I.R.E. versions.
export default function ContinuityCompare({
  height,
  before,
  after,
}: {
  height: string;
  before: Visual;
  after: Visual;
}) {
  const [pos, setPos] = useState(50);

  return (
    <figure>
      <div className="flex justify-between px-6 pt-5 font-sans text-[12px] uppercase tracking-[0.14em] text-fg/70">
        <span>BELIEVE</span>
        <span>F.I.R.E.</span>
      </div>
      <div className="relative mt-4 h-[300px] select-none overflow-hidden bg-white/[0.03] focus-within:outline focus-within:outline-2 focus-within:outline-amber-200">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Image
            src={before.src}
            alt={before.alt}
            width={before.width}
            height={before.height}
            sizes="(min-width: 768px) 60vw, 100vw"
            unoptimized
            className={`${height} w-auto`}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image
            src={after.src}
            alt={after.alt}
            width={after.width}
            height={after.height}
            sizes="(min-width: 768px) 60vw, 100vw"
            unoptimized
            className={`${height} w-auto`}
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-white/80" style={{ left: `${pos}%` }} />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${before.alt} with ${after.alt}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="grid gap-4 px-6 pb-6 pt-5 md:grid-cols-2 md:gap-8">
        <figcaption className={CAPTION}>{before.caption}</figcaption>
        <figcaption className={CAPTION}>{after.caption}</figcaption>
      </div>
    </figure>
  );
}
