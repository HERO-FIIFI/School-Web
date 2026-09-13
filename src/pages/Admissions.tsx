import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ADMISSION_STEPS, EVENTS, FAQS, KEY_DATES, RESOURCES, TUITION } from "../lib/data";
import { fmtShort, fmtWeekday } from "../lib/hooks";
import { Accordion, Field, inputCls, Reveal, SectionHead } from "../components/ui";
import { IcArrow, IcCalendar, IcCheck, IcClock, IcSend, IcShield } from "../components/icons";

type FormState = {
  parent: string;
  email: string;
  phone: string;
  grade: string;
  term: string;
  message: string;
};

export default function Admissions() {
  const [form, setForm] = useState<FormState>({ parent: "", email: "", phone: "", grade: "", term: "Fall 2026", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const tours = EVENTS.filter((e) => e.type === "Admissions").sort((a, b) => a.date.getTime() - b.date.getTime());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<FormState> = {};
    if (form.parent.trim().length < 2) errs.parent = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "That email doesn't look right.";
    if (!form.grade) errs.grade = "Choose an entry grade.";
    if (form.message.trim().length < 10) errs.message = "A sentence or two helps us route your enquiry.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setRef(`ENQ-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 900);
  };

  const set = (k: keyof FormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  return (
    <>
      {/* header */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute right-[-120px] bottom-[-160px] w-[420px] h-[420px] rounded-full border-[30px] border-pine-900/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <Reveal><p className="kicker text-gold-300">Admissions · Fall 2026 entry</p></Reveal>
            <Reveal delay={90}>
              <h1 className="mt-5 font-display font-extrabold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-[3.4rem]">
                Five steps, no mystery,
                <br />
                <span className="text-gold-300">no tricks.</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-pine-100/85">
                Around 38% of our students join with a means-tested bursary, and every offer is made before
                family finances are discussed. Here is the whole process, start to finish.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="inline-flex items-center gap-2.5 rounded-full bg-gold-400 text-pine-950 font-bold px-7 py-3.5 hover:bg-gold-300 transition-all active:scale-[0.97]"
                >
                  Make an enquiry <IcArrow className="w-4 h-4" />
                </button>
                <Link to="/contact" className="inline-flex items-center gap-2.5 rounded-full border border-chalk-100/30 px-7 py-3.5 font-semibold hover:bg-chalk-50 hover:text-pine-950 transition-all">
                  Talk to the office
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="rounded-2xl border border-pine-800 bg-pine-900/70 p-6">
              <p className="flex items-center gap-2.5 font-bold text-gold-300"><IcCalendar className="w-4 h-4" /> Upcoming admissions events</p>
              <ul className="mt-4 space-y-3">
                {tours.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-4 rounded-lg bg-pine-950/60 border border-pine-800 px-4 py-3">
                    <span>
                      <span className="block text-sm font-bold">{t.title}</span>
                      <span className="block text-xs text-pine-100/60 mt-0.5">{fmtWeekday(t.date)} {fmtShort(t.date)} · {t.time}</span>
                    </span>
                    <span className="shrink-0 text-[0.65rem] font-extrabold uppercase tracking-wider text-gold-300 border border-gold-400/40 rounded-full px-2.5 py-1">Register</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <SectionHead kicker="How it works" title={<>The admissions journey, step by step.</>} />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {ADMISSION_STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 80}>
              <div className="group relative rounded-xl border border-pine-900/10 bg-white/70 p-6 h-full hover:border-pine-700 hover:-translate-y-1 hover:shadow-card transition-all">
                {i < 4 && <span className="hidden lg:block absolute top-1/2 -right-3.5 z-10 text-pine-300"><IcArrow className="w-5 h-5" /></span>}
                <span className="inline-grid place-items-center w-11 h-11 rounded-full bg-pine-900 text-gold-300 font-display font-extrabold group-hover:bg-gold-400 group-hover:text-pine-950 transition-colors">
                  {s.step}
                </span>
                <h3 className="mt-4 font-display font-bold text-xl text-pine-950">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.body}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-gold-600">
                  <IcClock className="w-3.5 h-3.5" /> {s.when}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* key dates + tuition */}
      <section className="relative bg-chalk-100 border-y border-pine-900/10">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-2 gap-14">
          <div>
            <SectionHead kicker="Key dates" title={<>Write these down.</>} />
            <Reveal delay={120}>
              <div className="mt-10 rounded-2xl border border-pine-900/10 bg-chalk-50 overflow-hidden shadow-card">
                {KEY_DATES.map((kd, i) => (
                  <div key={kd.label} className={`flex items-center gap-5 px-6 py-4 ${i % 2 ? "bg-pine-50/50" : ""}`}>
                    <span className="shrink-0 w-28 font-display font-extrabold text-pine-900">{kd.date}</span>
                    <span className="w-2 h-2 rotate-45 bg-gold-400 shrink-0" />
                    <span className="font-medium text-pine-950">{kd.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div>
            <SectionHead kicker="Tuition & fees" title={<>What it costs, plainly.</>} />
            <Reveal delay={120}>
              <div className="mt-10 rounded-2xl border border-pine-900/10 bg-chalk-50 overflow-hidden shadow-card">
                {TUITION.map((t, i) => (
                  <div key={t.stage} className={`px-6 py-5 ${i % 2 ? "bg-pine-50/50" : ""}`}>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-display font-bold text-pine-950">{t.stage}</p>
                      <p className="font-display font-extrabold text-xl text-gold-600 whitespace-nowrap">{t.annual}<span className="text-xs text-ink-soft font-body font-semibold"> /yr</span></p>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">Includes: {t.includes}</p>
                  </div>
                ))}
                <div className="px-6 py-4 bg-pine-900 text-chalk-50 flex items-start gap-3">
                  <IcShield className="w-5 h-5 text-gold-300 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong className="text-gold-300">Bursaries:</strong> 38% of students receive means-tested support,
                    up to 100% of fees. Offers are made before need is assessed.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <SectionHead kicker="Questions, answered" title={<>What families ask us most.</>} />
        <Reveal delay={120}>
          <div className="mt-10">
            <Accordion items={FAQS.map((f) => ({ title: f.q, body: f.a }))} defaultOpen={0} />
          </div>
        </Reveal>
      </section>

      {/* enquiry form */}
      <section id="enquiry" className="relative bg-pine-950 text-chalk-50 noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-[1fr_1.3fr] gap-14">
          <div>
            <SectionHead
              dark
              kicker="Enquiry form"
              title={<>Say hello first. Paperwork later.</>}
              body="Tell us a little about your child and we'll reply within two school days with a prospectus, tour dates and answers to anything you asked."
            />
            <Reveal delay={160}>
              <ul className="mt-8 space-y-3 text-sm">
                {["Reply within two school days, from a human", "Student half-day shadowing arranged with every tour", "Bursary guidance available at any stage — confidentially"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-400 text-pine-950 grid place-items-center shrink-0"><IcCheck className="w-3 h-3" /></span>
                    <span className="text-pine-100/85">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {ref ? (
              <div className="rounded-2xl border border-gold-400/40 bg-pine-900/70 p-10 text-center">
                <span className="inline-grid place-items-center w-16 h-16 rounded-full bg-gold-400 text-pine-950 mx-auto"><IcCheck className="w-7 h-7" /></span>
                <h3 className="mt-6 font-display font-bold text-2xl">Enquiry received — thank you.</h3>
                <p className="mt-3 text-pine-100/80">
                  Your reference is <strong className="text-gold-300 font-display">{ref}</strong>. Mrs. Bello's team will
                  write to <strong className="text-chalk-50">{form.email || "your inbox"}</strong> within two school days.
                </p>
                <button
                  onClick={() => { setRef(null); setForm({ parent: "", email: "", phone: "", grade: "", term: "Fall 2026", message: "" }); }}
                  className="mt-7 rounded-full border border-chalk-100/30 px-6 py-2.5 text-sm font-bold hover:bg-chalk-50 hover:text-pine-950 transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-2xl border border-pine-800 bg-pine-900/70 p-7 sm:p-9 space-y-5 [&_label_span]:text-pine-100 [&_input]:bg-pine-950/60 [&_input]:text-chalk-50 [&_input]:border-pine-700 [&_select]:bg-pine-950/60 [&_select]:text-chalk-50 [&_select]:border-pine-700 [&_textarea]:bg-pine-950/60 [&_textarea]:text-chalk-50 [&_textarea]:border-pine-700">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Parent / guardian name" error={errors.parent}>
                    <input className={inputCls} value={form.parent} onChange={set("parent")} placeholder="e.g. Jordan Ellis" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@example.com" />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone (optional)">
                    <input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+1 (555) …" />
                  </Field>
                  <Field label="Entry grade" error={errors.grade}>
                    <select className={inputCls} value={form.grade} onChange={set("grade")}>
                      <option value="">Select a grade…</option>
                      {["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"].map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Preferred start">
                  <select className={inputCls} value={form.term} onChange={set("term")}>
                    <option>Fall 2026</option>
                    <option>Spring 2027 (mid-year, space permitting)</option>
                    <option>Fall 2027</option>
                  </select>
                </Field>
                <Field label="Anything we should know?" error={errors.message}>
                  <textarea rows={4} className={inputCls} value={form.message} onChange={set("message")} placeholder="Interests, questions, a sibling at the school…" />
                </Field>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-400 text-pine-950 font-bold px-7 py-4 hover:bg-gold-300 transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {sending ? "Sending…" : <>Send enquiry <IcSend className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* resources strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-pine-900/10 bg-white/70 px-7 py-6">
            <div>
              <p className="kicker text-pine-600">Helpful downloads</p>
              <p className="mt-2 font-display font-bold text-xl text-pine-950">The Bursary Guide and Course Catalog answer most questions.</p>
            </div>
            <Link to="/academics" className="inline-flex items-center gap-2 rounded-full bg-pine-900 text-chalk-50 font-bold px-6 py-3 hover:bg-pine-800 transition-colors">
              Resource library <IcArrow className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
