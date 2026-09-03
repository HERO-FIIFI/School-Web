import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLink, Chip, PageHero, Reveal, SectionHead } from "../components/ui";
import { IcArrow, IcBook, IcBrush, IcBall, IcCheck, IcChevD, IcCompass, IcDownload, IcFlask, IcGlobe, IcMusic, IcRuler } from "../components/icons";
import { curriculumAreas, divisions, downloadResource, portalTimetable } from "../lib/data";

const iconMap: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  book: IcBook,
  ruler: IcRuler,
  flask: IcFlask,
  globe: IcGlobe,
  compass: IcCompass,
  brush: IcBrush,
  music: IcMusic,
  ball: IcBall,
};

const wednesday = portalTimetable[2];

export default function Academics() {
  const [open, setOpen] = useState<string | null>(divisions[1].id);

  return (
    <>
      <PageHero
        kicker="Academics · ages 4–18"
        title={[<>Curious minds,</>, <em key="t" className="font-display italic text-gold-300">carefully taught</em>]}
        lede="An average class of 17, specialists from Year 3, and a curriculum that treats questions as seriously as answers. Here is how the learning works."
      />

      {/* divisions — expandable ledger */}
      <section className="bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHead
            kicker="The four schools"
            title={["One campus,", "four chapters"]}
            lede="Choose a school to see how it works. Every pupil moves up at their own pace — around a third join at non-standard points."
          />
          <div className="mt-12 border-t-2 border-navy-900">
            {divisions.map((d) => {
              const isOpen = open === d.id;
              return (
                <div key={d.id} className={`border-b-2 transition-colors ${isOpen ? "border-navy-900 bg-navy-950 text-chalk-50" : "border-navy-900/15"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : d.id)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center gap-5 px-2 py-6 text-left sm:gap-8 sm:px-5"
                  >
                    <span className={`font-display text-4xl leading-none font-bold sm:text-5xl ${isOpen ? "text-gold-400" : "text-navy-300"}`}>{d.num}</span>
                    <span className="flex-1">
                      <span className={`font-display block text-2xl font-bold sm:text-3xl ${isOpen ? "text-chalk-50" : "text-navy-900"}`}>{d.name}</span>
                      <span className={`kicker mt-1 block !text-[0.6rem] ${isOpen ? "text-gold-300" : "text-gold-600"}`}>{d.ages} · {d.years}</span>
                    </span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center border transition-all duration-300 ${isOpen ? "rotate-180 border-gold-400 bg-gold-400 text-navy-950" : "border-navy-900/25 text-navy-700"}`}>
                      <IcChevD className="h-5 w-5" />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="grid gap-8 px-2 pb-8 sm:grid-cols-2 sm:px-5 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                          <p className={`max-w-xl leading-relaxed ${isOpen ? "text-navy-200" : ""}`}>{d.blurb}</p>
                          <ul className="mt-5 space-y-2.5">
                            {d.highlights.map((h) => (
                              <li key={h} className="flex items-center gap-3 text-sm font-semibold text-chalk-50">
                                <span className="grid h-6 w-6 shrink-0 place-items-center bg-gold-400 text-navy-950"><IcCheck className="h-3.5 w-3.5" /></span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="kicker text-gold-300">Signature subjects</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {d.subjects.map((s) => (
                              <span key={s} className="border border-navy-700 px-3 py-1.5 text-[0.78rem] font-semibold text-navy-100">{s}</span>
                            ))}
                          </div>
                          <Link to="/admissions" className="link-draw mt-6 inline-block text-[0.72rem] font-bold tracking-[0.14em] text-gold-300 uppercase">
                            Entry points for this school →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* curriculum areas */}
      <section className="border-y-2 border-navy-900 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHead
            kicker="What's taught"
            title={["Eight departments,", "no silos"]}
            lede="Departments borrow from each other constantly — the physics of music, the geography of history, the chemistry of cooking."
          />
          <div className="mt-12 grid gap-px border-2 border-navy-900 bg-navy-900/15 sm:grid-cols-2">
            {curriculumAreas.map((c, i) => {
              const Icon = iconMap[c.icon] ?? IcBook;
              return (
                <Reveal key={c.name} delay={(i % 2) * 80} className="group flex gap-5 bg-chalk-50 p-6 transition-colors hover:bg-navy-950 sm:p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-navy-900 text-navy-800 transition-all duration-300 group-hover:rotate-6 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <h3 className="font-display text-xl font-bold text-navy-900 transition-colors group-hover:text-chalk-50">{c.name}</h3>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink/65 transition-colors group-hover:text-navy-200">{c.desc}</p>
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* sample day + assessment */}
      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHead
              kicker="A day in the life"
              title={["Wednesday,", "Period by period"]}
              lede="A real Year 9 Wednesday — the kind of day that ends with mud on the boots and a tune in the head."
            />
            <Reveal delay={200}>
              <div className="mt-8 overflow-x-auto border-2 border-navy-900 bg-chalk-50">
                <table className="tbl min-w-[32rem]">
                  <thead>
                    <tr className="bg-navy-950 text-navy-200">
                      <th className="!text-gold-300">Period</th>
                      <th className="!text-gold-300">Lesson</th>
                      <th className="!text-gold-300">Room</th>
                      <th className="!text-gold-300">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wednesday.lessons.map((l, i) => (
                      <tr key={l.time}>
                        <td className="font-mono text-xs font-bold text-navy-600">P{i + 1} · {l.time}</td>
                        <td className="font-display font-semibold text-navy-900">{l.subject}</td>
                        <td>{l.room}</td>
                        <td className="text-ink/60">{l.teacher}</td>
                      </tr>
                    ))}
                    <tr className="bg-gold-100/70">
                      <td className="font-mono text-xs font-bold text-navy-600">15:30</td>
                      <td className="font-display font-semibold text-navy-900">Clubs & supervised prep</td>
                      <td>Everywhere</td>
                      <td className="text-ink/60">48 options, from chess to robotics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHead kicker="Assessment & reporting" title={["Honest marks,", "kinder margins"]} />
            <ol className="mt-8 space-y-0 border-t-2 border-navy-900">
              {[
                ["01", "Reports twice a term", "Subject grades, an attitude-to-learning score, and one sentence a parent will actually read. No algorithm fog."],
                ["02", "Consultations", "Two evenings a term, bookable through the portal — fifteen unhurried minutes with each teacher."],
                ["03", "Public examinations", "28 GCSEs and 26 A-levels on offer; mock windows posted to pupils' portals two weeks ahead."],
                ["04", "Pupil-led reviews", "From Year 5, pupils present their own progress — the proudest, most nerve-wracking ten minutes of the year."],
              ].map(([n, t, d], i) => (
                <Reveal as="li" key={n} delay={i * 70} className="group border-b-2 border-navy-900/15 py-5">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-2xl font-bold text-navy-300 transition-colors group-hover:text-gold-600">{n}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900">{t}</h3>
                      <p className="mt-1 text-[0.88rem] leading-relaxed text-ink/65">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={250}>
              <div className="mt-8 flex items-center gap-4 border-2 border-navy-900 bg-gold-100 p-5">
                <IcDownload className="h-7 w-7 shrink-0 text-navy-800" />
                <div className="flex-1">
                  <p className="font-display font-bold text-navy-900">Prospectus 2026</p>
                  <p className="text-xs text-ink/60">The whole academic picture on one honest page.</p>
                </div>
                <button onClick={() => downloadResource("prospectus")} className="btn btn-navy !px-4 !py-2.5">Download</button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-6">
                <ArrowLink to="/portal">Pupils: see your live timetable in the portal</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blueprint bg-navy-950 text-chalk-50">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <p className="kicker text-gold-300">Ready when they are</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight font-semibold sm:text-5xl">Entry at 4+, 7+, 11+, 13+ and 16+ — <em className="italic text-gold-300">and in between.</em></h2>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link to="/admissions" className="btn btn-gold">Admissions guide <IcArrow className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn btn-ghost-light">Ask a question</Link>
          </div>
        </div>
      </section>
    </>
  );
}
