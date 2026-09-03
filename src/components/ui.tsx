import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCountUp, useInView, useScramble } from "../lib/hooks";
import { IcArrow } from "./icons";

const rd = (ms: number) => ({ "--rd": `${ms}ms` } as CSSProperties);

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "figure";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      data-reveal
      className={`${className} ${inView ? "is-in" : ""}`}
      style={rd(delay)}
    >
      {children}
    </Tag>
  );
}

/* ---------- line-mask heading reveal ---------- */
export function Lines({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 110,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref as never} className={`${className} ${inView ? "is-in" : ""}`}>
      {lines.map((l, i) => (
        <span key={i} className="lr-line" style={rd(delay + i * stagger)}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- scramble-decode text ---------- */
export function Scramble({ text, className = "", play = true }: { text: string; className?: string; play?: boolean }) {
  const out = useScramble(text, play);
  return <span className={className}>{out}</span>;
}

/* ---------- animated counter ---------- */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const v = useCountUp(to, inView);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}

/* ---------- small-caps label with gold rule ---------- */
export function Kicker({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" | "gold" }) {
  const color = tone === "light" ? "text-gold-300" : tone === "gold" ? "text-gold-600" : "text-navy-600";
  return (
    <p className={`kicker flex items-center gap-3 ${color}`}>
      <span className={`inline-block h-px w-8 ${tone === "light" || tone === "gold" ? "bg-gold-400" : "bg-gold-500"}`} />
      {children}
    </p>
  );
}

/* ---------- section heading block ---------- */
export function SectionHead({
  kicker,
  title,
  lede,
  tone = "dark",
  className = "",
}: {
  kicker: string;
  title: ReactNode[];
  lede?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Kicker tone={tone}>{kicker}</Kicker>
      </Reveal>
      <Lines
        as="h2"
        lines={title}
        className={`font-display mt-4 text-4xl leading-[1.04] font-semibold tracking-tight sm:text-5xl ${
          tone === "light" ? "text-chalk-50" : "text-navy-900"
        }`}
      />
      {lede && (
        <Reveal delay={160}>
          <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${tone === "light" ? "text-navy-200" : "text-ink/70"}`}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- page hero band ---------- */
export function PageHero({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: ReactNode[];
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="blueprint relative overflow-hidden bg-navy-950 text-chalk-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[28px] border-navy-800/60" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full border-[36px] border-navy-900/80" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <Kicker tone="light">{kicker}</Kicker>
          </Reveal>
          <Lines
            as="h1"
            lines={title}
            className="font-display mt-5 text-5xl leading-[1.02] font-semibold tracking-tight text-chalk-50 sm:text-6xl lg:text-7xl"
          />
          {lede && (
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">{lede}</p>
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------- arrow link ---------- */
export function ArrowLink({ to, children, tone = "dark", onClick }: { to: string; children: ReactNode; tone?: "dark" | "light"; onClick?: () => void }) {
  const color = tone === "light" ? "text-gold-300" : "text-navy-800";
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase ${color}`}
    >
      <span className="link-draw">{children}</span>
      <IcArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}

/* ---------- chip ---------- */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-2.5 py-1 text-[0.66rem] font-bold tracking-[0.14em] uppercase ${className}`}>
      {children}
    </span>
  );
}

/* ---------- framed image with ken burns ---------- */
export function FramedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  kenburns = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  kenburns?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-navy-900 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${kenburns ? "kenburns" : ""} ${imgClassName}`} />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-navy-900/20 ring-inset" />
    </div>
  );
}
