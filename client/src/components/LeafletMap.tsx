/*
  EVO Maritime — Leaflet Map Component
  Uses CartoDB Dark Matter tiles (free, no API key, dark-styled)
  with 4 EVO office pins and click-to-detail interaction.
*/
import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export interface OfficeLocation {
  id: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  flag: string;
  lat: number;
  lng: number;
  detail: string;
}

export const locations: OfficeLocation[] = [
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
    address: "Bulevar Mihajla Pupina 10v, Belgrade",
    phone: "+381 114540071",
    email: "office@evo-maritime.com",
    role: "Inland Hub & Danube Operations",
    flag: "🇷🇸",
    lat: 44.8176,
    lng: 20.4633,
    detail: "Our inland hub at the confluence of the Sava and Danube rivers — the gateway to Central Balkans and the European inland waterway network.",
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

interface LeafletMapProps {
  activeId: string | null;
  onPinClick: (id: string) => void;
}

export default function LeafletMap({ activeId, onPinClick }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default icon paths for bundlers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [44.0, 22.0],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // CartoDB Dark Matter — free, no API key, dark-styled tiles
      L.tileLayer(
        isDark
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Custom cyan pin icon
      const makePinIcon = (isActive: boolean) =>
        L.divIcon({
          className: "",
          html: `
            <div style="
              position: relative;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                width: ${isActive ? 20 : 14}px;
                height: ${isActive ? 20 : 14}px;
                border-radius: 50%;
                background: ${isActive ? "#00d4ff" : "transparent"};
                border: 2.5px solid #00d4ff;
                box-shadow: 0 0 ${isActive ? 18 : 10}px #00d4ff, 0 0 ${isActive ? 36 : 20}px rgba(0,212,255,0.4);
                transition: all 0.3s ease;
              "></div>
              ${isActive ? `<div style="
                position: absolute;
                width: 34px;
                height: 34px;
                border-radius: 50%;
                border: 1.5px solid rgba(0,212,255,0.4);
                animation: pulse 1.5s infinite;
              "></div>` : ""}
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });

      // Add markers
      locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: makePinIcon(false),
          title: loc.city,
        }).addTo(map);

        marker.on("click", () => {
          onPinClick(loc.id);
        });

        markersRef.current[loc.id] = { marker, L, makePinIcon };
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = {};
      }
    };
  }, []);

  // Update marker icons when activeId changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, { marker, L, makePinIcon }]) => {
      marker.setIcon(makePinIcon(id === activeId));
    });
  }, [activeId]);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        .leaflet-container {
          background: ${isDark ? "#070e1c" : "#e8f0f8"} !important;
          font-family: 'Barlow Condensed', sans-serif;
        }
        .leaflet-control-attribution {
          background: ${isDark ? "rgba(7,14,28,0.85)" : "rgba(240,246,255,0.9)"} !important;
          color: ${isDark ? "rgba(0,212,255,0.5)" : "rgba(0,80,160,0.6)"} !important;
          font-size: 9px !important;
          border-radius: 0 !important;
        }
        .leaflet-control-attribution a {
          color: ${isDark ? "rgba(0,212,255,0.7)" : "rgba(0,80,160,0.8)"} !important;
        }
        .leaflet-control-zoom {
          border: 1px solid ${isDark ? "rgba(0,212,255,0.2)" : "rgba(0,100,180,0.2)"} !important;
          border-radius: 0 !important;
        }
        .leaflet-control-zoom a {
          background: ${isDark ? "rgba(7,14,28,0.9)" : "rgba(240,246,255,0.95)"} !important;
          color: ${isDark ? "#00d4ff" : "#0060b0"} !important;
          border-color: ${isDark ? "rgba(0,212,255,0.2)" : "rgba(0,100,180,0.2)"} !important;
          border-radius: 0 !important;
          font-family: 'Barlow Condensed', sans-serif !important;
        }
        .leaflet-control-zoom a:hover {
          background: ${isDark ? "rgba(0,212,255,0.15)" : "rgba(0,100,180,0.1)"} !important;
        }
      `}</style>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "520px",
        }}
      />
    </>
  );
}
