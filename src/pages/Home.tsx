import { Link } from "react-router-dom";
import { QuickStrip } from "../components/layout";
import { DateBadge } from "../components/interactive";
import { ArrowLink, Chip, CountUp, FramedImage, Kicker, Lines, Reveal, Scramble, SectionHead } from "../components/ui";
import { IcArrow, IcCheck, IcLeaf } from "../components/icons";
import { useNow } from "../lib/hooks";
import { IMG, currentPeriod, divisions, events, fmtShort, fmtWeekday, newsItems } from "../lib/data";

/* ---------- live countdown ---------- */
const openDay = events.find((e) => e.tag === "Open Day") ?? events[0];

function useCountdown(target: Date) {
  const now = useNow(1000);
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`spin-slow ${className}`} aria-hidden="true">
      <defs>
        <path id="stampcirc" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="var(--color-navy-900)" stroke="var(--color-gold-400)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="var(--color-gold-400)" strokeWidth="0.75" opacity="0.6" />
      <text fontSize="9.6" letterSpacing="2.6" fill="var(--color-gold-300)" fontFamily="Archivo, sans-serif" fontWeight="700">
        <textPath href="#stampcirc">ASHGROVE ACADEMY · EST. 1912 · RADICES ET ALAE ·</textPath>
      </text>
      <path d="M50 74c0-12 7.6-19.4 18-19.7.6 10.4-5.8 17.7-16 18.7" fill="none" stroke="var(--color-gold-300)" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 74c3.2-5.8 7.8-10.3 13.4-13.1" fill="none" stroke="var(--color-gold-300)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const now = useNow(15000);
  const bell = currentPeriod(now);
  const cd = useCountdown(openDay.date);
  const upcoming = [...events].filter((e) => e.date.getTime() >= Date.now() - 3600000).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);
  const latestNews = [...newsItems].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 4);
  const years = new Date().getFullYear() - 1912;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="blueprint relative overflow-hidden bg-navy-950 text-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-14 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <div className="relative z-10 lg:col-span-7">
            <Reveal>
              <p className="kicker flex flex-wrap items-center gap-x-3 gap-y-1 text-gold-300">
                <span className="inline-block h-px w-8 bg-gold-400" />
                <Scramble text="Ashgrove Academy · Est. 1912 · Radices et Alae" />
              </p>
            </Reveal>
            <Lines
              as="h1"
              lines={[
                <>Roots to grow,</>,
                <em key="w" className="font-display italic text-gold-300">wings to soar.</em>,
              ]}
              className="font-display mt-6 text-[2.9rem] leading-[1.0] font-semibold tracking-tight sm:text-7xl lg:text-[5.2rem]"
              delay={120}
              stagger={160}
            />
            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg">
                An independent day school for ages 4–18 on a 32-acre Kent campus — where a walled-garden beginning in 1912
                grew into 1,180 pupils, four schools, and one very long list of clubs.
              </p>
            </Reveal>
            <Reveal delay={520}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn btn-gold">
                  Book a campus tour <IcArrow className="h-4 w-4" />
                </Link>
                <Link to="/admissions" className="btn btn-ghost-light">
                  Admissions 2026
                </Link>
              </div>
            </Reveal>
            <Reveal delay={620}>
              <dl className="mt-12 grid grid-cols-2 gap-y-4 border-t border-navy-800 pt-6 sm:grid-cols-4">
                {[
                  ["Ages", "4 – 18"],
                  ["Campus", "32 acres"],
                  ["Ratio", "1 : 9 staff"],
                  ["First-choice unis", "96%"],
                ].map(([k, v]) => (
                  <div key={k} className="pr-4">
                    <dt className="kicker !text-[0.58rem] text-navy-400">{k}</dt>
                    <dd className="font-display mt-1 text-xl font-bold text-chalk-50">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* hero image + live cards */}
          <div className="relative lg:col-span-5">
            <Reveal delay={250} className="relative">
              <FramedImage src={IMG.quad} alt="Pupils crossing the main quad at golden hour" className="aspect-[4/5] border border-navy-700 sm:aspect-[5/5] lg:aspect-[4/5]" />
              {/* live bell chip */}
              <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-3 border border-navy-700 bg-navy-950/85 px-4 py-2.5 backdrop-blur-sm">
                <span className="flex items-center gap-2.5">
                  <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-gold-400" />
                  <span key={bell.label} className="rise text-[0.78rem] font-semibold tracking-wide text-chalk-50">{bell.label}</span>
                </span>
                <span className="kicker hidden !text-[0.56rem] text-navy-400 sm:block">Live from the bell</span>
              </div>
              {/* open-day countdown card */}
              <div className="absolute -bottom-10 -left-3 w-[17rem] border-2 border-navy-900 bg-chalk-50 p-4 text-navy-900 shadow-[8px_8px_0_rgba(229,178,82,0.5)] sm:-left-8 sm:w-[19rem]">
                <p className="kicker text-gold-600">Next open morning</p>
                <p className="font-display mt-1.5 text-xl leading-tight font-bold">{fmtWeekday(openDay.date)} · {openDay.time.split(" – ")[0]}</p>
                <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
                  {([["Days", cd.d], ["Hrs", cd.h], ["Min", cd.m], ["Sec", cd.s]] as [string, number][]).map(([k, v]) => (
                    <div key={k} className="border border-navy-900/15 bg-navy-950 py-2">
                      <p className="font-display text-xl leading-none font-bold text-gold-300 tabular-nums">{String(v).padStart(2, "0")}</p>
                      <p className="mt-1 text-[0.55rem] font-bold tracking-[0.14em] text-navy-300 uppercase">{k}</p>
                    </div>
                  ))}
                </div>
                <Link to="/admissions" className="link-draw mt-3 inline-block text-[0.7rem] font-bold tracking-[0.14em] text-navy-800 uppercase">
                  Reserve a place →
                </Link>
              </div>
            </Reveal>
            <Stamp className="absolute -top-8 -right-4 hidden h-28 w-28 lg:block xl:-right-8" />
          </div>
        </div>
      </section>

      <QuickStrip />

      {/* ================= HEAD'S NOTE ================= */}
      <section className="relative overflow-hidden bg-chalk-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <FramedImage src={IMG.library} alt="The Ellison Library reading room" className="aspect-[4/3] border-2 border-navy-900 shadow-[10px_10px_0_rgba(12,35,64,0.12)]" />
            <p className="mt-3 text-[0.7rem] font-bold tracking-[0.16em] text-navy-500 uppercase">The Ellison Library — 24,000 volumes, one famous hush</p>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHead
              kicker="From the Head"
              title={["“We teach children,", "not syllabuses.”"]}
            />
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
                Visitors often ask what makes Ashgrove different. It isn't the organ, or the donkey tradition, or even the results —
                though we're proud of all three. It's that every adult here can tell you, unprompted, what your child is wondering about
                this week. That is the whole trick, and we've been practising it since 1912.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-7 flex items-center gap-4">
                <span className="grid h-13 w-13 shrink-0 place-items-center border-2 border-navy-900 bg-navy-900 p-3 font-display text-lg font-bold text-gold-300">ME</span>
                <div>
                  <p className="font-display text-lg font-bold text-navy-900">Dr. Margaret Ellison</p>
                  <p className="text-sm text-ink/60">Headmistress, Ashgrove Academy</p>
                </div>
              </div>
              <div className="mt-6">
                <ArrowLink to="/about">Read our whole story</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section className="border-y-2 border-navy-900 bg-gold-400">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-navy-900/20 lg:grid-cols-4">
          {([
            [1180, "", "Pupils, Reception to Sixth Form"],
            [years, "", "Years of the Grove"],
            [48, "", "Clubs, teams & societies"],
            [24000, "", "Library books (and counting)"],
          ] as [number, string, string][]).map(([n, s, label], i) => (
            <Reveal key={label} delay={i * 90} className="px-5 py-9 text-center sm:px-6">
              <p className="font-display text-4xl font-bold text-navy-950 tabular-nums sm:text-5xl">
                <CountUp to={n} suffix={s} />
              </p>
              <p className="mt-2 text-[0.7rem] font-bold tracking-[0.16em] text-navy-800 uppercase">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= DIVISIONS (sticky two-column) ================= */}
      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              kicker="The journey, 4–18"
              title={["Four schools,", "one grove"]}
              lede="Every pupil belongs to a school small enough to know them and a campus big enough to stretch them. Here's the map."
            />
            <Reveal delay={250}>
              <div className="mt-8">
                <ArrowLink to="/academics">Explore academics in full</ArrowLink>
              </div>
            </Reveal>
          </div>
          <div className="border-t-2 border-navy-900">
            {divisions.map((d, i) => (
              <Reveal key={d.id} delay={i * 80} className="group border-b-2 border-navy-900/15">
                <Link to="/academics" className="flex flex-col gap-4 py-7 transition-all duration-300 hover:bg-navy-950 hover:px-6 sm:flex-row sm:items-start sm:gap-8">
                  <span className="font-display text-4xl leading-none font-bold text-navy-300 transition-colors group-hover:text-gold-400 sm:text-5xl">{d.num}</span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-2xl font-bold text-navy-900 transition-colors group-hover:text-chalk-50 sm:text-3xl">{d.name}</span>
                      <span className="kicker !text-[0.6rem] text-gold-600 transition-colors group-hover:text-gold-300">{d.ages} · {d.years}</span>
                    </span>
                    <span className="mt-2 block max-w-xl text-[0.92rem] leading-relaxed text-ink/65 transition-colors group-hover:text-navy-200">{d.blurb}</span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {d.highlights.map((h) => (
                        <span key={h} className="inline-flex items-center gap-1.5 bg-navy-100 px-2.5 py-1 text-[0.66rem] font-bold tracking-wide text-navy-800 uppercase transition-colors group-hover:bg-navy-800 group-hover:text-navy-100">
                          <IcCheck className="h-3 w-3" /> {h}
                        </span>
                      ))}
                    </span>
                  </span>
                  <IcArrow className="mt-2 h-6 w-6 shrink-0 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-400" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAMPUS LIFE POSTCARDS ================= */}
      <section className="blueprint relative overflow-hidden bg-navy-950 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead tone="light" kicker="Beyond the bell" title={["Life in", "the Grove"]} />
            <Reveal delay={200}>
              <ArrowLink to="/gallery" tone="light">Browse the gallery</ArrowLink>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {[
              { src: IMG.sports, cap: "U14s, five minutes from glory", rot: "-rotate-3", y: "lg:translate-y-6" },
              { src: IMG.art, cap: "North studios, Thursday light", rot: "rotate-2", y: "lg:-translate-y-4" },
              { src: IMG.hall, cap: "203 voices, one standing ovation", rot: "-rotate-2", y: "lg:translate-y-3" },
              { src: IMG.library, cap: "The hush, 15:45", rot: "rotate-3", y: "lg:-translate-y-6" },
            ].map((p, i) => (
              <Reveal key={p.cap} delay={i * 110} className={p.y}>
                <Link to="/gallery" className={`group block border-[10px] border-chalk-50 bg-chalk-50 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] transition-all duration-500 ${p.rot} hover:rotate-0 hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.8)]`}>
                  <div className="overflow-hidden">
                    <img src={p.src} alt={p.cap} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="px-1 py-2.5 text-center font-display text-[0.82rem] font-semibold text-navy-900 italic">{p.cap}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWS & EVENTS ================= */}
      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-end justify-between gap-6">
              <SectionHead kicker="Latest from the Grove" title={["News worth", "pinning up"]} />
            </div>
            <div className="mt-8 divide-y divide-navy-900/10 border-y-2 border-navy-900">
              {latestNews.map((n, i) => (
                <Reveal key={n.id} delay={i * 70}>
                  <Link to="/news" className="group flex gap-5 py-5 transition-all duration-300 hover:bg-chalk-100 hover:px-4">
                    <DateBadge d={n.date} />
                    <span className="min-w-0 flex-1">
                      <Chip className="bg-navy-100 text-navy-800">{n.category}</Chip>
                      <span className="font-display mt-1.5 block text-xl leading-snug font-bold text-navy-900 transition-colors group-hover:text-gold-600">{n.title}</span>
                      <span className="mt-1 line-clamp-2 block text-[0.88rem] leading-relaxed text-ink/60">{n.excerpt}</span>
                    </span>
                    <IcArrow className="mt-6 h-5 w-5 shrink-0 text-navy-300 transition-all group-hover:translate-x-1 group-hover:text-gold-600" />
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div className="mt-6">
                <ArrowLink to="/news">All news & events</ArrowLink>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHead kicker="Save the dates" title={["Coming", "up"]} />
            <ul className="mt-8 space-y-3">
              {upcoming.map((e, i) => (
                <Reveal as="li" key={e.id} delay={i * 70}>
                  <Link to="/news" className="group flex items-center gap-4 border border-navy-900/15 bg-chalk-50 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-[6px_6px_0_rgba(12,35,64,0.12)]">
                    <DateBadge d={e.date} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[1.02rem] font-bold text-navy-900 transition-colors group-hover:text-gold-600">{e.title}</span>
                      <span className="text-[0.74rem] font-semibold tracking-wide text-navy-500 uppercase">{e.time} · {e.location}</span>
                    </span>
                    <span className={`kicker shrink-0 !text-[0.55rem] px-2 py-1 ${e.tag === "Open Day" ? "bg-gold-400 text-navy-950" : "bg-navy-100 text-navy-800"}`}>{e.tag}</span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={250}>
              <Link to="/news" className="btn btn-navy mt-7 w-full">
                Open the event calendar <IcArrow className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="blueprint relative overflow-hidden bg-navy-950 text-chalk-50">
        <IcLeaf className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-[26rem] text-navy-800/60" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <Kicker tone="light">Visits welcome every week</Kicker>
          </Reveal>
          <Lines
            as="h2"
            lines={[<>Come and see the Grove</>, <em key="y" className="font-display italic text-gold-300">for yourself.</em>]}
            className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl"
          />
          <Reveal delay={250}>
            <p className="mt-6 max-w-xl text-navy-200">
              Brochures are fine, but a Tuesday-morning tour with a Sixth Form guide tells you everything. Coffee's on us; questions encouraged.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-gold">Book a tour <IcArrow className="h-4 w-4" /></Link>
              <Link to="/admissions" className="btn btn-ghost-light">How admissions work</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
