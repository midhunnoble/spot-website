import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Target, Users, Globe, Briefcase, BookOpen, Heart, Zap, Sparkles, Building2, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-spot-charcoal text-spot-cream pt-24 pb-32">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-spot-red/20 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-spot-pastel-blue/10 rounded-full blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-5 py-2 glass-morphism border border-spot-red/30 text-spot-pastel-pink rounded-full font-black tracking-widest uppercase text-xs mb-8">
            Our Social Mission
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.82] mb-8">
            SPOT <span className="text-spot-red">inSchool</span>
          </h1>
          <p className="font-sans text-2xl md:text-4xl mb-12 text-spot-cream/90 font-bold max-w-4xl mx-auto leading-none tracking-tight">
            Building future-ready skills where it matters most.
          </p>
          <p className="font-sans text-xl md:text-2xl text-spot-cream/70 max-w-2xl mx-auto mb-12">
            SPOT partners with low-income private schools and government schools to bring hands-on, real-world learning into classrooms.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/contact" className="px-10 py-5 bg-spot-red text-white font-black uppercase tracking-widest rounded-2xl text-sm hover:scale-105 transition-all shadow-2xl active:scale-95 haptic-feedback">
                Partner With Us
             </Link>
             <Link to="/contact" className="px-10 py-5 bg-white text-spot-charcoal font-black uppercase tracking-widest rounded-2xl text-sm hover:scale-105 transition-all shadow-2xl active:scale-95 haptic-feedback">
                Support The Mission
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BeyondTextbooks = () => {
  return (
    <section className="py-24 bg-spot-cream px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              We move beyond <br/><span className="text-spot-red">textbooks.</span>
            </h2>
            <p className="text-2xl text-spot-charcoal/80 mb-8 leading-tight font-medium">
              Helping children build, create, solve, and experience the world early. Most children never get access to opportunity, exposure, or real-world learning. 
            </p>
            <div className="p-8 bg-spot-charcoal text-white rounded-[2rem] shadow-xl">
               <p className="font-handwriting text-3xl mb-4 text-spot-pastel-yellow">"SPOT bridges that gap."</p>
               <div className="w-16 h-1 bg-spot-red rounded-full" />
            </div>
          </motion.div>
          
          <div className="relative">
             <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src="/assets/real-photos/spiderman_art.jpg" alt="Child building" className="w-full h-full object-cover" />
             </div>
             <motion.div 
               className="absolute -bottom-10 -right-10 w-48 h-48 bg-spot-pastel-pink rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center text-center rotate-12"
               animate={{ rotate: [12, 8, 12] }}
               transition={{ duration: 4, repeat: Infinity }}
             >
                <Zap className="text-spot-red mb-2" size={40} />
                <span className="font-display font-black uppercase text-xs tracking-widest leading-none">Real World Learning</span>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Explore",
      icon: <Sparkles className="text-spot-pastel-pink" size={48} />,
      desc: "Children discover new domains through experiential workshops and studio-based learning —from design and science to entrepreneurship and storytelling.",
      color: "bg-spot-pastel-pink/10"
    },
    {
      title: "Expose",
      icon: <Globe className="text-spot-pastel-blue" size={48} />,
      desc: "We introduce them to real-world environments and professionals through field visits, industry interactions, and mentorship.",
      color: "bg-spot-pastel-blue/10"
    },
    {
      title: "Embark",
      icon: <Target className="text-spot-pastel-green" size={48} />,
      desc: "Students take on live projects and internships, applying what they learn to solve real problems.",
      color: "bg-spot-pastel-green/10"
    }
  ];

  return (
    <section className="py-24 bg-white px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">How SPOT Works</h2>
          <div className="w-24 h-2 bg-spot-charcoal mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`${step.color} p-12 rounded-[3rem] border border-black/5 flex flex-col items-center text-center group hover:scale-105 transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-8 p-6 bg-white rounded-full shadow-lg group-hover:rotate-12 transition-transform">
                {step.icon}
              </div>
              <h3 className="font-display text-3xl font-black mb-6 uppercase tracking-tighter">{step.title}</h3>
              <p className="text-lg text-spot-charcoal/70 leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactStats = () => {
  const stats = [
    { num: "500+", label: "Children Impacted", icon: <Users /> },
    { num: "20+", label: "Internships Facilitated", icon: <Briefcase /> },
    { num: "15+", label: "School Partnerships", icon: <Building2 /> }
  ];

  return (
    <section className="py-24 bg-spot-red text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center">Impact So Far</h2>
        
        <div className="grid md:grid-cols-3 gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <div className="font-display text-7xl font-black mb-2 text-spot-pastel-yellow">{stat.num}</div>
              <p className="font-sans text-xl font-bold uppercase tracking-widest opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center p-8 border-2 border-white/20 rounded-[2.5rem] bg-white/5 backdrop-blur-sm">
           <p className="text-xl font-medium">Partnerships across government & affordable private schools.</p>
        </div>
      </div>
    </section>
  );
};

