import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Lightbulb, Compass, Hammer, Rocket, Users, Target, Briefcase, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-spot-charcoal flex items-center justify-center pt-20 pb-32 text-spot-cream">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1585468273280-7c6536979201?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
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
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-7xl lg:text-[80px] font-black tracking-tighter uppercase leading-[0.9] mb-6">
            SPOT STUDIOS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spot-pastel-yellow via-spot-pastel-pink to-spot-pastel-blue">
              Where Curiosity Turns Into Creation.
            </span>
          </h1>
          <p className="font-sans text-xl md:text-2xl mb-10 text-spot-cream/80 font-medium max-w-xl">
            After-school studios where children explore art, science, engineering, storytelling and entrepreneurship through projects and real-world challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#explore" className="px-8 py-4 bg-spot-red text-white font-bold rounded-full text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-spot-red/20 hover:scale-105 active:scale-95">
              Explore Studios <ArrowRight size={20} />
            </a>
            <a href="#enroll" className="px-8 py-4 bg-transparent border-2 border-spot-cream text-spot-cream font-bold rounded-full text-lg hover:bg-spot-cream hover:text-spot-charcoal transition-colors flex items-center justify-center shadow-xl hover:scale-105 active:scale-95">
              Join a Studio
            </a>
          </div>
        </motion.div>

        <div className="relative h-[600px] hidden lg:block">
          <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-spot-charcoal z-20">
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop" alt="Building robots" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-20 left-0 w-72 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-spot-charcoal z-30">
            <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop" alt="Painting" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-spot-pastel-yellow rounded-full mix-blend-multiply filter blur-xl opacity-50 z-10 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

