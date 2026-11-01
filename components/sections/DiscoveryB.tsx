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

export default function DiscoveryB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

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

  return (
    <section className="relative min-h-[200vh] py-32">
      <div ref={containerRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Centered field container — truly centered in viewport */}
        <div className="relative w-96 h-96">
          {projects.map((project, index) => {
            // Circular positioning with larger radius for spatial separation
            const angle = (scrollProgress * Math.PI * 2) + (index / projects.length) * Math.PI * 2;

            const radius = 150;
            const xPosition = Math.cos(angle) * radius;
            const yPosition = Math.sin(angle) * radius;

            // Depth calculation: emphasize focal/peripheral distinction
            const depthAngle = angle + scrollProgress;
            const depthFactor = (Math.sin(depthAngle) + 1) / 2; // 0 to 1

            // Stronger scale contrast: focal much larger than peripheral
            const scale = depthFactor > 0.7 ? 0.85 + (depthFactor - 0.7) * 0.6 : 0.45 + depthFactor * 0.5;

            // Peripheral questions remain readable: higher minimum opacity
            const opacity = depthFactor > 0.6 ? 0.75 + (depthFactor - 0.6) * 0.25 : 0.35 + depthFactor * 0.6;

            // Minimal blur: peripheral questions should be legible enough to intrigue
            const blur = depthFactor < 0.4 ? 1.5 : 0;

            return (
              <motion.a
                key={project.id}
                href={project.href}
                className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-fg/20 bg-fg/5 p-6 cursor-pointer transition-colors duration-200 hover:bg-fg/8 hover:border-fg/30"
                style={{
                  filter: `blur(${blur}px)`,
                  zIndex: Math.floor(depthFactor * 100),
                  pointerEvents: depthFactor > 0.3 ? "auto" : "none",
                }}
                animate={{
                  scale,
                  opacity,
                  x: xPosition,
                  y: yPosition,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                whileHover={depthFactor > 0.3 ? { scale: scale * 1.04 } : undefined}
              >
                <div className="flex flex-col gap-2">
                  <p className="font-sans text-xs uppercase tracking-widest text-fg/40">
                    {project.client}
                  </p>
                  <p className="font-serif text-lg font-light leading-snug text-fg">
                    {project.question}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
