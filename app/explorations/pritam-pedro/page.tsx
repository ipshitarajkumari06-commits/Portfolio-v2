import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import BackPrompt from "@/components/collections/BackPrompt";
import Enlargeable from "@/components/collections/Enlargeable";
import { pritamPedro as c } from "@/lib/collections/pritam-pedro";

const IMG = "/images/pritam-pedro";
const LARGE = "mx-auto w-full max-w-container px-gutter";
const STANDARD = "flex w-full max-w-2xl flex-col gap-8";
const BODY = "font-sans text-xl font-light leading-relaxed text-fg/90 md:text-2xl";
const EMPHASIS = "font-serif text-3xl font-light leading-snug text-fg md:text-4xl";
const LABEL = "font-sans text-[12px] uppercase tracking-[0.16em] text-fg/70";

export const metadata: Metadata = {
  title: `${c.title} — JioHotstar Trailer Launch, Ipshita Rajkumari`,
  description: c.challenge.question,
};

// A title page in the style of a streaming app: the title image, the name and
// its meta line, one primary action, the tags, and then the episode list with
// a thumbnail for each episode. "Read more" opens an episode in place (native
// details elements, so it works without JavaScript). Nothing moves except the
// reveal of copy.

// A 16:9 still with its label beneath.
function Still({ src, label, track }: { src: string; label: string; track?: string }) {
  return (
    <figure className="w-full">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image src={src} alt={label} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1">
        {track ? <span className={LABEL}>{track}</span> : null}
        <span className="font-sans text-[13px] leading-snug text-fg/80">{label}</span>
      </figcaption>
    </figure>
  );
}

// A smaller image with its label, for a row of related images.
function Card({ src, label, track, ratio = "aspect-video" }: { src: string; label: string; track?: string; ratio?: string }) {
  return (
    <figure className="w-full">
      <div className={`relative ${ratio} w-full overflow-hidden`}>
        <Image src={src} alt={label} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1">
        {track ? <span className={LABEL}>{track}</span> : null}
        <span className="font-sans text-[13px] leading-snug text-fg/80">{label}</span>
      </figcaption>
    </figure>
  );
}

