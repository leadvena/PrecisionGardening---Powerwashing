import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Target, Clock, Star, Award } from "lucide-react";

function Counter({ value, suffix = "", duration = 1.2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const stepTime = 16; // ~60fps
      const steps = totalMiliseconds / stepTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function WhyChooseUs() {
  const standards = [
    {
      icon: ShieldCheck,
      title: "Certified Environmental Care",
      desc: "Our equipment operates on refined low-emission engines, and our cleaning formulas are 100% biodegradable, safeguarding local waters.",
    },
    {
      icon: Target,
      title: "Meticulous Micro-Clippings Trim",
      desc: "We collect all micro-clippings to avoid thatch buildup and perform clean razor-cuts to prevent grass tip browning.",
    },
    {
      icon: Clock,
      title: "Committed to On-Time Arrival",
      desc: "We provide tight, realistic arrival slots and notify you when our crew is 15 minutes away, respecting your home schedule.",
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#1b3a2d] text-cream relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Heading and Stats */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Our Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Setting the Benchmark in Exterior Care
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light text-base sm:text-lg">
                We operate at high technical standards. Every service slot is handled with professional grade tools and organic garden safety practices.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white flex items-baseline">
                  <Counter value={247} />
                </div>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2">
                  Homes Cultivated
                </p>
              </div>

              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white flex items-baseline">
                  <Counter value={98} suffix="%" />
                </div>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2">
                  Punctual Arrival
                </p>
              </div>

              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white flex items-baseline">
                  <Counter value={18} suffix="k+" />
                </div>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2">
                  Sq Ft Cleaned
                </p>
              </div>

              <div>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-white flex items-baseline">
                  <Counter value={100} suffix="%" />
                </div>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2">
                  Eco-Safe Materials
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Standards List */}
          <div className="lg:col-span-7 space-y-6">
            {standards.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/15 transition-all duration-300 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 text-left"
                >
                  <div className="bg-cream/10 p-3.5 rounded-xl border border-white/10 text-emerald-300 flex-shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 font-light leading-relaxed text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
