import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ANNOUNCEMENTS, SCHOOL, TICKER_ITEMS } from "../lib/data";
import { BellIcon, CloseIcon, Crest, MenuIcon, PhoneIcon, SearchIcon, UserIcon, ArrowRight } from "./icons";
import SearchOverlay from "./SearchOverlay";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News & Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
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
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      {/* utility bar */}
      <div className="bg-navy-950 text-navy-100 text-[13px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 md:px-8">
          <p className="hidden sm:block font-semibold tracking-wide">
            <span className="text-gold-400">{SCHOOL.termNow}</span>
            <span className="mx-2 text-navy-600">|</span>
            {today}
          </p>
          <p className="sm:hidden font-semibold text-gold-400">{SCHOOL.termNow}</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`} className="hidden md:flex items-center gap-2 hover:text-gold-300 transition-colors">
              <PhoneIcon className="h-3.5 w-3.5" /> {SCHOOL.phone}
            </a>
            <Link to="/portal" className="flex items-center gap-1.5 font-bold text-gold-300 hover:text-gold-200 transition-colors">
              <UserIcon className="h-3.5 w-3.5" /> Student Portal
            </Link>
          </div>
        </div>
      </div>

      {/* announcement ticker */}
      <div className="relative overflow-hidden bg-gold-400 text-navy-900" role="marquee" aria-label="School announcements">
        <div className="mx-auto flex max-w-7xl items-stretch">
          <div className="flex shrink-0 items-center gap-2 bg-navy-900 px-4 py-2 text-chalk-50 z-10">
            <BellIcon className="h-4 w-4 bell-swing text-gold-400" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]">Noticeboard</span>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="ticker-track items-center py-2">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                  {TICKER_ITEMS.map((t, i) => (
                    <span key={i} className="flex items-center whitespace-nowrap text-[13px] font-bold">
                      <span className="mx-4 h-1.5 w-1.5 rounded-full bg-navy-900/70" />
                      {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* main nav */}
      <nav
        className={`sticky top-0 z-50 border-b border-navy-900/10 bg-chalk-50/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(7,26,48,0.45)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center bg-navy-900 text-gold-400 transition-transform duration-300 group-hover:rotate-[-4deg]">
              <Crest className="h-7 w-7" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-black tracking-tight text-navy-900">Ashgrove Academy</span>
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.3em] text-gold-600">Est. 1912 · Lumen et Veritas</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `link-slide text-[14px] font-bold tracking-wide transition-colors ${
                    isActive ? "text-navy-900 [background-size:100%_2px] text-gold-600" : "text-navy-800/75 hover:text-navy-900"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search the site"
              className="grid h-10 w-10 place-items-center border border-navy-900/20 text-navy-800 transition-all duration-300 hover:border-navy-900 hover:bg-navy-900 hover:text-gold-300"
            >
              <SearchIcon className="h-4.5 w-4.5" />
            </button>
            <Link
              to="/admissions"
              className="btn-gold hidden bg-gold-400 px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-navy-900 md:block"
            >
              Apply
            </Link>
            <button
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center border border-navy-900/20 text-navy-900 lg:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[80] transition-opacity duration-300 lg:hidden ${
          drawer ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-navy-950/60" onClick={() => setDrawer(false)} />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-navy-900 dark-weave text-chalk-50 transition-transform duration-400 ease-out ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-chalk-50/10 px-6 py-4">
            <span className="flex items-center gap-2.5">
              <Crest className="h-6 w-6 text-gold-400" />
              <span className="font-display text-lg font-black">Ashgrove</span>
            </span>
            <button onClick={() => setDrawer(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center border border-chalk-50/20">
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {NAV.map((n, i) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                style={{ transitionDelay: `${i * 40}ms` }}
                className={({ isActive }) =>
                  `group flex items-center justify-between border-b border-chalk-50/10 py-4 font-display text-2xl font-bold transition-all duration-300 ${
                    isActive ? "text-gold-300" : "text-chalk-50 hover:text-gold-300 hover:pl-2"
                  }`
                }
              >
                {n.label}
                <ArrowRight className="h-4 w-4 text-gold-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </NavLink>
            ))}
            <Link to="/portal" className="btn-gold mt-8 block bg-gold-400 px-5 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.14em] text-navy-900">
              Student Portal
            </Link>
          </div>
          <div className="border-t border-chalk-50/10 px-6 py-5 text-sm text-navy-100">
            <p className="font-bold text-chalk-50">{SCHOOL.address}</p>
            <p className="mt-1">{SCHOOL.phone} · {SCHOOL.email}</p>
          </div>
        </div>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />

      {/* pinned notices quick count for a11y */}
      <span className="sr-only">{ANNOUNCEMENTS.length} current notices on the school noticeboard.</span>
    </>
  );
}
