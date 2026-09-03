import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSite, type SearchHit } from "../lib/data";
import { IcArrowUp, IcClose, IcSearch } from "./icons";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const hits = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, hits.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter" && hits[active]) {
        go(hits[active]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hits, active]);

  const go = (h: SearchHit) => {
    onClose();
    navigate(h.doc.path);
  };

  const typeTone: Record<string, string> = {
    Page: "bg-navy-700 text-chalk-50",
    Programme: "bg-navy-100 text-navy-800",
    News: "bg-gold-200 text-navy-950",
    Event: "bg-moss-600 text-chalk-50",
    Resource: "bg-crimson-600 text-chalk-50",
  };

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[9vh] transition-opacity duration-200 sm:pt-[12vh] ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
    >
      <button aria-label="Close search" className="absolute inset-0 bg-navy-950/80 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={`relative w-full max-w-2xl border border-navy-700 bg-chalk-50 shadow-2xl transition-transform duration-200 ${
          open ? "translate-y-0" : "-translate-y-3"
        }`}
      >
        <div className="flex items-center gap-3 border-b-2 border-navy-900 px-5">
          <IcSearch className="h-5 w-5 shrink-0 text-gold-600" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, news, events, resources…"
            className="w-full bg-transparent py-4 text-lg text-ink placeholder:text-navy-400 focus:outline-none"
            aria-label="Search query"
          />
          <button onClick={onClose} aria-label="Close" className="p-1 text-navy-500 transition-colors hover:text-navy-900">
            <IcClose className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[58vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="px-5 py-8 text-center">
              <p className="font-display text-xl font-semibold text-navy-800">Try one of these…</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Open day", "bursaries", "football", "timetable", "fees", "library"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="border border-navy-900/20 bg-chalk-100 px-3 py-1.5 text-sm text-navy-700 transition-colors hover:border-gold-500 hover:bg-gold-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : hits.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="font-display text-xl font-semibold text-navy-800">Nothing found for “{query}”.</p>
              <p className="mt-2 text-sm text-ink/60">Try “admissions”, “concert”, “bus” or “uniform”.</p>
            </div>
          ) : (
            <ul>
              {hits.map((h, i) => (
                <li key={`${h.doc.type}-${h.doc.title}-${i}`}>
                  <button
                    onClick={() => go(h)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-4 border-b border-navy-900/10 px-5 py-3.5 text-left transition-colors ${
                      i === active ? "bg-navy-900 text-chalk-50" : "hover:bg-chalk-100"
                    }`}
                  >
                    <span className={`kicker shrink-0 !text-[0.58rem] ${i === active ? "text-gold-300" : ""}`}>
                      <span className={`px-2 py-1 ${typeTone[h.doc.type]}`}>{h.doc.type}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[0.95rem] font-bold ${i === active ? "text-chalk-50" : "text-navy-900"}`}>
                        {h.doc.title}
                      </span>
                      <span className={`block truncate text-[0.78rem] ${i === active ? "text-navy-200" : "text-ink/55"}`}>
                        {h.pre}
                        <mark>{h.hit}</mark>
                        {h.post} · <em className="not-italic opacity-70">{h.doc.meta}</em>
                      </span>
                    </span>
                    <IcArrowUp className={`h-4 w-4 shrink-0 ${i === active ? "text-gold-300" : "text-navy-400"}`} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-navy-900/15 bg-chalk-100 px-5 py-2.5 text-[0.68rem] font-semibold tracking-wide text-navy-500 uppercase">
          <span><kbd className="border border-navy-900/20 bg-chalk-50 px-1.5 py-0.5">↑↓</kbd> Navigate</span>
          <span><kbd className="border border-navy-900/20 bg-chalk-50 px-1.5 py-0.5">↵</kbd> Open</span>
          <span><kbd className="border border-navy-900/20 bg-chalk-50 px-1.5 py-0.5">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
