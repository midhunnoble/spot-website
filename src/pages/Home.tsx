import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowRight, Brain, Heart, Users, Sparkles, Rocket, Microscope, Palette, MessageCircle, Briefcase, ChevronRight, PlayCircle, Star, Globe, Compass, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// --- Components ---

const FloatingArtifact = ({ children, className, depth = 1, delay = 0 }: { children: React.ReactNode, className: string, depth?: number, delay?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200 * depth]);
  
  return (
    <motion.div 
      style={{ y }} 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute z-10 preserve-3d ${className}`}
    >
      <motion.div 
        animate={{ 
          rotateY: [0, 5, 0],
          rotateX: [0, -5, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 0.5
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-spot-cream flex items-center justify-center pt-20 pb-32 perspective-1000">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-spot-pastel-pink/20 rounded-full blur-[120px]"
          animate={{ 
            x: [0, 40, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-spot-pastel-blue/20 rounded-full blur-[100px]"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating Learning Artifacts */}
      <FloatingArtifact depth={0.6} delay={0.2} className="top-20 left-4 md:left-12 lg:block hidden">
        <div className="glass-morphism p-2 rounded-2xl shadow-2xl rotate-[-12deg] group hover:rotate-0 transition-transform duration-500">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/60 backdrop-blur-sm border border-black/5 rounded-full" />
          <img 
            src="/assets/real-photos/teen_laptop.jpg" 
            alt="Student Work" 
            loading="eager"
            fetchpriority="high"
            className="w-40 h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" 
          />
        </div>
      </FloatingArtifact>

      <FloatingArtifact depth={0.8} delay={0.4} className="bottom-1/4 right-8 md:right-24 lg:block hidden">
        <div className="glass-morphism p-2 rounded-2xl shadow-2xl rotate-[8deg] group hover:rotate-0 transition-transform duration-500">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3 bg-white/60 backdrop-blur-sm border border-black/5 rounded-full" />
          <img 
            src="/assets/real-photos/teen_ai.png" 
            alt="AI Learning" 
            loading="eager"
            className="w-48 h-40 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500" 
          />
        </div>
      </FloatingArtifact>

      <FloatingArtifact depth={1.2} delay={0.6} className="top-10 right-10 hidden xl:block">
        <div className="bg-spot-charcoal text-white p-4 rounded-2xl shadow-2xl rotate-12 flex flex-col items-center gap-2 animate-float-subtle">
           <Rocket className="text-spot-pastel-yellow" size={32} />
           <span className="font-display font-bold text-xs uppercase tracking-widest">Builder Studio</span>
        </div>
      </FloatingArtifact>

      <FloatingArtifact depth={0.4} delay={0.8} className="bottom-20 left-10 hidden xl:block">
        <div className="bg-spot-red text-white p-4 rounded-2xl shadow-2xl -rotate-12 flex flex-col items-center gap-2 animate-float-subtle">
           <Brain className="text-spot-pastel-pink" size={32} />
           <span className="font-display font-bold text-xs uppercase tracking-widest">Cognitive Focus</span>
        </div>
      </FloatingArtifact>

      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <motion.div
           style={{ 
             x: mousePosition.x * 0.5,
             y: mousePosition.y * 0.5,
             rotateX: -mousePosition.y * 0.1,
             rotateY: mousePosition.x * 0.1
           }}
           className="magnetic-content preserve-3d"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-spot-charcoal/5 border border-spot-charcoal/10 font-display font-bold text-xs tracking-[0.2em] uppercase text-spot-charcoal/60 mb-8 backdrop-blur-sm">
              The Personalized Space for Learners to Find Their Spark
            </span>
          </motion.div>

          <h1 className="font-display text-[10vw] md:text-[8vw] lg:text-[7.5vw] font-black tracking-tighter uppercase leading-[0.8] text-spot-charcoal mb-8 relative pointer-events-none drop-shadow-sm text-wrap-balance">
            Where Every <br /> 
            <span className="text-transparent stroke-charcoal" style={{ WebkitTextStroke: '1.5px var(--color-spot-charcoal)' }}>Child learns</span> <br />
            Their <br />
            <span className="relative inline-block text-spot-red">
               Way
              <motion.div 
                className="absolute -bottom-2 -left-2 w-[110%] h-4 bg-spot-pastel-yellow/60 -z-10 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: "circOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
           className="max-w-3xl mx-auto"
        >
          <p className="font-sans text-xl md:text-2xl lg:text-3xl text-spot-charcoal/80 mb-12 leading-tight font-bold tracking-tight text-pretty">
             SPOT is a studio-based microschool where students don't just study the world—they acquire the tools, agency, and cognitive grounding to actually shape it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-30">
            <Link to="/microschool" className="group relative">
              <motion.div whileTap={{ scale: 0.98 }} className="relative">
                <div className="absolute inset-0 bg-spot-red/30 blur-2xl group-hover:bg-spot-red/50 transition-all rounded-full" />
                <div className="relative haptic-feedback px-10 py-5 bg-spot-red rounded-full flex items-center gap-3 text-white font-black text-xl tracking-tight hover:scale-105 transition-all duration-300 shadow-[0_15px_40px_rgba(217,45,32,0.4)] border border-white/10">
                  The Microschool <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
            
            <Link to="/studios" className="group relative">
              <motion.div whileTap={{ scale: 0.98 }} className="relative">
                <div className="relative haptic-feedback px-10 py-5 bg-white border-2 border-spot-charcoal rounded-full flex items-center gap-3 text-spot-charcoal font-black text-xl tracking-tight hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                  The Studios
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Interactive Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-display font-bold text-xs uppercase tracking-widest text-spot-charcoal/30 group-hover:text-spot-red transition-colors">Orbit Down</span>
        <motion.div 
          className="w-[2px] h-12 bg-spot-charcoal/10 relative overflow-hidden rounded-full"
        >
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-spot-red origin-top"
            animate={{ 
              scaleY: [0, 1, 0],
              y: ["-100%", "0%", "100%"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      
      {/* 3D Grid Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--color-spot-charcoal) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
    </section>
  );
};

const WhatIsSpot = () => {
  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 right-10 text-spot-red/10 font-handwriting text-9xl -rotate-12 pointer-events-none">
        curiosity
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Designed for personalized PBL, active learners, and those who outgrow traditional schools.
          </h2>
          <p className="text-xl text-spot-charcoal/80 mb-6 leading-relaxed">
            SPOT is a microschool and studio ecosystem designed for students who find traditional classrooms limiting and seek personalized, project-based growth.
          </p>
          <p className="text-xl text-spot-charcoal/80 leading-relaxed">
            Children learn through <span className="font-bold text-spot-red bg-spot-pastel-yellow/50 px-2 py-1 rounded-md transform -rotate-1 inline-block">project based learning</span>, studio exploration and real world challenges.
          </p>
        </motion.div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-6 hide-scrollbar">
          {[
            { icon: <Rocket size={32} />, title: "Project Based Learning", color: "bg-spot-pastel-blue" },
            { icon: <Users size={32} />, title: "Small Cohorts", color: "bg-spot-pastel-pink" },
            { icon: <Brain size={32} />, title: "Neurodiversity Friendly", color: "bg-spot-pastel-yellow" },
            { icon: <Globe size={32} />, title: "Real World Skills", color: "bg-spot-pastel-green" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`min-w-[85vw] md:min-w-0 snap-center ${item.color} p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 shadow-sm border border-black/5`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-4 bg-white/50 rounded-full text-spot-charcoal">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LearningModel = () => {
  return (
    <section className="py-12 md:py-24 bg-spot-charcoal text-spot-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">The SPOT Learning Model</h2>
          <p className="font-handwriting text-3xl text-spot-pastel-blue">Centered around the whole child</p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[600px] flex items-center justify-center">
          {/* Center Child */}
          <motion.div 
            className="absolute z-20 w-40 h-40 bg-spot-cream rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <span className="font-display font-bold text-2xl text-spot-charcoal">The Child</span>
          </motion.div>

          {/* Orbits */}
          <div className="absolute inset-0 border border-spot-cream/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-12 border border-spot-cream/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          
          {/* Pillars */}
          {[
            { title: "Cognition", icon: <Brain />, pos: "top-10 left-1/2 -translate-x-1/2", color: "text-spot-pastel-blue" },
            { title: "Motivation", icon: <Zap />, pos: "bottom-10 left-1/2 -translate-x-1/2", color: "text-spot-pastel-yellow" },
            { title: "Belonging", icon: <Heart />, pos: "left-10 top-1/2 -translate-y-1/2", color: "text-spot-pastel-pink" },
            { title: "Personalized PBL", icon: <Target />, pos: "right-10 top-1/2 -translate-y-1/2", color: "text-spot-pastel-green" }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              className={`absolute ${pillar.pos} flex flex-col items-center gap-3 z-30`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
            >
              <div className={`p-4 bg-spot-charcoal border-2 border-current rounded-full ${pillar.color}`}>
                {pillar.icon}
              </div>
              <span className="font-display font-bold text-lg whitespace-nowrap">{pillar.title}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            "Body ready → Mind ready learning",
            "Executive function development",
            "Studio based learning",
            "Portfolio based growth"
          ].map((text, i) => (
            <motion.div 
              key={i}
              className="p-6 border border-spot-cream/20 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + (i * 0.1) }}
            >
              <p className="font-sans font-medium">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StudioEcosystem = () => {
  const categories = [
    { name: "Creative Expression", icon: <Palette />, color: "bg-spot-pastel-pink", studios: ["Artlore", "Reading Club", "Teen TEDX"] },
    { name: "Maker & Engineering", icon: <Rocket />, color: "bg-spot-pastel-blue", studios: ["Machine Marvels", "Maker Builder", "3D Print Lab"] },
    { name: "Science & Nature", icon: <Microscope />, color: "bg-spot-pastel-green", studios: ["WildJar", "Micro Worlds", "Astra Stargaze"] },
    { name: "Communication & Body", icon: <MessageCircle />, color: "bg-spot-pastel-yellow", studios: ["Body Dynamics", "AAC Studio", "Spot Sherlock"] },
    { name: "Entrepreneurship", icon: <Briefcase />, color: "bg-spot-cream", studios: ["Inkubator", "Junior MBA", "Baking Studio"] }
  ];

  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-6">
        <div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Studio Ecosystem</h2>
          <p className="text-xl text-spot-charcoal/70 max-w-2xl">A galaxy of specialized studios where children dive deep into their passions alongside expert mentors.</p>
        </div>
        <div className="font-handwriting text-3xl text-spot-red transform rotate-3">
          Pick your planet!
        </div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className={`${cat.color} p-8 rounded-3xl relative overflow-hidden group cursor-pointer border border-black/5`}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
              {React.cloneElement(cat.icon as React.ReactElement, { size: 120 })}
            </div>
            
            <div className="relative z-10">
              <div className="p-3 bg-white/50 rounded-2xl inline-block mb-6">
                {cat.icon}
              </div>
              <h3 className="font-display text-2xl font-bold mb-6">{cat.name}</h3>
              
              <ul className="space-y-3">
                {cat.studios.map((studio, j) => (
                  <li key={j} className="flex items-center gap-2 font-medium bg-white/40 px-4 py-2 rounded-full w-fit">
                    <Star size={14} className="text-spot-charcoal/50" />
                    {studio}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
        
        <motion.div
          className="bg-spot-charcoal text-spot-cream p-8 rounded-3xl flex flex-col justify-center items-center text-center border border-black/5"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className="font-display text-2xl font-bold mb-4">And many more…</h3>
          <Link to="/studios" className="px-6 py-3 bg-spot-red text-white font-bold rounded-full hover:bg-hover transition-colors shadow-lg active:scale-95">
            View All Studios
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const LearningJourney = () => {
  const steps = [
    { title: "Curiosity", icon: <Compass /> },
    { title: "Exploration", icon: <Microscope /> },
    { title: "Skill Building", icon: <Brain /> },
    { title: "Projects", icon: <Palette /> },
    { title: "Internships", icon: <Briefcase /> },
    { title: "Real World Impact", icon: <Globe /> }
  ];

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-16">
        <h2 className="font-display text-4xl md:text-6xl font-bold">The Learning Journey</h2>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-6 right-6 h-1 bg-spot-cream -translate-y-1/2 hidden md:block" />
        
        <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="flex flex-row md:flex-col items-center gap-4 md:w-1/6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-spot-cream border-4 border-white shadow-md flex items-center justify-center text-spot-red z-10">
                {step.icon}
              </div>
              <div className="font-display font-bold text-lg text-center">{step.title}</div>
              {i < steps.length - 1 && (
                <div className="md:hidden w-1 h-8 bg-spot-cream ml-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StudentProjects = () => {
  const projects = [
    { id: '3d-printed-lego', title: "3D Printed Lego Set - Machine Marvels", img: "/assets/real-photos/lego_3d_project.png", rotate: -2 },
    { id: 'nature-lab-terrarium', title: "Building a Terrarium - Nature Lab", img: "/assets/real-photos/terrarium_project.png", rotate: 3 },
    { id: 'ai-story-books', title: "Generating Story Books - AI Studio", img: "/assets/real-photos/storybook_project.png", rotate: -1 },
    { id: 'artlore-costumes', title: "Halloween Costumes - Artlore", img: "/assets/real-photos/costumes_project.png", rotate: 2 },
    { id: 'electric-village', title: "Electric Village - Circuit Design", img: "/assets/real-photos/electric_village_project.png", rotate: -3 },
    { id: 'mechanical-robot-arm', title: "Robotics & Automation - Machine Marvels", img: "/assets/real-photos/mechanical_robot_arm_teen.png", rotate: 1 },
    { id: 'baking-studio', title: "Baking Studio - Design cakes and cookies", img: "/assets/real-photos/teen_baking.png", rotate: -2 },
    { id: 'branding-shop', title: "Digital Branding - Design Concepts", img: "/assets/real-photos/teen_branding.png", rotate: 2 },
  ];

  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-20 left-10 font-handwriting text-4xl text-spot-red transform -rotate-12">Look what we made!</div>
      
      <div className="text-center mb-10 md:mb-20">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Student Projects</h2>
        <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto">Real work by real kids. No worksheets, just creations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 md:gap-16">
        {projects.map((project, i) => (
          <Link key={i} to={`/projects/${project.id}`}>
            <motion.div
              className="polaroid cursor-pointer"
              style={{ '--rotate': project.rotate } as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <div className="aspect-square overflow-hidden bg-gray-200 mb-4">
                <img src={project.img} alt={project.title} loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="polaroid-caption">{project.title}</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const WhoIsSpotFor = () => {
  const learners = [
    "Active learners",
    "Creative thinkers",
    "Independent students",
    "Home Schoolers",
    "2E and Gifted"
  ];

  return (
    <section className="py-12 md:py-24 bg-spot-pastel-yellow px-6 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">Who SPOT is for</h2>
          <div className="flex flex-wrap gap-4">
            {learners.map((learner, i) => (
              <motion.div
                key={i}
                className="bg-white px-6 py-3 rounded-full font-display font-bold text-lg shadow-sm border border-black/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "#D92D20", color: "white" }}
              >
                {learner}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden border-8 border-white shadow-2xl rotate-3">
             <img src="/assets/real-photos/IMG_4201.jpg" alt="Child learning" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-spot-pastel-blue p-6 rounded-3xl shadow-lg transform -rotate-6 border border-black/5">
            <p className="font-handwriting text-3xl">"I love it here!"</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  return (
    <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-center">Our Programs</h2>
      
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-3 gap-8 hide-scrollbar">
        {[
          { title: "Microschool", desc: "Full-time alternative to traditional schooling.", color: "bg-spot-cream", img: "/assets/real-photos/microschool_lego.jpg" },
          { title: "After School Studios", desc: "Deep dives into specific passions and skills.", color: "bg-spot-pastel-pink", img: "/assets/real-photos/studios_cardboard.jpg" },
          { title: "SPOT in School", desc: "Bringing our studio model to traditional schools.", color: "bg-spot-pastel-blue", img: "/assets/real-photos/spiderman_art.jpg" }
        ].map((prog, i) => (
          <Link
            key={i}
            to={prog.title === "SPOT in School" ? "/inschool" : (prog.title === "Microschool" ? "/microschool" : "/studios")}
            className={`min-w-[85vw] md:min-w-0 snap-center ${prog.color} rounded-3xl overflow-hidden shadow-sm border border-black/5 group cursor-pointer flex flex-col`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="h-48 overflow-hidden">
              <img src={prog.img} alt={prog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold mb-3">{prog.title}</h3>
                <p className="text-spot-charcoal/70 mb-6">{prog.desc}</p>
              </div>
              <div className="flex items-center gap-2 font-bold text-spot-red group-hover:translate-x-2 transition-transform">
                Learn more <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const Impact = () => {
  const stats = [
    { num: "1000+", label: "Children Impacted" },
    { num: "50+", label: "After School Learners" },
    { num: "1:3", label: "Teacher–Student Ratio" }
  ];

  return (
    <section className="py-12 md:py-24 bg-spot-charcoal text-spot-cream px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: i * 0.1 }}
          >
            <div className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-spot-pastel-yellow mb-4">{stat.num}</div>
            <div className="font-sans text-lg text-spot-cream/80">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ParentStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = [
    { text: "SPOT completely changed how my son sees learning. He wakes up excited to build and create every single day.", author: "Priya S.", role: "Parent of a 9yo" },
    { text: "The studio model allows my daughter to dive deep into her passions. She's not just memorizing, she's inventing.", author: "Amit K.", role: "Parent of a 12yo" },
    { text: "Finally, a place that respects individual agency and adapts to how children actually learn best.", author: "Kavita B.", role: "Parent of a 7yo" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-24 px-6 max-w-4xl mx-auto text-center">
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16">Parent Stories</h2>
      
      <div className="relative h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <p className="font-display text-2xl md:text-4xl font-medium mb-8 leading-tight">"{stories[currentIndex].text}"</p>
            <div className="font-bold text-lg">{stories[currentIndex].author}</div>
            <div className="text-spot-charcoal/60">{stories[currentIndex].role}</div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {stories.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? 'bg-spot-red' : 'bg-spot-charcoal/20'}`}
          />
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
        <h2 className="font-display text-3xl md:text-4xl lg:text-[5vw] font-black uppercase tracking-tighter mb-10 text-wrap-balance">
          Come experience <span className="text-spot-red">SPOT</span>.
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <div className="font-handwriting text-3xl text-spot-charcoal/70">Book a visit</div>
          <div className="hidden sm:block w-2 h-2 rounded-full bg-spot-red" />
          <div className="font-handwriting text-3xl text-spot-charcoal/70">Join a studio</div>
          <div className="hidden sm:block w-2 h-2 rounded-full bg-spot-red" />
          <div className="font-handwriting text-3xl text-spot-charcoal/70">Explore programs</div>
        </div>
        
        <Link to="/contact">
          <motion.button 
            className="px-10 py-5 bg-spot-charcoal text-spot-cream font-bold rounded-full text-xl hover:bg-spot-red transition-colors shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Visit
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="relative">
      <SEO 
        title="SPOT Microschool | Where Every Child Learns Their Way" 
        description="A specialized, studio-based learning ecosystem where students who outgrow traditional schools explore, build, and discover their spark through personalized PBL."
      />
      <HeroSection />
      <WhatIsSpot />
      <LearningModel />
      <StudioEcosystem />
      <LearningJourney />
      <StudentProjects />
      <WhoIsSpotFor />
      <Programs />
      <Impact />
      <ParentStories />
      <CTA />
    </div>
  );
}

