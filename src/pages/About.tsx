import { Link } from "react-router-dom";
import { ACCREDITATIONS, CAMPUS_FACTS, IMG, LEADERSHIP, MILESTONES, VALUES } from "../lib/data";
import { Reveal, SectionHead, StatBlock } from "../components/ui";
import { DEPT_ICONS, IcArrow, IcLogo, IcShield } from "../components/icons";

export default function About() {
  return (
    <>
      {/* header band */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute right-[-140px] top-[-140px] w-[440px] h-[440px] rounded-full border-[30px] border-pine-900/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <Reveal><p className="kicker text-gold-300">About us</p></Reveal>
            <Reveal delay={90}>
              <h1 className="mt-5 font-display font-extrabold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-[3.6rem]">
                A school with roots,
                <br />
                and <span className="text-gold-300">reach.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-pine-100/85">
                Founded in 1962 with 34 pupils and a borrowed piano, Aldercrest has grown into a K–12 community
                of 1,140 — without ever losing the habit of knowing every child by name.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                {ACCREDITATIONS.map((a) => (
                  <span key={a} className="inline-flex items-center gap-2 rounded-full border border-pine-700 bg-pine-900/60 px-4 py-2 text-xs font-bold text-pine-100">
                    <IcShield className="w-3.5 h-3.5 text-gold-300" /> {a}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-3 translate-x-5 translate-y-5 rounded-xl border-2 border-gold-400/60" />
              <img src={IMG.library} alt="The Whitmore Library" className="relative rounded-xl border-4 border-pine-900 shadow-lift w-full h-[380px] object-cover" />
              <p className="absolute bottom-4 left-4 bg-pine-950/85 backdrop-blur rounded-full px-4 py-1.5 text-xs font-bold text-gold-300">
                The Whitmore Library · since 1971
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* mission & values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1fr_1.25fr] gap-14">
        <div className="lg:sticky lg:top-28 self-start">
          <SectionHead
            kicker="Mission & values"
            title={<>Four words we keep coming back to.</>}
            body="They're painted in the Founders Hall archway and they're on every report card: Rooted, Curious, Kind, Brave. Not a slogan — a marking scheme."
          />
          <Reveal delay={160}>
            <div className="mt-8 rounded-xl bg-pine-950 text-chalk-50 p-7 relative overflow-hidden">
              <IcLogo className="absolute -right-4 -bottom-4 w-28 h-28 opacity-20" />
              <p className="kicker text-gold-300">Our mission</p>
              <p className="mt-4 font-display font-semibold text-xl leading-snug">
                To send young people into the world well-rooted and wide-awake — scholars, makers, neighbours.
              </p>
            </div>
          </Reveal>
        </div>
        <div>
          {VALUES.map((v, i) => {
            const Icon = DEPT_ICONS[v.icon];
            return (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group flex gap-6 border-t border-pine-900/10 py-8 hover:bg-pine-50/70 rounded-xl px-4 -mx-4 transition-colors">
                  <span className="shrink-0 w-14 h-14 rounded-xl bg-pine-900 text-gold-300 grid place-items-center group-hover:bg-gold-400 group-hover:text-pine-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-display font-extrabold text-2xl text-pine-950 tracking-tight">{v.title}</span>
                      <span className="text-[0.68rem] font-extrabold text-pine-900/40">0{i + 1}</span>
                    </span>
                    <span className="mt-2 block max-w-lg text-ink-soft leading-relaxed">{v.body}</span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* timeline */}
      <section className="relative bg-pine-950 text-chalk-50 noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <SectionHead dark kicker="Since 1962" title={<>Sixty-odd years, eight turning points.</>} />
          <div className="mt-14 relative">
            <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-pine-800" />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 60}>
                <div className={`relative grid sm:grid-cols-2 gap-4 sm:gap-14 pb-12 ${i % 2 ? "sm:text-left" : "sm:text-right"}`}>
                  <span className="absolute left-[19px] sm:left-1/2 -translate-x-1/2 top-1.5 w-4 h-4 rounded-full bg-gold-400 border-4 border-pine-950" />
                  <div className={`pl-12 sm:pl-0 ${i % 2 ? "sm:col-start-2 sm:pl-10" : "sm:col-start-1 sm:pr-10"}`}>
                    <p className="font-display font-extrabold text-3xl text-gold-300 leading-none">{m.year}</p>
                    <p className="mt-2 font-bold text-lg">{m.title}</p>
                    <p className="mt-1.5 text-sm text-pine-100/75 leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            kicker="Leadership"
            title={<>The people out front.</>}
            body="Six leaders, one corridor — the Head's door is genuinely open, and the coffee machine is genuinely broken."
          />
          <Reveal delay={120}>
            <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-pine-800 hover:text-gold-600 transition-colors group">
              Contact any office <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div className="group rounded-xl border border-pine-900/10 bg-white/70 p-6 hover:border-pine-700 hover:-translate-y-1 hover:shadow-card transition-all">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-pine-900 text-gold-300 font-display font-extrabold grid place-items-center text-lg group-hover:bg-gold-400 group-hover:text-pine-950 transition-colors">
                    {p.initials}
                  </span>
                  <span>
                    <span className="block font-display font-bold text-lg text-pine-950 leading-tight">{p.name}</span>
                    <span className="block text-[0.7rem] font-extrabold uppercase tracking-wider text-gold-600 mt-1">{p.role}</span>
                  </span>
                </div>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed">{p.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* campus facts */}
      <section className="relative bg-pine-900 text-chalk-50 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {CAMPUS_FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 80}>
              <StatBlock value={f.value} suffix={f.suffix} label={f.label} dark />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
