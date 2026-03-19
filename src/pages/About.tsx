import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, animate } from 'motion/react';
import { ArrowRight, Brain, Compass, Users, Hammer, Sparkles, Heart, Target, Leaf, BookOpen, Globe, ArrowUpRight, X, CheckCircle2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Simple Counter Component for Impact Section
const Counter = ({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-spot-cream text-spot-charcoal pt-24 pb-32 antigravity-perspective">
      {/* SEO Keywords hidden */}
      <div className="hidden">
        <h1>microschool in Bangalore</h1>
        <h2>alternative education programs</h2>
        <h3>project based learning schools</h3>
        <h4>personalized learning spaces</h4>
        <h5>creative learning environments for teens</h5>
      </div>

      {/* Floating Collage Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden antigravity-perspective">
        <motion.div 
          style={{ y: y1 }} 
          className="absolute top-32 left-10 md:left-20 w-48 md:w-64 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-spot-charcoal transform -rotate-6 z-0"
          whileHover={{ rotate: 0, scale: 1.1, z: 50 }}
        >
          <img src="/assets/real-photos/IMG_3506.jpg" alt="SPOT Learning" className="w-full h-full object-cover transition-all duration-700" />
        </motion.div>
        <motion.div 
          style={{ y: y2 }} 
          className="absolute bottom-20 right-10 md:right-20 w-56 md:w-72 aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-spot-charcoal transform rotate-3 z-0"
          whileHover={{ rotate: 0, scale: 1.1, z: 80 }}
        >
          <img src="/assets/real-photos/IMG_4201.jpg" alt="Creative Studio" className="w-full h-full object-cover transition-all duration-700" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute top-1/3 right-1/4 w-32 aspect-square rounded-full overflow-hidden shadow-xl border-4 border-spot-pastel-pink z-0 hidden lg:block">
          <img src="/assets/real-photos/IMG_3145.jpg" alt="Spot Activity" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block px-5 py-2 glass-morphism border border-spot-red/20 text-spot-red rounded-full font-black tracking-widest uppercase text-xs mb-8 shadow-xl">
            Our Story
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.82] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              Reimagining
            </motion.span> <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block text-spot-red"
            >
              How Children Learn.
            </motion.span>
          </h1>
          <p className="font-sans text-xl md:text-2xl mb-12 text-spot-charcoal/80 font-medium max-w-3xl mx-auto leading-tight">
            SPOT is a microschool and studio ecosystem where curiosity, creativity and real world learning come together.
          </p>
          <Link to="/studios" className="inline-flex items-center gap-4 px-10 py-5 bg-spot-charcoal text-spot-cream font-black uppercase tracking-widest rounded-2xl text-sm hover:bg-spot-red transition-all shadow-2xl hover:scale-105 active:scale-95 haptic-feedback">
            Explore Our Studios <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const SpotStory = () => {
  const milestones = [
    { phase: "Idea Phase", year: "2021", desc: "An experiment in learning begins, questioning why traditional schooling fails curious and creative learners." },
    { phase: "First Studios", year: "2022", desc: "Small after-school maker spaces open, focusing on project-based learning and creative exploration." },
    { phase: "Microschool Launch", year: "2023", desc: "SPOT officially launches as a full-time alternative education program in Bangalore." },
    { phase: "Community Growth", year: "2024", desc: "Expanding to include personalized learning environments and a broader network of mentors." }
  ];

  return (
    <section className="py-16 md:py-32 bg-spot-charcoal text-spot-cream px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6">How SPOT Began</h2>
          <p className="text-xl md:text-2xl text-spot-cream/80 font-medium leading-relaxed">
            SPOT started as an experiment in learning and evolved into a microschool and studio ecosystem. We emerged from the belief that traditional schooling often fails curious and creative learners.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-spot-cream/10 md:-translate-x-1/2 rounded-full" />

          <div className="space-y-16">
            {milestones.map((item, i) => (
              <motion.div 
                key={i}
                className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-9 h-9 bg-spot-red border-4 border-spot-charcoal rounded-full flex items-center justify-center md:-translate-x-1/2 z-10 shadow-lg" />

                {/* Content Box */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                  <div className="text-spot-pastel-yellow font-handwriting text-2xl mb-2">{item.year}</div>
                  <h3 className="font-display text-3xl font-bold mb-3">{item.phase}</h3>
                  <p className="text-spot-cream/70 text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TraditionalVsSpot = () => {
  return (
    <section className="py-16 md:py-32 px-6 bg-spot-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">School Was Built for a <br/><span className="text-spot-red">Different Era.</span></h2>
          <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto">
            The industrial model of education prioritizes compliance over creativity. We are changing the paradigm.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 gap-8 lg:gap-8 md:gap-16 hide-scrollbar">
          {/* Traditional School */}
          <motion.div 
            className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-black/5 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-bl-full -z-0" />
            <h3 className="font-display text-3xl font-bold mb-8 text-spot-charcoal/50 line-through decoration-spot-red decoration-4">Traditional School</h3>
            <ul className="space-y-6 relative z-10">
              {[
                "Memorization over exploration",
                "Standardized learning paths",
                "Lack of real world experiences",
                "Limited room for creativity",
                "Age-based rigid cohorts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg text-spot-charcoal/60">
                  <X className="text-spot-red shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SPOT Learning */}
          <motion.div 
            className="min-w-[85vw] md:min-w-0 snap-center bg-spot-charcoal text-spot-cream p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-white/5 relative overflow-hidden transform md:-translate-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -15, scale: 1.02 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-spot-pastel-pink/20 rounded-bl-full filter blur-[100px] -z-0" />
            <h3 className="font-display text-4xl font-black mb-10 text-spot-pastel-yellow uppercase tracking-tighter leading-none">SPOT Learning</h3>
            <ul className="space-y-8 relative z-10">
              {[
                "Project-based exploration",
                "Individualized learning pathways",
                "Real-world studio challenges",
                "Creative freedom and ownership",
                "Stage-based collaborative cohorts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-xl font-bold tracking-tight">
                  <div className="p-1 bg-spot-pastel-green rounded-lg text-spot-charcoal shadow-lg">
                    <CheckCircle2 size={24} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const pillars = [
    { title: "Executive Function", desc: "Developing self-regulation, planning, and focus.", icon: <Brain size={32} />, color: "bg-spot-pastel-pink" },
    { title: "Studio Based", desc: "Learning in immersive, domain-specific environments.", icon: <Hammer size={32} />, color: "bg-spot-pastel-yellow" },
    { title: "Project Based", desc: "Tackling real-world challenges to build practical skills.", icon: <Target size={32} />, color: "bg-spot-pastel-blue" },
    { title: "Belonging", desc: "Fostering an inclusive community for divergent minds.", icon: <Heart size={32} />, color: "bg-spot-red", textColor: "text-white" },
    { title: "Individual Pathways", desc: "Honoring each child's unique pace and interests.", icon: <Compass size={32} />, color: "bg-spot-pastel-green" }
  ];

  return (
    <section className="py-16 md:py-32 px-6 bg-spot-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">How Learning Works</h2>
          <p className="font-handwriting text-3xl text-spot-charcoal/60 transform -rotate-2">The SPOT Philosophy</p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 hide-scrollbar">
          {pillars.map((pillar, i) => {
            const isSpecial = pillar.title === "Belonging";
            return (
              <motion.div 
                key={i}
                className={`min-w-[85vw] md:min-w-0 snap-center ${isSpecial ? 'bg-spot-red ring-8 ring-spot-red/20' : `glass-morphism ${pillar.color}`} ${pillar.textColor || 'text-spot-charcoal'} p-10 rounded-[3rem] shadow-xl border ${isSpecial ? 'border-white/40' : 'border-white/40'} flex flex-col items-start gap-8 hover:scale-110 transition-all duration-500 hover:shadow-2xl ${i === 3 ? 'md:col-span-2 lg:col-span-1' : ''} ${i === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`p-5 rounded-2xl shadow-xl ${isSpecial ? 'bg-white text-spot-red' : 'bg-white/70 text-spot-charcoal'}`}>
                  {React.cloneElement(pillar.icon as React.ReactElement, { size: 36 })}
                </div>
                <div>
                  <h3 className="font-display text-4xl font-black mb-4 uppercase tracking-tighter leading-[0.85]">{pillar.title}</h3>
                  <p className={`text-xl font-medium leading-tight ${isSpecial ? 'text-white' : 'text-spot-charcoal/70'}`}>{pillar.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Culture = () => {
  const values = [
    { title: "Child First Decisions", desc: "Every choice centers on the learner." },
    { title: "Data Before Drama", desc: "We observe, iterate, and adapt without ego." },
    { title: "Psychological Safety", desc: "A space to take risks and fail safely." },
    { title: "Ownership & Responsibility", desc: "Empowering students to own their space." },
    { title: "Reflection & Growth", desc: "Continuous evolution for students and staff." }
  ];

  return (
    <section className="py-16 md:py-32 bg-spot-pastel-blue/30 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
        <div className="lg:w-1/3">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">The Culture We Build <br/><span className="text-spot-red">Together</span></h2>
          <p className="text-xl text-spot-charcoal/70 mb-8">
            Our culture is the invisible curriculum. It shapes how we interact, learn, and grow as a community.
          </p>
          <div className="w-24 h-2 bg-spot-charcoal rounded-full" />
        </div>

        <div className="lg:w-2/3 flex overflow-x-auto snap-x snap-mandatory pb-8 sm:grid sm:grid-cols-2 gap-6 hide-scrollbar">
          {values.map((val, i) => (
            <motion.div 
              key={i}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-display text-xl font-bold mb-2 text-spot-charcoal">{val.title}</h3>
              <p className="text-spot-charcoal/70">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    { name: "Midhun Noble", role: "Founder", quote: "Education should be an adventure, not a chore.", bg: "Founder of SPOT. Passionate about reimagining education for divergent minds.", img: "/assets/team/midhun.jpg" },
    { name: "Pooja Yatisha", role: "SPOT Guide", quote: "Learning happens through connection.", bg: "Guiding learners through their project journeys with empathy.", img: "/assets/team/pooja.png" },
    { name: "Arvin Yasir", role: "Partnerships and Marketing", quote: "Building a community of innovators.", bg: "Connecting SPOT with parents and partners who think differently.", img: "/assets/team/arvin.jpg" },
    { name: "Lakshmi Sridhar", role: "SPOT Mentor", quote: "Mentorship is about lighting the path, not leading it.", bg: "Supporting students as they explore their passions and build real-world skills.", img: "/assets/team/lakshmi.png" },
    { name: "Shaima N", role: "Academic Coordinator", quote: "Supporting children where they are.", bg: "Ensures the smooth operation of our microschool and studio ecosystem.", img: "/assets/team/shaima.png" },
    { name: "Dr Bindiya Shajith", role: "Program Architect", quote: "Designing protocols for personalized growth.", bg: "Architecting our neuro-affirmative and stage-based cohorts.", img: "/assets/real-photos/dr_bindiya.png" }
  ];

  return (
    <section className="py-16 md:py-32 px-6 bg-spot-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Meet the People <br/>Behind SPOT</h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              className="min-w-[85vw] md:min-w-0 snap-center group relative rounded-[2rem] overflow-hidden aspect-[3/4] shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-spot-charcoal via-spot-charcoal/40 to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-spot-pastel-yellow font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <p className="font-handwriting text-xl text-white/90 mb-3">"{member.quote}"</p>
                    <p className="text-sm text-white/70 leading-relaxed">{member.bg}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Collaborators = () => {
  return (
    <section className="py-12 md:py-24 bg-spot-charcoal text-spot-cream px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6">Community & <br/><span className="text-spot-pastel-pink">Collaborators</span></h2>
          <p className="text-xl text-spot-cream/80 mb-8">
            Learning doesn't happen in a vacuum. SPOT works with local artists, scientists, engineers, educators, and entrepreneurs to bring real-world expertise into the studios.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Artists', 'Scientists', 'Engineers', 'Entrepreneurs', 'Designers'].map(tag => (
              <span key={tag} className="px-4 py-2 border border-spot-cream/20 rounded-full text-sm font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="/assets/real-photos/mentor_teen_collab.png" alt="Engineering Mentor Collab" className="rounded-3xl w-full h-64 object-cover" />
          <img src="/assets/real-photos/workshop_collaboration.png" alt="Workshop Hands-on Collaboration" className="rounded-3xl w-full h-64 object-cover transform translate-y-8" />
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  return (
    <section className="py-16 md:py-32 px-6 bg-spot-red text-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-10 md:mb-20">Our Impact</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-center">
            <div className="font-display text-6xl md:text-7xl font-black mb-2 text-spot-pastel-yellow">
              <Counter from={0} to={120} suffix="+" />
            </div>
            <p className="font-bold uppercase tracking-wider text-sm opacity-90">Students in Microschool</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-display text-6xl md:text-7xl font-black mb-2 text-spot-pastel-pink">
              <Counter from={0} to={500} suffix="+" />
            </div>
            <p className="font-bold uppercase tracking-wider text-sm opacity-90">Studio Participants</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-display text-6xl md:text-7xl font-black mb-2 text-spot-pastel-blue">
              <Counter from={0} to={15} />
            </div>
            <p className="font-bold uppercase tracking-wider text-sm opacity-90">School Partnerships</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-display text-6xl md:text-7xl font-black mb-2 text-spot-pastel-green">
              <Counter from={0} to={50} suffix="+" />
            </div>
            <p className="font-bold uppercase tracking-wider text-sm opacity-90">Community Events</p>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20">
          <p className="font-handwriting text-3xl mb-4">"SPOT didn't just teach my son how to code, it taught him how to believe in his own ideas."</p>
          <p className="font-bold uppercase tracking-wider text-sm opacity-80">— Parent of a 10-year-old</p>
        </div>
      </div>
    </section>
  );
};

const FutureVision = () => {
  return (
    <section className="py-16 md:py-32 px-6 bg-spot-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 relative">
          <div className="absolute inset-0 bg-spot-pastel-green/20 rounded-full filter blur-3xl -z-10" />
          <img src="/assets/real-photos/future_internships.png" alt="Student Internships" className="rounded-[2rem] w-full aspect-square object-cover" />
          <img src="/assets/real-photos/future_research.png" alt="Research Driven Learning" className="rounded-[2rem] w-full aspect-square object-cover transform translate-y-8" />
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">Where SPOT <br/><span className="text-spot-pastel-green">Is Going</span></h2>
          <p className="text-xl text-spot-charcoal/70 mb-10">
            We are constantly evolving. Our vision for the future includes expanding our ecosystem to create even more immersive learning environments.
          </p>
          
          <ul className="space-y-6">
            {[
              { title: "Student Internships", desc: "Connecting older students with real-world industry mentors.", icon: <Briefcase /> },
              { title: "Research Driven Models", desc: "Publishing our findings to help transform traditional education globally.", icon: <BookOpen /> }
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-spot-charcoal text-white flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                  <p className="text-spot-charcoal/70">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "/assets/real-photos/IMG_2377.jpg",
    "/assets/real-photos/IMG_2379.jpg",
    "/assets/real-photos/IMG_3116.jpg",
    "/assets/real-photos/IMG_4420.jpg",
    "/assets/real-photos/IMG_4569.jpg",
    "/assets/real-photos/IMG_1531.jpg",
    "/assets/real-photos/IMG_3269.jpg",
    "/assets/real-photos/IMG_3506.jpg",
    "/assets/real-photos/IMG_4201.jpg",
    "/assets/real-photos/IMG_9194.jpg",
    "/assets/real-photos/clay_figures_1.jpg",
    "/assets/real-photos/clay_figures_2.jpg",
    "/assets/real-photos/spiderman_art.jpg",
    "/assets/real-photos/reading_together.jpg",
    "/assets/real-photos/scrabble_learning.jpg"
  ];

  return (
    <section className="py-12 md:py-24 bg-spot-charcoal px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-12 text-center text-spot-cream">Life at SPOT</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div 
              key={i} 
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img src={img} alt="Life at SPOT" className="w-full h-auto object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JoinJourney = () => {
  return (
    <section className="py-20 md:py-40 px-6 text-center relative overflow-hidden bg-spot-cream text-spot-charcoal">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl lg:text-7xl lg:text-[80px] font-black uppercase tracking-tighter mb-10 leading-[0.9]">
          Join the <br/>
          <span className="text-spot-red">Journey.</span>
        </h2>
        
        <p className="font-sans text-xl md:text-2xl mb-12 text-spot-charcoal/70 font-medium max-w-2xl mx-auto">
          SPOT is not just a school, but a learning ecosystem designed for the future. Come build it with us.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/studios" className="px-8 py-4 bg-spot-charcoal text-spot-cream font-bold rounded-full text-lg hover:bg-black transition-colors shadow-xl hover:scale-105 active:scale-95">
            Explore Studios
          </Link>
          <Link to="/contact" className="px-8 py-4 bg-spot-red text-white font-bold rounded-full text-lg hover:bg-red-700 transition-colors shadow-xl shadow-spot-red/20 hover:scale-105 active:scale-95">
            Book an Open House
          </Link>
          <Link to="/careers" className="px-8 py-4 bg-transparent border-2 border-spot-charcoal text-spot-charcoal font-bold rounded-full text-lg hover:bg-spot-charcoal hover:text-spot-cream transition-colors shadow-xl hover:scale-105 active:scale-95">
            Join the Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <div className="relative bg-spot-cream">
      <SEO 
        title="Our Story | POT Microschool" 
        description="Founded on the doctrine of connection before correction. Learn about the humans and the philosophy behind SPOT Microschool."
      />
      <HeroSection />
      <TraditionalVsSpot />
      <Philosophy />
      <Culture />
      <Team />
      <Collaborators />
      <FutureVision />
      <Gallery />
      <JoinJourney />
    </div>
  );
}
