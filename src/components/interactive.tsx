import { useEffect, useMemo, useState, type FormEvent } from "react";
import { fmtShort, fmtWeekday, tagColor, type EventItem } from "../lib/data";
import { IcCheck, IcChevD, IcChevL, IcChevR, IcClock, IcClose, IcPin } from "./icons";
import { Chip, Reveal } from "./ui";

/* ================= accordion ================= */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-navy-900/10 border-y-2 border-navy-900">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-lg font-semibold text-navy-900 transition-colors group-hover:text-gold-600 sm:text-xl">
                {it.q}
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center border transition-all duration-300 ${
                  isOpen ? "rotate-180 border-gold-500 bg-gold-400 text-navy-950" : "border-navy-900/25 text-navy-700"
                }`}
              >
                <IcChevD className="h-4 w-4" />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-[0.95rem] leading-relaxed text-ink/70">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================= enquiry form ================= */
export function EnquiryForm({ context = "general" }: { context?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", topic: context, message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "A valid email helps us reply.";
    if (!form.role) errs.role = "Choose the option closest to you.";
    if (form.message.trim().length < 10) errs.message = "A sentence or two, at least.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setRef(`AG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 900);
  };

  if (ref) {
    return (
      <div className="rise border-2 border-moss-600 bg-[#eef3ec] p-8 sm:p-10">
        <span className="grid h-12 w-12 place-items-center bg-moss-600 text-chalk-50">
          <IcCheck className="h-6 w-6" />
        </span>
        <h3 className="font-display mt-5 text-2xl font-bold text-navy-900 sm:text-3xl">Thank you — it's on its way.</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
          Your enquiry has been logged with the registrar's office. We reply within two working days — usually sooner.
        </p>
        <p className="mt-5 inline-block border border-navy-900/20 bg-chalk-50 px-4 py-2 font-mono text-sm font-bold tracking-widest text-navy-800">
          Reference {ref}
        </p>
        <div>
          <button
            onClick={() => {
              setRef(null);
              setForm({ name: "", email: "", phone: "", role: "", topic: context, message: "" });
            }}
            className="link-draw mt-5 cursor-pointer text-sm font-bold tracking-wide text-navy-800 uppercase"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const fieldCls = (k: string) => `field ${errors[k] ? "field-err" : ""}`;
  const err = (k: string) => errors[k] && <p className="mt-1.5 text-xs font-semibold text-crimson-600">{errors[k]}</p>;

  return (
    <form onSubmit={submit} noValidate className="border-2 border-navy-900 bg-chalk-50 p-6 shadow-[8px_8px_0_rgba(12,35,64,0.12)] sm:p-8">
      <p className="kicker text-navy-600">Enquiry form</p>
      <h3 className="font-display mt-2 text-2xl font-bold text-navy-900">Write to the registrar</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-700 uppercase">Full name *</label>
          <input className={fieldCls("name")} value={form.name} onChange={set("name")} placeholder="e.g. Joanna Whitmore" />
          {err("name")}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-700 uppercase">Email *</label>
          <input type="email" className={fieldCls("email")} value={form.email} onChange={set("email")} placeholder="you@example.co.uk" />
          {err("email")}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-700 uppercase">Phone (optional)</label>
          <input className="field" value={form.phone} onChange={set("phone")} placeholder="+44 …" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-700 uppercase">You are… *</label>
          <select className={fieldCls("role")} value={form.role} onChange={set("role")}>
            <option value="">Please choose</option>
            <option>Parent of a prospective pupil</option>
            <option>Current Ashgrove parent</option>
            <option>A pupil</option>
            <option>An Old Grovian</option>
            <option>Someone else entirely</option>
          </select>
          {err("role")}
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-700 uppercase">Topic</label>
          <select className="field" value={form.topic} onChange={set("topic")}>
            {["General", "Admissions & entry points", "Fees & bursaries", "Booking a visit", "Transport & buses", "Something else"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold tracking-[0.12em] text-navy-700 uppercase">Message *</label>
          <textarea
            rows={5}
            className={fieldCls("message")}
            value={form.message}
            onChange={set("message")}
            placeholder="Tell us about your child, the year group you're interested in, and anything you'd like to ask…"
          />
          {err("message")}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={sending} className="btn btn-navy disabled:opacity-60">
          {sending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-ink/50">Replies within two working days, term time.</p>
      </div>
    </form>
  );
}

/* ================= event calendar ================= */
export function EventCalendar({ events }: { events: EventItem[] }) {
  const today = new Date();
  const [month, setMonth] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<string | null>(null);

  const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const byDay = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    events.forEach((e) => {
      const k = key(e.date);
      map.set(k, [...(map.get(k) ?? []), e]);
    });
    return map;
  }, [events]);

  const first = new Date(month.y, month.m, 1);
  const daysInMonth = new Date(month.y, month.m + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const monthLabel = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(first);

  const nav = (delta: number) => {
    const d = new Date(month.y, month.m + delta, 1);
    setMonth({ y: d.getFullYear(), m: d.getMonth() });
    setSelected(null);
  };

  const isToday = (day: number) =>
    today.getFullYear() === month.y && today.getMonth() === month.m && today.getDate() === day;

  const monthEvents = useMemo(
    () =>
      [...events]
        .filter((e) => e.date.getFullYear() === month.y && e.date.getMonth() === month.m)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [events, month]
  );

  const shown = selected ? (byDay.get(selected) ?? []) : monthEvents;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      {/* month grid */}
      <Reveal className="border-2 border-navy-900 bg-chalk-50 p-5 shadow-[8px_8px_0_rgba(12,35,64,0.1)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-navy-900">{monthLabel}</h3>
          <div className="flex items-center gap-1.5">
            <button onClick={() => nav(-1)} aria-label="Previous month" className="border border-navy-900/25 p-2 text-navy-700 transition-colors hover:bg-navy-900 hover:text-chalk-50">
              <IcChevL className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setMonth({ y: today.getFullYear(), m: today.getMonth() });
                setSelected(null);
              }}
              className="border border-navy-900/25 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.12em] text-navy-700 uppercase transition-colors hover:bg-navy-900 hover:text-chalk-50"
            >
              Today
            </button>
            <button onClick={() => nav(1)} aria-label="Next month" className="border border-navy-900/25 p-2 text-navy-700 transition-colors hover:bg-navy-900 hover:text-chalk-50">
              <IcChevR className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 text-center text-[0.62rem] font-bold tracking-[0.14em] text-navy-500 uppercase">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d} className="py-2">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-navy-900/10">
          {Array.from({ length: lead }).map((_, i) => (
            <span key={`x${i}`} className="bg-chalk-100/60" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const k = `${month.y}-${month.m}-${day}`;
            const dayEvents = byDay.get(k) ?? [];
            const sel = selected === k;
            return (
              <button
                key={k}
                onClick={() => setSelected(sel ? null : k)}
                className={`relative flex h-14 cursor-pointer flex-col items-center justify-start bg-chalk-50 pt-1.5 transition-colors sm:h-16 ${
                  sel ? "bg-navy-900" : "hover:bg-gold-100"
                } ${isToday(day) && !sel ? "ring-2 ring-gold-500 ring-inset" : ""}`}
              >
                <span className={`text-sm font-bold ${sel ? "text-gold-300" : "text-navy-800"}`}>{day}</span>
                <span className="mt-1 flex gap-1">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span key={e.id} className={`h-1.5 w-1.5 rounded-full ${tagColor[e.tag].split(" ")[0]}`} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[0.7rem] font-semibold tracking-wide text-navy-500 uppercase">
          Click a date to see its events · dots show what's on
        </p>
      </Reveal>

      {/* event list */}
      <Reveal delay={120} className="flex flex-col border-2 border-navy-900 bg-navy-950 text-chalk-50">
        <div className="flex items-baseline justify-between border-b border-navy-800 px-5 py-4">
          <p className="kicker text-gold-300">{selected ? "On this day" : "This month"}</p>
          {selected && (
            <button onClick={() => setSelected(null)} className="link-draw cursor-pointer text-xs font-bold tracking-wide text-navy-200 uppercase hover:text-gold-300">
              Show all
            </button>
          )}
        </div>
        <div className="flex-1 divide-y divide-navy-800/80 overflow-y-auto">
          {shown.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-navy-300">
              {selected ? "A quiet day in the Grove — nothing scheduled." : "Nothing on this month yet — check next month."}
            </p>
          )}
          {shown.map((e) => (
            <article key={e.id} className="group flex gap-4 px-5 py-4 transition-colors hover:bg-navy-900/70">
              <div className="shrink-0 border border-navy-700 px-2.5 py-2 text-center">
                <p className="font-display text-2xl leading-none font-bold text-gold-300">{e.date.getDate()}</p>
                <p className="mt-1 text-[0.6rem] font-bold tracking-[0.14em] text-navy-300 uppercase">
                  {new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(e.date)}
                </p>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-[1.05rem] leading-snug font-semibold text-chalk-50">{e.title}</h4>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-200">
                  <span className="flex items-center gap-1.5"><IcClock className="h-3.5 w-3.5" />{e.time}</span>
                  <span className="flex items-center gap-1.5"><IcPin className="h-3.5 w-3.5" />{e.location}</span>
                </p>
                <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-navy-300">{e.description}</p>
                <span className={`mt-2 inline-block px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.12em] uppercase ${tagColor[e.tag]}`}>{e.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ================= lightbox ================= */
export function Lightbox({
  items,
  index,
  onClose,
  setIndex,
}: {
  items: { src: string; alt: string; cat: string }[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, setIndex]);

  const item = items[index];
  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button aria-label="Close viewer" className="absolute inset-0 bg-navy-950/92 backdrop-blur-sm" onClick={onClose} />
      <div className="rise relative w-full max-w-4xl">
        <img src={item.src} alt={item.alt} className="max-h-[74vh] w-full border-2 border-chalk-50/20 object-contain bg-navy-900" />
        <div className="mt-4 flex items-center justify-between gap-4 text-chalk-50">
          <div>
            <p className="font-display text-lg font-semibold">{item.alt}</p>
            <p className="kicker mt-1 text-gold-300">{item.cat} · {index + 1} / {items.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIndex((index - 1 + items.length) % items.length)} aria-label="Previous image" className="border border-chalk-50/30 p-2.5 transition-colors hover:bg-gold-400 hover:text-navy-950 hover:border-gold-400">
              <IcChevL className="h-5 w-5" />
            </button>
            <button onClick={() => setIndex((index + 1) % items.length)} aria-label="Next image" className="border border-chalk-50/30 p-2.5 transition-colors hover:bg-gold-400 hover:text-navy-950 hover:border-gold-400">
              <IcChevR className="h-5 w-5" />
            </button>
            <button onClick={onClose} aria-label="Close" className="border border-chalk-50/30 p-2.5 transition-colors hover:bg-crimson-600 hover:border-crimson-600">
              <IcClose className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= date badge ================= */
export function DateBadge({ d, tone = "light" }: { d: Date; tone?: "light" | "dark" }) {
  return (
    <div className={`shrink-0 border px-2.5 py-2 text-center ${tone === "light" ? "border-navy-900/25 bg-chalk-50" : "border-navy-700 bg-navy-900"}`}>
      <p className={`font-display text-xl leading-none font-bold ${tone === "light" ? "text-navy-900" : "text-gold-300"}`}>{d.getDate()}</p>
      <p className={`mt-0.5 text-[0.58rem] font-bold tracking-[0.12em] uppercase ${tone === "light" ? "text-navy-500" : "text-navy-300"}`}>
        {new Intl.DateTimeFormat("en-GB", { month: "short" }).format(d)}
      </p>
    </div>
  );
}

export { Chip };
export { fmtShort, fmtWeekday };
