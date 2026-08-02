import Link from "next/link";
import { contact } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-gutter py-10 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-sans text-[13px] uppercase tracking-[0.14em] text-muted">
          Ipshita Rajkumari · Brand Strategist &amp; Experience Designer
        </span>

        <div className="flex items-center gap-6">
          <Link
            href={`mailto:${contact.email}`}
            className="font-sans text-[13px] text-fg/70 transition-colors hover:text-fg"
          >
            {contact.email}
          </Link>
          <span className="font-sans text-[13px] text-muted">&copy; {year}</span>
        </div>
      </div>
    </footer>
  );
}
