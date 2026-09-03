import React from "react";
import { useCountUp, useOnScreen } from "../lib/hooks";

/* ---------------------------- Reveal ------------------------------ */
export function Reveal({
  children,
  delay = 0,
  tilt = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  tilt?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  const [ref, inView] = useOnScreen<HTMLDivElement>();
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement>}
      style={{ "--rv-delay": `${delay}ms`, "--rv-rot": `${tilt}deg` } as React.CSSProperties}
      className={`${tilt ? "reveal reveal-tilt" : "reveal"} ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* --------------------- Line-mask heading -------------------------- */
export function MaskHeading({ lines, className = "" }: { lines: React.ReactNode[]; className?: string }) {
  const [ref, inView] = useOnScreen<HTMLHeadingElement>(0.3);
  return (
    <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={`${inView ? "is-in" : ""} ${className}`}>
      {lines.map((l, i) => (
        <span className="mask-line" key={i}>
          <span style={{ "--ml-delay": `${i * 120}ms` } as React.CSSProperties}>{l}</span>
        </span>
      ))}
    </h2>
  );
}

/* ----------------------- Section eyebrow -------------------------- */
export function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" | "gold" }) {
  const color =
    tone === "light" ? "text-gold-300" : tone === "gold" ? "text-gold-600" : "text-crimson-600";
  return (
    <p className={`flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.28em] ${color}`}>
      <span className={`inline-block h-[2px] w-8 ${tone === "light" ? "bg-gold-400" : "bg-current"}`} />
      {children}
    </p>
  );
}

/* -------------------------- Stat block ---------------------------- */
export function StatBlock({
  value,
  suffix,
  label,
  delay = 0,
  light = false,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  light?: boolean;
}) {
  const [ref, inView] = useOnScreen<HTMLDivElement>(0.4);
  const n = useCountUp(value, inView);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ "--rv-delay": `${delay}ms` } as React.CSSProperties}
      className={`reveal ${inView ? "is-in" : ""}`}
    >
      <div className={`font-display font-black leading-none text-4xl md:text-5xl ${light ? "text-gold-300" : "text-navy-900"}`}>
        {n.toLocaleString("en-GB")}
        <span className={`text-xl md:text-2xl font-bold align-baseline ml-1 ${light ? "text-navy-200" : "text-gold-600"}`}>
          {suffix}
        </span>
      </div>
      <p className={`mt-2 text-sm font-semibold ${light ? "text-navy-100" : "text-navy-700/80"}`}>{label}</p>
    </div>
  );
}

/* ------------------------- Page header ---------------------------- */
export function PageHeader({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: React.ReactNode[];
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-navy-900 dark-weave text-chalk-50">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <CrestWatermark />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        <Reveal>
          <Eyebrow tone="light">{kicker}</Eyebrow>
        </Reveal>
        <MaskHeading
          lines={title}
          className="mt-5 font-display font-black text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.02] tracking-tight max-w-3xl"
        />
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-navy-100 leading-relaxed">{intro}</p>
        </Reveal>
        {children}
      </div>
      <div className="h-1.5 w-full bg-gold-400" />
    </header>
  );
}

function CrestWatermark() {
  return (
    <svg viewBox="0 0 24 24" className="absolute -right-16 -bottom-24 h-[26rem] w-[26rem] text-chalk-50" fill="none" stroke="currentColor" strokeWidth="0.5">
      <path d="M12 1.8 21 5.2v6.3c0 5.6-3.9 9-9 10.7-5.1-1.7-9-5.1-9-10.7V5.2Z" />
      <path d="M12 12.6c-1.6-1.3-3.6-1.5-5-1.3v5.2c1.4-.2 3.4 0 5 1.3 1.6-1.3 3.6-1.5 5-1.3v-5.2c-1.4-.2-3.4 0-5 1.3Z" />
      <path d="M12 12.6v5.2" />
    </svg>
  );
}

/* --------------------------- Tag chip ----------------------------- */
export function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-[13px] font-bold tracking-wide transition-all duration-300 ${
        active
          ? "border-navy-900 bg-navy-900 text-chalk-50 shadow-md"
          : "border-navy-900/25 bg-transparent text-navy-800 hover:border-navy-900 hover:bg-navy-900/5"
      }`}
    >
      {children}
    </button>
  );
}

/* --------------------- Section divider strip ---------------------- */
export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-[3px] w-14 bg-gold-400" />
      <span className="h-[3px] w-3 bg-gold-400/60" />
      <span className="h-[3px] w-1.5 bg-gold-400/30" />
    </div>
  );
}
