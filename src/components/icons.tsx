/* Hand-drawn inline SVG icon set for Aldercrest Academy */

type P = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IcLogo = ({ className = "w-9 h-9" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path d="M16 2 29 7v11c0 7.5-5.6 11.4-13 12C8.6 29.4 3 25.5 3 18V7Z" fill="var(--color-pine-900)" />
    <path d="M16 7.5c2.8 2.1 4.9 4.9 4.9 8.7 0 3.6-2.1 6.6-4.9 8.3-2.8-1.7-4.9-4.7-4.9-8.3 0-3.8 2.1-6.6 4.9-8.7Z" fill="var(--color-gold-400)" />
    <path d="M16 10.5v11.5M13.2 14.4 16 16l2.8-1.6M13.6 18l2.4 1.4 2.4-1.4" stroke="var(--color-pine-950)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const IcSearch = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="10.5" cy="10.5" r="6.2" />
    <path d="m15.4 15.4 4.6 4.6" />
  </svg>
);

export const IcMenu = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M3.5 7h17M3.5 12h11M3.5 17h17" />
  </svg>
);

export const IcClose = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IcArrow = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
  </svg>
);

export const IcArrowUp = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </svg>
);

export const IcCalendar = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 2.8V6M16 2.8V6" />
  </svg>
);

export const IcClock = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IcPin = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 21s-6.5-5.6-6.5-10.4A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.6C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const IcPhone = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M5.5 4h3l1.7 4-2 1.6a12.6 12.6 0 0 0 6.2 6.2l1.6-2 4 1.7v3a1.9 1.9 0 0 1-2 1.9C10.4 19.9 4.1 13.6 3.6 6a1.9 1.9 0 0 1 1.9-2Z" />
  </svg>
);

export const IcMail = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
  </svg>
);

export const IcDownload = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 4v10.5M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15" />
  </svg>
);

export const IcFlask = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M9.5 3.5h5M10.5 3.5v5.2L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18L13.5 8.7V3.5" />
    <path d="M7.5 14.5h9" />
  </svg>
);

export const IcBook = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 6.5C10 4.8 7 4.3 4 4.5v14c3-.2 6 .3 8 2 2-1.7 5-2.2 8-2v-14c-3-.2-6 .3-8 2Z" />
    <path d="M12 6.5v14" />
  </svg>
);

export const IcPalette = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.6 0 2-1 1.6-2-.5-1.4.2-2.6 2-2.6h1.6c1.8 0 3.3-1.3 3.3-3.6C20.5 7.5 16.7 3.5 12 3.5Z" />
    <circle cx="8.2" cy="10" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15.8" cy="10" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const IcBall = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 3.5v17M3.5 12h17M5.8 6.2c3.6 2.4 8.8 2.4 12.4 0M5.8 17.8c3.6-2.4 8.8-2.4 12.4 0" />
  </svg>
);

export const IcMusic = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M9 18.5V6l11-2.5V16" />
    <circle cx="6.5" cy="18.5" r="2.5" />
    <circle cx="17.5" cy="16" r="2.5" />
  </svg>
);

export const IcGlobe = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5S14.6 18 12 20.5C9.4 18 8.1 15.3 8.1 12S9.4 6 12 3.5Z" />
  </svg>
);

export const IcCompass = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5Z" />
  </svg>
);

export const IcChip = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
    <rect x="10" y="10" width="4" height="4" />
    <path d="M9 6.5V3.5M15 6.5V3.5M9 20.5v-3M15 20.5v-3M6.5 9h-3M6.5 15h-3M20.5 9h-3M20.5 15h-3" />
  </svg>
);

export const IcSpeech = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4 5.5h16v11h-9l-4 3.5v-3.5H4Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </svg>
);

