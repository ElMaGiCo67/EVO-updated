/*
  EVO Maritime Hero Section
  Design: Full-bleed port aerial background, dramatic left-aligned headline,
  Barlow Condensed ExtraBold display type, cyan accent line, stat callouts
*/
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663173010095/7NSEthpyvre9erajCMjcgy/evo-hero-bg-XV8jyJQoLEUPCVaWuP6RsD.webp";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  const handleScrollDown = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "oklch(0.08 0.03 240)" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, oklch(0.07 0.03 240 / 92%) 0%, oklch(0.07 0.03 240 / 75%) 50%, oklch(0.07 0.03 240 / 55%) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, oklch(0.10 0.03 240))" }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.82 0.18 200)", boxShadow: "0 0 8px oklch(0.82 0.18 200 / 80%)" }}
            />
            <span
              className="evo-cyan"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Evolution in Maritime Logistics
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-8"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.2rem, 7.5vw, 6rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            <span className="text-white block">Let's Move</span>
            <span
              style={{
                color: "oklch(0.82 0.18 200)",
                textShadow: "0 0 40px oklch(0.82 0.18 200 / 40%)",
                display: "block",
              }}
            >
              What Others Can't.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="text-white/70 mb-10 max-w-xl"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Specialized maritime logistics across Southeast Europe — Ocean Chartering,
            Project Cargo, RoRo, Heavy Lift, Break Bulk, and Ships Agency.
            Four strategic hubs. One seamless network.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
              className="evo-btn-primary flex items-center gap-2"
            >
              Our Services <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="evo-btn-outline flex items-center gap-2"
            >
              Get a Quote
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-8 lg:gap-12"
          >
            {[
              { value: 50, suffix: "+", label: "Years Combined Expertise" },
              { value: 4, suffix: "", label: "Strategic Hubs" },
              { value: 8, suffix: "", label: "Service Verticals" },
              { value: 2017, suffix: "", label: "Founded" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="evo-cyan"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    textShadow: "0 0 20px oklch(0.82 0.18 200 / 50%)",
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                <span
                  className="text-white/50 mt-1"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors z-10"
      >
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
