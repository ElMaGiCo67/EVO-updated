/*
  EVO Maritime Services Section
  Design: Alt background, 4×2 bordered grid, icon + title + description
  Theme-aware: dark alt navy / light steel-white, cyan border glow on hover, Barlow Condensed headings
*/
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Plane, Truck, Ship, Package, Train, Waves, Building2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/evo-services-bg-Xk2HfYBctr8h9GUTiPU2D7.webp";

const services = [
  { icon: Ship, title: "Ocean Liner", subtitle: "FCL · LCL · Ferry · RoRo", desc: "Full container loads, less-than-container consolidation, ferry services, and RoRo operations across major sea lanes." },
  { icon: Anchor, title: "Ocean Chartering", subtitle: "Bulk · Project · Hazmat", desc: "Full and part vessel charters for bulk cargo, project freight, and hazardous materials. Black Sea, Mediterranean, and beyond." },
  { icon: Package, title: "River Chartering", subtitle: "Bulk · Break-Bulk · Project", desc: "Inland waterway chartering along the Danube and connecting rivers — ideal for oversized and heavy project cargo." },
  { icon: Truck, title: "Oversized Trucking", subtitle: "Heavy & Out-of-Gauge", desc: "Specialized road transport for out-of-gauge and heavy loads, with full permit management and escort coordination." },
  { icon: Waves, title: "RoRo Operations", subtitle: "Wheeled · Tracked · Vehicles", desc: "Dedicated expertise in RoRo vessel operations for all rolling cargo — from standard vehicles to heavy construction equipment." },
  { icon: Train, title: "Rail Freight", subtitle: "Oversized & Heavy Loads", desc: "Rail solutions for oversized and heavy cargo across the European and CIS rail network, including intermodal connections." },
  { icon: Plane, title: "Air Freight", subtitle: "Consolidated & Chartered", desc: "Time-critical air freight solutions — consolidated shipments and full charter options for urgent or high-value cargo." },
  { icon: Building2, title: "Ships Agency", subtitle: "Liner & Tramp Vessel Calls", desc: "Comprehensive port agency services at Bulgarian, Romanian, and Adriatic ports — liner calls and tramp vessel operations." },
];

function ServiceCard({ service, index, t }: { service: typeof services[0]; index: number; t: ReturnType<typeof getTokens> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="evo-card p-6 flex flex-col gap-4"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
          style={{ border: `1px solid ${t.borderCard}`, background: t.iconBg }}>
          <Icon size={22} style={{ color: t.cyan }} />
        </div>
        <div>
          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.15rem", textTransform: "uppercase", letterSpacing: "0.05em", color: t.textPrimary, marginBottom: "2px" }}>
            {service.title}
          </h3>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.cyan }}>
            {service.subtitle}
          </span>
        </div>
      </div>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.88rem", lineHeight: 1.65, color: t.textSecondary }}>
        {service.desc}
      </p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { theme } = useTheme();
  const t = getTokens(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: t.bgAlt }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${SERVICES_BG})`, backgroundSize: "cover", backgroundPosition: "center" }} />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="evo-divider" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="evo-section-title" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                End-to-End<br />Multimodal Services
              </h2>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", lineHeight: 1.65, color: t.textSecondary, maxWidth: "28rem", textAlign: "right" }}>
                From a single container to a full vessel charter — we handle every mode,
                every cargo type, every route across Southeast Europe and beyond.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} t={t} />
          ))}
        </div>

        {/* Standard Solutions Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { code: "LCL", name: "Less than Container Load", desc: "Flexible consolidation for any cargo size" },
            { code: "FCL", name: "Full Container Load", desc: "Dedicated container solutions worldwide" },
            { code: "AIR", name: "Air Freight", desc: "Time-critical shipments, consolidated & chartered" },
          ].map((item) => (
            <div key={item.code} className="flex items-center gap-4 p-5" style={{ background: t.cyanBg, border: `1px solid ${t.borderCard}` }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "1.8rem", lineHeight: 1, color: t.cyan, textShadow: `0 0 15px ${t.cyanGlow}`, flexShrink: 0 }}>
                {item.code}
              </span>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: t.textPrimary }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", color: t.textSecondary }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
