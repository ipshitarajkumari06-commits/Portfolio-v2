import Link from "next/link";
import Section from "@/components/layout/Section";
import Kicker from "@/components/typography/Kicker";
import Reveal from "@/components/motion/Reveal";
import { featuredWork } from "@/lib/content";

export default function FeaturedWork() {
  return (
    <Section id="work">
      <div className="mb-16 md:mb-20">
        <Reveal>
          <Kicker>{featuredWork.kicker}</Kicker>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {featuredWork.items.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.06}>
            <Link
              href={item.href}
              className="group grid grid-cols-1 gap-4 border-t border-line py-16 transition-colors duration-[450ms] ease-cinematic last:border-b hover:bg-fg/[0.03] md:grid-cols-12 md:items-center md:gap-6 md:py-28"
            >
              <span className="font-sans text-[13px] uppercase tracking-[0.14em] text-muted md:col-span-3">
                {item.client}
              </span>
              <span className="whitespace-pre-line font-serif text-3xl font-light text-fg/90 transition-all duration-[450ms] ease-cinematic group-hover:translate-x-[3px] group-hover:text-fg md:col-span-9 md:text-4xl lg:text-5xl">
                {item.title}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
