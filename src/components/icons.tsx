import type { SVGProps, ReactNode } from "react";

type P = SVGProps<SVGSVGElement>;

function I({ children, ...props }: P & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IcArrow = (p: P) => (
  <I {...p}>
    <path d="M3.5 12h16" />
    <path d="m14 6 6 6-6 6" />
  </I>
);

export const IcArrowUp = (p: P) => (
  <I {...p}>
    <path d="M6.5 17.5 17.5 6.5" />
    <path d="M8.5 6.5h9v9" />
  </I>
);

export const IcSearch = (p: P) => (
  <I {...p}>
    <circle cx="10.5" cy="10.5" r="6.2" />
    <path d="m20 20-4.6-4.6" />
  </I>
);

export const IcClose = (p: P) => (
  <I {...p}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </I>
);

export const IcMenu = (p: P) => (
  <I {...p}>
    <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" />
  </I>
);

export const IcPhone = (p: P) => (
  <I {...p}>
    <path d="M5.2 3.8h3.4l1.6 4.2-2.1 1.6a12.8 12.8 0 0 0 6.3 6.3l1.6-2.1 4.2 1.6v3.4c0 .9-.8 1.6-1.7 1.5C10.4 19.7 4.3 13.6 3.7 5.5c-.1-.9.6-1.7 1.5-1.7Z" />
  </I>
);

export const IcMail = (p: P) => (
  <I {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </I>
);

export const IcPin = (p: P) => (
  <I {...p}>
    <path d="M12 21s-6.8-6-6.8-11A6.8 6.8 0 0 1 12 3.2 6.8 6.8 0 0 1 18.8 10c0 5-6.8 11-6.8 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </I>
);

export const IcClock = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.5V12l3.2 2" />
  </I>
);

export const IcCalendar = (p: P) => (
  <I {...p}>
    <rect x="3.8" y="5" width="16.4" height="15" />
    <path d="M3.8 9.6h16.4M8 3v3.6M16 3v3.6" />
    <path d="M7.5 13.5h2.4M11 13.5h2.4M14.5 13.5h2.4M7.5 16.7h2.4M11 16.7h2.4" />
  </I>
);

export const IcDownload = (p: P) => (
  <I {...p}>
    <path d="M12 3.8v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.8h15" />
  </I>
);

export const IcBook = (p: P) => (
  <I {...p}>
    <path d="M12 6.3C10.5 4.9 8 4.4 4.5 4.5v13.6c3.5-.1 6 .4 7.5 1.8 1.5-1.4 4-1.9 7.5-1.8V4.5C16 4.4 13.5 4.9 12 6.3Z" />
    <path d="M12 6.3v13.6" />
  </I>
);

export const IcFlask = (p: P) => (
  <I {...p}>
    <path d="M9.5 3.8h5M10.3 3.8v5.4L5 18.2a1.6 1.6 0 0 0 1.4 2.4h11.2a1.6 1.6 0 0 0 1.4-2.4L13.7 9.2V3.8" />
    <path d="M7.6 14.6h8.8" />
  </I>
);

export const IcGlobe = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M3.8 12h16.4M12 3.8c2.5 2.2 3.8 5 3.8 8.2s-1.3 6-3.8 8.2c-2.5-2.2-3.8-5-3.8-8.2S9.5 6 12 3.8Z" />
  </I>
);

export const IcMusic = (p: P) => (
  <I {...p}>
    <path d="M9.2 18.4V6.2l10-2v11.6" />
    <circle cx="6.8" cy="18.4" r="2.4" />
    <circle cx="16.8" cy="15.8" r="2.4" />
  </I>
);

export const IcBrush = (p: P) => (
  <I {...p}>
    <path d="M19.5 4.5c-3.4 1.2-7.8 5-9.7 8.4l2 2c3.4-1.9 7.2-6.3 8.4-9.7l-.7-.7Z" />
    <path d="M8.6 13.9c-1.8.3-2.8 1.5-3 3.3-.1 1-.6 1.7-1.6 2 1.4 1 3.4 1.2 4.8.3 1.4-.8 2-2 1.9-3.5" />
  </I>
);

