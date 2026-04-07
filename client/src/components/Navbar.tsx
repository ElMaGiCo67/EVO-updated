/*
  EVO Maritime Navbar
  Design: Barlow Condensed nav links, sticky with backdrop blur, cyan accent on hover/active
  Theme-aware: dark navy / light steel-white
  Mobile: Full-screen overlay slide-in menu
*/
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Sun, Moon, Phone } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

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
  const { theme, toggleTheme } = useTheme();
  const t = getTokens(theme);

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
          background: scrolled ? t.bgNavScrolled : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${t.borderSubtle}` : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex flex-col items-center gap-0.5"
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/evo-letters_cf9113fd.png"
                  alt="EVO"
                  style={{
                    height: "44px",
                    width: "auto",
                    objectFit: "contain",
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
              </div>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.52rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: t.cyan,
                  textAlign: "center",
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
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: t.textSecondary,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.cyan)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="mailto:office@evo-maritime.com"
                className="flex items-center gap-2 transition-colors text-sm"
                style={{ fontFamily: "'Barlow', sans-serif", color: t.textMuted, textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = t.textPrimary)}
                onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}
              >
                <Mail size={14} />
                office@evo-maritime.com
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle light/dark mode"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "4px",
                  border: `1px solid ${t.borderCard}`,
                  background: "transparent",
                  color: t.cyan,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = t.cyanBg)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

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
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ color: t.textPrimary }}
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
            style={{ background: t.bgMobileMenu }}
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: `1px solid ${t.borderSubtle}` }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, letterSpacing: "0.1em", fontSize: "1.5rem", color: t.textPrimary }}>
                EVO
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  style={{ color: t.cyan, background: "transparent", border: `1px solid ${t.borderCard}`, padding: "6px", borderRadius: "4px" }}
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button onClick={() => setMobileOpen(false)} style={{ color: t.textPrimary }}>
                  <X size={24} />
                </button>
              </div>
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
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: t.textPrimary,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="p-8 space-y-3" style={{ borderTop: `1px solid ${t.borderSubtle}` }}>
              <a href="tel:+35952300098" className="flex items-center gap-3" style={{ color: t.textSecondary, textDecoration: "none" }}>
                <Phone size={16} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem" }}>+359 52 300098 (Bulgaria)</span>
              </a>
              <a href="mailto:office@evo-maritime.com" className="flex items-center gap-3" style={{ color: t.textSecondary, textDecoration: "none" }}>
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
