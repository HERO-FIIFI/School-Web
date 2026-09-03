import { EnquiryForm } from "../components/interactive";
import { PageHero, Reveal, SectionHead } from "../components/ui";
import { IcBus, IcClock, IcMail, IcPhone, IcPin } from "../components/icons";
import { SCHOOL } from "../lib/data";

/* hand-drawn campus map */
function GroveMap() {
  return (
    <svg viewBox="0 0 460 280" className="w-full border-2 border-navy-900 bg-navy-950" role="img" aria-label="Stylised map showing Ashgrove Academy off the A26, near Hartfield">
      <defs>
        <pattern id="mapgrid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0v26" fill="none" stroke="rgba(217,227,238,0.07)" />
        </pattern>
      </defs>
      <rect width="460" height="280" fill="url(#mapgrid)" />
      {/* roads */}
      <path d="M-10 210 C 90 190, 160 230, 250 205 S 420 150, 470 160" fill="none" stroke="var(--color-navy-600)" strokeWidth="14" strokeLinecap="round" />
      <path d="M120 -10 C 130 70, 110 130, 150 205" fill="none" stroke="var(--color-navy-700)" strokeWidth="9" strokeLinecap="round" />
      <path d="M150 205 C 200 190, 235 150, 262 118" fill="none" stroke="var(--color-gold-500)" strokeWidth="4" strokeDasharray="7 6" strokeLinecap="round" />
      {/* copse */}
      {[[348, 70], [378, 92], [352, 118], [404, 64], [408, 110], [372, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 13 : 17} fill="var(--color-moss-700)" opacity="0.85" />
      ))}
      {/* buildings */}
      <g stroke="var(--color-gold-300)" strokeWidth="1.6" fill="var(--color-navy-800)">
        <rect x="240" y="70" width="52" height="34" />
        <rect x="300" y="96" width="34" height="26" />
        <rect x="250" y="112" width="40" height="26" />
        <path d="M240 70 266 52 292 70" fill="var(--color-navy-800)" />
      </g>
      {/* pitches */}
      <rect x="150" y="52" width="64" height="42" fill="none" stroke="var(--color-moss-600)" strokeWidth="2" />
      <line x1="182" y1="52" x2="182" y2="94" stroke="var(--color-moss-600)" strokeWidth="1.5" />
      {/* pin */}
      <g>
        <circle cx="266" cy="87" r="22" fill="var(--color-gold-400)" opacity="0.15">
          <animate attributeName="r" values="16;26;16" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M266 66c-9 0-15 6.5-15 14.5 0 10 15 24 15 24s15-14 15-24C281 72.5 275 66 266 66Z" fill="var(--color-gold-400)" stroke="var(--color-navy-950)" strokeWidth="1.6" />
        <circle cx="266" cy="81" r="5" fill="var(--color-navy-950)" />
      </g>
      {/* labels */}
      <g fontFamily="Archivo, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.5" fill="var(--color-navy-200)">
        <text x="352" y="176" fill="var(--color-navy-400)">THE COPSE</text>
        <text x="150" y="44">TOP PITCH</text>
        <text x="36" y="236" fill="var(--color-gold-300)">A26 → TUNBRIDGE WELLS</text>
        <text x="128" y="252" fill="var(--color-navy-300)">HARTFIELD LANE</text>
        <text x="292" y="60" fill="var(--color-chalk-50)" fontSize="11">ASHGROVE ACADEMY</text>
        <text x="292" y="72" fill="var(--color-navy-300)" fontSize="8">MAIN GATE · VISITOR PARKING</text>
      </g>
      {/* compass */}
      <g transform="translate(424,32)" stroke="var(--color-gold-300)" strokeWidth="1.4">
        <circle r="14" fill="none" />
        <path d="M0 -9 4 5 0 2 -4 5Z" fill="var(--color-gold-300)" stroke="none" />
        <text x="-3" y="-17" fontFamily="Archivo, sans-serif" fontSize="9" fontWeight="700" fill="var(--color-gold-300)" stroke="none">N</text>
      </g>
    </svg>
  );
}

