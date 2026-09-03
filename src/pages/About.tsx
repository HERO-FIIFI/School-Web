import { Link } from "react-router-dom";
import { CountUp, FramedImage, PageHero, Reveal, SectionHead, ArrowLink } from "../components/ui";
import { IcArrow } from "../components/icons";
import { IMG, milestones, staff, values } from "../lib/data";

export default function About() {
  return (
    <>
      <PageHero
        kicker="About us · since 1912"
        title={[<>A school grown from</>, <em key="g" className="font-display italic text-gold-300">a walled garden</em>]}
        lede="Fourteen pupils, two mistresses and one garden donkey — that was the whole of Ashgrove in 1912. The donkey's descendants have retired, but almost everything else is still here."
      />

      {/* mission */}
      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              kicker="What we're for"
              title={["Character first,", "and the grades follow"]}
            />
            <Reveal delay={180}>
              <p className="mt-7 leading-relaxed text-ink/70 first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-bold first-letter:text-navy-900">
                Edith Ashworth founded this school on a simple conviction: that children learn best where they are known.
                A century on, that conviction runs everything — class sizes capped at 22, tutors who teach the same family
                twice, houses named after the four oak trees that predate the school itself.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-5 leading-relaxed text-ink/70">
                We are unapologetically academic — 28 GCSE options, triple science as standard, a university office that has
                guided offers from Oxford to the Royal Academy — but we measure ourselves on what pupils make, fix, grow and
                organise as much as on what they score.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-9 grid grid-cols-3 divide-x divide-navy-900/15 border-2 border-navy-900 bg-navy-950 text-center">
                {([[32, "acres of campus"], [4, "houses, four oaks"], [6, "specialist schools & wings"]] as [number, string][]).map(([n, l]) => (
                  <div key={l} className="px-3 py-6">
                    <p className="font-display text-3xl font-bold text-gold-300"><CountUp to={n} /></p>
                    <p className="mt-1.5 px-1 text-[0.62rem] font-bold tracking-[0.12em] text-navy-300 uppercase">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={150} className="self-start lg:sticky lg:top-28">
            <FramedImage src={IMG.classroom} alt="Seminar discussion in a Middle School classroom" className="aspect-[4/5] border-2 border-navy-900 shadow-[12px_12px_0_rgba(12,35,64,0.12)]" />
            <p className="mt-3 text-[0.7rem] font-bold tracking-[0.16em] text-navy-500 uppercase">Room 12 — Socratic circle, Year 9, a Tuesday</p>
          </Reveal>
        </div>
      </section>

      {/* values ledger */}
      <section className="border-y-2 border-navy-900 bg-navy-950 text-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHead tone="light" kicker="The four commitments" title={["What we promise", "every pupil"]} />
          <div className="mt-10 border-t border-navy-800">
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 80} className="group grid gap-4 border-b border-navy-800 py-8 transition-colors hover:bg-navy-900/60 sm:grid-cols-[6rem_1fr_2fr] sm:gap-8 sm:px-4">
                <p className="font-display text-5xl font-bold text-navy-700 transition-colors group-hover:text-gold-400">{v.num}</p>
                <h3 className="font-display text-2xl font-bold text-chalk-50 sm:text-3xl">{v.name}</h3>
                <p className="max-w-2xl leading-relaxed text-navy-200">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              kicker="1912 → today"
              title={["A short history", "of a long memory"]}
              lede="Seven moments that shaped the school. The full archive — every prize-giving programme since 1913 — lives in the Ellison Library, open Tuesday and Thursday lunchtimes."
            />
            <Reveal delay={250}>
              <FramedImage src={IMG.hall} alt="The Great Hall during a ceremony" className="mt-8 aspect-[16/10] border-2 border-navy-900" />
              <p className="mt-3 text-[0.7rem] font-bold tracking-[0.16em] text-navy-500 uppercase">The Great Hall, raised by alumni in one summer, 1931</p>
            </Reveal>
          </div>
          <ol className="relative border-l-2 border-navy-900/15 pl-8 sm:pl-10">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 60} className="relative pb-10 last:pb-0">
                <span className="absolute top-2 -left-[2.42rem] h-3.5 w-3.5 rotate-45 border-2 border-navy-900 bg-gold-400 sm:-left-[2.92rem]" />
                <p className="font-display text-4xl font-bold text-navy-900 sm:text-5xl">{m.year}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-gold-600">{m.title}</h3>
                <p className="mt-1.5 max-w-xl leading-relaxed text-ink/70">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* leadership */}
      <section className="border-t-2 border-navy-900 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHead
            kicker="Leadership"
            title={["The people who", "know every name"]}
            lede="Six of the senior team below — between them, 92 years of Ashgrove corridors."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((s, i) => (
              <Reveal key={s.name} delay={i * 70} className="group border-2 border-navy-900/15 bg-chalk-50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900 hover:shadow-[8px_8px_0_rgba(12,35,64,0.14)]">
                <div className="flex items-center gap-4">
                  <span className={`grid h-14 w-14 shrink-0 place-items-center font-display text-lg font-bold text-chalk-50 ${s.tint}`}>{s.initials}</span>
                  <div>
                    <p className="font-display text-xl leading-tight font-bold text-navy-900">{s.name}</p>
                    <p className="kicker mt-1 !text-[0.58rem] text-gold-600">{s.role}</p>
                  </div>
                </div>
                <p className="mt-4 border-t border-navy-900/10 pt-3 text-sm text-ink/60">{s.cred}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-2 border-navy-900 bg-navy-950 px-7 py-6 text-chalk-50">
              <p className="font-display text-2xl font-bold sm:text-3xl">Want the full tour, walled garden included?</p>
              <Link to="/contact" className="btn btn-gold">Arrange a visit <IcArrow className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* safeguarding note */}
      <section className="bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Reveal className="grid gap-6 border-l-4 border-gold-500 bg-chalk-100 p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-navy-900">Safeguarding comes before everything</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink/70">
                Our Designated Safeguarding Lead is Miss Charlotte Reed. Any concern, however small, can be raised with any adult in the school,
                by phone, or in writing to <span className="font-semibold text-navy-800">safeguarding@ashgrove-academy.sch.uk</span>. Our policy is reviewed termly and published to all families.
              </p>
            </div>
            <ArrowLink to="/contact">Contact the office</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
