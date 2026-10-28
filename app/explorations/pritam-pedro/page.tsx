import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Kicker from "@/components/typography/Kicker";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import BackPrompt from "@/components/collections/BackPrompt";
import { pritamPedro as c } from "@/lib/collections/pritam-pedro";

const IMG = "/images/pritam-pedro";

// Three widths, used everywhere on the page and nowhere else:
// LARGE: openers and panels, edge to edge of the container.
// STANDARD: copy, set in a single measure.
// SUPPORTING: image rows, inset to 72% on wider screens.
const LARGE = "mx-auto w-full max-w-container px-gutter";
const STANDARD = "flex w-full max-w-3xl flex-col gap-8";
const SUPPORTING = "mx-auto w-full md:w-[72%]";

// Three text sizes site-wide: display (titles), emphasis (statements), body.
const DISPLAY = "font-serif text-[clamp(3rem,10vw,8rem)] font-light leading-[0.95] text-fg";
const EMPHASIS = "font-serif text-3xl font-light leading-snug text-fg md:text-4xl";
const BODY = "font-sans text-xl font-light leading-relaxed text-fg/90 md:text-2xl";
const LABEL = "font-sans text-[12px] uppercase tracking-[0.16em] text-fg/70";

export const metadata: Metadata = {
  title: `${c.title} — JioHotstar Trailer Launch, Ipshita Rajkumari`,
  description: c.challenge.question,
};

// A full-width still, edge to edge, with the chapter's number and title over its base.
function Opener({ src, label, numeral, title }: { src: string; label: string; numeral: string; title: string }) {
  return (
    <figure className="w-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9]">
        <Image src={src} alt={label} fill sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className={`absolute inset-x-0 bottom-0 pb-8 md:pb-12 ${LARGE}`}>
          <span className="font-sans text-[12px] tracking-[0.14em] text-fg/75">{numeral}</span>
          <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.14em] text-fg/80">{label}</p>
          <p className={`mt-3 ${DISPLAY}`}>{title}</p>
        </div>
      </div>
    </figure>
  );
}

// A full-width statement, set large with room around it.
function PullQuote({ text }: { text: string }) {
  return (
    <div className={`py-[clamp(4rem,12vh,8rem)] ${LARGE}`}>
      <p className="mx-auto max-w-5xl font-serif text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[1.02] text-fg">
        {text}
      </p>
    </div>
  );
}

// A smaller image, shown whole with its caption.
function Still({ src, label, ratio = "aspect-[4/5]" }: { src: string; label: string; ratio?: string }) {
  return (
    <figure className="w-full">
      <div className={`relative ${ratio} w-full overflow-hidden`}>
        <Image src={src} alt={label} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      <p className="mt-3 font-sans text-[12px] leading-snug text-fg/80">{label}</p>
    </figure>
  );
}

// A step of the guest journey: one image, labelled.
function Step({ label, src, alt }: { label: string; src?: string; alt?: string }) {
  return (
    <li className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden">
        {src ? (
          <Image src={src} alt={alt ?? ""} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4">
            <p className="text-center font-serif text-xl font-light text-fg/85">{alt}</p>
          </div>
        )}
      </div>
      <p className={LABEL}>{label}</p>
    </li>
  );
}

// The track name above a group of images.
function TrackTag({ label }: { label: string }) {
  return <p className={`mb-4 ${LABEL}`}>{label}</p>;
}

type CopyLine = string | { text: string; emphasis?: boolean };

