"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const IVORY = "#EDE6D6";
const GRAPHITE = "#1F1F1C";
const COBALT = "#2446B8";
const VERMILION = "#D8442A";
const OCHRE = "#D9A441";

const FIELDS = [
  { w: 22, c: IVORY },
  { w: 18, c: COBALT },
  { w: 26, c: VERMILION },
  { w: 14, c: OCHRE },
  { w: 20, c: GRAPHITE },
];

const FIGURE_W = 6;

function Silhouette({ h, lying = false }: { h: number; lying?: boolean }) {
  if (lying) {
    return <div className="absolute bottom-0 w-full rounded-t-full bg-[#1F1F1C]" style={{ height: `${h}vh` }} />;
  }
  return (
    <div className="absolute bottom-0 flex w-full flex-col items-center" style={{ height: `${h}vh` }}>
      <div className="rounded-full bg-[#1F1F1C]" style={{ width: "28%", height: "12%" }} />
      <div className="mt-[2%] flex-1 rounded-t-[40%] bg-[#1F1F1C]" style={{ width: "100%" }} />
    </div>
  );
}

export default function ColourWalk() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const figureLeft = useTransform(scrollYProgress, [0, 1], ["0%", `${100 - FIGURE_W}%`]);
  const dog1Left = useTransform(scrollYProgress, [0, 1], ["-7%", `${100 - FIGURE_W - 7}%`]);
  const dog2Left = useTransform(scrollYProgress, [0, 1], ["-12%", `${100 - FIGURE_W - 12}%`]);
  const dog3Left = useTransform(scrollYProgress, [0, 1], ["-17%", `${100 - FIGURE_W - 17}%`]);

  if (reduced) {
    return (
      <main className="flex h-screen w-full">
        {FIELDS.map((f, i) => (
          <div key={i} style={{ width: `${f.w}%`, background: f.c }} />
        ))}
      </main>
    );
  }

  return (
    <main ref={ref} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex">
          {FIELDS.map((f, i) => (
            <div key={i} style={{ width: `${f.w}%`, background: f.c }} />
          ))}
        </div>
        <motion.div className="absolute bottom-[12vh] h-[62vh] w-[6%]" style={{ left: dog3Left }}>
          <Silhouette h={34} />
        </motion.div>
        <motion.div className="absolute bottom-[12vh] h-[62vh] w-[6%]" style={{ left: dog2Left }}>
          <Silhouette h={30} lying />
        </motion.div>
        <motion.div className="absolute bottom-[12vh] h-[62vh] w-[6%]" style={{ left: dog1Left }}>
          <Silhouette h={44} />
        </motion.div>
        <motion.div className="absolute bottom-[12vh] h-[62vh] w-[6%]" style={{ left: figureLeft }}>
          <Silhouette h={62} />
        </motion.div>
      </div>
    </main>
  );
}
