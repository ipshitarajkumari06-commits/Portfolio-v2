"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// The hero image drifts and settles as the reader scrolls past it. Reduced
// motion keeps it still.
export default function CollinsHero({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);
  // A flight path that is visible on load and finishes drawing as the reader scrolls.
  const draw = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <div ref={ref} className="relative h-[360px] w-full overflow-hidden bg-black sm:h-[60vh] sm:min-h-[360px]">
      <motion.div style={{ scale, y, opacity: fade }} className="absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover object-[25%_center] sm:object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" aria-hidden="true" />
      <svg aria-hidden="true" viewBox="0 0 1200 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full">
        <motion.path
          d="M -20 340 C 260 120, 620 360, 1220 60"
          fill="none"
          stroke="#E0334F"
          strokeWidth="2"
          strokeDasharray="6 10"
          style={{ pathLength: draw }}
        />
      </svg>
    </div>
  );
}
