import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Phone, Send, Loader2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTourFields, setShowTourFields] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    program: searchParams.get('program') || '',
    message: '',
    wantsTour: false,
    tourDate: '',
    tourTime: ''
  });

  useEffect(() => {
    const program = searchParams.get('program');
    if (program) {
      setFormData(prev => ({ ...prev, program }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s+()-]{10,20}$/;
    
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number (at least 10 digits).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          type: formData.wantsTour ? 'tour_request' : 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: 'new',
          metadata: {
            child_age: formData.childAge,
            program: formData.program,
            message: formData.message,
            tour_requested: formData.wantsTour,
            preferred_date: formData.tourDate,
            preferred_time: formData.tourTime
          }
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        childAge: '', 
        program: '', 
        message: '',
        wantsTour: false,
        tourDate: '',
        tourTime: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-0 pb-20 bg-spot-cream min-h-screen antigravity-perspective">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-32">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-black text-6xl md:text-9xl text-spot-charcoal leading-[0.8] mb-10 tracking-tighter uppercase"
          >
            Let's <br />
            <span className="text-spot-red">Connect</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-spot-charcoal/80 max-w-2xl mx-auto font-medium leading-tight"
          >
            Whether you're interested in our microschool, studios, or just want to learn more, we'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-morphism-heavy p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-white/40"
            >
              <h2 className="font-display font-black text-4xl mb-12 tracking-tighter uppercase">Get in Touch</h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-spot-pastel-pink rounded-2xl flex items-center justify-center text-spot-red shrink-0 shadow-lg group-hover:rotate-12 transition-transform">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-spot-red mb-2">Visit Us</h3>
                    <a 
                      href="https://maps.app.goo.gl/7QAmPipYkppACFeE6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-spot-charcoal font-black text-xl md:text-2xl tracking-tighter leading-tight hover:text-spot-red transition-colors"
                    >
                      SPOT Whitefield<br />
                      #620, 1st Main AECS Layout<br />
                      Bangalore, India 560037
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-spot-pastel-blue rounded-2xl flex items-center justify-center text-spot-charcoal shrink-0 shadow-lg group-hover:rotate-12 transition-transform">
                    < Mail size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-blue-600 mb-2">Email Us</h3>
                    <a href="mailto:team@spotschool.in" className="text-spot-charcoal font-black text-2xl tracking-tighter leading-none hover:text-blue-600 transition-colors">team@spotschool.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-spot-pastel-yellow rounded-2xl flex items-center justify-center text-spot-charcoal shrink-0 shadow-lg group-hover:rotate-12 transition-transform">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-spot-charcoal mb-2">Call Us</h3>
                    <p className="text-spot-charcoal font-black text-2xl tracking-tighter leading-none">+91 93537 84759</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="bg-spot-charcoal text-spot-cream p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-spot-red/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="font-display font-black text-3xl mb-4 text-spot-pastel-yellow uppercase tracking-tighter">Why Visit?</h3>
              <p className="text-lg text-spot-cream/70 leading-relaxed mb-8">
                Reading about SPOT is one thing, but seeing the energy of our studios and the focus of our students is where the magic really happens. We'd love to show you around.
              </p>
              <div className="flex items-center gap-4 text-spot-red font-bold uppercase tracking-widest text-sm">
                <Sparkles size={20} /> Experiential Tours Available
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-morphism p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-white/40"
          >
            <h2 className="font-display font-black text-4xl mb-12 tracking-tighter uppercase">Send a Message</h2>
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center h-full"
              >
                <div className="w-24 h-24 bg-spot-pastel-green rounded-3xl flex items-center justify-center text-spot-charcoal mb-8 rotate-12 shadow-xl">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display font-black text-4xl text-spot-charcoal mb-4 uppercase tracking-tighter">Sent!</h3>
                <p className="text-spot-charcoal/70 text-xl font-medium leading-tight">
                  We'll get back to you sooner <br /> than you expect.
                </p>
              </motion.div>
            ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Parent's Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="jane@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98XXX XXXXX" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Child's Age</label>
                  <select 
                    required
                    value={formData.childAge}
                    onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                    className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner appearance-none"
                  >
                    <option value="">Select age...</option>
                    <option value="6-8">6-8 years old</option>
                    <option value="9-11">9-11 years old</option>
                    <option value="12-14">12-14 years old</option>
                    <option value="15+">15+ years old</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Program of Interest</label>
                <select 
                  required
                  value={formData.program}
                  onChange={(e) => setFormData({...formData, program: e.target.value})}
                  className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner appearance-none"
                >
                  <option value="">Select program...</option>
                  <option value="microschool">Full-time Microschool</option>
                  <option value="studios">After-school Studios</option>
                  <option value="Makerverse Summer Camp">Makerverse Summer Camp</option>
                  <option value="camps">Holiday Camps</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              {/* Campus Tour Integration */}
              <div className="pt-4">
                <label className="flex items-center gap-4 cursor-pointer p-6 rounded-2xl bg-white/50 border-2 border-dashed border-black/10 hover:border-spot-red/30 transition-all group">
                  <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${formData.wantsTour ? 'bg-spot-red border-spot-red' : 'border-black/10 group-hover:border-spot-red/30'}`}>
                    {formData.wantsTour && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={formData.wantsTour}
                    onChange={(e) => setFormData({...formData, wantsTour: e.target.checked})}
                  />
                  <span className="font-bold text-spot-charcoal/80">I would like to schedule a campus visit / tour</span>
                </label>

                <AnimatePresence>
                  {formData.wantsTour && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-2 gap-8 pt-6">
                        <div className="space-y-3">
                          <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Preferred Date</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              required={formData.wantsTour}
                              value={formData.tourDate}
                              onChange={(e) => setFormData({...formData, tourDate: e.target.value})}
                              className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner pl-14" 
                            />
                            <CalendarIcon size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-spot-charcoal/40" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Time Slot</label>
                          <div className="relative">
                            <select 
                              required={formData.wantsTour}
                              value={formData.tourTime}
                              onChange={(e) => setFormData({...formData, tourTime: e.target.value})}
                              className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner pl-14 appearance-none"
                            >
                              <option value="">Select time...</option>
                              <option value="morning">Morning (10 AM - 12 PM)</option>
                              <option value="afternoon">Afternoon (2 PM - 4 PM)</option>
                            </select>
                            <Clock size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-spot-charcoal/40" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your child..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-6 rounded-2xl bg-white border-2 border-transparent focus:bg-spot-cream focus:border-spot-red transition-all font-bold shadow-inner resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-spot-charcoal text-white font-black uppercase tracking-widest rounded-3xl text-sm hover:bg-spot-red transition-all flex items-center justify-center gap-2 shadow-2xl haptic-feedback disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <>Initialize Admission <Send size={20} /></>}
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

// Helper components that were missing in previous replacement
const CheckCircle2 = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

const Sparkles = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

