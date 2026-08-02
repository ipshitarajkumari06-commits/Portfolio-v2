"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type KenBurnsMove = "zoom-in" | "zoom-out" | "pan-left" | "pan-right" | "pan-up";

const MOVES: Record<KenBurnsMove, { initial: Record<string, number | string>; animate: Record<string, number | string> }> = {
  "zoom-in": { initial: { scale: 1, x: 0, y: 0 }, animate: { scale: 1.03, x: 0, y: 0 } },
  "zoom-out": { initial: { scale: 1.035, x: 0, y: 0 }, animate: { scale: 1.005, x: 0, y: 0 } },
  "pan-left": { initial: { scale: 1.04, x: "1.5%", y: 0 }, animate: { scale: 1.04, x: "-1.5%", y: 0 } },
  "pan-right": { initial: { scale: 1.04, x: "-1.5%", y: 0 }, animate: { scale: 1.04, x: "1.5%", y: 0 } },
  "pan-up": { initial: { scale: 1.03, x: 0, y: "1.2%" }, animate: { scale: 1.03, x: 0, y: "-1.2%" } },
};

// A slow, near-imperceptible drift, not an animation the reader consciously
// notices. When the image leaves the viewport, `animate` reverts to
// undefined, which freezes the motion at its current value (framer
// doesn't snap back to `initial`) rather than burning GPU cycles offscreen.
export default function KenBurns({
  move,
  duration = 20,
  children,
  className = "",
}: {
  move: KenBurnsMove;
  duration?: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px", once: false });
  const prefersReducedMotion = useReducedMotion();
  const { initial, animate } = MOVES[move];
  const active = inView && !prefersReducedMotion;

  return (
    <div ref={ref} className={`relative h-full w-full ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? undefined : initial}
        animate={active ? animate : undefined}
        transition={{ duration, ease: "linear" }}
        className="relative h-full w-full"
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
