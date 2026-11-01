"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

const IVORY = "#EDE6D6";
const GRAPHITE = "#1F1F1C";
const COBALT = "#2446B8";
const VERMILION = "#D8442A";
const OCHRE = "#D9A441";

const DEPTHS = [
  { field: IVORY, ink: GRAPHITE },
  { field: COBALT, ink: IVORY },
  { field: VERMILION, ink: IVORY },
  { field: OCHRE, ink: GRAPHITE },
  { field: GRAPHITE, ink: IVORY },
];

const N = DEPTHS.length;

function Figure({ ink }: { ink: string }) {
  return (
    <div className="absolute bottom-[8%] left-1/2 flex h-[38%] w-[6%] -translate-x-1/2 flex-col items-center">
      <div className="h-[12%] w-[28%] rounded-full" style={{ background: ink }} />
      <div className="mt-[2%] w-full flex-1 rounded-t-[40%]" style={{ background: ink }} />
    </div>
  );
}

function Depth({
  index,
  progress,
  field,
  ink,
}: {
  index: number;
  progress: MotionValue<number>;
  field: string;
  ink: string;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const scale = useTransform(progress, [start, end], [0.3, 1], { clamp: true });
  const opacity = useTransform(progress, [start, start + 0.01], [0, 1], { clamp: true });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ background: field, scale, opacity, zIndex: index }}
    >
      <Figure ink={ink} />
    </motion.div>
  );
}

export default function ColourDescent() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduced) {
    return (
      <main>
        {DEPTHS.map((d, i) => (
          <section key={i} className="relative h-screen w-full" style={{ background: d.field }}>
            <Figure ink={d.ink} />
          </section>
        ))}
      </main>
    );
  }

  return (
    <main ref={ref} className="relative" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: IVORY }}>
        {DEPTHS.map((d, i) => (
          <Depth key={i} index={i} progress={scrollYProgress} field={d.field} ink={d.ink} />
        ))}
      </div>
    </main>
  );
}
