import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowRight, Brain, Heart, Users, Sparkles, Rocket, Microscope, Palette, MessageCircle, Briefcase, ChevronRight, PlayCircle, Star, Globe, Compass, Zap, Target, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';


const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-spot-cream flex items-center justify-center pt-24 pb-32 antigravity-perspective">
      {/* Background abstract blobs */}
      <motion.div 
        className="absolute top-20 left-10 w-80 h-80 bg-spot-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ 
          x: [0, 60, 0], 
          y: [0, -60, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-[35rem] h-[35rem] bg-spot-pastel-pink rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
        animate={{ 
          x: [0, -50, 0], 
          y: [0, 80, 0],
          scale: [1, 1.15, 1] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-spot-pastel-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Collage Images */}
      <motion.div style={{ y: y1 }} className="absolute top-32 left-10 md:left-20 hidden lg:block z-10">
        <motion.div 
          className="relative p-3 bg-white shadow-2xl transform"
          initial={{ rotate: -6, z: 0 }}
          whileHover={{ rotate: 0, z: 100, scale: 1.1, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/80 border border-black/10 shadow-sm transform -rotate-2" />
          <img src="/assets/real-photos/clay_figures_1.jpg" alt="Collaborating" className="w-56 h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-sm" />
        </motion.div>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-40 right-10 md:right-20 hidden lg:block z-10">
        <motion.div 
          className="relative p-3 bg-white shadow-2xl transform"
          initial={{ rotate: 6, z: 0 }}
          whileHover={{ rotate: 0, z: 80, scale: 1.1, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/80 border border-black/10 shadow-sm transform rotate-3" />
          <img src="/assets/real-photos/scrabble_learning.jpg" alt="Building" className="w-64 h-56 object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-sm" />
        </motion.div>
      </motion.div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <div className="absolute -top-20 -right-16 text-spot-pastel-yellow opacity-40 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={80} fill="currentColor" />
            </motion.div>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.85] text-spot-charcoal mb-8 relative z-10">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              A School Built
            </motion.span> <br />
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block"
            >
              For
            </motion.span>
            <span className="relative inline-block text-spot-red ml-4">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="inline-block"
              >
                Curious Minds
              </motion.span>
              <motion.div 
                className="absolute bottom-2 md:bottom-3 left-0 w-full h-3 md:h-6 bg-spot-pastel-yellow/60 -z-10 transform -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.4, ease: "circOut" }}
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
          The standard classroom prepares students for a world that no longer exists. SPOT is a self-paced studio ecosystem where curious teens master future-proof crafts through project-based mastery.
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
    { title: "Personalized Space", icon: <Brain size={32} />, color: "bg-spot-pastel-yellow" },
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
            className={`min-w-[85vw] md:min-w-0 snap-center glass-morphism p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-4 border border-white/20 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] relative overflow-hidden group`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className={`absolute inset-0 ${feat.color} opacity-20 transition-opacity group-hover:opacity-30`} />
            <div className="p-4 bg-white shadow-lg rounded-2xl text-spot-charcoal relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-3">
              {feat.icon}
            </div>
            <h3 className="font-display font-bold text-2xl relative z-10">{feat.title}</h3>
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
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-[0.9] tracking-tighter uppercase">
            Body Ready → <br/><span className="text-spot-pastel-yellow relative decoration-spot-red underline decoration-4 underline-offset-8">Mind Ready Learning</span>
          </h2>
            Teens and young builders learn best when their nervous system is regulated. Our <span className="text-spot-pastel-blue">Executive Function</span> philosophy builds the foundation for deep learning.
          
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
          className="relative h-[500px] flex items-center justify-center antigravity-perspective"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 border-2 border-spot-cream/10 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-10 border border-spot-cream/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          
          <motion.div 
            className="w-48 h-48 bg-spot-pastel-blue rounded-full flex flex-col items-center justify-center text-spot-charcoal z-20 shadow-[0_0_60px_rgba(209,232,226,0.2)] glass-morphism border-white/40"
            animate={{ 
              rotateX: [0, 10, 0, -10, 0],
              rotateY: [0, -10, 0, 10, 0],
              z: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Brain size={48} className="mb-2" />
            <span className="font-display font-bold text-xl text-center leading-tight uppercase tracking-tighter">Executive<br/>Function</span>
          </motion.div>

          {/* Orbiting Elements with depth */}
          <motion.div 
            className="absolute top-10 left-20 bg-spot-pastel-pink text-spot-charcoal px-6 py-3 rounded-2xl font-bold shadow-xl border border-white/20 glass-morphism"
            animate={{ y: [0, -15, 0], z: [0, 40, 0], rotate: [-12, -8, -12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >Self Control</motion.div>
          
          <motion.div 
            className="absolute bottom-20 right-10 bg-spot-pastel-yellow text-spot-charcoal px-6 py-3 rounded-2xl font-bold shadow-xl border border-white/20 glass-morphism"
            animate={{ y: [0, 15, 0], z: [0, 60, 0], rotate: [6, 12, 6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >Adaptability</motion.div>
          
          <motion.div 
            className="absolute top-1/2 right-0 bg-spot-pastel-green text-spot-charcoal px-6 py-3 rounded-2xl font-bold shadow-xl border border-white/20 glass-morphism"
            animate={{ x: [0, 10, 0], z: [0, 30, 0], rotate: [12, 8, 12] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >Focus</motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/4 bg-spot-cream text-spot-charcoal px-6 py-3 rounded-2xl font-bold shadow-xl border border-white/20 glass-morphism"
            animate={{ x: [0, -10, 0], z: [0, 50, 0], rotate: [-6, 0, -6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >Memory</motion.div>
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
          Builders move through the experiential learning cycle in studios and projects, turning hands-on activity into deep understanding.
        </p>

        <div className="relative max-w-4xl mx-auto aspect-square md:aspect-video flex items-center justify-center antigravity-perspective">
          <div className="absolute inset-0 border-4 border-dashed border-spot-charcoal/10 rounded-full animate-[spin_80s_linear_infinite] opacity-50" />
          <div className="absolute inset-8 border border-dashed border-spot-charcoal/5 rounded-full animate-[spin_60s_linear_infinite_reverse] opacity-50" />
          
          <div className="grid grid-cols-2 gap-8 md:gap-32 w-full h-full p-8 md:p-16">
            <motion.div 
              className="flex flex-col items-center justify-center text-center bg-white/80 p-8 rounded-[2.5rem] shadow-2xl glass-morphism border-white/50"
              whileHover={{ scale: 1.1, rotateZ: -2, z: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-14 h-14 bg-spot-pastel-pink rounded-2xl flex items-center justify-center mb-4 shadow-lg text-spot-charcoal"><Compass /></div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tighter">Experience</h3>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center justify-center text-center bg-white/80 p-8 rounded-[2.5rem] shadow-2xl glass-morphism border-white/50"
              whileHover={{ scale: 1.1, rotateZ: 2, z: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-14 h-14 bg-spot-pastel-yellow rounded-2xl flex items-center justify-center mb-4 shadow-lg text-spot-charcoal"><MessageCircle /></div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tighter">Reflection</h3>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center justify-center text-center bg-white/80 p-8 rounded-[2.5rem] shadow-2xl glass-morphism border-white/50"
              whileHover={{ scale: 1.1, rotateZ: 1, z: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-14 h-14 bg-spot-cream rounded-2xl flex items-center justify-center mb-4 shadow-lg text-spot-charcoal"><Brain /></div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tighter">Concept</h3>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center justify-center text-center bg-white/80 p-8 rounded-[2.5rem] shadow-2xl glass-morphism border-white/50"
              whileHover={{ scale: 1.1, rotateZ: -2, z: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-14 h-14 bg-spot-pastel-green rounded-2xl flex items-center justify-center mb-4 shadow-lg text-spot-charcoal"><Microscope /></div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-tighter">Experiment</h3>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-spot-charcoal text-spot-cream rounded-full flex items-center justify-center font-display font-black text-2xl shadow-2xl z-20 border-4 border-white/10 text-center leading-none uppercase tracking-tighter"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Kolb<br/>Cycle
          </motion.div>
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
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-none">The Launcher <br/><span className="text-spot-pastel-yellow">Pathways</span>.</h2>
          <p className="text-xl text-spot-cream/80 max-w-3xl mx-auto leading-relaxed font-medium">
            We don't just "teach" for exams. We use global recognized boards as a bridge to allow students to focus 80% on their passions while securing their future credentials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="glass-morphism border border-white/20 rounded-[3.5rem] p-10 hover:bg-white/10 transition-all group relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-spot-pastel-blue opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
            <div className="w-16 h-16 bg-spot-pastel-blue rounded-2xl flex items-center justify-center text-spot-charcoal mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Globe size={32} />
            </div>
            <h3 className="font-display font-bold text-3xl mb-4 uppercase tracking-tighter">IGCSE Pathway</h3>
            <p className="text-spot-cream/70 mb-6 leading-relaxed font-medium">
              The International General Certificate of Secondary Education (IGCSE) is a globally recognized qualification. It offers a flexible curriculum with a wide choice of subjects, perfectly complementing our project-based approach.
            </p>
            <ul className="space-y-3 text-spot-cream/90 font-medium list-none">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-blue" /> Globally recognized standard</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-blue" /> Flexible subject selection</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-spot-pastel-blue" /> Rigorous academic foundation</li>
            </ul>
          </motion.div>

          <motion.div 
            className="glass-morphism border border-white/20 rounded-[3.5rem] p-10 hover:bg-white/10 transition-all group relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-spot-pastel-pink opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
            <div className="w-16 h-16 bg-spot-pastel-pink rounded-2xl flex items-center justify-center text-spot-charcoal mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="font-display font-bold text-3xl mb-4 uppercase tracking-tighter">NIOS Pathway</h3>
            <p className="text-spot-cream/70 mb-6 leading-relaxed font-medium">
              The National Institute of Open Schooling (NIOS) provides a highly flexible, recognized board certification in India. It allows students to focus heavily on their passions, studio work, or projects while completing exams at their own pace.
            </p>
            <ul className="space-y-3 text-spot-cream/90 font-medium list-none">
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
    "Divergent minds",
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
    { title: "Mechanical robot arm - Building circuits", img: "/assets/real-photos/mechanical_robot_arm_teen.png", rotate: -2 },
    { title: "Design a comic book - Artlore", img: "/assets/real-photos/teen_comic_design.png", rotate: 3 },
    { title: "Fermentation Lab - Making Pickles", img: "/assets/real-photos/teen_pickles.png", rotate: -1 },
    { title: "Brand Identity Design for Shop", img: "/assets/real-photos/teen_branding.png", rotate: 2 },
    { title: "Building a Living Terrarium", img: "/assets/real-photos/teen_terrarium.png", rotate: -3 },
    { title: "3D Printing & Rapid Prototyping", img: "/assets/real-photos/teen_3d_printing.png", rotate: 1 },
    { title: "Baking Studio - Culinary Design", img: "/assets/real-photos/teen_baking_studio.png", rotate: -2 },
    { title: "AI Studio - Human-Tech Collab", img: "/assets/real-photos/teen_ai.png", rotate: 2 },
  ];
  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-center">Student Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-20 justify-center antigravity-perspective">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="polaroid cursor-pointer"
            style={{ '--rotate': project.rotate } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.05, 
              rotateZ: 0, 
              z: 100, 
              rotateY: 5,
              transition: { duration: 0.4 }
            }}
          >
            <div className="aspect-square overflow-hidden bg-gray-200 mb-6 rounded-sm shadow-inner group">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
            </div>
            <div className="polaroid-caption text-xl lg:text-2xl">{project.title}</div>
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
            Learning happens best when young people feel safe, seen, and connected.
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
          <img src="/assets/real-photos/reading_together.jpg" alt="Community" className="rounded-3xl shadow-xl transform rotate-3" />
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "/assets/real-photos/clay_figures_2.jpg",
    "/assets/real-photos/scrabble_learning.jpg",
    "/assets/real-photos/clay_figures_1.jpg",
    "/assets/real-photos/reading_together.jpg"
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
        <p className="text-lg text-spot-charcoal/80 mb-4">
          Parents can attend an open house to observe studios, meet educators and understand the learning model.
        </p>
        <div className="bg-spot-red/5 border border-spot-red/20 rounded-2xl p-4 mb-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-spot-red text-white rounded-full flex items-center justify-center shrink-0 font-bold">
            25
          </div>
          <p className="font-bold text-spot-red">
            SPOT Microschool has only 25 seats available this year. Early registrations are encouraged.
          </p>
        </div>
        
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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input type="text" required placeholder="Your Name" className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl" />
                </div>
                <div className="relative group">
                  <input type="text" required placeholder="Child's Age" className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl" />
                </div>
              </div>
              <input type="email" required placeholder="Email Address" className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl" />
              <div className="relative">
                <input type="date" required className="w-full p-5 rounded-2xl bg-spot-cream/50 border border-black/5 focus:outline-none focus:border-spot-red transition-all focus:bg-white focus:shadow-xl text-spot-charcoal/60" />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-spot-charcoal/30 font-bold uppercase text-xs">Pick a Date</span>
              </div>
              <motion.button 
                type="submit" 
                className="w-full py-5 bg-spot-red text-white font-black uppercase tracking-widest rounded-2xl text-lg hover:bg-red-700 transition-all shadow-xl shadow-spot-red/30 hover:shadow-spot-red/50 active:scale-95"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register for Open House
              </motion.button>
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
                Register Another Student
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
    { 
      q: "Is SPOT a registered school or a learning lab?", 
      a: "SPOT is a full-time microschool alternative for middle and high schoolers. We are an Accredited Learning Ecosystem that focuses on self-paced mastery rather than standardized testing." 
    },
    { 
      q: "How does SPOT handle academic credentials and board exams?", 
      a: "We support both IGCSE (International) and NIOS (Indian) pathways. Students spend 80% of their time on passion-driven projects and 20% on focused academic blocks to secure globally recognized certifications." 
    },
    { 
      q: "Is it suitable for gifted or twice-exceptional (2e) learners?", 
      a: "Absolutely. SPOT was built for neuro-divergent and gifted minds who find traditional classrooms limiting. Our 1:3 teacher-student ratio ensures every child is seen, supported, and challenged at their own pace." 
    },
    { 
      q: "What is 'Studio-Based Learning' and how does it work?", 
      a: "Instead of subjects, students work in 'Studios' (like AI, Robotics, Art, or Culinary Labs). They learn through the Kolb Cycle: Experience, Reflection, Conceptualization, and Experimentation." 
    },
    { 
      q: "How do I know my child is actually learning without grades?", 
      a: "We value mastery over marks. Progress is documented through dynamic Portfolios and public 'Exhibitions of Learning' where students present real-world projects to mentors and peers." 
    }
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-24 px-6 max-w-3xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">FAQ</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i} 
            className="border border-black/5 rounded-[2rem] overflow-hidden bg-white/50 glass-morphism transition-all hover:bg-white/80"
            whileHover={{ scale: 1.01 }}
          >
            <button 
              className="w-full p-8 text-left font-black text-xl flex justify-between items-center group uppercase tracking-tighter"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="max-w-[85%]">{faq.q}</span>
              <div className={`p-2 rounded-full bg-spot-cream transition-transform duration-500 ${open === i ? 'rotate-180 bg-spot-red text-white' : ''}`}>
                <ChevronDown size={24} />
              </div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-8 pb-8 text-xl text-spot-charcoal/70 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
  const microschoolSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "SPOT Microschool Program",
    "description": "A self-paced, interest-driven microschool for teens in Bangalore. Focuses on personalized learning, executive function, and project-based mastery.",
    "url": "https://spotbangalore.com/microschool",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="relative">
      <SEO 
        title="Microschool Program | Personalized High School Alternative in Bangalore | SPOT"
        description="Ditch the traditional classroom. SPOT Microschool offers a self-paced, interest-driven education for middle and high schoolers. Focus on executive function and mastery."
        schema={microschoolSchema}
      />
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
