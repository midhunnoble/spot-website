import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowRight, Brain, Heart, Users, Sparkles, Rocket, Microscope, Palette, MessageCircle, Briefcase, ChevronRight, PlayCircle, Star, Globe, Compass, Zap, Target, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-spot-cream flex items-center justify-center pt-20 pb-32">
      {/* Background abstract blobs */}
      <motion.div 
        className="absolute top-40 left-20 w-96 h-96 bg-spot-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-60"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-spot-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Collage Images */}
      <motion.div style={{ y: y1 }} className="absolute top-32 left-10 md:left-20 hidden lg:block z-10">
        <div className="relative p-3 bg-white shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/80 border border-black/10 shadow-sm transform -rotate-2" />
          <img src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=400&auto=format&fit=crop" alt="Collaborating" className="w-56 h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-40 right-10 md:right-20 hidden lg:block z-10">
        <div className="relative p-3 bg-white shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/80 border border-black/10 shadow-sm transform rotate-3" />
          <img src="https://images.unsplash.com/photo-1585468273280-7c6536979201?q=80&w=400&auto=format&fit=crop" alt="Building" className="w-64 h-56 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
      </motion.div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative inline-block"
        >
          <div className="absolute -top-16 -right-12 text-spot-pastel-yellow font-handwriting text-5xl transform rotate-12 animate-pulse">
            <Star size={50} fill="currentColor" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter uppercase leading-[0.9] text-spot-charcoal mb-6 relative z-10">
            A School Built For <br />
            <span className="relative inline-block text-spot-red">
              Curious Minds
              <motion.div 
                className="absolute bottom-2 left-0 w-full h-2 md:h-4 bg-spot-pastel-yellow -z-10 transform -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1, ease: "circOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.p 
          className="font-sans text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-spot-charcoal/80 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          The SPOT Microschool is a small cohort learning space where children explore science, creativity, technology and storytelling through studios and real world projects.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link to="/contact" className="px-8 py-4 bg-spot-red text-white font-bold rounded-full text-lg hover:bg-red-700 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 shadow-xl shadow-spot-red/20 hover:scale-105 active:scale-95">
            Book an Open House <ArrowRight size={20} />
          </Link>
          <Link to="/studios" className="px-8 py-4 bg-white border-2 border-spot-charcoal text-spot-charcoal font-bold rounded-full text-lg hover:bg-spot-charcoal hover:text-white transition-colors w-full sm:w-auto shadow-xl shadow-black/5 hover:scale-105 active:scale-95 flex items-center justify-center">
            Explore Studios
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const WhatMakesSpotDifferent = () => {
  const features = [
    { title: "Small Cohorts", icon: <Users size={32} />, color: "bg-spot-pastel-pink" },
    { title: "Studio Based Learning", icon: <Palette size={32} />, color: "bg-spot-pastel-blue" },
    { title: "Neurodiversity Friendly", icon: <Brain size={32} />, color: "bg-spot-pastel-yellow" },
    { title: "Real World Projects", icon: <Globe size={32} />, color: "bg-spot-pastel-green" },
    { title: "Executive Function Development", icon: <Target size={32} />, color: "bg-spot-cream" }
  ];

  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">What Makes SPOT Different</h2>
        <p className="font-handwriting text-3xl text-spot-red transform -rotate-2">Not your average classroom</p>
      </div>
      
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:flex-wrap md:justify-center gap-6 hide-scrollbar">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            className={`min-w-[85vw] md:min-w-0 snap-center ${feat.color} p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 shadow-sm border border-black/5 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="p-4 bg-white/50 rounded-full text-spot-charcoal">
              {feat.icon}
            </div>
            <h3 className="font-display font-bold text-xl">{feat.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ExecutiveFunction = () => {
  return (
    <section className="py-12 md:py-24 bg-spot-charcoal text-spot-cream px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Body Ready → <br/><span className="text-spot-pastel-yellow">Mind Ready Learning</span>
          </h2>
          <p className="text-xl text-spot-cream/80 mb-8 leading-relaxed">
            Children learn best when their nervous system is regulated. Our Executive Function philosophy builds the foundation for deep learning.
          </p>
          
          <ul className="space-y-6">
            {[
              "Emotional regulation",
              "Attention and focus",
              "Planning and organisation",
              "Working memory",
              "Cognitive flexibility"
            ].map((item, i) => (
              <motion.li 
                key={i}
                className="flex items-center gap-4 text-lg font-medium"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <div className="w-8 h-8 rounded-full bg-spot-red flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="relative h-[500px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 border-2 border-spot-cream/10 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-10 border border-spot-cream/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          
          <div className="w-48 h-48 bg-spot-pastel-blue rounded-full flex flex-col items-center justify-center text-spot-charcoal z-20 shadow-[0_0_40px_rgba(209,232,226,0.3)]">
            <Brain size={48} className="mb-2" />
            <span className="font-display font-bold text-xl text-center leading-tight">Executive<br/>Function</span>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute top-10 left-20 bg-spot-pastel-pink text-spot-charcoal px-4 py-2 rounded-full font-bold transform -rotate-12">Self Control</div>
          <div className="absolute bottom-20 right-10 bg-spot-pastel-yellow text-spot-charcoal px-4 py-2 rounded-full font-bold transform rotate-6">Adaptability</div>
          <div className="absolute top-1/2 right-0 bg-spot-pastel-green text-spot-charcoal px-4 py-2 rounded-full font-bold transform rotate-12">Focus</div>
          <div className="absolute bottom-10 left-1/4 bg-spot-cream text-spot-charcoal px-4 py-2 rounded-full font-bold transform -rotate-6">Memory</div>
        </motion.div>
      </div>
    </section>
  );
};

const DayAtSpot = () => {
  const schedule = [
    { time: "09:00", title: "Morning arrival & grounding", icon: <Heart /> },
    { time: "10:00", title: "Studio block & project based learning", icon: <Palette /> },
    { time: "12:30", title: "Community lunch", icon: <Users /> },
    { time: "13:30", title: "Outdoor exploration or maker studio", icon: <Compass /> },
    { time: "15:00", title: "Reflection and journaling", icon: <MessageCircle /> }
  ];

  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-20">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">A Day at SPOT</h2>
        <p className="text-xl text-spot-charcoal/70">Rhythm, not strict routine.</p>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-spot-charcoal/10 md:-translate-x-1/2" />
        
        <div className="space-y-12">
          {schedule.map((item, i) => (
            <motion.div 
              key={i}
              className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} pl-16 md:pl-0`}>
                <div className="inline-block px-4 py-1 bg-spot-red text-white font-bold rounded-full mb-3">{item.time}</div>
                <h3 className="font-display text-2xl font-bold">{item.title}</h3>
              </div>
              
              <div className="absolute left-0 md:relative md:left-auto w-14 h-14 rounded-full bg-spot-cream border-4 border-white shadow-md flex items-center justify-center text-spot-red z-10 shrink-0">
                {item.icon}
              </div>
              
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KolbCycle = () => {
  return (
    <section className="py-12 md:py-24 bg-spot-pastel-blue px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Learning by Doing</h2>
        <p className="text-xl text-spot-charcoal/80 max-w-2xl mx-auto mb-8 md:mb-16">
          Children move through the experiential learning cycle in studios and projects, turning hands-on activity into deep understanding.
        </p>

        <div className="relative max-w-3xl mx-auto aspect-square md:aspect-video flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-dashed border-spot-charcoal/20 rounded-full animate-[spin_60s_linear_infinite]" />
          
          <div className="grid grid-cols-2 gap-8 md:gap-32 w-full h-full p-8 md:p-16">
            <motion.div className="flex flex-col items-center justify-center text-center bg-white p-6 rounded-3xl shadow-lg transform -rotate-3" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-spot-pastel-pink rounded-full flex items-center justify-center mb-4"><Compass /></div>
              <h3 className="font-display font-bold text-xl">Experience</h3>
            </motion.div>
            <motion.div className="flex flex-col items-center justify-center text-center bg-white p-6 rounded-3xl shadow-lg transform rotate-2" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-spot-pastel-yellow rounded-full flex items-center justify-center mb-4"><MessageCircle /></div>
              <h3 className="font-display font-bold text-xl">Reflection</h3>
            </motion.div>
            <motion.div className="flex flex-col items-center justify-center text-center bg-white p-6 rounded-3xl shadow-lg transform rotate-1" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-spot-cream rounded-full flex items-center justify-center mb-4"><Brain /></div>
              <h3 className="font-display font-bold text-xl">Concept</h3>
            </motion.div>
            <motion.div className="flex flex-col items-center justify-center text-center bg-white p-6 rounded-3xl shadow-lg transform -rotate-2" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-spot-pastel-green rounded-full flex items-center justify-center mb-4"><Microscope /></div>
              <h3 className="font-display font-bold text-xl">Experiment</h3>
            </motion.div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-spot-charcoal text-spot-cream rounded-full flex items-center justify-center font-handwriting text-3xl shadow-xl z-10">
            Kolb Cycle
          </div>
        </div>
      </div>
    </section>
  );
};

const AcademicPathways = () => {
  return (
    <section className="py-12 md:py-24 bg-spot-charcoal text-spot-cream px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-spot-pastel-yellow">Academic Pathways</h2>
          <p className="text-xl text-spot-cream/80 max-w-3xl mx-auto leading-relaxed">
            While our approach is deeply project-based, we ensure students are fully prepared for formal qualifications when they need them. SPOT supports flexible pathways to board exams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="bg-white/5 border border-white/10 rounded-[3rem] p-10 hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-spot-pastel-blue rounded-full flex items-center justify-center text-spot-charcoal mb-6">
              <Globe size={32} />
            </div>
            <h3 className="font-display font-bold text-3xl mb-4">IGCSE Pathway</h3>
            <p className="text-spot-cream/70 mb-6 leading-relaxed">
              The International General Certificate of Secondary Education (IGCSE) is a globally recognized qualification. It offers a flexible curriculum with a wide choice of subjects, perfectly complementing our project-based approach by allowing students to dive deep into areas of interest.
            </p>
            <ul className="space-y-3 text-spot-cream/90 font-medium">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-blue" /> Globally recognized standard</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-blue" /> Flexible subject selection</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-blue" /> Rigorous academic foundation</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-white/5 border border-white/10 rounded-[3rem] p-10 hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-spot-pastel-pink rounded-full flex items-center justify-center text-spot-charcoal mb-6">
              <Target size={32} />
            </div>
            <h3 className="font-display font-bold text-3xl mb-4">NIOS Pathway</h3>
            <p className="text-spot-cream/70 mb-6 leading-relaxed">
              The National Institute of Open Schooling (NIOS) provides a highly flexible, recognized board certification in India. It allows students to focus heavily on their passions, studio work, or entrepreneurial projects while completing their formal board exams at their own pace.
            </p>
            <ul className="space-y-3 text-spot-cream/90 font-medium">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-pink" /> Recognized across India</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-pink" /> Learn at your own pace</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-pink" /> Maximum flexibility for projects</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Thrive = () => {
  const learners = [
    "Curious explorers",
    "Creative thinkers",
    "Neurodivergent learners",
    "Home Schoolers",
    "2E and Gifted"
  ];
  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">What Kind of Learners Thrive Here?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {learners.map((learner, i) => (
          <motion.div
            key={i}
            className="bg-white px-8 py-4 rounded-full font-display font-bold text-lg shadow-sm border border-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "#D92D20", color: "white" }}
          >
            {learner}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Studios = () => {
  const studios = [
    { name: "Artlore", desc: "Creative expression", color: "bg-spot-pastel-pink" },
    { name: "Machine Marvels", desc: "Engineering and robotics", color: "bg-spot-pastel-blue" },
    { name: "WildJar", desc: "Science and biology exploration", color: "bg-spot-pastel-green" },
    { name: "Inkubator", desc: "Storytelling and publishing", color: "bg-spot-cream" },
    { name: "Body Dynamics", desc: "Movement and regulation", color: "bg-spot-pastel-yellow" }
  ];
  return (
    <section className="py-12 md:py-24 bg-spot-charcoal text-spot-cream px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12">Learning Studios</h2>
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio, i) => (
            <motion.div
              key={i}
              className={`${studio.color} text-spot-charcoal p-8 rounded-3xl cursor-pointer hover:scale-105 transition-transform`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-display text-2xl font-bold mb-2">{studio.name}</h3>
              <p className="font-medium opacity-80">{studio.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "Mechanical robot arm - Building circuits", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop", rotate: -2 },
    { title: "Design a comic book - Creating Art with Artlore", img: "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=800&auto=format&fit=crop", rotate: 3 },
    { title: "Making Pickles - Fermentation Lab", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop", rotate: -1 },
    { title: "Designing Branding for a Shop", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop", rotate: 2 },
    { title: "Building a Terrarium", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop", rotate: -3 },
    { title: "3D printing and designing", img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop", rotate: 1 },
    { title: "Baking Studio - Design cakes and cookies", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop", rotate: -2 },
    { title: "AI Studio - Designing programs with AI", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop", rotate: 2 },
  ];
  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-center">Student Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 md:gap-16 justify-center">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="polaroid cursor-pointer"
            style={{ '--rotate': project.rotate } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="aspect-square overflow-hidden bg-gray-200 mb-4">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="polaroid-caption">{project.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Community = () => {
  return (
    <section className="py-12 md:py-24 bg-spot-pastel-yellow px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Community & Belonging</h2>
          <p className="text-xl text-spot-charcoal/80 mb-6">
            Learning happens best when children feel safe, seen, and connected.
          </p>
          <ul className="space-y-4">
            {['Small community', 'Mixed age learning', 'Collaboration', 'Shared reflection'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-lg">
                <Heart className="text-spot-red" size={20} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Community" className="rounded-3xl shadow-xl transform rotate-3" />
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1585468273280-7c6536979201?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop"
  ];
  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div 
            key={i} 
            className={`rounded-2xl overflow-hidden ${i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
            whileHover={{ scale: 1.02 }}
          >
            <img src={img} alt="Gallery" className="w-full h-full object-cover aspect-square" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const OpenHouse = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 md:py-24 bg-spot-pastel-pink px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl relative">
        <div className="absolute -top-8 -right-8 text-spot-red font-handwriting text-5xl transform rotate-12">Join us!</div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Experience SPOT in Person.</h2>
        <p className="text-lg text-spot-charcoal/80 mb-10">
          Parents can attend an open house to observe studios, meet educators and understand the learning model.
        </p>
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-6">
                <input type="text" required placeholder="Your Name" className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red" />
                <input type="text" required placeholder="Child's Age" className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red" />
              </div>
              <input type="email" required placeholder="Email Address" className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red" />
              <input type="date" required className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red text-spot-charcoal/60" />
              <button type="submit" className="w-full py-4 bg-spot-red text-white font-bold rounded-xl text-lg hover:bg-red-700 transition-colors">
                Register for Open House
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-spot-pastel-green/20 text-spot-pastel-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="font-display text-3xl font-bold mb-4">Registration Successful!</h3>
              <p className="text-xl text-spot-charcoal/70 mb-8">
                Thank you for registering. We've sent the open house details to your email. See you soon!
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-spot-charcoal text-white font-bold rounded-full hover:bg-black transition-colors"
              >
                Register Another Child
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Is SPOT a school or learning lab?", a: "SPOT is a full-time microschool alternative to traditional schooling, functioning as a studio ecosystem." },
    { q: "What ages attend the microschool?", a: "We currently welcome curious learners aged 6 to 14." },
    { q: "How large are cohorts?", a: "Cohorts are kept small, typically 10-12 children, to ensure personalized attention and strong relationships." },
    { q: "How do children track progress?", a: "Progress is tracked through portfolios, project exhibitions, and continuous feedback rather than traditional grades." },
    { q: "What curriculum do you follow?", a: "We follow a project-based, emergent curriculum inspired by the children's interests and real-world skills." }
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-24 px-6 max-w-3xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-black/10 rounded-2xl overflow-hidden bg-white">
            <button 
              className="w-full p-6 text-left font-bold text-lg flex justify-between items-center"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
              <ChevronDown className={`transform transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-spot-charcoal/70"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-16 md:py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-spot-red opacity-10" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-10">
          COME VISIT <span className="text-spot-red">SPOT</span>.
        </h2>
        <Link to="/contact">
          <motion.button 
            className="px-10 py-5 bg-spot-charcoal text-spot-cream font-bold rounded-full text-xl hover:bg-spot-red transition-colors shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book an Open House
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default function Microschool() {
  return (
    <div className="relative">
      <HeroSection />
      <WhatMakesSpotDifferent />
      <ExecutiveFunction />
      <DayAtSpot />
      <KolbCycle />
      <AcademicPathways />
      <Thrive />
      <Studios />
      <Projects />
      <Community />
      <Gallery />
      <OpenHouse />
      <FAQ />
      <CTA />
    </div>
  );
}