// A block of copy. Each line can carry its own emphasis.
function Beat({ lines, emphasis = false }: { lines: CopyLine[]; emphasis?: boolean }) {
  return (
    <div className={STANDARD}>
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

// The dark wine panel that holds a chapter's copy and smaller images.
const PANEL =
  "rounded-3xl bg-[radial-gradient(120%_90%_at_0%_0%,#7a2236_0%,#2a0d15_40%,#070405_100%)] p-6 md:p-12";

// A fine warm grain behind the black, so the page has a surface rather than a flat fill.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.93  0 0 0 0 0.88  0 0 0 0.12 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export default function PritamPedroPage() {
  return (
    <div className="bg-black" style={{ backgroundImage: GRAIN }}>
      {/* Billboard: the name over the show's stage, and what kind of work this is. */}
      <section className="relative flex min-h-screen w-full items-end overflow-hidden">
        <Image
          src={`${IMG}/hero-scooter-entry.jpg`}
          alt={c.heroImageLabel}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        <Container className="relative pb-[clamp(3rem,9vh,6rem)]">
          <div>
            <Kicker className="mb-2 text-fg/85">{c.kicker}</Kicker>
            <span className="block font-sans text-kicker uppercase text-fg/70">{c.discipline}</span>
          </div>
          <div>
            <Display as="h1" className="max-w-3xl">
              {c.title}
            </Display>
          </div>
        </Container>
      </section>

      {/* The chapter index: four links, scrolled to on phones, gridded on desktop. */}
      <nav aria-label="Chapters" className={`pt-[clamp(3rem,8vh,5rem)] ${LARGE}`}>
        <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {[
            { id: "chapter-01", numeral: "01", label: c.challenge.label },
            { id: "chapter-02", numeral: "02", label: c.idea.label },
            { id: "chapter-03", numeral: "03", label: c.experience.label },
          ].map((item) => (
            <li key={item.id} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <a href={`#${item.id}`} className="group block rounded-full border border-fg/30 px-5 py-3 transition-colors hover:border-fg/70">
                <span className="font-sans text-[12px] tracking-[0.12em] text-fg/60">{item.numeral}</span>
                <span className="ml-3 font-serif text-lg font-light text-fg">{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-[clamp(4rem,10vh,6rem)] space-y-[clamp(3rem,8vh,5rem)]">
        {/* 01 — The challenge: the stage opens it, the key art sits beside the question. */}
        <section id="chapter-01" className="scroll-mt-24">
          <Opener src={`${IMG}/stage-environment.jpg`} label={c.challenge.imageLabel} numeral="01" title={c.challenge.label} />
          <div className={`mt-14 ${LARGE}`}>
            <div className={PANEL}>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start">
                <div className="md:col-span-5">
                  <div className={`relative aspect-square w-full overflow-hidden`}>
                    <Image src={`${IMG}/series-poster.jpg`} alt={c.challenge.seriesPosterImageLabel} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                  <p className="mt-3 font-sans text-[12px] leading-snug text-fg/80">{c.challenge.seriesPosterImageLabel}</p>
                </div>
                <div className="md:col-span-7 md:pt-4">
                  <Beat lines={[{ text: c.challenge.question, emphasis: true }, ...c.challenge.paragraphs]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — The idea: the pairing mechanic opens it, then the statement. */}
        <section id="chapter-02" className="scroll-mt-24">
          <Opener src={`${IMG}/find-your-bro.jpg`} label={c.idea.imageLabel} numeral="02" title={c.idea.label} />
          <PullQuote text={c.idea.pullQuote} />
          <div className={LARGE}>
            <div className={PANEL}>
              <Beat lines={[{ text: c.idea.display, emphasis: true }, ...c.idea.paragraphs]} />
            </div>
          </div>
        </section>

        {/* 03 — The experience: the trailer opens it, then the journey, the reference images and the launch. */}
        <section id="chapter-03" className="scroll-mt-24">
          <Opener src={`${IMG}/trailer-reveal.jpg`} label={c.experience.trailerImageLabel} numeral="03" title={c.experience.label} />
          <div className={`mt-14 ${LARGE}`}>
            <div className={PANEL}>
              <Beat lines={c.experience.paragraphs} />

              <div className={`mt-16 ${SUPPORTING}`}>
                <TrackTag label={c.tracks.concept} />
                <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  <Step label={c.experience.stepLabels[1]} src={`${IMG}/crack-the-code.jpg`} alt={c.experience.crackImageLabel} />
                  <Step label={c.experience.stepLabels[2]} src={`${IMG}/reward-cassette-wall.jpg`} alt={c.experience.rewardText} />
                  <Step label={c.experience.stepLabels[3]} src={`${IMG}/trailer-reveal.jpg`} alt={c.experience.trailerImageLabel} />
                </ol>
              </div>

              <div className={`mt-16 ${SUPPORTING}`}>
                <TrackTag label={c.tracks.concept} />
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Still src={`${IMG}/live-caricature.jpg`} label={c.experience.liveCaricatureImageLabel} />
                  <Still src={`${IMG}/caricature-portrait.jpg`} label={c.experience.caricatureImageLabel} />
                </div>
                <p className="mt-4 font-sans text-[12px] leading-snug text-fg/70">{c.experience.referenceNote}</p>
              </div>

              <div className={`mt-16 ${SUPPORTING}`}>
                <TrackTag label={c.tracks.official} />
                <Still src={`${IMG}/series-atm-keyart.jpg`} label={c.experience.seriesAtmImageLabel} ratio="aspect-video" />
              </div>

              <div className={`mt-16 ${SUPPORTING}`}>
                <TrackTag label={c.tracks.launch} />
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Still src={`${IMG}/launch-cast.jpg`} label={c.experience.launchCastImageLabel} ratio="aspect-[3/2]" />
                  <Still src={`${IMG}/launch-scooter-entry.jpg`} label={c.experience.launchScooterImageLabel} ratio="aspect-[3/2]" />
                </div>
              </div>
            </div>
          </div>
          <PullQuote text={c.experience.close} />
        </section>
      </div>

      {/* The way back to the selected work, as in the other case studies. */}
      <div className={`mt-[clamp(6rem,14vh,9rem)] pb-[clamp(4rem,10vh,6rem)] ${LARGE}`}>
        <BackPrompt />
      </div>
    </div>
  );
}
