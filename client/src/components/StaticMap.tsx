/*
  EVO Maritime — Static SVG Map of Southeast Europe
  No external API. Renders a stylised outline of SE Europe with 4 office pins.
  Pins are positioned using approximate SVG coordinates derived from lat/lng.
*/

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

// ── Location data ────────────────────────────────────────────────────────────
// SVG viewport: 0 0 800 600
// Approximate mapping: lng 12–35 → x 0–800, lat 39–52 → y 0–600 (inverted)
const LNG_MIN = 12, LNG_MAX = 35;
const LAT_MIN = 39, LAT_MAX = 52;

function toSVG(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 800;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 600;
  return { x, y };
}

export const locations = [
  {
    id: "bulgaria",
    country: "Bulgaria",
    city: "Varna",
    address: "Gen. Kolev 113, Varna",
    phone: "+359 52 300098",
    email: "office@evo-maritime.com",
    role: "Port HQ & Black Sea Operations",
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
    flag: "🇸🇮",
    lat: 45.5469,
    lng: 13.7294,
    detail: "Established in 2025 at the Port of Koper — Slovenia's only sea port and the fastest Adriatic gateway to Central and Western Europe.",
  },
];

// ── SVG land paths (simplified SE Europe outlines) ───────────────────────────
// Country outlines are simplified polygons approximated from real borders.
// They are decorative — accuracy is intentionally reduced for a clean look.
const LAND_PATHS = [
  // Slovenia
  { id: "si", d: "M 118 148 L 132 142 L 148 148 L 152 158 L 138 165 L 120 162 Z" },
  // Croatia (rough)
  { id: "hr", d: "M 120 162 L 138 165 L 152 158 L 168 168 L 175 185 L 165 200 L 148 210 L 132 205 L 118 195 L 110 178 Z" },
  // Bosnia
  { id: "ba", d: "M 148 210 L 165 200 L 180 205 L 188 220 L 178 235 L 160 238 L 145 228 Z" },
  // Serbia
  { id: "rs", d: "M 168 168 L 195 160 L 215 165 L 228 180 L 225 200 L 210 215 L 195 225 L 178 235 L 188 220 L 180 205 L 165 200 L 175 185 Z" },
  // Montenegro
  { id: "me", d: "M 160 238 L 178 235 L 185 248 L 172 258 L 158 252 Z" },
  // North Macedonia
  { id: "mk", d: "M 210 215 L 228 210 L 242 218 L 240 235 L 222 240 L 208 232 Z" },
  // Kosovo
  { id: "xk", d: "M 195 225 L 210 215 L 208 232 L 195 235 L 188 228 Z" },
  // Albania
  { id: "al", d: "M 172 258 L 185 248 L 195 255 L 198 272 L 185 280 L 170 272 Z" },
  // Bulgaria
  { id: "bg", d: "M 228 180 L 258 172 L 285 175 L 298 188 L 295 210 L 278 225 L 258 228 L 240 235 L 228 210 L 215 200 L 215 165 Z" },
  // Romania
  { id: "ro", d: "M 215 165 L 228 180 L 215 200 L 228 210 L 258 228 L 278 225 L 295 210 L 298 188 L 310 178 L 318 160 L 305 142 L 280 135 L 255 138 L 235 148 L 218 155 Z" },
  // Moldova
  { id: "md", d: "M 318 160 L 335 152 L 345 162 L 340 178 L 325 182 L 310 178 Z" },
  // Ukraine (partial — southern)
  { id: "ua", d: "M 280 135 L 305 142 L 318 160 L 335 152 L 355 145 L 375 138 L 390 125 L 380 108 L 355 100 L 325 98 L 300 105 L 278 118 Z" },
  // Hungary
  { id: "hu", d: "M 168 168 L 195 160 L 218 155 L 235 148 L 240 135 L 225 120 L 200 115 L 175 120 L 158 132 L 152 148 L 168 168 Z" },
  // Slovakia (partial)
  { id: "sk", d: "M 175 120 L 200 115 L 225 120 L 228 108 L 210 100 L 188 102 L 172 110 Z" },
  // Austria (partial)
  { id: "at", d: "M 118 148 L 132 142 L 152 148 L 158 132 L 148 120 L 130 118 L 112 128 L 108 140 Z" },
  // Greece
  { id: "gr", d: "M 185 280 L 198 272 L 215 268 L 228 275 L 240 265 L 242 280 L 235 298 L 220 312 L 205 318 L 192 308 L 182 295 Z" },
  // Turkey (partial)
  { id: "tr", d: "M 295 210 L 325 205 L 360 198 L 390 200 L 410 215 L 405 235 L 385 248 L 355 252 L 325 248 L 298 240 L 285 225 L 278 225 Z" },
];

