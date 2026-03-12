import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Users, Lightbulb, Heart, Compass, Zap, Briefcase, Clock, CheckCircle2, X, Star, Sparkles } from 'lucide-react';

const ApplicationModal = ({ isOpen, onClose, defaultRole = "" }: { isOpen: boolean, onClose: () => void, defaultRole?: string }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Full Name</label>
                    <input type="text" className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Email</label>
                    <input type="email" className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" placeholder="jane@example.com" />
                  </div>
                </div>
                
                <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Phone</label>
                    <input type="tel" className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Position Applying For</label>
                    <input type="text" defaultValue={defaultRole} className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" placeholder="e.g. Maker Studio Mentor" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Short Introduction</label>
                  <textarea rows={4} className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors resize-none" placeholder="Tell us why you want to build the future of education with us..."></textarea>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Upload Resume</label>
                    <div className="w-full p-4 rounded-xl bg-white border border-black/10 border-dashed flex items-center justify-center text-spot-charcoal/50 hover:bg-black/5 hover:text-spot-charcoal cursor-pointer transition-colors">
                      <span>Choose file...</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Portfolio / LinkedIn</label>
                    <input type="url" className="w-full p-4 rounded-xl bg-white border border-black/10 focus:outline-none focus:border-spot-red transition-colors" placeholder="https://" />
                  </div>
                </div>

                <button className="w-full py-5 bg-spot-red text-white font-bold rounded-xl text-lg hover:bg-red-700 transition-colors mt-4 shadow-lg shadow-spot-red/20">
                  Send Application
                </button>
              </form>
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
      {/* Minimal floating accents */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-spot-red"
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-spot-pastel-blue"
        animate={{ y: [0, 30, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Rotating Badge */}
      <div className="absolute right-10 bottom-20 hidden lg:flex items-center justify-center w-32 h-32">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
            <text className="text-[10.5px] font-bold uppercase tracking-[0.15em] fill-spot-charcoal">
              <textPath href="#circlePath" startOffset="0%">
                We are hiring • Join the team • Build the future • 
              </textPath>
            </text>
          </svg>
        </motion.div>
        <Star className="absolute text-spot-red" size={24} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="px-5 py-2 border border-spot-charcoal/20 rounded-full text-sm font-bold tracking-widest uppercase text-spot-charcoal/60">
            Careers at SPOT
          </span>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-[120px] font-black uppercase tracking-tighter leading-[0.85] mb-8 flex flex-col items-center">
          <span className="overflow-hidden block pb-2">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              BUILD THE
            </motion.span>
          </span>
          <span className="overflow-hidden block pb-2">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              FUTURE OF
            </motion.span>
          </span>
          <span className="text-spot-red block h-[1.1em] relative w-full flex justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-xl md:text-2xl text-spot-charcoal/70 font-medium max-w-2xl mx-auto mb-12"
        >
          Join a community of educators, makers and storytellers designing a new kind of school.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-spot-charcoal text-spot-cream font-bold rounded-full text-lg hover:bg-black transition-colors shadow-lg hover:scale-105 active:scale-95"
          >
            View Open Roles
          </button>
          <button
            onClick={onApply}
            className="px-8 py-4 bg-transparent border-2 border-spot-charcoal text-spot-charcoal font-bold rounded-full text-lg hover:bg-spot-charcoal hover:text-spot-cream transition-colors shadow-lg hover:scale-105 active:scale-95"
          >
            Apply Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const WhyWorkAtSpot = () => {
  const features = [
    { title: "Small Cohort Teaching", icon: <Users size={24} />, color: "bg-spot-pastel-pink" },
    { title: "Studio Based Learning", icon: <Lightbulb size={24} />, color: "bg-spot-pastel-yellow" },
    { title: "Creative Freedom", icon: <Compass size={24} />, color: "bg-spot-pastel-blue" },
    { title: "Real Impact on Children", icon: <Heart size={24} />, color: "bg-spot-pastel-green" }
  ];

  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            Education <br/><span className="text-spot-red">Needs Builders.</span>
          </h2>
          <p className="font-handwriting text-3xl text-spot-charcoal/60 mb-10 transform -rotate-2">SPOT is not a traditional school.</p>
          
          <div className="space-y-6 text-xl text-spot-charcoal/80 font-medium">
            <p>
              We are a learning studio where educators experiment, build and grow alongside children.
            </p>
            <p>
              If you believe education should be creative, humane and deeply engaging, SPOT might be the place for you.
            </p>
          </div>
        </motion.div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6 hide-scrollbar">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              className={`min-w-[85vw] md:min-w-0 snap-center ${feat.color} p-8 rounded-3xl flex flex-col items-start gap-4 shadow-sm border border-black/5`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-4 bg-white/50 rounded-full text-spot-charcoal">
                {feat.icon}
              </div>
              <h3 className="font-display font-bold text-xl leading-tight">{feat.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpotCulture = () => {
  const values = [
    { title: "Child First Decisions", desc: "Every choice we make centers around what is best for the learner's growth and well-being." },
    { title: "Data Before Drama", desc: "We look at evidence, observe carefully, and iterate on our methods without ego." },
    { title: "Psychological Safety", desc: "A space where educators and students alike can take risks, fail, and learn without judgment." },
    { title: "Ownership of Space and Ideas", desc: "We empower our team to take charge of their studios and bring their unique passions to life." },
    { title: "Reflection and Growth", desc: "Continuous learning isn't just for the kids. We constantly reflect and evolve our craft." }
  ];

  return (
    <section className="py-16 md:py-32 bg-spot-charcoal text-spot-cream px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-16">
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">The SPOT <br/><span className="text-spot-pastel-pink">Culture</span></h2>
            <p className="text-xl text-spot-cream/70 mb-8">
              Teachers collaborate openly, share ideas and continuously evolve their craft. We are building an ecosystem of support and innovation.
            </p>
            <div className="hidden lg:block w-24 h-1 bg-spot-red rounded-full" />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          {values.map((val, i) => (
            <motion.div 
              key={i}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-display text-2xl font-bold mb-3 text-spot-pastel-yellow">{val.title}</h3>
              <p className="text-lg text-spot-cream/80">{val.desc}</p>
            </motion.div>
          ))}
        </div>
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
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
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

const DayInTheLife = () => {
  const timeline = [
    { time: "08:30 AM", title: "Morning Reflection & Planning", desc: "Reviewing the day's goals and setting up the studio space." },
    { time: "09:30 AM", title: "Studio Facilitation", desc: "Guiding students through hands-on exploration and inquiry." },
    { time: "11:30 AM", title: "Project Mentoring", desc: "One-on-one check-ins to help students overcome creative blocks." },
    { time: "01:30 PM", title: "Student Presentations", desc: "Facilitating peer feedback and showcasing works in progress." },
    { time: "03:00 PM", title: "Team Reflection", desc: "Collaborating with fellow educators to discuss student progress." },
    { time: "04:00 PM", title: "Community Discussions", desc: "Engaging with parents and the broader SPOT community." }
  ];

  return (
    <section className="py-16 md:py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-10 md:mb-20">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">A Day in the Life</h2>
        <p className="text-xl text-spot-charcoal/70">The rhythm of a SPOT Educator</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-spot-charcoal/10 md:-translate-x-1/2 rounded-full" />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div 
              key={i}
              className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-spot-cream border-4 border-spot-red rounded-full flex items-center justify-center md:-translate-x-1/2 z-10 shadow-lg">
                <Clock size={20} className="text-spot-red" />
              </div>

              {/* Content Box */}
              <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                  <div className="text-spot-red font-bold text-sm uppercase tracking-wider mb-2">{item.time}</div>
                  <h3 className="font-display text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-spot-charcoal/70">{item.desc}</p>
                </div>
              </div>
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

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div 
              key={i}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex flex-col h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-spot-charcoal/5 text-spot-charcoal rounded-full text-xs font-bold uppercase tracking-wider">{role.loc}</span>
                <span className="px-3 py-1 bg-spot-pastel-pink/30 text-spot-charcoal rounded-full text-xs font-bold uppercase tracking-wider">{role.type}</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-spot-red transition-colors">{role.title}</h3>
              <p className="text-spot-charcoal/70 mb-8 flex-grow">{role.desc}</p>
              <button 
                onClick={() => onApply(role.title)}
                className="w-full py-3 border-2 border-spot-charcoal text-spot-charcoal font-bold rounded-full hover:bg-spot-charcoal hover:text-white transition-colors flex items-center justify-center gap-2"
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
    <section className="py-16 md:py-32 bg-spot-charcoal text-spot-cream px-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-spot-cream/5 font-display text-[300px] leading-none font-black">"</div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-10">Meet the <span className="text-spot-pastel-pink">Team</span></h2>
          
          <div className="space-y-8">
            <p className="font-display text-3xl md:text-4xl leading-tight font-medium">
              "At SPOT I feel like I am building something meaningful every day. It's the creative freedom I always wanted as an educator."
            </p>
            <div>
              <div className="font-bold text-xl text-spot-pastel-yellow">Sarah Jenkins</div>
              <div className="text-spot-cream/60 uppercase tracking-wider text-sm font-bold mt-1">Lead Learning Designer</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-spot-charcoal shadow-2xl relative z-10">
            <img src="https://images.unsplash.com/photo-1580894732444-8ecded790047?q=80&w=800&auto=format&fit=crop" alt="Educator at SPOT" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-spot-red rounded-full mix-blend-screen filter blur-3xl opacity-50 z-0" />
        </motion.div>
      </div>
    </section>
  );
};

const EducatorCommunity = () => {
  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="bg-spot-pastel-yellow rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-multiply" />
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 text-spot-charcoal">Educator Community</h2>
          <p className="text-xl text-spot-charcoal/80 mb-10 font-medium">
            Not looking for a full-time role? We invite professionals to collaborate with SPOT through various community programs.
          </p>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6 mb-10">
            {['Guest Mentors', 'Artists in Residence', 'Industry Experts', 'Internships'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
                <Star className="text-spot-red" size={20} />
                <span className="font-bold text-spot-charcoal">{item}</span>
              </div>
            ))}
          </div>
          
          <button className="px-8 py-4 bg-spot-charcoal text-white font-bold rounded-full text-lg hover:bg-black transition-colors shadow-xl">
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onApply }: { onApply: () => void }) => {
  return (
    <section className="py-20 md:py-40 px-6 text-center relative overflow-hidden bg-spot-charcoal text-spot-cream">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      
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
      <SpotCulture />
      <EducatorMindset />
      <DayInTheLife />
      <OpenRoles onApply={handleApply} />
      <Benefits />
      <MeetTheTeam />
      
      {/* Join SPOT Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Join the SPOT Team</h2>
        <button 
          onClick={() => handleApply()}
          className="px-10 py-5 bg-spot-charcoal text-white font-bold rounded-full text-xl hover:bg-spot-red transition-colors shadow-xl"
        >
          Apply Now
        </button>
      </section>

      <EducatorCommunity />
      <FinalCTA onApply={() => handleApply()} />

      <ApplicationModal 
        isOpen={isApplicationOpen} 
        onClose={() => setIsApplicationOpen(false)} 
        defaultRole={selectedRole}
      />
    </div>
  );
}
