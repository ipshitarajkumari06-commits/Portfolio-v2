import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Reveal from "@/components/motion/Reveal";
import BackPrompt from "@/components/collections/BackPrompt";
import { tataOneWorld as c } from "@/lib/collections/tata-one-world";
import ContinuityCompare from "./ContinuityCompare";
import Tilt3D from "./Tilt3D";
import AssembleLogo from "./AssembleLogo";
import CursorGlow, { GlowPanels } from "./CursorGlow";
import Parallax from "./Parallax";
import CollectionHero from "@/components/collections/CollectionHero";

const BODY =
  "font-sans text-lg font-light leading-relaxed text-fg/85 md:text-xl";
const LABEL =
  "font-sans text-xs font-medium uppercase tracking-[0.22em] text-fg/70";
const CAPTION = "mt-5 font-sans text-sm font-light leading-relaxed text-fg/70";

// The chapters of the case, in reading order, for the side index on wide screens.
const CHAPTERS = [
  { id: "brief", label: "Brief" },
  { id: "logo", label: "Logo" },
  { id: "theme", label: "Theme" },
  { id: "programme", label: "Programme" },
  { id: "watch", label: "Watch" },
];

// The jharokha arch is the motif of this case: the image masks take its shape.
const ARCH =
  "overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]";

// Champagne gradient for the closing line: a quieter, more refined accent than the ember tones.
const CHAMPAGNE =
  "bg-gradient-to-r from-amber-50 via-amber-200 to-amber-400 bg-clip-text text-transparent";

type Visual = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

function ArchFigure({ v, className = "" }: { v: Visual; className?: string }) {
  return (
    <Parallax speed={0.1}>
      <figure className={className}>
        <Tilt3D>
          <div className={`tow-arch ${ARCH}`}>
            <Image
              src={v.src}
              alt={v.alt}
              width={v.width}
              height={v.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Tilt3D>
        <figcaption className={CAPTION}>{v.caption}</figcaption>
      </figure>
    </Parallax>
  );
}

// The Last Sword artwork is cut into puzzle segments that come together as it enters
// view, the same assembly as the logo, so the whole image is shown.
function PuzzleFigure({ v }: { v: Visual }) {
  return (
    <Parallax speed={0.12}>
      <figure>
        <AssembleLogo
          src={v.src}
          alt={v.alt}
          width={v.width}
          height={v.height}
        />
        <figcaption className={CAPTION}>{v.caption}</figcaption>
      </figure>
    </Parallax>
  );
}

function Continuity({
  label,
  height,
  before,
  after,
}: {
  label: string;
  height: string;
  before: Visual;
  after: Visual;
}) {
  return (
    <Reveal>
      <div className="mt-16 md:mt-24">
        <p className={`${LABEL} mb-6`}>{label}</p>
        <Parallax speed={0.1}>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03]">
            <ContinuityCompare height={height} before={before} after={after} />
          </div>
        </Parallax>
      </div>
    </Reveal>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <CursorGlow className="rounded-[32px] py-6">
      <GlowPanels />
      <div className="relative space-y-6">
        {items.map((p, i) => (
          <Reveal key={p} delay={i * 0.08}>
            <p className={BODY}>{p}</p>
          </Reveal>
        ))}
      </div>
    </CursorGlow>
  );
}

