import { useEffect, useMemo, useState } from "react";
import { EventCalendar } from "../components/interactive";
import { Chip, PageHero, Reveal, SectionHead } from "../components/ui";
import { IcCalendar, IcClose, IcClock, IcPin } from "../components/icons";
import { events, fmt, newsItems, type NewsCategory, type NewsItem } from "../lib/data";

const categories: ("All" | NewsCategory)[] = ["All", "School Life", "Academics", "Sport", "Arts", "Community"];

export default function NewsEvents() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [reading, setReading] = useState<NewsItem | null>(null);

  const filtered = useMemo(
    () => [...newsItems].filter((n) => cat === "All" || n.category === cat).sort((a, b) => b.date.getTime() - a.date.getTime()),
    [cat]
  );
  const [featured, ...rest] = filtered;

  useEffect(() => {
    if (!reading) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setReading(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [reading]);

  return (
    <>
      <PageHero
        kicker="News & Events"
        title={[<>What's happening</>, <em key="i" className="font-display italic text-gold-300">in the Grove</em>]}
        lede="Match reports, concert programmes, mycelium breakthroughs and the occasional escaped chicken. Filter the news below, or scroll to the full interactive calendar."
      />

      {/* ============ NEWS ============ */}
      <section className="bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead kicker="The Grove Gazette" title={["Latest", "stories"]} />
            <Reveal delay={150}>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`cursor-pointer border px-3.5 py-2 text-[0.7rem] font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                      cat === c
                        ? "border-navy-900 bg-navy-900 text-gold-300 shadow-[4px_4px_0_rgba(217,161,59,0.6)]"
                        : "border-navy-900/25 bg-chalk-50 text-navy-700 hover:border-navy-900 hover:bg-chalk-100"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {featured && (
            <Reveal key={`${cat}-feat`} className="mt-10">
              <button
                onClick={() => setReading(featured)}
                className="group grid w-full cursor-pointer overflow-hidden border-2 border-navy-900 bg-navy-950 text-left shadow-[10px_10px_0_rgba(12,35,64,0.14)] transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-2"
              >
                <div className="relative overflow-hidden">
                  <img src={featured.image} alt="" className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-gold-400 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.16em] text-navy-950 uppercase">Lead story</span>
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <Chip className="bg-gold-400 text-navy-950">{featured.category}</Chip>
                    <span className="text-xs font-semibold tracking-wide text-navy-300 uppercase">{fmt(featured.date)}</span>
                  </div>
                  <h3 className="font-display mt-4 text-2xl leading-tight font-bold text-chalk-50 transition-colors group-hover:text-gold-300 sm:text-4xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-navy-200">{featured.excerpt}</p>
                  <span className="link-draw mt-6 w-fit text-[0.72rem] font-bold tracking-[0.16em] text-gold-300 uppercase">Read the full story →</span>
                </div>
              </button>
            </Reveal>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((n, i) => (
              <Reveal as="article" key={n.id} delay={(i % 3) * 80}>
                <button
                  onClick={() => setReading(n)}
                  className="group flex h-full w-full cursor-pointer flex-col border-2 border-navy-900/15 bg-chalk-50 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900 hover:shadow-[8px_8px_0_rgba(12,35,64,0.14)]"
                >
                  <div className="overflow-hidden">
                    <img src={n.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <Chip className="bg-navy-100 text-navy-800">{n.category}</Chip>
                      <span className="text-[0.68rem] font-bold tracking-wide text-navy-500 uppercase">{fmt(n.date, { day: "numeric", month: "short" })}</span>
                    </div>
                    <h3 className="font-display mt-3 text-xl leading-snug font-bold text-navy-900 transition-colors group-hover:text-gold-600">{n.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-[0.88rem] leading-relaxed text-ink/60">{n.excerpt}</p>
                    <span className="link-draw mt-4 w-fit text-[0.68rem] font-bold tracking-[0.16em] text-navy-800 uppercase">Read more →</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CALENDAR ============ */}
      <section className="border-t-2 border-navy-900 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHead
            kicker="Diaries out"
            title={["The term's", "event calendar"]}
            lede="Everything from county semi-finals to the Open Morning. Select any date to see the day's programme."
          />
          <div className="mt-12">
            <EventCalendar events={events} />
          </div>
        </div>
      </section>

      {/* ============ reading modal ============ */}
      {reading && (
        <div className="fixed inset-0 z-[85] flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14" role="dialog" aria-modal="true" aria-label={reading.title}>
          <button aria-label="Close story" className="fixed inset-0 bg-navy-950/85 backdrop-blur-[2px]" onClick={() => setReading(null)} />
          <div className="rise relative w-full max-w-3xl border-2 border-navy-900 bg-chalk-50 shadow-2xl">
            <div className="relative">
              <img src={reading.image} alt="" className="aspect-[16/8] w-full object-cover" />
              <button
                onClick={() => setReading(null)}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center bg-navy-950 text-chalk-50 transition-colors hover:bg-crimson-600"
              >
                <IcClose className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <Chip className="bg-gold-400 text-navy-950">{reading.category}</Chip>
                <span className="text-xs font-bold tracking-wide text-navy-500 uppercase">{fmt(reading.date)}</span>
              </div>
              <h2 className="font-display mt-4 text-3xl leading-tight font-bold text-navy-900 sm:text-4xl">{reading.title}</h2>
              <div className="mt-6 space-y-5">
                {reading.body.map((p, i) => (
                  <p key={i} className={`leading-relaxed text-ink/75 ${i === 0 ? "text-lg font-medium text-ink/85" : ""}`}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3 border-t-2 border-navy-900 pt-5 text-xs font-semibold tracking-wide text-navy-500 uppercase">
                <IcPin className="h-4 w-4" /> Ashgrove Academy · filed by the Gazette office
              </div>
            </div>
          </div>
        </div>
      )}

      {/* mini CTA */}
      <section className="blueprint bg-navy-950 text-chalk-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center">
          <p className="font-display max-w-2xl text-2xl font-semibold sm:text-3xl">
            <IcCalendar className="mr-3 inline h-7 w-7 text-gold-400" />
            Never miss a date — term calendars download from the <em className="italic text-gold-300">Admissions</em> page.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-200">
            <span className="flex items-center gap-2"><IcClock className="h-4 w-4 text-gold-300" /> Office: Mon–Fri, 08:00–16:30</span>
            <span className="flex items-center gap-2"><IcPin className="h-4 w-4 text-gold-300" /> Hartfield, Kent</span>
          </div>
        </div>
      </section>
    </>
  );
}
