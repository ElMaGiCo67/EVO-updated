/*
  EVO Maritime Navbar
  Design: Barlow Condensed nav links, sticky with backdrop blur, cyan accent on hover/active
  Mobile: Full-screen overlay slide-in menu
*/
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Network", href: "#network" },
  { label: "Why EVO", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(0.10 0.03 240 / 95%)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex flex-col items-start gap-0.5"
            >
              {/* EVO wordmark — SVG with gradient fill matching the uploaded logo */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px" }}>
                <svg
                  width="110"
                  height="44"
                  viewBox="0 0 110 44"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block", filter: "drop-shadow(0 0 8px rgba(100,180,255,0.35))" }}
                >
                  <defs>
                    {/* White-center, blue-edge vertical gradient matching the image letterforms */}
                    <linearGradient id="evoLetterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b8d8f8" />
                      <stop offset="30%" stopColor="#ffffff" />
                      <stop offset="65%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#7ab4e8" />
                    </linearGradient>
                  </defs>
                  <text
                    x="4"
                    y="38"
                    fontFamily="'Barlow Condensed', 'Arial Narrow', sans-serif"
                    fontSize="46"
                    fontWeight="900"
                    fontStyle="italic"
                    fill="url(#evoLetterGrad)"
                    letterSpacing="2"
                    style={{ textTransform: "uppercase" }}
                  >
                    EVO
                  </text>
                </svg>
                {/* Cyan glowing underline bar */}
                <div
                  style={{
                    width: "110px",
                    height: "3px",
                    background: "linear-gradient(90deg, #00d4ff, #0099cc)",
                    boxShadow: "0 0 8px rgba(0,212,255,0.9), 0 0 18px rgba(0,212,255,0.5)",
                    borderRadius: "2px",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.52rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "oklch(0.82 0.18 200 / 80%)",
                  paddingLeft: "2px",
                }}
              >
                Maritime Services &amp; Logistics
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="evo-nav-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="mailto:office@evo-maritime.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <Mail size={14} />
                office@evo-maritime.com
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="evo-btn-primary text-sm"
              >
                Get Quote
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "oklch(0.08 0.03 240)" }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span
                className="text-white font-black tracking-widest text-2xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                EVO
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-8 gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-white hover:text-cyan-400 transition-colors"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="p-8 border-t border-white/10 space-y-3">
              <a href="tel:+35952300098" className="flex items-center gap-3 text-white/60">
                <Phone size={16} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem" }}>+359 52 300098 (Bulgaria)</span>
              </a>
              <a href="mailto:office@evo-maritime.com" className="flex items-center gap-3 text-white/60">
                <Mail size={16} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem" }}>office@evo-maritime.com</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
