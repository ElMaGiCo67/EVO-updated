/*
  EVO Maritime Network Section — Leaflet Map
  Uses CartoDB Dark Matter tiles (free, no API key).
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Anchor, Ship, Building, Navigation, X, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";
import LeafletMap, { locations } from "./LeafletMap";

const ICONS: Record<string, React.ElementType> = {
  bulgaria: Anchor,
  romania: Ship,
  serbia: Building,
  slovenia: Navigation,
};

function DetailPanel({ loc, onClose, t }: { loc: typeof locations[0] | null; onClose: () => void; t: ReturnType<typeof getTokens>; }) {
  if (!loc) return null;
  const Icon = ICONS[loc.id] ?? MapPin;
  return (
    <motion.div key={loc.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease: "easeOut" }} className="flex flex-col" style={{ background: t.bgPanel, border: `1px solid ${t.borderCardHover}`, boxShadow: `0 0 30px ${t.cyanGlow}, 0 8px 32px rgba(0,0,0,0.3)` }}>
      <div className="h-0.5 w-full" style={{ background: t.cyan, boxShadow: `0 0 10px ${t.cyanGlow}` }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{loc.flag}</span>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.3rem", textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1, color: t.textPrimary }}>{loc.country}</div>
              <div style={{ color: t.cyan, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{loc.city}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: t.textWhite40 }} className="hover:opacity-80 transition-opacity mt-0.5"><X size={16} /></button>
        </div>
        <div className="px-3 py-1.5 mb-4 inline-block" style={{ background: t.iconBg, border: `1px solid ${t.borderCard}` }}>
          <div className="flex items-center gap-2">
            <Icon size={12} style={{ color: t.cyan }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.cyan }}>{loc.role}</span>
          </div>
        </div>
        <p className="mb-5" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", lineHeight: 1.65, color: t.textSecondary }}>{loc.detail}</p>
        <div className="h-px w-full mb-4" style={{ background: t.borderSubtle }} />
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5"><MapPin size={13} style={{ color: t.cyan, flexShrink: 0, marginTop: 2 }} /><span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem", lineHeight: 1.4, color: t.textWhite60 }}>{loc.address}</span></div>
          <div className="flex items-center gap-2.5"><Phone size={13} style={{ color: t.cyan, flexShrink: 0 }} /><a href={`tel:${loc.phone.replace(/\s/g, "")}`} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: t.cyan, letterSpacing: "0.05em" }}>{loc.phone}</a></div>
          <div className="flex items-center gap-2.5"><Mail size={13} style={{ color: t.cyan, flexShrink: 0 }} /><a href={`mailto:${loc.email}`} className="hover:opacity-80 transition-opacity" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem", color: t.cyan }}>{loc.email}</a></div>
        </div>
      </div>
    </motion.div>
  );
}

function LocationTabs({ active, onSelect, t }: { active: string | null; onSelect: (id: string) => void; t: ReturnType<typeof getTokens>; }) {
  return (
    <div className="flex flex-wrap gap-2">
      {locations.map((loc) => (
        <button key={loc.id} onClick={() => onSelect(loc.id)} className="flex items-center gap-2 px-4 py-2 transition-all duration-200" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", background: active === loc.id ? t.iconBg : t.bgCard, border: `1px solid ${active === loc.id ? t.borderCardHover : t.borderCard}`, color: active === loc.id ? t.cyan : t.textMuted, boxShadow: active === loc.id ? `0 0 12px ${t.cyanGlow}` : "none" }}>
          <span>{loc.flag}</span><span>{loc.city}</span>
        </button>
      ))}
    </div>
  );
}

export default function NetworkSection() {
  const { theme } = useTheme();
  const t = getTokens(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeLocation = locations.find((l) => l.id === activeId) ?? null;
  const handleSelect = (id: string) => setActiveId(prev => prev === id ? null : id);

  return (
    <section id="network" className="py-24 lg:py-32" style={{ background: t.bgAlt }}>
      <div className="container">
        <div ref={ref} className="mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="evo-divider" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="evo-section-title" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: t.textPrimary }}>4 Strategic Hubs.<br />One Seamless Network.</h2>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", lineHeight: 1.65, color: t.textSecondary, maxWidth: "28rem" }} className="lg:text-right">Strategically positioned at the crossroads of Central, Eastern, and Southern Europe — covering the Black Sea, Danube, and Adriatic corridors.</p>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }} className="mb-4">
          <LocationTabs active={activeId} onSelect={handleSelect} t={t} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }} className="flex flex-col lg:flex-row gap-0" style={{ border: `1px solid ${t.borderCard}`, boxShadow: theme === "dark" ? "0 0 40px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.1)" }}>
          <div className="lg:w-80 flex-shrink-0">
            {activeLocation ? (
              <DetailPanel loc={activeLocation} onClose={() => setActiveId(null)} t={t} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center" style={{ background: t.bgPanel, minHeight: "200px" }}>
                <div className="mb-3" style={{ color: t.cyan, opacity: 0.4 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: t.textMuted }}>Select an office<br />to view details</p>
              </div>
            )}
          </div>
          <div className="flex-1" style={{ minHeight: "520px" }}><LeafletMap activeId={activeId} onPinClick={handleSelect} /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="mt-8 text-center">
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.textMuted }}>Black Sea · Danube · Adriatic · Mediterranean</p>
        </motion.div>
      </div>
    </section>
  );
}
