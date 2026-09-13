import { useEffect, useMemo, useState } from "react";
import { EVENTS, SchoolEvent, today } from "../lib/data";
import { fmtMonthYear, fmtShort, isSameDay, monthGrid } from "../lib/hooks";
import { IcChevron, IcClock, IcPin, IcClose, IcArrow } from "./icons";

export const EVENT_COLORS: Record<SchoolEvent["type"], string> = {
  Academics: "#2b5a41",
  Arts: "#d18a1f",
  Sport: "#5e9273",
  Community: "#e8a33d",
  Admissions: "#0d3327",
};

/* ---------------- event calendar ---------------- */

export function Calendar({
  events = EVENTS,
  onSelect,
}: {
  events?: SchoolEvent[];
  onSelect?: (e: SchoolEvent) => void;
}) {
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<Date | null>(null);

  const weeks = useMemo(() => monthGrid(cursor.y, cursor.m), [cursor]);

  const eventsOn = (d: Date) => events.filter((e) => isSameDay(e.date, d));
  const selectedEvents = selected ? eventsOn(selected) : [];

  const move = (dir: -1 | 1) => {
    const dt = new Date(cursor.y, cursor.m + dir, 1);
    setCursor({ y: dt.getFullYear(), m: dt.getMonth() });
    setSelected(null);
  };

  return (
    <div className="rounded-2xl border border-pine-900/10 bg-white/70 shadow-card overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 bg-pine-950 text-chalk-50">
        <p className="font-display font-bold text-lg tracking-tight">{fmtMonthYear(new Date(cursor.y, cursor.m, 1))}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCursor({ y: today.getFullYear(), m: today.getMonth() });
              setSelected(null);
            }}
            className="text-[0.7rem] font-bold uppercase tracking-wider text-gold-300 hover:text-gold-200 transition-colors mr-1"
          >
            Today
          </button>
          <button
            onClick={() => move(-1)}
            aria-label="Previous month"
            className="p-1.5 rounded-full border border-pine-700 hover:bg-pine-800 transition-colors rotate-90"
          >
            <IcChevron className="w-4 h-4" />
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Next month"
            className="p-1.5 rounded-full border border-pine-700 hover:bg-pine-800 transition-colors -rotate-90"
          >
            <IcChevron className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* weekday labels */}
      <div className="grid grid-cols-7 text-center text-[0.66rem] font-extrabold uppercase tracking-wider text-pine-800/70 py-2.5 border-b border-pine-900/10">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* grid */}
      <div className="grid grid-cols-7">
        {weeks.flat().map((d, i) => {
          const inMonth = d.getMonth() === cursor.m;
          const isToday = isSameDay(d, today);
          const dayEvents = eventsOn(d);
          const isSel = selected ? isSameDay(d, selected) : false;
          return (
            <button
              key={i}
              onClick={() => setSelected(isSel ? null : d)}
              aria-label={`${fmtShort(d)}${dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ""}`}
              className={`relative aspect-square sm:aspect-[1.15] border-b border-r border-pine-900/5 p-1.5 flex flex-col items-start gap-1 transition-colors ${
                isSel ? "bg-gold-300/40" : dayEvents.length ? "bg-pine-50/70 hover:bg-pine-100" : "hover:bg-chalk-100"
              } ${inMonth ? "" : "opacity-35"}`}
            >
              <span
                className={`text-xs font-bold leading-none mt-1 w-6 h-6 grid place-items-center rounded-full ${
                  isToday ? "bg-pine-900 text-gold-300" : "text-pine-900"
                }`}
              >
                {d.getDate()}
              </span>
              <span className="flex gap-1 flex-wrap px-0.5">
                {dayEvents.slice(0, 3).map((e) => (
                  <span key={e.id} className="w-1.5 h-1.5 rounded-full" style={{ background: EVENT_COLORS[e.type] }} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      {/* selected day detail */}
      <div className={`border-t border-pine-900/10 transition-all ${selected ? "block" : "hidden"}`}>
        {selectedEvents.length === 0 ? (
          <p className="px-5 py-4 text-sm text-ink-soft">
            No events on <strong className="text-pine-900">{fmtShort(selected!)}</strong>. Enjoy the quiet.
          </p>
        ) : (
          <ul className="divide-y divide-pine-900/5">
            {selectedEvents.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => onSelect?.(e)}
                  className="w-full text-left px-5 py-3.5 hover:bg-pine-50 transition-colors group"
                >
                  <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full" style={{ background: EVENT_COLORS[e.type] }} />
                    <span style={{ color: EVENT_COLORS[e.type] }}>{e.type}</span>
                    <span className="text-pine-800/50 normal-case tracking-normal font-semibold flex items-center gap-1">
                      <IcClock className="w-3 h-3" /> {e.time}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold text-pine-950 group-hover:text-gold-600 transition-colors">{e.title}</p>
                  <p className="text-xs text-ink-soft mt-0.5 flex items-center gap-1">
                    <IcPin className="w-3 h-3" /> {e.location}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-5 py-3 bg-chalk-100/80 border-t border-pine-900/10 text-[0.68rem] font-semibold text-pine-900">
        {(Object.keys(EVENT_COLORS) as SchoolEvent["type"][]).map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: EVENT_COLORS[t] }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- lightbox ---------------- */

export type GalleryItem = { src: string; caption: string; tag: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onIndex]);

  const item = items[index];

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-10" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-pine-1000/90 backdrop-blur-sm cursor-default" onClick={onClose} aria-label="Close gallery" />
      <div className="relative max-w-5xl w-full reveal reveal-in">
        <img
          key={item.src + index}
          src={item.src}
          alt={item.caption}
          className="w-full max-h-[72vh] object-cover rounded-xl border-4 border-chalk-50 shadow-lift"
        />
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-gold-400 text-pine-950 text-[0.65rem] font-extrabold uppercase tracking-wider px-2.5 py-0.5">
              {item.tag}
            </span>
            <p className="mt-2 font-display font-semibold text-xl text-chalk-50">{item.caption}</p>
            <p className="text-pine-100/70 text-sm mt-0.5">
              {index + 1} of {items.length} · Aldercrest Academy
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onIndex((index - 1 + items.length) % items.length)}
              aria-label="Previous photo"
              className="p-3 rounded-full bg-chalk-50 text-pine-950 hover:bg-gold-300 transition-colors rotate-180 active:scale-90"
            >
              <IcArrow className="w-4 h-4" />
            </button>
            <button
              onClick={() => onIndex((index + 1) % items.length)}
              aria-label="Next photo"
              className="p-3 rounded-full bg-chalk-50 text-pine-950 hover:bg-gold-300 transition-colors active:scale-90"
            >
              <IcArrow className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-3 rounded-full bg-chalk-50 text-pine-950 hover:bg-gold-300 transition-colors active:scale-90"
            >
              <IcClose className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
