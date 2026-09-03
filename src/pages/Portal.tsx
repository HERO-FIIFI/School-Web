import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Crest } from "../components/icons";
import { IcCheck, IcDownload, IcInfo, IcLogout } from "../components/icons";
import { Reveal } from "../components/ui";
import { useLocalStorage, useNow } from "../lib/hooks";
import {
  assignments, bellSchedule, currentPeriod, downloadResource, fmtShort, fmtWeekday, gradeBand, grades,
  portalNotices, portalTimetable, resources,
} from "../lib/data";

interface Session {
  name: string;
  email: string;
}

/* ================= login ================= */
function Login({ onLogin }: { onLogin: (s: Session) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter your school email.";
    if (password.length < 6) errs.password = "At least six characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    window.setTimeout(() => {
      const local = email.split("@")[0];
      const pretty = local
        .split(/[._-]/)
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
      onLogin({ name: pretty || "Amara Osei", email });
    }, 800);
  };

  return (
    <section className="blueprint relative overflow-hidden bg-navy-950 text-chalk-50">
      <div className="pointer-events-none absolute -right-28 -top-28 h-[24rem] w-[24rem] rounded-full border-[30px] border-navy-800/50" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="kicker flex items-center gap-3 text-gold-300">
            <span className="inline-block h-px w-8 bg-gold-400" /> Student Portal · pupil & staff access
          </p>
          <h1 className="font-display mt-5 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl">
            Your day, <em className="italic text-gold-300">at a glance.</em>
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-navy-200">
            Timetable, homework, grades and the notices that actually matter — assembled before the first bell.
          </p>
          <ul className="mt-8 space-y-3">
            {["Live timetable with room changes", "Assignments with due dates and tick-offs", "Term grades, reported the way tutors mean them", "Exam dates and downloadable resources"].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm font-semibold text-navy-100">
                <span className="grid h-6 w-6 shrink-0 place-items-center bg-gold-400 text-navy-950"><IcCheck className="h-3.5 w-3.5" /></span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="border-2 border-navy-700 bg-navy-900 p-7 shadow-[10px_10px_0_rgba(229,178,82,0.25)] sm:p-9">
          <div className="flex items-center gap-4">
            <Crest className="h-12 w-auto" />
            <div>
              <p className="font-display text-2xl font-bold">Sign in</p>
              <p className="text-xs tracking-wide text-navy-300 uppercase">Ashgrove single sign-on</p>
            </div>
          </div>
          <form onSubmit={submit} noValidate className="mt-7 space-y-5">
            <div>
              <label htmlFor="p-email" className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-200 uppercase">School email</label>
              <input
                id="p-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="a.osei@ashgrove-pupil.sch.uk"
                className={`w-full border bg-navy-950 px-4 py-3 text-chalk-50 placeholder:text-navy-500 focus:outline-none ${errors.email ? "border-crimson-600" : "border-navy-700 focus:border-gold-400"}`}
              />
              {errors.email && <p className="mt-1.5 text-xs font-semibold text-gold-300">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="p-pass" className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-200 uppercase">Password</label>
              <input
                id="p-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border bg-navy-950 px-4 py-3 text-chalk-50 placeholder:text-navy-500 focus:outline-none ${errors.password ? "border-crimson-600" : "border-navy-700 focus:border-gold-400"}`}
              />
              {errors.password && <p className="mt-1.5 text-xs font-semibold text-gold-300">{errors.password}</p>}
            </div>
            <button type="submit" disabled={busy} className="btn btn-gold w-full disabled:opacity-60">
              {busy ? "Checking the register…" : "Enter the portal"}
            </button>
          </form>
          <p className="mt-5 flex items-start gap-2.5 border-t border-navy-800 pt-4 text-xs leading-relaxed text-navy-300">
            <IcInfo className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <span><span className="font-bold text-navy-100">Demonstration build</span> — any school-style email plus a password of 6+ characters signs you in as a Year 9 pupil. Forgotten passwords go to your tutor, as ever.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= dashboard ================= */
type Tab = "Today" | "Timetable" | "Assignments" | "Grades" | "Resources";
const tabs: Tab[] = ["Today", "Timetable", "Assignments", "Grades", "Resources"];

function Dashboard({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const now = useNow(20000);
  const [tab, setTab] = useState<Tab>("Today");
  const [day, setDay] = useState(0);
  const [done, setDone] = useLocalStorage<string[]>("ag-portal-done", []);
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const bell = currentPeriod(now);
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = session.name.split(" ")[0];

  const toggle = (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));

  const sortedAssignments = useMemo(() => [...assignments].sort((a, b) => a.due.getTime() - b.due.getTime()), []);
  const visible = sortedAssignments.filter((a) => (filter === "all" ? true : filter === "done" ? done.includes(a.id) : !done.includes(a.id)));
  const progress = Math.round((done.filter((id) => assignments.some((a) => a.id === id)).length / assignments.length) * 100);
  const avg = Math.round(grades.reduce((s, g) => s + (g.t1 + g.t2) / 2, 0) / grades.length);

  return (
    <section className="bg-chalk-100">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {/* header row */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-navy-900 pb-6">
          <div>
            <p className="kicker text-gold-600">{fmtWeekday(now)} · {fmtShort(now)}</p>
            <h1 className="font-display mt-2 text-4xl font-bold text-navy-900 sm:text-5xl">
              {greeting}, <em className="italic text-gold-600">{firstName}.</em>
            </h1>
            <p className="mt-2 text-sm font-semibold tracking-wide text-navy-500 uppercase">{session.name} · Year 9, Fern House · AG-2614</p>
          </div>
          <div className="flex items-center gap-3">
            <span key={bell.label} className="rise hidden items-center gap-2.5 border-2 border-navy-900 bg-chalk-50 px-4 py-2.5 sm:flex">
              <span className="pulse-dot h-2 w-2 rounded-full bg-gold-500" />
              <span className="text-xs font-bold tracking-wide text-navy-800 uppercase">{bell.label}</span>
            </span>
            <button onClick={onLogout} className="btn btn-navy !px-4 !py-2.5">
              <IcLogout className="h-4 w-4" /> Sign out
            </button>
          </div>
        </Reveal>

        {/* tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cursor-pointer border px-4 py-2.5 text-[0.72rem] font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                tab === t
                  ? "border-navy-900 bg-navy-900 text-gold-300 shadow-[4px_4px_0_rgba(217,161,59,0.55)]"
                  : "border-navy-900/25 bg-chalk-50 text-navy-700 hover:border-navy-900"
              }`}
            >
              {t}
              {t === "Assignments" && <span className="ml-2 text-gold-500">{assignments.length - done.filter((id) => assignments.some((a) => a.id === id)).length}</span>}
            </button>
          ))}
        </div>

        {/* ===== TODAY ===== */}
        {tab === "Today" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="border-2 border-navy-900 bg-chalk-50">
              <div className="flex items-center justify-between border-b-2 border-navy-900 bg-navy-950 px-5 py-3.5">
                <h2 className="font-display text-xl font-bold text-chalk-50">The bell schedule</h2>
                <span className="kicker !text-[0.6rem] text-gold-300">Live</span>
              </div>
              <ul className="divide-y divide-navy-900/10">
                {bellSchedule.map((p) => {
                  const isNow = bell.current?.name === p.name;
                  return (
                    <li key={p.name} className={`flex items-center gap-4 px-5 py-3 transition-colors ${isNow ? "border-l-4 border-gold-500 bg-gold-100" : ""}`}>
                      <span className="w-24 shrink-0 font-mono text-xs font-bold text-navy-500">{p.start}–{p.end}</span>
                      <span className={`flex-1 font-display text-[1.02rem] font-semibold ${isNow ? "text-navy-950" : "text-navy-800"}`}>{p.name}</span>
                      {isNow && <span className="kicker bg-navy-950 px-2.5 py-1 !text-[0.55rem] text-gold-300">Now</span>}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <div className="flex flex-col gap-8">
              <Reveal delay={100} className="border-2 border-navy-900 bg-navy-950 text-chalk-50">
                <h2 className="border-b border-navy-800 px-5 py-3.5 font-display text-xl font-bold">Noticeboard</h2>
                <ul className="divide-y divide-navy-800/80">
                  {portalNotices.slice(0, 3).map((n) => (
                    <li key={n.title} className="px-5 py-4">
                      <p className="flex items-center gap-3">
                        <span className="kicker bg-gold-400 px-2 py-0.5 !text-[0.55rem] text-navy-950">{n.tag}</span>
                        <span className="font-display font-bold">{n.title}</span>
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-navy-300">{n.body}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={180} className="border-2 border-navy-900 bg-chalk-50">
                <h2 className="border-b-2 border-navy-900 px-5 py-3.5 font-display text-xl font-bold text-navy-900">Due next</h2>
                <ul className="divide-y divide-navy-900/10">
                  {sortedAssignments.slice(0, 3).map((a) => {
                    const isDone = done.includes(a.id);
                    return (
                      <li key={a.id} className="flex items-center gap-4 px-5 py-3.5">
                        <button
                          onClick={() => toggle(a.id)}
                          aria-label={`Mark ${a.title} ${isDone ? "open" : "done"}`}
                          className={`grid h-6 w-6 shrink-0 cursor-pointer place-items-center border-2 transition-colors ${isDone ? "border-moss-600 bg-moss-600 text-chalk-50" : "border-navy-900/40 bg-chalk-50 hover:border-gold-500"}`}
                        >
                          {isDone && <IcCheck className="h-3.5 w-3.5" />}
                        </button>
                        <span className="min-w-0 flex-1">
                          <span className={`block truncate text-sm font-bold ${isDone ? "text-navy-400 line-through" : "text-navy-900"}`}>{a.subject} — {a.title}</span>
                          <span className="text-xs font-semibold tracking-wide text-navy-500 uppercase">Due {fmtWeekday(a.due)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </div>
          </div>
        )}

        {/* ===== TIMETABLE ===== */}
        {tab === "Timetable" && (
          <Reveal className="mt-8 border-2 border-navy-900 bg-chalk-50">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-navy-900 px-5 py-4">
              <h2 className="font-display text-xl font-bold text-navy-900">Weekly timetable — Year 9 Fern</h2>
              <div className="flex gap-1.5">
                {portalTimetable.map((d, i) => (
                  <button
                    key={d.day}
                    onClick={() => setDay(i)}
                    className={`cursor-pointer border px-3 py-1.5 text-[0.68rem] font-bold tracking-wide uppercase transition-colors ${
                      day === i ? "border-navy-900 bg-navy-900 text-gold-300" : "border-navy-900/25 text-navy-600 hover:border-navy-900"
                    }`}
                  >
                    {d.day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="tbl min-w-[36rem]">
                <thead>
                  <tr className="bg-chalk-100">
                    <th>Period</th><th>Lesson</th><th>Room</th><th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {portalTimetable[day].lessons.map((l, i) => (
                    <tr key={l.time + l.subject}>
                      <td className="font-mono text-xs font-bold text-navy-600">P{i + 1} · {l.time}</td>
                      <td className="font-display font-semibold text-navy-900">{l.subject}</td>
                      <td>{l.room}</td>
                      <td className="text-ink/60">{l.teacher}</td>
                    </tr>
                  ))}
                  <tr className="bg-gold-100/60">
                    <td className="font-mono text-xs font-bold text-navy-600">15:30</td>
                    <td className="font-display font-semibold text-navy-900">Clubs & supervised prep</td>
                    <td>—</td>
                    <td className="text-ink/60">Sign-ups on the clubs board, main corridor</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="border-t border-navy-900/10 px-5 py-3 text-xs text-ink/50">Room changes are announced at registration and pushed to this page automatically.</p>
          </Reveal>
        )}

        {/* ===== ASSIGNMENTS ===== */}
        {tab === "Assignments" && (
          <Reveal className="mt-8 border-2 border-navy-900 bg-chalk-50">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-navy-900 px-5 py-4">
              <h2 className="font-display text-xl font-bold text-navy-900">Homework & prep</h2>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {(["all", "open", "done"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`cursor-pointer border px-3 py-1.5 text-[0.68rem] font-bold tracking-wide uppercase transition-colors ${
                        filter === f ? "border-navy-900 bg-navy-900 text-gold-300" : "border-navy-900/25 text-navy-600 hover:border-navy-900"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <span className="kicker !text-[0.6rem] text-navy-500">{progress}% done</span>
              </div>
            </div>
            <div className="h-2 bg-chalk-200">
              <div className="h-full bg-gold-500 transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
            <ul className="divide-y divide-navy-900/10">
              {visible.map((a) => {
                const isDone = done.includes(a.id);
                const soon = a.due.getTime() - Date.now() < 86400000 * 2;
                return (
                  <li key={a.id} className={`flex items-center gap-4 px-5 py-4 transition-colors ${isDone ? "bg-chalk-100/60" : ""}`}>
                    <button
                      onClick={() => toggle(a.id)}
                      aria-label={`Mark ${a.title} ${isDone ? "open" : "done"}`}
                      className={`grid h-6 w-6 shrink-0 cursor-pointer place-items-center border-2 transition-all ${isDone ? "border-moss-600 bg-moss-600 text-chalk-50" : "border-navy-900/40 bg-chalk-50 hover:scale-110 hover:border-gold-500"}`}
                    >
                      {isDone && <IcCheck className="h-3.5 w-3.5" />}
                    </button>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[0.95rem] font-bold ${isDone ? "text-navy-400 line-through" : "text-navy-900"}`}>{a.title}</span>
                      <span className="text-xs font-semibold tracking-wide text-navy-500 uppercase">{a.subject}</span>
                    </span>
                    <span className={`shrink-0 border px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.1em] uppercase ${isDone ? "border-moss-600 text-moss-700" : soon ? "border-crimson-600 text-crimson-600" : "border-navy-900/25 text-navy-600"}`}>
                      {isDone ? "Done" : `Due ${fmtShort(a.due)}`}
                    </span>
                  </li>
                );
              })}
              {visible.length === 0 && <li className="px-5 py-10 text-center text-sm text-ink/50">Nothing here — enjoy the clear desk.</li>}
            </ul>
          </Reveal>
        )}

        {/* ===== GRADES ===== */}
        {tab === "Grades" && (
          <Reveal className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="overflow-x-auto border-2 border-navy-900 bg-chalk-50">
              <table className="tbl min-w-[34rem]">
                <thead>
                  <tr className="bg-navy-950 text-navy-200">
                    <th className="!text-gold-300">Subject</th>
                    <th className="!text-gold-300">Tutor</th>
                    <th className="!text-gold-300">Term 1</th>
                    <th className="!text-gold-300">Term 2</th>
                    <th className="!text-gold-300">Band</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => {
                    const band = gradeBand(Math.round((g.t1 + g.t2) / 2));
                    const up = g.t2 >= g.t1;
                    return (
                      <tr key={g.subject}>
                        <td className="font-display font-semibold text-navy-900">{g.subject}</td>
                        <td className="text-ink/60">{g.teacher}</td>
                        <td className="font-mono font-bold">{g.t1}%</td>
                        <td className="font-mono font-bold">
                          {g.t2}% <span className={`ml-1 text-[0.65rem] ${up ? "text-moss-700" : "text-crimson-600"}`}>{up ? "▲" : "▼"}</span>
                        </td>
                        <td><span className={`px-2 py-1 text-[0.62rem] font-bold tracking-[0.1em] ${band.tone}`}>{band.g}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border-2 border-navy-900 bg-navy-950 p-6 text-center text-chalk-50">
                <p className="kicker text-gold-300">Attainment average</p>
                <p className="font-display mt-2 text-6xl font-bold text-gold-300">{avg}%</p>
                <p className="mt-2 text-sm text-navy-300">Across ten subjects, terms 1–2 · band {gradeBand(avg).g}</p>
              </div>
              <div className="border-l-4 border-gold-500 bg-chalk-50 p-5 text-sm leading-relaxed text-ink/70">
                <p className="font-display text-lg font-bold text-navy-900">Your tutor says:</p>
                <p className="mt-1.5 italic">“A strong spring term — the physics graph work especially. Keep handing in French verbs before Friday and this average moves again.”</p>
                <p className="mt-3 text-xs font-bold tracking-wide text-navy-500 uppercase">— Form tutor, Fern House</p>
              </div>
            </div>
          </Reveal>
        )}

        {/* ===== RESOURCES ===== */}
        {tab === "Resources" && (
          <Reveal className="mt-8 border-t-2 border-navy-900">
            <h2 className="sr-only">Pupil resources</h2>
            {["term-calendar", "lunch-menu", "bus-routes", "prospectus"].map((id, i) => {
              const r = resources.find((x) => x.id === id)!;
              return (
                <div key={id} className="group flex flex-wrap items-center gap-x-6 gap-y-3 border-b-2 border-navy-900/15 bg-chalk-50 py-5 transition-colors hover:bg-chalk-50/60 sm:px-4" style={{ transitionDelay: `${i * 40}ms` }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-navy-900 text-navy-800 transition-colors group-hover:bg-gold-400">
                    <IcDownload className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-display block text-lg font-bold text-navy-900">{r.name}</span>
                    <span className="text-sm text-ink/60">{r.desc}</span>
                  </span>
                  <button onClick={() => downloadResource(r.id)} className="btn btn-navy !px-4 !py-2.5">Download</button>
                </div>
              );
            })}
            <p className="mt-5 text-xs text-ink/50">
              Full resource library — revision guides, club sign-up sheets, kit lists — syncs with the school drive. Not sure what you need? Ask your tutor or{" "}
              <Link to="/contact" className="link-draw font-bold text-navy-800">write to the office</Link>.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ================= page ================= */
export default function Portal() {
  const [session, setSession] = useLocalStorage<Session | null>("ag-portal-session", null);

  return (
    <>
      {session ? (
        <Dashboard session={session} onLogout={() => setSession(null)} />
      ) : (
        <Login onLogin={(s) => setSession(s)} />
      )}
    </>
  );
}
