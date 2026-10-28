"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SequenceHome from "@/components/sections/SequenceHome";
import ScrollRings from "@/components/sections/ScrollRings";
import { hero } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeStory() {
  return (
    <>
      <SequenceHome />
      <ScrollRings />


    </>
  );
}
