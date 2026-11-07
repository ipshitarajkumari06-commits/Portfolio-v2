"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Visual = { src: string; alt: string; caption: string; width: number; height: number };
export type Stop = { n: string; label: string; paragraphs: string[]; image?: Visual; diagram?: ReactNode };

const BODY = "font-sans text-justify hyphens-auto text-base font-light leading-relaxed text-fg/90 md:text-lg";

// Each stop owns a slice of the scroll. Its photo and copy fade in as the
// reader reaches its slice, hold, then fade out for the next one.
function windowFor(index: number, count: number) {
  const center = (index + 0.5) / count;
  const half = 0.5 / count;
  return {
    in: Math.max(0, center - half),
    peakIn: center - half * 0.45,
    peakOut: center + half * 0.45,
    out: Math.min(1, center + half),
  };
}

function Layer({ progress, index, count, children }: { progress: MotionValue<number>; index: number; count: number; children: React.ReactNode }) {
  const w = windowFor(index, count);
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, [w.in, w.peakIn, w.peakOut, w.out], [index === 0 ? 1 : 0, 1, 1, index === count - 1 ? 1 : 0]);
  // Reduced motion keeps the cross-fade and drops the vertical drift.
  const y = useTransform(progress, [w.in, w.peakIn, w.peakOut, w.out], reduce ? [0, 0, 0, 0] : [28, 0, 0, -28]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      {children}
    </motion.div>
  );
}

// Scroll-driven story for desktop: a pinned visual and its copy change as the
// reader scrolls through the stops. A stop shows its photo, or its diagram when it has one.
// Phones get the stops stacked.
export default function CollinsScrollStory({ stops }: { stops: Stop[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const count = stops.length;

  return (
    <>
      <div ref={ref} className="relative hidden md:block" style={{ height: `${count * 80}vh` }}>
        <div className="sticky top-0 grid h-screen grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-16">
          <div className="relative aspect-[4/3] w-full">
            {stops.map((s, i) => (s.diagram || s.image) && (
              <Layer key={s.n} progress={scrollYProgress} index={i} count={count}>
                {s.diagram ?? (s.image && (
                  <figure className="h-full w-full">
                    <div className="relative h-[calc(100%-2.5rem)] overflow-hidden border border-white/10">
                      <Image src={s.image.src} alt={s.image.alt} fill sizes="55vw" className="object-cover" />
                    </div>
                    {s.image.caption && <figcaption className="mt-3 font-sans text-xs font-light text-fg/70">{s.image.caption}</figcaption>}
                  </figure>
                ))}
              </Layer>
            ))}
          </div>

          <div className="relative h-[60vh]">
            {stops.map((s, i) => (
              <Layer key={s.n} progress={scrollYProgress} index={i} count={count}>
                <span className="font-serif text-7xl font-light leading-none text-fg/40">{s.n}</span>
                <h3 className="mt-4 font-serif text-4xl font-light leading-tight text-fg">{s.label}</h3>
                <div className="mt-8 flex flex-col gap-5">
                  {s.paragraphs.map((p) => (
                    <p key={p} className={BODY}>
                      {p}
                    </p>
                  ))}
                </div>
              </Layer>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-20 md:hidden">
        {stops.map((s) => (
          <article key={s.n} className="flex flex-col gap-6">
            {s.diagram ?? (s.image && (
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
                </div>
                {s.image.caption && <figcaption className="mt-3 font-sans text-xs font-light text-fg/70">{s.image.caption}</figcaption>}
              </figure>
            ))}
            <span className="font-serif text-6xl font-light leading-none text-fg/25">{s.n}</span>
            <h3 className="font-serif text-3xl font-light leading-tight text-fg">{s.label}</h3>
            {s.paragraphs.map((p) => (
              <p key={p} className={BODY}>
                {p}
              </p>
            ))}
          </article>
        ))}
      </div>
    </>
  );
}
