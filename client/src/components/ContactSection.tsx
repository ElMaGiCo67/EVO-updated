/*
  EVO Maritime Contact Section
  Design: Alt background, left contact info + right form
  Theme-aware: dark navy / light steel-white, cyan CTA, Barlow Condensed headings
*/
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { getTokens } from "@/lib/theme-tokens";

export default function ContactSection() {
  const { theme } = useTheme();
  const t = getTokens(theme);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", cargo: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Quote Request — ${form.cargo || "Cargo"} | ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Quote Request from EVO Maritime Website\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Name:     ${form.name}\n` +
      `Company:  ${form.company}\n` +
      `Email:    ${form.email}\n` +
      `Phone:    ${form.phone}\n` +
      `Cargo:    ${form.cargo}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Message:\n${form.message}\n`
    );
    window.location.href = `mailto:office@evo-maritime.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Your email client has opened — please send the pre-filled message.", { duration: 6000 });
      setForm({ name: "", company: "", email: "", phone: "", cargo: "", message: "" });
    }, 400);
  };

  const inputStyle = {
    background: t.inputBg,
    border: `1px solid ${t.inputBorder}`,
    color: t.textPrimary,
    fontFamily: "'Barlow', sans-serif",
    fontSize: "0.9rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "0.72rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: t.textMuted,
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ background: t.bgAlt }}>
      <div className="container">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="evo-divider" />
              <h2 className="evo-section-title mb-6" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}>
                Let's Move<br />
                <span style={{ color: t.cyan, textShadow: `0 0 30px ${t.cyanGlow}` }}>What Others Can't.</span>
              </h2>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: t.textSecondary }}>
              Tell us about your cargo. Whether it's a single container or a full vessel charter,
              a standard shipment or an out-of-gauge project — we'll find the route, the vessel, and the solution.
            </motion.p>

            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }} className="space-y-4 mb-10">
              <a href="mailto:office@evo-maritime.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ border: `1px solid ${t.borderCard}`, background: t.iconBg }}>
                  <Mail size={16} style={{ color: t.cyan }} />
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 0 }}>Email</div>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, fontSize: "1rem", color: t.cyan }}>
                    office@evo-maritime.com
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Office list */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }} className="space-y-4">
              {[
                { flag: "🇧🇬", country: "Bulgaria", city: "Varna, Gen. Kolev 113", phone: "+359 52 300098" },
                { flag: "🇷🇴", country: "Romania", city: "Constanta Port, Gate 1", phone: "+40 372 903325" },
                { flag: "🇷🇸", country: "Serbia", city: "Belgrade, Bul. Oslobodjenja 235", phone: "+381 114540071" },
                { flag: "🇸🇮", country: "Slovenia", city: "Koper, Smarska 7a", phone: "+381 114540071" },
              ].map((office) => (
                <div key={office.country} className="flex items-start gap-3 p-4"
                  style={{ background: t.bgCard, border: `1px solid ${t.borderCard}` }}>
                  <span className="text-lg flex-shrink-0">{office.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: t.textPrimary }}>
                      {office.country}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} style={{ color: t.textMuted, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.78rem", color: t.textMuted }}>
                        {office.city}
                      </span>
                    </div>
                  </div>
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="flex items-center gap-1 flex-shrink-0">
                    <Phone size={10} style={{ color: t.cyan }} />
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: t.cyan }}>
                      {office.phone}
                    </span>
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="p-8" style={{ background: t.bgCard, border: `1px solid ${t.borderCard}` }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "0.05em", color: t.textPrimary, marginBottom: "1.5rem" }}>
                Request a Quote
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                      onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                      onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                      placeholder="Acme Corp" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                      onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                      placeholder="you@company.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                      onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                      placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Cargo Type / Route</label>
                  <input type="text" value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                    placeholder="e.g. 2× 40ft containers, Constanta → Hamburg" />
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = t.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
                    placeholder="Tell us more about your shipment requirements..." />
                </div>

                <button type="submit" disabled={sending}
                  className="w-full py-4 font-bold tracking-widest uppercase transition-all duration-200"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: "0.15em",
                    background: t.cyan,
                    color: "#070e1c",
                    border: "none",
                    cursor: sending ? "wait" : "pointer",
                    opacity: sending ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {sending ? "Opening Email Client..." : "Send Quote Request →"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
