import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Compass, Lightbulb, Hammer, Quote, Presentation, 
  Brain, Heart, Map, Users, BookOpen, Wrench,
  TreePine, Building2, Tent, ArrowDown, Activity
} from 'lucide-react';

export default function Philosophy() {
  const [activeEcosystemNode, setActiveEcosystemNode] = useState<number | null>(null);

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
    <main className="pt-20 pb-20 overflow-hidden">
      {/* Section 1: Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-spot-cream/90 via-spot-cream/80 to-spot-cream" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display font-black text-6xl md:text-8xl text-spot-charcoal tracking-tighter mb-6 leading-none">
              The SPOT <br/><span className="text-spot-red">Education Philosophy</span>
            </h1>
            <p className="text-xl md:text-3xl text-spot-charcoal/80 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              Learning designed around curiosity, strengths and real-world exploration.
            </p>
            <Link to="/studios" className="inline-block px-10 py-5 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-xl shadow-xl shadow-spot-red/20">
              Explore SPOT Studios
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Designed for One Child */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Designed for One Child</h2>
          <p className="text-xl text-spot-charcoal/80 leading-relaxed">
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
          <div className="relative p-8 rounded-[3rem] bg-spot-pastel-yellow/20 border-2 border-spot-pastel-yellow text-center shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-spot-pastel-yellow rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-spot-pastel-pink rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />
            
            <h3 className="font-display font-bold text-2xl text-spot-charcoal mb-8 uppercase tracking-widest text-sm relative z-10">The SPOT Model</h3>
            
            <div className="flex flex-col items-center relative z-10">
              {/* Wavy connecting line */}
              <svg className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-24 h-full z-0" preserveAspectRatio="none">
                <path d="M48,0 C48,50 10,50 10,100 C10,150 86,150 86,200 C86,250 48,250 48,300" fill="none" stroke="#FF6321" strokeWidth="4" strokeDasharray="8,8" className="opacity-30" />
              </svg>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative z-10 bg-white border-2 border-spot-charcoal/10 w-full max-w-[240px] py-4 rounded-2xl mb-8 text-spot-charcoal font-bold shadow-md flex items-center justify-center gap-3"
              >
                <Lightbulb size={20} className="text-spot-red" />
                Child's Interests
              </motion.div>
              
              <div className="relative z-10 flex gap-4 mb-8 w-full justify-center">
                <motion.div whileHover={{ y: -5 }} className="bg-spot-pastel-blue border-2 border-spot-charcoal/10 px-6 py-4 rounded-2xl text-spot-charcoal font-bold shadow-md flex flex-col items-center gap-2">
                  <Hammer size={20} />
                  Projects
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-spot-pastel-pink border-2 border-spot-charcoal/10 px-6 py-4 rounded-2xl text-spot-charcoal font-bold shadow-md flex flex-col items-center gap-2">
                  <Users size={20} />
                  Mentors
                </motion.div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative z-10 bg-spot-red text-white w-full max-w-[240px] py-4 rounded-2xl text-lg font-bold shadow-lg flex items-center justify-center gap-3"
              >
                <Compass size={20} />
                Personal Mastery
              </motion.div>
            </div>
          </div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {strengths.map((strength, index) => (
              <div key={index} className="group perspective-1000 h-64">
                <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-spot-red mb-4 bg-white/10 p-4 rounded-full">
                      {strength.icon}
                    </div>
                    <h3 className="font-bold text-lg">{strength.title}</h3>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-spot-red rounded-3xl p-6 flex items-center justify-center text-center">
                    <p className="text-white font-medium leading-relaxed">{strength.desc}</p>
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

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
            
            {/* Text Steps */}
            <div className="flex-1 space-y-6 max-w-lg w-full">
              {[
                {
                  step: "1",
                  title: "Physical Regulation",
                  desc: "Movement and sensory input to ground the body and release excess energy.",
                  icon: <Activity size={24} />,
                  color: "bg-spot-pastel-blue",
                  iconColor: "text-spot-charcoal"
                },
                {
                  step: "2",
                  title: "Emotional Readiness",
                  desc: "Feeling safe, connected, and emotionally balanced to take on challenges.",
                  icon: <Heart size={24} />,
                  color: "bg-spot-pastel-pink",
                  iconColor: "text-spot-red"
                },
                {
                  step: "3",
                  title: "Cognitive Focus",
                  desc: "With body and emotions regulated, the brain is ready to engage, problem-solve, and learn deeply.",
                  icon: <Brain size={24} />,
                  color: "bg-spot-pastel-yellow",
                  iconColor: "text-spot-charcoal"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-3xl shadow-md border border-black/5 relative overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.3, duration: 0.6 }}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${item.color}`} />
                  <div className="flex items-center gap-4 mb-3 pl-4">
                    <div className={`w-12 h-12 rounded-full ${item.color}/20 flex items-center justify-center ${item.iconColor}`}>
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-xl">{item.step}. {item.title}</h4>
                  </div>
                  <p className="text-spot-charcoal/70 pl-4">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Child Figure Animation */}
            <div className="flex-1 flex justify-center items-center w-full">
              <div className="relative w-64 h-96">
                {/* Base Outline */}
                <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-xl absolute inset-0">
                  <g fill="#E5E7EB">
                    {/* Head */}
                    <circle cx="100" cy="70" r="35" />
                    {/* Body */}
                    <rect x="65" y="110" width="70" height="100" rx="20" />
                    {/* Arms */}
                    <rect x="35" y="120" width="24" height="80" rx="12" transform="rotate(15 47 120)" />
                    <rect x="141" y="120" width="24" height="80" rx="12" transform="rotate(-15 153 120)" />
                    {/* Legs */}
                    <rect x="70" y="190" width="24" height="100" rx="12" />
                    <rect x="106" y="190" width="24" height="100" rx="12" />
                  </g>
                </svg>

                {/* 1. Body Fill (Limbs & Torso) */}
                <motion.svg 
                  viewBox="0 0 200 400" 
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <g fill="#BFDBFE">
                    {/* Body */}
                    <rect x="65" y="110" width="70" height="100" rx="20" />
                    {/* Arms */}
                    <rect x="35" y="120" width="24" height="80" rx="12" transform="rotate(15 47 120)" />
                    <rect x="141" y="120" width="24" height="80" rx="12" transform="rotate(-15 153 120)" />
                    {/* Legs */}
                    <rect x="70" y="190" width="24" height="100" rx="12" />
                    <rect x="106" y="190" width="24" height="100" rx="12" />
                  </g>
                </motion.svg>

                {/* 2. Heart Fill */}
                <motion.div 
                  className="absolute top-[130px] left-1/2 -translate-x-1/2 text-spot-red drop-shadow-lg z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
                >
                  <Heart size={48} fill="currentColor" />
                </motion.div>

                {/* 3. Brain Fill (Head) */}
                <motion.svg 
                  viewBox="0 0 200 400" 
                  className="absolute inset-0 w-full h-full z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <circle cx="100" cy="70" r="35" fill="#FEF08A" />
                </motion.svg>
                <motion.div 
                  className="absolute top-[46px] left-1/2 -translate-x-1/2 text-spot-charcoal drop-shadow-sm z-20"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 1.3, duration: 0.6, type: "spring" }}
                >
                  <Brain size={48} />
                </motion.div>
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
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 ${isActive ? 'bg-spot-charcoal text-white scale-110' : 'bg-white text-spot-charcoal hover:scale-105'}`}>
                  {node.icon}
                </div>
                
                {/* Tooltip/Description */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white p-4 rounded-2xl shadow-xl border border-black/5 z-40 text-center pointer-events-none"
                    >
                      <h4 className="font-bold text-spot-charcoal mb-1">{node.title}</h4>
                      <p className="text-xs text-spot-charcoal/70">{node.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
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

      {/* Section 10: Gallery */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8">
          {[
            'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1627556592933-ffe99c1c9dd8?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?auto=format&fit=crop&q=80'
          ].map((img, index) => (
            <div key={index} className="snap-center shrink-0 w-[85vw] md:w-[400px] h-[300px] rounded-3xl overflow-hidden shadow-lg">
              <img src={img} alt="Learning at SPOT" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
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
