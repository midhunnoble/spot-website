import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Hammer,
  BookOpen,
  Send,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function StudioDetail() {
  const { id } = useParams();
  const [studio, setStudio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    parentEmail: '',
    phone: ''
  });

  useEffect(() => {
    async function fetchStudio() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('studios')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setStudio(data);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching studio:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudio();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          type: 'studio_enrollment',
          name: formData.studentName,
          email: formData.parentEmail,
          phone: formData.phone,
          metadata: {
            studio_id: studio.id,
            studio_name: studio.name,
            age_group: studio.age
          }
        }]);

      if (error) throw error;

      setIsEnrolled(true);
      setFormData({ studentName: '', parentEmail: '', phone: '' });
    } catch (err) {
      console.error('Error submitting enrollment:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-spot-cream flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-spot-red animate-spin" />
        <p className="font-display font-black text-xl uppercase tracking-tighter text-spot-charcoal/40 tracking-widest">Opening Studio...</p>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black mb-6 uppercase">Studio Not Found</h2>
          <Link to="/studios" className="text-spot-red font-bold underline flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Studios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-spot-cream min-h-screen text-spot-charcoal selection:bg-spot-red selection:text-white pb-32">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none">
        <Link 
          to="/studios" 
          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl hover:bg-spot-red hover:text-white transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Studios
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={studio.image_url} 
            alt={studio.name} 
            className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-spot-cream via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full px-6 pb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-1.5 glass-morphism border border-white/20 text-spot-red rounded-full font-black uppercase text-[10px] tracking-widest mb-6">
              {studio.category} • {studio.age}
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              {studio.name.split(' ').map((word: string, i: number) => (
                <span key={i} className={i === 1 ? 'text-spot-red block md:inline' : 'block md:inline'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl font-medium text-spot-charcoal/80 leading-snug">
              {studio.description}
            </p>
          </motion.div>
        </div>

        {/* Floating Fee Tag */}
        <motion.div 
          className="absolute bottom-24 right-6 md:right-12 z-20"
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="bg-spot-charcoal text-white p-10 rounded-[3rem] shadow-2xl border-4 border-white/10 group cursor-default">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Program Fee</div>
            <div className="text-4xl font-display font-black text-spot-pastel-yellow">{studio.fee}</div>
            <div className="text-[10px] font-black uppercase opacity-40 mt-1">Inclusive of all materials</div>
          </div>
        </motion.div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 md:gap-32 mt-20">
        <div className="lg:col-span-7 space-y-20">
          <div>
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
              <span className="w-12 h-1 bg-spot-red rounded-full" /> The Experience
            </h2>
            <div className="prose prose-xl font-medium text-spot-charcoal/80 leading-relaxed">
              <p>{studio.long_description || studio.description}</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
              <span className="w-12 h-1 bg-spot-pastel-blue rounded-full" /> Tangible Outcomes
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {(studio.outcomes || []).map((outcome: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-6 glass-morphism rounded-3xl border border-black/5 hover:bg-white transition-colors duration-500">
                  <div className="w-10 h-10 rounded-full bg-spot-pastel-green/20 text-spot-pastel-green flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="font-bold text-lg leading-tight uppercase tracking-tighter">{outcome}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-spot-charcoal rounded-[3rem] p-12 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-spot-red opacity-10 rounded-full blur-3xl group-hover:opacity-30 transition-opacity" />
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Calendar className="text-spot-pastel-yellow" size={32} />
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Cohort Schedule</div>
                      <div className="text-2xl font-display font-black uppercase tracking-tight">{studio.schedule}</div>
                   </div>
                </div>
                <div className="h-px w-full md:w-px md:h-12 bg-white/10" />
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Users className="text-spot-pastel-blue" size={32} />
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Group Size</div>
                      <div className="text-2xl font-display font-black uppercase tracking-tight">8-10 Learners</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <aside className="lg:col-span-5">
           <div className="sticky top-32">
              <div className="bg-white p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-black/5 relative">
                <div className="absolute -top-12 -right-6 w-32 h-32 rotate-12 bg-spot-pastel-pink text-spot-charcoal rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl p-4 text-center">
                   <div className="text-sm font-black uppercase leading-tight mb-1">Limited Slots</div>
                   <div className="font-handwriting text-2xl">Only 4 left!</div>
                </div>

                <AnimatePresence mode="wait">
                  {!isEnrolled ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="font-display text-4xl font-black uppercase tracking-tighter mb-4">Reserve a Spot</h3>
                      <p className="text-spot-charcoal/60 mb-10 font-medium">Join the next {studio.name} cohort starting this July.</p>

                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <input 
                            type="text" 
                            placeholder="Student Name" 
                            className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl"
                            required
                            value={formData.studentName}
                            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                          />
                        </div>
                        <div>
                          <input 
                            type="email" 
                            placeholder="Parent Email" 
                            className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl"
                            required
                            value={formData.parentEmail}
                            onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                          />
                        </div>
                        <div>
                          <input 
                            type="tel" 
                            placeholder="Phone Number" 
                            className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        
                        <div className="pt-4">
                           <button 
                             type="submit"
                             disabled={isSubmitting}
                             className="w-full py-6 bg-spot-red text-white font-black uppercase tracking-[0.2em] rounded-2xl text-lg hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                           >
                             {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : <>Submit Interest <Send size={20} /></>}
                           </button>
                        </div>
                        <p className="text-[10px] text-center font-black uppercase tracking-widest opacity-30 mt-6">
                           By submitting, you agree to our terms of enrollment and privacy policy.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                       <div className="w-24 h-24 bg-spot-pastel-green/20 text-spot-pastel-green rounded-full flex items-center justify-center mx-auto mb-8">
                          <Zap size={48} fill="currentColor" />
                       </div>
                       <h3 className="font-display text-4xl font-black uppercase tracking-tighter mb-4">Application Sent!</h3>
                       <p className="text-lg font-medium text-spot-charcoal/70 mb-10">
                          We'll reach out within 24 hours to schedule a trial session and walkthrough of the {studio.name} facility.
                       </p>
                       <button 
                         onClick={() => setIsEnrolled(false)}
                         className="px-10 py-4 bg-spot-charcoal text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-black transition-colors"
                       >
                         Back to Details
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
           </div>
        </aside>
      </section>

      {/* More Studios Section (Placeholder for now or fetch more) */}
      <section className="mt-48 max-w-7xl mx-auto px-6">
         <div className="flex items-center justify-between mb-16">
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter">Explore Other Studios</h2>
            <Link to="/studios" className="font-black uppercase text-xs tracking-[0.2em] text-spot-red underline hover:text-red-700 transition-colors">View All</Link>
         </div>
         <p className="text-spot-charcoal/40 font-medium">Explore more creative spaces in our Studios collection.</p>
      </section>
    </div>
  );
}
