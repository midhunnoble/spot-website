import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Lightbulb, Compass, Hammer, Rocket, Users, Target, Briefcase, ChevronLeft, ChevronRight, Star, Sparkles, Loader2, Globe, MapPin, Award, Clock
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-spot-charcoal flex items-center justify-center pt-20 pb-32 text-spot-cream">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/real-photos/media__1773735367725.jpg')] bg-cover bg-center mix-blend-overlay" />
      </div>
      
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-spot-red rounded-full mix-blend-screen filter blur-[100px] opacity-40"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-[30rem] h-[30rem] bg-spot-pastel-blue rounded-full mix-blend-screen filter blur-[100px] opacity-30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative z-20 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block px-4 py-2 bg-spot-red/20 text-spot-red border border-spot-red/30 rounded-full font-bold tracking-wider uppercase text-sm mb-6 backdrop-blur-sm">
            After-School Programs
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl lg:text-[80px] font-black tracking-tighter uppercase leading-[0.85] mb-6">
            SPOT STUDIOS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spot-pastel-yellow via-spot-pastel-pink to-spot-pastel-blue">
              Where Curiosity Turns Into Creation.
            </span>
          </h1>
          <p className="font-sans text-xl md:text-2xl mb-10 text-spot-cream/80 font-medium max-w-xl leading-snug">
            After-school studios where children explore art, science, engineering, storytelling and entrepreneurship through projects and real-world challenges.
          </p>
          <div className="flex flex-col sm:row gap-4">
            <a href="#explore" className="px-10 py-5 bg-spot-red text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-spot-red/20 hover:scale-105 active:scale-95">
              Explore Studios <ArrowRight size={18} />
            </a>
            <a href="#enroll" className="px-10 py-5 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-spot-charcoal transition-all flex items-center justify-center shadow-xl hover:scale-105 active:scale-95">
              Join a Studio
            </a>
          </div>
        </motion.div>

        <div className="relative h-[600px] hidden lg:block">
          <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-spot-charcoal z-20">
            <img src="/assets/real-photos/media__1773735470829.jpg" alt="Building projects" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-20 left-0 w-72 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-spot-charcoal z-30">
            <img src="/assets/real-photos/media__1773735492801.jpg" alt="Creative studio" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-spot-pastel-yellow rounded-full mix-blend-multiply filter blur-xl opacity-50 z-10 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const ExploreStudios = ({ onEnroll }: { onEnroll: (name: string) => void }) => {
  const [filter, setFilter] = useState('All');
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Creative Arts', 'Engineering & Making', 'Science & Nature', 'Communication & Storytelling', 'Entrepreneurship'];

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('studios')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (!error) setStudios(data || []);
      setLoading(false);
    };
    fetchStudios();
  }, []);

  const filteredStudios = filter === 'All' ? studios : studios.filter(s => s.category === filter);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-spot-red" size={32}/></div>;

  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto" id="explore">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 underline decoration-spot-red decoration-4 transition-all">Find Your Studio</h2>
        <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto mb-10 font-medium">Discover immersive programs tailored for neuro-affirmative and creative learners.</p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-16">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-spot-charcoal text-white shadow-lg scale-105' 
                  : 'bg-white border-2 border-black/5 text-spot-charcoal/40 hover:border-spot-charcoal hover:text-spot-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredStudios.map((studio, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={studio.id}
              className={`group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-black/5 flex flex-col h-full bg-white`}
            >
              <div className="h-48 overflow-hidden relative">
                <img src={studio.image_url} alt={studio.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-spot-charcoal px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {studio.age_group}
                </div>
                {studio.has_certificate && (
                  <div className="absolute top-4 left-4 bg-spot-pastel-yellow text-spot-charcoal p-1.5 rounded-full shadow-lg" title="Certificate Provided">
                    <Award size={14} fill="currentColor" />
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-[9px] font-black uppercase tracking-[0.2em] text-spot-red opacity-60">{studio.category}</div>
                   {studio.is_online ? <span className="text-[8px] font-black uppercase text-blue-500 flex items-center gap-1"><Globe size={10}/> Online</span> : <span className="text-[8px] font-black uppercase text-slate-400 flex items-center gap-1"><MapPin size={10}/> Offline</span>}
                </div>
                <h3 className="font-display text-2xl font-black mb-4 leading-none uppercase tracking-tighter">{studio.name}</h3>
                <p className="font-medium text-spot-charcoal/60 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">{studio.description}</p>
                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={() => onEnroll(studio.name)}
                    className="flex-1 py-3.5 bg-spot-charcoal text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-spot-red transition-all"
                  >
                    Enroll
                  </button>
                  <Link 
                    to={`/studios/${studio.slug || studio.id}`}
                    className="px-4 py-3.5 bg-slate-50 text-spot-charcoal rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all border border-black/5"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// ... Rest of the components stay similar but updated for visual consistency ...
const WhatAreStudios = () => {
  const features = [
    { title: "Project Based Learning", icon: <Hammer size={24} />, color: "bg-spot-pastel-pink/20" },
    { title: "Small Cohorts", icon: <Users size={24} />, color: "bg-spot-pastel-blue/20" },
    { title: "Hands-on Exploration", icon: <Compass size={24} />, color: "bg-spot-pastel-yellow/20" },
    { title: "Real World Skills", icon: <Briefcase size={24} />, color: "bg-spot-pastel-green/20" }
  ];

  return (
    <section className="py-16 md:py-48 px-6 max-w-7xl mx-auto relative overflow-hidden bg-white/50 backdrop-blur-3xl rounded-[4rem] border border-black/5 -mt-20">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">Beyond <br/><span className="text-spot-red">Tuition Center</span></h2>
          <p className="font-handwriting text-3xl text-spot-charcoal/40 mb-10 transform -rotate-2">An Innovation Lab for Young Minds</p>
          
          <div className="space-y-8 text-xl font-medium text-spot-charcoal/70 mb-12 leading-relaxed">
            <p>
              SPOT Studios are immersive learning spaces where curiosity isn't just encouraged—it's the primary engine.
            </p>
            <p>
              Instead of passive lectures, children engage in high-intensity building, designing, and experimentation led by industry-active mentors.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              className={`${feat.color} p-10 rounded-[3rem] flex flex-col items-start gap-6 border border-black/5 group hover:bg-white hover:shadow-2xl transition-all haptic-feedback`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="p-4 bg-white rounded-2xl text-spot-charcoal shadow-sm group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="font-display font-black text-xl leading-none uppercase tracking-tighter">{feat.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyStudioLearning = () => {
  const points = [
    "Constructionist approach to deep focus",
    "Cognitive load management via flow states",
    "Real-world application of theoretical STEM",
    "Vibrant community of creative peers"
  ];

  return (
    <section className="py-24 md:py-48 bg-spot-cream px-6 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">Why Studios Work</h2>
          {points.map((point, i) => (
            <motion.div 
              key={i}
              className="flex items-center gap-6 bg-white/50 p-8 rounded-[2rem] border border-black/5 group cursor-default shadow-sm hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-spot-red text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <p className="text-xl font-black uppercase tracking-tighter text-spot-charcoal opacity-80">{point}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
            <img src="/assets/real-photos/students_collaboration.jpg" alt="Learners collaborating" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-spot-pastel-yellow p-10 rounded-[3rem] shadow-2xl transform -rotate-6 border-4 border-white font-display font-black uppercase tracking-tighter text-2xl">
            Portfolio First
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Deep Focus", desc: "90-minute blocks optimized for flow.", icon: <Rocket /> },
    { title: "Mentor Led", desc: "Small groups led by practitioners.", icon: <Sparkles /> },
    { title: "Construction", desc: "Build tangible, real-world projects.", icon: <Hammer /> },
    { title: "Recognition", desc: "Showcases and global certification.", icon: <Award /> }
  ];

  return (
    <section className="py-24 md:py-48 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 md:mb-32">
        <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none italic">The Studio Way</h2>
        <div className="w-24 h-2 bg-spot-red mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-4 gap-12 relative">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            className="flex flex-col items-center text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-black/5 flex items-center justify-center text-spot-red mb-8 transition-all group-hover:bg-spot-charcoal group-hover:text-white group-hover:-rotate-6">
              {React.cloneElement(step.icon as React.ReactElement, { size: 40 })}
            </div>
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-4">{step.title}</h3>
            <p className="text-spot-charcoal/50 font-medium leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const EnrollmentForm = ({ selectedStudio, setSelectedStudio }: { selectedStudio: string, setSelectedStudio: (val: string) => void }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Logic for Supabase insertion
    const { error } = await supabase.from('leads').insert([{
      type: 'studio_general_enrollment',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      metadata: { studio: selectedStudio, age: formData.get('age') }
    }]);

    if (!error) setIsSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="enroll" className="py-24 md:py-48 px-6 bg-spot-charcoal text-white rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.85]">Join The <br/><span className="text-spot-red">Innovation</span> Cohort</h2>
          <p className="text-2xl font-medium text-white/60 mb-12 max-w-lg leading-relaxed">
            Ready to let your child lead their own learning journey? Secure a spot in our upcoming term.
          </p>
          <div className="space-y-6">
             <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10"><Users className="text-spot-pastel-blue"/><span className="text-lg font-bold uppercase tracking-tighter">Small Groups (Max 10)</span></div>
             <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10"><Clock className="text-spot-pastel-pink"/><span className="text-lg font-bold uppercase tracking-tighter">Immersive 90-Min Sessions</span></div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[4rem] text-spot-charcoal shadow-2xl relative">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
                <input name="name" required placeholder="Learner Name" className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 font-bold focus:border-spot-red focus:outline-none" />
                <div className="grid grid-cols-2 gap-4">
                   <input name="age" required placeholder="Age" className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 font-bold" />
                   <select value={selectedStudio} onChange={(e) => setSelectedStudio(e.target.value)} required className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 font-black uppercase text-[10px]">
                      <option value="">Select Studio</option>
                      <option value="Artlore">Artlore</option><option value="Machine Marvels">Machine Marvels</option><option value="WildJar">WildJar</option>
                   </select>
                </div>
                <input name="email" type="email" required placeholder="Parent Email" className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 font-bold" />
                <input name="phone" required placeholder="Phone Number" className="w-full p-5 rounded-2xl bg-slate-50 border border-black/5 font-bold" />
                <button type="submit" disabled={loading} className="w-full py-6 bg-spot-red text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3">
                   {loading ? <Loader2 className="animate-spin"/> : 'Request Consultation'}
                </button>
              </motion.form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                 <div className="w-20 h-20 bg-spot-pastel-green/20 text-spot-pastel-green rounded-full flex items-center justify-center mx-auto mb-8"><Zap size={40} fill="currentColor"/></div>
                 <h3 className="font-display text-4xl font-black uppercase tracking-tighter mb-4 leading-none">Application Logged</h3>
                 <p className="text-xl font-medium text-spot-charcoal/40 mb-10">Our Studio Coordinator will reach out within 24 hours.</p>
                 <button onClick={() => setIsSubmitted(false)} className="px-10 py-4 bg-spot-charcoal text-white font-black uppercase tracking-widest text-[10px] rounded-full">Explore More</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default function Studios() {
  const [searchParams] = useSearchParams();
  const [selectedStudio, setSelectedStudio] = useState(searchParams.get('studio') || '');

  const handleEnroll = (studioName: string) => {
    setSelectedStudio(studioName);
    const element = document.getElementById('enroll');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-spot-cream">
      <HeroSection />
      <ExploreStudios onEnroll={handleEnroll} />
      <WhatAreStudios />
      <WhyStudioLearning />
      <HowItWorks />
      <EnrollmentForm selectedStudio={selectedStudio} setSelectedStudio={setSelectedStudio} />
    </div>
  );
}

const CheckCircle2 = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
