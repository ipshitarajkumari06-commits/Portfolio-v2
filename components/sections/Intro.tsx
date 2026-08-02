"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Section from "@/components/layout/Section";
import Kicker from "@/components/typography/Kicker";
import { intro } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const HOLD_AFTER_TYPE = 1100;
const PAUSE_BETWEEN_SEARCHES = 650;
const PAUSE_BEFORE_WAIT = 2100;
const WAIT_HOLD = 1000;
const PAUSE_AFTER_WAIT = 700;
const INITIAL_CURSOR_HOLD = 400;
const PHILOSOPHY_PAUSE = 500;
const PAUSE_BEFORE_METHOD = 900;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Stage = "cursor" | "search" | "turn" | "philosophy" | "done";

function Caret({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block w-[2px] animate-caret bg-fg/70 ${className}`} />;
}

const fadeIn = (reduced: boolean) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: reduced ? 0 : 0.8, ease } },
});

// One continuous typed thought: the searches never resolve, WAIT! snaps
// them sideways, and the philosophy that follows is typed in the same
// rhythm rather than faded in, so nothing here reads as a new section
// starting. METHOD is the last thing to arrive — a quiet label for what
// just happened, not an announcement of it.
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>(prefersReducedMotion ? "done" : "cursor");
  const [text, setText] = useState("");
  const [typedLines, setTypedLines] = useState<string[]>(prefersReducedMotion ? intro.body : []);
  const [currentLine, setCurrentLine] = useState("");
  const [showMethodLabel, setShowMethodLabel] = useState(prefersReducedMotion);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    let cancelled = false;

    async function run() {
      await sleep(INITIAL_CURSOR_HOLD);
      if (cancelled) return;

      setStage("search");

      for (const phrase of intro.searches) {
        for (let i = 1; i <= phrase.length; i++) {
          if (cancelled) return;
          setText(phrase.slice(0, i));
          await sleep(TYPE_SPEED);
        }
        await sleep(HOLD_AFTER_TYPE);
        if (cancelled) return;
        for (let i = phrase.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setText(phrase.slice(0, i));
          await sleep(DELETE_SPEED);
        }
        await sleep(PAUSE_BETWEEN_SEARCHES);
        if (cancelled) return;
      }

      await sleep(PAUSE_BEFORE_WAIT);
      if (cancelled) return;

      setStage("turn");
      await sleep(WAIT_HOLD);
      if (cancelled) return;

      setStage("philosophy");
      await sleep(PAUSE_AFTER_WAIT);
      if (cancelled) return;

      for (const sentence of intro.body) {
        for (let i = 1; i <= sentence.length; i++) {
          if (cancelled) return;
          setCurrentLine(sentence.slice(0, i));
          await sleep(TYPE_SPEED);
        }
        if (cancelled) return;
        setTypedLines((prev) => [...prev, sentence]);
        setCurrentLine("");
        await sleep(PHILOSOPHY_PAUSE);
        if (cancelled) return;
      }

      setStage("done");
      await sleep(PAUSE_BEFORE_METHOD);
      if (cancelled) return;

      setShowMethodLabel(true);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [inView, prefersReducedMotion]);

  const philosophyActive = stage === "philosophy" || stage === "done";

  return (
    <Section id="method">
      <div ref={ref} className="mx-auto max-w-xl">
        <motion.div layout>
          <div className="text-center">
            <AnimatePresence mode="wait">
              {stage === "cursor" && (
                <motion.div
                  key="cursor"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3, ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
                  className="flex h-10 items-center justify-center"
                >
                  <Caret className="h-6" />
                </motion.div>
              )}

              {stage === "search" && (
                <motion.div
                  key="search"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2, ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
                  className="relative flex min-h-10 items-center justify-center gap-1 pb-3"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1, transition: { duration: 0.4, ease } }}
                    className="absolute inset-x-0 bottom-0 h-px origin-center bg-line"
                  />
                  <span className="font-serif text-xl font-light text-fg md:text-2xl">{text}</span>
                  <Caret className="h-6 md:h-7" />
                </motion.div>
              )}

              {stage === "turn" && (
                <motion.p
                  key="turn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.25, ease } }}
                  exit={{ opacity: 0, transition: { duration: 0.6, ease } }}
                  className="font-serif text-display-sm font-bold text-fg"
                >
                  {intro.turningPoint}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {philosophyActive && (
            <>
              <motion.div
                variants={fadeIn(!!prefersReducedMotion)}
                initial="hidden"
                animate={showMethodLabel ? "visible" : "hidden"}
                className="mb-3"
              >
                <Kicker>{intro.kicker}</Kicker>
              </motion.div>

              {/* Each line reserves its final, fully-typed height immediately via an
                  invisible sizer; the visible overlay only ever reveals characters
                  within that fixed box, so typing never changes page geometry —
                  words appear on paper that already exists. */}
              <div className="flex flex-col gap-3">
                {intro.body.map((sentence, i) => {
                  const revealed =
                    i < typedLines.length ? sentence : i === typedLines.length && stage === "philosophy" ? currentLine : "";
                  const activeCaret = stage === "philosophy" && i === typedLines.length;
                  return (
                    <div key={sentence} className="relative">
                      <p aria-hidden className="invisible font-sans text-xl font-light leading-snug md:text-2xl">
                        {sentence}
                      </p>
                      <p className="absolute inset-0 font-sans text-xl font-light leading-snug text-fg/90 md:text-2xl">
                        {revealed}
                        {activeCaret && <Caret className="ml-1 h-6 align-middle md:h-7" />}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
