import { useMemo, useState } from "react";
import { EVENTS, NEWS, NEWS_CATEGORIES, SchoolEvent } from "../lib/data";
import { agoLabel, daysUntil, downloadICS, fmtLong, fmtShort, fmtWeekday } from "../lib/hooks";
import { Reveal, SectionHead } from "../components/ui";
import { Calendar, EVENT_COLORS } from "../components/interactive";
import { IcCalendar, IcChevron, IcClock, IcPin, IcSearch } from "../components/icons";

export default function NewsEvents() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [openNews, setOpenNews] = useState<string | null>(null);
  const [eventModal, setEventModal] = useState<SchoolEvent | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return NEWS.filter(
      (n) =>
        (cat === "All" || n.category === cat) &&
        (!term || n.title.toLowerCase().includes(term) || n.excerpt.toLowerCase().includes(term) || n.body.toLowerCase().includes(term))
    );
  }, [cat, q]);

  const upcoming = EVENTS.filter((e) => daysUntil(e.date) >= 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 6);

  return (
    <>
      {/* header */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute right-[-140px] top-[-140px] w-[420px] h-[420px] rounded-full border-[30px] border-pine-900/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal><p className="kicker text-gold-300">News & events</p></Reveal>
          <Reveal delay={90}>
            <h1 className="mt-4 font-display font-extrabold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-[3.2rem]">
              The school diary, <span className="text-gold-300">wide open.</span>
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-pine-100/85">
              Every story we'd pin to the fridge, and every date worth circling. Tap any calendar day to see
              what's on, and add events straight to your own calendar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* news */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead kicker="Latest news" title={<>Stories from the quad.</>} />
          <Reveal delay={100}>
            <div className="flex items-center gap-3 rounded-full border border-pine-900/15 bg-white/70 pl-4 pr-1.5 py-1.5 focus-within:border-pine-600 transition-colors w-72 max-w-full">
              <IcSearch className="w-4 h-4 text-pine-600 shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search stories…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-pine-900/35 py-1.5"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-7 flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                  cat === c ? "bg-pine-900 text-gold-300" : "border border-pine-900/15 bg-white/60 text-pine-900 hover:border-pine-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="mt-14 text-center py-10">
            <p className="font-display font-bold text-2xl text-pine-950">No stories match “{q}”.</p>
            <p className="mt-2 text-ink-soft">Try another word, or clear the filters below.</p>
            <button
              onClick={() => { setQ(""); setCat("All"); }}
              className="mt-5 rounded-full bg-pine-900 text-chalk-50 px-6 py-2.5 text-sm font-bold hover:bg-pine-800 transition-colors"
            >
              Clear search & filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n, i) => {
              const open = openNews === n.id;
              return (
                <Reveal key={n.id} delay={(i % 3) * 80}>
                  <article className="group flex flex-col h-full rounded-2xl border border-pine-900/10 bg-white/70 overflow-hidden hover:shadow-card hover:-translate-y-0.5 transition-all">
                    <div className="img-zoom relative h-48">
                      <img src={n.img} alt="" className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 rounded-full bg-pine-950/85 backdrop-blur px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-gold-300">
                        {n.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[0.7rem] font-extrabold uppercase tracking-wider text-pine-800/60">{agoLabel(n.daysAgo)}</p>
                      <h3 className="mt-2 font-display font-bold text-lg leading-snug text-pine-950">{n.title}</h3>
                      <p className={`mt-2.5 text-sm text-ink-soft leading-relaxed ${open ? "" : "line-clamp-3"}`}>
                        {open ? n.body : n.excerpt}
                      </p>
                      <button
                        onClick={() => setOpenNews(open ? null : n.id)}
                        className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-bold text-pine-800 hover:text-gold-600 transition-colors self-start"
                      >
                        {open ? "Show less" : "Read more"}
                        <IcChevron className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* events + calendar */}
      <section className="relative bg-chalk-100 border-t border-pine-900/10">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <SectionHead
            kicker="Event calendar"
            title={<>Circle it before the kids do.</>}
            body="Concerts, fixtures, deadlines and open houses — pick a day on the calendar or scan the next six below. Every event downloads as a calendar file."
          />
          <div className="mt-12 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
            <Reveal>
              <Calendar onSelect={(e) => setEventModal(e)} />
            </Reveal>
            <div>
              <p className="kicker text-pine-600">Next up</p>
              <ul className="mt-5 space-y-4">
                {upcoming.map((e, i) => (
                  <Reveal key={e.id} delay={i * 70}>
                    <li className="group flex gap-4 rounded-xl border border-pine-900/10 bg-chalk-50 p-4 hover:border-pine-700 hover:shadow-card transition-all">
                      <span className="shrink-0 w-16 text-center rounded-lg bg-pine-900 text-chalk-50 py-2.5">
                        <span className="block font-display font-extrabold text-xl leading-none">{e.date.getDate()}</span>
                        <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-gold-300 mt-1">
                          {e.date.toLocaleString("en", { month: "short" })}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-[0.66rem] font-extrabold uppercase tracking-wider" style={{ color: EVENT_COLORS[e.type] }}>
                          <span className="w-2 h-2 rounded-full" style={{ background: EVENT_COLORS[e.type] }} /> {e.type}
                        </span>
                        <button onClick={() => setEventModal(e)} className="mt-1 block text-left font-display font-bold text-pine-950 hover:text-gold-600 transition-colors leading-snug">
                          {e.title}
                        </button>
                        <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
                          <span className="inline-flex items-center gap-1"><IcClock className="w-3 h-3" /> {e.time}</span>
                          <span className="inline-flex items-center gap-1"><IcPin className="w-3 h-3" /> {e.location}</span>
                        </span>
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* event detail modal */}
      {eventModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-pine-1000/70 backdrop-blur-[2px] cursor-default" onClick={() => setEventModal(null)} aria-label="Close event details" />
          <div className="relative w-full max-w-lg rounded-2xl bg-chalk-50 shadow-lift overflow-hidden reveal reveal-in">
            <div className="px-7 pt-7 pb-5 border-b border-pine-900/10" style={{ boxShadow: `inset 0 6px 0 ${EVENT_COLORS[eventModal.type]}` }}>
              <p className="text-[0.7rem] font-extrabold uppercase tracking-wider" style={{ color: EVENT_COLORS[eventModal.type] }}>
                {eventModal.type} · {fmtWeekday(eventModal.date)}, {fmtLong(eventModal.date)}
              </p>
              <h3 className="mt-2 font-display font-bold text-2xl text-pine-950 leading-tight">{eventModal.title}</h3>
            </div>
            <div className="px-7 py-6">
              <p className="text-ink-soft leading-relaxed">{eventModal.desc}</p>
              <div className="mt-5 space-y-2 text-sm font-medium text-pine-900">
                <p className="flex items-center gap-2.5"><IcClock className="w-4 h-4 text-gold-600" /> {eventModal.time}</p>
                <p className="flex items-center gap-2.5"><IcPin className="w-4 h-4 text-gold-600" /> {eventModal.location}, Aldercrest Academy</p>
                <p className="flex items-center gap-2.5"><IcCalendar className="w-4 h-4 text-gold-600" /> {fmtShort(eventModal.date)} · {daysUntil(eventModal.date) === 0 ? "today" : `in ${daysUntil(eventModal.date)} day${daysUntil(eventModal.date) === 1 ? "" : "s"}`}</p>
              </div>
              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => downloadICS(eventModal.title, eventModal.date, eventModal.time, eventModal.location, eventModal.desc)}
                  className="inline-flex items-center gap-2 rounded-full bg-pine-900 text-chalk-50 font-bold px-6 py-3 hover:bg-pine-800 transition-all active:scale-[0.97]"
                >
                  <IcCalendar className="w-4 h-4" /> Add to calendar
                </button>
                <button
                  onClick={() => setEventModal(null)}
                  className="rounded-full border border-pine-900/20 px-6 py-3 font-bold text-pine-900 hover:bg-pine-900 hover:text-chalk-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
