"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const IVORY = "#EDE6D6";
const GRAPHITE = "#1F1F1C";
const COBALT = "#2446B8";
const VERMILION = "#D8442A";
const OCHRE = "#D9A441";

const BEATS = [
  { line: "How do you creatively strategise?", field: IVORY, ink: GRAPHITE },
  { line: "Research", field: COBALT, ink: IVORY },
  { line: "More research", field: COBALT, ink: IVORY },
  { line: "Creative block", field: COBALT, ink: IVORY },
  { line: "WAIT!", field: GRAPHITE, ink: IVORY },
  { line: "Every brief arrives with different questions.", field: OCHRE, ink: GRAPHITE },
  { line: "My work begins by finding the right one.", field: VERMILION, ink: IVORY },
  { line: "Everything else is execution.", field: IVORY, ink: GRAPHITE },
];

export default function ColourField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(BEATS.length - 1, Math.floor(p * BEATS.length)));
  });

  if (reduced) {
    return (
      <main>
        {BEATS.map((b) => (
          <section
            key={b.line}
            className="flex min-h-screen items-center justify-center px-6 sm:px-12"
            style={{ background: b.field, color: b.ink }}
          >
            <p className="max-w-4xl font-serif text-4xl font-light leading-tight md:text-6xl">{b.line}</p>
          </section>
        ))}
      </main>
    );
  }

  const beat = BEATS[active];

  return (
    <main ref={ref} className="relative" style={{ height: `${BEATS.length * 100}vh` }}>
      <motion.div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 sm:px-12"
        animate={{ backgroundColor: beat.field, color: beat.ink }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="max-w-4xl font-serif text-4xl font-light leading-tight md:text-6xl">{beat.line}</p>
      </motion.div>
    </main>
  );
}
