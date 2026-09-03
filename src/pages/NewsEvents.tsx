import { useMemo, useState } from "react";
import { EVENTS, EVENT_TYPE_COLORS, NEWS, NEWS_CATEGORIES, fmtDate } from "../lib/data";
import { Chip, Eyebrow, MaskHeading, PageHeader, Reveal } from "../components/ui";
import { CalendarIcon, ChevronLeft, ChevronRight, ClockIcon, PinIcon } from "../components/icons";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function NewsEvents() {
  const [cat, setCat] = useState("All");
  const today = new Date();
  const [monthOffset, setMonthOffset] = useState(0);
  const [selected, setSelected] = useState<Date>(today);

  const viewMonth = useMemo(() => {
    const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    return d;
  }, [monthOffset, today]);

  const cells = useMemo(() => {
    const first = new Date(viewMonth);
    const startPad = (first.getDay() + 6) % 7; // Monday first
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const list: (Date | null)[] = [];
    for (let i = 0; i < startPad; i++) list.push(null);
    for (let d = 1; d <= daysInMonth; d++) list.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [viewMonth]);

  const eventsFor = (d: Date) => EVENTS.filter((e) => sameDay(e.date, d));
  const dayEvents = eventsFor(selected);
  const upcoming = [...EVENTS].filter((e) => e.date >= new Date(today.getFullYear(), today.getMonth(), today.getDate())).sort((a, b) => a.date.getTime() - b.date.getTime());
  const filteredNews = NEWS.filter((n) => cat === "All" || n.category === cat).sort((a, b) => b.date.getTime() - a.date.getTime());

  const monthLabel = viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div>
      <PageHeader
        kicker="News & Events"
        title={[<>The term,</>, <><em className="font-light italic text-gold-300">as it happens.</em></>]}
        intro="Stories from classrooms and pitches, and a calendar that never quite empties. Tap any date with a dot to see what's on."
      />

      {/* calendar + upcoming */}
      <section className="paper-ruled">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Term calendar</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>One month,</>, <><em className="font-light italic text-gold-600">at a glance.</em></>]}
              className="mt-4 font-display text-3xl font-black leading-[1.05] text-navy-900 md:text-4xl"
            />
            <Reveal delay={150}>
              <div className="mt-8 border border-navy-900/15 bg-chalk-50 shadow-[0_18px_40px_-28px_rgba(7,26,48,0.45)]">
                <div className="flex items-center justify-between bg-navy-900 px-5 py-3.5 text-chalk-50">
                  <button
                    onClick={() => setMonthOffset((m) => m - 1)}
                    aria-label="Previous month"
                    className="grid h-8 w-8 place-items-center border border-chalk-50/25 transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="font-display text-xl font-bold">{monthLabel}</p>
                  <button
                    onClick={() => setMonthOffset((m) => m + 1)}
                    aria-label="Next month"
                    className="grid h-8 w-8 place-items-center border border-chalk-50/25 transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 border-b border-navy-900/10 bg-chalk-100 text-center">
                  {WEEKDAYS.map((w) => (
                    <span key={w} className="py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-navy-800/60">{w}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {cells.map((d, i) => {
                    if (!d) return <span key={`x-${i}`} className="min-h-[64px] border-b border-r border-navy-900/6 bg-chalk-100/60" />;
                    const evs = eventsFor(d);
                    const isToday = sameDay(d, today);
                    const isSelected = sameDay(d, selected);
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => setSelected(d)}
                        className={`cal-day relative flex min-h-[64px] flex-col items-start border-b border-r border-navy-900/6 p-1.5 text-left sm:p-2 ${
                          isSelected ? "bg-navy-900 text-chalk-50" : isToday ? "bg-gold-400/25" : ""
                        }`}
                        aria-label={`${fmtDate(d)}${evs.length ? ` — ${evs.length} event${evs.length > 1 ? "s" : ""}` : ""}`}
                      >
                        <span className={`text-sm font-bold tabular-nums ${isSelected ? "text-gold-300" : isToday ? "text-navy-900" : "text-navy-800/80"}`}>
                          {d.getDate()}
                        </span>
                        {isToday && <span className="text-[8px] font-extrabold uppercase tracking-widest text-gold-600">Today</span>}
                        {evs.length > 0 && (
                          <span className="mt-auto flex flex-wrap gap-1">
                            {evs.slice(0, 3).map((e) => (
                              <span key={e.id} className="h-2 w-2 rounded-full" style={{ background: EVENT_TYPE_COLORS[e.type] }} title={e.title} />
                            ))}
                            {evs.length > 3 && <span className={`text-[9px] font-black ${isSelected ? "text-navy-200" : "text-navy-800/60"}`}>+{evs.length - 3}</span>}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-navy-900/10 px-5 py-3">
                  {Object.entries(EVENT_TYPE_COLORS).map(([type, color]) => (
                    <span key={type} className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-navy-800/70">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /> {type}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* selected day / upcoming */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="lg:sticky lg:top-28">
                <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-600">
                  <CalendarIcon className="h-4 w-4" /> {fmtDate(selected, { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <div className="mt-4 min-h-[140px] space-y-3">
                  {dayEvents.length === 0 ? (
                    <div className="border border-dashed border-navy-900/25 bg-chalk-100 p-6">
                      <p className="font-display text-xl font-bold text-navy-900">A quiet day on the hill.</p>
                      <p className="mt-1 text-sm text-navy-800/70">No whole-school events — lessons, clubs and prep as usual.</p>
                    </div>
                  ) : (
                    dayEvents.map((e) => (
                      <article key={e.id} className="lift border border-navy-900/12 bg-chalk-50 p-5" style={{ borderLeft: `5px solid ${EVENT_TYPE_COLORS[e.type]}` }}>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em]" style={{ color: EVENT_TYPE_COLORS[e.type] }}>{e.type}</span>
                        <h3 className="mt-1 font-display text-xl font-bold leading-snug text-navy-900">{e.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-navy-800/80">{e.description}</p>
                        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-navy-800/60">
                          <span className="flex items-center gap-1.5"><ClockIcon className="h-3.5 w-3.5" /> {e.time}</span>
                          <span className="flex items-center gap-1.5"><PinIcon className="h-3.5 w-3.5" /> {e.location}</span>
                        </p>
                      </article>
                    ))
                  )}
                </div>

                <p className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.28em] text-navy-800/60">Next up</p>
                <ul className="mt-3 divide-y divide-navy-900/10 border-y border-navy-900/10">
                  {upcoming.slice(0, 5).map((e) => (
                    <li key={e.id}>
                      <button onClick={() => { setMonthOffset(0); setSelected(e.date); }} className="group flex w-full items-center gap-4 py-3 text-left">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-150" style={{ background: EVENT_TYPE_COLORS[e.type] }} />
                        <span className="flex-1">
                          <span className="block text-sm font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{e.title}</span>
                          <span className="text-xs font-semibold text-navy-800/60">{fmtDate(e.date)} · {e.time}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-navy-900/30 group-hover:text-gold-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* news */}
      <section className="border-t border-navy-900/10 bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>The Ashgrove Post</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>Recent</>, <><em className="font-light italic text-gold-600">dispatches.</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
              />
            </div>
          </div>
          <Reveal delay={100}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {NEWS_CATEGORIES.map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((n, i) => (
              <Reveal key={n.id} delay={(i % 3) * 100} className="h-full">
                <article className="lift group flex h-full flex-col overflow-hidden border border-navy-900/12 bg-chalk-50">
                  <div className="relative overflow-hidden">
                    <img src={n.image} alt="" className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                    <span className="absolute left-0 top-4 bg-navy-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-300">{n.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-800/55">{fmtDate(n.date)} · {n.author}</p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug text-navy-900 group-hover:text-gold-600 transition-colors">{n.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-800/75">{n.excerpt}</p>
                    <div className="acc-panel open mt-3">
                      <div><p className="border-t border-dashed border-navy-900/20 pt-3 text-sm leading-relaxed text-navy-800/85">{n.body}</p></div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
            {filteredNews.length === 0 && (
              <p className="col-span-full border border-dashed border-navy-900/25 p-8 text-center font-display text-xl font-bold text-navy-800">
                No stories under this heading yet — the term is young.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