// Decision layout: a ruled section with the label held in a sticky left column,
// and the reasoning and render on the right.
function Decision({
  id,
  label,
  children,
  visual,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
  visual: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto mt-16 max-w-5xl scroll-mt-24 border-t border-white/10 pt-10 md:mt-32 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16"
    >
      <div className="relative md:sticky md:top-40 md:self-start">
        <Reveal>
          <h3 className="relative font-serif text-2xl font-light leading-tight text-fg md:text-3xl">
            {label}
          </h3>
        </Reveal>
      </div>
      <div className="max-w-xl">
        {children}
        <div className="mt-12">{visual}</div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: `${c.title} — ${c.discipline}`,
  description: c.thesis,
};

const TICKER = [
  "BELIEVE",
  "Become Excellence",
  "F.I.R.E.",
  "Fearless Innovation",
  "Resilient Execution",
  "One World",
];

// Tall, softly blurred columns of light, after the glowing panels of the Web3 reference.
export default function TataOneWorldPage() {
  return (
    <main className="overflow-x-hidden">
      <style>{`
        @keyframes tow-marquee { to { transform: translateX(-50%); } }
        .tow-marquee { animation: tow-marquee 40s linear infinite; }
        @keyframes tow-shimmer { to { background-position: 200% center; } }
        .tow-shimmer { background-size: 200% auto; animation: tow-shimmer 7s linear infinite; }
        @keyframes tow-arch-in {
          from { clip-path: inset(100% 0 0 0 round 28px); }
          to { clip-path: inset(0 0 0 0 round 28px); }
        }
        @supports (animation-timeline: view()) {
          .tow-arch {
            animation: tow-arch-in linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 45%;
          }
        }
        @keyframes tow-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @supports (animation-timeline: scroll()) {
          .tow-progress { animation: tow-progress linear both; animation-timeline: scroll(root); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tow-progress { animation: none; }
          .tow-marquee { animation: none; }
          .tow-shimmer { animation: none; }
          .tow-arch { animation: none; }
        }
      `}</style>

      {/* Opening, set the same way as the BMW case: kicker, title, then the wide key visual. */}
      <CollectionHero
        kicker={c.kicker}
        discipline={c.discipline}
        title={c.title}
        heroImageLabel="The F.I.R.E. key visual for Tata Motors One World"
        heroImageSrc="/images/tata-one-world/fire-key-visual.webp"
      />

      {/* A quiet chapter index for wide screens, so the reader can jump between decisions. */}
      <nav
        aria-label="Chapters"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      >
        <ol className="space-y-4">
          {CHAPTERS.map((ch) => (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className="group flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-fg/70 transition-colors hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-200"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-white/30 transition-all duration-500 group-hover:w-10 group-hover:bg-amber-200"
                />
                {ch.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Container>
        {/* The question, set as the opening statement. */}
        <section className="mx-auto mt-28 max-w-5xl md:mt-48">
          <Reveal>
            <p className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.02] text-fg">
              {c.question}
            </p>
          </Reveal>
        </section>

        {/* The brief and the first direction, as two arches side by side. */}
        <section
          id="brief"
          className="mt-28 grid scroll-mt-24 gap-16 md:mt-48 md:grid-cols-2 md:gap-24"
        >
          <Reveal>
            <p className={LABEL}>{c.brief.label}</p>
            <div className="mt-8">
              <Paragraphs items={c.brief.paragraphs} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={LABEL}>{c.choice.label}</p>
            <div className="mt-8">
              <Paragraphs items={c.choice.paragraphs} />
            </div>
          </Reveal>
        </section>

        {/* The answer, after the setup it depends on. */}
        <CursorGlow className="mx-auto mt-32 max-w-5xl rounded-[32px] py-6 md:mt-48">
          <GlowPanels />
          <div className="relative">
            <Reveal delay={0.1}>
              <p className={`${BODY} mt-10 max-w-2xl`}>{c.answer}</p>
              <p className="mt-8 font-serif text-2xl font-light leading-snug text-fg md:text-3xl">{c.principle}</p>
            </Reveal>
          </div>
        </CursorGlow>




        <Decision
          label={c.decisionOne.label}
          visual={<ArchFigure v={c.decisionOne.image} />}
        >
          <Paragraphs items={c.decisionOne.paragraphs} />
        </Decision>

        {/* The rationale slide is shown full width, so its labels remain readable. */}
        <section id="logo" className="mt-24 scroll-mt-24 md:mt-32">
          <Reveal>
            <figure>
              <Parallax speed={0.12}>
                <AssembleLogo
                  src={c.decisionOne.rationale.src}
                  alt={c.decisionOne.rationale.alt}
                />
                <figcaption className={CAPTION}>
                  {c.decisionOne.rationale.caption}
                </figcaption>
              </Parallax>
            </figure>
          </Reveal>
        </section>

        <Decision
          id="theme"
          label={c.decisionTwo.label}
          visual={<ArchFigure v={c.decisionTwo.image} />}
        >
          <Paragraphs items={c.decisionTwo.paragraphs} />
        </Decision>

        <section className="mt-12">
          {c.decisionTwo.continuity.map((item) => (
            <Continuity
              key={item.label}
              label={item.label}
              height={item.height}
              before={item.before}
              after={item.after}
            />
          ))}
        </section>

        <Decision
          id="programme"
          label={c.decisionThree.label}
          visual={<PuzzleFigure v={c.decisionThree.image} />}
        >
          <Paragraphs items={c.decisionThree.paragraphs} />
        </Decision>

        {/* The reel, the short and the anthem, as three arches to open. */}
        <section id="watch" className="mt-32 scroll-mt-24 md:mt-56">
          <p className={`${LABEL} mb-6`}>Watch and listen</p>
          <CursorGlow className="rounded-[32px] py-2">
            <GlowPanels />
            <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {c.videos.map((video, i) => (
                <Reveal key={video.url} delay={i * 0.08}>
                  <Tilt3D className="h-full">
                    <a
                      href={video.url}
                      className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-200/0 via-amber-200/15 to-rose-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <span className="block font-sans text-[11px] uppercase tracking-[0.22em] text-fg/50">
                        0{i + 1}
                      </span>
                      <span className="mt-6 flex items-end justify-between font-serif text-3xl font-light leading-tight text-fg">
                        {video.label}
                        <span
                          aria-hidden="true"
                          className="ml-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          </CursorGlow>
        </section>

        <section className="mx-auto mt-32 max-w-3xl md:mt-48">
          <Reveal>
            <div className="relative border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-200/80 to-transparent" />
              <p className={`${LABEL} mb-6`}>The trade-off</p>
              <p className="font-serif text-2xl font-light leading-snug text-fg md:text-3xl">{c.tradeOff}</p>
            </div>
          </Reveal>
        </section>

      </Container>

      {/* The closing line, set over glowing panels in the manner of the Web3 reference. */}
      <CursorGlow className="mt-40 py-40 md:mt-64 md:py-56">
        <GlowPanels />
        <Container>
          <Reveal>
            <h2 className="relative mx-auto max-w-6xl font-serif text-[clamp(3rem,6vw,5.5rem)] font-extralight leading-[0.95] tracking-[-0.03em] text-fg">
              <span className="block">{c.closing.lead}</span>
              <span className={`tow-shimmer block italic ${CHAMPAGNE}`}>
                {c.closing.accent}
              </span>
            </h2>
          </Reveal>
        </Container>
      </CursorGlow>

      <BackPrompt />
    </main>
  );
}
