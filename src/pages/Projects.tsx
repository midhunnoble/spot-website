import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { ArrowRight, Lightbulb, Compass, Hammer, Presentation, PlayCircle, Star, Quote, LayoutGrid, Award } from 'lucide-react';

export const PROJECTS_DATA = [
  {
    id: '3d-printed-lego',
    title: '3D Printed Lego Set',
    student_name: 'Aarav & Maker Studio',
    category: 'Engineering & Maker',
    age_group: 'Ages 10-14',
    description: 'Engineering custom-fit compatible blocks from scratch using 3D modeling and precision printing.',
    image_url: '/assets/real-photos/lego_3d_project.png',
    featured: true,
    learning_objective: "To understand topological constraints in additive manufacturing and achieve 0.1mm tolerance for interlocking mechanics.",
    what_children_did: "Learned CAD modeling in Fusion 360, calibrated resin printers for shrinkage compensation, and stress-tested various filament types.",
    what_they_learned: "Tolerances, material science, and the iterative nature of engineering prototypes.",
    skills_acquired: ["CAD Design", "3D Printing", "Precision Measurement", "Iterative Prototyping"],
    concepts_explored: ["Topology", "Material Stress", "Polymer Chemistry"],
    reflection: "At first the blocks didn't fit, but after 4 tries, the 'click' sound was the best thing I ever heard.",
    process_photos: [
      { url: "/assets/real-photos/lego_3d_project.png", caption: "Initial CAD Sketch" }
    ]
  },
  {
    id: 'nature-lab-terrarium',
    title: 'Self-Sustaining Terrarium',
    student_name: 'WildJar Eco Explorers',
    category: 'Science & Nature',
    age_group: 'Ages 8-12',
    description: 'Building a self-sustaining ecosystem in a jar, exploring the balance of biology and environmental science.',
    image_url: '/assets/real-photos/terrarium_project.png',
    featured: true,
    learning_objective: "To observe the water cycle and nitrogen cycle in a sealed environment over a 30-day period.",
    what_children_did: "Identified local flora, calculated soil drainage ratios, and documented moisture levels using sensors.",
    what_they_learned: "Ecosystem balance, microbial life, and the impact of light variance on plant respiration.",
    skills_acquired: ["Biological Observation", "Data Logging", "Environmental Analysis"],
    concepts_explored: ["Photosynthesis", "Evapotranspiration", "The Nitrogen Cycle"],
    reflection: "I didn't know a jar could have its own rain!",
    process_photos: [
       { url: "/assets/real-photos/terrarium_project.png", caption: "Layering the foundations" }
    ]
  },
  {
    id: 'ai-story-books',
    title: 'AI-Generated Story Books',
    student_name: 'Inkubator Media Group',
    category: 'Storytelling & Media',
    age_group: 'Ages 9-15',
    description: 'Leveraging AI tools to draft, illustrate, and publish original digital narratives and adventure books.',
    image_url: '/assets/real-photos/storybook_project.png',
    featured: true,
    learning_objective: "To explore Large Language Models and Diffusion models as co-creative agents in narrative structure.",
    what_children_did: "Iterative prompt engineering, character consistency training, and multi-modal publishing.",
    what_they_learned: "Prompt logic, visual semiotics, and the ethical considerations of AI in art.",
    skills_acquired: ["Prompt Engineering", "Digital Storytelling", "Visual Literacy", "AI Ethics"],
    concepts_explored: ["Generative Transformers", "Neural Art", "Narrative Archetypes"],
    reflection: "The AI is like a really fast illustrator who sometimes forgets how many fingers people have.",
    process_photos: [
       { url: "/assets/real-photos/storybook_project.png", caption: "Prompting the first chapter" }
    ]
  },
  {
    id: 'artlore-costumes',
    title: 'Wearable Art: Costumes',
    student_name: 'Artlore Creative Cohort',
    category: 'Art & Creative',
    age_group: 'Ages 7-12',
    description: 'Bringing imagination to life with wearable art, combining costume design with creative storytelling.',
    image_url: '/assets/real-photos/costumes_project.png',
    featured: false,
    learning_objective: "To translate character archetypes into physical artifacts using textile engineering.",
    what_children_did: "Sketching concept art, pattern making, and assembling multi-material wearables.",
    what_they_learned: "Textile properties, color theory, and spatial reasoning in 3D construction.",
    skills_acquired: ["Costume Design", "Structural Analysis", "Fiber Arts"],
    concepts_explored: ["Character Design", "Material Physics", "Aesthetics"],
    reflection: "I turned my drawing into something I can actually wear!",
    process_photos: [
       { url: "/assets/real-photos/costumes_project.png", caption: "From sketch to fabric" }
    ]
  },
  {
    id: 'electric-village',
    title: 'Electric Village',
    student_name: 'Machine Marvels Engineers',
    category: 'Engineering & Maker',
    age_group: 'Ages 11-16',
    description: 'Designing and soldering complex circuits to power a miniature, interactive community model.',
    image_url: '/assets/real-photos/electric_village_project.png',
    featured: false,
    learning_objective: "To master parallel and series circuitry and calculate load requirements for distributed power.",
    what_children_did: "Soldered over 50 connection points, integrated solar relays, and mapped a logic-based grid.",
    what_they_learned: "Ohm's Law, logic gates, and renewable energy distribution.",
    skills_acquired: ["Soldering", "Circuit Analysis", "Urban Planning", "Logic Design"],
    concepts_explored: ["Voltage Regulation", "Current", "Logic Systems"],
    reflection: "Soldering is scary at first, then it becomes like drawing with hot silver.",
    process_photos: [
       { url: "/assets/real-photos/electric_village_project.png", caption: "Testing the solar relays" }
    ]
  },
  {
    id: 'mechanical-robot-arm',
    title: 'Robotics & Automation',
    student_name: 'Aarav & Tech Team',
    category: 'Engineering & Maker',
    age_group: 'Ages 10-12',
    description: 'A fully functional mechanical arm built using hydraulic systems and programmed automation.',
    image_url: '/assets/real-photos/mechanical_robot_arm_teen.png',
    featured: false,
    learning_objective: "To understand Pascal's Principle and the integration of mechanical leverage with sensor feedback.",
    what_children_did: "Assembled hydraulic actuators, programmed servo degrees of freedom, and designed a custom claw.",
    what_they_learned: "Fluid dynamics, torque, and closed-loop control systems.",
    skills_acquired: ["Hydraulics", "C++ Programming", "Mechanical Assembly", "Automation"],
    concepts_explored: ["Fluid Pressure", "Kinematics", "Torque"],
    reflection: "The arm can pick up a grape without squashing it. That's precision.",
    process_photos: [
       { url: "/assets/real-photos/mechanical_robot_arm_teen.png", caption: "Calibrating the claw pressure" }
    ]
  },
  {
    id: 'branding-shop',
    title: 'Digital Branding Lab',
    student_name: 'Entrepreneurship Lab',
    category: 'Entrepreneurship',
    age_group: 'Ages 13-16',
    description: 'A complete branding package including logo design and marketing strategy for local startups.',
    image_url: '/assets/real-photos/teen_branding.png',
    featured: false,
    learning_objective: "To create a cohesive visual identity system based on user-centered design principles.",
    what_children_did: "Conducted market research, built brand style guides, and pitched to real business owners.",
    what_they_learned: "Typography, branding psychology, and the 'Value Proposition' model.",
    skills_acquired: ["Graphic Design", "Market Research", "Public Speaking", "Strategy"],
    concepts_explored: ["Brand Equity", "Visual Hierarchy", "User Experience"],
    reflection: "Designing a logo is 10% drawing and 90% thinking about who will use it.",
    process_photos: [
       { url: "/assets/real-photos/teen_branding.png", caption: "Sketching the brand architecture" }
    ]
  },
  {
    id: 'baking-studio',
    title: 'Baking & Culinary Physics',
    student_name: 'Culinary Arts Group',
    category: 'Art & Creative',
    age_group: 'Ages 10-15',
    description: 'Learning the science of baking and the art of decorating custom cakes and cookies.',
    image_url: '/assets/real-photos/teen_baking.png',
    featured: false,
    learning_objective: "To explore the chemical reactions of leavening agents and the physics of heat transfer.",
    what_children_did: "Experimented with pH levels in dough, designed 3-tier structures, and mastered piping techniques.",
    what_they_learned: "Maillard reaction, gluten development, and aesthetics in plating.",
    skills_acquired: ["Culinary Science", "Food Styling", "Precision Baking", "Chemistry"],
    concepts_explored: ["Acid-Base Reactions", "Thermal Conductivity", "Gluten Structure"],
    reflection: "Baking is just chemistry that you can eat.",
    process_photos: [
       { url: "/assets/real-photos/teen_baking.png", caption: "The perfect sourdough rise" }
    ]
  }
];

