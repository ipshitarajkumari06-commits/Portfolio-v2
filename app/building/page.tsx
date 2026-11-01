"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

const IVORY = "#EDE6D6";
const GRAPHITE = "#1F1F1C";
const COBALT = "#2446B8";
const VERMILION = "#D8442A";
const OCHRE = "#D9A441";

const PLANES = [COBALT, VERMILION, OCHRE, GRAPHITE];
const N = PLANES.length;
const H = 18;
const FIGURE_H = 26;

function Figure() {
  return (
    <svg viewBox="0 0 100 300" className="h-full w-auto" aria-hidden="true">
      <g fill={GRAPHITE} stroke={GRAPHITE} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="30" r="17" stroke="none" />
        <path d="M36 58 Q50 48 64 58 L62 172 L38 172 Z" stroke="none" />
        <path d="M37 66 L27 150" fill="none" strokeWidth="12" />
        <path d="M63 66 L80 118 L90 96" fill="none" strokeWidth="12" />
        <path d="M43 168 L41 292" fill="none" strokeWidth="15" />
        <path d="M57 168 L59 292" fill="none" strokeWidth="15" />
      </g>
    </svg>
  );
}

function Plane({ index, progress, color }: { index: number; progress: MotionValue<number>; color: string }) {
  const start = index / N;
  const end = (index + 1) / N;
  const y = useTransform(progress, [start, end], ["100vh", "0vh"], { clamp: true });

  return (
    <motion.div
      className="absolute left-0 w-full"
      style={{ bottom: `${index * H}vh`, height: `${H}vh`, background: color, y }}
    />
  );
}

export default function Building() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const figureBottom = useTransform(scrollYProgress, [0, 1], ["0vh", `${N * H}vh`]);

  if (reduced) {
    return (
      <main className="relative h-screen w-full" style={{ background: IVORY }}>
        {PLANES.map((c, i) => (
          <div key={i} className="absolute left-0 w-full" style={{ bottom: `${i * H}vh`, height: `${H}vh`, background: c }} />
        ))}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: `${N * H}vh`, height: `${FIGURE_H}vh` }}>
          <Figure />
        </div>
      </main>
    );
  }

  return (
    <main ref={ref} className="relative" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: IVORY }}>
        {PLANES.map((c, i) => (
          <Plane key={i} index={i} progress={scrollYProgress} color={c} />
        ))}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: figureBottom, height: `${FIGURE_H}vh` }}
        >
          <Figure />
        </motion.div>
      </div>
    </main>
  );
}
