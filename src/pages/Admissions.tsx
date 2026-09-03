import { Link } from "react-router-dom";
import { EnquiryForm, Accordion } from "../components/interactive";
import { ArrowLink, PageHero, Reveal, SectionHead } from "../components/ui";
import { IcArrow, IcCalendar, IcDownload, IcStar } from "../components/icons";
import { admissionsSteps, downloadResource, events, faqs, feeRows, fmtShort, fmtWeekday, keyDates, resources } from "../lib/data";

const openDay = events.find((e) => e.tag === "Open Day") ?? events[0];

export default function Admissions() {
  return (
    <>
      <PageHero
        kicker="Admissions · 2026 entry"
        title={[<>Joining</>, <em key="g" className="font-display italic text-gold-300">the Grove</em>]}
        lede="Six steps, one honest conversation at a time. Means-tested bursaries of up to 100% are assessed in parallel with every offer, so cost never decides a child's future here."
      >
        <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-5 border-2 border-navy-700 bg-navy-900/80 p-5 sm:max-w-2xl">
          <span className="grid h-12 w-12 place-items-center bg-gold-400 text-navy-950"><IcCalendar className="h-6 w-6" /></span>
          <span className="flex-1">
            <span className="kicker block text-gold-300">Next open morning</span>
            <span className="font-display mt-1 block text-xl font-bold text-chalk-50">{fmtWeekday(openDay.date)} · {openDay.time}</span>
          </span>
          <Link to="/contact" className="btn btn-gold !px-4 !py-2.5">Reserve a place</Link>
        </Reveal>
      </PageHero>

      {/* steps */}
      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              kicker="How to apply"
              title={["Six steps,", "no mystery"]}
              lede="Most families complete the journey in one term. The longest part is usually deciding which Tuesday to visit."
            />
            <Reveal delay={250}>
              <div className="mt-8 flex flex-col gap-4">
                <Link to="/contact" className="btn btn-navy w-fit">Start with an enquiry <IcArrow className="h-4 w-4" /></Link>
                <ArrowLink to="/academics">See what they'd be joining</ArrowLink>
              </div>
            </Reveal>
          </div>
          <ol className="border-t-2 border-navy-900">
            {admissionsSteps.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 60} className="group flex gap-6 border-b-2 border-navy-900/15 py-7 transition-colors hover:bg-chalk-100 sm:gap-10 sm:px-4">
                <span className="font-display text-4xl leading-none font-bold text-gold-500 sm:text-5xl">{s.step}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-ink/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* key dates + fees */}
      <section className="border-y-2 border-navy-900 bg-navy-950 text-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead tone="light" kicker="Key dates" title={["Dates worth", "circling"]} />
            <Reveal delay={180}>
              <ul className="mt-8 border-t border-navy-800">
                {keyDates.map((d) => (
                  <li key={d.what} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-navy-800 py-4">
                    <span className="kicker !text-[0.62rem] pt-1 text-gold-300">{d.when}</span>
                    <span>
                      <span className="font-display block text-lg leading-snug font-bold text-chalk-50">{d.what}</span>
                      <span className="text-sm text-navy-300">{d.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionHead tone="light" kicker="Fees 2025–26" title={["What it costs,", "plainly put"]} />
            <Reveal delay={180}>
              <div className="mt-8 overflow-x-auto border border-navy-700">
                <table className="tbl min-w-[30rem] !text-chalk-50">
                  <thead>
                    <tr className="bg-navy-900">
                      <th className="!text-gold-300">Division</th>
                      <th className="!text-gold-300">Per term</th>
                      <th className="!text-gold-300">Includes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeRows.map((f) => (
                      <tr key={f.division} className="!bg-transparent hover:!bg-navy-900">
                        <td className="font-display font-semibold text-chalk-50 !border-navy-800">{f.division}</td>
                        <td className="font-mono font-bold text-gold-300 !border-navy-800">{f.perTerm}</td>
                        <td className="text-navy-200 !border-navy-800">{f.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-6 flex items-start gap-4 border-l-4 border-gold-400 bg-navy-900 p-5">
                <IcStar className="mt-0.5 h-6 w-6 shrink-0 text-gold-300" />
                <p className="text-sm leading-relaxed text-navy-100">
                  <span className="font-bold text-chalk-50">Scholarships</span> of 10–25% are awarded each March in music, art, sport and academics.
                  <span className="font-bold text-chalk-50"> Bursaries</span> are means-tested up to 100% and assessed confidentially alongside every offer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* downloads */}
      <section className="bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHead kicker="Take it with you" title={["The paperwork,", "pre-folded"]} />
          <div className="mt-10 border-t-2 border-navy-900">
            {resources.slice(0, 5).map((r, i) => (
              <Reveal key={r.id} delay={i * 50} className="group flex flex-wrap items-center gap-x-6 gap-y-3 border-b-2 border-navy-900/15 py-5 transition-colors hover:bg-chalk-100 sm:px-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-navy-900 bg-chalk-50 text-navy-800 transition-colors group-hover:bg-gold-400">
                  <IcDownload className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block text-lg leading-tight font-bold text-navy-900">{r.name}</span>
                  <span className="text-sm text-ink/60">{r.desc}</span>
                </span>
                <span className="kicker !text-[0.6rem] text-navy-400">{r.size} · .txt</span>
                <button onClick={() => downloadResource(r.id)} className="btn btn-navy !px-4 !py-2.5">Download</button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + form */}
      <section className="bg-chalk-100 border-t-2 border-navy-900">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead kicker="Asked constantly" title={["Questions,", "answered straight"]} />
            <div className="mt-8">
              <Accordion items={faqs} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead kicker="Say hello" title={["Start the", "conversation"]} />
            <div className="mt-8">
              <EnquiryForm context="Admissions & entry points" />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink/50">
              Prefer to talk first? Call the registrar on <span className="font-bold text-navy-800">+44 (0)1892 654 210</span>, Monday to Friday, 08:00–16:30.
              Next open morning: <span className="font-bold text-navy-800">{fmtShort(openDay.date)}</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
