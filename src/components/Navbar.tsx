import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Droplet, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary shadow-lg border-b border-primary-light/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cream/10 border border-white/20 group-hover:border-accent-blue/50 transition-colors duration-300">
              <Leaf className="w-5 h-5 text-emerald-400 absolute transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              <Droplet className="w-4 h-4 text-accent-blue absolute translate-x-2 translate-y-1 transition-transform duration-300 group-hover:translate-y-2 group-hover:scale-115" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-cream tracking-tight block">
                Precision
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-300 block -mt-1">
                Lawn & Jet-Wash
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-cream/90 hover:text-white font-medium text-sm tracking-wider transition-colors uppercase h-8 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-cream/90 hover:text-white font-medium text-sm tracking-wider transition-colors uppercase h-8 cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-cream/90 hover:text-white font-medium text-sm tracking-wider transition-colors uppercase h-8 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-cream/90 hover:text-white font-medium text-sm tracking-wider transition-colors uppercase h-8 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center space-x-2 bg-accent-blue hover:bg-accent-blue-light text-white font-medium text-sm px-5 py-2.5 rounded shadow-md group transition-all duration-300 cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cream hover:text-white hover:bg-primary-light/50 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-slate border-b border-primary/40"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 shadow-inner">
              <button
                onClick={() => scrollToSection("home")}
                className="w-full text-left block px-3 py-2.5 rounded text-base font-semibold text-cream hover:bg-primary/40 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="w-full text-left block px-3 py-2.5 rounded text-base font-semibold text-cream hover:bg-primary/40 cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="w-full text-left block px-3 py-2.5 rounded text-base font-semibold text-cream hover:bg-primary/40 cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full text-left block px-3 py-2.5 rounded text-base font-semibold text-cream hover:bg-primary/40 cursor-pointer"
              >
                Contact
              </button>
              <div className="pt-2">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full flex items-center justify-center space-x-2 bg-accent-blue hover:bg-accent-blue-light text-white font-semibold py-3 px-4 rounded transition-colors text-center cursor-pointer"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
