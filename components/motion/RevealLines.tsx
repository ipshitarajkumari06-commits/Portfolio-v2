"use client";

import { motion, useReducedMotion } from "framer-motion";
import Display from "@/components/typography/Display";

type RevealLinesProps = {
  lines: string[];
  as?: "h1" | "h2" | "div";
  className?: string;
  lineClassName?: string;
  size?: "lg" | "sm";
  stagger?: number;
  delay?: number;
};

const MOTION_TAG = {
  h1: motion.h1,
  h2: motion.h2,
  div: motion.div,
} as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const line = (reduced: boolean) => ({
  hidden: { opacity: 0, y: reduced ? "0%" : "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function RevealLines({
  lines,
  as = "div",
  className = "",
  lineClassName = "",
  size = "lg",
  stagger = 0.14,
  delay = 0.1,
}: RevealLinesProps) {
  const MotionTag = MOTION_TAG[as];
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container(prefersReducedMotion ? 0 : stagger, prefersReducedMotion ? 0 : delay)}
      className={className}
    >
      {lines.map((text, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span variants={line(!!prefersReducedMotion)} className="block">
            <Display as="span" size={size} className={lineClassName}>
              {text}
            </Display>
          </motion.span>
        </div>
      ))}
    </MotionTag>
  );
}
