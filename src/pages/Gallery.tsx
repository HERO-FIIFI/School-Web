import { useEffect, useMemo, useState } from "react";
import { GALLERY, GALLERY_CATEGORIES } from "../lib/data";
import { Chip, Eyebrow, MaskHeading, PageHeader, Reveal } from "../components/ui";
import { ChevronLeft, ChevronRight, CloseIcon } from "../components/icons";
import { useLockBody } from "../lib/hooks";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => GALLERY.filter((g) => cat === "All" || g.category === cat), [cat]);
  useLockBody(lightbox !== null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % items.length));
      if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? v : (v - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, items.length]);

  return (
    <div>
      <PageHeader
        kicker="Gallery"
        title={[<>Proof it</>, <><em className="font-light italic text-gold-300">actually happened.</em></>]}
        intro="Photographs from the hill this term — labs, mud, paint, and the chapel roof doing its best work with the light. Click any frame to look closer."
      />

      <section className="paper-ruled">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2.5">
                {GALLERY_CATEGORIES.map((c) => (
                  <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>
                ))}
              </div>
              <p className="text-sm font-bold text-navy-800/60">{items.length} frame{items.length === 1 ? "" : "s"}</p>
            </div>
          </Reveal>

          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {items.map((g, i) => (
              <Reveal key={g.id} delay={(i % 3) * 90} tilt={i % 2 === 0 ? -0.7 : 0.7} className="break-inside-avoid">
                <button
                  onClick={() => setLightbox(i)}
                  className="group block w-full border-8 border-chalk-50 bg-chalk-50 text-left shadow-[0_18px_38px_-26px_rgba(7,26,48,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-26px_rgba(7,26,48,0.6)]"
                  aria-label={`Open photo: ${g.caption}`}
                >
                  <span className="block overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] ${g.tall ? "h-80 sm:h-96" : "h-56 sm:h-64"}`}
                    />
                  </span>
                  <span className="flex items-center justify-between px-1 py-2.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-800/75 group-hover:text-navy-900">{g.caption}</span>
                    <span className="ml-3 shrink-0 bg-gold-400 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-navy-900 opacity-0 transition-opacity group-hover:opacity-100">{g.category}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={items[lightbox].caption}>
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" onClick={() => setLightbox(null)} />
          <div className="relative w-full max-w-4xl reveal is-in">
            <div className="border-8 border-chalk-50 bg-chalk-50 shadow-2xl">
              <img src={items[lightbox].src} alt={items[lightbox].caption} className="max-h-[68vh] w-full object-cover" />
              <div className="flex items-center justify-between gap-4 px-3 py-3">
                <div>
                  <p className="font-display text-lg font-bold text-navy-900">{items[lightbox].caption}</p>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold-600">{items[lightbox].category} · {lightbox + 1} of {items.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLightbox((lightbox - 1 + items.length) % items.length)}
                    aria-label="Previous photo"
                    className="grid h-10 w-10 place-items-center border border-navy-900/25 text-navy-900 transition-colors hover:bg-navy-900 hover:text-gold-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setLightbox((lightbox + 1) % items.length)}
                    aria-label="Next photo"
                    className="grid h-10 w-10 place-items-center border border-navy-900/25 text-navy-900 transition-colors hover:bg-navy-900 hover:text-gold-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setLightbox(null)}
                    aria-label="Close lightbox"
                    className="grid h-10 w-10 place-items-center bg-navy-900 text-gold-300 transition-colors hover:bg-crimson-600 hover:text-chalk-50"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
