/*
  EVO Maritime Footer
  Design: Deep navy, EVO logo, links, copyright, tagline
*/
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-12 border-t"
      style={{
        background: "oklch(0.08 0.03 240)",
        borderColor: "oklch(1 0 0 / 8%)",
      }}
    >
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start gap-0 mb-4">
              {/* EVO image-based logo — same as navbar */}
              <img
                src="https://static-assets.manus.space/file/webdev-static-assets/evo-letters.png"
                alt="EVO"
                style={{ height: "52px", width: "auto", display: "block" }}
              />
              <div
                className="w-full h-0.5"
                style={{
                  background: "oklch(0.82 0.18 200)",
                  boxShadow: "0 0 10px oklch(0.82 0.18 200 / 90%)",
                  marginTop: "2px",
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "oklch(0.82 0.18 200)",
                  marginTop: "4px",
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Maritime Services &amp; Logistics
              </span>
            </div>
            <p
              className="text-white/40 max-w-xs"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "0.85rem",
                lineHeight: 1.65,
              }}
            >
              Evolution in Maritime Logistics. Four strategic hubs across Southeast Europe,
              delivering end-to-end multimodal solutions since 2017.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white/60 mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
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
                    className="text-white/40 hover:text-white transition-colors"
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "0.88rem",
                    }}
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
              className="text-white/60 mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:office@evo-maritime.com"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              >
                <Mail size={13} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem" }}>
                  office@evo-maritime.com
                </span>
              </a>
              <a
                href="tel:+35952300098"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              >
                <Phone size={13} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem" }}>
                  +359 52 300098
                </span>
              </a>
              <a
                href="tel:+40372903325"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              >
                <Phone size={13} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem" }}>
                  +40 372 903325
                </span>
              </a>
              <a
                href="tel:+381114540071"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              >
                <Phone size={13} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem" }}>
                  +381 114540071
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <span
            className="text-white/25"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem" }}
          >
            © {new Date().getFullYear()} EVO Maritime Services & Logistics. All rights reserved.
          </span>
          <span
            className="evo-cyan"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Evolution in Maritime Logistics
          </span>
        </div>
      </div>
    </footer>
  );
}
