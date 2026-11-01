import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import Kicker from "@/components/typography/Kicker";
import BackPrompt from "@/components/collections/BackPrompt";
import { tataOneWorld as c } from "@/lib/collections/tata-one-world";

const BODY = "font-sans text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const LABEL = "font-sans text-sm uppercase tracking-[0.14em] text-fg/75";
const HEADING = "font-serif text-2xl font-light leading-tight text-fg md:text-3xl";

// Standard section: a hairline rule above, then a text column.
const SECTION = "mx-auto mt-28 max-w-xl border-t border-white/10 pt-10 md:mt-32";

type Visual = { src: string; alt: string; caption: string; width: number; height: number };

// A hairline frame sits offset behind each render, as on the other case pages.
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

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p, i) => (
        <Reveal key={p} delay={0.08 + i * 0.08}>
          <p className={`${BODY} mt-6`}>{p}</p>
        </Reveal>
      ))}
    </>
  );
}

// Decision layout: the label sits in a sticky left column on desktop, and the
// reasoning and its render scroll past on the right.
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

export default function TataOneWorldPage() {
  return (
    <main>
      <header>
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[60vh] sm:min-h-[360px]">
          <Image
            src="/images/tata-one-world/fire-key-visual.webp"
            alt="The F.I.R.E. key visual for Tata Motors One World"
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

        <Decision n="01" label={c.decisionOne.label}>
          <Paragraphs items={c.decisionOne.paragraphs} />
          <div className="mt-16">
            <Figure v={c.decisionOne.image} />
          </div>
        </Decision>

        <Decision n="02" label={c.decisionTwo.label}>
          <Paragraphs items={c.decisionTwo.paragraphs} />
          <div className="mt-16">
            <Figure v={c.decisionTwo.image} />
          </div>
        </Decision>

        <Decision n="03" label={c.decisionThree.label}>
          <Paragraphs items={c.decisionThree.paragraphs} />
          <div className="mt-16">
            <Figure v={c.decisionThree.image} />
          </div>
        </Decision>

        <section className={SECTION}>
          <Reveal>
            <p className={LABEL}>{c.language.label}</p>
          </Reveal>
          <Paragraphs items={c.language.paragraphs} />
        </section>

        {c.video.url && (
          <section className={SECTION}>
            <Reveal>
              <a
                href={c.video.url}
                className="font-serif text-2xl font-light text-fg underline decoration-line underline-offset-8 transition-colors hover:text-accent md:text-3xl"
              >
                {c.video.label}
              </a>
            </Reveal>
          </section>
        )}

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
