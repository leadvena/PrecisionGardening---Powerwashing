import { useState } from "react";
import { motion } from "motion/react";
import { Leaf, Scissors, Sparkles, Droplet, Layers, CheckCircle2, Waves, ArrowRight, HelpCircle } from "lucide-react";

export default function Services() {
  const [activeTab, setActiveTab] = useState<"all" | "gardening" | "washing">("all");
  const [selectedEcoDetail, setSelectedEcoDetail] = useState<string | null>(null);

  const gardeningServices = [
    {
      title: "Precision Lawn Mowing & Edging",
      desc: "Perfect razor-cut mowing with dynamic height selection matched to seasonal grass health. Includes pristine mechanical clipping borders for perfect edge lines.",
      time: "Weekly / Bi-weekly",
    },
    {
      title: "Hedge Trimming & Shaping",
      desc: "Artistic topiary pruning, hedge thinning, and structural wall training. We trim with absolute straightness and collect all micro-clippings.",
      time: "Seasonal / Standard",
    },
    {
      title: "Garden Tidy-ups & Weed Control",
      desc: "Thorough organic soil weeding, flowerbed design curation, systemic non-toxic pre-emergent weed protection, and fresh organic mulching.",
      time: "Onetime / Custom",
    }
  ];

  const washingServices = [
    {
      title: "Driveways, Patios & Walkways",
      desc: "Deep high-pressure concrete extraction to purge decades of motor oil, tire marks, grime, and environmental black-spores.",
      time: "Standard Jet Wash",
    },
    {
      title: "Deck Restoration",
      desc: "Specialized gentle wood scrubbing, moss-purging soft washing, and professional prep for weather sealing or oiling.",
      time: "Soft-Pretreated Wash",
    },
    {
      title: "Exterior Wall & Siding Cleaning",
      desc: "Safe, low-pressure chemical-free siding bath targeting soot, dynamic pollen buildup, dust, weavings, and staining.",
      time: "Gentle Softwash",
    },
    {
      title: "Moss & Algae Removal",
      desc: "Lichen stripping and bio-active prevention barriers that discourage slippery micro-algae growth for up to 18 months.",
      time: "Pre-treated & Cleaned",
    }
  ];

  const scrollToContact = (serviceName?: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      // Set value in form dynamically if present
      const formSelect = document.getElementById("service-select") as HTMLSelectElement;
      if (formSelect && serviceName) {
        formSelect.value = serviceName;
        // Trigger synthetic change event to update state in ContactForm
        const event = new Event("change", { bubbles: true });
        formSelect.dispatchEvent(event);
      }

      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="services" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            What We Do
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark-slate tracking-tight mb-4">
            Professional Exterior Cultivation & Refinement
          </h2>
          <p className="text-zinc-600 leading-relaxed font-light text-base sm:text-lg">
            We operate at the intersection of nature and meticulous mechanical excellence. Our services are split into two core disciplines, each handled with absolute precision.
          </p>
        </div>

        {/* Layout Grid: 2 Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Card 1 — Gardening Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-300"
          >
            {/* Unsplash Background Header */}
            <div className="relative h-64 sm:h-72 flex items-end">
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1000&q=80"
                alt="A beautifully structured precision lawn mowing trim and elegant green hedges"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-slate via-dark-slate/40 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-8 flex items-center space-x-3.5 w-full">
                <div className="bg-emerald-500 text-white rounded-xl p-3 shadow-lg">
                  <Leaf className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-emerald-300 uppercase tracking-widest font-black block">
                    Cultivation Discipline
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream tracking-tight">
                    Gardening Services 🌱
                  </h3>
                </div>
              </div>
            </div>

            {/* Card Content & List */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                <p className="text-zinc-600 font-light mb-8 italic">
                  Cultivating elegant lawn lines and organic structural balance. Safe for your family, pets, and local beneficial honeybees.
                </p>
                
                <div className="space-y-6">
                  {gardeningServices.map((service, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer hover:bg-emerald-50/30 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-emerald-500/10"
                      onClick={() => scrollToContact(service.title.split(" & ")[0].split(" ")[0])}
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-serif text-lg font-bold text-primary group-hover:text-emerald-700 transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-sm text-zinc-600 font-light mt-1.5 leading-relaxed">
                            {service.desc}
                          </p>
                          <span className="inline-block bg-emerald-50 text-emerald-700 font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded mt-2">
                            {service.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <button
                  onClick={() => scrollToContact("Lawn Mowing")}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-6 rounded-lg transition-colors group cursor-pointer"
                >
                  <span>Book Gardening Care</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Power Washing Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl border border-primary/10 hover:shadow-2xl transition-all duration-300"
          >
            {/* Unsplash Background Header */}
            <div className="relative h-64 sm:h-72 flex items-end">
              <img
                src="https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?auto=format&fit=crop&w=1000&q=80"
                alt="A surface cleaner power wash unit cleaning heavy mildew stains from a driveway split line"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-slate via-dark-slate/40 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-8 flex items-center space-x-3.5 w-full">
                <div className="bg-accent-blue text-white rounded-xl p-3 shadow-lg">
                  <Droplet className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-sky-300 uppercase tracking-widest font-black block">
                    Structural Restoration
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream tracking-tight">
                    Power Washing Services 🚿
                  </h3>
                </div>
              </div>
            </div>

            {/* Card Content & List */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                <p className="text-zinc-600 font-light mb-8 italic">
                  Unveiling brilliant physical surface layers beneath algae, black spore deposits, and hazardous grease compounds.
                </p>
                
                <div className="space-y-6">
                  {washingServices.map((service, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer hover:bg-sky-50/30 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-sky-500/10"
                      onClick={() => scrollToContact(service.title.includes("Driveway") ? "Driveway Washing" : "Exterior Wall Cleaning")}
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-accent-blue mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-serif text-lg font-bold text-primary group-hover:text-accent-blue transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-sm text-zinc-600 font-light mt-1.5 leading-relaxed">
                            {service.desc}
                          </p>
                          <span className="inline-block bg-sky-50 text-sky-800 font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded mt-2">
                            {service.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <button
                  onClick={() => scrollToContact("Driveway Washing")}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-accent-blue hover:bg-accent-blue-light text-white font-bold py-3.5 px-6 rounded-lg transition-colors group cursor-pointer"
                >
                  <span>Book Jet Washing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Interactive Estimate Alert */}
        <div className="mt-16 bg-primary-light/5 border border-primary/15 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center md:justify-between text-left">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-primary/10 rounded-full p-2.5 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-dark-slate">Eco-Friendly Pledge</h4>
              <p className="text-sm text-zinc-600 font-light mt-1">
                We utilize bio-degradable chemical neutralizers that entirely harmlessly decompose. They do not leach soil or kill structural flower beds.
              </p>
            </div>
          </div>
          <button
            onClick={() => scrollToContact()}
            className="w-full md:w-auto bg-transparent border border-primary text-primary hover:bg-primary hover:text-white font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer text-center text-sm"
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}
