import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAV_LINKS, TICKER } from "../lib/data";
import { useScrolled } from "../lib/hooks";
import {
  IcLogo,
  IcSearch,
  IcMenu,
  IcClose,
  IcArrow,
  IcArrowUp,
  IcMail,
  IcPhone,
  IcPin,
} from "./icons";
import SearchOverlay from "./SearchOverlay";

/* ---------------- announcement ticker ---------------- */

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="bg-pine-950 text-gold-300 overflow-hidden border-b border-pine-800/60">
      <div className="ticker-track py-2">
        {items.map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-[0.78rem] font-semibold tracking-wide">
            <span className="mx-5 inline-block w-1.5 h-1.5 rotate-45 bg-gold-400 shrink-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- navigation ---------------- */

function Nav({ onSearch }: { onSearch: () => void }) {
  const scrolled = useScrolled(14);
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();

  useEffect(() => setDrawer(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <>
      <header
        className={`sticky top-0 z-[70] transition-all duration-300 ${
          scrolled ? "bg-chalk-50/95 backdrop-blur-md shadow-card" : "bg-chalk-50"
        } border-b border-pine-900/10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[70px]">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <IcLogo className="w-10 h-10" />
            </span>
            <span className="leading-none">
              <span className="block font-display font-extrabold text-[1.18rem] tracking-tight text-pine-950">
                Aldercrest Academy
              </span>
              <span className="block mt-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-pine-600">
                Est. 1962 · K–12
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                className={({ isActive }) =>
                  `link-slide text-[0.86rem] font-semibold transition-colors ${
                    isActive ? "active text-pine-950" : "text-pine-900/70 hover:text-pine-950"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onSearch}
              aria-label="Search the site"
              className="p-2.5 rounded-full border border-pine-900/15 text-pine-800 hover:bg-pine-900 hover:text-chalk-50 hover:border-pine-900 transition-all active:scale-95"
            >
              <IcSearch className="w-[18px] h-[18px]" />
            </button>
            <Link
              to="/portal"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gold-400 text-pine-950 font-bold text-sm px-5 py-2.5 hover:bg-gold-300 transition-all active:scale-[0.97] shadow-[0_6px_18px_-8px_rgba(209,138,31,0.7)]"
            >
              Student Portal
              <IcArrow className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="lg:hidden p-2.5 rounded-full border border-pine-900/15 text-pine-900 hover:bg-pine-900 hover:text-chalk-50 transition-colors"
            >
              <IcMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[80] lg:hidden transition-all duration-400 ${
          drawer ? "visible" : "invisible"
        }`}
      >
        <button
          aria-label="Close menu"
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-pine-1000/60 backdrop-blur-[2px] transition-opacity duration-400 ${
            drawer ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-pine-950 text-chalk-50 flex flex-col transition-transform duration-400 ease-out ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 h-[70px] border-b border-pine-800">
            <span className="font-display font-extrabold text-lg tracking-tight">Aldercrest</span>
            <button
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="p-2 rounded-full border border-pine-700 hover:bg-pine-800 transition-colors"
            >
              <IcClose className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile">
            {NAV_LINKS.map((l, i) => (
              <NavLink
                key={l.path}
                to={l.path}
                end={l.path === "/"}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3.5 border-b border-pine-800/70 font-display font-bold text-2xl tracking-tight transition-all duration-500 ${
                    drawer ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  } ${isActive ? "text-gold-300" : "text-chalk-100 hover:text-gold-300 hover:pl-2"}`
                }
                style={{ transitionDelay: drawer ? `${80 + i * 45}ms` : "0ms" }}
              >
                {l.label}
                <IcArrow className="w-5 h-5 opacity-40" />
              </NavLink>
            ))}
            <Link
              to="/portal"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 text-pine-950 font-bold px-6 py-3 hover:bg-gold-300 transition-colors"
            >
              Student Portal <IcArrow className="w-4 h-4" />
            </Link>
          </nav>
          <div className="px-6 py-6 border-t border-pine-800 text-sm text-pine-100/70">
            <p className="font-semibold text-chalk-100">Alder Hill Road, Aldercrest</p>
            <p className="mt-1">+1 (555) 014-2026 · office@aldercrest.edu</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const navigate = useNavigate();

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    setEmail("");
  };

  return (
    <footer className="relative bg-pine-950 text-pine-100 noise overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[26px] border-pine-900/70 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-3">
            <IcLogo className="w-11 h-11" />
            <div>
              <p className="font-display font-extrabold text-xl tracking-tight text-chalk-50">Aldercrest Academy</p>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-300 mt-1">
                Lumen et Radices
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-pine-100/75 max-w-xs">
            An independent day school for grades K–12 on Alder Hill — rooted in tradition, curious about
            everything, and kind on purpose since 1962.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-center gap-3"><IcPin className="w-4 h-4 text-gold-300 shrink-0" /> 42 Alder Hill Road, Aldercrest</li>
            <li className="flex items-center gap-3"><IcPhone className="w-4 h-4 text-gold-300 shrink-0" /> +1 (555) 014-2026</li>
            <li className="flex items-center gap-3"><IcMail className="w-4 h-4 text-gold-300 shrink-0" /> office@aldercrest.edu</li>
          </ul>
        </div>

        <div>
          <p className="kicker text-gold-300">Explore</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[...NAV_LINKS.slice(1), { label: "Student Portal", path: "/portal" }].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="hover:text-gold-300 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gold-400/60 group-hover:bg-gold-300 transition-colors" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-gold-300">Quick links</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              { label: "Tuition & bursaries", path: "/admissions" },
              { label: "School calendar", path: "/news" },
              { label: "Bus routes", path: "/contact" },
              { label: "Downloads & resources", path: "/academics" },
              { label: "Photo gallery", path: "/gallery" },
            ].map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => navigate(l.path)}
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-2 group text-left"
                >
                  <span className="w-1 h-1 rounded-full bg-gold-400/60 group-hover:bg-gold-300 transition-colors" />
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-gold-300">The Aldercrest Letter</p>
          <p className="mt-5 text-sm text-pine-100/75 leading-relaxed">
            One email a fortnight: news, fixtures, concert dates and the occasional bee update. No noise.
          </p>
          {state === "done" ? (
            <p className="mt-4 rounded-lg bg-pine-900 border border-pine-700 px-4 py-3 text-sm text-gold-300 font-semibold">
              Welcome aboard — first letter arrives Friday.
            </p>
          ) : (
            <form onSubmit={subscribe} className="mt-4">
              <div className="flex rounded-full bg-pine-900 border border-pine-700 p-1 focus-within:border-gold-400 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="flex-1 min-w-0 bg-transparent px-4 text-sm text-chalk-50 placeholder:text-pine-300/50 outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gold-400 text-pine-950 text-sm font-bold px-5 py-2 hover:bg-gold-300 transition-colors active:scale-95"
                >
                  Join
                </button>
              </div>
              {state === "error" && (
                <p className="mt-2 text-xs font-semibold text-gold-300">Please enter a valid email address.</p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="relative border-t border-pine-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-pine-100/60">
          <p>© {new Date().getFullYear()} Aldercrest Academy. A fictional school, lovingly built.</p>
          <p className="flex items-center gap-4">
            <span className="font-semibold text-pine-100/80">NAIS · Cognia · Round Square</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- back to top ---------------- */

function BackToTop() {
  const show = useScrolled(600);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-[60] w-11 h-11 rounded-full bg-pine-900 text-gold-300 grid place-items-center shadow-lift transition-all duration-300 hover:bg-pine-800 active:scale-90 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <IcArrowUp className="w-4 h-4" />
    </button>
  );
}

/* ---------------- layout shell ---------------- */

export default function Layout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-chalk-50">
      <Ticker />
      <Nav onSearch={() => setSearchOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