export const IcBall = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 3.8v16.4M4.4 8.5c4.5 2.3 10.7 2.3 15.2 0M4.4 15.5c4.5-2.3 10.7-2.3 15.2 0" />
  </I>
);

export const IcCompass = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="m15.2 8.8-1.8 4.6-4.6 1.8 1.8-4.6z" />
  </I>
);

export const IcLeaf = (p: P) => (
  <I {...p}>
    <path d="M5.5 18.5C5.5 10 11 5 19 4.8c.4 8-4.5 13.4-12.4 13.7" />
    <path d="M5.5 18.5C8 14 11.5 10.5 15.8 8.3" />
  </I>
);

export const IcCheck = (p: P) => (
  <I {...p}>
    <path d="m5 12.8 4.4 4.4L19 7.4" />
  </I>
);

export const IcChevL = (p: P) => (
  <I {...p}>
    <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
  </I>
);

export const IcChevR = (p: P) => (
  <I {...p}>
    <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
  </I>
);

export const IcChevD = (p: P) => (
  <I {...p}>
    <path d="m5.5 9.5 6.5 6.5 6.5-6.5" />
  </I>
);

export const IcUser = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="8.2" r="3.6" />
    <path d="M4.8 20c1-3.6 3.8-5.4 7.2-5.4s6.2 1.8 7.2 5.4" />
  </I>
);

export const IcLogout = (p: P) => (
  <I {...p}>
    <path d="M14 4.5H6.5v15H14" />
    <path d="M10.5 12h9M16 8.5l3.5 3.5L16 15.5" />
  </I>
);

export const IcInfo = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 11v5M12 7.8v.4" />
  </I>
);

export const IcStar = (p: P) => (
  <I {...p}>
    <path d="m12 4 2.3 4.9 5.2.7-3.8 3.7.9 5.3L12 16l-4.6 2.6.9-5.3-3.8-3.7 5.2-.7z" />
  </I>
);

export const IcShield = (p: P) => (
  <I {...p}>
    <path d="M12 3.2 19.5 6v6c0 4.8-3.2 7.6-7.5 8.8C7.7 19.6 4.5 16.8 4.5 12V6Z" />
  </I>
);

export const IcBus = (p: P) => (
  <I {...p}>
    <path d="M4.5 5.5h15V17a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 17Z" />
    <path d="M4.5 12.5h15M7.5 18.5v1.6M16.5 18.5v1.6" />
    <path d="M7.7 15.4h.4M15.9 15.4h.4" />
  </I>
);

export const IcRuler = (p: P) => (
  <I {...p}>
    <rect x="2.8" y="9" width="18.4" height="6" />
    <path d="M6.5 9v2.6M10 9v3.8M13.5 9v2.6M17 9v3.8" />
  </I>
);

export const IcSpark = (p: P) => (
  <I {...p}>
    <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.6 2.6M15.4 15.4 18 18M18 6l-2.6 2.6M8.6 15.4 6 18" />
  </I>
);

/** Ashgrove crest — shield, ash leaf and open book. */
export function Crest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      <path
        d="M24 2 45 9.5V28c0 12.4-9 20.6-21 26C12 48.6 3 40.4 3 28V9.5Z"
        fill="var(--color-navy-900)"
        stroke="var(--color-gold-400)"
        strokeWidth="2"
      />
      <path
        d="M24 6.5 41 12.6V28c0 10.2-7.3 17-17 21.6C14.3 45 7 38.2 7 28V12.6Z"
        fill="none"
        stroke="var(--color-gold-400)"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M13 34.5c0-7 4.5-11.3 11-11.5.4 6.6-3.6 11-10 11.5"
        fill="none"
        stroke="var(--color-gold-300)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 34.5c2-3.6 4.9-6.4 8.4-8.2"
        fill="none"
        stroke="var(--color-gold-300)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M14 39h20" stroke="var(--color-gold-400)" strokeWidth="1.6" strokeLinecap="round" />
      <text
        x="24"
        y="20.5"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="13"
        fill="var(--color-chalk-50)"
      >
        A
      </text>
    </svg>
  );
}
