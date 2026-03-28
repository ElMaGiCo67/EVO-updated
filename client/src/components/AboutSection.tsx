/*
  EVO Maritime About Section
  Design: Asymmetric layout — left text block, right timeline spine
  Dark navy background, cyan timeline nodes, Barlow typography
*/
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "2017", event: "Founded in Varna, Bulgaria — first office established at the Black Sea gateway." },
  { year: "2019", event: "Expanded to Constanta, Romania — Port Gate 1 operations launched." },
  { year: "2022", event: "Opened Belgrade, Serbia — inland hub serving Central Balkans." },
  { year: "2025", event: "Established Koper, Slovenia — Adriatic gateway connecting to Western Europe." },
];

function TimelineItem({ year, event, index }: { year: string; event: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex gap-6 relative"
    >
      {/* Spine line */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1 pulse-glow"
          style={{
            background: "oklch(0.82 0.18 200)",
            boxShadow: "0 0 12px oklch(0.82 0.18 200 / 70%)",
          }}
        />
        {index < timeline.length - 1 && (
          <div
            className="w-px flex-1 mt-2"
            style={{ background: "oklch(0.82 0.18 200 / 25%)", minHeight: "3rem" }}
          />
        )}
      </div>
      <div className="pb-8">
        <span
          className="evo-cyan block mb-1"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: "1.4rem",
            letterSpacing: "0.05em",
          }}
        >
          {year}
        </span>
        <p
          className="text-white/65"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          {event}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: "oklch(0.10 0.03 240)" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text Block */}
          <div ref={ref}>
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
                Who We Are
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/70 mb-6"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              EVO Maritime Services & Logistics was founded in 2017 in Varna, Bulgaria, with a single
              conviction: that every cargo challenge has a solution — you just need the right team to find it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/70 mb-8"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              With over <span className="evo-cyan font-semibold">50 years of combined maritime expertise</span> across
              our team, we operate four strategic hubs at the crossroads of Central, Eastern, and Southern Europe —
              delivering end-to-end multimodal logistics for the most complex cargo imaginable.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/70 mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              From 67-meter windmill blades to 331-ton LNG tanks, from bulk sugar charters to tunnel boring
              machines — if it needs to move, we move it.
            </motion.p>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              {["Personal", "Professional", "Solution-Driven"].map((val) => (
                <span
                  key={val}
                  className="px-4 py-2"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.82 0.18 200)",
                    border: "1px solid oklch(0.82 0.18 200 / 35%)",
                    background: "oklch(0.82 0.18 200 / 5%)",
                  }}
                >
                  {val}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10"
            >
              <div className="evo-divider" />
              <h3
                className="evo-section-title"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                Our Journey
              </h3>
            </motion.div>
            <div>
              {timeline.map((item, i) => (
                <TimelineItem key={item.year} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
