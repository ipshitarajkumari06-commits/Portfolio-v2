"use client";

import { useEffect } from "react";

export default function HomeTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("home-theme");
    return () => root.classList.remove("home-theme");
  }, []);

  return null;
}
