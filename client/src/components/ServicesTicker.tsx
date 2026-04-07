/*
  EVO Maritime Services Ticker
  Design: Horizontal scrolling marquee of service names, cyan separator dots
  Theme-aware: dark navy strip / light steel strip
*/
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

export default function ServicesTicker() {
  const { theme } = useTheme();
  const t = getTokens(theme);

  const items = [
    "Ocean Chartering",
    "River Chartering",
    "Project Cargo",
    "RoRo Operations",
    "Heavy Lift",
    "Break Bulk",
    "FCL / LCL",
    "Air Freight",
    "Ships Agency",
    "Oversized Trucking",
    "Rail Freight",
    "Bulk Cargo",
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        background: t.cyanBg,
        borderTop: `1px solid ${t.borderCard}`,
        borderBottom: `1px solid ${t.borderCard}`,
      }}
    >
      <div className="ticker-track items-center whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="px-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: t.cyan,
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: t.dividerLine,
                fontSize: "0.6rem",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
