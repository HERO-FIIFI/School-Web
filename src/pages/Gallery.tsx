import { useMemo, useState } from "react";
import { Lightbox } from "../components/interactive";
import { PageHero, Reveal } from "../components/ui";
import { IcArrowUp, IcLeaf } from "../components/icons";
import { galleryImages, type GalleryCat } from "../lib/data";

const cats: ("All" | GalleryCat)[] = ["All", "Campus", "Learning", "Arts", "Sport", "Community"];

export default function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(() => galleryImages.filter((g) => cat === "All" || g.cat === cat), [cat]);

  return (
    <>
      <PageHero
        kicker="Gallery · the year in pictures"
        title={[<>Proof it really</>, <em key="h" className="font-display italic text-gold-300">happened</em>]}
        lede="Muddy boots, standing ovations, climate chambers and one very photogenic quad. Shot by the Year 12 photography society — errors, grain and all."
      />

      <section className="bg-chalk-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Reveal className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c);
                    setLightbox(null);
                  }}
                  className={`cursor-pointer border px-3.5 py-2 text-[0.7rem] font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                    cat === c
                      ? "border-navy-900 bg-navy-900 text-gold-300 shadow-[4px_4px_0_rgba(217,161,59,0.6)]"
                      : "border-navy-900/25 bg-chalk-50 text-navy-700 hover:border-navy-900 hover:bg-chalk-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="kicker text-navy-500">{filtered.length} {filtered.length === 1 ? "frame" : "frames"} · click any to enlarge</p>
          </Reveal>

          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {filtered.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 70} className="break-inside-avoid">
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full cursor-zoom-in overflow-hidden border-2 border-navy-900 bg-navy-900 text-left shadow-[6px_6px_0_rgba(12,35,64,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_rgba(12,35,64,0.18)]"
                >
                  <div className={`overflow-hidden ${g.aspect}`}>
                    <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-navy-950/90 px-4 py-3 backdrop-blur-sm">
                    <span className="font-display text-sm font-semibold text-chalk-50">{g.alt}</span>
                    <span className="kicker shrink-0 !text-[0.55rem] text-gold-300">{g.cat}</span>
                  </span>
                  <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center bg-gold-400 text-navy-950 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <IcArrowUp className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* photographer's note */}
      <section className="blueprint bg-navy-950 text-chalk-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <IcLeaf className="hidden h-28 w-28 text-gold-400/70 lg:block" />
          <div>
            <p className="kicker text-gold-300">From the darkroom</p>
            <p className="font-display mt-4 text-2xl leading-snug font-semibold sm:text-3xl">
              “We shoot on whatever's in our pockets, then argue about film grain in the common room. The quad at 07:40 is the best set in Kent — <em className="italic text-gold-300">don't tell the drama department.</em>”
            </p>
            <p className="mt-4 text-sm tracking-wide text-navy-300 uppercase">— Year 12 Photography Society, est. 2019</p>
          </div>
        </div>
      </section>

      {lightbox !== null && filtered[lightbox] && (
        <Lightbox items={filtered} index={lightbox} onClose={() => setLightbox(null)} setIndex={setLightbox} />
      )}
    </>
  );
}
