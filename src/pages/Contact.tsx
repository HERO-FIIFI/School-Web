import React, { useState } from "react";
import { DEPT_DIRECTORY } from "../lib/data";
import { Field, inputCls, Reveal, SectionHead } from "../components/ui";
import { IcArrow, IcCheck, IcClock, IcMail, IcPhone, IcPin, IcSend } from "../components/icons";

/* stylised campus map */
function CampusMap() {
  return (
    <svg viewBox="0 0 560 380" className="w-full h-auto rounded-2xl border border-pine-900/10 shadow-card bg-pine-50" role="img" aria-label="Stylised map showing Aldercrest Academy on Alder Hill Road">
      <rect width="560" height="380" fill="#eef4ef" />
      {/* river */}
      <path d="M-10 300 C 120 260, 200 330, 330 300 S 520 250, 580 280" fill="none" stroke="#b5cfbc" strokeWidth="26" strokeLinecap="round" opacity="0.8" />
      {/* park */}
      <ellipse cx="450" cy="90" rx="95" ry="60" fill="#d9e6dc" />
      {[...Array(7)].map((_, i) => (
        <circle key={i} cx={400 + (i % 4) * 30} cy={70 + Math.floor(i / 4) * 28} r="9" fill="#8bb398" />
      ))}
      {/* roads */}
      <path d="M0 210 H560" stroke="#f7f6f0" strokeWidth="20" />
      <path d="M0 210 H560" stroke="#d5cfba" strokeWidth="2" strokeDasharray="10 12" />
      <path d="M170 0 V380" stroke="#f7f6f0" strokeWidth="16" />
      <path d="M170 0 V380" stroke="#d5cfba" strokeWidth="2" strokeDasharray="10 12" />
      <path d="M170 210 L 330 90" stroke="#f7f6f0" strokeWidth="14" />
      {/* blocks */}
      <rect x="40" y="60" width="80" height="50" rx="6" fill="#d9e6dc" stroke="#8bb398" />
      <rect x="230" y="240" width="90" height="55" rx="6" fill="#e6e2d3" stroke="#b3ab8e" />
      <rect x="360" y="230" width="70" height="45" rx="6" fill="#e6e2d3" stroke="#b3ab8e" />
      {/* school campus */}
      <rect x="210" y="55" width="130" height="100" rx="10" fill="#0d3327" />
      <rect x="228" y="72" width="40" height="30" rx="3" fill="#1e4732" />
      <rect x="280" y="72" width="42" height="44" rx="3" fill="#1e4732" />
      <rect x="228" y="112" width="60" height="26" rx="3" fill="#1e4732" />
      <circle cx="316" cy="130" r="10" fill="#e8a33d" />
      {/* pin */}
      <g transform="translate(275 30)">
        <path d="M0 42 C -16 24 -20 12 -12 2 A 17 17 0 0 1 12 2 C 20 12 16 24 0 42 Z" fill="#e8a33d" stroke="#0d3327" strokeWidth="2.5" />
        <circle cx="0" cy="12" r="5.5" fill="#0d3327" />
      </g>
      {/* labels */}
      <text x="275" y="195" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="15" fill="#f7f6f0">Aldercrest Academy</text>
      <text x="20" y="203" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="11" fill="#41544a">Alder Hill Road</text>
      <text x="178" y="368" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="11" fill="#41544a">Mill Lane</text>
      <text x="418" y="128" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="11" fill="#3d7355">Heron Park</text>
      <text x="60" y="330" fontFamily="Public Sans, sans-serif" fontWeight="600" fontSize="11" fill="#5e9273">River Alder</text>
      {/* compass */}
      <g transform="translate(515 40)">
        <circle r="18" fill="#f7f6f0" stroke="#0d3327" strokeWidth="2" />
        <path d="M0 -11 L4 4 L0 1 L-4 4 Z" fill="#0d3327" />
        <text y="13" textAnchor="middle" fontFamily="Public Sans, sans-serif" fontWeight="800" fontSize="8" fill="#0d3327">N</text>
      </g>
    </svg>
  );
}

