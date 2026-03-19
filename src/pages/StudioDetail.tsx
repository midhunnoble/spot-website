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
  Loader2,
  Globe,
  MapPin,
  ShieldCheck,
  Award
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Skeleton } from '../components/ui/Skeleton';
import SEO from '../components/SEO';

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
          .eq('slug', id)
          .single();

        if (error) {
          const { data: idData, error: idError } = await supabase
            .from('studios')
            .select('*')
            .eq('id', id)
            .single();
          if (idError) throw idError;
          setStudio(idData);
        } else {
          setStudio(data);
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching studio:', err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Allow shimmer to show briefly
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
            age_group: studio.age_group
          }
        }]);

      if (error) throw error;
      setIsEnrolled(true);
      setFormData({ studentName: '', parentEmail: '', phone: '' });
    } catch (err) {
      console.error('Error submitting enrollment:', err);
      alert('Failed to submit. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-spot-cream px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="space-y-6">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-[120px] w-full md:w-3/4" />
            <Skeleton className="h-20 w-1/2" />
          </div>
          <div className="grid lg:grid-cols-12 gap-16 md:gap-32">
            <div className="lg:col-span-7 space-y-12">
              <Skeleton className="h-64 w-full rounded-[3rem]" />
              <div className="grid gap-6">
                <Skeleton className="h-48 w-full rounded-[2.5rem]" />
                <Skeleton className="h-48 w-full rounded-[2.5rem]" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <Skeleton className="h-[600px] w-full rounded-[4rem]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black mb-6 uppercase tracking-tighter">Studio Not Found</h2>
          <Link to="/studios" className="text-spot-red font-bold underline flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Studios
          </Link>
        </div>
      </div>
    );
  }

  const activeDays = studio.days_active ? Object.entries(studio.days_active)
    .filter(([_, val]: any) => val.active)
    .map(([day, val]: any) => ({ day: day.toUpperCase(), time: val.time })) : [];

  return (
    <div className="bg-spot-cream min-h-screen text-spot-charcoal selection:bg-spot-red selection:text-white pb-32">
      <SEO 
        title={`${studio.name} | SPOT Studios`} 
        description={studio.description || `Explore ${studio.name} at SPOT Microschool. A special deep-dive studio for curious minds.`}
      />
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none pt-safe">
        <Link 
          to="/studios" 
          role="button"
          aria-label="Back to Studios"
          className="pointer-events-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl hover:bg-spot-red hover:text-white transition-all group focus-visible:ring-2 focus-visible:ring-spot-red focus-visible:ring-offset-2 outline-none"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Studios
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
            <div className="flex gap-3 mb-6">
              <div className="inline-block px-4 py-1.5 glass-morphism border border-white/20 text-spot-red rounded-full font-black uppercase text-[10px] tracking-widest">
                {studio.category} • {studio.age_group}
              </div>
              {studio.is_online ? 
                <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full font-black uppercase text-[10px] tracking-widest">Online Studio</div> :
                <div className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2"><MapPin size={10} /> Offline</div>
              }
            </div>
            <h1 className="font-display text-5xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-wrap-balance">
              {studio.name.split(' ').map((word: string, i: number) => (
                <span key={i} className={i === 1 ? 'text-spot-red block md:inline' : 'block md:inline'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl font-medium text-spot-charcoal/80 leading-snug text-pretty">
              {studio.description || 'Creating spaces for different minds to spark and shine.'}
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
        <div className="lg:col-span-7 space-y-24">
          
          {/* Timeline / Schedule Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-white p-8 rounded-[3rem] border border-black/5 shadow-xl items-center">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase text-spot-charcoal/30 flex items-center gap-1"><Calendar size={12}/> Start Date</div>
              <div className="text-lg font-black uppercase tracking-tighter text-spot-charcoal">{studio.start_date || 'TBA'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase text-spot-charcoal/30 flex items-center gap-1"><Calendar size={12}/> End Date</div>
              <div className="text-lg font-black uppercase tracking-tighter text-spot-charcoal">{studio.end_date || 'Ongoing'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase text-spot-charcoal/30 flex items-center gap-1"><Clock size={12}/> Total Hours</div>
              <div className="text-lg font-black uppercase tracking-tighter text-spot-red">{studio.total_hours || studio.schedule}</div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
              <span className="w-12 h-1 bg-spot-red rounded-full" /> The Experience
            </h2>
            <div className="prose prose-xl font-medium text-spot-charcoal/80 leading-relaxed max-w-none">
              <p className="whitespace-pre-line">{studio.long_description || studio.description}</p>
            </div>
          </div>

          {/* New Curriculum Modules - Bento Grid Showcase */}
          {studio.modules && studio.modules.length > 0 && (
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="font-display text-4xl font-black uppercase tracking-tighter flex items-center gap-4 text-spot-blue">
                    <span className="w-12 h-1 bg-spot-pastel-blue rounded-full" /> Curriculum
                  </h2>
                  <p className="mt-4 text-spot-charcoal/40 font-bold uppercase text-xs tracking-widest">A journey through {studio.name}</p>
                </div>
                <div className="px-4 py-2 bg-spot-blue/5 border border-spot-blue/10 rounded-full text-[10px] font-black uppercase tracking-widest text-spot-blue">
                  {studio.modules.length} Specialized Modules
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {studio.modules.map((m: any, i: number) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.01, y: -5 }}
                    className={`group relative p-8 bg-white border border-black/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-spot-blue/5 transition-all duration-500 overflow-hidden ${i === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      <div className="text-8xl font-display font-black">0{i+1}</div>
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-xs text-spot-blue border border-spot-blue/10 shadow-inner group-hover:bg-spot-blue group-hover:text-white transition-colors">
                           {i + 1}
                         </div>
                         <h3 className="font-display font-black text-2xl uppercase tracking-tighter leading-none">{m.title}</h3>
                      </div>
                      <p className="text-lg font-medium text-spot-charcoal/60 leading-relaxed">{m.content}</p>
                      
                      <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black uppercase tracking-widest text-spot-blue">Module Focus: Outcome Driven</span>
                        <Zap size={14} className="text-spot-pastel-yellow fill-current" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Key Outcomes */}
          {studio.key_outcomes && studio.key_outcomes.length > 0 && (
            <div>
              <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
                <span className="w-12 h-1 bg-spot-pastel-green rounded-full" /> Key Outcomes
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {studio.key_outcomes.map((outcome: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-6 glass-morphism rounded-3xl border border-black/5 hover:bg-white transition-colors duration-500">
                    <div className="w-8 h-8 rounded-full bg-spot-pastel-green/20 text-spot-pastel-green flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="font-black text-sm uppercase tracking-widest">{outcome}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilitators Section */}
          {studio.facilitators && studio.facilitators.length > 0 && (
            <div className="pt-12 border-t border-black/5">
               <h2 className="font-display text-3xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4 text-spot-red">
                <span className="w-12 h-1 bg-spot-red rounded-full" /> Facilitators
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {studio.facilitators.map((f: any, i: number) => (
                  <div key={i} className="text-center group">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-xl bg-slate-50 relative">
                       {f.image ? <img src={f.image} alt={f.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-spot-charcoal/10"><Users size={48}/></div>}
                    </div>
                    <h4 className="font-display font-black text-xl uppercase tracking-tighter mb-2">{f.name}</h4>
                    <p className="text-xs font-bold text-spot-charcoal/50 leading-relaxed uppercase tracking-widest">{f.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificate Badge */}
          {studio.has_certificate && (
             <div className="p-10 bg-gradient-to-br from-spot-charcoal to-black rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-10 border-4 border-spot-pastel-yellow/20">
                <Award size={80} className="text-spot-pastel-yellow" strokeWidth={1}/>
                <div>
                   <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-3">Earn Your SPOT Certificate</h3>
                   <p className="text-spot-cream/60 font-medium">Upon successful completion of the portfolio projects and attendance, learners are awarded a certificate recognized within our industry partner network.</p>
                </div>
             </div>
          )}
        </div>

        <aside className="lg:col-span-5">
           <div className="sticky top-32">
              <div className="bg-white p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-black/5 relative">
                <div className="absolute -top-12 -right-6 w-32 h-32 rotate-12 bg-spot-pastel-pink text-spot-charcoal rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl p-4 text-center">
                   <div className="text-sm font-black uppercase leading-tight mb-1">Seats</div>
                   <div className="font-display font-black text-2xl uppercase tracking-tighter">{studio.total_seats || '8-10'} Max</div>
                   <div className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-1">Learners</div>
                </div>

                <AnimatePresence mode="wait">
                  {!isEnrolled ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="font-display text-4xl font-black uppercase tracking-tighter mb-4">Request Enrollment</h3>
                      <p className="text-spot-charcoal/60 mb-10 font-medium tracking-tight">Schedule a consultation and tour of the {studio.name} studio space.</p>

                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <input 
                            type="text" 
                            placeholder="Student Name" 
                            className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl font-bold"
                            required
                            value={formData.studentName}
                            onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                          />
                        </div>
                        <div>
                          <input 
                            type="email" 
                            placeholder="Parent Email" 
                            className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl font-bold"
                            required
                            value={formData.parentEmail}
                            onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                          />
                        </div>
                        <div>
                          <input 
                            type="tel" 
                            placeholder="Phone Number" 
                            className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl font-bold"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        
                        <div className="bg-slate-50 p-6 rounded-3xl border border-black/5 space-y-4">
                           <label className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Studio Sessions</label>
                           {activeDays.length > 0 ? (
                             <div className="grid gap-2">
                               {activeDays.map((d, i) => (
                                 <div key={i} className="flex justify-between items-center text-xs font-black">
                                   <span className="text-spot-red">{d.day}</span>
                                   <span className="opacity-60">{d.time}</span>
                                 </div>
                               ))}
                             </div>
                           ) : (
                             <div className="text-xs font-bold text-spot-charcoal/40 italic">Check with studio for exact timings</div>
                           )}
                        </div>

                        <div className="pt-4">
                           <button 
                             type="submit"
                             disabled={isSubmitting}
                             aria-label={isSubmitting ? "Submitting application" : "Apply for Seat"}
                             className="w-full min-h-[64px] py-4 bg-spot-red text-white font-black uppercase tracking-[0.2em] rounded-2xl text-lg hover:bg-hover active:scale-[0.98] transition-all shadow-xl shadow-spot-red/20 flex items-center justify-center gap-3 disabled:opacity-50 focus-visible:ring-4 focus-visible:ring-spot-red/20 outline-none"
                           >
                             {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processing…</> : <>Apply for Seat <ArrowRight size={20} /></>}
                           </button>
                        </div>
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
                       <p className="text-lg font-medium text-spot-charcoal/70 mb-10 leading-relaxed">
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

      {/* Recommended Section - Fetching other active studios */}
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
