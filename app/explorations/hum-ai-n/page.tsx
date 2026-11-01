import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import EpisodePlayer from "@/components/collections/EpisodePlayer";
import BriefSection from "@/components/collections/BriefSection";
import Container from "@/components/layout/Container";
import Notebook from "@/components/collections/Notebook";
import BackPrompt from "@/components/collections/BackPrompt";
import { CHANNELS } from "@/components/collections/PlatformMarks";
import Realisation from "@/components/collections/Realisation";
import Transformation from "@/components/collections/Transformation";
import { humAiN as c } from "@/lib/collections/hum-ai-n";

// The five published episodes. Five more are coming.
const EPISODES = [
  { n: 1, id: "buIf9gtBDXY", title: "Purpose Never Sleeps" },
  { n: 2, id: "iMKDwhY-bo0", title: "Power of Silence" },
  { n: 3, id: "85CHxzHnCCI", title: "From Millimetres to Millions" },
  { n: 4, id: "gREaNCdPbhQ", title: "One Bolt, Endless Possibilities" },
  { n: 5, id: "KZ0MygGymXE", title: "A Second Chance" },
];

export const metadata: Metadata = {
  title: "HUM.AI.N — Tata Motors, Ipshita Rajkumari",
  description: c.brief.statement,
};

// One continuous editorial essay, not a sequence of screens. Spacing
// between beats is content-driven (clamp-based margins), never a fixed
// viewport height — the reader should never scroll through empty space
// to reach the next idea. Only the Notebook, Realisation, and
// Transformation carry real motion; everything else is a single
// scroll-triggered Reveal, same as BMW.
export default function HumAiNPage() {
  return (
    <Container className="py-[clamp(4rem,10vh,7rem)]">
      {/* Header — intentionally withholds the strategic question. Tata
          Motors is built around discovery: the notebook sequence earns
          "What makes this Tata Motors?" as a realization. Stating it in
          the hero would spoil that behavioural language, so this project
          is the deliberate exception to the portfolio's information
          hierarchy (project → discipline → question). */}
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <span className="mb-2 block font-sans text-kicker uppercase text-fg/75">{c.kicker}</span>
          <span className="block font-sans text-kicker uppercase text-fg/75">{c.discipline}</span>
        </Reveal>
      </div>

      {/* The Brief — Progressive reading presentation */}
      <BriefSection />

      <h1 className="sr-only">HUM.AI.N</h1>



      {/* First Instinct — continues the question directly, same train of thought */}
      <div className="mx-auto mt-[clamp(1.5rem,4vh,2.5rem)] flex max-w-2xl flex-col">
        {c.firstInstinct.lines.map((line, i) => (
          <Reveal key={i} delay={i * 0.08} className={i === 0 ? "" : "mt-3"}>
            <p className="font-serif text-xl leading-snug text-fg/75 md:text-2xl">{line}</p>
          </Reveal>
        ))}
        <Reveal delay={0.4} className="mt-8">
          <p className="font-serif text-lg text-fg/75 md:text-xl">{c.firstInstinct.displayLead}</p>
        </Reveal>
        <Reveal delay={0.5} className="mt-1">
          <p className="font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-snug text-fg">
            {c.firstInstinct.display}
          </p>
        </Reveal>
      </div>

      {/* Research */}
      <div className="mx-auto mt-[clamp(4rem,10vh,6rem)] max-w-2xl">
        <Reveal>
          <p className="font-serif text-xl leading-snug text-fg/75 md:text-2xl">{c.research.opening}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 font-serif text-lg text-fg/75 md:text-xl">{c.research.summary}</p>
        </Reveal>
        <div className="mt-4">
          {c.research.reflection.map((line, i) => (
            <Reveal key={line} delay={i * 0.08} className={i === 0 ? "" : "mt-1"}>
              <p className="font-serif text-lg leading-relaxed text-fg/75 md:text-xl">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-4">
          <p className="font-serif text-2xl font-light text-fg md:text-3xl">{c.research.closing}</p>
        </Reveal>
      </div>

      {/* The Test */}
      <div className="mt-[clamp(4rem,10vh,6rem)]">
        <Notebook />
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-lg text-fg/75 md:text-xl">{c.test.rule}</p>
        </Reveal>
      </div>

      {/* Realisation */}
      <div className="mt-[clamp(4rem,10vh,6rem)]">
        <Realisation />
      </div>

      {/* The Idea */}
      <Reveal className="mx-auto mt-[clamp(4rem,10vh,6rem)] max-w-2xl">
        <p className="font-serif text-[clamp(1.75rem,5.5vw,3.25rem)] font-light leading-snug text-fg">{c.idea}</p>
      </Reveal>


      {/* Transformation */}
      <div className="mt-[clamp(4rem,10vh,6rem)]">
        <Transformation />
      </div>


      {/* The series itself: the payoff, after the thinking. */}
      {/* Opening: the series name, then the featured episode, playable on request. */}
      <div className="mx-auto mt-[clamp(5rem,16vh,9rem)] mb-[clamp(4rem,10vh,6rem)] max-w-2xl">
        <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-fg/75">Tata Motors</p>
        <h2 className="mt-3 font-serif text-3xl font-light text-fg md:text-4xl">Season One</h2>
        <div className="mt-10">
          <EpisodePlayer
            id="85CHxzHnCCI"
            title="Hum.AI.n S1 E03: From Millimetres to Millions"
            poster="/images/tata/ep03-still.jpg"
          />
        </div>
      </div>

      {/* The series so far: five published, five to come. */}
      <div className="mx-auto mb-[clamp(4rem,10vh,6rem)] max-w-2xl">
        <ol className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5">
          {EPISODES.map((ep) => (
            <li key={ep.n}>
              <a
                href={`https://www.youtube.com/watch?v=${ep.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden border border-fg/20">
                  <Image
                    src={`/images/tata/ep0${ep.n}-still.jpg`}
                    alt={`Hum.AI.n Season 1, Episode ${ep.n}`}
                    fill
                    sizes="(min-width: 768px) 18vw, 45vw"
                    className="object-cover transition-opacity group-hover:opacity-80"
                  />
                </div>
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.14em] text-fg/75">E{String(ep.n).padStart(2, "0")}</p>
                <p className="mt-1 font-serif text-lg font-light leading-snug text-fg md:text-xl">{ep.title}</p>
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-8 font-sans text-[12px] uppercase tracking-[0.16em] text-fg/75">Five more episodes coming soon</p>
        <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.16em] text-fg/75">Available on YouTube, Instagram, LinkedIn and Facebook</p>
        <div className="mt-5 flex items-center gap-5">
          {CHANNELS.map((c) => (
            <svg key={c.name} role="img" aria-label={c.name} width="28" height="28" viewBox="0 0 24 24">
              {c.icon}
            </svg>
          ))}
        </div>
      </div>



      <div className="mt-[clamp(4rem,10vh,6rem)]">
        <BackPrompt />
      </div>
    </Container>
  );
}
