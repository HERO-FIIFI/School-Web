import { useState } from "react";
import { Link } from "react-router-dom";
import { ADMISSION_STEPS, FAQS, FEES, KEY_DATES, RESOURCES, downloadResource } from "../lib/data";
import { Eyebrow, MaskHeading, PageHeader, Reveal } from "../components/ui";
import { ArrowRight, CalendarIcon, CheckIcon, ChevronDown, DownloadIcon, MailIcon } from "../components/icons";

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const applicantResources = RESOURCES.filter((r) => r.audience === "Applicants" || r.audience === "All");

  return (
    <div>
      <PageHeader
        kicker="Admissions"
        title={[<>Six steps,</>, <><em className="font-light italic text-gold-300">no mystery.</em></>]}
        intro="We admit at 4+, 11+ and 16+, and occasionally between. The process below is the whole process — no hidden rounds, no tutoring required, and bursaries assessed in full confidence."
      >
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-gold bg-gold-400 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-900">
              Start with an enquiry
            </Link>
            <a href="#fees" onClick={(e) => { e.preventDefault(); document.getElementById("fees")?.scrollIntoView({ behavior: "smooth" }); }} className="border-2 border-chalk-50/40 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-chalk-50 transition-colors hover:border-gold-400 hover:text-gold-300">
              See fees & bursaries
            </a>
          </div>
        </Reveal>
      </PageHeader>

      {/* steps timeline */}
      <section className="paper-ruled">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <Reveal><Eyebrow>The journey</Eyebrow></Reveal>
          <MaskHeading
            lines={[<>From first hello</>, <><em className="font-light italic text-gold-600">to first bell.</em></>]}
            className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
          />
          <div className="relative mt-12 max-w-4xl">
            <span className="absolute left-[27px] top-4 bottom-4 w-px bg-navy-900/20" aria-hidden />
            {ADMISSION_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 90}>
                <div className="relative mb-7 flex gap-6 md:gap-8">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center border-2 border-gold-500 bg-chalk-50 font-display text-2xl font-black text-navy-900 shadow-sm">
                    {s.step}
                  </span>
                  <article className="lift flex-1 border border-navy-900/12 bg-chalk-50 p-6 md:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-2xl font-bold text-navy-900">{s.title}</h3>
                      <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-gold-600">
                        <CalendarIcon className="h-4 w-4" /> {s.meta}
                      </span>
                    </div>
                    <p className="mt-2 leading-relaxed text-navy-800/80">{s.text}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* key dates + fees */}
      <section className="border-y border-navy-900/10 bg-navy-900 dark-weave text-chalk-50" id="fees">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-8 lg:grid-cols-2">
          <div>
            <Reveal><Eyebrow tone="light">Key dates 2026 entry</Eyebrow></Reveal>
            <MaskHeading
              lines={[<>Mark the</>, <><em className="font-light italic text-gold-300">kitchen calendar.</em></>]}
              className="mt-4 font-display text-4xl font-black leading-[1.04]"
            />
            <Reveal delay={200}>
              <ul className="mt-8 divide-y divide-chalk-50/10 border-y border-chalk-50/10">
                {KEY_DATES.map((d) => (
                  <li key={d.item} className="flex items-baseline justify-between gap-6 py-3.5">
                    <span className="font-semibold text-navy-100">{d.item}</span>
                    <span className="shrink-0 font-display text-lg font-bold text-gold-300 tabular-nums">{d.date}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-sm text-navy-100/70">
                Late applications are considered where places remain — email{" "}
                <a href="mailto:admissions@ashgrove.example" className="link-slide font-bold text-gold-300">the registrar</a> rather than assuming it's too late.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal><Eyebrow tone="light">Fees per term</Eyebrow></Reveal>
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden border border-chalk-50/15">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gold-400 text-navy-900">
                      <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em]">Stage</th>
                      <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em]">Per term</th>
                      <th className="hidden px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] sm:table-cell">Per year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEES.map((f) => (
                      <tr key={f.stage} className="border-t border-chalk-50/10 transition-colors hover:bg-navy-800/70">
                        <td className="px-5 py-4">
                          <span className="block font-bold text-chalk-50">{f.stage}</span>
                          <span className="mt-0.5 block text-xs text-navy-200">{f.note}</span>
                        </td>
                        <td className="px-5 py-4 font-display text-xl font-black text-gold-300 tabular-nums">{f.perTerm}</td>
                        <td className="hidden px-5 py-4 font-bold text-navy-100 sm:table-cell">{f.perYear}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-6 border-l-4 border-gold-500 bg-navy-800/70 p-5">
                <p className="font-display text-lg font-bold">Bursaries up to 100% of fees</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-100/80">
                  Around 40 means-tested awards run each year, alongside academic, music and sport
                  scholarships of up to 20%. Registration fees are waived for bursary applicants.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>Asked every week</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>Fair</>, <><em className="font-light italic text-gold-600">questions.</em></>]}
                className="mt-4 font-display text-4xl font-black leading-[1.04] text-navy-900 md:text-5xl"
              />
              <Reveal delay={200}>
                <p className="mt-5 text-navy-800/80 leading-relaxed">
                  Anything else, the registrar answers within two working days — usually sooner, and always
                  by a human called Janet.
                </p>
                <a href="mailto:admissions@ashgrove.example" className="mt-6 flex items-center gap-3 border border-navy-900/20 bg-chalk-50 px-5 py-4 font-bold text-navy-900 transition-all hover:border-navy-900 hover:bg-navy-900 hover:text-gold-300">
                  <MailIcon className="h-5 w-5 text-gold-600" /> admissions@ashgrove.example
                </a>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`border-b border-navy-900/15 ${i === 0 ? "border-t" : ""}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={`font-display text-xl font-bold transition-colors md:text-2xl ${openFaq === i ? "text-gold-600" : "text-navy-900 group-hover:text-gold-600"}`}>
                      {f.q}
                    </span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center border transition-all duration-300 ${openFaq === i ? "rotate-180 border-gold-500 bg-gold-400 text-navy-900" : "border-navy-900/25 text-navy-800 group-hover:border-navy-900"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`acc-panel ${openFaq === i ? "open" : ""}`}>
                    <div>
                      <p className="max-w-2xl pb-6 leading-relaxed text-navy-800/85">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* downloads */}
      <section className="border-t border-navy-900/10 bg-chalk-100">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>Take it with you</Eyebrow></Reveal>
              <MaskHeading
                lines={[<>Downloads for</>, <><em className="font-light italic text-gold-600">the kitchen table.</em></>]}
                className="mt-4 font-display text-3xl font-black leading-[1.05] text-navy-900 md:text-4xl"
              />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applicantResources.slice(0, 4).map((r, i) => (
              <Reveal key={r.id} delay={i * 80} className="h-full">
                <button
                  onClick={() => downloadResource(r)}
                  className="lift group flex h-full w-full flex-col border border-navy-900/12 bg-chalk-50 p-5 text-left"
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="bg-navy-900 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-300">{r.kind}</span>
                    <DownloadIcon className="h-5 w-5 text-gold-600 transition-transform group-hover:translate-y-0.5" />
                  </span>
                  <span className="mt-4 flex-1 font-display text-lg font-bold leading-snug text-navy-900 group-hover:text-gold-600 transition-colors">{r.title}</span>
                  <span className="mt-3 text-xs font-bold uppercase tracking-wider text-navy-800/60">{r.size} · {r.audience}</span>
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-2 border-dashed border-navy-900/25 bg-chalk-50 px-7 py-6">
              <p className="font-display text-2xl font-bold text-navy-900">
                Ready when you are. <CheckIcon className="inline h-6 w-6 text-gold-600" />
              </p>
              <Link to="/contact" className="group flex items-center gap-3 bg-navy-900 px-7 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-chalk-50 transition-all hover:bg-navy-800">
                Send an enquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
