import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Kicker from "@/components/typography/Kicker";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import { airports as c } from "@/lib/collections/airports";
import BackPrompt from "@/components/collections/BackPrompt";

const IMG = "/images/airports";
const BODY = "font-sans text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const EMPHASIS = "font-serif text-2xl font-light text-fg md:text-3xl";

export const metadata: Metadata = {
  title: `${c.title} — International Airports, Ipshita Rajkumari`,
  description: typeof c.assam.paragraphs[0] === "string" ? c.assam.paragraphs[0] : c.assam.paragraphs[0].text,
};

// Air traffic control, not editorial scrolling: one command holds the
// screen at a time. Nothing fades in behind it, nothing keeps moving once
// it has settled. The scroll itself is the only mechanism, snapping from
// one full-viewport authority to the next.
// The signature: fine vertical strands, drawn from the bamboo-orchid ceiling
// of the Guwahati terminal. They sit behind the opening title only, fading
// out toward the edges.
function BambooStrands() {
  const mask = "radial-gradient(ellipse at center, black 35%, transparent 85%)";
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "@keyframes strand-drift { from { background-position: 0 0; } to { background-position: 9px 0; } }",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22] motion-safe:animate-[strand-drift_4s_linear_infinite]"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, #F3EDE0 0 2px, transparent 2px 9px)",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </>
  );
}

// Photographs and chapter titles hold a full screen. Copy stops size to their
// text, so short passages don't sit in large empty stops.
function Frame({ children, className = "", full = true }: { children: React.ReactNode; className?: string; full?: boolean }) {
  return (
    <section className={`flex w-full items-center justify-center ${full ? "min-h-screen" : "py-[clamp(5rem,14vh,9rem)]"} ${className}`}>
      {children}
    </section>
  );
}

