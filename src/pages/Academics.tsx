import { Link } from "react-router-dom";
import { DEPARTMENTS, PROGRAMS, RESOURCES, STAGES } from "../lib/data";
import { downloadPdf } from "../lib/pdf";
import { Accordion, DownloadBtn, Reveal, SectionHead } from "../components/ui";
import { DEPT_ICONS, IcArrow, IcCap, IcDoc } from "../components/icons";

export default function Academics() {
  return (
    <>
      {/* header */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute left-[-140px] bottom-[-160px] w-[420px] h-[420px] rounded-full border-[30px] border-pine-900/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <Reveal><p className="kicker text-gold-300">Academics</p></Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display font-extrabold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-[3.4rem] max-w-3xl">
              Rigorous, humane, and <span className="text-gold-300">hands-on.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-pine-100/85">
              Eight departments, 24 Upper School electives and one rule of thumb: if a child can build it, stage
              it, or argue it — they will. Here's how the curriculum is organised.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
              {[
                { t: "The three stages", h: "#stages" },
                { t: "Departments", h: "#departments" },
                { t: "Signature programmes", h: "#programmes" },
                { t: "Downloads", h: "#downloads" },
              ].map((c) => (
                <button
                  key={c.h}
                  onClick={() => document.getElementById(c.h.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="rounded-full border border-pine-700 bg-pine-900/60 px-4 py-2 hover:bg-gold-400 hover:text-pine-950 hover:border-gold-400 transition-colors"
                >
                  {c.t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* stages */}
      <section id="stages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionHead
          kicker="The three stages"
          title={<>Built for the age your child actually is.</>}
          body="Each stage runs its own timetable, pastoral system and buildings — with handovers rehearsed so carefully that children barely notice them."
        />
        <div className="mt-14 space-y-8">
          {STAGES.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className="group grid lg:grid-cols-[1.25fr_1fr] rounded-2xl border border-pine-900/10 bg-white/70 overflow-hidden hover:shadow-lift transition-shadow">
                <div className="p-8 sm:p-10">
                  <p className="flex items-baseline gap-4">
                    <span className="font-display font-extrabold text-5xl text-pine-200 group-hover:text-gold-400 transition-colors leading-none">{s.num}</span>
                    <span>
                      <span className="block font-display font-bold text-2xl sm:text-3xl tracking-tight text-pine-950">{s.name}</span>
                      <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-gold-600 mt-1">{s.grades}</span>
                    </span>
                  </p>
                  <p className="mt-5 text-ink-soft leading-relaxed max-w-xl">{s.blurb}</p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm font-medium text-pine-900">
                        <span className="mt-1.5 w-2 h-2 rotate-45 bg-gold-400 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <span key={c} className="rounded-full bg-pine-50 border border-pine-900/10 px-3 py-1 text-xs font-semibold text-pine-800">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="img-zoom relative min-h-[240px]">
                  <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute bottom-4 left-4 bg-pine-950/85 backdrop-blur rounded-full px-4 py-1.5 text-xs font-bold text-gold-300">
                    {s.name} · Aldercrest
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* departments */}
      <section id="departments" className="relative bg-chalk-100 border-y border-pine-900/10">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <SectionHead
            kicker="Departments"
            title={<>Eight departments, zero silos.</>}
            body="History borrows the science labs, drama borrows the choir, and everyone borrows the Maker Commons. Tap a department for its current course list."
          />
          <Reveal delay={120}>
            <div className="mt-12 rounded-2xl border border-pine-900/10 bg-chalk-50 px-6 sm:px-8 shadow-card">
              <Accordion
                defaultOpen={0}
                items={DEPARTMENTS.map((dep) => {
                  const Icon = DEPT_ICONS[dep.icon];
                  return {
                    title: (
                      <span className="flex items-center gap-4">
                        <span className="w-10 h-10 shrink-0 rounded-lg bg-pine-900 text-gold-300 grid place-items-center">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span>
                          {dep.name}
                          <span className="block text-xs font-semibold text-ink-soft mt-0.5 normal-case tracking-normal">
                            Head of department: {dep.head}
                          </span>
                        </span>
                      </span>
                    ),
                    body: (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {dep.courses.map((c) => (
                          <span key={c} className="rounded-full border border-pine-900/15 bg-white px-3.5 py-1.5 text-sm font-medium text-pine-900">
                            {c}
                          </span>
                        ))}
                      </div>
                    ),
                  };
                })}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* signature programmes */}
      <section id="programmes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-12">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHead
              kicker="Signature programmes"
              title={<>The things Aldercrest is known for.</>}
              body="Five commitments we make to every family — written into the school development plan and reported on to governors each term."
            />
            <Reveal delay={150}>
              <Link to="/admissions" className="mt-7 inline-flex items-center gap-2 font-bold text-pine-800 hover:text-gold-600 transition-colors group">
                Ask us about any of these <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
          <div>
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="group flex gap-6 items-start border-t border-pine-900/10 py-7 px-3 -mx-3 hover:bg-pine-50/70 rounded-lg transition-colors">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-gold-400 text-pine-950 font-display font-extrabold grid place-items-center group-hover:bg-pine-900 group-hover:text-gold-300 transition-colors">
                    {i + 1}
                  </span>
                  <span>
                    <span className="flex items-center gap-3 font-display font-bold text-xl text-pine-950">
                      {p.title}
                      <IcCap className="w-5 h-5 text-gold-500" />
                    </span>
                    <span className="mt-2 block text-ink-soft leading-relaxed max-w-xl">{p.body}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* downloads */}
      <section id="downloads" className="relative bg-pine-950 text-chalk-50 noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              dark
              kicker="Downloads & resources"
              title={<>Take the paperwork with you.</>}
              body="Catalogues, calendars and guides — generated fresh as PDFs whenever you need them."
            />
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESOURCES.slice(0, 8).map((r, i) => (
              <Reveal key={r.file} delay={i * 60}>
                <div className="group rounded-xl border border-pine-800 bg-pine-900/60 p-6 flex flex-col h-full hover:border-gold-400/70 hover:-translate-y-1 transition-all">
                  <span className="w-11 h-11 rounded-lg bg-pine-950 border border-pine-700 text-gold-300 grid place-items-center group-hover:bg-gold-400 group-hover:text-pine-950 group-hover:border-gold-400 transition-colors">
                    <IcDoc className="w-5 h-5" />
                  </span>
                  <p className="mt-4 font-bold leading-snug">{r.title}</p>
                  <p className="mt-1 text-xs text-pine-100/60">{r.type} · {r.meta}</p>
                  <div className="mt-auto pt-5">
                    <DownloadBtn onClick={() => downloadPdf(r.file, r.title, r.lines)} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
