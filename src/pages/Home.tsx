import { Link } from "react-router-dom";
import {
  ANNOUNCEMENTS, EVENTS, HOUSES, IMAGES, NEWS, SCHOOL_STATS, STAGES,
  fmtDate, fmtDayMonth,
} from "../lib/data";
import { Eyebrow, GoldRule, MaskHeading, Reveal, StatBlock } from "../components/ui";
import { ArrowRight, BellIcon, CalendarIcon, ClockIcon, DoorIcon, PinIcon } from "../components/icons";

export default function Home() {
  const upcoming = [...EVENTS].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);
  const maxPoints = Math.max(...HOUSES.map((h) => h.points));
  const newsPreview = [...NEWS].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3);
  const openMorning = EVENTS.find((e) => e.type === "Open Day");

  return (
    <div className="paper-ruled">
      {/* ------------------------------------------------ masthead */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 hidden h-72 w-72 border-[26px] border-navy-900/[0.05] lg:block" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-10 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <Eyebrow>Independent day school · Ages 4–18</Eyebrow>
            </Reveal>
            <MaskHeading
              lines={[
                <>Where curious minds</>,
                <>
                  <em className="font-light italic text-gold-600">take the field.</em>
                </>,
              ]}
              className="mt-6 font-display text-[clamp(2.9rem,7vw,5.4rem)] font-black leading-[0.98] tracking-tight text-navy-900"
            />
            <Reveal delay={250}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy-800/85">
                For 112 years the bell on the hill has called children to something better than easy answers —
                to questions worth keeping. Come and hear what it's like inside.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/admissions" className="btn-navy bg-navy-900 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-chalk-50">
                  Book an Open Morning
                </Link>
                <Link to="/academics" className="link-slide text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
                  Explore academics →
                </Link>
              </div>
            </Reveal>

            {/* bell schedule card */}
            <Reveal delay={450}>
              <div className="mt-12 max-w-md border border-navy-900/15 bg-chalk-50 shadow-[0_18px_38px_-24px_rgba(7,26,48,0.4)]">
                <div className="flex items-center justify-between border-b border-navy-900/10 bg-navy-900 px-5 py-2.5 text-chalk-50">
                  <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em]">
                    <BellIcon className="h-4 w-4 bell-swing text-gold-400" /> The bell today
                  </span>
                  <span className="text-[11px] font-bold text-navy-200">{new Date().toLocaleDateString("en-GB", { weekday: "long" })}</span>
                </div>
                <ul className="divide-y divide-navy-900/8 text-sm">
                  {[
                    ["08:45", "First bell · registration", "Form rooms"],
                    ["11:05", "Break — tuck hatch opens", "Founders' Quad"],
                    ["13:15", "Chapel & societies", "The Chapel"],
                    ["16:00", "Last bell · clubs begin", "All houses"],
                  ].map(([t, what, where]) => (
                    <li key={t} className="flex items-baseline gap-4 px-5 py-2.5">
                      <span className="font-display text-lg font-black text-gold-600 tabular-nums">{t}</span>
                      <span className="font-bold text-navy-900">{what}</span>
                      <span className="ml-auto hidden text-xs font-semibold text-navy-800/60 sm:block">{where}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* image stack */}
          <div className="relative lg:col-span-6">
            <Reveal delay={150} className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border-2 border-gold-500/70" aria-hidden />
              <div className="relative overflow-hidden border-8 border-chalk-50 shadow-[0_30px_60px_-30px_rgba(7,26,48,0.5)]">
                <img src={IMAGES.hero} alt="Main House at Ashgrove Academy" className="kenburns h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-chalk-50">
                  Main House, first bell — Michaelmas
                </p>
              </div>

              {/* floating chips */}
              <div className="float-soft absolute -left-5 top-8 hidden border border-navy-900/10 bg-chalk-50 px-4 py-3 shadow-lg sm:block" style={{ "--rv-rot": "-3deg" } as React.CSSProperties}>
                <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-navy-800/70">
                  <ClockIcon className="h-4 w-4 text-gold-600" /> First bell
                </p>
                <p className="font-display text-2xl font-black text-navy-900">08:45 sharp</p>
              </div>

              {openMorning && (
                <div className="float-soft absolute -right-3 bottom-14 hidden max-w-[220px] bg-navy-900 px-4 py-3 text-chalk-50 shadow-xl md:block" style={{ "--rv-rot": "2.5deg", animationDelay: "1.2s" } as React.CSSProperties}>
                  <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-400">
                    <CalendarIcon className="h-4 w-4" /> Next Open Morning
                  </p>
                  <p className="mt-1 font-display text-lg font-bold leading-tight">{fmtDate(openMorning.date)}</p>
                  <Link to="/admissions" className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-gold-300 hover:text-gold-200">
                    Book a place <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              <div className="absolute -bottom-5 left-6 flex items-center gap-2 border border-navy-900/10 bg-chalk-50 px-4 py-2.5 shadow-lg" style={{ transform: "rotate(-2deg)" }}>
                {HOUSES.map((h) => (
                  <span key={h.name} title={`${h.name}: ${h.points} pts`} className="h-3.5 w-3.5 rounded-full border border-chalk-50" style={{ background: h.color }} />
                ))}
                <span className="ml-1 text-xs font-extrabold uppercase tracking-wider text-navy-800">House Shield race is on</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* stats band */}
        <div className="border-y border-gold-400/40 bg-navy-900 dark-weave">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4 md:px-8">
            {SCHOOL_STATS.map((s, i) => (
              <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 100} light />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ noticeboard */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Eyebrow>Pinned this morning</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>The noticeboard,</>, <><em className="font-light italic text-gold-600">before first bell.</em></>]}
              className="mt-4 font-display text-4xl md:text-5xl font-black leading-[1.02] text-navy-900"
            />
          </div>
          <Reveal delay={200}>
            <Link to="/news" className="link-slide text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
              All announcements →
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ANNOUNCEMENTS.slice(0, 6).map((a, i) => (
            <Reveal key={a.id} delay={i * 90} tilt={i % 2 === 0 ? -1.2 : 1.2} className="h-full">
              <article className="lift relative flex h-full flex-col border border-navy-900/12 bg-chalk-50 p-6 shadow-[0_14px_30px_-22px_rgba(7,26,48,0.5)]">
                <span className="absolute left-1/2 top-0 h-3 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-gold-400/80" aria-hidden />
                <div className="flex items-center justify-between gap-3">
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] ${a.tagColor}`}>{a.tag}</span>
                  {a.pinned && <span className="pulse-dot h-2 w-2 rounded-full bg-crimson-600" title="Pinned" />}
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-navy-900">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-800/75">{a.body}</p>
                <p className="mt-4 border-t border-dashed border-navy-900/20 pt-3 text-xs font-bold uppercase tracking-wider text-navy-800/60">
                  {a.date} · School office
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ stages */}
      <section className="border-y border-navy-900/10 bg-navy-950 dark-weave text-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal><Eyebrow tone="light">Three stages, one hill</Eyebrow></Reveal>
                <MaskHeading
                  lines={[<>From first day</>, <><em className="font-light italic text-gold-300">to last bell.</em></>]}
                  className="mt-4 font-display text-4xl font-black leading-[1.04] md:text-5xl"
                />
                <Reveal delay={200}>
                  <p className="mt-5 max-w-sm text-navy-100/90 leading-relaxed">
                    Children arrive at four knowing the names of the trees, and leave at eighteen with a place
                    worth going to. The path between is deliberately broad.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <Link to="/academics" className="btn-gold mt-8 inline-block bg-gold-400 px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
                    The full curriculum
                  </Link>
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-8">
              {STAGES.map((s, i) => (
                <Reveal key={s.id} delay={i * 120}>
                  <Link
                    to="/academics"
                    className="group mb-5 flex items-center gap-6 border border-chalk-50/12 bg-navy-900/60 p-5 transition-all duration-300 hover:border-gold-400/60 hover:bg-navy-800 md:p-6"
                  >
                    <span className="font-display text-4xl font-black text-chalk-50/15 transition-colors duration-300 group-hover:text-gold-400 md:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <img src={s.image} alt="" className="hidden h-24 w-32 shrink-0 object-cover md:block" loading="lazy" />
                    <span className="flex-1">
                      <span className="block font-display text-2xl font-bold group-hover:text-gold-300 transition-colors md:text-3xl">{s.name}</span>
                      <span className="mt-1 block text-sm text-navy-100/80">{s.ages} · {s.years}</span>
                      <span className="mt-2 hidden text-sm leading-relaxed text-navy-100/60 lg:block">{s.summary.slice(0, 120)}…</span>
                    </span>
                    <ArrowRight className="h-6 w-6 shrink-0 text-gold-400 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ houses */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal><Eyebrow>The House Shield</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>Four houses,</>, <><em className="font-light italic text-gold-600">one shield.</em></>]}
              className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
            />
            <Reveal delay={200}>
              <p className="mt-5 max-w-md leading-relaxed text-navy-800/85">
                Every pupil, from Reception to Year 13, wears a house colour. Points come from everything —
                cross-country and chess, bake sales and physics olympiads. The shield is awarded at the last
                assembly of the year, and the losing house always demands a recount.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {HOUSES.map((h) => (
                  <div key={h.name} className="lift border border-navy-900/12 bg-chalk-50 p-4">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-chalk-50" style={{ background: h.color }}>
                      {h.emblem}
                    </span>
                    <p className="mt-2 font-display text-lg font-bold text-navy-900">{h.name}</p>
                    <p className="text-xs font-semibold italic text-navy-800/60">“{h.motto}”</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="border border-navy-900/12 bg-navy-900 p-7 text-chalk-50 shadow-[0_24px_50px_-30px_rgba(7,26,48,0.6)] md:p-9">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-gold-400">Michaelmas standings</p>
                  <span className="pulse-dot h-2 w-2 rounded-full bg-gold-400" />
                </div>
                <ul className="mt-7 space-y-6">
                  {[...HOUSES].sort((a, b) => b.points - a.points).map((h, i) => (
                    <li key={h.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="flex items-center gap-2.5 font-display text-lg font-bold">
                          <span className="text-sm font-black text-navy-200/60">{i + 1}</span> {h.name}
                        </span>
                        <span className="font-display text-xl font-black tabular-nums" style={{ color: i === 0 ? "#eec570" : undefined }}>
                          {h.points.toLocaleString("en-GB")}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 w-full bg-navy-800">
                        <div
                          className="house-bar h-full"
                          style={{ width: `${(h.points / maxPoints) * 100}%`, background: h.color === "#b98426" ? "#e5b252" : h.color, ["--rv-delay" as string]: `${i * 130}ms` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-chalk-50/10 pt-4 text-xs font-semibold text-navy-200">
                  Points updated after every fixture, concert and charity total. 76 points cover the whole field.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ events */}
      <section className="border-y border-navy-900/10 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>Diary</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>What's on,</>, <><em className="font-light italic text-gold-600">week by week.</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
              />
            </div>
            <Reveal delay={200}>
              <Link to="/news" className="link-slide text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
                Full calendar →
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 overflow-hidden border border-navy-900/12 bg-chalk-50">
            {upcoming.map((ev, i) => {
              const dm = fmtDayMonth(ev.date);
              return (
                <Reveal key={ev.id} delay={i * 80}>
                  <Link to="/news" className="group flex items-center gap-5 border-b border-navy-900/10 px-5 py-4 transition-colors last:border-0 hover:bg-navy-900 hover:text-chalk-50 md:gap-8 md:px-8">
                    <span className="grid w-16 shrink-0 place-items-center border-2 border-gold-500/70 bg-chalk-50 py-1.5 text-navy-900">
                      <span className="font-display text-2xl font-black leading-none tabular-nums">{dm.day}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-600">{dm.month}</span>
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-bold leading-snug group-hover:text-gold-300 transition-colors md:text-xl">{ev.title}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-navy-800/60 group-hover:text-navy-100 transition-colors">
                        <span className="flex items-center gap-1.5"><ClockIcon className="h-3.5 w-3.5" /> {ev.time}</span>
                        <span className="flex items-center gap-1.5"><PinIcon className="h-3.5 w-3.5" /> {ev.location}</span>
                      </span>
                    </span>
                    <span className="hidden shrink-0 border border-navy-900/25 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-navy-800 group-hover:border-gold-400 group-hover:text-gold-300 md:block">
                      {ev.type}
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-gold-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ campus collage */}
      <section className="relative overflow-hidden mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative h-[440px] sm:h-[520px]">
            {[
              { src: IMAGES.science, cls: "left-0 top-4 w-[58%] z-10", rot: -4, cap: "Whitaker Wing labs" },
              { src: IMAGES.sports, cls: "right-0 top-0 w-[52%]", rot: 3, cap: "Upper Pitch, October" },
              { src: IMAGES.music, cls: "left-[12%] bottom-0 w-[56%] z-20", rot: 2, cap: "Chapel Orchestra" },
              { src: IMAGES.arts, cls: "right-2 bottom-6 w-[44%]", rot: -3, cap: "North Studio" },
            ].map((img, i) => (
              <Reveal key={img.cap} delay={i * 130} tilt={img.rot} className={`absolute ${img.cls}`}>
                <figure className="lift border-8 border-chalk-50 bg-chalk-50 shadow-[0_24px_48px_-26px_rgba(7,26,48,0.55)]">
                  <img src={img.src} alt={img.cap} className="h-44 w-full object-cover sm:h-52" loading="lazy" />
                  <figcaption className="px-2 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-navy-800/70">{img.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div>
            <Reveal><Eyebrow>Campus life</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>Loud labs, muddy boots,</>, <><em className="font-light italic text-gold-600">quiet library.</em></>]}
              className="mt-4 font-display text-4xl font-black leading-[1.05] text-navy-900 md:text-5xl"
            />
            <Reveal delay={200}>
              <p className="mt-5 max-w-md leading-relaxed text-navy-800/85">
                Forty acres above the Vale: eight science labs, two studios, a chapel that holds the whole
                school (just), and pitches that turn gloriously, reliably to mud by November.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <ul className="mt-7 space-y-3">
                {["31 clubs, from astronomy to debating", "Every child performs, plays or exhibits each year", "Forest school and expedition week built in", "Supervised prep and tea until 18:00"].map((li) => (
                  <li key={li} className="flex items-start gap-3 font-semibold text-navy-900">
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold-500" /> {li}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={400}>
              <Link to="/gallery" className="btn-navy mt-9 inline-block bg-navy-900 px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-chalk-50">
                Browse the gallery
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ news preview */}
      <section className="border-t border-navy-900/10 bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>The Ashgrove Post</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>Fresh from</>, <><em className="font-light italic text-gold-600">the hill.</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
              />
            </div>
            <Reveal delay={200}>
              <Link to="/news" className="link-slide text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
                All stories →
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <Reveal className="h-full">
              <Link to="/news" className="group block h-full">
                <div className="overflow-hidden border border-navy-900/12">
                  <img src={newsPreview[0].image} alt="" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] md:h-96" loading="lazy" />
                </div>
                <p className="mt-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em]">
                  <span className="bg-navy-900 px-2.5 py-1 text-chalk-50">{newsPreview[0].category}</span>
                  <span className="text-navy-800/60">{fmtDate(newsPreview[0].date)}</span>
                </p>
                <h3 className="mt-3 font-display text-2xl font-black leading-tight text-navy-900 group-hover:text-gold-600 transition-colors md:text-3xl">
                  {newsPreview[0].title}
                </h3>
                <p className="mt-3 max-w-lg leading-relaxed text-navy-800/80">{newsPreview[0].excerpt}</p>
              </Link>
            </Reveal>
            <div className="flex flex-col gap-8">
              {newsPreview.slice(1).map((n, i) => (
                <Reveal key={n.id} delay={150 + i * 120}>
                  <Link to="/news" className="group flex gap-5 border-b border-navy-900/10 pb-8 last:border-0">
                    <img src={n.image} alt="" className="h-24 w-28 shrink-0 border border-navy-900/10 object-cover md:h-28 md:w-36" loading="lazy" />
                    <span>
                      <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold-600">{n.category} · {fmtDate(n.date)}</span>
                      <span className="mt-1.5 block font-display text-xl font-bold leading-snug text-navy-900 group-hover:text-gold-600 transition-colors">
                        {n.title}
                      </span>
                      <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-navy-800/70">{n.excerpt}</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
              <Reveal delay={400}>
                <div className="flex items-center gap-4 border border-dashed border-navy-900/25 bg-chalk-100 px-5 py-4">
                  <DoorIcon className="h-7 w-7 shrink-0 text-gold-600" />
                  <p className="text-sm font-semibold text-navy-800">
                    Prefer to see it for yourself? <Link to="/contact" className="link-slide font-extrabold text-navy-900">Book a private tour</Link> — pupils do the talking.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ CTA band */}
      <section className="relative overflow-hidden bg-navy-900 dark-weave text-chalk-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_auto] md:px-8">
          <div>
            <Reveal><Eyebrow tone="light">Admissions 2026</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>The kettle's on.</>, <><em className="font-light italic text-gold-300">Come up the hill.</em></>]}
              className="mt-4 font-display text-4xl font-black leading-[1.04] md:text-5xl"
            />
          </div>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-gold bg-gold-400 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
                Send an enquiry
              </Link>
              <Link to="/admissions" className="border-2 border-chalk-50/40 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-chalk-50 transition-all duration-300 hover:border-gold-400 hover:text-gold-300">
                Fees & key dates
              </Link>
            </div>
          </Reveal>
        </div>
        <GoldRule className="relative mx-auto max-w-7xl px-5 pb-8 md:px-8" />
      </section>
    </div>
  );
}
