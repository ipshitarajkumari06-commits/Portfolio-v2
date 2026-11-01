"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: "bmw",
    client: "BMW",
    question: "What survives when a brand changes medium?",
    href: "/explorations/bmw-art-fair",
  },
  {
    id: "airports",
    client: "International Airports",
    question: "When architecture captures attention, what should the experience say next?",
    href: "/explorations/airports",
  },
  {
    id: "tata",
    client: "Tata Motors",
    question: "What makes this Tata Motors?",
    href: "/explorations/hum-ai-n",
  },
];

export default function DiscoveryA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      // Normalize to 0-1 range
      const maxDistance = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, 1 - distanceFromCenter / maxDistance)
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get which project should be focal based on scroll progress
  const focalIndex = Math.floor(scrollProgress * projects.length) % projects.length;

  return (
    <section className="relative min-h-[200vh] py-32">
      <div ref={containerRef} className="sticky top-0 h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-2xl px-8">
          {/* Question cards stacked/offset */}
          <div className="relative h-96">
            {projects.map((project, index) => {
              // Calculate distance from focal
              const distance = Math.min(
                Math.abs(index - focalIndex),
                projects.length - Math.abs(index - focalIndex)
              );

              const isLocal = distance <= 1;
              const scale = isLocal ? (distance === 0 ? 1 : 0.85) : 0.7;
              const opacity = isLocal ? (distance === 0 ? 1 : 0.6) : 0.3;
              const yOffset = distance * 40;
              const xOffset = distance * (index > focalIndex ? 60 : -60);

              return (
                <motion.a
                  key={project.id}
                  href={project.href}
                  className="absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 rounded-lg border border-fg/20 bg-fg/5 p-6 backdrop-blur-sm"
                  animate={{
                    scale,
                    opacity,
                    x: xOffset,
                    y: yOffset,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex flex-col gap-3">
                    <p className="font-sans text-xs uppercase tracking-widest text-fg/50">
                      {project.client}
                    </p>
                    <p className="font-serif text-xl font-light leading-snug text-fg">
                      {project.question}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="font-sans text-xs text-fg/40">Scroll to discover</p>
          </div>
        </div>
      </div>
    </section>
  );
}