type Form = { name: string; email: string; role: string; topic: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: "", email: "", role: "Parent", topic: "General question", message: "" });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof Form) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Form> = {};
    if (form.name.trim().length < 2) errs.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "That email doesn't look right.";
    if (form.message.trim().length < 10) errs.message = "Give us a little more to go on.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setDone(true);
    }, 800);
  };

  return (
    <>
      {/* header */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal><p className="kicker text-gold-300">Contact us</p></Reveal>
          <Reveal delay={90}>
            <h1 className="mt-4 font-display font-extrabold tracking-tight leading-[1.02] text-4xl sm:text-5xl lg:text-[3.2rem] max-w-3xl">
              A real person answers. <span className="text-gold-300">Usually Margaret.</span>
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-pine-100/85">
              The front desk opens at 07:30 on school days. For anything urgent outside those hours, the duty
              line goes straight to the Deputy Head's phone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* info + form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[1fr_1.25fr] gap-14">
        <div className="space-y-6">
          {[
            { icon: <IcPin className="w-5 h-5" />, title: "Visit", lines: ["42 Alder Hill Road, Aldercrest", "Main gate on Alder Hill Rd; visitor parking inside"] },
            { icon: <IcPhone className="w-5 h-5" />, title: "Call", lines: ["+1 (555) 014-2026 — front desk", "Duty line (emergencies): +1 (555) 014-2099"] },
            { icon: <IcMail className="w-5 h-5" />, title: "Write", lines: ["office@aldercrest.edu", "Replies within one school day"] },
            { icon: <IcClock className="w-5 h-5" />, title: "Office hours", lines: ["Mon–Fri 07:30–16:30 on school days", "Term-time only; holiday cover on the duty line"] },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="group flex gap-5 rounded-xl border border-pine-900/10 bg-white/70 p-6 hover:border-pine-700 hover:-translate-y-0.5 hover:shadow-card transition-all">
                <span className="shrink-0 w-12 h-12 rounded-xl bg-pine-900 text-gold-300 grid place-items-center group-hover:bg-gold-400 group-hover:text-pine-950 transition-colors">
                  {c.icon}
                </span>
                <span>
                  <span className="block font-display font-bold text-lg text-pine-950">{c.title}</span>
                  {c.lines.map((l) => (
                    <span key={l} className="block text-sm text-ink-soft mt-1">{l}</span>
                  ))}
                </span>
              </div>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <a
              href="https://maps.google.com/?q=Aldercrest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-bold text-pine-800 hover:text-gold-600 transition-colors group"
            >
              Get directions in your maps app <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          {done ? (
            <div className="h-full min-h-[420px] grid place-items-center rounded-2xl border border-gold-400/50 bg-gold-300/20 p-10 text-center">
              <div>
                <span className="inline-grid place-items-center w-16 h-16 rounded-full bg-pine-900 text-gold-300 mx-auto"><IcCheck className="w-7 h-7" /></span>
                <h3 className="mt-6 font-display font-bold text-2xl text-pine-950">Message sent — thank you.</h3>
                <p className="mt-3 text-ink-soft max-w-sm mx-auto">
                  It's with the front desk now. Expect a reply at <strong>{form.email}</strong> within one school day.
                </p>
                <button
                  onClick={() => { setDone(false); setForm({ name: "", email: "", role: "Parent", topic: "General question", message: "" }); }}
                  className="mt-7 rounded-full bg-pine-900 text-chalk-50 px-6 py-2.5 text-sm font-bold hover:bg-pine-800 transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="rounded-2xl border border-pine-900/10 bg-white/80 p-7 sm:p-9 space-y-5 shadow-card">
              <p className="font-display font-bold text-2xl text-pine-950">Send us a message</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" error={errors.name}>
                  <input className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. Sam Rivera" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@example.com" />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="You are a…">
                  <select className={inputCls} value={form.role} onChange={set("role")}>
                    {["Parent", "Prospective parent", "Student", "Alumnus", "Neighbour", "Other"].map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                <Field label="Topic">
                  <select className={inputCls} value={form.topic} onChange={set("topic")}>
                    {["General question", "Admissions & tours", "Transport & buses", "Billing & fees", "Safeguarding", "Press & media", "Lost property (again)"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Message" error={errors.message}>
                <textarea rows={5} className={inputCls} value={form.message} onChange={set("message")} placeholder="How can we help?" />
              </Field>
              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-pine-900 text-chalk-50 font-bold px-7 py-4 hover:bg-pine-800 transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {sending ? "Sending…" : <>Send message <IcSend className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </Reveal>
      </section>

      {/* map + directory */}
      <section className="relative bg-chalk-100 border-t border-pine-900/10">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <SectionHead kicker="Finding us" title={<>Up the hill, past the herons.</>} />
            <Reveal delay={120}>
              <div className="mt-8">
                <CampusMap />
              </div>
            </Reveal>
          </div>
          <div>
            <SectionHead kicker="Directory" title={<>Who to ask for.</>} />
            <Reveal delay={120}>
              <div className="mt-8 rounded-2xl border border-pine-900/10 bg-chalk-50 overflow-hidden shadow-card">
                {DEPT_DIRECTORY.map((dep, i) => (
                  <div key={dep.dept} className={`px-6 py-4 flex items-center justify-between gap-4 ${i % 2 ? "bg-pine-50/50" : ""}`}>
                    <div>
                      <p className="font-bold text-pine-950">{dep.dept}</p>
                      <p className="text-xs text-ink-soft mt-0.5">{dep.contact} · ext. {dep.ext}</p>
                    </div>
                    <a
                      href={`mailto:${dep.email}`}
                      className="shrink-0 text-sm font-semibold text-pine-800 hover:text-gold-600 transition-colors underline decoration-gold-400/60 underline-offset-4"
                    >
                      {dep.email.replace("@aldercrest.edu", "@…")}
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
