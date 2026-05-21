import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import BeforeAfter from "./components/BeforeAfter";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream selection:bg-accent-blue selection:text-white overflow-x-hidden">
      
      {/* Absolute Header Seasonal Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#1b3a2d] to-emerald-950 text-cream text-[11px] sm:text-xs font-semibold py-2.5 px-4 text-center border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span className="inline-flex items-center bg-accent-blue text-white rounded px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-bold font-mono">
            Seasonal Promo
          </span>
          <span className="font-light tracking-wide text-zinc-100">
            Book an early-summer <strong>Lawn Cultivation Package</strong> & receive <strong>15% off</strong> any concrete or siding Jet Wash!
          </span>
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
            className="underline hover:text-white font-bold ml-1 cursor-pointer"
          >
            Claim Spot
          </button>
        </div>
      </div>

      {/* Navigation Layer */}
      <Navbar />

      {/* Main Container */}
      <main>
        
        {/* Hero Landing */}
        <Hero />

        {/* Services & Offerings catalog */}
        <Services />

        {/* Brand Core Standards & statistics */}
        <WhyChooseUs />

        {/* Interactive slide comparison visualizer */}
        <BeforeAfter />

        {/* Quote submission segment */}
        <ContactForm />

      </main>

      {/* Unified footer context block */}
      <Footer />

    </div>
  );
}
