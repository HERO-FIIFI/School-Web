import React, { useMemo, useState } from "react";
import { ASSIGNMENTS, GRADES, PORTAL_NOTICES, RESOURCES, TIMETABLE, today } from "../lib/data";
import { daysUntil, fmtShort, fmtWeekday } from "../lib/hooks";
import { downloadPdf } from "../lib/pdf";
import { DownloadBtn, Field, inputCls, Reveal } from "../components/ui";
import { IcArrow, IcBell, IcCalendar, IcCheck, IcClock, IcDoc, IcEye, IcEyeOff, IcLogo, IcLogout, IcShield } from "../components/icons";

type Assignment = (typeof ASSIGNMENTS)[number];
type Tab = "overview" | "assignments" | "grades" | "resources";

const STUDENT = { name: "Amara Diallo", id: "OA-2031", grade: "Grade 12", house: "Whitfield House", initials: "AD" };

function Login({ onLogin }: { onLogin: () => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^OA-\d{4}$/.test(id.trim().toUpperCase())) {
      setError("Student ID looks like OA-2031.");
      setShake((s) => s + 1);
      return;
    }
    if (pw.length < 4) {
      setError("Passwords are at least 4 characters.");
      setShake((s) => s + 1);
      return;
    }
    setError(null);
    setBusy(true);
    setTimeout(onLogin, 800);
  };

  return (
    <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="absolute right-[-140px] bottom-[-160px] w-[460px] h-[460px] rounded-full border-[32px] border-pine-900/80 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.25fr_1fr] gap-14 items-center">
        <div>
          <Reveal><p className="kicker text-gold-300">Student portal</p></Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display font-extrabold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-[3.4rem]">
              Your day, <span className="text-gold-300">organised.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-pine-100/85">
              Timetable, assignments, grades and the notices that matter — everything between first bell and
              last bus, in one place.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ul className="mt-8 space-y-3.5">
              {[
                "Today's timetable, always up to date with room changes",
                "Assignment tracker with due dates and submission status",
                "Grades and progress, refreshed at each reporting point",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-pine-100/85">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-400 text-pine-950 grid place-items-center shrink-0"><IcCheck className="w-3 h-3" /></span>
                  <span className="text-[0.98rem]">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={330}>
            <div className="mt-9 inline-flex items-center gap-3 rounded-xl border border-gold-400/40 bg-pine-900/70 px-5 py-4">
              <IcShield className="w-5 h-5 text-gold-300 shrink-0" />
              <p className="text-sm text-pine-100/85">
                Demo login: <strong className="text-gold-300 font-display">OA-2031</strong> with any password of 4+ characters.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form
            key={shake}
            onSubmit={submit}
            noValidate
            className={`rounded-2xl border border-pine-800 bg-pine-900/70 p-8 ${shake ? "shake" : ""} [&_label_span]:text-pine-100 [&_input]:bg-pine-950/60 [&_input]:text-chalk-50 [&_input]:border-pine-700`}
          >
            <div className="flex items-center gap-3 pb-6 border-b border-pine-800">
              <IcLogo className="w-10 h-10" />
              <div>
                <p className="font-display font-bold text-lg leading-tight">Sign in</p>
                <p className="text-xs text-pine-100/60">Aldercrest student & family accounts</p>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <Field label="Student ID" error={undefined}>
                <input className={inputCls} value={id} onChange={(e) => { setId(e.target.value); setError(null); }} placeholder="OA-2031" />
              </Field>
              <Field label="Password" error={undefined}>
                <div className="relative">
                  <input type={show ? "text" : "password"} className={inputCls + " pr-12"} value={pw} onChange={(e) => { setPw(e.target.value); setError(null); }} placeholder="••••••••" />
                  <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pine-100/60 hover:text-gold-300 transition-colors">
                    {show ? <IcEyeOff className="w-4.5 h-4.5" /> : <IcEye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </Field>
              {error && (
                <p className="rounded-lg bg-pine-950 border border-gold-400/40 px-4 py-2.5 text-sm font-semibold text-gold-300">{error}</p>
              )}
              <button type="submit" disabled={busy} className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-400 text-pine-950 font-bold px-7 py-3.5 hover:bg-gold-300 transition-all active:scale-[0.98] disabled:opacity-60">
                {busy ? "Checking…" : <>Open my dashboard <IcArrow className="w-4 h-4" /></>}
              </button>
              <p className="text-center text-xs text-pine-100/55">
                Forgot your password? Ask the IT Help Desk — ext. 111, or helpdesk@aldercrest.edu.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Portal() {
  const [user, setUser] = useState<string | null>(() => sessionStorage.getItem("aldercrest-user"));
  const [tab, setTab] = useState<Tab>("overview");
  const [tasks, setTasks] = useState<Assignment[]>(ASSIGNMENTS);

  const dayName = useMemo(() => {
    const d = today.getDay();
    if (d === 0) return "Monday";
    if (d === 6) return "Friday";
    return fmtWeekday(today);
  }, []);

  if (!user) {
    return (
      <Login
        onLogin={() => {
          sessionStorage.setItem("aldercrest-user", STUDENT.id);
          setUser(STUDENT.id);
        }}
      />
    );
  }

  const timetable = TIMETABLE[dayName];
  const dueSoon = [...tasks]
    .filter((t) => t.status === "open" && daysUntil(t.due) >= 0)
    .sort((a, b) => a.due.getTime() - b.due.getTime());
  const submittedCount = tasks.filter((t) => t.status !== "open").length;
  const pct = Math.round((submittedCount / tasks.length) * 100);
  const gpa = (GRADES.reduce((s, g) => s + g.pct, 0) / GRADES.length).toFixed(1);

  const toggleSubmit = (id: string) =>
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, status: t.status === "open" ? "submitted" : "open" } : t))
    );

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "assignments", label: `Assignments (${dueSoon.length} open)` },
    { id: "grades", label: "Grades" },
    { id: "resources", label: "Resources" },
  ];

  return (
    <>
      {/* dashboard header */}
      <section className="relative bg-pine-950 text-chalk-50 noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-full bg-gold-400 text-pine-950 font-display font-extrabold text-xl grid place-items-center">{STUDENT.initials}</span>
              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-gold-300">
                  {fmtWeekday(today)}, {fmtShort(today)} · Welcome back
                </p>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">{STUDENT.name}</h1>
                <p className="text-sm text-pine-100/70">{STUDENT.grade} · {STUDENT.house} · {STUDENT.id}</p>
              </div>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem("aldercrest-user");
                setUser(null);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-pine-700 px-5 py-2.5 text-sm font-bold hover:bg-pine-900 transition-colors"
            >
              <IcLogout className="w-4 h-4" /> Sign out
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                  tab === t.id ? "bg-gold-400 text-pine-950" : "border border-pine-700 text-pine-100 hover:bg-pine-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* ---------- OVERVIEW ---------- */}
        {tab === "overview" && (
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
            <Reveal>
              <div className="rounded-2xl border border-pine-900/10 bg-white/80 shadow-card overflow-hidden">
                <div className="px-6 py-4 bg-pine-900 text-chalk-50 flex items-center justify-between">
                  <p className="font-display font-bold flex items-center gap-2.5"><IcCalendar className="w-4 h-4 text-gold-300" /> Today's timetable — {dayName}</p>
                  <p className="text-xs text-pine-100/60">{today.getDay() === 0 || today.getDay() === 6 ? "Weekend: showing nearest school day" : "Live"}</p>
                </div>
                <ul className="divide-y divide-pine-900/5">
                  {timetable.map((p, i) => (
                    <li key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-pine-50/70 transition-colors">
                      <span className="shrink-0 w-1.5 h-10 rounded-full" style={{ background: p.color }} />
                      <span className="w-32 shrink-0 text-sm font-bold text-pine-900">{p.time}</span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-pine-950">{p.subject}</span>
                        <span className="block text-xs text-ink-soft mt-0.5">{p.room}</span>
                      </span>
                      <span className="ml-auto text-[0.68rem] font-extrabold uppercase tracking-wider text-pine-800/50">P{i + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <div className="space-y-6">
              <Reveal delay={100}>
                <div className="rounded-2xl border border-pine-900/10 bg-white/80 shadow-card p-6">
                  <p className="font-display font-bold text-pine-950 flex items-center gap-2.5"><IcClock className="w-4 h-4 text-gold-600" /> Due soon</p>
                  <ul className="mt-4 space-y-3">
                    {dueSoon.slice(0, 4).map((t) => (
                      <li key={t.id} className="flex items-center justify-between gap-3 rounded-lg border border-pine-900/10 px-4 py-3">
                        <span className="min-w-0">
                          <span className="block text-[0.66rem] font-extrabold uppercase tracking-wider text-gold-600">{t.subject}</span>
                          <span className="block text-sm font-semibold text-pine-950 truncate">{t.title}</span>
                        </span>
                        <span className={`shrink-0 text-xs font-bold rounded-full px-3 py-1 ${daysUntil(t.due) <= 2 ? "bg-gold-300/60 text-gold-600" : "bg-pine-50 text-pine-800"}`}>
                          {daysUntil(t.due) === 0 ? "today" : daysUntil(t.due) === 1 ? "tomorrow" : `in ${daysUntil(t.due)}d`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="rounded-2xl border border-pine-900/10 bg-pine-950 text-chalk-50 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-dots opacity-25" />
                  <p className="relative font-display font-bold flex items-center gap-2.5"><IcBell className="w-4 h-4 text-gold-300" /> Notices</p>
                  <ul className="relative mt-4 space-y-3">
                    {PORTAL_NOTICES.map((n) => (
                      <li key={n} className="flex items-start gap-3 text-sm text-pine-100/85">
                        <span className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-gold-400 shrink-0" /> {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        )}

        {/* ---------- ASSIGNMENTS ---------- */}
        {tab === "assignments" && (
          <div className="max-w-4xl">
            <Reveal>
              <div className="rounded-2xl border border-pine-900/10 bg-white/80 shadow-card p-6 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display font-bold text-pine-950">Submission progress</p>
                  <p className="font-display font-extrabold text-xl text-gold-600">{pct}%</p>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-pine-100 overflow-hidden">
                  <div className="h-full rounded-full bg-pine-800 transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2.5 text-sm text-ink-soft">{submittedCount} of {tasks.length} pieces submitted or graded this term.</p>
              </div>
            </Reveal>
            <div className="space-y-3">
              {tasks.map((t, i) => (
                <Reveal key={t.id} delay={i * 50}>
                  <div className="flex flex-wrap items-center gap-4 rounded-xl border border-pine-900/10 bg-white/80 px-5 py-4 hover:border-pine-700 transition-colors">
                    <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${t.status === "open" ? "bg-gold-400" : t.status === "submitted" ? "bg-pine-500" : "bg-pine-900"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.66rem] font-extrabold uppercase tracking-wider text-pine-600">{t.subject}</span>
                      <span className="block font-semibold text-pine-950">{t.title}</span>
                    </span>
                    <span className="text-sm text-ink-soft">
                      Due <strong className="text-pine-900">{fmtShort(t.due)}</strong>
                    </span>
                    {t.status === "graded" && (
                      <span className="rounded-full bg-pine-900 text-gold-300 text-xs font-extrabold px-3 py-1.5">Graded · {t.grade}</span>
                    )}
                    {t.status === "submitted" && (
                      <span className="rounded-full bg-pine-100 text-pine-800 text-xs font-extrabold px-3 py-1.5">Submitted</span>
                    )}
                    {t.status === "open" && (
                      <button
                        onClick={() => toggleSubmit(t.id)}
                        className="rounded-full bg-gold-400 text-pine-950 text-xs font-extrabold px-4 py-2 hover:bg-gold-300 transition-all active:scale-95"
                      >
                        Mark submitted
                      </button>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---------- GRADES ---------- */}
        {tab === "grades" && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start max-w-5xl">
            <Reveal>
              <div className="rounded-2xl border border-pine-900/10 bg-white/80 shadow-card overflow-hidden">
                <div className="px-6 py-4 bg-pine-900 text-chalk-50 font-display font-bold">Current standing · Term 2, checkpoint 2</div>
                <ul className="divide-y divide-pine-900/5">
                  {GRADES.map((g) => (
                    <li key={g.subject} className="px-6 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          <span className="block font-semibold text-pine-950">{g.subject}</span>
                          <span className="block text-xs text-ink-soft mt-0.5">{g.teacher}</span>
                        </span>
                        <span className="flex items-center gap-4">
                          <span className="w-36 hidden sm:block h-2 rounded-full bg-pine-100 overflow-hidden">
                            <span className="block h-full rounded-full bg-pine-800" style={{ width: `${g.pct}%` }} />
                          </span>
                          <span className="text-sm font-bold text-pine-900 w-10 text-right">{g.pct}%</span>
                          <span className="w-10 h-10 rounded-lg bg-pine-50 border border-pine-900/10 grid place-items-center font-display font-extrabold text-pine-900">{g.letter}</span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl bg-pine-950 text-chalk-50 p-7 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-25" />
                <p className="relative text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-gold-300">Average</p>
                <p className="relative mt-3 font-display font-extrabold text-6xl tracking-tight">{gpa}<span className="text-2xl text-pine-100/60">%</span></p>
                <p className="relative mt-3 text-sm text-pine-100/75">Top of the year group by 1.8 points. Keep going, quietly.</p>
                <p className="relative mt-5 text-xs text-pine-100/50">Next reporting point: end of term</p>
              </div>
            </Reveal>
          </div>
        )}

        {/* ---------- RESOURCES ---------- */}
        {tab === "resources" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.file} delay={i * 60}>
                <div className="group rounded-xl border border-pine-900/10 bg-white/80 p-6 flex flex-col h-full hover:border-pine-700 hover:-translate-y-1 hover:shadow-card transition-all">
                  <span className="w-11 h-11 rounded-lg bg-pine-900 text-gold-300 grid place-items-center group-hover:bg-gold-400 group-hover:text-pine-950 transition-colors">
                    <IcDoc className="w-5 h-5" />
                  </span>
                  <p className="mt-4 font-bold text-pine-950 leading-snug">{r.title}</p>
                  <p className="mt-1 text-xs text-ink-soft">{r.type} · {r.meta}</p>
                  <div className="mt-auto pt-5">
                    <DownloadBtn onClick={() => downloadPdf(r.file, r.title, r.lines)} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
