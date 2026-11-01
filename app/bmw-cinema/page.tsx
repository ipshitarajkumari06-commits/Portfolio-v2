"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

const INK = "#EDE6D6";
const N = 7;

const SCENES = [
  {
    image: "/images/bmw/speedtop-sketch.jpg",
    lines: ["No single feature defined the Speedtop.", "Its character emerged from the relationship between its elements."],
  },
  {
    image: "/images/bmw/lounge-sketch-front.jpg",
    lines: ["The lounge rebuilt the Speedtop's silhouette at the scale of a room."],
  },
  {
    image: "/images/bmw/lounge-interior.jpg",
    lines: ["It choreographed movement.", "It choreographed visibility.", "It choreographed discovery."],
  },
  {
    image: "/images/bmw/robb-report-interview.jpg",
    lines: ["Inside, the Collectors' Lounge shifted BMW's role from exhibitor to host."],
  },
  {
    image: "/images/bmw/activity-sketching.jpg",
    lines: ["Visitors weren't only invited to observe the design.", "They were invited to interpret it."],
  },
  {
    image: "/images/bmw/facade-back.jpg",
    lines: ["BMW extended its presence across architecture, craft and technology without placing a single car at the centre of the experience."],
  },
  {
    image: null,
    lines: ["What stayed with me wasn't the room.", "It was the part of the brief that nobody wrote down."],
  },
];

function Scene({ index, progress, image, lines }: { index: number; progress: MotionValue<number>; image: string | null; lines: string[] }) {
  const w = 1 / N;
  const start = index * w;
  const end = start + w;
  const first = index === 0;
  const last = index === N - 1;

  const opacity = useTransform(
    progress,
    first ? [0, end - w * 0.15, end + w * 0.2] : last ? [start - w * 0.2, start + w * 0.15, 1] : [start - w * 0.2, start + w * 0.15, end - w * 0.15, end + w * 0.2],
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
    { clamp: true },
  );
  const scale = useTransform(progress, [start, end], [1.08, 1], { clamp: true });
  const textOpacity = useTransform(
    progress,
    [start + w * 0.25, start + w * 0.4, end - w * 0.2, end],
    [0, 1, 1, 0],
    { clamp: true },
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity, zIndex: index, background: "#0F0F0E" }}>
      {image && (
        <motion.img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale }}
        />
      )}
      <motion.div className="absolute inset-0 bg-black/40" style={{ opacity: textOpacity }} />
      <motion.div className="absolute inset-x-0 bottom-[12vh] mx-auto max-w-5xl px-6 sm:px-12" style={{ opacity: textOpacity, color: INK }}>
        {lines.map((line) => (
          <p key={line} className="font-serif font-light leading-[1.1] text-[clamp(1.75rem,4.5vw,4.5rem)]">
            {line}
          </p>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function BmwCinema() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduced) {
    return (
      <main className="bg-black">
        {SCENES.map((s, i) => (
          <section key={i} className="relative h-screen w-full">
            {s.image && <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
            <div className="absolute inset-0 flex items-end bg-black/40 px-6 pb-[12vh] sm:px-12" style={{ color: INK }}>
              <div className="max-w-5xl">
                {s.lines.map((line) => (
                  <p key={line} className="font-serif font-light leading-[1.1] text-[clamp(1.75rem,4.5vw,4.5rem)]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    );
  }

  return (
    <main ref={ref} className="relative bg-black" style={{ height: `${N * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {SCENES.map((s, i) => (
          <Scene key={i} index={i} progress={scrollYProgress} image={s.image} lines={s.lines} />
        ))}
      </div>
    </main>
  );
}
