import type { Metadata } from "next";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";
import Display from "@/components/typography/Display";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Ipshita Rajkumari",
  description: contact.line,
};

export default function ContactPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <Section>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Display as="h1" size="sm">
              {contact.line}
            </Display>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 font-sans text-lg font-light leading-relaxed text-fg/80 md:text-xl">
              {contact.sub}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href={`mailto:${contact.email}`}
              className="mt-10 inline-block font-serif text-2xl text-fg underline decoration-line underline-offset-8 transition-colors hover:text-accent md:text-3xl"
            >
              {contact.email}
            </a>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
