"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Display from "@/components/typography/Display";
import LineSwap from "@/components/motion/LineSwap";
import { hero } from "@/lib/content";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 sm:pt-28">
      <Container>
        <motion.h1 initial="hidden" animate="show" variants={container}>
          <div className="overflow-hidden">
            <motion.div variants={line}>
              <Display as="span">{hero.line1}</Display>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div variants={line}>
              <Display as="div" className="pt-[0.08em]">
                <LineSwap lineA={hero.line2A} lineB={hero.line2B} />
              </Display>
            </motion.div>
          </div>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-md"
        >
          <p className="font-serif text-xl font-light text-fg md:text-2xl">{hero.name}</p>
          <p className="mt-1 font-sans text-[15px] text-muted">{hero.role}</p>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.8 }}
        className="absolute inset-x-0 bottom-10 flex justify-center"
        aria-hidden
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-fg/30 to-transparent" />
      </motion.div>
    </section>
  );
}
