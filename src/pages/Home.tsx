import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EVENTS, IMG, NEWS, NOTICEBOARD, STAGES, STATS } from "../lib/data";
import { agoLabel, daysUntil, fmtShort, fmtWeekday } from "../lib/hooks";
import { Reveal, SectionHead, StatBlock } from "../components/ui";
import { EVENT_COLORS } from "../components/interactive";
import { IcArrow, IcCalendar, IcClock, IcPin, IcQuote, IcBell } from "../components/icons";

/* rotating word in the headline */
const WORDS = ["curiosity", "character", "courage", "community"];
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span key={i} className="word-swap inline-block text-gold-300">
      {WORDS[i]}
    </span>
  );
}

export default function Home() {
  const upcoming = EVENTS.filter((e) => daysUntil(e.date) >= 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6);
  const featured = NEWS[0];
  const rest = NEWS.slice(1, 4);
  const postcards = [
    { src: IMG.library, cap: "Whitmore Library", r: "-5deg", y: "0" },
    { src: IMG.lab, cap: "Whitfield Labs", r: "3.5deg", y: "26px" },
    { src: IMG.sports, cap: "North Pitch", r: "-2.5deg", y: "-14px" },
    { src: IMG.arts, cap: "Ellison Hall", r: "5deg", y: "12px" },
    { src: IMG.graduation, cap: "The Quad, June", r: "-4deg", y: "-6px" },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -right-40 -top-40 w-[560px] h-[560px] rounded-full border-[36px] border-pine-900/80 pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full border border-pine-800 pointer-events-none" />
        <div className="absolute left-[-120px] bottom-[-160px] w-[420px] h-[420px] rounded-full bg-pine-900/50 blur-none pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          {/* left */}
          <div>
            <Reveal>
              <p className="kicker text-gold-300">Independent day school · Grades K–12 · Est. 1962</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[0.98] text-[2.6rem] sm:text-6xl lg:text-[4.3rem]">
                Where
                <br />
                <RotatingWord />
                <br />
                takes root.
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-lg text-[1.06rem] leading-relaxed text-pine-100/85">
                Aldercrest is a school of 1,140 students on 26 wooded acres — small classes, big questions,
                and a house system that means nobody eats lunch alone.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gold-400 text-pine-950 font-bold px-7 py-3.5 hover:bg-gold-300 transition-all active:scale-[0.97] shadow-[0_10px_30px_-10px_rgba(232,163,61,0.55)]"
                >
                  Apply for Fall 2026 <IcArrow className="w-4 h-4" />
                </Link>
                <Link
                  to="/academics"
                  className="inline-flex items-center gap-2.5 rounded-full border border-chalk-100/30 px-7 py-3.5 font-semibold text-chalk-50 hover:bg-chalk-50 hover:text-pine-950 transition-all active:scale-[0.97]"
                >
                  Explore academics
                </Link>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-pine-800 pt-8">
                {STATS.map((s) => (
                  <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} dark />
                ))}
              </div>
            </Reveal>
          </div>

          {/* right — layered imagery */}
          <Reveal delay={200} className="relative hidden sm:block">
            <div className="relative ml-6">
              <div className="absolute -inset-4 translate-x-6 translate-y-6 rounded-xl border-2 border-gold-400/70 pointer-events-none" />
              <div className="img-zoom relative rounded-xl overflow-hidden border-4 border-pine-900 shadow-lift">
                <img src={IMG.campus} alt="Students walking Founders Walk at Aldercrest" className="w-full h-[440px] lg:h-[500px] object-cover" />
              </div>

              {/* floating: open house */}
              <div className="absolute -left-10 bottom-8 bg-chalk-50 text-pine-950 rounded-xl shadow-lift px-5 py-4 animate-floaty max-w-[240px]">
                <p className="flex items-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-gold-600">
                  <IcCalendar className="w-3.5 h-3.5" /> Admissions
                </p>
                <p className="mt-1.5 font-display font-bold leading-tight">
                  Open House · {fmtShort(EVENTS.find((e) => e.id === "e2")!.date)}
                </p>
                <p className="mt-1 text-xs text-ink-soft">Tours leave Founders Hall every 20 minutes.</p>
              </div>

              {/* floating: term badge */}
              <div className="absolute -top-5 right-6 bg-pine-900 border border-pine-700 rounded-full pl-3 pr-4 py-2 flex items-center gap-2.5 shadow-lift">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400 pulse-dot" />
                <span className="text-xs font-bold text-chalk-50">Term 2 in session</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ THIS WEEK ============ */}
      <section className="relative border-b border-pine-900/10 bg-chalk-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-5">
          <p className="hidden md:flex shrink-0 items-center gap-2 font-display font-bold text-pine-950">
            <IcBell className="w-4 h-4 text-gold-500" /> This week on campus
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mb-1 snap-x">
            {upcoming.map((e, i) => (
              <Reveal key={e.id} delay={i * 60} className="snap-start shrink-0">
                <Link
                  to="/news"
                  className="group flex items-center gap-3 rounded-xl border border-pine-900/10 bg-white/80 px-4 py-2.5 hover:border-pine-700 hover:-translate-y-0.5 transition-all"
                >
                  <span
                    className="w-1.5 self-stretch rounded-full"
                    style={{ background: EVENT_COLORS[e.type] }}
                  />
                  <span>
                    <span className="block text-[0.66rem] font-extrabold uppercase tracking-wider" style={{ color: EVENT_COLORS[e.type] }}>
                      {fmtWeekday(e.date)} {e.date.getDate()} · {e.time}
                    </span>
                    <span className="block text-sm font-semibold text-pine-950 group-hover:text-pine-700 whitespace-nowrap">
                      {e.title}
                    </span>
                  </span>
                  <IcArrow className="w-3.5 h-3.5 text-pine-900/30 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOTICEBOARD ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHead
              kicker="Noticeboard"
              title={<>The things that matter, pinned up front.</>}
              body="From bus detours to concert doors — the daily business of a busy school, refreshed every morning by 07:45."
            />
            <Reveal delay={150}>
              <Link
                to="/news"
                className="mt-7 inline-flex items-center gap-2 font-bold text-pine-800 hover:text-gold-600 transition-colors group"
              >
                All news & events
                <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
          <div>
            {NOTICEBOARD.map((n, i) => (
              <Reveal key={n.title} delay={i * 80}>
                <div className="group flex gap-5 border-t border-pine-900/10 py-5 hover:bg-pine-50/60 rounded-lg px-3 -mx-3 transition-colors">
                  <div className="shrink-0 w-16 text-center pt-0.5">
                    <p className="font-display font-extrabold text-2xl leading-none text-pine-900">{n.date.getDate()}</p>
                    <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gold-600 mt-1">
                      {n.date.toLocaleString("en", { month: "short" })}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2.5">
                      <span className="rounded-full bg-pine-100 text-pine-800 text-[0.63rem] font-extrabold uppercase tracking-wider px-2.5 py-0.5">
                        {n.tag}
                      </span>
                    </p>
                    <p className="mt-1.5 font-semibold text-pine-950 group-hover:text-pine-700 transition-colors leading-snug">
                      {n.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{n.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={340}>
              <div className="mt-6 rounded-xl bg-gold-300/40 border border-gold-400/50 px-5 py-4 flex items-start gap-3">
                <IcBell className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <p className="text-sm text-pine-950">
                  <strong>Heads up:</strong> applications for Fall 2026 close <strong>January 15</strong>. The
                  Admissions Office answers every enquiry within two school days.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ STAGES ============ */}
      <section className="relative bg-pine-950 text-chalk-50 noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <SectionHead
            dark
            kicker="Learning, staged well"
            title={<>Three schools, one campus, a single thread of care.</>}
            body="Each stage has its own leader, its own buildings and its own rhythms — and every student is known by name across all of them."
          />
          <div className="mt-14 border-t border-pine-800">
            {STAGES.map((s, i) => (
              <Reveal key={s.num} delay={i * 90}>
                <Link
                  to="/academics"
                  className="group grid md:grid-cols-[110px_1fr_auto] gap-6 md:gap-10 items-start border-b border-pine-800 py-9 hover:bg-pine-900/50 transition-colors px-2 -mx-2"
                >
                  <span className="font-display font-extrabold text-5xl text-pine-700 group-hover:text-gold-400 transition-colors leading-none">
                    {s.num}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-baseline gap-x-4">
                      <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight">{s.name}</span>
                      <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-gold-300">{s.grades}</span>
                    </span>
                    <span className="mt-3 block max-w-xl text-pine-100/75 leading-relaxed">{s.blurb}</span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <span key={c} className="rounded-full border border-pine-700 px-3 py-1 text-xs font-semibold text-pine-100/80 group-hover:border-pine-600">
                          {c}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="hidden md:grid place-items-center w-12 h-12 rounded-full border border-pine-700 text-chalk-50 group-hover:bg-gold-400 group-hover:text-pine-950 group-hover:border-gold-400 transition-all">
                    <IcArrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HEAD'S QUOTE ============ */}
      <section className="relative bg-pine-900 text-chalk-50 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          <Reveal>
            <IcQuote className="w-12 h-12 text-gold-400 mx-auto" />
            <blockquote className="mt-6 font-display font-semibold text-2xl sm:text-[2.1rem] leading-snug tracking-tight">
              Children rise to the height of our belief in them. Our whole job is to keep the bar high and the
              door open — every day, for every child.
            </blockquote>
            <p className="mt-8 text-gold-300 font-bold">Dr. Eleanor Voss</p>
            <p className="text-pine-100/70 text-sm">Head of School, Aldercrest Academy</p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-chalk-100 hover:text-gold-300 transition-colors group"
            >
              Meet the leadership team <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ NEWS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            kicker="Fresh from the quad"
            title={<>News worth pinning.</>}
          />
          <Reveal delay={120}>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 rounded-full border border-pine-900/15 px-5 py-2.5 text-sm font-bold text-pine-900 hover:bg-pine-900 hover:text-chalk-50 transition-all"
            >
              All stories <IcArrow className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.35fr_1fr] gap-8">
          <Reveal>
            <Link to="/news" className="group block rounded-2xl overflow-hidden border border-pine-900/10 bg-white/70 shadow-card hover:shadow-lift transition-shadow">
              <div className="img-zoom">
                <img src={featured.img} alt={featured.title} className="w-full h-72 sm:h-96 object-cover" />
              </div>
              <div className="p-7">
                <p className="flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-wider">
                  <span className="rounded-full bg-gold-400 text-pine-950 px-2.5 py-0.5">{featured.category}</span>
                  <span className="text-pine-800/60">{agoLabel(featured.daysAgo)}</span>
                </p>
                <h3 className="mt-3 font-display font-bold text-2xl sm:text-[1.7rem] leading-tight tracking-tight text-pine-950 group-hover:text-pine-700 transition-colors">
                  {featured.title}
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-pine-800 group-hover:text-gold-600 transition-colors">
                  Read the story <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col">
            {rest.map((n, i) => (
              <Reveal key={n.id} delay={i * 90} className="flex-1">
                <Link
                  to="/news"
                  className="group flex gap-5 rounded-xl border border-pine-900/10 bg-white/70 p-4 h-full hover:border-pine-700 hover:-translate-y-0.5 hover:shadow-card transition-all"
                >
                  <div className="img-zoom w-28 sm:w-36 shrink-0 rounded-lg overflow-hidden">
                    <img src={n.img} alt="" className="w-full h-full object-cover min-h-[104px]" />
                  </div>
                  <div className="min-w-0 py-1">
                    <p className="text-[0.66rem] font-extrabold uppercase tracking-wider text-gold-600">
                      {n.category} · {agoLabel(n.daysAgo)}
                    </p>
                    <h4 className="mt-1.5 font-display font-bold leading-snug text-pine-950 group-hover:text-pine-700 transition-colors">
                      {n.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">{n.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY TEASER (postcards) ============ */}
      <section className="relative overflow-hidden bg-chalk-100 border-y border-pine-900/10">
        <div className="absolute inset-0 bg-grid-light opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center">
            <Reveal>
              <p className="kicker text-pine-600 justify-center">Life on the quad</p>
              <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem] text-pine-950">
                Postcards from Alder Hill
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6">
            {postcards.map((p, i) => (
              <Reveal key={p.cap} delay={i * 90}>
                <Link
                  to="/gallery"
                  className={`postcard block bg-white p-2.5 pb-3 rounded-md shadow-card ${i === 0 ? "lg:col-span-1" : ""}`}
                  style={{ transform: `rotate(${p.r}) translateY(${p.y})` }}
                >
                  <span className="img-zoom block rounded-sm overflow-hidden">
                    <img src={p.src} alt={p.cap} className="w-full h-36 sm:h-44 object-cover" />
                  </span>
                  <span className="block mt-2.5 text-center font-display font-semibold text-sm text-pine-900">{p.cap}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Reveal delay={200}>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2.5 rounded-full bg-pine-900 text-chalk-50 font-bold px-7 py-3.5 hover:bg-pine-800 transition-all active:scale-[0.97]"
              >
                Open the gallery <IcArrow className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ ADMISSIONS CTA ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-pine-950 text-chalk-50 noise">
            <div className="absolute inset-0 bg-grid-dark" />
            <div className="absolute -right-20 -bottom-28 w-96 h-96 rounded-full border-[28px] border-gold-400/15 pointer-events-none" />
            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 p-8 sm:p-12 lg:p-16 items-center">
              <div>
                <p className="kicker text-gold-300">Admissions 2026–27</p>
                <h2 className="mt-5 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.02]">
                  The kettle is on.
                  <br />
                  Come and see us.
                </h2>
                <p className="mt-5 max-w-lg text-pine-100/85 leading-relaxed">
                  Every family starts with a visit — a tour, a coffee, and a student guide who tells you what
                  the school is actually like. Applications for Fall 2026 close <strong className="text-gold-300">January 15</strong>.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/admissions"
                    className="inline-flex items-center gap-2.5 rounded-full bg-gold-400 text-pine-950 font-bold px-7 py-3.5 hover:bg-gold-300 transition-all active:scale-[0.97]"
                  >
                    Start an enquiry <IcArrow className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 rounded-full border border-chalk-100/30 px-7 py-3.5 font-semibold hover:bg-chalk-50 hover:text-pine-950 transition-all active:scale-[0.97]"
                  >
                    Book a tour
                  </Link>
                </div>
              </div>
              <ol className="space-y-4">
                {[
                  { t: "Enquire", d: "Two-day reply, prospectus in your inbox", icon: <IcClock className="w-4 h-4" /> },
                  { t: "Visit", d: "Student-led tours most Tue & Thu mornings", icon: <IcPin className="w-4 h-4" /> },
                  { t: "Decide", d: "Offers post March 10, bursaries included", icon: <IcCalendar className="w-4 h-4" /> },
                ].map((s, i) => (
                  <li
                    key={s.t}
                    className="flex items-center gap-4 rounded-xl border border-pine-800 bg-pine-900/60 px-5 py-4 hover:border-gold-400/60 transition-colors"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-full bg-gold-400 text-pine-950 font-display font-extrabold grid place-items-center">
                      {i + 1}
                    </span>
                    <span>
                      <span className="flex items-center gap-2 font-bold">{s.t} <span className="text-gold-300/80">{s.icon}</span></span>
                      <span className="block text-sm text-pine-100/70 mt-0.5">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
