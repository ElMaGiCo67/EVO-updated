/*
  EVO Maritime Footer
  Design: Deep navy / light steel, EVO logo, links, copyright, tagline
  Theme-aware: uses getTokens for all colors
*/
import { Mail, Phone } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

export default function Footer() {
  const { theme } = useTheme();
  const t = getTokens(theme);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-12"
      style={{
        background: t.bgFooter,
        borderTop: `1px solid ${t.borderSubtle}`,
      }}
    >
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", marginBottom: "1rem" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/evo-letters_cf9113fd.png"
                alt="EVO"
                style={{
                  height: "52px",
                  width: "auto",
                  display: "block",
                  filter: theme === "light"
                    ? "drop-shadow(0 0 6px rgba(0,100,180,0.3)) brightness(0.7) saturate(1.5)"
                    : "drop-shadow(0 0 6px rgba(100,180,255,0.4))",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "3px",
                  background: "linear-gradient(90deg, #00d4ff, #0099cc)",
                  boxShadow: "0 0 8px rgba(0,212,255,0.9), 0 0 18px rgba(0,212,255,0.5)",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: t.cyan,
                  textAlign: "center",
                }}
              >
                Maritime Services &amp; Logistics
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                color: t.textWhite40,
                maxWidth: "20rem",
              }}
            >
              Evolution in Maritime Logistics. Four strategic hubs across Southeast Europe,
              delivering end-to-end multimodal solutions since 2017.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: t.textMuted,
                marginBottom: "1rem",
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Our Work", href: "#work" },
                { label: "Network", href: "#network" },
                { label: "Why EVO", href: "#why" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "0.88rem",
                      color: t.textWhite40,
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
                    onMouseLeave={e => (e.currentTarget.style.color = t.textWhite40)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: t.textMuted,
                marginBottom: "1rem",
              }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              {[
                { href: "mailto:office@evo-maritime.com", icon: <Mail size={13} />, label: "office@evo-maritime.com" },
                { href: "tel:+35952300098", icon: <Phone size={13} />, label: "+359 52 300098" },
                { href: "tel:+40372903325", icon: <Phone size={13} />, label: "+40 372 903325" },
                { href: "tel:+381114540071", icon: <Phone size={13} />, label: "+381 114540071" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2"
                  style={{ color: t.textWhite40, textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.textWhite40)}
                >
                  {item.icon}
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem" }}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${t.borderSubtle}` }}
        >
          <span
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", color: t.textWhite30 }}
          >
            © {new Date().getFullYear()} EVO Maritime Services & Logistics. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: t.cyan,
            }}
          >
            Evolution in Maritime Logistics
          </span>
        </div>
      </div>
    </footer>
  );
}
