import React from "react";
import { motion } from "motion/react";
import { Leaf, Droplet, ArrowUp, Instagram, Facebook, Mail, Sparkles, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscription logged! Look out for seasonal gardening & washing guides soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="bg-dark-slate text-cream border-t border-primary-light/10 relative overflow-hidden">
      
      {/* Decorative leafy branch background overlay */}
      <div className="absolute inset-0 z-0 opacity-5 select-none pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.2" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12 mb-12">
          
          {/* Column 1: Logo and Tagline */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-2 cursor-pointer group mb-4"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 group-hover:border-accent-blue/50 transition-colors duration-300">
                <Leaf className="w-5 h-5 text-emerald-400 absolute" />
                <Droplet className="w-4 h-4 text-accent-blue absolute translate-x-2 translate-y-1" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Precision Gardening & Power Washing
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#1e6fa8] font-bold block mt-0.5">
                  Professional Outdoor Care Company
                </span>
              </div>
            </div>

            <p className="text-[#f5f0e8]/80 font-light text-sm max-w-sm leading-relaxed mb-6">
              Keeping your outdoors spotless — naturally. Offering premium seasonal mowing, biological trimming, and high pressure stone restorations using sustainable safe methods.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-md p-2.5 transition-colors text-[#f5f0e8] hover:text-white"
                aria-label="Facebook Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-md p-2.5 transition-colors text-[#f5f0e8] hover:text-white"
                aria-label="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6 border-b border-emerald-400/20 pb-2 w-full">
              Explore Our Base
            </h4>
            <div className="space-y-3 flex flex-col items-start">
              <button
                onClick={() => scrollToSection("home")}
                className="text-zinc-300 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 cursor-pointer"
              >
                Home / Overview
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-zinc-300 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 cursor-pointer"
              >
                Services Offered
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-zinc-300 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 cursor-pointer"
              >
                About Our Standards
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-zinc-300 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 cursor-pointer"
              >
                Contact & Free Quotes
              </button>
            </div>
          </div>

          {/* Column 3: Newsletter SignUp */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6 border-b border-emerald-400/20 pb-2 w-full">
              Garden & Washer Tips
            </h4>
            <p className="text-zinc-300 font-light text-xs leading-relaxed mb-4">
              Subscribe to get brief seasonal checklists (e.g. brick weed treatment in mid-spring, and winter hedge cutting prep instructions).
            </p>

            <form onSubmit={handleNewsletterSubmit} className="w-full flex">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 text-cream text-xs p-3.5 rounded-l-lg focus:outline-none focus:border-emerald-400 placeholder-zinc-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 rounded-r-lg font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>

            <div className="flex items-center space-x-1.5 mt-3 text-[9px] text-[#1e6fa8] font-mono tracking-wide font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>SPAM FREE SEASONS GUARANTEED</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-mono">
          <p className="text-center sm:text-left mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Precision Gardening & Power Washing. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="inline-flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