const SKILLS = [
  { title: 'Creative Thinking', icon: <Lightbulb size={32} /> },
  { title: 'Engineering & Design', icon: <Hammer size={32} /> },
  { title: 'Scientific Curiosity', icon: <Compass size={32} /> },
  { title: 'Storytelling', icon: <Quote size={32} /> },
  { title: 'Collaboration', icon: <Star size={32} /> },
  { title: 'Entrepreneurship', icon: <Presentation size={32} /> }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All Projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['All Projects', 'Art & Design', 'Engineering', 'Science', 'Media', 'Entrepreneurship'];

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Use database data if available, otherwise fallback to local data for demo/stability
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(PROJECTS_DATA);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(PROJECTS_DATA);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => 
    activeTab === 'All Projects' || project.category === activeTab
  );

  return (
    <main className="pt-20 pb-20 bg-spot-cream min-h-screen">
      <SEO 
        title="Artifacts of Growth | Student Projects" 
        description="A gallery of self-directed projects built by SPOT students. From 3D printed sets to eco-terrariums."
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 z-0 text-spot-charcoal/5">
           <LayoutGrid size={800} strokeWidth={0.5} className="absolute -top-40 -left-40 rotate-12 opacity-10" />
           <Award size={600} strokeWidth={0.5} className="absolute -bottom-20 -right-20 -rotate-12 opacity-10" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-spot-pastel-pink text-spot-red font-black text-[10px] tracking-[0.3em] uppercase mb-8 border border-spot-red/10">
              Student Portfolio
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-spot-charcoal tracking-tighter mb-8 leading-[0.85] uppercase">
              Artifacts of <br/><span className="text-spot-red italic">Growth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-spot-charcoal/60 mb-12 max-w-2xl mx-auto font-medium leading-tight">
              Evidence of agency, craft, and cognitive depth—built in the studios of SPOT.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/studios" className="w-full sm:w-auto px-12 py-6 bg-spot-red text-white font-black uppercase tracking-widest rounded-3xl hover:bg-black transition-all text-sm shadow-2xl active:scale-95 haptic-feedback">
                Explore Studios
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-12 py-6 bg-white text-spot-charcoal font-black uppercase tracking-widest rounded-3xl hover:bg-spot-pastel-yellow transition-all text-sm border-2 border-black/5 active:scale-95">
                Join our Collective
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-spot-charcoal text-white shadow-xl scale-105' 
                  : 'bg-white text-spot-charcoal/30 hover:border-spot-charcoal hover:text-spot-charcoal border-2 border-black/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-[3rem] p-8 space-y-6 border border-black/5">
                <div className="h-64 bg-slate-100 rounded-[2.5rem] animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-1/4 bg-slate-50 rounded-full" />
                  <div className="h-10 w-3/4 bg-slate-100 rounded-xl" />
                  <div className="h-20 w-full bg-slate-50 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[3rem] overflow-hidden border border-black/5 hover:border-black/10 hover:shadow-2xl transition-all duration-500 flex flex-col h-full haptic-feedback"
              >
                <Link to={`/projects/${project.slug || project.id}`} className="absolute inset-0 z-20" />
                <div className="h-72 overflow-hidden relative">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-spot-charcoal shadow-lg border border-black/5">
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className="absolute top-6 right-6 w-10 h-10 bg-spot-pastel-yellow text-spot-charcoal rounded-full flex items-center justify-center shadow-lg border border-white/50">
                       <Star size={16} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-red">{project.student_name}</span>
                    <div className="h-px bg-black/5 flex-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">{project.age_group}</span>
                  </div>
                  <h3 className="font-display text-3xl font-black mb-6 uppercase tracking-tighter leading-[0.9] group-hover:text-spot-red transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-spot-charcoal/50 text-sm font-medium leading-relaxed italic line-clamp-3 mb-8">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-8 border-t border-black/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-spot-charcoal/20 group-hover:text-spot-red transition-colors">
                    View Achievement <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Student Project Stories */}
      <section className="py-24 px-6 bg-spot-charcoal text-spot-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display font-black text-4xl md:text-5xl mb-4 text-spot-pastel-yellow">Featured Stories</h2>
              <p className="text-xl text-spot-cream/70 max-w-xl">Deep dives into the journeys behind some of our most inspiring student creations.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-spot-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-spot-red/20 text-spot-pastel-pink font-bold text-xs tracking-wider uppercase mb-6">
                  Machine Marvels Studio
                </span>
                <h3 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                  Building a Working Robotic Arm at Age 10
                </h3>
                <p className="text-spot-cream/80 mb-8 text-lg leading-relaxed">
                  Aarav started with a simple question: "How do diggers move dirt?" This led to a 6-week exploration of hydraulics, mechanical advantage, and prototyping with cardboard and syringes.
                </p>
                <Link to="/projects/mechanical-robot-arm" className="inline-flex items-center gap-2 font-bold text-spot-pastel-yellow hover:text-white transition-colors">
                  Read the full story <ArrowRight size={20} />
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80" alt="Prototyping" className="rounded-2xl h-48 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" alt="Final Robot" className="rounded-2xl h-48 w-full object-cover" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-spot-pastel-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-spot-pastel-blue/20 text-spot-pastel-blue font-bold text-xs tracking-wider uppercase mb-6">
                  Art & Creative Studio
                </span>
                <h3 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                  Designing a Comic Book with Artlore
                </h3>
                <p className="text-spot-cream/80 mb-8 text-lg leading-relaxed">
                  Maya combined her love for drawing and storytelling to produce a 12-page comic book. She learned character design, panel layout, and how to script engaging narratives.
                </p>
                <Link to="/projects/comic-book-series" className="inline-flex items-center gap-2 font-bold text-spot-pastel-blue hover:text-white transition-colors">
                  Read the full story <ArrowRight size={20} />
                </Link>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?auto=format&fit=crop&q=80" alt="Drawing" className="rounded-2xl h-48 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80" alt="Comic Book" className="rounded-2xl h-48 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs at SPOT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Where Projects Emerge</h2>
          <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto">
            Our project-based approach is integrated across all our programs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Microschool', link: '/microschool', color: 'bg-spot-pastel-pink' },
            { title: 'After School Studios', link: '/studios', color: 'bg-spot-pastel-yellow' },
            { title: 'Summer Camps', link: '/events', color: 'bg-spot-pastel-blue' },
            { title: 'School Partnerships', link: '/events', color: 'bg-spot-pastel-green' }
          ].map((program, index) => (
            <Link 
              key={index} 
              to={program.link}
              className={`${program.color} p-8 rounded-3xl text-center hover:scale-105 transition-transform duration-300 shadow-sm`}
            >
              <h3 className="font-display font-black text-2xl text-spot-charcoal">{program.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery of Making */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="font-display font-black text-4xl text-spot-charcoal mb-10">The Gallery of Making</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80" alt="Making" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" alt="Making" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80" alt="Making" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80" alt="Making" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?auto=format&fit=crop&q=80" alt="Making" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Skills Children Develop */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Skills for the Future</h2>
          <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto">
            Projects aren't just about the final product; they're about the competencies developed along the way.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {SKILLS.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm text-center flex flex-col items-center hover:-translate-y-1 transition-transform"
            >
              <div className="text-spot-red mb-4">{skill.icon}</div>
              <h3 className="font-bold text-lg text-spot-charcoal">{skill.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Student Voices */}
      <section className="py-24 px-6 bg-spot-pastel-yellow/30">
        <div className="max-w-4xl mx-auto text-center">
          <Quote size={48} className="text-spot-red mx-auto mb-8 opacity-50" />
          <h2 className="font-display font-black text-3xl md:text-5xl text-spot-charcoal mb-8 leading-tight">
            "I didn’t know science could be this fun until we built our own experiment. We failed three times before it worked, but that made it even better."
          </h2>
          <p className="font-bold text-lg text-spot-charcoal">— Maya, Age 11</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal mb-8 tracking-tighter">
          Let Your Child <br/><span className="text-spot-red">Build Something Amazing</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/studios" className="px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20">
            Explore Studios
          </Link>
          <Link to="/contact" className="px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10">
            Book an Open House
          </Link>
        </div>
      </section>

    </main>
  );
}
