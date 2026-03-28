/*
  EVO Maritime Our Work / Case Studies Section
  Design: Dark navy background, horizontal split-screen cards (tag | data | description)
  Cyan accent numbers, Barlow Condensed headings, staggered scroll reveal
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wind, Anchor, Ship, Package, Waves, Factory, Truck, Wheat } from "lucide-react";

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
  },
];

function CaseCard({ item, index }: { item: typeof cases[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.12 }}
      className="evo-card p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center mt-0.5"
          style={{
            border: "1px solid oklch(0.82 0.18 200 / 30%)",
            background: "oklch(0.82 0.18 200 / 8%)",
          }}
        >
          <Icon size={18} style={{ color: "oklch(0.82 0.18 200)" }} />
        </div>
        <div>
          <span
            className="evo-cyan block mb-1"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {item.tag}
          </span>
          <h3
            className="text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              lineHeight: 1.2,
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-white/40 mt-1"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "0.78rem",
            }}
          >
            {item.route}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-2 py-4"
        style={{ borderTop: "1px solid oklch(1 0 0 / 8%)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
      >
        {item.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="evo-cyan"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "1.1rem",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              className="text-white/40 mt-1"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p
        className="text-white/55"
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.85rem",
          lineHeight: 1.65,
        }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.10 0.03 240)" }}
    >
      {/* Background image accent */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${CASESTUDY_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="evo-divider" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2
                className="evo-section-title"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                Our Work
              </h2>
              <p
                className="text-white/55 max-w-md lg:text-right"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                }}
              >
                Real projects. Real complexity. Real results. Every case below represents
                a challenge that required expertise, creativity, and execution.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cases Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((item, i) => (
            <CaseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
