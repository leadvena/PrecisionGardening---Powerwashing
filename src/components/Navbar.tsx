import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

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
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize above md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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
      className={`fixed top-[52px] left-2 right-2 sm:left-4 sm:right-4 md:left-8 md:right-8 z-50 transition-all duration-300 rounded-2xl ${scrolled
        ? "bg-white/95 border border-zinc-200 shadow-lg py-3 backdrop-blur-md"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <div
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2 cursor-pointer group min-w-0"
          >
            <div className="relative flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              <img
                src="/images/favicon.webp"
                alt="Precision Logo"
                width="36"
                height="36"
                loading="eager"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className={`font-serif text-base sm:text-lg font-bold tracking-tight block transition-colors ${scrolled ? "text-dark-slate" : "text-white"
                }`}>
                Precision
              </span>
              <span className={`font-mono text-[7px] sm:text-[8px] uppercase tracking-widest block -mt-1 transition-colors ${scrolled ? "text-zinc-700" : "text-zinc-300"
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
                className={`font-medium text-xs tracking-wider transition-colors uppercase cursor-pointer relative py-1.5 px-3 rounded-lg ${scrolled
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
              className={`inline-flex items-center space-x-2 font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-sm hover:shadow group transition-all duration-300 cursor-pointer active:scale-98 ${scrolled
                ? "bg-primary hover:bg-primary-light text-white"
                : "bg-white hover:bg-cream text-primary"
                }`}
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden inline-flex items-center justify-center p-2 rounded-xl focus:outline-none cursor-pointer transition-colors flex-shrink-0 ${scrolled ? "text-dark-slate hover:bg-zinc-100" : "text-cream hover:bg-white/10"
              }`}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-zinc-100 mt-2 rounded-b-2xl overflow-hidden shadow-lg"
          >
            <div className="px-3 pt-3 pb-6 space-y-1.5 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left block px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer active:scale-98 ${activeSection === link.id
                    ? "text-primary bg-primary/5"
                    : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-zinc-100 mt-3">
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