import { useState } from "react";
import { Link } from "react-router-dom";
import { fmtDate, EVENTS, SCHOOL } from "../lib/data";
import { ArrowRight, CheckIcon, Crest, MailIcon, PhoneIcon, PinIcon } from "./icons";

const COLS = [
  {
    head: "Explore",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/academics", label: "Academics" },
      { to: "/gallery", label: "Gallery" },
      { to: "/news", label: "News & Events" },
      { to: "/portal", label: "Student Portal" },
    ],
  },
  {
    head: "Admissions",
    links: [
      { to: "/admissions", label: "How to apply" },
      { to: "/admissions", label: "Fees & bursaries" },
      { to: "/admissions", label: "Key dates" },
      { to: "/contact", label: "Book a visit" },
      { to: "/contact", label: "Enquiry form" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const nextEvents = [...EVENTS].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="dark-weave pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* top band */}
        <div className="grid gap-12 border-b border-chalk-50/10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center bg-gold-400 text-navy-900">
                <Crest className="h-8 w-8" />
              </span>
              <div>
                <p className="font-display text-2xl font-black text-chalk-50">Ashgrove Academy</p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gold-400">{SCHOOL.motto} · Est. {SCHOOL.founded}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
              An independent day school for ages 4–18, on the hill above Ash Vale. Curiosity first, character in action — and the bell still cast in Bristol.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold-300 transition-colors">
                <PhoneIcon className="h-4 w-4 text-gold-400" /> {SCHOOL.phone}
              </a>
              <a href={`mailto:${SCHOOL.email}`} className="flex items-center gap-3 hover:text-gold-300 transition-colors">
                <MailIcon className="h-4 w-4 text-gold-400" /> {SCHOOL.email}
              </a>
              <p className="flex items-center gap-3">
                <PinIcon className="h-4 w-4 text-gold-400" /> {SCHOOL.address}
              </p>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.head} className="md:col-span-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-400">{col.head}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link-slide text-sm font-semibold text-navy-100 hover:text-chalk-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-400">Coming up</p>
            <ul className="mt-4 space-y-3">
              {nextEvents.map((ev) => (
                <li key={ev.id}>
                  <Link to="/news" className="group flex gap-3">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400 transition-transform group-hover:scale-150" />
                    <span>
                      <span className="block text-sm font-bold text-chalk-50 leading-snug group-hover:text-gold-300 transition-colors">{ev.title}</span>
                      <span className="text-xs text-navy-200">{fmtDate(ev.date)} · {ev.time}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-400">The Friday Post</p>
            {subscribed ? (
              <p className="mt-3 flex items-center gap-2 border border-moss-600 bg-moss-600/20 px-3 py-2.5 text-sm font-bold text-chalk-50">
                <CheckIcon className="h-4 w-4 text-gold-400" /> Subscribed — see you Friday.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-3">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    aria-label="Email for the weekly newsletter"
                    className="w-full border border-chalk-50/20 bg-navy-900 px-3 py-2.5 text-sm text-chalk-50 placeholder:text-navy-200/50 focus:border-gold-400 focus:outline-none"
                  />
                  <button aria-label="Subscribe" className="btn-gold grid w-12 shrink-0 place-items-center bg-gold-400 text-navy-900">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {error && <p className="mt-2 text-xs font-bold text-gold-300">{error}</p>}
                <p className="mt-2 text-xs text-navy-200/80">Our weekly newsletter for parents. One email, no fuss.</p>
              </form>
            )}
          </div>
        </div>

        {/* bottom band */}
        <div className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-navy-200 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SCHOOL.name}. A charitable trust · Registered school No. 931/6042.
          </p>
          <div className="flex items-center gap-5 font-semibold">
            <a href="#/about" className="link-slide hover:text-chalk-50">Safeguarding</a>
            <a href="#/contact" className="link-slide hover:text-chalk-50">Policies</a>
            <a href="#/contact" className="link-slide hover:text-chalk-50">Vacancies</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 border border-chalk-50/20 px-3 py-1.5 font-bold text-chalk-50 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              Back to top <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
