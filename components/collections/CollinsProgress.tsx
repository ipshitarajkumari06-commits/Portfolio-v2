"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// A thin red line along the bottom edge that fills as the reader moves through the case.
export default function CollinsProgress() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scale }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[2px] origin-left bg-[#E0334F]"
    />
  );
}
