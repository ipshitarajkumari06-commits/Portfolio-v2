"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Explorations", href: "/explorations" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-cinematic ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-container items-center justify-between px-gutter py-4 sm:py-5">
        <Link
          href="/"
          className="-my-3 py-3 font-serif text-lg tracking-tight text-fg transition-opacity hover:opacity-70"
          aria-label="Ipshita Rajkumari — home"
        >
          IR
        </Link>

        <nav className="flex items-center gap-4 sm:gap-10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="-my-3 py-3 font-sans text-[10px] uppercase tracking-[0.1em] text-fg/70 transition-colors hover:text-fg sm:text-[13px] sm:tracking-[0.14em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