// Sea areas (Black Sea, Adriatic, Aegean)
const SEA_PATHS = [
  // Adriatic Sea
  { id: "adriatic", d: "M 120 162 L 118 195 L 132 205 L 148 210 L 160 238 L 158 252 L 148 265 L 135 270 L 118 260 L 108 240 L 105 210 L 108 185 L 112 165 Z" },
  // Black Sea
  { id: "black-sea", d: "M 298 188 L 325 182 L 345 162 L 375 138 L 400 140 L 415 155 L 410 175 L 395 188 L 375 195 L 355 198 L 325 205 L 310 198 L 298 188 Z" },
  // Aegean Sea
  { id: "aegean", d: "M 240 265 L 258 260 L 278 268 L 285 285 L 275 305 L 255 315 L 235 310 L 220 298 L 220 280 Z" },
];

// ── Pin component ─────────────────────────────────────────────────────────────
function MapPin({
  x, y, isActive, onClick, label, isDark,
}: {
  x: number; y: number; isActive: boolean; onClick: () => void; label: string; isDark: boolean;
}) {
  const cyanActive = isDark ? "#00d4ff" : "#0099cc";
  const cyanInactive = isDark ? "#00d4ff" : "#0099cc";
  const fillActive = isDark ? "#00d4ff" : "#0099cc";
  const fillInactive = isDark ? "#0a1628" : "#e8edf5";

  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
      transform={`translate(${x}, ${y})`}
    >
      {/* Pulse ring when active */}
      {isActive && (
        <motion.circle
          r={18}
          fill="none"
          stroke={cyanActive}
          strokeWidth={1.5}
          initial={{ r: 12, opacity: 0.8 }}
          animate={{ r: 22, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {/* Outer glow */}
      <circle
        r={isActive ? 12 : 9}
        fill={isActive ? `${fillActive}22` : "none"}
        stroke={isActive ? cyanActive : cyanInactive}
        strokeWidth={isActive ? 2 : 1.5}
        style={{ transition: "all 0.2s ease" }}
      />
      {/* Inner dot */}
      <circle
        r={isActive ? 5 : 4}
        fill={isActive ? fillActive : fillInactive}
        stroke={isActive ? fillActive : cyanInactive}
        strokeWidth={1.5}
        style={{ transition: "all 0.2s ease" }}
      />
      {/* City label */}
      <text
        x={0}
        y={isActive ? -16 : -13}
        textAnchor="middle"
        fill={isActive ? cyanActive : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,20,60,0.6)")}
        fontSize={isActive ? 9 : 8}
        fontWeight={isActive ? 700 : 600}
        fontFamily="'Barlow Condensed', sans-serif"
        letterSpacing="0.08em"
        style={{ transition: "all 0.2s ease", textTransform: "uppercase", userSelect: "none" }}
      >
        {label}
      </text>
    </g>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function StaticMap({
  activeId,
  onPinClick,
}: {
  activeId: string | null;
  onPinClick: (id: string) => void;
}) {
  const { theme } = useTheme();
  const t = getTokens(theme);
  const isDark = theme === "dark";

  const bgColor = isDark ? "#070e1c" : "#dce8f5";
  const landColor = isDark ? "#0d1f38" : "#c8d8ec";
  const landStroke = isDark ? "#1a3050" : "#a8c0d8";
  const seaColor = isDark ? "#071525" : "#aac8e8";
  const gridColor = isDark ? "rgba(0,212,255,0.06)" : "rgba(0,100,180,0.08)";

  return (
    <div
      className="relative w-full"
      style={{
        background: bgColor,
        border: `1px solid ${t.borderCard}`,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 800 520"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="EVO Maritime office locations map"
      >
        <defs>
          <filter id="pin-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="land-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={isDark ? "#000" : "#8090a0"} floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Background (sea) */}
        <rect width="800" height="520" fill={bgColor} />

        {/* Subtle grid lines */}
        {[100, 200, 300, 400, 500, 600, 700].map(x => (
          <line key={`vg${x}`} x1={x} y1={0} x2={x} y2={520} stroke={gridColor} strokeWidth={1} />
        ))}
        {[100, 200, 300, 400].map(y => (
          <line key={`hg${y}`} x1={0} y1={y} x2={800} y2={y} stroke={gridColor} strokeWidth={1} />
        ))}

        {/* Sea areas */}
        {SEA_PATHS.map(p => (
          <path key={p.id} d={p.d} fill={seaColor} stroke="none" />
        ))}

        {/* Land */}
        {LAND_PATHS.map(p => (
          <path
            key={p.id}
            d={p.d}
            fill={landColor}
            stroke={landStroke}
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
        ))}

        {/* Latitude/Longitude labels */}
        <text x={8} y={16} fill={gridColor} fontSize={7} fontFamily="monospace">52°N</text>
        <text x={8} y={116} fill={gridColor} fontSize={7} fontFamily="monospace">49°N</text>
        <text x={8} y={216} fill={gridColor} fontSize={7} fontFamily="monospace">46°N</text>
        <text x={8} y={316} fill={gridColor} fontSize={7} fontFamily="monospace">43°N</text>
        <text x={8} y={416} fill={gridColor} fontSize={7} fontFamily="monospace">40°N</text>

        {/* Sea labels */}
        <text x={130} y={230} fill={isDark ? "rgba(0,212,255,0.25)" : "rgba(0,80,160,0.3)"} fontSize={9} fontFamily="'Barlow Condensed', sans-serif" fontWeight={600} letterSpacing="0.15em" textAnchor="middle">ADRIATIC</text>
        <text x={350} y={175} fill={isDark ? "rgba(0,212,255,0.25)" : "rgba(0,80,160,0.3)"} fontSize={9} fontFamily="'Barlow Condensed', sans-serif" fontWeight={600} letterSpacing="0.15em" textAnchor="middle">BLACK SEA</text>
        <text x={258} y={295} fill={isDark ? "rgba(0,212,255,0.20)" : "rgba(0,80,160,0.25)"} fontSize={8} fontFamily="'Barlow Condensed', sans-serif" fontWeight={600} letterSpacing="0.12em" textAnchor="middle">AEGEAN</text>

        {/* Office pins */}
        {locations.map(loc => {
          const { x, y } = toSVG(loc.lat, loc.lng);
          return (
            <g key={loc.id} filter="url(#pin-glow)">
              <MapPin
                x={x}
                y={y}
                isActive={activeId === loc.id}
                onClick={() => onPinClick(loc.id)}
                label={loc.city}
                isDark={isDark}
              />
            </g>
          );
        })}

        {/* Connection lines between offices */}
        {locations.map((loc, i) => {
          if (i === 0) return null;
          const from = toSVG(locations[0].lat, locations[0].lng);
          const to = toSVG(loc.lat, loc.lng);
          return (
            <line
              key={`conn-${loc.id}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={isDark ? "rgba(0,212,255,0.12)" : "rgba(0,100,180,0.15)"}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>

      {/* Hint text */}
      <div
        className="absolute bottom-3 right-3 px-2.5 py-1.5 flex items-center gap-1.5"
        style={{
          background: isDark ? "rgba(7,14,28,0.85)" : "rgba(240,246,255,0.9)",
          border: `1px solid ${t.borderSubtle}`,
          backdropFilter: "blur(6px)",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="4" fill="none" stroke={t.cyan} strokeWidth="1.5" />
          <circle cx="5" cy="5" r="2" fill={t.cyan} />
        </svg>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted }}>
          Click a pin to view office details
        </span>
      </div>
    </div>
  );
}
// cache bust 1775581716
