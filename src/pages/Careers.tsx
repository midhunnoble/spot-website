import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Users, Lightbulb, Heart, Compass, Zap, Briefcase, Clock, CheckCircle2, X, Star, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ApplicationModal = ({ isOpen, onClose, defaultRole = "" }: { isOpen: boolean, onClose: () => void, defaultRole?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: defaultRole,
    introduction: '',
    portfolio: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, role: defaultRole }));
  }, [defaultRole]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          type: 'career',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          metadata: {
            role: formData.role,
            introduction: formData.introduction,
            portfolio: formData.portfolio
          }
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({ name: '', email: '', phone: '', role: '', introduction: '', portfolio: '' });
      }, 3000);
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-spot-charcoal/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-spot-cream rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white">
              <h3 className="font-display text-2xl font-black uppercase tracking-tighter">Join the SPOT Team</h3>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 sm:p-10 overflow-y-auto">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-spot-pastel-green rounded-full flex items-center justify-center text-spot-charcoal mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-display text-3xl font-black uppercase tracking-tighter mb-4">Application Sent!</h3>
                  <p className="text-spot-charcoal/70 text-lg">
                    Thanks for your interest in joining SPOT. Our team will review your profile and get back to you soon.
                  </p>
                </motion.div>
              ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" 
                      placeholder="Jane Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" 
                      placeholder="jane@example.com" 
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Phone</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" 
                      placeholder="+91 93537 84759" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Position Applying For</label>
                    <input 
                      required
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" 
                      placeholder="e.g. Maker Studio Mentor" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Short Introduction</label>
                  <textarea 
                    rows={4} 
                    value={formData.introduction}
                    onChange={(e) => setFormData({...formData, introduction: e.target.value})}
                    className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors resize-none" 
                    placeholder="Tell us why you want to build the future of education with us..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Portfolio / LinkedIn</label>
                  <input 
                    type="url" 
                    value={formData.portfolio}
                    onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" 
                    placeholder="https://" 
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-spot-red text-white font-bold rounded-xl text-lg hover:bg-red-700 transition-colors mt-4 shadow-lg shadow-spot-red/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : "Send Application"}
                </button>
              </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HeroSection = ({ onApply }: { onApply: () => void }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["LEARNING.", "MAKING.", "TEACHING.", "PLAY."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-spot-cream text-spot-charcoal pt-32 pb-20">
      {/* 3D Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-spot-pastel-pink/10 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-spot-pastel-blue/10 rounded-full blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <img 
          src="/assets/real-photos/studio_atmosphere.png" 
          alt="" 
          className="absolute top-[10%] left-[-5%] w-[40%] opacity-[0.03] grayscale blur-sm rotate-[-15deg]"
        />
      </div>

      {/* Rotating Badge */}
      <div className="absolute right-10 bottom-20 hidden lg:flex items-center justify-center w-32 h-32">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
            <text className="text-[10.5px] font-bold uppercase tracking-[0.15em] fill-spot-charcoal/40">
              <textPath href="#circlePath" startOffset="0%">
                We are hiring • Join the team • Build the future • 
              </textPath>
            </text>
          </svg>
        </motion.div>
        <Star className="absolute text-spot-red opacity-30" size={24} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="px-6 py-2.5 bg-white/40 glass-morphism rounded-full text-[10px] font-black tracking-[0.3em] uppercase text-spot-charcoal/50 border border-white/80">
            Careers at SPOT
          </span>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.8] mb-12 flex flex-col items-center">
          <span className="overflow-hidden block pb-3">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              BUILD THE
            </motion.span>
          </span>
          <span className="overflow-hidden block pb-3">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="block"
            >
              FUTURE OF
            </motion.span>
          </span>
          <span className="text-spot-red block h-[0.9em] relative w-full flex justify-center overflow-hidden italic">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ y: "100%", opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: "-100%", opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-sans text-xl md:text-3xl text-spot-charcoal/50 font-bold max-w-3xl mx-auto mb-16 leading-tight tracking-tight"
        >
          Join a community of educators, creators, and builders reimagining how children learn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button
            onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 bg-spot-charcoal text-spot-cream font-black uppercase text-xs tracking-widest rounded-full hover:bg-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
          >
            Explore Open Roles
          </button>
          <button
            onClick={onApply}
            className="px-12 py-6 bg-transparent border-2 border-spot-charcoal/20 text-spot-charcoal font-black uppercase text-xs tracking-widest rounded-full hover:bg-spot-charcoal hover:text-spot-cream transition-all hover:scale-105 active:scale-95"
          >
            Direct Application
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const WhyWorkAtSpot = () => {
  const values = [
    { title: "Child First", desc: "Every choice centers on the learner's growth and well-being." },
    { title: "Data Over Drama", desc: "We observe and iterate without ego." },
    { title: "Psychological Safety", desc: "A space where educators take risks and fail safely." },
    { title: "Creative Freedom", icon: <Compass size={24} />, color: "bg-spot-pastel-blue" },
    { title: "Real Impact", icon: <Heart size={24} />, color: "bg-spot-pastel-green" }
  ];

  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Education <br/><span className="text-spot-red">Needs Builders.</span>
          </h2>
          <p className="font-handwriting text-3xl text-spot-charcoal/40 mb-10 transform -rotate-1">SPOT is not a traditional school.</p>
          
          <div className="space-y-6 text-xl text-spot-charcoal/80 font-bold leading-tight tracking-tight">
            <p className="italic">
              We are a learning studio where educators experiment, build and grow alongside children.
            </p>
            <p>
              Join us if you believe education should be creative, neuro-affirmative, and deeply engaging.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display font-black text-base uppercase leading-none mb-2">{v.title}</h3>
                <p className="text-xs text-spot-charcoal/60 leading-tight">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
           <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative">
             <img 
               src="/assets/real-photos/facilitator_child.png" 
               alt="Facilitation at SPOT" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-spot-charcoal/40 to-transparent" />
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const EducatorMindset = () => {
  const qualities = [
    { title: "Curiosity", desc: "Educators who love exploring new ideas.", icon: <Sparkles className="text-spot-pastel-pink" size={32} /> },
    { title: "Builder Mindset", desc: "Teachers who like designing projects and experiences.", icon: <Briefcase className="text-spot-pastel-blue" size={32} /> },
    { title: "Emotional Intelligence", desc: "Educators who can support children's emotional growth.", icon: <Heart className="text-spot-red" size={32} /> },
    { title: "Adaptability", desc: "Comfortable working with diverse learners and flexible environments.", icon: <Zap className="text-spot-pastel-yellow" size={32} /> },
    { title: "Collaborative Spirit", desc: "Works well in teams and shares ideas openly.", icon: <Users className="text-spot-pastel-green" size={32} /> }
  ];

  return (
    <section className="py-16 md:py-32 px-6 bg-spot-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">What Makes a Great <br/>SPOT Educator</h2>
          <p className="font-handwriting text-3xl text-spot-charcoal/60 transform -rotate-1">It's more than just teaching</p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualities.map((q, i) => (
            <motion.div 
              key={i}
              className={`bg-white p-8 rounded-3xl shadow-sm border border-black/5 ${i === 3 ? 'md:col-span-2 lg:col-span-1' : ''} ${i === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="mb-6">{q.icon}</div>
              <h3 className="font-display text-2xl font-bold mb-3">{q.title}</h3>
              <p className="text-spot-charcoal/70 text-lg">{q.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



const OpenRoles = ({ onApply }: { onApply: (role: string) => void }) => {
  const roles = [
    { title: "Studio Facilitator — Creative Arts", loc: "On-site", type: "Full-time", desc: "Guide students through artistic exploration and creative expression." },
    { title: "Maker Studio Mentor", loc: "On-site", type: "Part-time", desc: "Help children build, engineer, and prototype their ideas." },
    { title: "Learning Designer", loc: "Hybrid", type: "Full-time", desc: "Design project-based curriculums and learning experiences." },
    { title: "Microschool Educator", loc: "On-site", type: "Full-time", desc: "Lead a small cohort of diverse learners through their daily journey." },
    { title: "Community Manager", loc: "On-site", type: "Full-time", desc: "Foster relationships between parents, students, and educators." },
    { title: "Intern — Education Research", loc: "Remote", type: "Internship", desc: "Research progressive education models and document our outcomes." }
  ];

  return (
    <section id="open-roles" className="py-16 md:py-32 bg-spot-pastel-blue/30 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">Open Roles</h2>
            <p className="text-xl text-spot-charcoal/70 max-w-xl">Find your place in our ecosystem of alternative school careers and project-based learning teacher jobs.</p>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <motion.div 
              key={i}
              className="min-w-[85vw] md:min-w-0 snap-center glass-morphism p-10 rounded-[3rem] shadow-2xl border border-white/40 flex flex-col h-full group hover:bg-white/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex gap-3 mb-6">
                <span className="px-4 py-1.5 glass-morphism-heavy text-spot-charcoal rounded-xl text-[10px] font-black uppercase tracking-widest">{role.loc}</span>
                <span className="px-4 py-1.5 bg-spot-pastel-pink rounded-xl text-spot-red text-[10px] font-black uppercase tracking-widest">{role.type}</span>
              </div>
              <h3 className="font-display text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-spot-red transition-colors leading-none">{role.title}</h3>
              <p className="text-spot-charcoal/70 mb-10 font-bold leading-tight text-lg flex-grow">{role.desc}</p>
              <button 
                onClick={() => onApply(role.title)}
                className="w-full py-4 bg-spot-charcoal text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-spot-red transition-all flex items-center justify-center gap-3 shadow-xl haptic-feedback"
              >
                Apply Now <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    "Creative teaching environment",
    "Small cohort classrooms",
    "Freedom to design learning experiences",
    "Professional growth and experimentation",
    "Collaborative team culture",
    "Opportunity to build the future of education"
  ];

  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Why You'll Love It Here</h2>
      </div>
      
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, i) => (
          <motion.div 
            key={i}
            className="min-w-[85vw] md:min-w-0 snap-center bg-spot-cream p-8 rounded-3xl border border-black/5 flex items-start gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="text-spot-red shrink-0 mt-1">
              <CheckCircle2 size={24} />
            </div>
            <p className="font-bold text-lg text-spot-charcoal leading-tight">{benefit}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const MeetTheTeam = () => {
  return (
    <section className="py-24 md:py-48 bg-spot-charcoal text-spot-cream px-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-spot-cream/5 font-display text-[300px] leading-none font-black hidden lg:block">"</div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 md:gap-32 items-center relative z-10">
        <motion.div
          className="lg:col-span-12 mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-[100px] font-black uppercase tracking-tighter mb-10 leading-[0.8]">Meet the <span className="text-spot-pastel-pink">Collective.</span></h2>
          <div className="w-24 h-2 bg-spot-red mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="lg:col-span-5 space-y-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-10">
            <p className="font-display text-4xl md:text-5xl leading-[1.1] font-bold italic tracking-tighter text-spot-pastel-yellow">
              "SPOT is a community of people who think differently. We aren't just building a school; we're building a home for the next generation of innovators."
            </p>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-spot-pastel-blue">
                <img src="/assets/team/arvin.jpg" alt="Arvin Yasir" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-black text-2xl uppercase">Arvin Yasir</div>
                <div className="text-spot-cream/40 uppercase tracking-[0.2em] text-[10px] font-black mt-1">Partnerships and Marketing</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-7 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="aspect-video rounded-[4rem] overflow-hidden shadow-[0_80px_120px_rgba(0,0,0,0.4)] relative border-[12px] border-white/5 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
            <img 
              src="/assets/real-photos/team_collab.png" 
              alt="The SPOT Team collaborating" 
              className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-[1.5s]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spot-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
               <span className="px-5 py-2 glass-morph-heavy rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">Studio HQ • Bangalore</span>
            </div>
          </div>
          
          {/* Accent Element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-spot-pastel-pink opacity-10 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};



const FinalCTA = ({ onApply }: { onApply: () => void }) => {
  return (
    <section className="py-20 md:py-40 px-6 text-center relative overflow-hidden bg-spot-charcoal text-spot-cream">
      <div className="absolute inset-0 bg-[url('/assets/real-photos/studio_atmosphere.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-7xl lg:text-[80px] font-black uppercase tracking-tighter mb-8 leading-[0.9]">
          Help Us Reimagine <br/>
          <span className="text-spot-pastel-pink">Education.</span>
        </h2>
        
        <p className="font-sans text-xl md:text-2xl mb-12 text-spot-cream/80 font-medium max-w-2xl mx-auto">
          We are looking for educators, makers, storytellers and dreamers who want to build a new learning ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.button 
            onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-spot-cream text-spot-charcoal font-bold rounded-full text-xl hover:bg-white transition-colors shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Open Roles
          </motion.button>
          <motion.button 
            onClick={onApply}
            className="px-10 py-5 bg-spot-red text-white font-bold rounded-full text-xl hover:bg-red-700 transition-colors shadow-2xl shadow-spot-red/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default function Careers() {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleApply = (role: string = "") => {
    setSelectedRole(role);
    setIsApplicationOpen(true);
  };

  return (
    <div className="relative bg-spot-cream">
      {/* SEO Meta Tags (Simulated for SPA) */}
      <div className="hidden">
        <h1>microschool teaching jobs</h1>
        <h2>alternative school careers</h2>
        <h3>project based learning teacher jobs</h3>
        <h4>creative education careers</h4>
        <h5>education innovation jobs</h5>
      </div>

      <HeroSection onApply={() => handleApply()} />
      <WhyWorkAtSpot />
      <EducatorMindset />
      <OpenRoles onApply={handleApply} />
      <Benefits />
      <MeetTheTeam />
      
      <FinalCTA onApply={() => handleApply()} />

      <ApplicationModal 
        isOpen={isApplicationOpen} 
        onClose={() => setIsApplicationOpen(false)} 
        defaultRole={selectedRole}
      />
    </div>
  );
}
