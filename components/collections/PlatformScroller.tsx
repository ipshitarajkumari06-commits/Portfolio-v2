"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Platform = { name: string; icon: ReactNode };

const ITEM_HEIGHT = 160;

// A screen that scrolls through the platforms as the reader scrolls the page.
// Each platform sits in its own slot; the list moves past a fixed window, so
// one logo is shown at a time and the next one comes up as the page moves.
export default function PlatformScroller({ platforms }: { platforms: Platform[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0.15, 0.85], [0, -(platforms.length - 1) * ITEM_HEIGHT]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-2xl">
      <div
        className="relative overflow-hidden rounded-[28px] border border-fg/20 bg-[#070707]"
        style={{ height: ITEM_HEIGHT }}
      >
        <motion.ul style={{ y }} className="absolute inset-x-0 top-0">
          {platforms.map((p) => (
            <li
              key={p.name}
              style={{ height: ITEM_HEIGHT }}
              className="flex flex-col items-center justify-center gap-3 text-fg/85"
            >
              <svg
                aria-hidden="true"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {p.icon}
              </svg>
              <span className="font-sans text-[12px] uppercase tracking-[0.18em]">{p.name}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
