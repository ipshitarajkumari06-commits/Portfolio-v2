"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  MotionValue,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero } from "@/lib/content";
import { CHANNELS, type Channel } from "@/components/collections/PlatformMarks";

const WINE = "#6B1E2E";
const RINGS = [16, 24, 32, 40, 50];
const DISK_FILL = 12;

const PROJECTS: { label: string; title: string; href: string; image: string | null; channels?: Channel[] }[] = [
  { label: "Brand Strategy", title: "What survives when a brand changes medium?", href: "/explorations/bmw-art-fair", image: "/images/bmw/lounge-interior.png" },
  { label: "Experience Strategy", title: "When architecture captures attention, what should the experience say next?", href: "/explorations/airports", image: "/images/airports/ghy-ceiling.png" },
  { label: "Narrative Strategy", title: "What makes this Tata Motors?", href: "/explorations/hum-ai-n", image: null, channels: CHANNELS },
  { label: "Experience Strategy", title: "How do you build anticipation for a story without giving the story away?", href: "/explorations/pritam-pedro", image: "/images/pritam-pedro/series-poster.jpg" },
];

function polar(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}

function Ring({ r, index, progress, live }: { r: number; index: number; progress: MotionValue<number>; live: boolean }) {
  const start = 0.5 + index * 0.02;
  const entrance = useTransform(progress, [start, start + 0.06], [0, 1], { clamp: true });
  const direction = index % 2 ? 1 : -1;
  const ringColor = useTransform(progress, [0.74, 0.8], ["rgba(26,26,26,0.5)", "rgba(243,237,224,0.5)"]);
  return (
    <motion.div
      className="absolute"
      style={{ width: `${r * 2}%`, height: `${r * 2}%`, left: `${50 - r}%`, top: `${50 - r}%`, scale: entrance }}
    >
      <motion.div
        className="h-full w-full rounded-full border"
        style={{ borderColor: ringColor }}
        animate={live ? { scale: [1, 1 + 0.02 + 0.0125 * direction, 1] } : { scale: 1 }}
        transition={{ duration: 2.6, delay: index * 0.45, repeat: live ? Infinity : 0, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

const N = PROJECTS.length;
const CARD_W = 42;
const GAP = 4;
const STEP = CARD_W + GAP;



function Card({
  project,
  index,
  progress,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const signed = useTransform(progress, (p) => {
    const pos = Math.min(Math.max((p - 0.82) / 0.18, 0), 1) * (N - 1);
    return Math.max(-1.5, Math.min(1.5, pos - index));
  });
  const dist = useTransform(signed, (v) => Math.abs(v));
  const rotateY = useTransform(signed, (v) => -v * 14);
  const z = useTransform(dist, (d) => -Math.min(d, 1) * 60);
  const shadow = useTransform(dist, (d) => `0 ${Math.round(30 - 14 * Math.min(d, 1))}px ${Math.round(60 - 20 * Math.min(d, 1))}px rgba(0,0,0,${(0.5 - 0.25 * Math.min(d, 1)).toFixed(2)})`);
  const scale = useTransform(dist, (d) => 1 - 0.1 * Math.min(d, 1));
  const arch = useTransform(dist, (d) => `${-9 * (1 - Math.min(d, 1) ** 2)}vh`);
  const opacity = useTransform(dist, (d) => 1 - 0.45 * Math.min(d, 1));
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(progress, "change", (p) => setVisible(p > 0.82));

  return (
    <motion.div
      className="flex shrink-0 flex-col items-center"
      style={{ width: `${CARD_W}vw`, marginRight: `${GAP}vw`, scale, opacity, y: arch, rotateY, z, transformStyle: "preserve-3d" }}
    >
      <span className="mb-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#F3EDE0]">{String(index + 1).padStart(2, "0")}</span>
      <div className="h-[8vh] w-px bg-[#F3EDE0]/60" />
      <motion.div className="w-full" style={{ boxShadow: shadow, borderRadius: "18px" }}>
        <Link
          href={project.href}
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
          className="group flex h-[70vh] w-full flex-col bg-[#F3EDE0] p-3 outline-none transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#F3EDE0] focus-visible:ring-offset-4 focus-visible:ring-offset-[#6B1E2E]"
          style={{ borderRadius: "18px" }}
        >
          {project.image ? (
            <div className="relative h-[72%] w-full overflow-hidden" style={{ borderRadius: "14px" }}>
              <Image src={project.image} alt="" fill sizes="42vw" className="object-cover" />
            </div>
          ) : (
            <div
              className="flex h-[72%] w-full flex-col items-center justify-center gap-6 bg-[#6B1E2E]"
              style={{ borderRadius: "14px" }}
            >
              {CHANNELS.filter((c) => c.name === "YouTube").map((c) => (
                <svg key={c.name} aria-hidden="true" width="112" height="112" viewBox="0 0 24 24">
                  {c.icon}
                </svg>
              ))}
              <span className="font-serif text-3xl font-light text-[#F3EDE0]">HUM.AI.N</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#F3EDE0]/80">Season One</span>
            </div>
          )}
          <span className="mt-3 font-sans text-[11px] uppercase tracking-[0.12em] text-[#6B6860] sm:text-[12px]">{project.label}</span>
          <span className="mt-1 font-serif text-[15px] font-light leading-snug text-[#1A1A1A] sm:text-[13px]">{project.title}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function Gallery({ progress }: { progress: MotionValue<number> }) {
  const labelOpacity = useTransform(progress, [0.82, 0.88], [0, 1], { clamp: true });
  const galleryOpacity = useTransform(progress, [0.82, 0.86], [0, 1], { clamp: true });
  const x = useTransform(progress, (p) => {
    const pos = Math.min(Math.max((p - 0.82) / 0.18, 0), 1) * (N - 1);
    return `${(N * STEP) / 2 - CARD_W / 2 - pos * STEP}vw`;
  });
  return (
    <motion.div className="absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: galleryOpacity }}>
      <motion.h2 className="absolute left-6 top-[12vh] font-sans text-[11px] font-normal uppercase tracking-[0.16em] text-[#F3EDE0] sm:left-12" style={{ opacity: labelOpacity }}>
        Selected work
      </motion.h2>
      <motion.div className="flex items-start" style={{ x, perspective: 1200 }}>
        {PROJECTS.map((project, i) => (
          <Card key={project.label} project={project} index={i} progress={progress} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function StaticRings() {
  return (
    <section className="bg-[#F3EDE0] px-6 py-24 text-[#1A1A1A] sm:px-12">
      <p className="font-serif text-4xl font-light leading-[1.05] md:text-6xl">{hero.line1}</p>
      <p className="font-serif text-4xl font-light leading-[1.05] md:text-6xl">{hero.line2A}</p>
      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
        {PROJECTS.map((project) => (
          <Link key={project.label} href={project.href} className="group block">
            {project.image ? (
              <div className="relative aspect-[4/3] w-full">
                <Image src={project.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
            ) : (
              <div className="aspect-[4/3] w-full bg-[#1A1A1A]" />
            )}
            <span className="mt-2 inline-block bg-[#1A1A1A] px-2 py-1 font-sans text-[11px] uppercase tracking-[0.12em] text-[#F3EDE0]">
              {project.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ScrollRings() {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const live = useInView(ref, { margin: "0px 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [geo, setGeo] = useState({ startX: 0, baseline: 0, w0: 0, dot: 0, endX: 0, endY: 0, end: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      if (!stageRef.current || !lineRef.current) return;
      const s = stageRef.current.getBoundingClientRect();
      const l = lineRef.current.getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(lineRef.current).fontSize);
      const end = Math.min(window.innerWidth * 0.92, window.innerHeight * 0.8, 760) * 44 / 100;
      setGeo({
        startX: l.left - s.left,
        baseline: l.bottom - s.top,
        w0: l.width,
        dot: 0.16 * fs,
        end,
        endX: s.width / 2 - end / 2,
        endY: s.height / 2 - end / 2,
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Arriving from a "back to selected work" link lands on the cards, not the
  // top of the scene. 0.91 is where the middle card sits centred in the gallery.
  useEffect(() => {
    if (window.location.hash !== "#selected-work") return;
    const timer = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + 0.91 * (el.offsetHeight - window.innerHeight);
      window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
    }, 60);
    return () => window.clearTimeout(timer);
  }, []);

  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const drawT = useTransform(scrollYProgress, (p) => ease(clamp01((p - 0.04) / 0.12)));
  const shrinkT = useTransform(scrollYProgress, (p) => ease(clamp01((p - 0.16) / 0.08)));
  const travelT = useTransform(scrollYProgress, (p) => ease(clamp01((p - 0.22) / 0.2)));

  const morphLeft = useTransform([drawT, shrinkT, travelT], ([d, sh, tr]: number[]) => {
    const toDot = geo.startX + geo.w0 - geo.dot;
    const dotLeft = lerp(geo.startX, toDot, sh);
    return lerp(d < 1 ? geo.startX : dotLeft, geo.endX, tr);
  });
  const morphTop = useTransform([shrinkT, travelT], ([sh, tr]: number[]) => {
    const size = lerp(3, geo.dot, sh);
    const atDot = geo.baseline - size;
    return lerp(atDot, geo.endY, tr);
  });
  const morphWidth = useTransform([drawT, shrinkT, travelT], ([d, sh, tr]: number[]) => {
    const line = geo.w0 * d;
    const dot = lerp(line, geo.dot, sh);
    return lerp(dot, geo.end, tr);
  });
  const morphHeight = useTransform([shrinkT, travelT], ([sh, tr]: number[]) => {
    const dot = lerp(3, geo.dot, sh);
    return lerp(dot, geo.end, tr);
  });
  const morphRadius = useTransform(shrinkT, (sh) => `${999 * sh}px`);
  const morphScale = useTransform(scrollYProgress, (p) => {
    if (p < 0.74) return 1;
    if (p < 0.82) return 1 + ((p - 0.74) / 0.08) * (DISK_FILL - 1);
    return DISK_FILL;
  });
  const discOpacity = useTransform(scrollYProgress, [0.74, 0.82], [0.8, 1], { clamp: true });
  const textOpacity = useTransform(scrollYProgress, [0.24, 0.3], [1, 0], { clamp: true });
  const scaffoldOpacity = useTransform(scrollYProgress, [0.5, 0.56, 0.74, 0.82], [0, 1, 1, 0], { clamp: true });
  const scaffoldScale = useTransform(scrollYProgress, [0.74, 0.82], [1, 0.6], { clamp: true });

  if (reduced) return <StaticRings />;

  return (
    <div id="selected-work" ref={ref} className="relative h-[320vh] bg-[#F3EDE0] text-[#1A1A1A]">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-[22vh] px-6 text-center font-serif font-light leading-[1] text-[clamp(2.75rem,7vw,7rem)]"
          style={{ opacity: textOpacity }}
        >
          <p className="break-words">{hero.line1}</p>
          <p ref={lineRef} className="inline-block max-w-full break-words">
            {hero.line2A.replace(/\.$/, "")}
          </p>
        </motion.div>


        <motion.div
          className="absolute bg-[#6B1E2E]"
          style={{
            opacity: discOpacity,
            left: morphLeft,
            top: morphTop,
            width: morphWidth,
            height: morphHeight,
            borderRadius: morphRadius,
            scale: morphScale,
            transformOrigin: "center",
          }}
        />

        <div className="absolute left-1/2 top-1/2 h-[min(92vw,80vh,760px)] w-[min(92vw,80vh,760px)] -translate-x-1/2 -translate-y-1/2">
          <motion.div className="absolute inset-0" style={{ opacity: scaffoldOpacity, scale: scaffoldScale }}>
            {RINGS.map((r, i) => (
              <Ring key={r} r={r} index={i} progress={scrollYProgress} live={live} />
            ))}
          </motion.div>
        </div>

        <Gallery progress={scrollYProgress} />
      </div>
    </div>
  );
}
