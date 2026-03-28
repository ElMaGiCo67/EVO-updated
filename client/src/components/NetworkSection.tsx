/*
  EVO Maritime Network Section — Interactive Map
  Design: Dark navy background, full-width Google Maps with custom dark style,
  4 cyan glowing office pins, click-to-reveal detail panel on the left.
  Map style mirrors the site palette: near-black land, cyan water labels,
  muted roads, no POI clutter.
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { MapPin, Phone, Anchor, Ship, Building, Navigation, X, Mail } from "lucide-react";
import { MapView } from "@/components/Map";

// ── Office data ──────────────────────────────────────────────────────────────
const locations = [
  {
    id: "bulgaria",
    country: "Bulgaria",
    city: "Varna",
    address: "Gen. Kolev 113, Varna",
    phone: "+359 52 300098",
    email: "office@evo-maritime.com",
    role: "Port HQ & Black Sea Operations",
    icon: Anchor,
    flag: "🇧🇬",
    lat: 43.2141,
    lng: 27.9147,
    detail: "Our founding office and Black Sea operations hub. Direct access to the Port of Varna — Bulgaria's largest port on the Black Sea.",
  },
  {
    id: "romania",
    country: "Romania",
    city: "Constanta",
    address: "Constanta Port, Gate 1",
    phone: "+40 372 903325",
    email: "office@evo-maritime.com",
    role: "Port Operations & River Gateway",
    icon: Ship,
    flag: "🇷🇴",
    lat: 44.1598,
    lng: 28.6348,
    detail: "Located inside the Port of Constanta — the largest port on the Black Sea and a key gateway to the Danube river network.",
  },
  {
    id: "serbia",
    country: "Serbia",
    city: "Belgrade",
    address: "Bul. Oslobodjenja 235, Belgrade",
    phone: "+381 114540071",
    email: "office@evo-maritime.com",
    role: "Central Balkans Inland Hub",
    icon: Building,
    flag: "🇷🇸",
    lat: 44.8176,
    lng: 20.4633,
    detail: "Our inland hub at the confluence of the Sava and Danube rivers — serving Central Balkans project cargo and multimodal operations.",
  },
  {
    id: "slovenia",
    country: "Slovenia",
    city: "Koper",
    address: "Smarska 7a, Koper",
    phone: "+381 114540071",
    email: "office@evo-maritime.com",
    role: "Adriatic Gateway to Western Europe",
    icon: Navigation,
    flag: "🇸🇮",
    lat: 45.5469,
    lng: 13.7294,
    detail: "Established in 2025 at the Port of Koper — Slovenia's only sea port and the fastest Adriatic gateway to Central and Western Europe.",
  },
];

// ── Custom dark map style ────────────────────────────────────────────────────
const DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0a1628" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#070e1c" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4a6080" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1a2f4a" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#2a4060" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#0c1a2e" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#0d1f35" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#2a4060" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#0a1f30" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#1a3a50" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#0f2040" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#071525" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#2a4060" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#122840" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#071525" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#3a5a7a" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0d1f35" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#2a4060" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#071525" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#1a4060" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#070e1c" }] },
];

// ── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({
  loc,
  onClose,
}: {
  loc: typeof locations[0] | null;
  onClose: () => void;
}) {
  if (!loc) return null;
  const Icon = loc.icon;

  return (
    <motion.div
      key={loc.id}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-4 left-4 z-20 w-72 flex flex-col"
      style={{
        background: "oklch(0.10 0.03 240 / 96%)",
        border: "1px solid oklch(0.82 0.18 200 / 50%)",
        boxShadow: "0 0 30px oklch(0.82 0.18 200 / 15%), 0 8px 32px oklch(0 0 0 / 60%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top glow line */}
      <div
        className="h-0.5 w-full"
        style={{
          background: "oklch(0.82 0.18 200)",
          boxShadow: "0 0 10px oklch(0.82 0.18 200 / 80%)",
        }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{loc.flag}</span>
            <div>
              <div
                className="text-white"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {loc.country}
              </div>
              <div
                style={{
                  color: "oklch(0.82 0.18 200)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {loc.city}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Role badge */}
        <div
          className="px-3 py-1.5 mb-4 inline-block"
          style={{
            background: "oklch(0.82 0.18 200 / 10%)",
            border: "1px solid oklch(0.82 0.18 200 / 25%)",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon size={12} style={{ color: "oklch(0.82 0.18 200)" }} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.82 0.18 200)",
              }}
            >
              {loc.role}
            </span>
          </div>
        </div>

        {/* Detail text */}
        <p
          className="text-white/60 mb-5"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "0.85rem",
            lineHeight: 1.65,
          }}
        >
          {loc.detail}
        </p>

        {/* Divider */}
        <div className="h-px w-full mb-4" style={{ background: "oklch(1 0 0 / 8%)" }} />

        {/* Contact details */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <MapPin size={13} style={{ color: "oklch(0.82 0.18 200)", flexShrink: 0, marginTop: 2 }} />
            <span
              className="text-white/55"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem", lineHeight: 1.4 }}
            >
              {loc.address}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone size={13} style={{ color: "oklch(0.82 0.18 200)", flexShrink: 0 }} />
            <a
              href={`tel:${loc.phone.replace(/\s/g, "")}`}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "oklch(0.82 0.18 200)",
                letterSpacing: "0.05em",
              }}
            >
              {loc.phone}
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail size={13} style={{ color: "oklch(0.82 0.18 200)", flexShrink: 0 }} />
            <a
              href={`mailto:${loc.email}`}
              className="hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.82rem",
                color: "oklch(0.82 0.18 200)",
              }}
            >
              {loc.email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Location Tab Buttons ─────────────────────────────────────────────────────
function LocationTabs({
  active,
  onSelect,
}: {
  active: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {locations.map((loc) => (
        <button
          key={loc.id}
          onClick={() => onSelect(loc.id)}
          className="flex items-center gap-2 px-4 py-2 transition-all duration-200"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: active === loc.id ? "oklch(0.82 0.18 200 / 15%)" : "oklch(0.14 0.04 240)",
            border: `1px solid ${active === loc.id ? "oklch(0.82 0.18 200 / 70%)" : "oklch(1 0 0 / 10%)"}`,
            color: active === loc.id ? "oklch(0.82 0.18 200)" : "oklch(0.65 0.02 240)",
            boxShadow: active === loc.id ? "0 0 12px oklch(0.82 0.18 200 / 20%)" : "none",
          }}
        >
          <span>{loc.flag}</span>
          <span>{loc.city}</span>
        </button>
      ))}
    </div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function NetworkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeLocation = locations.find((l) => l.id === activeId) ?? null;

  // Build a custom cyan SVG pin element
  const buildPinElement = useCallback((isActive: boolean) => {
    const el = document.createElement("div");
    el.style.cssText = `
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    `;
    el.innerHTML = `
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <path d="M18 2C10.268 2 4 8.268 4 16C4 26 18 42 18 42C18 42 32 26 32 16C32 8.268 25.732 2 18 2Z"
          fill="${isActive ? "oklch(0.82 0.18 200)" : "oklch(0.10 0.03 240)"}"
          stroke="oklch(0.82 0.18 200)"
          stroke-width="2"
          filter="url(#glow)"
        />
        <circle cx="18" cy="16" r="5"
          fill="${isActive ? "oklch(0.10 0.03 240)" : "oklch(0.82 0.18 200)"}"
        />
      </svg>
    `;
    return el;
  }, []);

  const handleMapReady = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;

      // Apply dark style
      map.setOptions({ styles: DARK_MAP_STYLE });

      // Place markers for each office
      locations.forEach((loc) => {
        const pinEl = buildPinElement(false);

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: loc.lat, lng: loc.lng },
          title: `${loc.city}, ${loc.country}`,
          content: pinEl,
        });

        marker.addListener("click", () => {
          setActiveId((prev) => (prev === loc.id ? null : loc.id));
          map.panTo({ lat: loc.lat, lng: loc.lng });
          map.setZoom(10);
        });

        markersRef.current.push(marker);
      });
    },
    [buildPinElement]
  );

  // Update marker visuals when active changes
  const handleSelect = useCallback(
    (id: string) => {
      const newActive = activeId === id ? null : id;
      setActiveId(newActive);

      const loc = locations.find((l) => l.id === id);
      if (loc && mapRef.current) {
        mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
        mapRef.current.setZoom(10);
      }

      // Rebuild pin elements to reflect active state
      markersRef.current.forEach((marker, i) => {
        const isActive = locations[i].id === newActive;
        const newEl = buildPinElement(isActive);
        marker.content = newEl;
        // Re-attach click listener
        marker.addListener("click", () => {
          handleSelect(locations[i].id);
        });
      });
    },
    [activeId, buildPinElement]
  );

  // Sync marker visuals when activeId changes
  const syncMarkers = useCallback(
    (newActiveId: string | null) => {
      markersRef.current.forEach((marker, i) => {
        if (!marker) return;
        const isActive = locations[i].id === newActiveId;
        const newEl = buildPinElement(isActive);
        marker.content = newEl;
      });
    },
    [buildPinElement]
  );

  // Override setActiveId to also sync markers
  const handleMarkerClick = useCallback(
    (id: string) => {
      setActiveId((prev) => {
        const next = prev === id ? null : id;
        syncMarkers(next);
        const loc = locations.find((l) => l.id === id);
        if (loc && mapRef.current) {
          mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
          mapRef.current.setZoom(10);
        }
        return next;
      });
    },
    [syncMarkers]
  );

  const handleMapReadyFinal = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      map.setOptions({ styles: DARK_MAP_STYLE });

      locations.forEach((loc, i) => {
        const pinEl = buildPinElement(false);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: loc.lat, lng: loc.lng },
          title: `${loc.city}, ${loc.country}`,
          content: pinEl,
        });
        // AdvancedMarkerElement uses 'gmp-click' not 'click'
        marker.addListener("gmp-click", () => handleMarkerClick(loc.id));
        markersRef.current[i] = marker;
      });
    },
    [buildPinElement, handleMarkerClick]
  );

  return (
    <section
      id="network"
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.12 0.035 240)" }}
    >
      <div className="container">
        {/* ── Section Header ── */}
        <div ref={ref} className="mb-10">
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
                4 Strategic Hubs.<br />One Seamless Network.
              </h2>
              <p
                className="text-white/55 max-w-md lg:text-right"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                }}
              >
                Strategically positioned at the crossroads of Central, Eastern, and Southern Europe —
                covering the Black Sea, Danube, and Adriatic corridors.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Location Tab Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4"
        >
          <LocationTabs
            active={activeId}
            onSelect={(id) => {
              const newActive = activeId === id ? null : id;
              setActiveId(newActive);
              syncMarkers(newActive);
              const loc = locations.find((l) => l.id === id);
              if (loc && mapRef.current) {
                mapRef.current.panTo({ lat: loc.lat, lng: loc.lng });
                mapRef.current.setZoom(10);
              }
            }}
          />
        </motion.div>

        {/* ── Map Container ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative"
          style={{
            border: "1px solid oklch(0.82 0.18 200 / 20%)",
            boxShadow: "0 0 40px oklch(0 0 0 / 40%)",
          }}
        >
          {/* Detail panel overlay */}
          <DetailPanel
            loc={activeLocation}
            onClose={() => {
              setActiveId(null);
              syncMarkers(null);
            }}
          />

          {/* Hint overlay when no pin selected */}
          {!activeId && (
            <div
              className="absolute bottom-4 right-4 z-10 px-3 py-2 flex items-center gap-2"
              style={{
                background: "oklch(0.10 0.03 240 / 85%)",
                border: "1px solid oklch(1 0 0 / 10%)",
                backdropFilter: "blur(8px)",
              }}
            >
              <MapPin size={12} style={{ color: "oklch(0.82 0.18 200)" }} />
              <span
                className="text-white/50"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Click a pin to view office details
              </span>
            </div>
          )}

          <MapView
            className="w-full h-[520px] lg:h-[600px]"
            initialCenter={{ lat: 43.5, lng: 24.0 }}
            initialZoom={5}
            onMapReady={handleMapReadyFinal}
          />
        </motion.div>

        {/* ── Bottom tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p
            className="text-white/30"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Black Sea · Danube · Adriatic · Mediterranean
          </p>
        </motion.div>
      </div>
    </section>
  );
}
