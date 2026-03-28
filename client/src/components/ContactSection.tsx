/*
  EVO Maritime Contact Section
  Design: Dark alt background, left contact info + right form
  Cyan CTA button, Barlow Condensed headings
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", cargo: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch within 24 hours.", {
        style: {
          background: "oklch(0.14 0.04 240)",
          color: "white",
          border: "1px solid oklch(0.82 0.18 200 / 40%)",
        },
      });
      setForm({ name: "", company: "", email: "", phone: "", cargo: "", message: "" });
    }, 1200);
  };

  const inputStyle = {
    background: "oklch(0.10 0.03 240)",
    border: "1px solid oklch(1 0 0 / 12%)",
    color: "white",
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
    color: "oklch(0.60 0.03 240)",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.12 0.035 240)" }}
    >
      <div className="container">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="evo-divider" />
              <h2
                className="evo-section-title mb-6"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                Let's Move<br />
                <span style={{ color: "oklch(0.82 0.18 200)", textShadow: "0 0 30px oklch(0.82 0.18 200 / 40%)" }}>
                  What Others Can't.
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/65 mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
            >
              Tell us about your cargo. Whether it's a single container or a full vessel charter,
              a standard shipment or an out-of-gauge project — we'll find the route, the vessel,
              and the solution.
            </motion.p>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-4 mb-10"
            >
              <a
                href="mailto:office@evo-maritime.com"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{
                    border: "1px solid oklch(0.82 0.18 200 / 30%)",
                    background: "oklch(0.82 0.18 200 / 8%)",
                  }}
                >
                  <Mail size={16} style={{ color: "oklch(0.82 0.18 200)" }} />
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: 0 }}>Email</div>
                  <span
                    className="evo-cyan group-hover:opacity-80 transition-opacity"
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    office@evo-maritime.com
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Office list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-4"
            >
              {[
                { flag: "🇧🇬", country: "Bulgaria", city: "Varna, Gen. Kolev 113", phone: "+359 52 300098" },
                { flag: "🇷🇴", country: "Romania", city: "Constanta Port, Gate 1", phone: "+40 372 903325" },
                { flag: "🇷🇸", country: "Serbia", city: "Belgrade, Bul. Oslobodjenja 235", phone: "+381 114540071" },
                { flag: "🇸🇮", country: "Slovenia", city: "Koper, Smarska 7a", phone: "+381 114540071" },
              ].map((office) => (
                <div
                  key={office.country}
                  className="flex items-start gap-3 p-4"
                  style={{
                    background: "oklch(0.14 0.04 240)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                  }}
                >
                  <span className="text-lg flex-shrink-0">{office.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-white"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {office.country}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-white/30 flex-shrink-0" />
                      <span
                        className="text-white/45"
                        style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.78rem" }}
                      >
                        {office.city}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-1 flex-shrink-0"
                  >
                    <Phone size={10} style={{ color: "oklch(0.82 0.18 200)" }} />
                    <span
                      className="evo-cyan"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                      }}
                    >
                      {office.phone}
                    </span>
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="p-8"
              style={{
                background: "oklch(0.14 0.04 240)",
                border: "1px solid oklch(0.82 0.18 200 / 20%)",
              }}
            >
              <h3
                className="text-white mb-6"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Request a Quote
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.82 0.18 200 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.82 0.18 200 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.82 0.18 200 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.82 0.18 200 / 60%)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Cargo Type / Service Needed</label>
                  <input
                    type="text"
                    value={form.cargo}
                    onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.82 0.18 200 / 60%)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    placeholder="e.g. FCL, Project Cargo, Ocean Charter..."
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message / Details *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.82 0.18 200 / 60%)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    placeholder="Describe your shipment: origin, destination, cargo dimensions, weight, timeline..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="evo-btn-primary w-full flex items-center justify-center gap-2"
                  style={{ opacity: sending ? 0.7 : 1 }}
                >
                  {sending ? "Sending..." : (
                    <>
                      Send Request <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
