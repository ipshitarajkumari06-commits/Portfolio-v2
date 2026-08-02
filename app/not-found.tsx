import Link from "next/link";
import Section from "@/components/layout/Section";
import Display from "@/components/typography/Display";
import Kicker from "@/components/typography/Kicker";

export default function NotFound() {
  return (
    <div className="pt-32 sm:pt-40">
      <Section>
        <div className="mx-auto max-w-2xl">
          <Kicker>404</Kicker>
          <Display as="h1" size="sm" className="mt-6">
            This page doesn&apos;t exist.
          </Display>
          <Link
            href="/"
            className="mt-10 inline-block font-sans text-[13px] uppercase tracking-[0.14em] text-fg/70 transition-colors hover:text-fg"
          >
            Back home
          </Link>
        </div>
      </Section>
    </div>
  );
}
