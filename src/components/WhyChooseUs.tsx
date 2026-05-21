import { motion } from "motion/react";
import { ShieldCheck, Target, Clock, Star, Award, HeartPulse } from "lucide-react";

export default function WhyChooseUs() {
  const credentials = [
    {
      icon: ShieldCheck,
      title: "Eco-Friendly Methods",
      desc: "We use safe methods that protect your plants and surfaces without harsh chemicals.",
      accent: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: Target,
      title: "Precision Results",
      desc: "Every job done with attention to detail and care.",
      accent: "text-accent-blue bg-sky-50",
    },
    {
      icon: Clock,
      title: "Reliable & Local",
      desc: "We show up on time, every time.",
      accent: "text-amber-600 bg-amber-50",
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#1b3a2d] text-cream relative overflow-hidden">
      {/* Decorative leafy overlay background assets */}
      <div className="absolute inset-0 z-0 opacity-5 select-none pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#f4efe6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Our Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Setting the Benchmark in Exterior Care
          </h2>
          <p className="text-zinc-300 leading-relaxed font-light text-base sm:text-lg">
            We operate with top-tier industrial equipment, organic plant care knowledge, and an uncompromising commitment to customer satisfaction.
          </p>
        </div>

        {/* 3 Columns Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {credentials.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                    <div className="bg-cream/10 p-3.5 rounded-xl border border-white/15">
                      <IconComponent className="w-7 h-7 text-emerald-300" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4 tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-300 font-light leading-relaxed text-sm sm:text-base">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center space-x-2 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-black">
                  <span>Guaranteed Standards</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Stats Panel */}
        <div className="mt-20 border-t border-white/10 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-1.5 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              <span>250</span>
              <span className="text-emerald-400 font-sans font-light">+</span>
            </div>
            <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-2">
              Homes Cultivated
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-center space-x-1.5 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              <span>100</span>
              <span className="text-emerald-400 font-sans font-light">%</span>
            </div>
            <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-2">
              Eco-Safe Materials
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-1.5 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              <span>15</span>
              <span className="text-zinc-400 font-sans font-light">k</span>
              <span className="text-emerald-400 font-sans font-light">+</span>
            </div>
            <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-2">
              Sq Ft Cleaned
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-1.5 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              <span>99</span>
              <span className="text-emerald-400 font-sans font-light">%</span>
            </div>
            <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-2">
              Punctual Arrival
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
