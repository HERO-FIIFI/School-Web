import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EXAM_STATS, STAGES } from "../lib/data";
import { Eyebrow, MaskHeading, PageHeader, Reveal, StatBlock } from "../components/ui";
import { ArrowRight, BallIcon, CapIcon, CheckIcon, FlaskIcon, MusicIcon, QuillIcon } from "../components/icons";

export default function Academics() {
  const [activeStage, setActiveStage] = useState("lower");
  const refs = useRef<Record<string, HTMLElement | null>>({});

  const jump = (id: string) => {
    setActiveStage(id);
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <PageHeader
        kicker="Academics"
        title={[<>A broad road,</>, <><em className="font-light italic text-gold-300">walked at pace.</em></>]}
        intro="Three stages, one continuous curriculum. Classes average 18; every subject is taught by a specialist from Year 5 upward; and the timetable leaves genuine room for the things that make children interesting."
      />

      <section className="paper-ruled">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* sticky stage rail */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-600">The three stages</p>
                <div className="mt-4 flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l-2 lg:border-navy-900/15 lg:pb-0">
                  {STAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => jump(s.id)}
                      className={`shrink-0 border border-navy-900/15 px-4 py-3 text-left transition-all duration-300 lg:-ml-[2px] lg:border-0 lg:border-l-2 lg:px-5 lg:py-4 ${
                        activeStage === s.id
                          ? "border-gold-500 bg-navy-900 text-chalk-50 lg:bg-transparent lg:text-navy-900 lg:border-l-gold-500"
                          : "text-navy-800 hover:bg-navy-900/5 lg:border-l-transparent hover:lg:border-l-gold-500/50"
                      }`}
                    >
                      <span className={`block font-display text-lg font-bold ${activeStage === s.id ? "text-gold-500 lg:text-gold-600" : ""}`}>{s.name}</span>
                      <span className={`block text-xs font-semibold ${activeStage === s.id ? "text-navy-100 lg:text-navy-800/70" : "text-navy-800/60"}`}>{s.ages}</span>
                    </button>
                  ))}
                </div>
                <Link to="/admissions" className="btn-gold mt-8 hidden bg-gold-400 px-5 py-3 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-navy-900 lg:block">
                  Entry requirements
                </Link>
              </div>
            </div>

            {/* stage sections */}
            <div className="space-y-20 lg:col-span-9">
              {STAGES.map((s, idx) => (
                <section
                  key={s.id}
                  ref={(el) => { refs.current[s.id] = el; }}
                  className="scroll-mt-32"
                >
                  <Reveal>
                    <div className="flex items-baseline gap-5">
                      <span className="font-display text-5xl font-black text-navy-900/15 md:text-6xl">{String(idx + 1).padStart(2, "0")}</span>
                      <div>
                        <h2 className="font-display text-3xl font-black text-navy-900 md:text-4xl">{s.name}</h2>
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-gold-600">{s.ages} · {s.years}</p>
                      </div>
                    </div>
                  </Reveal>
                  <div className="mt-7 grid gap-8 md:grid-cols-2">
                    <Reveal delay={100} tilt={idx % 2 === 0 ? -1 : 1}>
                      <div className="relative overflow-hidden border-8 border-chalk-50 shadow-[0_22px_44px_-28px_rgba(7,26,48,0.5)]">
                        <img src={s.image} alt={s.name} className="h-64 w-full object-cover md:h-80" loading="lazy" />
                        <span className="absolute bottom-0 left-0 bg-navy-900/85 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold-300">
                          {s.years}
                        </span>
                      </div>
                    </Reveal>
                    <div>
                      <Reveal delay={150}>
                        <p className="leading-relaxed text-navy-800/90">{s.summary}</p>
                      </Reveal>
                      <Reveal delay={220}>
                        <ul className="mt-6 space-y-2.5">
                          {s.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-[15px] font-semibold text-navy-900">
                              <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-600" /> {h}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </div>
                  </div>
                  <Reveal delay={250}>
                    <div className="mt-8 border border-navy-900/12 bg-chalk-50 p-6">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-navy-800/60">Subjects taught</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.subjects.map((sub) => (
                          <span key={sub} className="cursor-default border border-navy-900/20 px-3 py-1.5 text-[13px] font-bold text-navy-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-900 hover:bg-navy-900 hover:text-chalk-50">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* results */}
      <section className="border-y border-gold-400/40 bg-navy-900 dark-weave text-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow tone="light">Results, plainly</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>The year the marks</>, <><em className="font-light italic text-gold-300">came back.</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.04] md:text-5xl"
              />
            </div>
            <Reveal delay={200}>
              <p className="max-w-xs text-sm font-semibold text-navy-100/80">Summer 2025 cohorts. We publish the full value-added report each November.</p>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {EXAM_STATS.map((s, i) => (
              <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 100} light />
            ))}
          </div>
        </div>
      </section>

      {/* the diploma */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal><Eyebrow>The Ashgrove Diploma</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>What school is for,</>, <><em className="font-light italic text-gold-600">besides exams.</em></>]}
              className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
            />
            <Reveal delay={200}>
              <p className="mt-5 max-w-md leading-relaxed text-navy-800/85">
                Awarded alongside GCSEs and A-levels, the Diploma certifies three things no exam board can:
                that you can speak on your feet, serve somewhere that needed you, and carry a rucksack further
                than you thought possible.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: QuillIcon, title: "Oracy", text: "Debates, readings and a Year 13 talk that lasts exactly 18 minutes." },
              { icon: CheckIcon, title: "Service", text: "Forty logged hours — food banks, primaries, the county archive." },
              { icon: BallIcon, title: "Expedition", text: "Dartmoor in Year 9, Snowdonia in Year 11, and a self-led trip in 13." },
              { icon: MusicIcon, title: "Performance", text: "Every pupil on a stage, pitch or gallery wall once a year, minimum." },
            ].map((d, i) => (
              <Reveal key={d.title} delay={i * 100} className="h-full">
                <div className="lift h-full border border-navy-900/12 bg-chalk-50 p-6">
                  <d.icon className="h-7 w-7 text-gold-600" />
                  <h3 className="mt-4 font-display text-xl font-bold text-navy-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* beyond the classroom strip */}
      <section className="border-t border-navy-900/10 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="flex items-center gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center bg-navy-900 text-gold-400">
                  <CapIcon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-black text-navy-900 md:text-3xl">Learning support & stretch</h3>
                  <p className="mt-1 max-w-xl text-sm font-semibold text-navy-800/75">
                    A SEND team of nine, EAL support in four languages, and an extension programme that runs
                    olympiads, university labs and the Whitaker Lecture series. <FlaskIcon className="inline h-4 w-4 text-gold-600" />
                  </p>
                </div>
              </div>
              <Link to="/contact" className="group flex shrink-0 items-center gap-3 border-2 border-navy-900 px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900 transition-all duration-300 hover:bg-navy-900 hover:text-gold-300">
                Talk to a head of stage
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
