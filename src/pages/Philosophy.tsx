import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

import { 
  Compass, Lightbulb, Hammer, Quote, Presentation, 
  Brain, Heart, Map, Users, BookOpen, Wrench,
  TreePine, Building2, Tent, ArrowDown, Activity
} from 'lucide-react';

export default function Philosophy() {
  const [activeEcosystemNode, setActiveEcosystemNode] = useState<number | null>(null);

  const philosophySchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "The SPOT Philosophy",
    "description": "Learn about the core principles of SPOT Bangalore: Connection Before Correction, Personalized Learning, and Strength-Based Education.",
    "url": "https://spotbangalore.com/philosophy",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "SPOT Microschool"
    }
  };

  const strengths = [
    { title: 'Creative Expression', icon: <Lightbulb size={32} />, desc: 'Exploring ideas through art, design, and imaginative problem-solving.' },
    { title: 'Engineering Curiosity', icon: <Hammer size={32} />, desc: 'Taking things apart, understanding systems, and building new solutions.' },
    { title: 'Scientific Exploration', icon: <Compass size={32} />, desc: 'Asking questions, forming hypotheses, and testing the natural world.' },
    { title: 'Storytelling', icon: <Quote size={32} />, desc: 'Communicating ideas powerfully through writing, media, and presentation.' },
    { title: 'Entrepreneurial Thinking', icon: <Presentation size={32} />, desc: 'Identifying needs, creating value, and leading initiatives.' }
  ];

  const ecosystemNodes = [
    { id: 1, title: 'Studios', icon: <Wrench size={24} />, desc: 'Dedicated spaces for hands-on creation and deep work.', angle: 0 },
    { id: 2, title: 'Community Mentors', icon: <Users size={24} />, desc: 'Learning directly from professionals and experts in the field.', angle: 51 },
    { id: 3, title: 'Nature Exploration', icon: <TreePine size={24} />, desc: 'Connecting with the environment through outdoor learning.', angle: 102 },
    { id: 4, title: 'Workshops', icon: <Hammer size={24} />, desc: 'Focused, skill-building sessions led by specialists.', angle: 154 },
    { id: 5, title: 'Internships', icon: <Building2 size={24} />, desc: 'Real-world work experience and professional exposure.', angle: 205 },
    { id: 6, title: 'Camps', icon: <Tent size={24} />, desc: 'Immersive, multi-day deep dives into specific themes.', angle: 257 },
    { id: 7, title: 'Local Experiences', icon: <Map size={24} />, desc: 'Using the city as a classroom for civic and cultural learning.', angle: 308 }
  ];

  return (
    <main className="pt-0 overflow-x-hidden antigravity-perspective">
      <SEO 
        title="The SPOT Philosophy | Connection, Curiosity & Autonomy in Education"
        description="Our 'Connection Before Correction' doctrine drives everything at SPOT. Learn about our neuro-affirmative, strength-based approach to teen education."
        schema={philosophySchema}
      />
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-spot-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/real-photos/philosophy_hero.png" 
            alt="Authentic facilitation at SPOT" 
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spot-cream/40 via-spot-cream/20 to-spot-cream" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1.5 glass-morphism mb-8 rounded-full text-spot-red font-black text-[10px] uppercase tracking-[0.2em] border border-spot-red/10">
              The Insighte DNA
            </div>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[110px] text-spot-charcoal tracking-tighter mb-10 leading-[0.8] uppercase flex flex-col items-center">
              <span className="relative">
                The SPOT
                <motion.svg className="absolute -bottom-4 -left-4 -right-4 h-6 w-full opacity-30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="#D92D20" strokeWidth="4" fill="none" />
                </motion.svg>
              </span>
              <span className="text-spot-red mt-2">Philosophy</span>
            </h1>
            <p className="text-xl md:text-3xl text-spot-charcoal mb-14 max-w-3xl mx-auto font-bold leading-tight tracking-tight">
              A personalized learning space where curiosity leads, self-regulation grounds, and real-world projects build mastery.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('our-model')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest rounded-2xl hover:bg-spot-red transition-all text-xs shadow-2xl haptic-feedback"
              >
                Discover Our Approach
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30"
        >
          <div className="w-[2px] h-12 bg-spot-charcoal rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-widest mt-4">Scroll</span>
        </motion.div>
      </section>

      <section id="our-model" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-black text-4xl md:text-6xl text-spot-charcoal mb-8 uppercase tracking-tighter leading-none">Designed for <br/><span className="text-spot-red tracking-[-0.05em]">One Child</span></h2>
          <p className="text-2xl text-spot-charcoal/80 leading-tight font-medium">
            We believe learning is not a standardized assembly line. SPOT designs learning experiences around individual curiosity, strengths, and goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Standard Path */}
          <div className="relative p-8 rounded-[3rem] bg-gray-50 border border-gray-200 text-center opacity-80 hover:opacity-100 transition-opacity">
            <h3 className="font-display font-bold text-2xl text-gray-400 mb-8 uppercase tracking-widest text-sm">The Industrial Model</h3>
            
            <div className="flex flex-col items-center relative">
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gray-200 z-0" />
              
              <div className="relative z-10 bg-white border-2 border-gray-200 w-full max-w-[200px] py-4 rounded-2xl mb-8 text-gray-500 font-medium shadow-sm">
                Same Curriculum
              </div>
              <div className="relative z-10 bg-white border-2 border-gray-200 w-full max-w-[200px] py-4 rounded-2xl mb-8 text-gray-500 font-medium shadow-sm">
                Same Pace
              </div>
              <div className="relative z-10 bg-white border-2 border-gray-200 w-full max-w-[200px] py-4 rounded-2xl text-gray-500 font-medium shadow-sm">
                Standardized Tests
              </div>
            </div>
          </div>
          
          {/* SPOT Path */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative p-12 rounded-[3.5rem] glass-morphism border-2 border-spot-pastel-yellow/30 text-center shadow-2xl overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-spot-pastel-yellow rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-spot-pastel-pink rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2" />
            
            <h3 className="font-display font-black text-xs text-spot-charcoal/50 mb-12 uppercase tracking-widest relative z-10 transition-colors group-hover:text-spot-red">The SPOT Model</h3>
            
            <div className="flex flex-col items-center relative z-10">
              {/* Wavy connecting line */}
              <svg className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-48 h-full z-0 opacity-20" preserveAspectRatio="none">
                <path d="M96,0 C96,100 20,100 20,200 C20,300 172,300 172,400" fill="none" stroke="#FF6321" strokeWidth="6" strokeDasharray="12,12" />
              </svg>

              <motion.div 
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="relative z-10 glass-morphism-heavy border-2 border-white/40 w-full max-w-[280px] py-6 rounded-3xl mb-12 text-spot-charcoal font-black uppercase tracking-tighter text-lg shadow-2xl flex items-center justify-center gap-4"
              >
                <div className="p-2 bg-spot-pastel-yellow rounded-xl text-spot-charcoal"><Lightbulb size={24} /></div>
                Child's Interests
              </motion.div>
              
              <div className="relative z-10 flex gap-6 mb-12 w-full justify-center">
                <motion.div whileHover={{ y: -10, rotate: -5 }} className="bg-spot-pastel-blue glass-morph-heavy px-8 py-6 rounded-3xl text-spot-charcoal font-black uppercase tracking-tighter shadow-2xl flex flex-col items-center gap-3">
                  <div className="p-2 bg-white rounded-xl"><Hammer size={24} /></div>
                  Projects
                </motion.div>
                <motion.div whileHover={{ y: -10, rotate: 5 }} className="bg-spot-pastel-pink glass-morph-heavy px-8 py-6 rounded-3xl text-spot-charcoal font-black uppercase tracking-tighter shadow-2xl flex flex-col items-center gap-3">
                  <div className="p-2 bg-white rounded-xl"><Users size={24} /></div>
                  Mentors
                </motion.div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="relative z-10 bg-spot-red text-white w-full max-w-[280px] py-6 rounded-3xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-spot-red/40 flex items-center justify-center gap-4"
              >
                <Compass size={24} />
                Personal Mastery
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Strength Based Education */}
      <section className="py-24 px-6 bg-spot-charcoal text-spot-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6 text-spot-pastel-yellow">Strength Based Learning</h2>
            <p className="text-xl text-spot-cream/80 max-w-3xl mx-auto leading-relaxed">
              We focus on what children are naturally curious about and good at. Instead of constantly fixing weaknesses, children are encouraged to explore their interests deeply through studios and projects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {strengths.map((strength, index) => (
              <div key={index} className="group perspective-1000 h-72">
                <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden glass-morphism border border-white/20 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl">
                    <div className="text-spot-red mb-6 bg-white shadow-xl p-5 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {strength.icon}
                    </div>
                    <h3 className="font-display font-black text-xl uppercase tracking-tighter leading-none">{strength.title}</h3>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-spot-red rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                    <h3 className="font-display font-black text-lg uppercase tracking-widest text-white/40 mb-4">Focus</h3>
                    <p className="text-white font-bold leading-tight text-lg">{strength.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Executive Function Framework */}
      <section className="py-24 px-6 bg-spot-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Body Ready → Mind Ready</h2>
            <p className="text-xl text-spot-charcoal/80 leading-relaxed">
              Learning becomes easier when children are regulated and supported. We build the foundation for deep learning through three core stages.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">
            
            {/* Text Steps - Dynamic Highlight */}
            <div className="flex-1 space-y-10 max-w-lg w-full relative">
              <div className="absolute top-0 bottom-0 left-[31px] w-[2px] bg-spot-charcoal/10" />
              {[
                {
                  id: "body",
                  step: "01",
                  title: "Body Regulation",
                  desc: "Grounding the nervous system through sensory-rich movement and spatial awareness.",
                  icon: <Activity size={24} />,
                  color: "rgba(209, 232, 226, 0.5)",
                  accent: "text-blue-600"
                },
                {
                  id: "heart",
                  step: "02",
                  title: "Psychological Safety",
                  desc: "Creating a personalized container where every learner feels seen, heard, and regulated.",
                  icon: <Heart size={24} />,
                  color: "rgba(250, 220, 217, 0.5)",
                  accent: "text-rose-600"
                },
                {
                  id: "mind",
                  step: "03",
                  title: "Cognitive Bloom",
                  desc: "The executive brain comes online, ready for deep focus, logic, and creative flow.",
                  icon: <Brain size={24} />,
                  color: "rgba(253, 242, 213, 0.5)",
                  accent: "text-amber-600"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/40 glass-morphism p-10 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-white/80 relative group hover:bg-white/80 transition-all duration-500"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 20, scale: 1.02 }}
                >
                  <motion.div 
                    className={`absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[6px] border-spot-cream shadow-xl z-20`}
                    style={{ backgroundColor: item.color }}
                    whileHover={{ scale: 1.5 }}
                  />
                  <div className="flex items-center gap-8 mb-6 relative z-10">
                    <div className={`w-16 h-16 rounded-[1.5rem] glass-morphism flex items-center justify-center ${item.accent} shadow-inner group-hover:rotate-12 transition-transform duration-500`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-[0.3em] opacity-30 block mb-1 uppercase">Phase {item.step}</span>
                      <h4 className="font-display font-black text-3xl uppercase tracking-tighter leading-none">{item.title}</h4>
                    </div>
                  </div>
                  <p className="text-xl text-spot-charcoal/70 pl-2 font-bold leading-tight tracking-tight italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Neural Energy Flow Animation - Ultra Premium */}
            <div className="flex-1 flex justify-center items-center w-full relative h-[700px] perspective-1000">
               {/* Ambient Glows */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-spot-pastel-pink/10 rounded-full blur-[150px] animate-pulse" />
               <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-spot-pastel-blue/10 rounded-full blur-[120px]" />
               
               <div className="relative w-full h-full flex flex-col items-center justify-center scale-110 md:scale-125 lg:scale-150 rotate-y-[-10deg]">
                {/* SVG Child Vessel */}
                <svg viewBox="0 0 240 400" className="w-[320px] h-[540px] drop-shadow-[0_60px_100px_rgba(0,0,0,0.1)]">
                  <defs>
                    <filter id="glass-blur">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </filter>
                    <linearGradient id="neuralFlow" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#D1E8E2" />
                      <stop offset="50%" stopColor="#FADCD9" />
                      <stop offset="100%" stopColor="#FDF2D5" />
                    </linearGradient>
                  </defs>

                  {/* Glass Outer Shell */}
                  {/* Use a more organic silhouette path as background */}
                  <path 
                    d="M120,60 C140,60 155,75 155,100 C155,125 140,140 120,140 C100,140 85,125 85,100 C85,75 100,60 120,60 Z M80,150 L160,150 C180,150 190,160 190,190 L190,300 C190,330 175,345 155,345 L85,345 C65,345 50,330 50,300 L50,190 C50,160 60,150 80,150 Z M90,350 L110,350 L110,400 C110,410 100,420 90,420 L70,420 C60,420 55,410 55,390 L55,350 Z M130,350 L150,350 L150,390 C150,410 145,420 135,420 L115,420 C105,420 100,410 100,400 L100,350 Z" 
                    fill="rgba(0,0,0,0.05)"
                  />
                  
                  {/* Phase 1: Body (Teal) - Fills the base */}
                  <motion.path 
                    d="M90,350 L110,350 L110,400 C110,410 100,420 90,420 L70,420 C60,420 55,410 55,390 L55,350 Z M130,350 L150,350 L150,390 C150,410 145,420 135,420 L115,420 C105,420 100,410 100,400 L100,350 Z"
                    fill="#D1E8E2"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ originY: 1 }}
                  />
                  
                  {/* Phase 2: Heart (Pink) - Fills the torso */}
                  <motion.path 
                    d="M80,150 L160,150 C180,150 190,160 190,190 L190,300 C190,330 175,345 155,345 L85,345 C65,345 50,330 50,300 L50,190 C50,160 60,150 80,150 Z"
                    fill="#FADCD9"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    style={{ originY: 1 }}
                  />
                  
                  {/* Phase 3: Mind (Yellow) - Fills the head */}
                  <motion.path 
                    d="M120,60 C140,60 155,75 155,100 C155,125 140,140 120,140 C100,140 85,125 85,100 C85,75 100,60 120,60 Z"
                    fill="#FDF2D5"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    style={{ originY: 1 }}
                  />
                  
                  {/* Neural Connectors */}
                  <motion.path 
                    d="M120,195 L120,140"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="100"
                    initial={{ strokeDashoffset: 100 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />

                  {/* Glowing Particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.circle
                      key={i}
                      r="3"
                      fill="white"
                      initial={{ 
                        cx: 120, 
                        cy: 350, 
                        opacity: 0 
                      }}
                      animate={{ 
                        cx: 120 + (Math.random() - 0.5) * 80,
                        cy: 100 + (Math.random() - 0.5) * 60,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 2, 
                        repeat: Infinity, 
                        delay: i * 0.5 
                      }}
                    />
                  ))}
                </svg>

                {/* Floating Meta Labels */}
                <div className="absolute inset-0 pointer-events-none">
                   <motion.div 
                     className="absolute top-[15%] right-[-10%] glass-morph-heavy px-4 py-2 rounded-xl border border-white/40 shadow-xl"
                     initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 2 }}
                   >
                     <span className="text-[9px] font-black uppercase text-amber-500">Integrated Control</span>
                   </motion.div>
                   <motion.div 
                     className="absolute top-[45%] left-[-20%] glass-morph-heavy px-4 py-2 rounded-xl border border-white/40 shadow-xl"
                     initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 1.5 }}
                   >
                     <span className="text-[9px] font-black uppercase text-rose-500">Nervous System: Calibrated</span>
                   </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Section 6: Real Life Projects and Internships */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Learning Through Real Projects</h2>
          <p className="text-xl text-spot-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            Children apply ideas through real-world work. Whether building machines, designing art installations, creating podcasts, or running experiments, learning is always active.
          </p>
        </div>

        {/* Project Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-black/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "Idea", icon: <Lightbulb size={32} />, desc: "Identifying a problem or sparking a curiosity.", color: "bg-spot-pastel-yellow" },
              { title: "Build", icon: <Hammer size={32} />, desc: "Prototyping, iterating, and overcoming challenges.", color: "bg-spot-pastel-blue" },
              { title: "Showcase", icon: <Presentation size={32} />, desc: "Presenting the final work to the community.", color: "bg-spot-pastel-pink" }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 text-center flex flex-col items-center relative"
              >
                <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-spot-charcoal mb-6 shadow-inner`}>
                  {step.icon}
                </div>
                <h3 className="font-display font-black text-2xl text-spot-charcoal mb-3">{step.title}</h3>
                <p className="text-spot-charcoal/70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Subjects and Academic Pathways */}
      <section className="py-24 px-6 bg-spot-charcoal text-spot-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6 text-spot-pastel-yellow">Academic Pathways</h2>
            <p className="text-xl text-spot-cream/80 max-w-3xl mx-auto leading-relaxed">
              SPOT supports formal academic frameworks while keeping learning flexible. Students can pursue structured academics alongside deep studio exploration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center hover:bg-white/10 transition-colors">
              <div className="w-20 h-20 bg-spot-red rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="font-display font-black text-3xl mb-4">Academic Foundations</h3>
              <p className="text-spot-cream/70 mb-6 leading-relaxed">
                Structured learning paths supporting formal qualifications.
              </p>
              <div className="flex justify-center gap-4">
                <span className="px-4 py-2 bg-white/10 rounded-full font-bold text-sm">IGCSE</span>
                <span className="px-4 py-2 bg-white/10 rounded-full font-bold text-sm">NIOS</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center hover:bg-white/10 transition-colors">
              <div className="w-20 h-20 bg-spot-pastel-blue rounded-full flex items-center justify-center text-spot-charcoal mx-auto mb-6">
                <Wrench size={32} />
              </div>
              <h3 className="font-display font-black text-3xl mb-4">Studio Exploration</h3>
              <p className="text-spot-cream/70 leading-relaxed">
                Hands-on, project-based learning in specialized environments like Maker, Science, and Storytelling studios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 & 9 Combined: The SPOT Learning Ecosystem */}
      <section className="py-24 px-6 bg-spot-cream overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Learning Beyond the Classroom</h2>
          <p className="text-xl text-spot-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            SPOT connects learning to the local environment and community. We connect children to mentors, nature, and real-world experiences. Hover over the areas below to explore our ecosystem.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[600px] flex items-center justify-center">
          {/* Central Hub */}
          <div className="absolute z-30 w-40 h-40 bg-spot-red rounded-full flex items-center justify-center text-white font-display font-black text-4xl shadow-2xl shadow-spot-red/30">
            SPOT
          </div>

          {/* Orbiting Nodes */}
          {ecosystemNodes.map((node) => {
            const angleRad = node.angle * (Math.PI / 180);
            const radius = 220; // Distance from center
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            
            const isActive = activeEcosystemNode === node.id;

            return (
              <div 
                key={node.id}
                className="absolute z-20"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                onMouseEnter={() => setActiveEcosystemNode(node.id)}
                onMouseLeave={() => setActiveEcosystemNode(null)}
              >
                <div className={`w-28 h-28 rounded-[2rem] glass-morphism-heavy flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-500 border border-white/40 ${isActive ? 'bg-spot-charcoal text-white scale-125 -translate-y-8 z-[60]' : 'bg-white/50 text-spot-charcoal hover:scale-110 z-20'} ${activeEcosystemNode && !isActive ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}>
                  {React.cloneElement(node.icon as React.ReactElement, { size: 36 })}
                </div>
                
                {/* Tooltip/Description - Fixed Side Sidebar approach for readability */}
                <div className="fixed top-1/2 right-10 -translate-y-1/2 w-80 pointer-events-none hidden lg:block z-[100]">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="glass-morphism-heavy p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/60 text-center"
                      >
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-red mb-4">Ecosystem Part</div>
                        <h4 className="font-display font-black text-3xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-none">{node.title}</h4>
                        <p className="text-base text-spot-charcoal/80 font-bold leading-tight">{node.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Tooltip */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 glass-morphism-heavy p-6 rounded-3xl shadow-2xl border border-white/60 z-[100] text-center pointer-events-none"
                      >
                        <h4 className="font-display font-bold text-xl text-spot-charcoal mb-2 uppercase tracking-tighter">{node.title}</h4>
                        <p className="text-sm text-spot-charcoal/80 font-medium leading-tight">{node.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
             {ecosystemNodes.map((node) => {
                const angleRad = node.angle * (Math.PI / 180);
                const radius = 220;
                const x2 = 50 + (Math.cos(angleRad) * radius * 100 / 450); // Rough percentage calc for SVG
                const y2 = 50 + (Math.sin(angleRad) * radius * 100 / 300);
                
                return (
                  <line 
                    key={node.id}
                    x1="50%" y1="50%" 
                    x2={`calc(50% + ${Math.cos(angleRad) * radius}px)`} 
                    y2={`calc(50% + ${Math.sin(angleRad) * radius}px)`} 
                    stroke={activeEcosystemNode === node.id ? "#FF6321" : "rgba(0,0,0,0.05)"} 
                    strokeWidth={activeEcosystemNode === node.id ? "3" : "2"} 
                    className="transition-colors duration-300"
                  />
                );
             })}
          </svg>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display font-black text-4xl md:text-6xl text-spot-charcoal mb-8 uppercase tracking-tighter leading-none">Choose Your <br/><span className="text-spot-red">Learning Pathway</span></h2>
          <p className="text-2xl text-spot-charcoal/80 max-w-3xl mx-auto font-bold leading-tight">
            SPOT offers three distinct ways to engage with our philosophy, designed to fit different educational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { 
              title: "Microschool", 
              path: "/microschool", 
              color: "bg-spot-pastel-pink", 
              desc: "Full-time personalized education replacing traditional school entirely.",
              icon: <Building2 />,
              img: "/assets/real-photos/studio_atmosphere.png"
            },
            { 
              title: "SPOT Studio", 
              path: "/studios", 
              color: "bg-spot-pastel-blue", 
              desc: "After-school and weekend deep-dives for specialized project building.",
              icon: <Wrench />,
              img: "/assets/real-photos/teen_3d_printing.png"
            },
            { 
              title: "In-School Program", 
              path: "/inschool", 
              color: "bg-spot-pastel-yellow", 
              desc: "We bring SPOT's philosophy directly into mainstream partner schools.",
              icon: <Presentation />,
              img: "/assets/real-photos/facilitator_child.png"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/40 cursor-pointer"
              whileHover={{ y: -20 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2]" />
              <div className={`absolute inset-0 bg-gradient-to-t from-spot-charcoal/90 via-spot-charcoal/40 to-transparent`} />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-spot-charcoal mb-6 shadow-xl`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="font-display font-black text-4xl text-white mb-4 uppercase tracking-tighter leading-none">{item.title}</h3>
                <p className="text-white/70 font-bold mb-8 leading-tight">{item.desc}</p>
                <Link 
                  to={item.path}
                  className="w-full py-4 glass-morph-heavy rounded-2xl text-white font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-spot-red transition-all"
                >
                  Explore Mode <ArrowDown className="-rotate-90" size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 11: Final Message */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal mb-8 tracking-tighter">
          A Different <br/><span className="text-spot-red">Way to Learn</span>
        </h2>
        <p className="text-xl text-spot-charcoal/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
          SPOT is designed for curious learners who want to explore the world deeply and creatively.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/studios" className="px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20">
            Explore Studios
          </Link>
          <Link to="/contact" className="px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10 flex items-center justify-center">
            Book an Open House
          </Link>
        </div>
      </section>

    </main>
  );
}
