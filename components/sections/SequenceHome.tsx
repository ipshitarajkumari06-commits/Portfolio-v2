"use client";

import { useRef, useState } from "react";
import { motion, MotionValue, motionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/content";

const WINE = "#6B1E2E";
const CREAM = "#F3EDE0";
const QUESTION = "How do I strategise creatively?";

const LINES = [
  "Every brief arrives with different questions.",
  "My work begins by finding the right one.",
  "Everything else follows.",
];

const TOTAL = LINES.join("").length;
const noProgress = motionValue(0);

function Name() {
  return (
    <div className="absolute left-6 top-[10vh] z-20 sm:left-12 sm:top-[12vh]">
      <h1 className="font-sans text-[clamp(3.5rem,11vw,11rem)] font-bold leading-[0.88] tracking-[-0.03em] text-white">
        Ipshita
        <br />
        Rajkumari
      </h1>
      <p className="mt-6 font-sans text-[12px] uppercase tracking-[0.18em] text-[#F3EDE0] sm:text-[13px]">{hero.role}</p>
      <p className="mt-2 font-sans text-[12px] uppercase tracking-[0.18em] text-[#F3EDE0] sm:text-[13px]">Events, brands and apps.</p>
    </div>
  );
}

function Silhouette({ progress }: { progress?: MotionValue<number> }) {
  const litOpacity = useTransform(progress ?? noProgress, [0.62, 0.78], [0, 1], { clamp: true });
  const litTint = useTransform(litOpacity, [0, 1], [0, 0.6]);
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/personal/silhouette-hd.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-top lg:object-[50%_27%]" />
      <div className="absolute inset-0 bg-[#6B1E2E] mix-blend-color opacity-60" />
      <motion.img
        src="/images/personal/light-profile-hd.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top lg:object-[50%_27%]"
        style={{ opacity: progress ? litOpacity : 1 }}
      />
      <motion.div className="absolute inset-0 bg-[#6B1E2E] mix-blend-color" style={{ opacity: progress ? litTint : 0.6 }} />
    </div>
  );
}

export default function SequenceHome() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [typed, setTyped] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setTyped(Math.floor(Math.min(p / 0.5, 1) * TOTAL));
  });

  const clearOpacity = useTransform(scrollYProgress, [0.56, 0.68], [1, 0]);

  let remaining = typed;
  const shown = LINES.map((line) => {
    const n = Math.max(0, Math.min(line.length, remaining));
    remaining -= line.length;
    return line.slice(0, n);
  });

  if (reduced) {
    return (
      <section className="relative min-h-screen overflow-hidden" style={{ background: WINE }}>
        <Silhouette />
        <Name />
        <div className="absolute inset-x-0 top-[42vh] sm:top-[48vh] z-10 px-6 sm:px-12" style={{ background: CREAM, color: "#1A1A1A" }}>
          <div className="mx-auto max-w-[1100px] py-6 text-center sm:py-12">
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#6B6860]">Question</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05]">{QUESTION}</h2>
            <div className="mt-10 font-serif text-[clamp(1.25rem,2.2vw,2rem)] font-light leading-snug">
              {LINES.map((line) => (
                <p key={line} className="mt-4 first:mt-0">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[170vh]" style={{ background: WINE }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <Silhouette progress={scrollYProgress} />
        <Name />

        <motion.div
          className="absolute inset-x-0 top-[42vh] sm:top-[48vh] z-10 px-6 sm:px-12"
          style={{ background: CREAM, color: "#1A1A1A", opacity: clearOpacity }}
        >
          <div className="mx-auto max-w-[1100px] py-6 text-center sm:py-12" aria-hidden="true">
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-[#6B6860]">Question</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05]">{QUESTION}</h2>
            <div className="mt-10 font-serif text-[clamp(1.25rem,2.2vw,2rem)] font-light leading-snug">
              {shown.map((t, i) => (
                <p key={i} className="mt-4 first:mt-0">
                  {t}
                  {t.length < LINES[i].length && t.length > 0 && (
                    <span className="ml-1 inline-block h-[0.9em] w-[2px] bg-[#1A1A1A] align-middle" />
                  )}
                </p>
              ))}
            </div>
          </div>
          <div className="sr-only">
            <h2>{QUESTION}</h2>
            {LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
