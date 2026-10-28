"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type ReadingBeatProps = {
  children: ReactNode;
  className?: string;
  quietOpacity?: number;
};

// Progressive reading presentation: scroll controls which beat is prominent.
// One beat is visually dominant as the visitor scrolls through dense text sections.
// Previous beats remain visible but fade to quiet; next beats emerge as you approach.
// Scroll position, not animation timing, controls the reading rhythm.
export default function ReadingBeat({ children, className = "", quietOpacity = 0.35 }: ReadingBeatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useInView(ref, {
    once: false,
    margin: "-30% 0px -40% 0px",
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        opacity: isActive ? 1 : quietOpacity,
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
