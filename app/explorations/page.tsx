import type { Metadata } from "next";
import FeaturedWork from "@/components/sections/FeaturedWork";

export const metadata: Metadata = {
  title: "Explorations — Ipshita Rajkumari",
};

export default function ExplorationsPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <FeaturedWork />
    </div>
  );
}
