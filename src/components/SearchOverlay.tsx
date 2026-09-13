import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEARCH_INDEX, SearchItem } from "../lib/data";
import { IcSearch, IcClose, IcArrow } from "./icons";

const TYPE_STYLES: Record<string, string> = {
  Page: "bg-pine-900 text-chalk-50",
  News: "bg-gold-400 text-pine-950",
  Event: "bg-pine-600 text-chalk-50",
  Program: "bg-pine-100 text-pine-900",
  Department: "bg-pine-100 text-pine-900",
  Resource: "bg-gold-200 text-gold-600",
  People: "bg-chalk-200 text-pine-900",
  FAQ: "bg-chalk-200 text-pine-900",
  Info: "bg-chalk-200 text-pine-900",
};

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return SEARCH_INDEX.filter(
      (it) =>
        it.title.toLowerCase().includes(term) ||
        it.type.toLowerCase().includes(term) ||
        (it.note ?? "").toLowerCase().includes(term)
    ).slice(0, 12);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [results.length]);

  const go = (it: SearchItem) => {
    onClose();
    navigate(it.path);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search the school site"
    >
      <button
        aria-label="Close search"
        className="absolute inset-0 bg-pine-1000/70 backdrop-blur-[3px] cursor-default"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-chalk-50 shadow-lift border border-pine-900/10 overflow-hidden reveal reveal-in">
        <div className="flex items-center gap-3 px-5 border-b border-pine-900/10">
          <IcSearch className="w-5 h-5 text-pine-600 shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active]);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Search news, events, programmes, people…"
            className="w-full bg-transparent py-4.5 text-lg text-ink outline-none placeholder:text-pine-900/35"
          />
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-pine-900/15 p-1.5 text-pine-800 hover:bg-pine-900 hover:text-chalk-50 transition-colors"
          >
            <IcClose className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {q.trim() === "" && (
            <div className="px-6 py-8 text-sm text-ink-soft">
              <p className="font-semibold text-pine-900 mb-2">Try searching for…</p>
              <div className="flex flex-wrap gap-2">
                {["Robotics", "Open House", "Bursary", "Bus routes", "Thesis", "Winter Concert"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="rounded-full border border-pine-900/15 px-3.5 py-1.5 hover:bg-gold-300 hover:border-gold-300 transition-colors font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q.trim() !== "" && results.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="font-display font-semibold text-xl text-pine-950">Nothing found for “{q}”</p>
              <p className="text-sm text-ink-soft mt-2">
                Try “admissions”, a department name, or an event like “concert”.
              </p>
            </div>
          )}

          {results.map((r, i) => (
            <button
              key={`${r.type}-${r.title}-${i}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r)}
              className={`w-full text-left px-5 py-3.5 flex items-center gap-4 border-b border-pine-900/5 transition-colors ${
                active === i ? "bg-pine-50" : ""
              }`}
            >
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider ${
                  TYPE_STYLES[r.type] ?? "bg-chalk-200 text-pine-900"
                }`}
              >
                {r.type}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-pine-950 truncate">{r.title}</span>
                {r.note && <span className="block text-xs text-ink-soft truncate mt-0.5">{r.note}</span>}
              </span>
              <IcArrow className={`w-4 h-4 shrink-0 transition-all ${active === i ? "text-gold-500 translate-x-0.5" : "text-pine-900/25"}`} />
            </button>
          ))}
        </div>

        <div className="px-5 py-2.5 bg-pine-900 text-pine-100/80 text-[0.7rem] font-medium flex gap-4">
          <span><kbd className="text-gold-300">↑↓</kbd> navigate</span>
          <span><kbd className="text-gold-300">↵</kbd> open</span>
          <span><kbd className="text-gold-300">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
