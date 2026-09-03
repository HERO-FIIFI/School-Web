import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEARCH_INDEX, type SearchEntry } from "../lib/data";
import { useLockBody } from "../lib/hooks";
import { ArrowRight, CloseIcon, SearchIcon } from "./icons";

const TYPE_ORDER: SearchEntry["type"][] = ["Page", "Event", "News", "Programme", "Resource"];

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useLockBody(open);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return SEARCH_INDEX.filter(
      (e) => e.title.toLowerCase().includes(q) || e.detail.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)
    ).slice(0, 14);
  }, [query]);

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active].path);
    }
  };

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl overflow-hidden border border-gold-400/40 bg-chalk-50 shadow-2xl animate-[none] reveal is-in">
        <div className="flex items-center gap-3 border-b border-navy-900/15 bg-navy-900 px-5 py-4 text-chalk-50">
          <SearchIcon className="h-5 w-5 shrink-0 text-gold-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search news, events, programmes, resources…"
            className="w-full bg-transparent text-lg font-semibold placeholder:text-navy-200/60 focus:outline-none"
            aria-label="Search query"
          />
          <button onClick={onClose} aria-label="Close search" className="grid h-8 w-8 shrink-0 place-items-center border border-chalk-50/25 hover:border-gold-400 hover:text-gold-300 transition-colors">
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto thin-scroll">
          {query.trim().length < 2 ? (
            <div className="px-6 py-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-gold-600">Try searching for</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Open Morning", "fees", "mock exams", "rugby", "bursary", "Sixth Form", "Winter Concert"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-navy-900/25 px-4 py-1.5 text-sm font-bold text-navy-800 transition-all hover:border-navy-900 hover:bg-navy-900 hover:text-chalk-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-sm text-navy-800/70">
                Tip: press <kbd className="border border-navy-900/30 bg-chalk-100 px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>{" "}
                <kbd className="border border-navy-900/30 bg-chalk-100 px-1.5 py-0.5 font-mono text-xs">K</kbd> anywhere to search.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="font-display text-2xl font-bold text-navy-900">Nothing in the ledger for “{query}”.</p>
              <p className="mt-2 text-sm text-navy-800/70">Try “admissions”, a subject name, or an event title.</p>
            </div>
          ) : (
            <ul>
              {TYPE_ORDER.map((type) => {
                const group = results
                  .map((r, idx) => ({ r, idx }))
                  .filter(({ r }) => r.type === type);
                if (group.length === 0) return null;
                return (
                  <li key={type}>
                    <p className="sticky top-0 border-y border-navy-900/10 bg-chalk-200 px-6 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.28em] text-navy-800">
                      {type === "Page" ? "Pages" : `${type}s`}
                    </p>
                    <ul>
                      {group.map(({ r, idx }) => (
                        <li key={`${r.type}-${r.title}-${idx}`}>
                          <button
                            onMouseEnter={() => setActive(idx)}
                            onClick={() => go(r.path)}
                            className={`group flex w-full items-center justify-between gap-4 px-6 py-3.5 text-left transition-colors ${
                              active === idx ? "bg-navy-900 text-chalk-50" : "hover:bg-navy-100/50"
                            }`}
                          >
                            <span>
                              <span className="block font-bold leading-snug">{r.title}</span>
                              <span className={`block text-[13px] ${active === idx ? "text-navy-200" : "text-navy-800/60"}`}>{r.detail}</span>
                            </span>
                            <ArrowRight className={`h-4 w-4 shrink-0 ${active === idx ? "text-gold-400" : "text-navy-900/30 group-hover:text-navy-900"}`} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-navy-900/10 bg-chalk-100 px-6 py-2.5 text-[11px] font-bold text-navy-800/60">
          <span>{results.length > 0 ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Type at least 2 characters"}</span>
          <span className="hidden sm:block">↑↓ navigate · ↵ open · esc close</span>
        </div>
      </div>
    </div>
  );
}
