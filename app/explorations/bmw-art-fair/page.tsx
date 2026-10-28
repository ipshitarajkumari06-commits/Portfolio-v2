import type { CSSProperties } from "react";
import type { Metadata } from "next";
import BackPrompt from "@/components/collections/BackPrompt";
import Reveal from "@/components/motion/Reveal";
import CollectionHero from "@/components/collections/CollectionHero";
import ImagePlaceholder from "@/components/collections/ImagePlaceholder";
import RevealImage from "@/components/collections/RevealImage";
import CycleImages from "@/components/collections/CycleImages";
import { bmwArtFair as c } from "@/lib/collections/bmw-art-fair";

const IMG = "/images/bmw";

// One editorial grid, three widths, no exceptions:
// LARGE (95%): Hero, Speedtop, Exterior Lounge, Flow in Motion.
// STANDARD (72%): Host.
// SUPPORTING (50%): the Lounge evolution sequence, Participation.
const LARGE = "mx-auto w-full md:w-[95%]";
const STANDARD = "mx-auto w-full md:w-[72%]";
const SUPPORTING = "mx-auto w-full sm:w-[65%] md:w-[50%]";

// Every section below uses pt-section/pb-0 instead of the shared <Section>
// component's symmetric py-section: two adjacent sections each contributing
// their own top+bottom padding was stacking into a 200-350px gap at every
// boundary. Top-padding-only means each boundary gets exactly one
// clamp(6rem,14vw,11rem) gap. The final section restores pb-section so
// there's still proper space before the footer.
const SECTION = "pt-section pb-0";
const CONTAINER = "mx-auto w-full max-w-container px-gutter";
// Three text sizes, site-wide: the hero title (largest, in Display), this
// "reflection statement" emphasis, and body copy. Nothing else.
const BODY = "font-sans text-lg font-light leading-relaxed text-fg/90 md:text-xl";
const EMPHASIS = "font-serif text-2xl font-light text-fg md:text-3xl";
// The brief sits in a raised wine box: 3D edge highlights, no flat rectangle.
const BRIEF_BOX =
  "relative mb-6 p-6 md:p-8";

// The border is a 1px ring: a black fill inside, and a conic light that
// travels around the edge. The light is the only moving part.
const BRIEF_STYLE = {
  border: "1px solid transparent",
  background:
    "linear-gradient(#000, #000) padding-box, conic-gradient(from var(--brief-angle), transparent 0deg, transparent 240deg, #F3EDE0 300deg, #8E2B40 320deg, transparent 350deg) border-box",
} as CSSProperties;
type ParagraphLine = string | { text: string; emphasis?: boolean; box?: boolean };

function Paragraphs({ lines, delayStep = 0.06 }: { lines: ParagraphLine[]; delayStep?: number }) {
  return (
    <>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const emphasis = typeof line === "string" ? false : line.emphasis;
        const boxed = typeof line === "string" ? false : line.box;
        return (
          <Reveal key={i} delay={i * delayStep}>
            {boxed ? (
              <div className={`${BRIEF_BOX} motion-safe:animate-[brief-spin_8s_linear_infinite]`} style={BRIEF_STYLE}>
                <p className={BODY}>{text}</p>
              </div>
            ) : (
              <p className={`mb-3 ${emphasis ? EMPHASIS : BODY}`}>{text}</p>
            )}
          </Reveal>
        );
      })}
    </>
  );
}

export const metadata: Metadata = {
  title: `${c.title} — BMW, Ipshita Rajkumari`,
  description: c.opening[0].text,
};