// A caption with a small wine rule, so the photographs read as documents.
function Caption({ label, className = "" }: { label: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-sans text-[13px] uppercase tracking-[0.14em] text-fg ${className}`}>
      <span aria-hidden="true" className="h-0.5 w-12 bg-[#8E2B40]" />
      {label}
    </p>
  );
}

function ImageFrame({ src, label }: { src: string; label: string }) {
  return (
    <Frame className="relative">
      <Image src={src} alt={label} fill sizes="100vw" className="object-cover" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 to-transparent" />
      <Caption label={label} className="absolute bottom-6 left-6 right-6 md:left-12" />
    </Frame>
  );
}

function DocumentaryFrame({ src, label, ratio }: { src: string; label: string; ratio: number }) {
  return (
    <Frame>
      <figure className="w-full">
        <div className="relative w-full overflow-hidden bg-fg/[0.02]" style={{ aspectRatio: ratio }}>
          <Image src={src} alt={label} fill sizes="100vw" className="object-contain" />
        </div>
        <Caption label={label} className="mt-4" />
      </figure>
    </Frame>
  );
}

type CopyLine = string | { text: string; emphasis?: boolean };

// A copy stop. A line can carry its own emphasis, so the thesis of a
// paragraph is set larger without a separate stop.
function CopyFrame({ lines, emphasis = false }: { lines: CopyLine[]; emphasis?: boolean }) {
  return (
    <Frame full={false}>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <span aria-hidden="true" className="block h-px w-10 bg-[#8E2B40]" />
          {lines.map((line, i) => {
            const text = typeof line === "string" ? line : line.text;
            const isEmphasis = typeof line === "string" ? emphasis : Boolean(line.emphasis) || emphasis;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <p className={isEmphasis ? EMPHASIS : BODY}>{text}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Frame>
  );
}

// A chapter opens on a full screen title, marked by a wine rule.
function ChapterFrame({ label, numeral }: { label: string; numeral: string }) {
  return (
    <Frame className="relative overflow-hidden">
      <BambooStrands />
      <Container>
        <p className="mb-6 font-sans text-[11px] uppercase tracking-[0.16em] text-fg/60">Chapter {numeral}</p>
        <p className="font-serif text-[clamp(2.75rem,7vw,6rem)] font-light leading-[1.02] text-fg">{label}</p>
      </Container>
    </Frame>
  );
}

// A chapter beat with a wine rule. Each beat fills most of a screen, so the
// reader reads it against the photograph that stays pinned beside it.
function Beat({ lines, emphasis = false }: { lines: CopyLine[]; emphasis?: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-6 py-[8vh]">
      <span aria-hidden="true" className="block h-px w-10 bg-[#8E2B40]" />
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const isEmphasis = typeof line === "string" ? emphasis : Boolean(line.emphasis) || emphasis;
        return (
          <Reveal key={i} delay={i * 0.05}>
            <p className={isEmphasis ? EMPHASIS : BODY}>{text}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

// A photograph that stays pinned to the left on wide screens while the copy
// steps past it on the right. On phones it stacks: photograph, then copy.
function PinnedChapter({ src, label, contain = false, children }: { src: string; label: string; contain?: boolean; children: React.ReactNode }) {
  return (
    <section className="mx-auto grid w-full max-w-container gap-10 px-gutter sm:grid-cols-[1.4fr_1fr] sm:gap-12">
      <div className="sm:sticky sm:top-0 sm:h-screen sm:py-12">
        <div className="relative h-[55vh] w-full overflow-hidden sm:h-full">
          <Image src={src} alt={label} fill sizes="(min-width: 640px) 58vw, 100vw" className={contain ? "object-contain" : "object-cover"} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
          <Caption label={label} className="absolute bottom-5 left-5 right-5" />
        </div>
      </div>
      <div className="flex flex-col py-[12vh]">{children}</div>
    </section>
  );
}

export default function InternationalAirportsPage() {
  return (
    <div>
      {/* A soft scrim keeps the site header legible over the photographs. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-black/80 to-transparent" />

      <Frame className="relative overflow-hidden">
        <BambooStrands />
        <Container>
          <div>
            <Kicker className="mb-2 text-fg/85">{c.kicker}</Kicker>
            <span className="mb-8 block font-sans text-kicker uppercase text-fg/70">{c.discipline}</span>
          </div>
          <div>
            <Display as="h1" className="max-w-3xl">
              {c.title}
            </Display>
          </div>
        </Container>
      </Frame>

      {/* Guwahati: each photograph stays pinned while its copy steps past it. */}
      <PinnedChapter src={`${IMG}/ghy-ceiling.png`} label={c.hero.imageLabel}>
        <Beat lines={c.assam.paragraphs} />
        <Beat lines={c.assam.ceremony} />
      </PinnedChapter>
      <PinnedChapter src={`${IMG}/ghy-performance.png`} label={c.assam.ceremonyImageLabel}>
        <Beat lines={c.assam.facetsIntro} />
      </PinnedChapter>
      <DocumentaryFrame src={`${IMG}/ghy-collage.png`} label={c.assam.systemsImageLabel} ratio={2167 / 726} />
      <PinnedChapter src={`${IMG}/ghy-showcase.png`} label={c.assam.showcaseImageLabel}>
        <Beat lines={c.assam.facets} />
      </PinnedChapter>
      <PinnedChapter src={`${IMG}/ghy-model.png`} label={c.assam.modelImageLabel}>
        <Beat lines={c.assam.discipline} />
        <Beat lines={c.assam.close} emphasis />
      </PinnedChapter>

      {/* Navi Mumbai: a chapter break with its own name, so the second case reads as a new chapter. */}
      <ChapterFrame label={c.navimumbai.label} numeral="02" />
      {/* Navi Mumbai: the same pinned sequence as Guwahati. */}
      <PinnedChapter src={`${IMG}/nmial-exterior.webp`} label={c.navimumbai.exteriorImageLabel}>
        <Beat lines={c.navimumbai.paragraphs} />
        <Beat lines={c.navimumbai.heritage} />
      </PinnedChapter>
      <PinnedChapter src={`${IMG}/nmial-led-screen.png`} label={c.navimumbai.techImageLabel}>
        <Beat lines={c.navimumbai.tech} />
      </PinnedChapter>
      <PinnedChapter src={`${IMG}/nmial-collage.png`} label={c.navimumbai.systemsImageLabel} contain>
        <Beat lines={c.navimumbai.systems} />
        <Beat lines={c.navimumbai.close} emphasis />
      </PinnedChapter>

      {/* The way back to the selected work, as in the BMW case study. */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-container items-center overflow-hidden px-gutter py-section">
        <BambooStrands />
        <BackPrompt />
      </div>
    </div>
  );
}
