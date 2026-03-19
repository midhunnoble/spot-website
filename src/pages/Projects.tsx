import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, Lightbulb, Compass, Hammer, Presentation, PlayCircle, Star, Quote } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: '3d-printed-lego',
    title: '3D Printed Lego Set',
    student: 'Aarav & Maker Studio',
    category: 'Engineering & Maker',
    ageGroup: 'Ages 10-14',
    description: 'Engineering custom-fit compatible blocks from scratch using 3D modeling and precision printing.',
    image: '/assets/real-photos/lego_3d_project.png',
    featured: true,
  },
  {
    id: 'nature-lab-terrarium',
    title: 'Building a Terrarium - Nature Lab',
    student: 'WildJar Eco Explorers',
    category: 'Science & Nature',
    ageGroup: 'Ages 8-12',
    description: 'Building a self-sustaining ecosystem in a jar, exploring the balance of biology and environmental science.',
    image: '/assets/real-photos/terrarium_project.png',
    featured: true,
  },
  {
    id: 'ai-story-books',
    title: 'Generating Story Books - AI Studio',
    student: 'Inkubator Media Group',
    category: 'Storytelling & Media',
    ageGroup: 'Ages 9-15',
    description: 'Leveraging AI tools to draft, illustrate, and publish original digital narratives and adventure books.',
    image: '/assets/real-photos/storybook_project.png',
    featured: true,
  },
  {
    id: 'artlore-costumes',
    title: 'Halloween Costumes with Artlore',
    student: 'Artlore Creative Cohort',
    category: 'Art & Creative',
    ageGroup: 'Ages 7-12',
    description: 'Bringing imagination to life with wearable art, combining costume design with creative storytelling.',
    image: '/assets/real-photos/costumes_project.png',
    featured: false,
  },
  {
    id: 'electric-village',
    title: 'Electric Village - Circuit Design',
    student: 'Machine Marvels Engineers',
    category: 'Engineering & Maker',
    ageGroup: 'Ages 11-16',
    description: 'Designing and soldering complex circuits to power a miniature, interactive community model.',
    image: '/assets/real-photos/electric_village_project.png',
    featured: false,
  },
  {
    id: 'mechanical-robot-arm',
    title: 'Robotics & Automation',
    student: 'Aarav & Tech Team',
    category: 'Engineering & Maker',
    ageGroup: 'Ages 10-12',
    description: 'A fully functional mechanical arm built using hydraulic systems and programmed automation.',
    image: '/assets/real-photos/mechanical_robot_arm_teen.png',
    featured: false,
  },
  {
    id: 'branding-shop',
    title: 'Digital Branding Concepts',
    student: 'Entrepreneurship Lab',
    category: 'Entrepreneurship',
    ageGroup: 'Ages 13-16',
    description: 'A complete branding package including logo design and marketing strategy for local startups.',
    image: '/assets/real-photos/teen_branding.png',
    featured: false,
  },
  {
    id: 'baking-studio',
    title: 'Baking Studio - Culinary Design',
    student: 'Culinary Arts Group',
    category: 'Art & Creative',
    ageGroup: 'Ages 10-15',
    description: 'Learning the science of baking and the art of decorating custom cakes and cookies.',
    image: '/assets/real-photos/teen_baking.png',
    featured: false,
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
  const tabs = ['All Projects', 'Art & Creative', 'Engineering & Maker', 'Science & Nature', 'Storytelling & Media', 'Entrepreneurship'];

  const filteredProjects = PROJECTS_DATA.filter(project => 
    activeTab === 'All Projects' || project.category === activeTab
  );

  return (
    <main className="pt-20 pb-20">
      <SEO 
        title="Artifacts of Growth | Student Projects" 
        description="A gallery of self-directed projects built by SPOT students. From 3D printed sets to eco-terrariums."
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80" 
            alt="Children working on projects" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spot-cream/80 via-spot-cream/90 to-spot-cream" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-spot-pastel-pink text-spot-red font-bold text-sm tracking-wider uppercase mb-6">
              Student Portfolio
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl text-spot-charcoal tracking-tighter mb-6 leading-none">
              Projects at <span className="text-spot-red">SPOT</span>
            </h1>
            <p className="text-xl md:text-2xl text-spot-charcoal/80 mb-10 max-w-2xl mx-auto font-medium">
              Real learning through building, experimenting and creating. At SPOT, children explore ideas through studios and projects rather than traditional classrooms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/studios" className="w-full sm:w-auto px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20">
                Explore Studios
              </Link>
              <Link to="/microschool" className="w-full sm:w-auto px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10">
                Join SPOT
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How Project Learning Works */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6">Learning by Building</h2>
          <p className="text-xl text-spot-charcoal/70 max-w-2xl mx-auto">
            Children at SPOT learn through project-based exploration. Instead of memorizing concepts, they build machines, design art, run experiments, create stories, develop ideas, and collaborate to present their work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-spot-pastel-yellow via-spot-pastel-pink to-spot-pastel-blue -translate-y-1/2 z-0" />
          
          {[
            { icon: <Lightbulb size={40} />, title: "Curiosity", desc: "Asking questions and exploring interests." },
            { icon: <Compass size={40} />, title: "Exploration", desc: "Researching, testing, and gathering materials." },
            { icon: <Hammer size={40} />, title: "Creation", desc: "Building, prototyping, and iterating." },
            { icon: <Presentation size={40} />, title: "Presentation", desc: "Sharing the final project with the community." }
          ].map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-spot-cream rounded-full flex items-center justify-center text-spot-red mb-6">
                {step.icon}
              </div>
              <h3 className="font-display font-black text-2xl text-spot-charcoal mb-3">{step.title}</h3>
              <p className="text-spot-charcoal/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filter Projects */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-8 justify-start md:justify-center">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-spot-charcoal text-white shadow-md' 
                  : 'bg-white text-spot-charcoal/60 hover:bg-spot-pastel-yellow hover:text-spot-charcoal border border-black/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-black/5 flex flex-col"
            >
              <Link to={`/projects/${project.id}`} className="absolute inset-0 z-20" aria-label={`View ${project.title}`} />
              <div className="h-64 relative overflow-hidden">
                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-spot-charcoal uppercase tracking-wider z-10">
                  {project.category}
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-spot-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <span className="text-white font-bold flex items-center gap-2">
                    View Project <ArrowRight size={20} />
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-black text-xl text-spot-charcoal leading-tight group-hover:text-spot-red transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm font-bold text-spot-charcoal/50 mb-4">{project.student} • {project.ageGroup}</p>
                <p className="text-spot-charcoal/70 line-clamp-3">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
