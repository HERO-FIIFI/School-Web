import { Link } from "react-router-dom";
import { LEADERSHIP, TIMELINE, VALUES } from "../lib/data";
import { Eyebrow, MaskHeading, PageHeader, Reveal, StatBlock } from "../components/ui";
import { VALUE_ICONS } from "../components/icons";
import { ArrowRight, Crest } from "../components/icons";

export default function About() {
  return (
    <div>
      <PageHeader
        kicker="About Us"
        title={[<>A school with a long</>, <><em className="font-light italic text-gold-300">memory — and short corridors.</em></>]}
        intro="Founded in 1912 by Canon Edmund Ashgrove with 31 boys and a borrowed bell, we are now 1,140 pupils aged 4–18 on the hill above Ash Vale. The bell is still ours. So is the habit of asking why."
      />

      {/* Head's welcome — sticky two column */}
      <section className="paper-ruled">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>From the Head</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>“We teach children,</>, <><em className="font-light italic text-gold-600">not syllabuses.”</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.05] text-navy-900 md:text-5xl"
              />
              <Reveal delay={200}>
                <div className="mt-8 border-l-4 border-gold-500 bg-chalk-50 p-6 shadow-[0_16px_36px_-26px_rgba(7,26,48,0.5)]">
                  <p className="font-display text-lg font-medium italic leading-relaxed text-navy-900">
                    Ask any Old Ashgrovean what they remember and they will not say a grade. They will say a
                    teacher who noticed, a team that wouldn't let them sulk, a play that went wrong and felt
                    glorious anyway. We build for that.
                  </p>
                  <p className="mt-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center bg-navy-900 font-display text-sm font-black text-gold-400">EA</span>
                    <span>
                      <span className="block font-bold text-navy-900">Dr Eleanor Ashworth</span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-navy-800/60">Headmistress since 2018</span>
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-7">
            {[
              { h: "A day school, deliberately", p: "We believe children are raised by families and finished by schools — not the other way round. Our days are long enough (08:45–16:00, clubs to 18:00) and our holidays are yours. Around a fifth of pupils board weekly by choice, sleeping in the same house their great-grandparents did." },
              { h: "Academic, not academicish", p: "Results matter — 78% of GCSEs at 9–7, 61% of A-levels at A*–A — but they are a by-product of classrooms where hands go up and nobody laughs. We teach in classes of 18 on average, and every tutor knows twelve children, not thirty." },
              { h: "Character earns its timetable", p: "The Ashgrove Diploma gives oracy, service and expedition the same status as exams. Year 8 runs the food bank appeal; Year 10 leads the junior sports morning; Year 13 spends a fortnight teaching in our partner primary schools." },
              { h: "Tradition, minus the dust", p: "We ring the 1912 bell, sing in the 1938 chapel and keep the house names — but we were co-educational before it was fashionable, the planetarium arrived in 1987, and every pupil codes from Year 5." },
            ].map((b, i) => (
              <Reveal key={b.h} delay={i * 100}>
                <article className="lift border border-navy-900/12 bg-chalk-50 p-7 md:p-8">
                  <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-navy-900">
                    <span className="h-2.5 w-2.5 rotate-45 bg-gold-500" /> {b.h}
                  </h3>
                  <p className="mt-3 leading-relaxed text-navy-800/85">{b.p}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-navy-900/10 bg-navy-900 dark-weave text-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <Reveal><Eyebrow tone="light">What we hold to</Eyebrow></Reveal>
          <MaskHeading
            lines={[<>Four promises,</>, <><em className="font-light italic text-gold-300">kept daily.</em></>]}
            className="mt-4 font-display text-4xl font-black leading-[1.04] md:text-5xl"
          />
          <div className="mt-12 grid gap-px bg-chalk-50/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[v.icon];
              return (
                <Reveal key={v.title} delay={i * 110} className="h-full">
                  <div className="group h-full bg-navy-900 p-7 transition-colors duration-300 hover:bg-navy-800">
                    <span className="grid h-12 w-12 place-items-center border border-gold-400/50 text-gold-400 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-100/80">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center">
          <Reveal><span className="inline-block"><Eyebrow>Since 1912</Eyebrow></span></Reveal>
          <MaskHeading
            lines={[<>The years on</>, <><em className="font-light italic text-gold-600">the hill.</em></>]}
            className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
          />
        </div>
        <div className="relative mx-auto mt-14 max-w-3xl">
          <span className="absolute left-[19px] top-2 bottom-2 w-px bg-navy-900/20 md:left-1/2" aria-hidden />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 80} tilt={i % 2 === 0 ? -0.5 : 0.5}>
              <div className={`relative mb-8 flex gap-6 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right md:flex-row-reverse" : "md:ml-auto md:pl-10"}`}>
                <span className="absolute left-[13px] top-6 h-3.5 w-3.5 rotate-45 border-2 border-gold-500 bg-chalk-50 md:left-auto md:right-[-7px] md:left-auto" style={i % 2 === 1 ? { left: -7, right: "auto" } : undefined} aria-hidden />
                <div className={`ml-12 flex-1 border border-navy-900/12 bg-chalk-50 p-6 shadow-sm md:ml-0 ${i % 2 === 0 ? "" : ""}`}>
                  <p className="font-display text-3xl font-black text-gold-600">{t.year}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-navy-900">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* leadership */}
      <section className="border-t border-navy-900/10 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>Leadership</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>The staffroom's</>, <><em className="font-light italic text-gold-600">front bench.</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
              />
            </div>
            <Reveal delay={200}>
              <p className="max-w-xs text-sm font-semibold text-navy-800/70">86 teachers, most of whom still teach more periods than they lead.</p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((l, i) => (
              <Reveal key={l.name} delay={i * 90} className="h-full">
                <article className="lift group h-full border border-navy-900/12 bg-chalk-50 p-6">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-14 w-14 shrink-0 place-items-center font-display text-lg font-black text-chalk-50 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
                      style={{ background: l.color }}
                    >
                      {l.initials}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold leading-tight text-navy-900">{l.name}</h3>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-600">{l.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-navy-800/75">{l.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* facts band + CTA */}
      <section className="bg-navy-950 dark-weave text-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal><Eyebrow tone="light">By the numbers</Eyebrow></Reveal>
            <div className="mt-6 grid grid-cols-2 gap-8">
              <StatBlock value={40} suffix="acres" label="Of campus, orchard included" light />
              <StatBlock value={86} suffix="" label="Teaching staff" light delay={100} />
              <StatBlock value={31} suffix="" label="Clubs & societies" light delay={200} />
              <StatBlock value={40} suffix="" label="Bursary places each year" light delay={300} />
            </div>
          </div>
          <div className="border-l-2 border-gold-500 pl-7 lg:pl-10">
            <Crest className="h-12 w-12 text-gold-400" />
            <p className="mt-4 font-display text-2xl font-medium italic leading-relaxed text-navy-100 md:text-3xl">
              “Lumen et Veritas — light and truth. It was carved over the door in 1912 and it has never
              needed updating.”
            </p>
            <Link to="/contact" className="group mt-7 inline-flex items-center gap-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-gold-300">
              Arrange a visit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
