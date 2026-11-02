import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import Kicker from "@/components/typography/Kicker";
import BackPrompt from "@/components/collections/BackPrompt";
import { TimelineDiagram, SyncDiagram } from "@/components/collections/McapsDiagrams";
import { mcapsStart as c } from "@/lib/collections/mcaps-start";

const BODY = "font-sans text-justify text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const LABEL = "font-sans text-sm uppercase tracking-[0.14em] text-fg/75";
const HEADING = "font-serif text-2xl font-light leading-tight text-fg md:text-3xl";

// Standard section: a hairline rule above, then a text column.
const SECTION = "mx-auto mt-28 max-w-xl border-t border-white/10 pt-10 md:mt-32";

type Visual = { src: string; alt: string; caption: string; width: number; height: number };

// Concept renders from the proposal deck. Each is captioned as a render, so
// nothing reads as event photography. A hairline frame sits offset behind the
// image, so the render reads as a layer over the page rather than a flat box.
function Figure({ v }: { v: Visual }) {
  return (
    <figure className="max-w-[22rem]">
      <div className="relative">
        <div className="absolute inset-0 translate-x-4 translate-y-4 border border-white/10" aria-hidden="true" />
        <Image
          src={v.src}
          alt={v.alt}
          width={v.width}
          height={v.height}
          sizes="(min-width: 768px) 22rem, 100vw"
          className="relative h-auto w-full"
        />
      </div>
      <figcaption className="mt-8 font-sans text-sm font-light leading-relaxed text-fg/75">{v.caption}</figcaption>
    </figure>
  );
}

function Paragraphs({ items, delay = 0.08 }: { items: string[]; delay?: number }) {
  return (
    <>
      {items.map((p, i) => (
        <Reveal key={p} delay={delay + i * 0.08}>
          <p className={`${BODY} mt-6`}>{p}</p>
        </Reveal>
      ))}
    </>
  );
}

// Evidence reads as a short ruled list, so the proof points stand apart from the argument.
function Evidence({ items }: { items: string[] }) {
  return (
    <div className="mt-10 border-t border-white/10">
      {items.map((item, i) => (
        <Reveal key={item} delay={0.1 + i * 0.08}>
          <div className="flex gap-5 border-b border-white/10 py-4 md:py-6">
            <span className="font-sans text-sm tabular-nums text-amber-200/80">{String(i + 1).padStart(2, "0")}</span>
            <p className="font-sans text-justify text-base font-light leading-relaxed text-fg/90 md:text-lg">{item}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// Decision layout: on desktop the label sits in a sticky left column with an
// outlined numeral behind it, so the reader keeps the decision in view while
// its reasoning scrolls past on the right.
function Decision({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-16 max-w-5xl border-t border-white/10 pt-10 md:mt-32 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16">
      <div className="relative md:sticky md:top-40 md:self-start">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -top-20 select-none font-serif text-[7rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(243,237,224,0.14)]"
        >
          {n}
        </span>
        <Reveal>
          <h3 className={`relative ${HEADING}`}>{label}</h3>
        </Reveal>
      </div>
      <div className="max-w-xl">{children}</div>
    </section>
  );
}

export const metadata: Metadata = {
  title: `${c.title} — ${c.discipline}`,
  description: c.thesis,
};

// The case runs as three decisions, each with its reasoning and at most one
// render placed where it proves the decision.
export default function McapsStartPage() {
  return (
    <main>
      <header>
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[60vh] sm:min-h-[360px]">
          <Image
            src="/images/mcaps-start/title-hero.jpg"
            alt="Microsoft logo on a blue abstract background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" aria-hidden="true" />
        </div>
        <div className="mt-16 sm:mt-20">
          <Container>
            <Reveal>
              <Kicker className="text-fg/75">{c.kicker}</Kicker>
              <span className="mt-1 block font-sans text-kicker uppercase text-fg/60">{c.discipline}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <Display as="h1" className="mt-6 max-w-4xl max-sm:!text-[2.5rem] max-sm:leading-[1.05]">
                {c.title}
              </Display>
            </Reveal>
          </Container>
        </div>
      </header>

      <Container>
        <section className="mx-auto mt-16 max-w-xl space-y-6 md:mt-20">
          <Reveal>
            <p className="font-serif text-2xl font-light leading-snug text-fg md:text-3xl">{c.question}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={BODY}>{c.answer}</p>
          </Reveal>
        </section>

        <section className={SECTION}>
          <Reveal>
            <p className={LABEL}>{c.brief.label}</p>
          </Reveal>
          <Paragraphs items={c.brief.paragraphs} />
        </section>

        <section className={SECTION}>
          <Reveal>
            <p className={LABEL}>{c.choice.label}</p>
          </Reveal>
          <Paragraphs items={c.choice.paragraphs} />
        </section>

        {/* The principle is the case's one argument, set alone with space around it. */}
        <section className="mx-auto mt-28 max-w-3xl border-t border-white/10 py-24 md:mt-32 md:py-32">
          <Reveal>
            <Display as="h2" className="font-serif font-light">
              {c.principle}
            </Display>
          </Reveal>
        </section>

        <section className="mx-auto mt-28 max-w-3xl md:mt-32">
          <Reveal>
            <TimelineDiagram />
          </Reveal>
        </section>

        <Decision n="01" label={c.decisionOne.label}>
          <Paragraphs items={c.decisionOne.paragraphs} />
          <div className="mt-16">
            <Figure v={c.decisionOne.image} />
          </div>
        </Decision>

        <Decision n="02" label={c.decisionTwo.label}>
          <Paragraphs items={c.decisionTwo.paragraphs} />
          <Evidence items={c.decisionTwo.evidence} />
          <div className="mt-16">
            <Reveal>
              <SyncDiagram />
            </Reveal>
          </div>
        </Decision>

        <Decision n="03" label={c.decisionThree.label}>
          <Paragraphs items={c.decisionThree.paragraphs} />
          <Reveal delay={0.2}>
            <div className="relative mt-16 border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-200/80 to-transparent" />
              <p className="font-serif text-justify text-2xl font-light leading-snug text-fg md:text-3xl">{c.decisionThree.tradeOff}</p>
            </div>
          </Reveal>
          <div className="mt-16">
            <Figure v={c.decisionThree.image} />
          </div>
        </Decision>

        <section className="mx-auto mt-32 max-w-3xl border-t border-white/10 pb-32 pt-16">
          <Reveal>
            <h2 className="font-serif text-4xl font-light leading-tight text-fg md:text-5xl">{c.thesis}</h2>
          </Reveal>
        </section>
      </Container>

      <BackPrompt />
    </main>
  );
}
