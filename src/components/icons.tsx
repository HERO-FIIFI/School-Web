import React from "react";

type IconProps = { className?: string; strokeWidth?: number };

function base(props: IconProps, children: React.ReactNode, viewBox = "0 0 24 24") {
  const { className = "w-5 h-5", strokeWidth = 1.7 } = props;
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* School crest: shield, open book, three stars, bell loop */
export const Crest = (p: IconProps) =>
  base(p, (
    <>
      <path d="M12 1.8 21 5.2v6.3c0 5.6-3.9 9-9 10.7-5.1-1.7-9-5.1-9-10.7V5.2Z" />
      <path d="M12 12.6c-1.6-1.3-3.6-1.5-5-1.3v5.2c1.4-.2 3.4 0 5 1.3 1.6-1.3 3.6-1.5 5-1.3v-5.2c-1.4-.2-3.4 0-5 1.3Z" />
      <path d="M12 12.6v5.2" />
      <path d="M8.2 8.2h.01M12 7.2h.01M15.8 8.2h.01" strokeWidth={2.4} />
    </>
  ));

export const BellIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
      <path d="M10 18.5a2.2 2.2 0 0 0 4 0" />
    </>
  ));

export const BookIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M12 6.5c-2-1.8-5-2-7-1.6V18c2-.4 5-.2 7 1.6 2-1.8 5-2 7-1.6V4.9c-2-.4-5-.2-7 1.6Z" />
      <path d="M12 6.5v13.1" />
    </>
  ));

export const FlaskIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M9.5 3h5M10.5 3v5.2L5.2 18a2 2 0 0 0 1.8 3h10a2 2 0 0 0 1.8-3l-5.3-9.8V3" />
      <path d="M7.6 14.5h8.8" />
      <path d="M10 17.6h.01M13.4 16.4h.01" strokeWidth={2.4} />
    </>
  ));

export const PaletteIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M12 21a9 9 0 1 1 9-9c0 2.5-2 3-3.5 3H15a2 2 0 0 0-1.5 3.3c.5.6.2 2.7-1.5 2.7Z" />
      <path d="M7.8 10h.01M11 7h.01M15.4 8.6h.01" strokeWidth={2.4} />
    </>
  ));

export const BallIcon = (p: IconProps) =>
  base(p, (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="6.2" transform="rotate(-35 12 12)" />
      <path d="M9 9.5l6 5M10.8 8l-1 1.2M14.2 14.8l-1 1.2" />
    </>
  ));

export const CalendarIcon = (p: IconProps) =>
  base(p, (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01" strokeWidth={2.4} />
    </>
  ));

export const DownloadIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M12 4v10.5M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </>
  ));

export const ArrowRight = (p: IconProps) =>
  base(p, (
    <>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </>
  ));

export const SearchIcon = (p: IconProps) =>
  base(p, (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m20 20-4.4-4.4" />
    </>
  ));

export const PhoneIcon = (p: IconProps) =>
  base(p, (
    <path d="M5 4h4l1.5 4.5-2.2 1.7a13 13 0 0 0 5.5 5.5l1.7-2.2L20 15v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
  ));

export const MailIcon = (p: IconProps) =>
  base(p, (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </>
  ));

export const PinIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M12 21.5s7-6.1 7-11.5a7 7 0 1 0-14 0c0 5.4 7 11.5 7 11.5Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </>
  ));

export const ClockIcon = (p: IconProps) =>
  base(p, (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2.2" />
    </>
  ));

export const ChevronDown = (p: IconProps) => base(p, <path d="m6 9.5 6 6 6-6" />);
export const ChevronLeft = (p: IconProps) => base(p, <path d="m14.5 6-6 6 6 6" />);
export const ChevronRight = (p: IconProps) => base(p, <path d="m9.5 6 6 6-6 6" />);

export const MenuIcon = (p: IconProps) => base(p, <path d="M4 7h16M4 12h16M4 17h10" />);
export const CloseIcon = (p: IconProps) => base(p, <path d="m6 6 12 12M18 6 6 18" />);

export const UserIcon = (p: IconProps) =>
  base(p, (
    <>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M5 20.5c1.2-3.6 3.8-5.3 7-5.3s5.8 1.7 7 5.3" />
    </>
  ));

export const CheckIcon = (p: IconProps) => base(p, <path d="m5 12.5 4.5 4.5L19 7.5" />);

export const ShieldIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M12 2.8 20 6v5.6c0 4.9-3.4 7.9-8 9.6-4.6-1.7-8-4.7-8-9.6V6Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.6" />
    </>
  ));

export const LeafIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M19.5 4.5c-8.5 0-13.5 3.5-13.5 9.5 0 3 2 5.5 5 5.5 6.5 0 8.5-7.5 8.5-15Z" />
      <path d="M5.5 19.5c3-5 6.5-8.5 10.5-10.5" />
    </>
  ));

export const StarIcon = (p: IconProps) =>
  base(p, (
    <path d="m12 3.5 2.4 5.2 5.6.7-4.2 3.9 1.1 5.6L12 16.1l-4.9 2.8 1.1-5.6-4.2-3.9 5.6-.7Z" />
  ));

export const QuillIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M20 4c-6.5.5-11.5 3-13.5 8.5-.8 2.2-1 4.7-1 7.5 2.8 0 5.3-.2 7.5-1C18.5 17 20.5 10.5 20 4Z" />
      <path d="M5.5 19.5C9 13 13.5 8.5 18 6" />
    </>
  ));

export const MusicIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M9 18.5V6l10-2v12.5" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </>
  ));

export const GlobeIcon = (p: IconProps) =>
  base(p, (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.2 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.2-3.9-8.5s1.3-6.2 3.9-8.5Z" />
    </>
  ));

export const CapIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5Z" />
      <path d="M6.5 11.5v4.5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5" />
      <path d="M21.5 9v5" />
    </>
  ));

export const CompassIcon = (p: IconProps) =>
  base(p, (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ));

export const DoorIcon = (p: IconProps) =>
  base(p, (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
      <path d="M2.5 21h19" />
      <path d="M14.8 12.2h.01" strokeWidth={2.6} />
    </>
  ));

export const VALUE_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  book: BookIcon,
  shield: ShieldIcon,
  leaf: LeafIcon,
  star: StarIcon,
};
