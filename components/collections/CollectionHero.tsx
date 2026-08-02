import Container from "@/components/layout/Container";
import Kicker from "@/components/typography/Kicker";
import Display from "@/components/typography/Display";
import Reveal from "@/components/motion/Reveal";
import ImagePlaceholder from "./ImagePlaceholder";
import RevealImage from "./RevealImage";

type CollectionHeroProps = {
  kicker: string;
  discipline?: string;
  title: string;
  heroImageLabel: string;
  heroImageSrc?: string;
};

export default function CollectionHero({ kicker, discipline, title, heroImageLabel, heroImageSrc }: CollectionHeroProps) {
  const image = (
    <ImagePlaceholder
      label={heroImageLabel}
      aspect="wide"
      src={heroImageSrc}
      priority
      move={heroImageSrc ? "zoom-in" : undefined}
      duration={22}
      className="mx-[max(0px,calc((100vw-1320px)/2))]"
    />
  );

  return (
    <header className="pt-32 sm:pt-40">
      <Container>
        <Reveal>
          <Kicker>{kicker}</Kicker>
          {discipline ? <span className="mt-1 block font-sans text-kicker uppercase text-muted/60">{discipline}</span> : null}
        </Reveal>
        <Reveal delay={0.08}>
          <Display as="h1" className="mt-6 max-w-4xl">
            {title}
          </Display>
        </Reveal>
      </Container>

      <div className="mt-16 md:mt-20">
        {heroImageSrc ? <RevealImage>{image}</RevealImage> : <Reveal delay={0.16}>{image}</Reveal>}
      </div>
    </header>
  );
}
