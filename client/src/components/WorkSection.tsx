/*
  EVO Maritime Our Work / Case Studies Section
  Design: Dark navy / light steel, horizontal split-screen cards
  Cyan accent numbers, Barlow Condensed headings, staggered scroll reveal
  Theme-aware: uses getTokens for all colors
*/
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Wind, Anchor, Package, Truck, Wheat, X, ChevronLeft, ChevronRight, Camera, Factory } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

const CASESTUDY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/evo-casestudy-bg-ZJ5MF24pgBqvgfDqVvX3yS.webp";

const cases = [
  {
    icon: Wind,
    tag: "Project Cargo",
    title: "3 × 67m Windmill Blades",
    route: "Castellon, Spain → Constanta → Pančevo, Serbia",
    stats: [
      { label: "Blade Length", value: "67m" },
      { label: "Vessel Type", value: "Coaster + River" },
      { label: "Countries", value: "3" },
    ],
    desc: "Chartered a coaster vessel from Spain to Romania, then transshipped onto a river vessel for final delivery deep into Serbia. A true multimodal project cargo operation.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/1st_bb569a2c.webp",
    ],
  },
  {
    icon: Wind,
    tag: "Ocean Charter",
    title: "67m Windmill Blade — Black Sea",
    route: "Constanta, Romania → Olvia, Ukraine",
    stats: [
      { label: "Blade Length", value: "67m" },
      { label: "Sea", value: "Black Sea" },
      { label: "Mode", value: "Coaster Charter" },
    ],
    desc: "Single oversized windmill blade transported via chartered coaster vessel across the Black Sea. Port-to-port precision delivery.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/2nd_3dc445fa.jpg",
    ],
  },
  {
    icon: Wind,
    tag: "Intermodal",
    title: "3 × 43m Blades — Road + Sea + Road",
    route: "Portugal → Aveiro → Varna, Bulgaria",
    stats: [
      { label: "Blade Length", value: "43m" },
      { label: "Modes", value: "3" },
      { label: "Countries", value: "2" },
    ],
    desc: "Road from origin to Port of Aveiro (PT), sea freight to Port of Varna (BG), final road delivery. A complete intermodal chain for oversized project cargo.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/3rd_faca419d.webp",
    ],
  },
  {
    icon: Factory,
    tag: "Port Agency · Heavy Lift",
    title: "2 × 331-Ton LNG Tanks",
    route: "Port of Tulcea, Romania",
    stats: [
      { label: "Unit Weight", value: "331 MT" },
      { label: "Total Weight", value: "662 MT" },
      { label: "Location", value: "Tulcea, RO" },
    ],
    desc: "Full port agency plus heavy lift cargo operations. Multi-crane discharge, precision rigging, and SPMT transport for two massive LNG storage tanks.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/4th_2ced83ad.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/4thb_4b4e36f3.png",
    ],
  },
  {
    icon: Anchor,
    tag: "Heavy Lift · Multipurpose",
    title: "2 × 82-Ton Industrial Boilers",
    route: "Germany → Constanta, Romania → Ukraine",
    stats: [
      { label: "Unit Weight", value: "82 MT" },
      { label: "Routing", value: "Barge + Coaster" },
      { label: "Countries", value: "3" },
    ],
    desc: "Barge and coaster vessel combination routing for oversized industrial boilers — from German inland waterways to the Black Sea coast.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/5th_c3e4af2b.webp",
    ],
  },
  {
    icon: Package,
    tag: "Project Cargo · MPV",
    title: "78 Pieces — Tunnel Boring Machines",
    route: "Delivered to Poti, Georgia",
    stats: [
      { label: "Pieces", value: "78" },
      { label: "Total Weight", value: "1,220 MT" },
      { label: "Volume", value: "5,067 m³" },
    ],
    desc: "Complete project cargo management for tunnel boring machine components — multipurpose vessel charter, port operations, and full documentation.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/6th_7e30b9b1.jpeg",
    ],
  },
  {
    icon: Truck,
    tag: "Rolling Cargo · General Cargo Vessel",
    title: "46 Units Construction Equipment",
    route: "Constanta, Romania → Red Sea",
    stats: [
      { label: "Units", value: "46" },
      { label: "Weight", value: "658 MT" },
      { label: "Volume", value: "3,269 m³" },
    ],
    desc: "Part cargo charter on MPV for used construction equipment — wheeled and steel-tracked machinery loaded and secured for deep-sea voyage to the Red Sea.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/7th_02c30ca9.webp",
    ],
  },
  {
    icon: Wheat,
    tag: "Bulk Cargo · Full Charter",
    title: "11,941 MT Sugar in Bulk",
    route: "Constanta, Romania → Baltic Sea",
    stats: [
      { label: "Cargo", value: "11,941 MT" },
      { label: "Type", value: "Bulk Sugar" },
      { label: "Charter", value: "Full Vessel" },
    ],
    desc: "Full vessel charter for bulk sugar — end-to-end charter management from Black Sea to Baltic, including loading supervision and cargo documentation.",
    photos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/8th_154b183f.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/9th_3d9d34e2.jpeg",
    ],
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  photos: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}

