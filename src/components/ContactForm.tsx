import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Calendar, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "Lawn Mowing",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");

  const servicesList = [
    { value: "Lawn Mowing", label: "Lawn Mowing & Edging (🌱)" },
    { value: "Hedge Trimming", label: "Hedge Trimming & Shaping (✂️)" },
    { value: "Garden Tidy-up", label: "Garden Tidy-ups & Weeding (🌸)" },
    { value: "Driveway Washing", label: "Driveway & Patio Jet Wash (🚿)" },
    { value: "Deck Restoration", label: "Wood Deck Restoration (🪵)" },
    { value: "Exterior Wall Cleaning", label: "Siding & Wall Softwash (🏠)" },
    { value: "Moss Removal", label: "Moss & Algae Purging (🦠)" },
    { value: "Other", label: "Other / Custom Consultation (🤝)" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Please declare your full name.";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required for quote setups.";
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid telephone coordinate.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please declare a valid email address.";
    }
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Generate standard booking quote ticket reference
      const randomRef = "PRC-" + Math.floor(100000 + Math.random() * 900000);
      setQuoteReference(randomRef);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      serviceType: "Lawn Mowing",
      message: ""
    });
    setSubmitSuccess(false);
  };

  return (
    <section id="contact" className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#1e6fa8] font-bold bg-[#1e6fa8]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Get Started
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dark-slate tracking-tight mb-4">
            Request a Free Premium Quote
          </h2>
          <p className="text-zinc-600 leading-relaxed font-light text-base sm:text-lg">
            No obligations, no hidden fees. Provide your specifications below, and our local care team will design a customized, transparent estimate for your property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Side Info Panel Grid Columns */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#1b3a2d] text-cream rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                Company Coordinates
              </span>
              <h3 className="font-serif text-2xl font-bold mt-2 mb-8 tracking-tight">
                Connect Directly
              </h3>

              <div className="space-y-8">
                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 mt-1 flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">Call/Text Us</h4>
                    <p className="text-base sm:text-lg font-bold text-white mt-1 hover:text-emerald-400 transition-colors">
                      <a href="tel:+15557732474">+1 (555) 773-2474</a>
                    </p>
                    <span className="text-xs text-zinc-400 font-light block mt-0.5">Mon–Sat: 8am–6pm Est</span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 mt-1 flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">Email Enquiries</h4>
                    <p className="text-base sm:text-lg font-bold text-white mt-1 hover:text-emerald-400 transition-colors break-all">
                      <a href="mailto:quotes@precisioncare.com">quotes@precisioncare.com</a>
                    </p>
                  </div>
                </div>

                {/* Operational Area */}
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 mt-1 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400">Regional Bases</h4>
                    <p className="text-sm text-zinc-200 font-light mt-1.5 leading-relaxed">
                      100 Precision Way<br />
                      Greenwood, WA 98001
                    </p>
                    <span className="inline-block bg-white/10 text-emerald-300 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded mt-3">
                      Serving Seattle Eastside Base
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Badge */}
            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[#1e6fa8]" />
                <span className="font-serif font-bold text-sm">Full Liability Insured</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Every service visit is backed by a $2M general liability safeguard, guaranteeing security on every masonry and garden surface.
              </p>
            </div>
            
            {/* Background design elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl z-0" />
          </div>

          {/* Form container code */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-primary/10">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <p className="text-sm text-zinc-500 italic pb-2 border-b border-zinc-100">
                    Please provide details. We respond to all digital inquiries within 2 hours.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div id="field-fullName">
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-bold mb-2">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Johnathan Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full bg-cream-light border text-zinc-800 placeholder-zinc-400 rounded-lg p-3.5 text-sm transition-all focus:outline-none ${
                          formErrors.fullName
                            ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-rose-500 font-medium flex items-center mt-2.5">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {formErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone number */}
                    <div id="field-phone">
                      <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-bold mb-2">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-cream-light border text-zinc-800 placeholder-zinc-400 rounded-lg p-3.5 text-sm transition-all focus:outline-none ${
                          formErrors.phone
                            ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-rose-500 font-medium flex items-center mt-2.5">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email address */}
                    <div id="field-email">
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-bold mb-2">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-cream-light border text-zinc-800 placeholder-zinc-400 rounded-lg p-3.5 text-sm transition-all focus:outline-none ${
                          formErrors.email
                            ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-zinc-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-rose-500 font-medium flex items-center mt-2.5">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Service Type Select */}
                    <div>
                      <label htmlFor="service-select" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-bold mb-2">
                        Service Discipline Needed
                      </label>
                      <select
                        name="serviceType"
                        id="service-select"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full bg-cream-light border border-zinc-200 text-zinc-800 rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[50px] cursor-pointer"
                      >
                        {servicesList.map(s => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Area */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-bold mb-2">
                      Message / Property Specifications
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      placeholder="Please note approximate property sizes, deck square footage, or hedge height to help us compile your precise estimate..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-cream-light border border-zinc-200 text-zinc-800 placeholder-zinc-400 rounded-lg p-3.5 text-sm transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full inline-flex items-center justify-center space-x-2.5 bg-primary hover:bg-primary-light text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary/10 transition-all cursor-pointer ${
                        isSubmitting ? "opacity-90 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Estimate...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span className="font-serif text-lg">Request My Free Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Success Message State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="bg-emerald-100 p-4 rounded-full mb-6">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-pulse" />
                  </div>
                  
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded">
                    Request Authorized
                  </span>
                  
                  <h3 className="font-serif text-3xl font-bold text-dark-slate mt-4 mb-2">
                    Estimate Request Logged!
                  </h3>
                  
                  <p className="text-zinc-600 leading-relaxed font-light max-w-lg mb-8 text-sm sm:text-base">
                    Thank you, <strong>{formData.fullName}</strong>. Your estimate request for <strong>{formData.serviceType}</strong> has been logged inside our local scheduling matrix. An outdoor care director will call or email you shortly.
                  </p>

                  {/* Booking Receipt Ticket */}
                  <div className="w-full max-w-sm bg-cream-light border border-zinc-200 rounded-xl p-6 text-left relative overflow-hidden shadow-inner font-mono text-xs text-zinc-700">
                    <div className="absolute top-0 right-0 p-3 flex items-center space-x-1 text-emerald-600">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase">Confirmed</span>
                    </div>

                    <div className="border-b border-dashed border-zinc-300 pb-4 mb-4">
                      <p className="font-bold text-zinc-900 border-b border-zinc-200/50 pb-1 mb-2 uppercase">Precision Care Ticket</p>
                      <p className="flex justify-between"><span>Reference:</span> <strong className="text-zinc-900">{quoteReference}</strong></p>
                      <p className="flex justify-between"><span>Issued:</span> <strong>Today (UTC Base)</strong></p>
                    </div>

                    <div className="space-y-2 mb-4 border-b border-dashed border-zinc-300 pb-4">
                      <p className="flex justify-between"><span>Contact:</span> <strong className="text-zinc-950 truncate max-w-[180px]">{formData.fullName}</strong></p>
                      <p className="flex justify-between"><span>Phone:</span> <strong className="text-zinc-950">{formData.phone}</strong></p>
                      <p className="flex justify-between"><span>Service:</span> <strong className="text-zinc-950">{formData.serviceType}</strong></p>
                    </div>

                    <button
                      onClick={resetForm}
                      className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold py-2.5 rounded-lg border border-zinc-300 transition-colors text-center cursor-pointer text-xs"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
