/*
  EVO Maritime Network Section
  Design: Dark alt background, map image, 4 location cards with glowing borders
  Country name prominent, address and phone below, anchor/ship icons
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Anchor, Ship, Building, Navigation } from "lucide-react";

const NETWORK_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/evo-contact-bg-SEPvPHavNtEKhcBvrUcLtx.webp";

const locations = [
  {
    country: "Bulgaria",
    city: "Varna",
    address: "Gen. Kolev 113",
    phone: "+359 52 300098",
    role: "Port HQ & Black Sea Operations",
    icon: Anchor,
    flag: "🇧🇬",
  },
  {
    country: "Romania",
    city: "Constanta",
    address: "Constanta Port, Gate 1",
    phone: "+40 372 903325",
    role: "Port Operations & River Gateway",
    icon: Ship,
    flag: "🇷🇴",
  },
  {
    country: "Serbia",
    city: "Belgrade",
    address: "Bul. Oslobodjenja 235",
    phone: "+381 114540071",
    role: "Central Balkans Inland Hub",
    icon: Building,
    flag: "🇷🇸",
  },
  {
    country: "Slovenia",
    city: "Koper",
    address: "Smarska 7a",
    phone: "+381 114540071",
    role: "Adriatic Gateway to Western Europe",
    icon: Navigation,
    flag: "🇸🇮",
  },
];

export default function NetworkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="network"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.12 0.035 240)" }}
    >
      {/* Map background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${NETWORK_BG})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, oklch(0.12 0.035 240 / 60%), oklch(0.12 0.035 240 / 80%))",
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

        {/* Location Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc, i) => {
            const Icon = loc.icon;
            return (
              <motion.div
                key={loc.country}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="evo-card p-6 flex flex-col gap-4"
              >
                {/* Country header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{loc.flag}</span>
                    <span
                      className="text-white"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {loc.country}
                    </span>
                  </div>
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      border: "1px solid oklch(0.82 0.18 200 / 30%)",
                      background: "oklch(0.82 0.18 200 / 8%)",
                    }}
                  >
                    <Icon size={14} style={{ color: "oklch(0.82 0.18 200)" }} />
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full"
                  style={{ background: "oklch(0.82 0.18 200 / 20%)" }}
                />

                {/* City */}
                <div>
                  <span
                    className="evo-cyan block"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {loc.city}
                  </span>
                  <span
                    className="text-white/40"
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "0.78rem",
                    }}
                  >
                    {loc.role}
                  </span>
                </div>

                {/* Address & Phone */}
                <div className="space-y-2 mt-auto">
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-white/30 mt-0.5 flex-shrink-0" />
                    <span
                      className="text-white/55"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem" }}
                    >
                      {loc.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-white/30 flex-shrink-0" />
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="evo-cyan hover:opacity-80 transition-opacity"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p
            className="text-white/35"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
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