function Lightbox({ photos, startIndex, title, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const CYAN = "oklch(0.82 0.18 200)";
  const CYAN_BG = "oklch(0.82 0.18 200 / 15%)";
  const CYAN_BORDER = "oklch(0.82 0.18 200 / 30%)";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "rgba(4, 10, 24, 0.97)" }}
        onClick={onClose}
      >
        <button
          className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full"
          style={{ background: CYAN_BG, border: `1px solid ${CYAN_BORDER}` }}
          onClick={onClose}
        >
          <X size={18} style={{ color: CYAN }} />
        </button>

        <div className="absolute top-5 left-5 right-16 z-10" onClick={(e) => e.stopPropagation()}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "white" }}>
            {title}
          </p>
          {photos.length > 1 && (
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.78rem", color: CYAN }}>
              {current + 1} / {photos.length}
            </p>
          )}
        </div>

        <motion.img
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          src={photos[current]}
          alt={`${title} photo ${current + 1}`}
          className="max-h-[80vh] max-w-[90vw] object-contain rounded"
          style={{ boxShadow: "0 0 60px rgba(0,212,255,0.1)" }}
          onClick={(e) => e.stopPropagation()}
        />

        {photos.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full"
              style={{ background: CYAN_BG, border: `1px solid ${CYAN_BORDER}` }}
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={22} style={{ color: CYAN }} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full"
              style={{ background: CYAN_BG, border: `1px solid ${CYAN_BORDER}` }}
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={22} style={{ color: CYAN }} />
            </button>
            <div className="absolute bottom-6 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  style={{
                    width: i === current ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === current ? CYAN : CYAN_BG,
                    transition: "all 0.2s",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function CaseCard({
  item,
  index,
  onOpenLightbox,
  t,
}: {
  item: typeof cases[0];
  index: number;
  onOpenLightbox: (photos: string[], startIndex: number, title: string) => void;
  t: ReturnType<typeof getTokens>;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.12 }}
      className="flex flex-col gap-0 overflow-hidden"
      style={{
        background: t.bgCard,
        border: `1px solid ${t.borderCard}`,
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = t.borderCardHover)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = t.borderCard)}
    >
      {/* Photo thumbnail */}
      <div
        className="relative w-full overflow-hidden cursor-pointer group"
        style={{ height: "160px" }}
        onClick={() => onOpenLightbox(item.photos, 0, item.title)}
      >
        <img
          src={item.photos[0]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${t.cyan}22` }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2"
            style={{ background: "rgba(4,10,24,0.85)", border: `1px solid ${t.borderCard}` }}
          >
            <Camera size={14} style={{ color: t.cyan }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.cyan }}>
              {item.photos.length > 1 ? `View ${item.photos.length} Photos` : "View Photo"}
            </span>
          </div>
        </div>
        {item.photos.length > 1 && (
          <div
            className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5"
            style={{ background: "rgba(4,10,24,0.85)", border: `1px solid ${t.borderCard}` }}
          >
            <Camera size={10} style={{ color: t.cyan }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.62rem", letterSpacing: "0.1em", color: t.cyan }}>
              {item.photos.length}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-5 flex-1">
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center mt-0.5"
            style={{ border: `1px solid ${t.borderCard}`, background: t.iconBg }}
          >
            <Icon size={18} style={{ color: t.cyan }} />
          </div>
          <div>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: t.cyan, display: "block", marginBottom: "0.25rem" }}>
              {item.tag}
            </span>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.03em", lineHeight: 1.2, color: t.textPrimary }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.78rem", color: t.textWhite40, marginTop: "0.25rem" }}>
              {item.route}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-2 py-4"
          style={{ borderTop: `1px solid ${t.borderSubtle}`, borderBottom: `1px solid ${t.borderSubtle}` }}
        >
          {item.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.1rem", lineHeight: 1, color: t.cyan }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.textWhite40, marginTop: "0.25rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", lineHeight: 1.65, color: t.textSecondary }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function WorkSection() {
  const { theme } = useTheme();
  const t = getTokens(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [lightbox, setLightbox] = useState<{
    photos: string[];
    startIndex: number;
    title: string;
  } | null>(null);

  const openLightbox = useCallback(
    (photos: string[], startIndex: number, title: string) => {
      setLightbox({ photos, startIndex, title });
    },
    []
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      <section
        id="work"
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: t.bgPage }}
      >
        {/* Background image accent */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${CASESTUDY_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: theme === "dark" ? 0.05 : 0.03,
          }}
        />

        <div className="container relative z-10">
          <div ref={ref} className="mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="evo-divider" />
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <h2 className="evo-section-title" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: t.textPrimary }}>
                  Our Work
                </h2>
                <p
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", lineHeight: 1.65, color: t.textSecondary, maxWidth: "28rem" }}
                  className="lg:text-right"
                >
                  Real projects. Real complexity. Real results. Every case below represents
                  a challenge that required expertise, creativity, and execution.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cases.map((item, i) => (
              <CaseCard
                key={item.title}
                item={item}
                index={i}
                onOpenLightbox={openLightbox}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          startIndex={lightbox.startIndex}
          title={lightbox.title}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
