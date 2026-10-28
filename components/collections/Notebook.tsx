"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { humAiN } from "@/lib/collections/hum-ai-n";

// The rule is printed under the notebook: strike every capability, on
// either side. Each word struck is a capability; the survivor is direction.
const HUMAN_STRIKE = new Set(["Judgement", "Empathy", "Experience", "Creativity"]);
const SURVIVOR = "Intent";

type Phase = "idle" | "building" | "reconsidering" | "narrowing" | "final";

const ease = [0.22, 1, 0.36, 1] as const;

const WORD_STAGGER = 0.3;
const BUILD_DURATION = 1600;
const HOLD_BUILT = 2200;
const STRIKE_DURATION = 1200;
const REMOVE_DURATION = 1000;

// The only spread in the Collection with real motion. Everything here is
// filtered through one question: would a strategist's notebook actually
// behave like this. Words are written in one at a time, like someone
// thinking rather than presenting; the strike-through has to be visible
// and held before a word disappears, not applied at the same instant it's
// removed, or crossing out reads as deleting.
//
// "Human Intent" in the final state is never a text swap, that would
// read as a glitch. "Human" is a fixed header throughout; "Intent" is
// the one bullet that survives elimination and settles directly beneath
// it, so the two words read as one phrase without any content changing.
export default function Notebook() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setPhase("final");
      return;
    }
    const toReconsidering = 100 + BUILD_DURATION + HOLD_BUILT;
    const toNarrowing = toReconsidering + STRIKE_DURATION;
    const toFinal = toNarrowing + REMOVE_DURATION;
    const timers = [
      setTimeout(() => setPhase("building"), 100),
      setTimeout(() => setPhase("reconsidering"), toReconsidering),
      setTimeout(() => setPhase("narrowing"), toNarrowing),
      setTimeout(() => setPhase("final"), toFinal),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, prefersReducedMotion]);

  const started = phase !== "idle";
  const showStrike = phase === "reconsidering" || phase === "narrowing" || phase === "final";
  const narrowed = phase === "narrowing" || phase === "final";

  const aiWords = started ? (narrowed ? [] : humAiN.test.ai) : [];
  const humanWords = started
    ? narrowed
      ? humAiN.test.human.filter((w) => w === SURVIVOR)
      : humAiN.test.human
    : [];

  return (
    <motion.div
      ref={ref}
      layout
      transition={{ layout: { duration: 0.8, ease } }}
      className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 py-16 text-center"
    >
      <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 25, duration: 0.6 }}>
        <motion.p layout className="font-serif text-lg text-fg md:text-xl">
          AI
        </motion.p>
        <ul className="mt-4 flex flex-col items-center gap-2">
          <AnimatePresence>
            {aiWords.map((word, i) => (
              <Word key={word} word={word} index={i} struck={showStrike} />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      <span className="text-fg/70" aria-hidden>
        ↓
      </span>

      <motion.div layout transition={{ type: "spring", stiffness: 100, damping: 25, duration: 0.6 }}>
        <motion.p layout className="font-serif text-lg text-fg md:text-xl">
          Human
        </motion.p>
        <ul className="mt-4 flex flex-col items-center gap-2">
          <AnimatePresence>
            {humanWords.map((word, i) => (
              <Word key={word} word={word} index={i} struck={showStrike && HUMAN_STRIKE.has(word)} />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </motion.div>
  );
}

function Word({ word, index, struck }: { word: string; index: number; struck: boolean }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: index * WORD_STAGGER, ease } }}
      exit={{ opacity: 0, transition: { duration: 0.8, delay: index * 0.15, ease } }}
      className="relative font-sans text-base text-fg/70"
    >
      {word}
      {struck && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 0.7, delay: 0.3 + index * 0.2, ease } }}
          exit={{ opacity: 0 }}
          style={{ originX: 0 }}
          className="absolute left-0 top-3 h-px w-full bg-fg/70"
          aria-hidden
        />
      )}
    </motion.li>
  );
}
