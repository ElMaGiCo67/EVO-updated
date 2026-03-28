/*
  EVO Maritime – Home Page
  Design: Black Sea Atlas — Nautical Futurism / Editorial Dark
  Sections: Navbar → Hero → Ticker → About → Services → Work → Network → Why → Contact → Footer
*/
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesTicker from "@/components/ServicesTicker";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import NetworkSection from "@/components/NetworkSection";
import WhySection from "@/components/WhySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.03 240)" }}>
      <Navbar />
      <HeroSection />
      <ServicesTicker />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <NetworkSection />
      <WhySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