export default function BMWArtFairPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `@property --brief-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; } @keyframes brief-spin { to { --brief-angle: 360deg; } }` }} />
      {/* Section 1 — Hero, untouched. */}
      <CollectionHero
        kicker={c.kicker}
        discipline={c.discipline}
        title={c.title}
        heroImageLabel={c.heroImageLabel}
        heroImageSrc={`${IMG}/lounge-interior.png`}
      />

      {/* Section 2 */}
      <div className="pt-16 pb-0 md:pt-section">
        <div className={CONTAINER}>
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            <Reveal>
              <p className={`mb-3 ${c.opening[0].emphasis ? EMPHASIS : BODY}`}>{c.opening[0].text}</p>
            </Reveal>
            <Paragraphs lines={c.opening.slice(1)} />
            <Reveal delay={0.3}>
              <p className={BODY}>{c.openingClose}</p>
            </Reveal>
          </div>

          <div className={`mt-8 md:mt-10 ${STANDARD}`}>
            <RevealImage>
              <ImagePlaceholder label={c.openingImageLabel} aspect="wide" src={`${IMG}/facade-back.png`} />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Section 3 — Speedtop. Single photograph, shown whole, uncropped. */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl">
            <Paragraphs lines={c.speedtop} />
          </div>

          <div className={`mt-8 md:mt-10 ${LARGE}`}>
            <RevealImage>
              <ImagePlaceholder
                label={c.speedtopImageLabels[0]}
                aspect="square"
                src={`${IMG}/speedtop.jpg`}
                objectFit="contain"
              />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Section 4 — the design evolution: design sketch, concept sketch,
          architectural render. Loop in this order. */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl">
            <Paragraphs lines={c.lounge} />
          </div>

          <div className={`mt-8 md:mt-10 ${SUPPORTING}`}>
            <RevealImage hover={false}>
              <CycleImages
                images={[
                  { src: `${IMG}/speedtop-sketch.png`, label: c.loungeEvolutionImageLabels[0] },
                  { src: `${IMG}/lounge-sketch-front.png`, label: c.loungeEvolutionImageLabels[1] },
                  { src: `${IMG}/lounge-sketch-2.png`, label: c.loungeEvolutionImageLabels[2] },
                ]}
                aspect="video"
              />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Section 5 — three standalone photographs in sequence, none clubbed
          into a slideshow: the Speedtop at the fair, then Exterior Lounge,
          then Interior Lounge. Each shown whole via object-fit: contain so
          nothing is cropped out. */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl">
            <div className="mt-1">
              {c.loungeChoreography.map((line, i) => (
                <Reveal key={i} delay={0.2 + i * 0.08}>
                  <p className={BODY}>{line}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={`mt-8 md:mt-10 ${LARGE}`}>
            <RevealImage>
              <ImagePlaceholder
                label={c.speedtopImageLabels[1]}
                aspect="video"
                src={`${IMG}/facade-speedtop-view.png`}
                objectFit="contain"
              />
            </RevealImage>
          </div>

          <div className={`mt-8 md:mt-10 ${LARGE}`}>
            <RevealImage>
              <ImagePlaceholder
                label={c.loungeExteriorImageLabel}
                aspect="wide"
                src={`${IMG}/facade-front.png`}
                objectFit="contain"
              />
            </RevealImage>
          </div>

          <div className={`mt-8 md:mt-10 ${LARGE}`}>
            <RevealImage>
              <ImagePlaceholder
                label={c.interiorLoungeImageLabel}
                aspect="wide"
                src={`${IMG}/art-car-collection.png`}
                objectFit="contain"
              />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Section 6 — Host. Interview and panel conversation. */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl">
            <Paragraphs lines={c.host} />
            <div className="mt-1">
              {c.hostClose.map((line, i) => (
                <Reveal key={i} delay={0.2 + i * 0.1}>
                  <p className={EMPHASIS}>{line}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={`mt-8 md:mt-10 ${STANDARD}`}>
            <RevealImage hover={false}>
              <CycleImages
                images={[
                  { src: `${IMG}/robb-report-interview.png`, label: c.hostImageLabels[0] },
                  { src: `${IMG}/lounge-conversation.png`, label: c.hostImageLabels[1] },
                ]}
                aspect="video"
              />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Section 7 — Participation. Only two real photographs exist for
          this beat (sketching, screen printing); no "final takeaway"
          photograph exists in the asset set, so the sequence holds at two. */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl">
            <Paragraphs lines={c.participation} />
            <Reveal delay={0.3}>
              <p className={BODY}>{c.participationClose}</p>
            </Reveal>
          </div>

          <div className={`mt-8 md:mt-10 ${SUPPORTING}`}>
            <RevealImage hover={false}>
              <CycleImages
                images={[
                  { src: `${IMG}/activity-sketching.png`, label: c.participationImageLabels[0], objectFit: "contain" },
                  { src: `${IMG}/activity-screenprint.png`, label: c.participationImageLabels[1] },
                ]}
                aspect="video"
              />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Section 8 — Flow in Motion. Single photograph, static, uncropped. */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl">
            <Paragraphs lines={c.flowInMotion} />
            <Reveal delay={0.3}>
              <p className={BODY}>{c.flowInMotionClose}</p>
            </Reveal>
          </div>

          <div className={`mt-8 md:mt-10 ${LARGE}`}>
            <RevealImage>
              <ImagePlaceholder
                label={c.flowInMotionImageLabels[0]}
                aspect="video"
                src={`${IMG}/art-commission-front.png`}
                objectFit="contain"
              />
            </RevealImage>
          </div>
        </div>
      </div>

      {/* Ending — typography only. Full bottom padding here since nothing
          follows but the footer. */}
      <div className="pt-section pb-section">
        <div className={CONTAINER}>
          <div className={`mx-auto max-w-2xl ${BRIEF_BOX} motion-safe:animate-[brief-spin_8s_linear_infinite]`} style={BRIEF_STYLE}>
            {c.reflection.map((line, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className={`mb-3 ${BODY}`}>{line}</p>
              </Reveal>
            ))}
            <div className="mt-6">
              {c.reflectionClose.map((line, i) => (
                <Reveal key={i} delay={0.3 + i * 0.12}>
                  <p className={`mb-1 ${line.emphasis ? EMPHASIS : BODY}`}>{line.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to the selected work on the homepage, directly above the footer. */}
      <div className="pt-section pb-section">
        <div className={CONTAINER}>
          <Reveal>
            <BackPrompt />
          </Reveal>
        </div>
      </div>
    </>
  );
}