const StudentProjects = () => {
  const projects = [
    { title: "Local Shop Branding", desc: "Rebuilt branding and identity for a local community shop.", tag: "Design" },
    { title: "Marketing Campaigns", desc: "Created campaigns for a Just Books store to drive engagement.", tag: "Business" },
    { title: "Ultraviolette Concepts", desc: "Worked on branding design concepts for the electric motorcycle brand.", tag: "Branding" },
    { title: "Math via Hula Hoop", desc: "Learned complex math concepts through physical hula hoop movement.", tag: "Education" },
    { title: "Sustainable Packaging", desc: "Designed eco-friendly paper packaging solutions for local vendors.", tag: "Impact" }
  ];

  return (
    <section className="py-24 bg-spot-cream px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">What Children Work On</h2>
          <p className="font-handwriting text-3xl text-spot-red">Real work. Real outcomes. Real confidence.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-black/5 hover:shadow-2xl transition-all group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform">
                <Briefcase size={80} />
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-spot-red mb-4 bg-spot-red/10 w-fit px-3 py-1 rounded-full">{project.tag}</div>
              <h3 className="font-display text-2xl font-black mb-4 uppercase tracking-tighter leading-none">{project.title}</h3>
              <p className="text-spot-charcoal/70 font-medium leading-relaxed">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyItMatters = () => {
  const benefits = [
    "Build confidence and communication",
    "Develop problem-solving and creativity",
    "Understand how the real world works",
    "See what they can become"
  ];

  return (
    <section className="py-24 bg-spot-charcoal text-white px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
           <img src="/assets/real-photos/workshop_collaboration.png" alt="Children working" className="rounded-[3rem] shadow-2xl rotate-[-3deg]" />
           <div className="absolute -top-10 -left-10 bg-spot-red p-8 rounded-full shadow-2xl animate-pulse">
              <Heart size={40} />
           </div>
        </div>
        
        <div>
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.85]">Why It <br/><span className="text-spot-pastel-blue">Matters.</span></h2>
          <p className="text-2xl font-medium mb-12 text-white/80 leading-snug">
            Most children never get access to opportunity, exposure, or real-world learning. SPOT bridges that gap.
          </p>
          
          <div className="space-y-6">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="p-2 bg-spot-pastel-green text-spot-charcoal rounded-lg">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-xl font-bold tracking-tight">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-5xl font-black uppercase tracking-tighter mb-12">Our Partners</h2>
        <div className="flex flex-col items-center gap-12">
           <div className="p-12 glass-morphism rounded-[3rem] border-4 border-spot-cream group hover:scale-105 transition-all duration-500 max-w-sm">
              <img src="/assets/logos/the_circle_india.png" alt="The Circle India" className="w-full h-auto" />
              <p className="mt-6 font-display font-black uppercase text-xs tracking-widest text-spot-charcoal/40">Proudly Backed By</p>
           </div>
           
           <div className="max-w-2xl">
              <h3 className="font-display text-3xl font-black mb-6 uppercase tracking-tight leading-none">Bring SPOT to your school.</h3>
              <p className="text-xl text-spot-charcoal/70 font-medium mb-10">
                Enable your students to learn beyond the classroom and prepare for a future that values skills over marks.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link to="/contact" className="px-10 py-5 bg-spot-charcoal text-spot-cream font-black uppercase tracking-widest rounded-2xl text-sm hover:bg-spot-red transition-all shadow-2xl active:scale-95 haptic-feedback">
                    Partner With us
                 </Link>
                 <Link to="/contact" className="px-10 py-5 bg-transparent border-4 border-spot-charcoal text-spot-charcoal font-black uppercase tracking-widest rounded-2xl text-sm hover:bg-spot-charcoal hover:text-white transition-all active:scale-95 haptic-feedback">
                    Support us
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default function InSchool() {
  return (
    <div className="relative bg-spot-cream overflow-x-hidden">
      <HeroSection />
      <BeyondTextbooks />
      <HowItWorks />
      <ImpactStats />
      <StudentProjects />
      <WhyItMatters />
      <Partners />
    </div>
  );
}
