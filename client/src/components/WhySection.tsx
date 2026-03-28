/*
  EVO Maritime Why EVO Section — Five Pillars of Service Excellence
  Design: Dark navy, 5 vertical pillar cards with top-lit cyan glow, icon + title + desc
  Mirrors the presentation slide exactly
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings2, Users, Compass, Lightbulb, Target } from "lucide-react";

const pillars = [
  {
    icon: Settings2,
    title: "Customized Service",
    desc: "Every solution tailored to your specific cargo and route. No templates, no shortcuts.",
  },
  {
    icon: Users,
    title: "Excellent Customer Relations",
    desc: "Your dedicated point of contact, always. We pick up the phone.",
  },
  {
    icon: Compass,
    title: "Experienced Staff",
    desc: "50+ years of combined maritime expertise across our team.",
  },
  {
    icon: Lightbulb,
    title: "Solution-Driven",
    desc: "We find the way when others say there isn't one.",
  },
  {
    icon: Target,
    title: "Result-Oriented",
    desc: "On-time, on-budget, no exceptions.",
  },
];

export default function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="why"
      className="py-24 lg:py-32"
      style={{ background: "oklch(0.10 0.03 240)" }}
    >
      <div className="container">
        {/* Header */}
        <div ref={ref} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="evo-divider mx-auto" />
            <h2
              className="evo-section-title mb-4"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              What We Stand For
            </h2>
            <p
              className="text-white/50 max-w-xl mx-auto"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Our Promise: Five Pillars of Service Excellence
            </p>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 gap-5 relative group"
                style={{
                  background: "oklch(0.14 0.04 240)",
                  border: "1px solid oklch(0.82 0.18 200 / 20%)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.82 0.18 200 / 60%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px oklch(0.82 0.18 200 / 20%), 0 4px 24px oklch(0 0 0 / 40%)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.82 0.18 200 / 20%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-4 right-4 h-0.5"
                  style={{
                    background: "oklch(0.82 0.18 200)",
                    boxShadow: "0 0 12px oklch(0.82 0.18 200 / 80%), 0 0 24px oklch(0.82 0.18 200 / 40%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 flex items-center justify-center"
                  style={{
                    border: "1px solid oklch(0.82 0.18 200 / 40%)",
                    background: "oklch(0.82 0.18 200 / 8%)",
                  }}
                >
                  <Icon size={28} style={{ color: "oklch(0.82 0.18 200)" }} />
                </div>

                {/* Title */}
                <h3
                  className="text-white"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    lineHeight: 1.2,
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Description */}
                <p
                  className="text-white/55"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
