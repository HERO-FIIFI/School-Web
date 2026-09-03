import { useEffect, useRef, useState } from "react";

/* Observe an element once; returns [ref, inView] */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/* Animated counter that starts when `start` becomes true */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* ---------------- date helpers ---------------- */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_S = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS_S = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const fmtShort = (dt: Date) => `${DAYS_S[dt.getDay()]} ${dt.getDate()} ${MONTHS_S[dt.getMonth()]}`;
export const fmtWeekday = (dt: Date) => DAYS_FULL[dt.getDay()];
export const fmtLong = (dt: Date) => `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
export const fmtMonthYear = (dt: Date) => `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;

export const daysUntil = (dt: Date) =>
  Math.ceil((dt.getTime() - new Date().setHours(0, 0, 0, 0)) / 86_400_000);

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/* Month grid: weeks of Dates, padded to full weeks (Sunday-first) */
export function monthGrid(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const weeks: Date[][] = [];
  const cur = new Date(start);
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
    if (cur.getMonth() !== month && cur.getDay() === 0 && w >= 3) break;
  }
  return weeks;
}

/* Relative "n days ago / today" label for news */
export function agoLabel(daysAgo: number) {
  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) return `${Math.round(daysAgo / 7)} week${daysAgo >= 14 ? "s" : ""} ago`;
  return `${Math.round(daysAgo / 30)} month${daysAgo >= 60 ? "s" : ""} ago`;
}

/* Generate a .ics file for an event and trigger download */
export function downloadICS(title: string, date: Date, time: string, location: string, desc: string) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const [hh = "9", mm = "00"] = time.split(":");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aldercrest Academy//Events//EN",
    "BEGIN:VEVENT",
    `UID:${stamp}-${title.length}@aldercrest.edu`,
    `DTSTAMP:${stamp}T${pad(Number(hh))}${pad(Number(mm))}00`,
    `DTSTART:${stamp}T${pad(Number(hh))}${pad(Number(mm))}00`,
    `SUMMARY:${title.replace(/,/g, "\\,")}`,
    `LOCATION:${location.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${desc.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 800);
}
