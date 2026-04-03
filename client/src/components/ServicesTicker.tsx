/*
  EVO Maritime Services Ticker
  Design: Horizontal scrolling marquee of service names, cyan separator dots
  Dark background strip, Barlow Condensed uppercase
*/
export default function ServicesTicker() {
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
        background: "oklch(0.82 0.18 200 / 8%)",
        borderTop: "1px solid oklch(0.82 0.18 200 / 20%)",
        borderBottom: "1px solid oklch(0.82 0.18 200 / 20%)",
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
                color: "oklch(0.82 0.18 200)",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "oklch(0.82 0.18 200 / 40%)",
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