export default function Contact() {
  const cards = [
    { icon: IcPin, title: "Find us", lines: [SCHOOL.address, "Main gate & visitor parking on Hartfield Lane."] },
    { icon: IcPhone, title: "Ring the office", lines: [SCHOOL.phone, "Mon–Fri, 08:00–16:30 · out-of-hours: duty mobile"] },
    { icon: IcMail, title: "Write to us", lines: [SCHOOL.email, SCHOOL.admissionsEmail] },
    { icon: IcClock, title: "School hours", lines: ["Gates 08:00 · registration 08:30", "Clubs & prep to 16:30 · Sixth Form to 17:30"] },
  ];

  return (
    <>
      <PageHero
        kicker="Contact us"
        title={[<>The kettle's on —</>, <em key="c" className="font-display italic text-gold-300">come and talk</em>]}
        lede="Questions about admissions, fees, buses or the lunch menu — all welcome. The registrar's office answers within two working days, and tours run most Tuesday and Thursday mornings."
      />

      <section className="bg-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead kicker="Reach us" title={["Four ways", "in"]} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={i * 70} className="group border-2 border-navy-900/15 bg-chalk-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-navy-900 hover:shadow-[6px_6px_0_rgba(12,35,64,0.12)]">
                  <span className="grid h-11 w-11 place-items-center border-2 border-navy-900 text-navy-800 transition-colors group-hover:bg-gold-400">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-4 text-lg font-bold text-navy-900">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-1 break-words text-sm leading-relaxed text-ink/65">{l}</p>
                  ))}
                </Reveal>
              ))}
            </div>

            <Reveal delay={200} className="mt-10">
              <h3 className="kicker text-navy-600">Getting here</h3>
              <div className="mt-4 space-y-0 border-t-2 border-navy-900">
                {[
                  { icon: IcBus, k: "By bus", v: "Seven supervised school routes across Kent — see the downloads. Public 231 stops at the crossroads, 400m walk." },
                  { icon: IcPin, k: "By train", v: "Hartfield Halt (heritage line, summer weekends) or Tunbridge Wells mainline, 20 minutes by taxi." },
                  { icon: IcClock, k: "By car", v: "A26 to Hartfield Lane; visitor parking inside the main gate — arrive ten minutes early for the one-way." },
                ].map((r, i) => (
                  <div key={r.k} className="flex items-start gap-4 border-b-2 border-navy-900/15 py-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center bg-navy-900 text-gold-300"><r.icon className="h-4.5 w-4.5" /></span>
                    <div>
                      <p className="font-display font-bold text-navy-900">{r.k}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink/65">{r.v}</p>
                    </div>
                    <span className="ml-auto hidden font-display text-2xl font-bold text-navy-200 sm:block">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHead kicker="Say hello" title={["Send an", "enquiry"]} />
            <div className="mt-8">
              <EnquiryForm context="General" />
            </div>
            <Reveal delay={200} className="mt-10">
              <h3 className="kicker text-navy-600">The map, roughly</h3>
              <div className="mt-4">
                <GroveMap />
              </div>
              <p className="mt-2 text-xs text-ink/50">Not to scale. The copse is bigger than it looks; the one-way is stricter than it looks.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* safeguarding strip */}
      <section className="border-t-2 border-navy-900 bg-navy-950 text-chalk-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-display text-xl font-semibold sm:text-2xl">
            Safeguarding concern? <em className="italic text-gold-300">Skip the form.</em>
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-navy-200">
            Call the office and ask for Miss Reed, our Designated Safeguarding Lead, or write to{" "}
            <a href="mailto:safeguarding@ashgrove-academy.sch.uk" className="link-draw font-bold text-gold-300">safeguarding@ashgrove-academy.sch.uk</a>. Every concern is read the same day.
          </p>
        </div>
      </section>
    </>
  );
}
