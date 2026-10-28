import type { ReactNode } from "react";

export type Channel = { name: string; icon: ReactNode };

// Brand marks in each platform's colours. YouTube is the official mark.
export const CHANNELS: Channel[] = [
  {
    name: "YouTube",
    icon: (
      <>
        <image href="/images/tata/youtube-mark.png" x="2" y="4.85" width="20" height="14.3" />
      </>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <>
        <defs>
          <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.5" stopColor="#D62976" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#ig-grad)" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="#FFFFFF" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#0A66C2" />
        <circle cx="8" cy="8" r="1.3" fill="#FFFFFF" />
        <path d="M6.8 10.5h2.4V17H6.8zM11 10.5h2.3v1c.4-.7 1.3-1.2 2.4-1.2 2.2 0 2.6 1.4 2.6 3.3V17h-2.4v-3c0-.8 0-1.8-1.1-1.8s-1.3.8-1.3 1.7V17H11z" fill="#FFFFFF" />
      </>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" fill="#1877F2" />
        <path d="M13.2 20v-6.6h2.2l.4-2.6h-2.6V9.4c0-.8.3-1.3 1.4-1.3h1.4V5.8c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H8.2v2.6h2.4V20z" fill="#FFFFFF" />
      </>
    ),
  },
];
