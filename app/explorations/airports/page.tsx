import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Kicker from "@/components/typography/Kicker";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import { airports as c } from "@/lib/collections/airports";

const IMG = "/images/airports";
const BODY = "font-sans text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const EMPHASIS = "font-serif text-2xl font-light text-fg md:text-3xl";

export const metadata: Metadata = {
  title: `${c.title} — International Airports, Ipshita Rajkumari`,
  description: c.assam.paragraphs[0],
};

// Air traffic control, not editorial scrolling: one command holds the
// screen at a time. Nothing fades in behind it, nothing keeps moving once
// it has settled. The scroll itself is the only mechanism, snapping from
// one full-viewport authority to the next.
function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`flex min-h-screen w-full snap-start items-center justify-center ${className}`}>
      {children}
    </section>
  );
}

function ImageFrame({ src, label }: { src: string; label: string }) {
  return (
    <Frame className="relative">
      <Image src={src} alt={label} fill sizes="100vw" className="object-cover" />
    </Frame>
  );
}

function DocumentaryFrame({ src, label, ratio }: { src: string; label: string; ratio: number }) {
  return (
    <Frame>
      <div className="relative w-full overflow-hidden bg-fg/[0.02]" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={label} fill sizes="100vw" className="object-contain" />
      </div>
    </Frame>
  );
}

function CopyFrame({ lines, emphasis = false }: { lines: string[]; emphasis?: boolean }) {
  return (
    <Frame>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={emphasis ? EMPHASIS : BODY}>{line}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Frame>
  );
}

export default function InternationalAirportsPage() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <ImageFrame src={`${IMG}/ghy-ceiling.png`} label={c.hero.imageLabel} />

      <Frame>
        <Container>
          <Reveal>
            <Kicker className="mb-2">{c.kicker}</Kicker>
            <span className="mb-8 block font-sans text-kicker uppercase text-muted/60">{c.discipline}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <Display as="h1" className="max-w-3xl">
              {c.title}
            </Display>
          </Reveal>
        </Container>
      </Frame>

      {/* Guwahati */}
      <CopyFrame lines={c.assam.paragraphs} />
      <CopyFrame lines={c.assam.ceremony} />
      <ImageFrame src={`${IMG}/ghy-performance.png`} label={c.assam.ceremonyImageLabel} />
      <DocumentaryFrame src={`${IMG}/ghy-collage.png`} label={c.assam.systemsImageLabel} ratio={2167 / 726} />
      <CopyFrame lines={c.assam.facetsIntro} />
      <ImageFrame src={`${IMG}/ghy-showcase.png`} label={c.assam.showcaseImageLabel} />
      <CopyFrame lines={c.assam.facets} />
      <ImageFrame src={`${IMG}/ghy-model.png`} label={c.assam.modelImageLabel} />
      <CopyFrame lines={[c.assam.discipline[0]]} />
      <CopyFrame lines={c.assam.discipline.slice(1, 3)} />
      <CopyFrame lines={[c.assam.discipline[3]]} />
      <CopyFrame lines={c.assam.close} emphasis />

      {/* Navi Mumbai */}
      <ImageFrame src={`${IMG}/nmial-exterior.webp`} label={c.navimumbai.exteriorImageLabel} />
      <CopyFrame lines={c.navimumbai.paragraphs} />
      <CopyFrame lines={c.navimumbai.heritage} />
      <ImageFrame src={`${IMG}/nmial-led-screen.png`} label={c.navimumbai.techImageLabel} />
      <CopyFrame lines={[c.navimumbai.tech[0]]} />
      <CopyFrame lines={[c.navimumbai.tech[1]]} />
      <DocumentaryFrame src={`${IMG}/nmial-collage.png`} label={c.navimumbai.systemsImageLabel} ratio={1561 / 1007} />
      <CopyFrame lines={c.navimumbai.systems} />
      <CopyFrame lines={c.navimumbai.close} emphasis />
    </div>
  );
}
