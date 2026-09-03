import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SCHOOL, announcements, downloadResource, navLinks, quickActions } from "../lib/data";
import { Crest, IcArrow, IcClose, IcMenu, IcPhone, IcSearch, IcUser } from "./icons";
import { SearchOverlay } from "./SearchOverlay";

/* ---------- search context ---------- */
const SearchCtx = createContext<{ openSearch: () => void }>({ openSearch: () => {} });
export const useSearch = () => useContext(SearchCtx);

/* ---------- announcement ticker ---------- */
export function TopBar() {
  const items = [...announcements, ...announcements];
  return (
    <div className="relative z-[60] flex items-stretch bg-navy-950 text-navy-100">
      <div className="marquee relative flex min-w-0 flex-1 items-center overflow-hidden border-r border-navy-800">
        <span className="kicker z-10 shrink-0 bg-gold-400 px-3 py-2 text-navy-950 sm:px-4">Noticeboard</span>
        <div className="marquee-track items-center">
          {items.map((a, i) => (
            <span key={i} className="flex items-center whitespace-nowrap text-[0.78rem] tracking-wide">
              <span className="mx-5 inline-block h-1.5 w-1.5 rotate-45 bg-gold-400" />
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden shrink-0 items-center gap-5 px-5 text-[0.78rem] lg:flex">
        <a href={`tel:${SCHOOL.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-gold-300">
          <IcPhone className="h-3.5 w-3.5" /> {SCHOOL.phone}
        </a>
        <span className="h-3 w-px bg-navy-700" />
        <Link to="/portal" className="flex items-center gap-2 font-semibold text-gold-300 transition-colors hover:text-gold-200">
          <IcUser className="h-3.5 w-3.5" /> Student Portal
        </Link>
      </div>
    </div>
  );
}

/* ---------- sticky header ---------- */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { openSearch } = useSearch();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-navy-900/15 bg-chalk-50/95 shadow-[0_10px_30px_-18px_rgba(7,26,48,0.5)] backdrop-blur" : "border-transparent bg-chalk-50"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <Crest className="h-11 w-auto transition-transform duration-300 group-hover:-rotate-3" />
          <span className="leading-none">
            <span className="font-display block text-[1.35rem] font-bold tracking-tight text-navy-900">Ashgrove</span>
            <span className="kicker block text-navy-600">Academy · Est. 1912</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 xl:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `link-draw text-[0.8rem] font-bold tracking-[0.08em] uppercase transition-colors ${
                  isActive ? "text-gold-600 [background-size:100%_1.5px]" : "text-navy-800 hover:text-navy-950"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 xl:ml-5">
          <button
            onClick={openSearch}
            className="hidden items-center gap-2 border border-navy-900/20 px-3 py-2 text-[0.78rem] font-semibold text-navy-700 transition-all hover:border-navy-700 hover:text-navy-900 sm:flex"
          >
            <IcSearch className="h-4 w-4" />
            Search
            <kbd className="ml-1 border border-navy-900/15 bg-chalk-100 px-1.5 py-0.5 text-[0.62rem] text-navy-600">Ctrl K</kbd>
          </button>
          <button onClick={openSearch} aria-label="Search the site" className="border border-navy-900/20 p-2.5 text-navy-700 sm:hidden">
            <IcSearch className="h-4 w-4" />
          </button>
          <Link to="/portal" className="btn btn-navy hidden !px-4 !py-2.5 md:inline-flex">
            Portal
          </Link>
          <button
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            className="border border-navy-900/20 p-2.5 text-navy-800 transition-colors hover:bg-navy-900 hover:text-chalk-50 xl:hidden"
          >
            <IcMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 xl:hidden ${drawer ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button aria-label="Close menu" className="absolute inset-0 bg-navy-950/70" onClick={() => setDrawer(false)} />
        <div
          className={`absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col bg-navy-950 text-chalk-50 shadow-2xl transition-transform duration-300 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-navy-800 px-6 py-4">
            <span className="kicker text-gold-300">Ashgrove Academy</span>
            <button onClick={() => setDrawer(false)} aria-label="Close menu" className="p-1 text-navy-200 hover:text-chalk-50">
              <IcClose className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-6">
            {navLinks.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-display group flex items-baseline gap-4 border-b border-navy-800/70 py-4 text-3xl font-semibold transition-colors ${
                    isActive ? "text-gold-300" : "text-chalk-50 hover:text-gold-300"
                  }`
                }
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <span className="text-xs font-bold text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3 border-t border-navy-800 px-6 py-5">
            <Link to="/portal" className="btn btn-gold flex-1 !px-4">
              <IcUser className="h-4 w-4" /> Student Portal
            </Link>
            <button onClick={() => { setDrawer(false); openSearch(); }} className="btn btn-ghost-light !px-4">
              <IcSearch className="h-4 w-4" /> Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- quick-access ledger strip (home) ---------- */
export function QuickStrip() {
  return (
    <div className="border-b border-navy-900/10 bg-chalk-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-navy-900/10 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
        {quickActions.map((q) => {
          const inner = (
            <>
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-lg font-semibold text-navy-900 transition-colors group-hover:text-gold-300">{q.label}</span>
                <IcArrow className="h-4 w-4 shrink-0 text-gold-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-300" />
              </span>
              <span className="mt-1 block text-[0.72rem] font-bold tracking-[0.14em] text-navy-500 uppercase transition-colors group-hover:text-navy-300">{q.meta}</span>
            </>
          );
          const cls = "group block px-5 py-5 transition-colors hover:bg-navy-950 sm:px-6";
          return q.to ? (
            <Link key={q.label} to={q.to} className={cls}>{inner}</Link>
          ) : (
            <button
              key={q.label}
              onClick={() => downloadResource(q.download!)}
              className={`${cls} w-full cursor-pointer text-left`}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [err, setErr] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    setErr("");
    setSubscribed(true);
  };

  return (
    <footer className="blueprint relative bg-navy-950 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-14 w-auto" />
            <div>
              <p className="font-display text-2xl font-bold text-chalk-50">Ashgrove Academy</p>
              <p className="kicker mt-1 text-gold-300">Radices et Alae · Est. 1912</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200/90">
            An independent day school for ages 4–18 on a 32-acre campus in Hartfield, Kent. Roots to grow, wings to soar — since a walled garden and one donkey in 1912.
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed">
            {SCHOOL.address}
            <br />
            <a href={`tel:${SCHOOL.phone.replace(/[^+\d]/g, "")}`} className="link-draw text-gold-300">{SCHOOL.phone}</a>
            <br />
            <a href={`mailto:${SCHOOL.email}`} className="link-draw text-gold-300">{SCHOOL.email}</a>
          </address>
        </div>

        <div>
          <p className="kicker text-gold-400">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-draw text-sm text-navy-100 transition-colors hover:text-chalk-50">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/portal" className="link-draw text-sm text-gold-300">Student Portal</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="kicker text-gold-400">Downloads</p>
          <ul className="mt-5 space-y-2.5">
            {[
              { id: "prospectus", label: "Prospectus 2026" },
              { id: "application-form", label: "Registration form" },
              { id: "term-calendar", label: "Term dates" },
              { id: "uniform-list", label: "Uniform list" },
              { id: "bus-routes", label: "Bus routes" },
            ].map((r) => (
              <li key={r.id}>
                <button onClick={() => downloadResource(r.id)} className="link-draw cursor-pointer text-left text-sm text-navy-100 transition-colors hover:text-chalk-50">
                  {r.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker text-gold-400">The Grove Gazette</p>
          <p className="mt-5 text-sm leading-relaxed text-navy-200/90">
            Our termly letter: what the pupils made, broke and discovered. One email a term, no more.
          </p>
          {subscribed ? (
            <div className="rise mt-5 border border-moss-600 bg-moss-700/25 px-4 py-3.5 text-sm text-chalk-50">
              Welcome aboard — the next Gazette arrives at half-term.
            </div>
          ) : (
            <form onSubmit={subscribe} className="mt-5" noValidate>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.co.uk"
                  aria-label="Email address for newsletter"
                  className="min-w-0 flex-1 border border-navy-700 bg-navy-900 px-3.5 py-2.5 text-sm text-chalk-50 placeholder:text-navy-400 focus:border-gold-400 focus:outline-none"
                />
                <button type="submit" className="shrink-0 bg-gold-400 px-4 text-[0.72rem] font-bold tracking-[0.12em] text-navy-950 uppercase transition-colors hover:bg-gold-300">
                  Sign up
                </button>
              </div>
              {err && <p className="mt-2 text-xs text-gold-300">{err}</p>}
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-[0.72rem] tracking-wide text-navy-400 sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} The Ashgrove Academy Trust · Registered charity no. 101214</p>
          <div className="flex gap-5">
            <Link to="/about" className="link-draw hover:text-navy-200">Safeguarding</Link>
            <Link to="/about" className="link-draw hover:text-navy-200">ISI Reports</Link>
            <Link to="/contact" className="link-draw hover:text-navy-200">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- scroll restore + layout shell ---------- */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function Layout({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
      if (e.key === "/") {
        const t = e.target as HTMLElement;
        if (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" && !t.isContentEditable) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SearchCtx.Provider value={{ openSearch: () => setSearchOpen(true) }}>
      <div className="noise min-h-screen bg-chalk-50 text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-bold focus:text-navy-950"
        >
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </SearchCtx.Provider>
  );
}