export const IcLeaf = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M19.5 4.5C11 5 5.5 9.5 5.5 15.5c0 1.6.5 2.9 1.2 4C8 14 12 9.5 17 7.5c-4 3.5-7.3 8-8.3 12 1 .5 2.1.8 3.3.8 6 0 8-7.5 7.5-15.8Z" />
  </svg>
);

export const IcSpark = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 3.5c.8 4.6 2.4 6.7 7 7.5-4.6.8-6.2 2.9-7 7.5-.8-4.6-2.4-6.7-7-7.5 4.6-.8 6.2-2.9 7-7.5Z" />
    <path d="M18.5 15.5c.4 2 1.1 2.9 3 3.2-1.9.4-2.6 1.3-3 3.3-.4-2-1.1-2.9-3-3.3 1.9-.3 2.6-1.2 3-3.2Z" />
  </svg>
);

export const IcUsers = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 20c.5-3.5 2.7-5.5 5.5-5.5s5 2 5.5 5.5" />
    <path d="M15.5 5.7a3.2 3.2 0 0 1 0 5.6M17.5 14.9c1.7.8 2.7 2.6 3 5.1" />
  </svg>
);

export const IcMountain = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m3 19 6-11 3.2 5.4L14 10l7 9Z" />
    <path d="m7.5 12.3 1.5 1.7 1.5-1.7" />
  </svg>
);

export const IcCap = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m12 5 10 4.2L12 13.4 2 9.2Z" />
    <path d="M6.5 11.5v4.7c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.7M22 9.2v5" />
  </svg>
);

export const IcChevron = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const IcCheck = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IcQuote = ({ className = "w-8 h-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
    <path d="M6 22c-1.8-1.8-2.8-4.2-2.8-7C3.2 9.6 6.6 5.6 12 4l1.2 2.4C9.6 8 7.8 10.3 7.6 13c.4-.2 1-.3 1.6-.3 2.6 0 4.4 1.9 4.4 4.5S11.6 21.8 9 21.8c-1.2 0-2.2-.4-3-1Zm14 0c-1.8-1.8-2.8-4.2-2.8-7 0-5.4 3.4-9.4 8.8-11l1.2 2.4c-3.6 1.6-5.4 3.9-5.6 6.6.4-.2 1-.3 1.6-.3 2.6 0 4.4 1.9 4.4 4.5s-2 4.6-4.6 4.6c-1.2 0-2.2-.4-3-1Z" />
  </svg>
);

export const IcEye = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

export const IcEyeOff = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M4 4.5 20 20M9.5 6.3A9 9 0 0 1 12 5.8c6 0 9.5 6.2 9.5 6.2a17 17 0 0 1-3 3.6M6 8.4A15.6 15.6 0 0 0 2.5 12S6 18.2 12 18.2a9.4 9.4 0 0 0 3.5-.7" />
    <path d="M10 10.2a2.8 2.8 0 0 0 3.9 3.9" />
  </svg>
);

export const IcLogout = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M13 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h7M16 8l4 4-4 4M20 12H10" />
  </svg>
);

export const IcSend = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="m4 11 16-7-5 16-3.5-6.5Z" />
    <path d="M11.5 13.5 20 4" />
  </svg>
);

export const IcBell = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const IcDoc = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M6 3.5h8l4 4v13H6Z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
  </svg>
);

export const IcShield = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...S} aria-hidden>
    <path d="M12 3 20 6v7c0 4.5-3.4 7-8 8-4.6-1-8-3.5-8-8V6Z" />
    <path d="m8.5 12 2.4 2.4 4.6-5" />
  </svg>
);

export const DEPT_ICONS: Record<string, (p: P) => React.ReactElement> = {
  book: IcBook,
  compass: IcCompass,
  flask: IcFlask,
  globe: IcGlobe,
  speech: IcSpeech,
  palette: IcPalette,
  chip: IcChip,
  ball: IcBall,
  leaf: IcLeaf,
  spark: IcSpark,
  users: IcUsers,
  mountain: IcMountain,
  music: IcMusic,
};