// A step of the guest journey: one image and its label.
function Scene({ label, src, alt }: { label: string; src?: string; alt?: string }) {
  return (
    <li className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden">
        {src ? (
          <Image src={src} alt={alt ?? ""} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <p className="text-center font-serif text-xl font-light text-fg/85">{alt}</p>
          </div>
        )}
      </div>
      <p className={LABEL}>{label}</p>
    </li>
  );
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

// A full-width statement inside an episode.
function PullQuote({ text }: { text: string }) {
  return (
    <div className="py-[clamp(3rem,8vh,5rem)]">
      <p className="max-w-5xl font-serif text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1.05] text-fg">{text}</p>
    </div>
  );
}

// One episode row: a thumbnail, the number and title, and one line of summary.
// Opening the row shows the full episode beneath it.
function Episode({ number, title, summary, thumb, open = false, children }: { number: string; title: string; summary: string; thumb: { src: string; alt: string }; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group">
      <summary className="flex cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
        <Enlargeable src={thumb.src} alt={thumb.alt} />
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className={LABEL}>Episode {number}</span>
          <span className="font-sans text-lg font-medium leading-snug text-fg md:text-xl">{title}</span>
          <span className="font-sans text-[14px] leading-snug text-fg/75 md:text-base">{summary}</span>
          <span className="mt-1 font-sans text-[12px] uppercase tracking-[0.16em] text-fg/60 group-open:hidden">Read more</span>
          <span className="mt-1 hidden font-sans text-[12px] uppercase tracking-[0.16em] text-fg/60 group-open:block">Close</span>
        </span>
      </summary>
      <div className="pb-[clamp(3rem,8vh,5rem)]">{children}</div>
    </details>
  );
}

export default function PritamPedroPage() {
  return (
    <div className="bg-black">
      {/* Title page: the image, the name and meta, one action, the tags. */}
      <section className={`pt-[clamp(5rem,14vh,8rem)] ${LARGE}`}>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl sm:aspect-[16/9]">
          <Image src={`${IMG}/hero-scooter-entry.jpg`} alt={c.heroImageLabel} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className={LABEL}>{c.kicker}</p>
          <h1 className="font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-[1.1] text-fg">{c.challenge.question}</h1>
          <p className="font-sans text-[13px] uppercase tracking-[0.16em] text-fg/70">{c.discipline} · 3 Episodes</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <a href="#episode-01" className="block rounded-md bg-fg px-6 py-4 text-center font-sans text-lg font-medium text-bg transition-opacity hover:opacity-85">
            Start with Episode 1
          </a>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl justify-around text-fg/75" aria-hidden="true">
          {[
            { label: "Watchlist", icon: "M12 5v14M5 12h14" },
            { label: "Share", icon: "M15 8l5 4-5 4M20 12H9a5 5 0 0 0-5 5" },
            { label: "Rate", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" },
          ].map((item) => (
            <span key={item.label} className="flex flex-col items-center gap-2 font-sans text-[13px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center font-sans text-[14px] uppercase tracking-[0.12em] text-fg/70">
          Experiential · OTT · Entertainment · Launch
        </p>
      </section>

      {/* The episodes, in order, each with its thumbnail. */}
      <section aria-label="Episodes" className={`mt-[clamp(4rem,10vh,6rem)] ${LARGE}`}>
        <div className="mb-2 inline-block border-b-2 border-fg pb-2 font-sans text-lg font-medium text-fg">Episodes</div>

        <div id="episode-01" className="scroll-mt-24">
          <Episode number="1" title={c.challenge.label} summary={c.challenge.summary} thumb={{ src: `${IMG}/stage-environment.jpg`, alt: c.challenge.imageLabel }}>
            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                <div className="md:col-span-5">
                  <Card src={`${IMG}/series-poster.jpg`} label={c.challenge.seriesPosterImageLabel} track={c.tracks.official} ratio="aspect-square" />
                </div>
                <div className="md:col-span-7">
                  <Beat lines={c.challenge.paragraphs.filter((line) => line !== c.challenge.summary)} />
                </div>
              </div>
            </div>
          </Episode>
        </div>

        <div id="episode-02" className="scroll-mt-24">
          <Episode number="2" title={c.idea.pullQuote} summary={c.idea.display} thumb={{ src: `${IMG}/find-your-bro.jpg`, alt: c.idea.imageLabel }}>
            <div className="flex flex-col gap-12">
              <Beat lines={c.idea.paragraphs} />
            </div>
          </Episode>
        </div>

        <div id="episode-03" className="scroll-mt-24">
          <Episode number="3" title={c.experience.label} summary={c.experience.summary} thumb={{ src: `${IMG}/trailer-reveal.jpg`, alt: c.experience.trailerImageLabel }}>
            <div className="flex flex-col gap-12">
              <Beat lines={c.experience.paragraphs} />
              <div>
                <p className={`mb-6 ${LABEL}`}>Scenes</p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-8">
                    <Scene label={c.experience.stepLabels[1]} src={`${IMG}/crack-the-code.jpg`} alt={c.experience.crackImageLabel} />
                    <Scene label="Official key art" src={`${IMG}/series-atm-keyart.jpg`} alt={c.experience.seriesAtmImageLabel} />
                  </div>
                  <Scene label={c.experience.stepLabels[2]} src={`${IMG}/reward-cassette-wall.jpg`} alt={c.experience.rewardText} />
                </div>
              </div>
              <div>
                <p className={`mb-6 ${LABEL}`}>More from this episode</p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <Card src={`${IMG}/live-caricature.jpg`} label={c.experience.liveCaricatureImageLabel} track={c.tracks.concept} ratio="aspect-[4/5]" />
                  <Card src={`${IMG}/caricature-portrait.jpg`} label={c.experience.caricatureImageLabel} track={c.tracks.concept} ratio="aspect-[4/5]" />
                </div>
                <p className="mt-6 font-sans text-[13px] leading-snug text-fg/70">{c.experience.referenceNote}</p>
              </div>
              <PullQuote text={c.experience.close} />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card src={`${IMG}/launch-cast.jpg`} label={c.experience.launchCastImageLabel} track={c.tracks.launch} ratio="aspect-[3/2]" />
                <Card src={`${IMG}/launch-scooter-entry.jpg`} label={c.experience.launchScooterImageLabel} track={c.tracks.launch} ratio="aspect-[3/2]" />
              </div>
            </div>
          </Episode>
        </div>
      </section>

      {/* The way back to the selected work, as in the other case studies. */}
      <div className={`mt-[clamp(4rem,10vh,6rem)] pb-[clamp(4rem,10vh,6rem)] ${LARGE}`}>
        <BackPrompt />
      </div>
    </div>
  );
}