const WhatAreStudios = () => {
  const features = [
    { title: "Project Based Learning", icon: <Hammer size={24} />, color: "bg-spot-pastel-pink" },
    { title: "Small Cohorts", icon: <Users size={24} />, color: "bg-spot-pastel-blue" },
    { title: "Hands-on Exploration", icon: <Compass size={24} />, color: "bg-spot-pastel-yellow" },
    { title: "Real World Skills", icon: <Briefcase size={24} />, color: "bg-spot-pastel-green" }
  ];

  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Learning Beyond <br/><span className="text-spot-red">The Classroom</span></h2>
          <p className="font-handwriting text-3xl text-spot-charcoal/60 mb-8 transform -rotate-2">Not your typical after-school program</p>
          
          <div className="space-y-6 text-lg text-spot-charcoal/80 mb-12">
            <p>
              SPOT Studios are small cohort learning spaces where children explore ideas through projects and experimentation.
            </p>
            <p>
              Instead of memorizing concepts, children build, design, experiment and create.
            </p>
            <p>
              Each studio focuses on a specific domain such as engineering, storytelling, science or entrepreneurship.
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

const WhyStudioLearning = () => {
  const points = [
    "Children learn best when they build and experiment",
    "Studios allow deeper exploration of interests",
    "Learning happens through projects, not lectures",
    "Students collaborate and present their work"
  ];

  return (
    <section className="py-16 md:py-32 bg-spot-cream px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Why Studios Work</h2>
          <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto">The philosophy behind our hands-on, project-based approach.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-6">
            {points.map((point, i) => (
              <motion.div 
                key={i}
                className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-black/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-spot-red flex items-center justify-center shrink-0 mt-1">
                  <Star size={14} className="text-white" fill="currentColor" />
                </div>
                <p className="text-lg font-bold text-spot-charcoal">{point}</p>
              </motion.div>
            ))}
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=800&auto=format&fit=crop" alt="Students collaborating" className="rounded-3xl shadow-2xl transform rotate-2" />
            <div className="absolute -bottom-10 -left-10 bg-spot-pastel-yellow p-6 rounded-3xl shadow-xl transform -rotate-6 border border-black/5">
              <p className="font-handwriting text-2xl text-spot-charcoal">"I made this!"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExploreStudios = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Creative Arts', 'Engineering & Making', 'Science & Nature', 'Communication & Storytelling', 'Entrepreneurship'];

  const studios = [
    { 
      name: "Artlore", 
      desc: "Creative art and design studio where children explore different art mediums and build creative thinking.", 
      age: "6-10 yrs", 
      category: "Creative Arts",
      color: "bg-spot-pastel-pink",
      img: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "Machine Marvels", 
      desc: "Engineering and robotics studio where children learn how machines work by building and experimenting.", 
      age: "8-14 yrs", 
      category: "Engineering & Making",
      color: "bg-spot-pastel-blue",
      img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "WildJar", 
      desc: "Science exploration studio where children explore biology, chemistry and fermentation experiments.", 
      age: "7-12 yrs", 
      category: "Science & Nature",
      color: "bg-spot-pastel-green",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "Inkubator", 
      desc: "Storytelling and publishing studio where learners develop ideas through writing, podcasting and media creation.", 
      age: "9-14 yrs", 
      category: "Communication & Storytelling",
      color: "bg-spot-cream",
      img: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "Body Dynamics", 
      desc: "Movement based studio that helps children regulate energy and explore dance and music.", 
      age: "6-10 yrs", 
      category: "Creative Arts",
      color: "bg-spot-pastel-yellow",
      img: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "Astra Stargaze", 
      desc: "Space exploration studio where children learn astronomy and explore the universe.", 
      age: "8-12 yrs", 
      category: "Science & Nature",
      color: "bg-spot-charcoal",
      textColor: "text-white",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "Spot Sherlock", 
      desc: "Forensic and detective studio that develops critical thinking and investigation skills.", 
      age: "9-14 yrs", 
      category: "Science & Nature",
      color: "bg-spot-red",
      textColor: "text-white",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
    },
    { 
      name: "Junior MBA", 
      desc: "Entrepreneurship studio where students learn branding, pitching and startup creation.", 
      age: "10-14 yrs", 
      category: "Entrepreneurship",
      color: "bg-spot-pastel-blue",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const filteredStudios = filter === 'All' ? studios : studios.filter(s => s.category === filter);

  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto" id="explore">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Find the Right Studio</h2>
        <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto mb-10">Discover programs tailored to your child's interests and age group.</p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-16">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                filter === cat 
                  ? 'bg-spot-charcoal text-white shadow-lg scale-105' 
                  : 'bg-white border border-black/10 text-spot-charcoal/70 hover:border-spot-charcoal hover:text-spot-charcoal'
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
              key={studio.name}
              className={`group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-black/5 flex flex-col h-full ${studio.color} ${studio.textColor || 'text-spot-charcoal'}`}
            >
              <div className="h-48 overflow-hidden relative">
                <img src={studio.img} alt={studio.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-spot-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {studio.age}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">{studio.category}</div>
                <h3 className="font-display text-3xl font-black mb-4 leading-none">{studio.name}</h3>
                <p className="font-medium opacity-90 mb-8 flex-grow">{studio.desc}</p>
                <div className="flex gap-3 mt-auto">
                  <button className={`flex-1 py-3 rounded-full font-bold text-sm transition-colors ${studio.textColor === 'text-white' ? 'bg-white text-spot-charcoal hover:bg-spot-cream' : 'bg-spot-charcoal text-white hover:bg-black'}`}>
                    Enroll
                  </button>
                  <button className={`px-4 py-3 rounded-full font-bold text-sm border-2 transition-colors ${studio.textColor === 'text-white' ? 'border-white/30 hover:border-white' : 'border-black/10 hover:border-black/30'}`}>
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const FeaturedProjects = () => {
  const projects = [
    { id: "mechanical-robot-arm", title: "Mechanical Robot Arm", studio: "Machine Marvels", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" },
    { id: "comic-book-series", title: "Design a Comic Book Series", studio: "Artlore", img: "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=800&auto=format&fit=crop" },
    { id: "fermentation-science", title: "Fermentation Science Experiment", studio: "WildJar", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section className="py-16 md:py-32 bg-spot-charcoal text-spot-cream px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">Featured Projects</h2>
            <p className="text-xl text-spot-cream/70 max-w-xl">See what our students have been building, creating, and launching inside the studios.</p>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 hide-scrollbar mb-12">
          {projects.map((project, i) => (
            <Link to={`/projects/${project.id}`} key={i} className="block group relative overflow-hidden rounded-3xl aspect-square md:aspect-auto md:h-[400px]">
              <motion.div 
                className="w-full h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-spot-pastel-yellow font-bold text-sm uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.studio}</div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">{project.title}</h3>
                  <div className="w-12 h-12 rounded-full bg-white text-spot-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 hover:bg-spot-red hover:text-white">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/projects" className="px-8 py-4 bg-spot-cream text-spot-charcoal font-bold rounded-full text-lg hover:bg-white transition-colors flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95">
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Small Cohorts", desc: "Groups of 8-10 students for personalized attention.", icon: <Users /> },
    { title: "Weekly Sessions", desc: "90-minute studio blocks once or twice a week.", icon: <Target /> },
    { title: "Hands-on Projects", desc: "Learning through building, not just listening.", icon: <Hammer /> },
    { title: "Mentor Guidance", desc: "Led by industry experts and passionate educators.", icon: <Sparkles /> },
    { title: "Showcase", desc: "End-of-term presentations to parents and peers.", icon: <Star /> }
  ];

  return (
    <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-20">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">How Studios Work</h2>
        <p className="font-handwriting text-3xl text-spot-red transform -rotate-2">The structure behind the magic</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-spot-charcoal/10 border-t-2 border-dashed border-spot-charcoal/20" />
        
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            className="relative flex flex-col items-center text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-24 h-24 rounded-full bg-white border-4 border-spot-charcoal flex items-center justify-center text-spot-red mb-6 shadow-xl transform hover:scale-110 transition-transform">
              {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
            </div>
            <h3 className="font-display font-bold text-xl mb-3">{step.title}</h3>
            <p className="text-spot-charcoal/70">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};



const EnrollmentForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="enroll" className="py-16 md:py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
      <div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Join a <span className="text-spot-red">Studio</span></h2>
        <p className="text-xl text-spot-charcoal/80 mb-10">
          Ready to let your child explore, build and create? Fill out the form below to start the enrollment process or schedule a visit.
        </p>
        
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-spot-pastel-pink flex items-center justify-center shrink-0 font-bold text-xl">1</div>
            <div>
              <h4 className="font-bold text-xl mb-2">Submit Interest</h4>
              <p className="text-spot-charcoal/70">Fill out the form with your child's details and interested studio.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-spot-pastel-blue flex items-center justify-center shrink-0 font-bold text-xl">2</div>
            <div>
              <h4 className="font-bold text-xl mb-2">Studio Tour</h4>
              <p className="text-spot-charcoal/70">We'll invite you for a tour to see the space and meet the mentors.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-spot-pastel-yellow flex items-center justify-center shrink-0 font-bold text-xl">3</div>
            <div>
              <h4 className="font-bold text-xl mb-2">Enrollment</h4>
              <p className="text-spot-charcoal/70">Secure your spot in the upcoming cohort.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-black/5 relative">
        <div className="absolute -top-6 -right-6 text-spot-red font-handwriting text-4xl transform rotate-12">Let's go!</div>
        
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
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Child's Name</label>
                  <input type="text" required className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Age</label>
                  <input type="text" required className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Interested Studio</label>
                <select required className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red transition-colors appearance-none">
                  <option value="">Select a studio...</option>
                  <option>Artlore</option>
                  <option>Machine Marvels</option>
                  <option>WildJar</option>
                  <option>Inkubator</option>
                  <option>Body Dynamics</option>
                  <option>Astra Stargaze</option>
                  <option>Spot Sherlock</option>
                  <option>Junior MBA</option>
                </select>
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Parent Email</label>
                  <input type="email" required className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-spot-charcoal/60">Phone</label>
                  <input type="tel" required className="w-full p-4 rounded-xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red transition-colors" />
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-spot-charcoal text-white font-bold rounded-xl text-lg hover:bg-spot-red transition-colors mt-4 shadow-lg">
                Submit Application
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
                <Star size={40} fill="currentColor" />
              </div>
              <h3 className="font-display text-3xl font-bold mb-4">Application Received!</h3>
              <p className="text-xl text-spot-charcoal/70 mb-8">
                Thank you for your interest in SPOT Studios. We'll review your application and get back to you within 48 hours to schedule a tour.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-spot-charcoal text-white font-bold rounded-full hover:bg-black transition-colors"
              >
                Submit Another Application
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { text: "My daughter used to hate science. After joining WildJar, she's constantly setting up experiments in our kitchen. The hands-on approach changed everything.", author: "Sarah M.", role: "Parent of 9yo" },
    { text: "The Junior MBA studio gave my son so much confidence. He actually pitched a real business idea to us last week. Incredible program.", author: "David T.", role: "Parent of 12yo" },
    { text: "SPOT Studios isn't just tuition, it's an innovation lab for kids. The mentors really care about fostering creativity.", author: "Elena R.", role: "Parent of 8yo" }
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 md:py-32 bg-spot-pastel-blue px-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-spot-charcoal/10 font-display text-[200px] leading-none font-black">"</div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-handwriting text-4xl text-spot-red mb-12 transform -rotate-2">What parents say</h2>
        
        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-display text-2xl md:text-4xl font-medium mb-8 leading-tight">"{testimonials[current].text}"</p>
              <div className="font-bold text-xl">{testimonials[current].author}</div>
              <div className="text-spot-charcoal/60">{testimonials[current].role}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-spot-charcoal hover:text-white transition-colors shadow-md"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={() => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-spot-charcoal hover:text-white transition-colors shadow-md"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};



export default function Studios() {
  return (
    <div className="relative bg-spot-cream">
      <HeroSection />
      <ExploreStudios />
      <WhatAreStudios />
      <WhyStudioLearning />
      <FeaturedProjects />
      <HowItWorks />
      <Testimonials />
      <EnrollmentForm />
    </div>
  );
}
