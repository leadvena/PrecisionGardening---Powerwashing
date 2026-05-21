import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeftRight, Sparkles, AlertCircle, RefreshCw, Layers } from "lucide-react";

interface ComparisonType {
  id: string;
  label: string;
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

export default function BeforeAfter() {
  const [activeCompare, setActiveCompare] = useState<"wash" | "garden">("wash");
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const comparisons: Record<"wash" | "garden", ComparisonType> = {
    wash: {
      id: "wash",
      label: "Power Washing Restorations",
      beforeUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", // Dirty weathered tile surfaces
      afterUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80", // Pristine sunlit polished patio stone tile
      beforeLabel: "Before: Weathered Concrete & Mold",
      afterLabel: "After: Spotless Power-Washed Brilliance",
      description: "Witness the dynamic elimination of stubborn black moss, slick green algae, and built-up oil residues. Our high-pressure jet wash restores surfaces to their original, pristine color and texture safely."
    },
    garden: {
      id: "garden",
      label: "Lawn and Gardening Cultivation",
      beforeUrl: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&w=1200&q=80", // Overgrown field weeds and dry bush
      afterUrl: "https://images.unsplash.com/photo-1534710961226-440c9597e700?auto=format&fit=crop&w=1200&q=80", // Premium striped golf green lawn
      beforeLabel: "Before: Overgrown Weeds & Unkempt Lawn",
      afterLabel: "After: Precision Cut & Striped Estate Lawn",
      description: "Our meticulous clipping, weed suppression, and mechanical edge alignment transform neglected yards into spectacular estate lawns. We trim to optimal heights for seasonal thickness and premium health."
    }
  };

  const current = comparisons[activeCompare];

  const handleUpdate = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  // Attach mouse and touch handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    handleUpdate(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    if (e.touches[0]) {
      handleUpdate(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      handleUpdate(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches[0]) {
        handleUpdate(e.touches[0].clientX);
      }
    };

    const handleStop = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleStop);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleStop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleStop);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleStop);
    };
  }, []);

  return (
    <section className="py-24 bg-cream-light border-y border-zinc-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-blue font-bold bg-sky-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Real Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark-slate tracking-tight mb-4">
            The Difference is Precision
          </h2>
          <p className="text-zinc-600 leading-relaxed font-light text-base sm:text-lg">
            Drag the handle below to slice between the overgrown, stained &ldquo;Before&rdquo; states and the pristine, professional &ldquo;After&rdquo; results.
          </p>
        </div>

        {/* Tab Selector Links */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => {
              setActiveCompare("wash");
              setSliderPos(50);
            }}
            className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 border cursor-pointer ${
              activeCompare === "wash"
                ? "bg-accent-blue text-white border-accent-blue shadow-md"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Driveways & Patios
          </button>
          
          <button
            onClick={() => {
              setActiveCompare("garden");
              setSliderPos(50);
            }}
            className={`px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 border cursor-pointer ${
              activeCompare === "garden"
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            Gardens & Lawns
          </button>
        </div>

        {/* Outer Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Details / Text */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left lg:pr-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-dark-slate mb-4">
              {current.label}
            </h3>
            <p className="text-zinc-600 leading-relaxed font-light mb-6 text-sm sm:text-base">
              {current.description}
            </p>

            {/* Quick Indicators */}
            <div className="mt-2 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-zinc-700">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="font-mono text-xs font-semibold">{current.beforeLabel}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-zinc-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs font-semibold">{current.afterLabel}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Swipe interactively</strong>: Grab the blue divider line on the image to sweep left and right to inspect structural surface detail on our real clients.
              </p>
            </div>
          </div>

          {/* Draggable Slider Frame */}
          <div className="lg:col-span-8 flex justify-center">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="relative w-full aspect-[16/10] bg-zinc-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize max-w-[800px]"
            >
              {/* After Image (Background) */}
              <img
                src={current.afterUrl}
                alt="After power washing or garden care showing spotless pristine quality"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* After label pill */}
              <div className="absolute right-4 bottom-4 bg-[#1b3a2d]/85 text-cream font-mono text-[10px] uppercase tracking-widest font-semibold py-1.5 px-3 rounded-full backdrop-blur-sm z-20">
                After
              </div>

              {/* Before Image (Foreground Clipped) */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                }}
              >
                <img
                  src={current.beforeUrl}
                  alt="Before image with dirt or unkempt garden weeds before precision intervention"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Before label pill */}
              <div
                className="absolute left-4 bottom-4 bg-zinc-900/85 text-zinc-200 font-mono text-[10px] uppercase tracking-widest font-semibold py-1.5 px-3 rounded-full backdrop-blur-sm z-25 pointer-events-none transition-opacity duration-300"
                style={{ opacity: sliderPos > 15 ? 1 : 0 }}
              >
                Before
              </div>

              {/* Draggable Handle Line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 bg-accent-blue bg-opacity-90 flex items-center justify-center transition-all pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Grip Handle Wheel */}
                <div className="ba-slider-handle w-10 h-10 rounded-full bg-accent-blue text-white shadow-xl flex items-center justify-center border-2 border-white absolute transition-transform hover:scale-110 active:scale-95">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
