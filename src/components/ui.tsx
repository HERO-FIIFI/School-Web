import React from "react";
import { useInView, useCountUp } from "../lib/hooks";
import { IcChevron, IcDownload } from "./icons";

/* ---------- scroll reveal ---------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ ["--rd" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- section heading ---------- */

export function SectionHead({
  kicker,
  title,
  body,
  dark = false,
  className = "",
}: {
  kicker: string;
  title: React.ReactNode;
  body?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className={`kicker ${dark ? "text-gold-300" : "text-pine-600"}`}>{kicker}</p>
      <h2
        className={`font-display font-bold leading-[1.04] tracking-tight mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-chalk-50" : "text-pine-950"
        }`}
      >
        {title}
      </h2>
      {body && (
        <p className={`mt-5 text-[1.05rem] leading-relaxed ${dark ? "text-pine-100/85" : "text-ink-soft"}`}>
          {body}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- animated stat ---------- */

export function StatBlock({
  value,
  suffix = "",
  label,
  dark = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  dark?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const n = useCountUp(value, inView);
  return (
    <div ref={ref}>
      <div
        className={`font-display font-extrabold tracking-tight text-4xl sm:text-[2.6rem] leading-none ${
          dark ? "text-gold-300" : "text-pine-900"
        }`}
      >
        {n.toLocaleString()}
        {suffix && <span className={dark ? "text-chalk-100" : "text-gold-500"}>{suffix}</span>}
      </div>
      <div className={`mt-2 text-sm font-medium ${dark ? "text-pine-100/75" : "text-ink-soft"}`}>{label}</div>
    </div>
  );
}

/* ---------- accordion ---------- */

export function Accordion({
  items,
  dark = false,
  defaultOpen = 0,
}: {
  items: { title: React.ReactNode; body: React.ReactNode }[];
  dark?: boolean;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = React.useState<number | null>(defaultOpen);
  return (
    <div className={`divide-y ${dark ? "divide-pine-800" : "divide-pine-900/10"}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`w-full flex items-center justify-between gap-6 py-5 text-left group ${
                dark ? "text-chalk-50" : "text-pine-950"
              }`}
            >
              <span className="font-display font-semibold text-lg sm:text-xl leading-snug group-hover:text-gold-500 transition-colors">
                {it.title}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full border grid place-items-center transition-all duration-300 ${
                  isOpen
                    ? "bg-gold-400 border-gold-400 text-pine-950 rotate-180"
                    : dark
                    ? "border-pine-700 text-chalk-100"
                    : "border-pine-900/20 text-pine-900"
                }`}
              >
                <IcChevron className="w-4 h-4" />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className={`pb-6 pr-10 leading-relaxed ${dark ? "text-pine-100/85" : "text-ink-soft"}`}>
                  {it.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- form primitives ---------- */

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-pine-800 mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs font-semibold text-gold-600">{error}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-pine-900/15 bg-white/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-pine-900/35 outline-none transition-all focus:border-pine-600 focus:bg-white focus:ring-4 focus:ring-pine-600/10";

/* ---------- resource download button ---------- */

export function DownloadBtn({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-pine-900/20 bg-white/60 px-4 py-2 text-sm font-semibold text-pine-900 transition-all hover:bg-pine-900 hover:text-chalk-50 hover:border-pine-900 active:scale-[0.97]"
    >
      <IcDownload className="w-4 h-4" />
      {label ?? "Download PDF"}
    </button>
  );
}
