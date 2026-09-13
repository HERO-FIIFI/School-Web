import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EVENTS, NEWS, NEWS_CATEGORIES, SchoolEvent } from "../lib/data";
import { agoLabel, daysUntil, downloadICS, fmtLong, fmtShort, fmtWeekday } from "../lib/hooks";
import { Reveal } from "../components/ui";
import { Calendar, EVENT_COLORS } from "../components/interactive";
import {
  IcArrow,
  IcBell,
  IcCalendar,
  IcCheck,
  IcChevron,
  IcClock,
  IcCopy,
  IcExternal,
  IcFire,
  IcGrid,
  IcHome,
  IcList,
  IcMail,
  IcPin,
  IcSearch,
  IcSend,
  IcShare,
  IcSparkle,
  IcUser,
} from "../components/icons";

export default function NewsEvents() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [openNews, setOpenNews] = useState<string | null>(null);
  const [eventModal, setEventModal] = useState<SchoolEvent | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [eventType, setEventType] = useState<"All" | SchoolEvent["type"]>("All");
  const [newsLimit, setNewsLimit] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<"idle" | "done">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let items = rest.filter(
      (n) =>
        (cat === "All" || n.category === cat) &&
        (!term || n.title.toLowerCase().includes(term) || n.excerpt.toLowerCase().includes(term) || n.body.toLowerCase().includes(term))
    );
    if (sort === "oldest") items = [...items].reverse();
    return items;
  }, [cat, q, sort]);

  const visibleNews = filtered.slice(0, newsLimit);

  const todayEvent = EVENTS.find((e) => daysUntil(e.date) === 0);
  const upcoming = EVENTS.filter((e) => daysUntil(e.date) >= 0 && (eventType === "All" || e.type === eventType))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 8);

  const eventsByMonth = useMemo(() => {
    const grouped: Record<string, SchoolEvent[]> = {};
    const filtered = EVENTS.filter((e) => daysUntil(e.date) >= 0 && (eventType === "All" || e.type === eventType))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    filtered.forEach((e) => {
      const key = `${e.date.getFullYear()}-${e.date.getMonth()}`;
      const label = e.date.toLocaleString("en", { month: "long", year: "numeric" });
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(e);
    });
    return Object.entries(grouped).map(([key, events]) => ({
      key,
      label: events[0].date.toLocaleString("en", { month: "long", year: "numeric" }),
      events,
    }));
  }, [eventType]);

  const copyLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#news-${id}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const subscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterState("done");
      setNewsletterEmail("");
    }
  };

  const relatedEvents = (category: string) => {
    const typeMap: Record<string, SchoolEvent["type"]> = {
      STEM: "Academics",
      Academics: "Academics",
      Arts: "Arts",
      Sport: "Sport",
      Community: "Community",
      Campus: "Community",
    };
    return EVENTS.filter((e) => e.type === typeMap[category] && daysUntil(e.date) >= 0)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 2);
  };

  return (
    <>
      {/* breadcrumb */}
      <div className="bg-pine-950 text-pine-100/60 border-b border-pine-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs font-semibold">
          <Link to="/" className="hover:text-gold-300 transition-colors flex items-center gap-1.5">
            <IcHome className="w-3.5 h-3.5" /> Home
          </Link>
          <IcChevron className="w-3 h-3 rotate-[-90deg]" />
          <span className="text-gold-300">News & Events</span>
        </div>
      </div>

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
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <span className="flex items-center gap-2 text-pine-100/70">
                <IcSparkle className="w-4 h-4 text-gold-300" />
                <strong className="text-chalk-50">{NEWS.length}</strong> stories
              </span>
              <span className="flex items-center gap-2 text-pine-100/70">
                <IcCalendar className="w-4 h-4 text-gold-300" />
                <strong className="text-chalk-50">{EVENTS.filter((e) => daysUntil(e.date) >= 0).length}</strong> upcoming events
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TODAY HIGHLIGHT */}
      {todayEvent && (
        <section className="bg-gold-300 border-b border-gold-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-pine-900 text-gold-300 grid place-items-center shrink-0">
                <IcFire className="w-5 h-5" />
              </span>
              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-wider text-pine-900">Happening today</p>
                <p className="font-display font-bold text-pine-950">{todayEvent.title}</p>
                <p className="text-xs text-pine-900/70">
                  {todayEvent.time} · {todayEvent.location}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEventModal(todayEvent)}
              className="rounded-full bg-pine-900 text-chalk-50 px-5 py-2.5 text-sm font-bold hover:bg-pine-800 transition-colors"
            >
              View details
            </button>
          </div>
        </section>
      )}

      {/* FEATURED STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <Reveal>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 rounded-2xl border border-pine-900/10 bg-white/70 overflow-hidden shadow-card hover:shadow-lift transition-shadow">
            <div className="img-zoom relative h-64 sm:h-80 lg:h-full min-h-[320px]">
              <img src={featured.img} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute top-4 left-4 rounded-full bg-pine-950/90 backdrop-blur px-3.5 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
                <IcSparkle className="w-3 h-3" /> Featured
              </span>
            </div>
            <div className="p-7 sm:p-9 flex flex-col">
              <p className="flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-wider">
                <span className="rounded-full bg-gold-400 text-pine-950 px-2.5 py-0.5">{featured.category}</span>
                <span className="text-pine-800/60">{agoLabel(featured.daysAgo)}</span>
              </p>
              <h2 className="mt-3 font-display font-bold text-2xl sm:text-[1.8rem] leading-tight tracking-tight text-pine-950">
                {featured.title}
              </h2>
              <p className="mt-3 text-ink-soft leading-relaxed">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <IcUser className="w-3.5 h-3.5" /> {featured.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <IcClock className="w-3.5 h-3.5" /> {featured.readMin} min read
                </span>
              </div>
              <button
                onClick={() => setOpenNews(openNews === featured.id ? null : featured.id)}
                className="mt-auto pt-6 inline-flex items-center gap-2 font-bold text-pine-800 hover:text-gold-600 transition-colors self-start group"
              >
                {openNews === featured.id ? "Show less" : "Read the full story"}
                <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              {openNews === featured.id && (
                <div className="mt-5 pt-5 border-t border-pine-900/10">
                  <p className="text-ink-soft leading-relaxed">{featured.body}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs font-bold text-pine-800">Share:</span>
                    <button onClick={() => copyLink(featured.id)} className="rounded-full border border-pine-900/15 p-2 hover:bg-pine-50 transition-colors" title="Copy link">
                      {copied === featured.id ? <IcCheck className="w-4 h-4 text-moss-600" /> : <IcCopy className="w-4 h-4 text-pine-800" />}
                    </button>
                    <button className="rounded-full border border-pine-900/15 p-2 hover:bg-pine-50 transition-colors" title="Share">
                      <IcShare className="w-4 h-4 text-pine-800" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="kicker text-pine-600">Latest stories</p>
            <h2 className="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-pine-950">
              More from the quad
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-pine-900/15 bg-white/70 pl-4 pr-1.5 py-1.5 focus-within:border-pine-600 transition-colors w-64 max-w-full">
                <IcSearch className="w-4 h-4 text-pine-600 shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search stories…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-pine-900/35 py-1.5"
                />
              </div>
              <div className="flex rounded-full border border-pine-900/15 bg-white/70 overflow-hidden">
                <button
                  onClick={() => setSort("newest")}
                  className={`px-4 py-2 text-xs font-bold transition-colors ${sort === "newest" ? "bg-pine-900 text-gold-300" : "text-pine-800 hover:bg-pine-50"}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSort("oldest")}
                  className={`px-4 py-2 text-xs font-bold transition-colors ${sort === "oldest" ? "bg-pine-900 text-gold-300" : "text-pine-800 hover:bg-pine-50"}`}
                >
                  Oldest
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap gap-2">
            {NEWS_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                  cat === c ? "bg-pine-900 text-gold-300" : "border border-pine-900/15 bg-white/60 text-pine-900 hover:border-pine-700"
                }`}
              >
                {c}
                <span className={`ml-1.5 text-xs ${cat === c ? "text-gold-300/70" : "text-pine-900/40"}`}>
                  {c === "All" ? rest.length : rest.filter((n) => n.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {visibleNews.length === 0 ? (
          <div className="mt-14 text-center py-10">
            <p className="font-display font-bold text-2xl text-pine-950">No stories match "{q}".</p>
            <p className="mt-2 text-ink-soft">Try another word, or clear the filters below.</p>
            <button
              onClick={() => { setQ(""); setCat("All"); }}
              className="mt-5 rounded-full bg-pine-900 text-chalk-50 px-6 py-2.5 text-sm font-bold hover:bg-pine-800 transition-colors"
            >
              Clear search & filters
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleNews.map((n, i) => {
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
                        <div className="flex items-center gap-3 text-[0.68rem] text-ink-soft">
                          <span className="flex items-center gap-1">
                            <IcUser className="w-3 h-3" /> {n.author}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <IcClock className="w-3 h-3" /> {n.readMin} min
                          </span>
                          <span>·</span>
                          <span>{agoLabel(n.daysAgo)}</span>
                        </div>
                        <h3 className="mt-2.5 font-display font-bold text-lg leading-snug text-pine-950">{n.title}</h3>
                        <p className={`mt-2 text-sm text-ink-soft leading-relaxed ${open ? "" : "line-clamp-3"}`}>
                          {open ? n.body : n.excerpt}
                        </p>
                        {open && (
                          <div className="mt-4 pt-4 border-t border-pine-900/10">
                            <div className="flex items-center gap-2">
                              <button onClick={() => copyLink(n.id)} className="rounded-full border border-pine-900/15 p-1.5 hover:bg-pine-50 transition-colors" title="Copy link">
                                {copied === n.id ? <IcCheck className="w-3.5 h-3.5 text-moss-600" /> : <IcCopy className="w-3.5 h-3.5 text-pine-800" />}
                              </button>
                              <button className="rounded-full border border-pine-900/15 p-1.5 hover:bg-pine-50 transition-colors" title="Share">
                                <IcShare className="w-3.5 h-3.5 text-pine-800" />
                              </button>
                              {relatedEvents(n.category).length > 0 && (
                                <span className="ml-auto text-xs text-ink-soft">
                                  {relatedEvents(n.category).length} related event{relatedEvents(n.category).length > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
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
            {filtered.length > newsLimit && (
              <Reveal delay={200}>
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setNewsLimit((l) => l + 3)}
                    className="rounded-full border border-pine-900/20 px-7 py-3 text-sm font-bold text-pine-900 hover:bg-pine-900 hover:text-chalk-50 transition-colors"
                  >
                    Load more stories ({filtered.length - newsLimit} remaining)
                  </button>
                </div>
              </Reveal>
            )}
          </>
        )}
      </section>

      {/* NEWSLETTER CTA */}
      <section className="relative bg-pine-900 text-chalk-50 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <Reveal>
            <IcMail className="w-10 h-10 text-gold-300 mx-auto" />
            <h3 className="mt-5 font-display font-bold text-2xl sm:text-3xl">The Aldercrest Letter</h3>
            <p className="mt-3 text-pine-100/80 max-w-md mx-auto">
              One email a fortnight: news, fixtures, concert dates and the occasional bee update. No noise.
            </p>
            {newsletterState === "done" ? (
              <p className="mt-6 rounded-full bg-gold-400 text-pine-950 inline-block px-6 py-3 font-bold">
                Welcome aboard — first letter arrives Friday.
              </p>
            ) : (
              <form onSubmit={subscribeNewsletter} className="mt-6 flex flex-wrap gap-3 justify-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-full bg-pine-950 border border-pine-700 px-5 py-3 text-sm text-chalk-50 placeholder:text-pine-300/50 outline-none focus:border-gold-400 transition-colors w-72 max-w-full"
                />
                <button type="submit" className="rounded-full bg-gold-400 text-pine-950 font-bold px-6 py-3 hover:bg-gold-300 transition-colors flex items-center gap-2">
                  Subscribe <IcSend className="w-4 h-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* EVENTS */}
      <section className="relative bg-chalk-100 border-t border-pine-900/10">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="kicker text-pine-600">Event calendar</p>
              <h2 className="mt-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-pine-950">
                Circle it before the kids do
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex items-center gap-3">
                <div className="flex rounded-full border border-pine-900/15 bg-white/70 overflow-hidden">
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-4 py-2 text-xs font-bold transition-colors flex items-center gap-1.5 ${viewMode === "calendar" ? "bg-pine-900 text-gold-300" : "text-pine-800 hover:bg-pine-50"}`}
                  >
                    <IcGrid className="w-3.5 h-3.5" /> Calendar
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 text-xs font-bold transition-colors flex items-center gap-1.5 ${viewMode === "list" ? "bg-pine-900 text-gold-300" : "text-pine-800 hover:bg-pine-50"}`}
                  >
                    <IcList className="w-3.5 h-3.5" /> List
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="mt-6 flex flex-wrap gap-2">
              {(["All", "Academics", "Arts", "Sport", "Community", "Admissions"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setEventType(t)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                    eventType === t ? "bg-pine-900 text-gold-300" : "border border-pine-900/15 bg-white/60 text-pine-900 hover:border-pine-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          {viewMode === "calendar" ? (
            <div className="mt-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
              <Reveal>
                <Calendar onSelect={(e) => setEventModal(e)} events={EVENTS.filter((e) => eventType === "All" || e.type === eventType)} />
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
          ) : (
            <div className="mt-10 space-y-10">
              {eventsByMonth.length === 0 ? (
                <p className="text-center py-10 text-ink-soft">No upcoming events match this filter.</p>
              ) : (
                eventsByMonth.map((month, mi) => (
                  <Reveal key={month.key} delay={mi * 80}>
                    <div>
                      <h3 className="font-display font-bold text-xl text-pine-950 mb-4 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-gold-400" />
                        {month.label}
                      </h3>
                      <div className="space-y-3">
                        {month.events.map((e) => (
                          <button
                            key={e.id}
                            onClick={() => setEventModal(e)}
                            className="w-full text-left group flex items-center gap-5 rounded-xl border border-pine-900/10 bg-white/70 px-5 py-4 hover:border-pine-700 hover:shadow-card transition-all"
                          >
                            <span className="shrink-0 w-14 text-center">
                              <span className="block font-display font-extrabold text-2xl text-pine-900 leading-none">{e.date.getDate()}</span>
                              <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-pine-800/60 mt-1">
                                {e.date.toLocaleString("en", { weekday: "short" })}
                              </span>
                            </span>
                            <span className="w-1.5 h-10 rounded-full shrink-0" style={{ background: EVENT_COLORS[e.type] }} />
                            <span className="min-w-0 flex-1">
                              <span className="block text-[0.66rem] font-extrabold uppercase tracking-wider" style={{ color: EVENT_COLORS[e.type] }}>
                                {e.type}
                              </span>
                              <span className="block font-display font-bold text-pine-950 group-hover:text-gold-600 transition-colors leading-snug mt-0.5">
                                {e.title}
                              </span>
                              <span className="block text-xs text-ink-soft mt-1">
                                {e.time} · {e.location}
                              </span>
                            </span>
                            <span className="shrink-0 text-xs font-bold rounded-full px-3 py-1.5 bg-pine-50 text-pine-800">
                              {daysUntil(e.date) === 0 ? "Today" : daysUntil(e.date) === 1 ? "Tomorrow" : `In ${daysUntil(e.date)}d`}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))
              )}
            </div>
          )}
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
              <div className="mt-6 pt-6 border-t border-pine-900/10">
                <p className="text-xs font-bold text-pine-800 mb-3">Related events</p>
                <div className="space-y-2">
                  {EVENTS.filter((e) => e.type === eventModal.type && e.id !== eventModal.id && daysUntil(e.date) >= 0)
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 2)
                    .map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setEventModal(e)}
                        className="w-full text-left flex items-center gap-3 rounded-lg border border-pine-900/10 px-3 py-2 hover:bg-pine-50 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: EVENT_COLORS[e.type] }} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-bold text-pine-950 truncate">{e.title}</span>
                          <span className="block text-[0.65rem] text-ink-soft">{fmtShort(e.date)} · {e.time}</span>
                        </span>
                        <IcExternal className="w-3.5 h-3.5 text-pine-800/40 shrink-0" />
                      </button>
                    ))}
                </div>
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
