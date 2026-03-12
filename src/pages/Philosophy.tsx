import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Compass, Lightbulb, Hammer, Quote, Presentation, 
  Brain, Heart, Focus, ListTodo, RefreshCw, 
  Map, Users, ArrowRight, BookOpen, Wrench,
  TreePine, Building2, GraduationCap, Tent
} from 'lucide-react';

export default function Philosophy() {
  const [isPersonalPath, setIsPersonalPath] = useState(true);
  const [activeEcosystemNode, setActiveEcosystemNode] = useState<number | null>(null);

  const strengths = [
    { title: 'Creative Expression', icon: <Lightbulb size={32} />, desc: 'Exploring ideas through art, design, and imaginative problem-solving.' },
    { title: 'Engineering Curiosity', icon: <Hammer size={32} />, desc: 'Taking things apart, understanding systems, and building new solutions.' },
    { title: 'Scientific Exploration', icon: <Compass size={32} />, desc: 'Asking questions, forming hypotheses, and testing the natural world.' },
    { title: 'Storytelling', icon: <Quote size={32} />, desc: 'Communicating ideas powerfully through writing, media, and presentation.' },
    { title: 'Entrepreneurial Thinking', icon: <Presentation size={32} />, desc: 'Identifying needs, creating value, and leading initiatives.' }
  ];

  const executiveFunctions = [
    { title: 'Emotional Regulation', icon: <Heart size={24} />, color: 'bg-spot-pastel-pink', text: 'spot-red' },
    { title: 'Attention & Focus', icon: <Focus size={24} />, color: 'bg-spot-pastel-yellow', text: 'spot-charcoal' },
    { title: 'Planning & Organisation', icon: <ListTodo size={24} />, color: 'bg-spot-pastel-blue', text: 'spot-charcoal' },
    { title: 'Working Memory', icon: <Brain size={24} />, color: 'bg-spot-pastel-green', text: 'spot-charcoal' },
    { title: 'Cognitive Flexibility', icon: <RefreshCw size={24} />, color: 'bg-spot-cream', text: 'spot-charcoal' }
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
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80)' }}>
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Designed for One Child</h2>
            <p className="text-xl text-spot-charcoal/80 leading-relaxed mb-6">
              SPOT begins with the needs, interests and pace of each child. Traditional schooling often assumes every learner should follow the same path at the same time.
            </p>
            <p className="text-xl text-spot-charcoal/80 leading-relaxed mb-8">
              We believe learning is not a standardized assembly line. SPOT designs learning experiences around individual curiosity, strengths, and goals, allowing children to dive deep into what moves them.
            </p>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-full border border-black/10 inline-flex shadow-sm">
              <button 
                onClick={() => setIsPersonalPath(false)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${!isPersonalPath ? 'bg-spot-charcoal text-white' : 'text-spot-charcoal/60 hover:text-spot-charcoal'}`}
              >
                Standard School Path
              </button>
              <button 
                onClick={() => setIsPersonalPath(true)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${isPersonalPath ? 'bg-spot-red text-white' : 'text-spot-charcoal/60 hover:text-spot-charcoal'}`}
              >
                Personal Learning Path
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-black/5 border border-black/5 h-[400px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isPersonalPath ? (
                <motion.div 
                  key="standard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex items-center justify-between relative px-4"
                >
                  <div className="absolute left-4 right-4 h-2 bg-spot-charcoal/20 top-1/2 -translate-y-1/2 rounded-full z-0" />
                  {[1, 2, 3, 4, 5].map((node) => (
                    <div key={node} className="w-12 h-12 rounded-full bg-spot-charcoal text-white flex items-center justify-center font-bold z-10 shadow-md">
                      {node}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full relative"
                >
                  {/* Branching SVG Path */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="none">
                    <motion.path 
                      d="M 25,200 Q 100,200 150,100 T 300,50" 
                      stroke="#FF6321" strokeWidth="4" fill="none" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                    />
                    <motion.path 
                      d="M 25,200 Q 150,200 200,300 T 350,350" 
                      stroke="#3B82F6" strokeWidth="4" fill="none" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
                    />
                    <motion.path 
                      d="M 150,100 Q 250,100 300,200 T 450,200" 
                      stroke="#10B981" strokeWidth="4" fill="none" strokeDasharray="5,5"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.4 }}
                    />
                  </svg>
                  
                  {/* Nodes */}
                  <motion.div className="absolute top-[45%] left-[2%] w-10 h-10 rounded-full bg-spot-charcoal text-white flex items-center justify-center font-bold shadow-md z-10 text-xs sm:text-base sm:w-12 sm:h-12" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0 }}>Start</motion.div>
                  <motion.div className="absolute top-[20%] left-[26%] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-spot-red text-white flex items-center justify-center shadow-md z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}><Lightbulb size={20} /></motion.div>
                  <motion.div className="absolute top-[70%] left-[36%] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-spot-pastel-blue text-spot-charcoal flex items-center justify-center shadow-md z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}><Hammer size={20} /></motion.div>
                  <motion.div className="absolute top-[7.5%] left-[56%] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-spot-pastel-yellow text-spot-charcoal flex items-center justify-center shadow-md z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }}><Compass size={20} /></motion.div>
                  <motion.div className="absolute top-[82.5%] left-[66%] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-spot-pastel-pink text-spot-red flex items-center justify-center shadow-md z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}><Quote size={20} /></motion.div>
                  <motion.div className="absolute top-[45%] left-[86%] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-spot-charcoal text-white flex items-center justify-center font-bold shadow-md z-10 text-xs sm:text-base" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }}>Goal</motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] flex items-center justify-center">
            {/* Center */}
            <div className="absolute z-20 w-32 h-32 bg-spot-charcoal rounded-full flex items-center justify-center text-white font-display font-black text-2xl shadow-2xl shadow-black/20 border-4 border-white">
              Child
            </div>
            
            {/* Orbiting Nodes */}
            {executiveFunctions.map((func, index) => {
              const angle = (index * (360 / executiveFunctions.length)) * (Math.PI / 180);
              const radius = 160; // Distance from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  className={`absolute z-10 w-32 h-32 ${func.color} rounded-full flex flex-col items-center justify-center text-center p-4 shadow-lg border-2 border-white`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <div className={`text-${func.text} mb-2`}>{func.icon}</div>
                  <span className={`text-xs font-bold text-${func.text} leading-tight`}>{func.title}</span>
                </motion.div>
              );
            })}
            
            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <circle cx="50%" cy="50%" r="160" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Body Ready → Mind Ready</h2>
            <p className="text-xl text-spot-charcoal/80 leading-relaxed mb-6">
              Learning becomes easier when children are regulated and supported. We prioritize the development of executive function skills as the foundation for all academic and creative pursuits.
            </p>
            <p className="text-xl text-spot-charcoal/80 leading-relaxed">
              Before a child can tackle complex math or deep project work, they need the tools to manage their emotions, sustain focus, and flexibly adapt to challenges. Our environment is designed to explicitly teach and practice these core cognitive skills.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Place Based Education */}
      <section className="py-24 px-6 bg-spot-pastel-blue/20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Learning Through Place</h2>
          <p className="text-xl text-spot-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            SPOT connects learning to the local environment and community. The world outside our doors is the richest classroom available.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative h-[400px] md:h-[500px] bg-white rounded-[3rem] shadow-xl border border-black/5 overflow-hidden">
          {/* Stylized Map Background */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          {/* Map Nodes */}
          <motion.div className="absolute top-1/4 left-1/4 group" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="w-16 h-16 bg-spot-pastel-green rounded-full flex items-center justify-center text-spot-charcoal shadow-lg cursor-pointer hover:scale-110 transition-transform relative z-10">
              <TreePine size={28} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-bold text-sm">
              Nature Exploration
            </div>
          </motion.div>

          <motion.div className="absolute top-1/3 right-1/4 group" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="w-16 h-16 bg-spot-pastel-pink rounded-full flex items-center justify-center text-spot-red shadow-lg cursor-pointer hover:scale-110 transition-transform relative z-10">
              <Building2 size={28} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-bold text-sm">
              City Learning Experiences
            </div>
          </motion.div>

          <motion.div className="absolute bottom-1/4 left-1/3 group" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <div className="w-16 h-16 bg-spot-pastel-yellow rounded-full flex items-center justify-center text-spot-charcoal shadow-lg cursor-pointer hover:scale-110 transition-transform relative z-10">
              <Users size={28} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-bold text-sm">
              Community Mentors
            </div>
          </motion.div>

          <motion.div className="absolute bottom-1/3 right-1/3 group" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            <div className="w-16 h-16 bg-spot-red rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform relative z-10">
              <Map size={28} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-bold text-sm">
              Local Field Visits
            </div>
          </motion.div>

          {/* Central SPOT Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-spot-charcoal rounded-full flex items-center justify-center text-white font-display font-black text-xl shadow-2xl z-0">
            SPOT
          </div>

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="75%" y1="33%" x2="50%" y2="50%" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="33%" y1="75%" x2="50%" y2="50%" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="66%" y1="66%" x2="50%" y2="50%" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
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

      {/* Section 8: Community and Parent Participation */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Learning as a Community</h2>
            <p className="text-xl text-spot-charcoal/80 leading-relaxed mb-6">
              SPOT is not just a school; it's a learning community. We believe education is a collaborative effort involving parents, professionals, and the broader community.
            </p>
            <ul className="space-y-4">
              {[
                'Parent workshops and learning sessions',
                'Guest mentors sharing industry expertise',
                'Community events and showcases',
                'Collaborative projects with local organizations'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-lg font-medium text-spot-charcoal/80">
                  <div className="w-2 h-2 rounded-full bg-spot-red shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[400px] bg-spot-pastel-pink/20 rounded-[3rem] flex items-center justify-center overflow-hidden border border-spot-pastel-pink/50">
            {/* Network Diagram */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-lg z-10 border-2 border-spot-pastel-pink">
              <Users size={24} className="text-spot-red mb-1" />
              <span className="text-xs font-bold text-spot-charcoal">Parents</span>
            </div>
            
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-lg z-10 border-2 border-spot-pastel-blue">
              <GraduationCap size={24} className="text-spot-charcoal mb-1" />
              <span className="text-xs font-bold text-spot-charcoal">Mentors</span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-spot-charcoal rounded-full flex flex-col items-center justify-center shadow-xl z-20 text-white">
              <span className="font-display font-black text-xl">Learners</span>
            </div>

            <svg className="absolute inset-0 w-full h-full z-0">
              <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#FF6321" strokeWidth="3" strokeDasharray="6,6" className="opacity-50" />
              <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="3" strokeDasharray="6,6" className="opacity-50" />
              <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="rgba(0,0,0,0.1)" strokeWidth="2" className="opacity-50" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 9: The SPOT Learning Ecosystem */}
      <section className="py-24 px-6 bg-spot-cream overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Learning Extends Beyond the Classroom</h2>
          <p className="text-xl text-spot-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            SPOT is a hub connecting children to many forms of learning. Hover over the areas below to explore our ecosystem.
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
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80'
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
          <button className="px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10">
            Book an Open House
          </button>
        </div>
      </section>

    </main>
  );
}
