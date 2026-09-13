import { useMemo, useState } from "react";
import { GALLERY, GALLERY_TAGS } from "../lib/data";
import { Reveal } from "../components/ui";
import { Lightbox } from "../components/interactive";
import { IcArrow } from "../components/icons";

export default function Gallery() {
  const [tag, setTag] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => (tag === "All" ? GALLERY : GALLERY.filter((g) => g.tag === tag)), [tag]);

  return (
    <>
      {/* header */}
      <section className="relative bg-pine-950 text-chalk-50 overflow-hidden noise">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute left-[-140px] top-[-140px] w-[420px] h-[420px] rounded-full border-[30px] border-pine-900/80 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal><p className="kicker text-gold-300">Gallery</p></Reveal>
            <Reveal delay={90}>
              <h1 className="mt-4 font-display font-extrabold tracking-tight leading-[1.0] text-4xl sm:text-5xl lg:text-[3.2rem]">
                Proof that school
                <br />
                is a <span className="text-gold-300">place.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-sm text-pine-100/80 leading-relaxed">
              Shot on campus by students of the Photography Club — hover a frame, click to enlarge. New sets
              land every fortnight.
            </p>
          </Reveal>
        </div>
      </section>

      {/* filters + masonry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {GALLERY_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                  tag === t ? "bg-pine-900 text-gold-300" : "border border-pine-900/15 bg-white/60 text-pine-900 hover:border-pine-700"
                }`}
              >
                {t}
                <span className={`ml-1.5 text-xs ${tag === t ? "text-gold-300/70" : "text-pine-900/40"}`}>
                  {t === "All" ? GALLERY.length : GALLERY.filter((g) => g.tag === t).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {items.map((g, i) => (
            <Reveal key={g.src + g.caption} delay={(i % 3) * 80} className="mb-6 break-inside-avoid">
              <button
                onClick={() => setLightbox(i)}
                className="postcard group block w-full text-left bg-white p-2.5 pb-3 rounded-md shadow-card"
                style={{ transform: `rotate(${i % 2 ? 1.2 : -1.2}deg)` }}
              >
                <span className="img-zoom block rounded-sm overflow-hidden relative">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className={`w-full object-cover ${g.tall ? "h-80 sm:h-[420px]" : "h-60 sm:h-72"}`}
                  />
                  <span className="absolute inset-0 bg-pine-1000/0 group-hover:bg-pine-1000/25 transition-colors grid place-items-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-chalk-50 text-pine-950 text-xs font-extrabold px-4 py-2 flex items-center gap-1.5">
                      View <IcArrow className="w-3 h-3 -rotate-45" />
                    </span>
                  </span>
                </span>
                <span className="mt-3 flex items-center justify-between px-1">
                  <span className="font-display font-semibold text-sm text-pine-900">{g.caption}</span>
                  <span className="rounded-full bg-gold-300/50 text-gold-600 text-[0.62rem] font-extrabold uppercase tracking-wider px-2 py-0.5">
                    {g.tag}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-ink-soft">
            Photographs are published with family permission. Spot your child and want a print?{" "}
            <span className="font-semibold text-pine-900">Write to the Arts Office — prints are free.</span>
          </p>
        </Reveal>
      </section>

      {lightbox !== null && (
        <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      )}
    </>
  );
}
