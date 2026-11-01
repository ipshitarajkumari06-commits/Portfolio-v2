import DiscoveryA from "@/components/sections/DiscoveryA";
import DiscoveryB from "@/components/sections/DiscoveryB";
import Section from "@/components/layout/Section";

export const metadata = {
  title: "Discovery Prototypes — Ipshita Rajkumari",
  description: "Testing two approaches to question-driven project discovery.",
};

export default function DiscoveryTestPage() {
  return (
    <main>
      {/* OPTION A: Orbiting Question Cards */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-3xl font-light text-fg">
            Option A: Orbiting Question Cards
          </h1>
          <p className="mt-4 font-sans text-sm text-fg/60">
            Cards move around a central focal point. Scroll to move the next
            question into focus. The approach feels like moving through a spatial
            field of questions.
          </p>
        </div>
      </Section>

      <DiscoveryA />

      <Section>
        <div className="mx-auto max-w-2xl py-16">
          <hr className="border-line" />
        </div>
      </Section>

      {/* OPTION B: Layered Question Sphere */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-serif text-3xl font-light text-fg">
            Option B: Layered Question Sphere
          </h1>
          <p className="mt-4 font-sans text-sm text-fg/60">
            Questions arranged on rotating layers creating a spherical illusion.
            Scroll to rotate the field. Questions move from peripheral → central
            → peripheral, with depth creating hierarchy.
          </p>
        </div>
      </Section>

      <DiscoveryB />

      <Section className="py-32">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-6 text-center">
            <h2 className="font-serif text-2xl font-light text-fg">
              Evaluation Criteria
            </h2>
            <div className="space-y-4 text-left text-sm text-fg/70">
              <p>
                1. Which makes the questions feel like objects worth
                discovering?
              </p>
              <p>
                2. Which makes scrolling feel purposeful rather than
                decorative?
              </p>
              <p>3. Which preserves readability?</p>
              <p>4. Which creates curiosity before comprehension?</p>
              <p>5. Which feels most consistent with the strategist&apos;s point of view?</p>
              <p>
                6. Which could eventually accommodate different movement
                behaviours for different projects?
              </p>
              <p>
                7. Which still feels sophisticated if all technical effects are
                stripped away?
              </p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
