import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Droplet, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background styling trigger
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy logic
      const offsets = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { id: link.id, top: rect.top + window.scrollY - 100 };
        }
        return { id: link.id, top: 0 };
      });

      const currentScroll = window.scrollY;
      let active = "home";
      for (let i = 0; i < offsets.length; i++) {
        if (currentScroll >= offsets[i].top) {
          active = offsets[i].id;
        }
      }
      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // navbar height + margin
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50 transition-all duration-300 rounded-2xl ${
        scrolled
          ? "bg-white/95 border border-zinc-200 shadow-lg py-3 backdrop-blur-md"
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
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-accent-blue/50 transition-colors duration-300">
              <Leaf className="w-4.5 h-4.5 text-primary absolute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
              <Droplet className="w-3.5 h-3.5 text-accent-blue absolute translate-x-1.5 translate-y-1 transition-transform duration-300 group-hover:translate-y-1.5 group-hover:scale-115" />
            </div>
            <div>
              <span className={`font-serif text-lg font-bold tracking-tight block transition-colors ${
                scrolled ? "text-dark-slate" : "text-white"
              }`}>
                Precision
              </span>
              <span className={`font-mono text-[8px] uppercase tracking-widest block -mt-1 transition-colors ${
                scrolled ? "text-zinc-500" : "text-zinc-300"
              }`}>
                Lawn & Jet-Wash
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium text-xs tracking-wider transition-colors uppercase cursor-pointer relative py-1.5 px-3 rounded-lg ${
                  scrolled
                    ? activeSection === link.id
                      ? "text-primary bg-primary/5 font-bold"
                      : "text-zinc-600 hover:text-primary hover:bg-zinc-50"
                    : activeSection === link.id
                    ? "text-white bg-white/10 font-bold"
                    : "text-cream/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className={`inline-flex items-center space-x-2 font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-sm hover:shadow group transition-all duration-300 cursor-pointer active:scale-98 ${
                scrolled
                  ? "bg-primary hover:bg-primary-light text-white"
                  : "bg-white hover:bg-cream text-primary"
              }`}
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-xl focus:outline-none cursor-pointer ${
                scrolled ? "text-dark-slate hover:bg-zinc-100" : "text-cream hover:bg-white/10"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden bg-white border-t border-zinc-100 mt-2 rounded-b-2xl overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? "text-primary bg-primary/5"
                      : "text-zinc-650 hover:bg-zinc-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-zinc-100 mt-2">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center cursor-pointer active:scale-98"
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
