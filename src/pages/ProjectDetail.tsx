import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, User, Users, Tag, Target, CheckCircle2, PlayCircle, ArrowRight } from 'lucide-react';

const PROJECT_DATA = {
  id: 'mechanical-robot-arm',
  title: 'Mechanical Robot Arm',
  student: 'Aarav & Team',
  category: 'Engineering & Maker',
  ageGroup: 'Ages 10-12',
  description: 'A fully functional mechanical arm built using hydraulic syringes and laser-cut wood.',
  image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
  fullDescription: 'The goal of this project was to understand the principles of hydraulics and mechanical advantage. Aarav and his team started by researching how heavy machinery operates. They then designed a prototype using cardboard and plastic syringes filled with water. After several iterations to improve stability and range of motion, they moved to laser-cutting wood for the final structure. The resulting arm can rotate, extend, and grip objects using four independent hydraulic controls.',
  objectives: [
    'Understand Pascal\'s principle and basic fluid dynamics.',
    'Apply mechanical advantage to lift heavier objects.',
    'Design and prototype using CAD software and laser cutters.',
    'Collaborate effectively to troubleshoot leaks and structural weaknesses.'
  ],
  processPhotos: [
    { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80', caption: 'Early cardboard prototyping' },
    { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80', caption: 'Testing the hydraulic syringes' },
    { url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80', caption: 'Assembling the laser-cut parts' }
  ],
  outcomeVideo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80', // Using image as placeholder for video thumbnail
  skillsGained: [
    { title: 'Engineering Design Process', desc: 'Moving from idea to sketch, prototype, and final product.' },
    { title: 'Physics Application', desc: 'Seeing theoretical physics work in the real world.' },
    { title: 'Resilience', desc: 'Overcoming multiple failures during the prototyping phase.' }
  ],
  studioLink: '/studios'
};

export default function ProjectDetail() {
  const { id } = useParams();
  
  // In a real app, fetch data based on ID. Using mock data here.
  const project = PROJECT_DATA;

  return (
    <main className="pt-20 pb-20">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link to="/projects" className="inline-flex items-center gap-2 text-spot-charcoal/60 hover:text-spot-red font-bold transition-colors">
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>
      </div>

      {/* Project Hero */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-spot-pastel-yellow text-spot-charcoal font-bold text-sm tracking-wider uppercase mb-6">
              {project.category}
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal tracking-tighter mb-6 leading-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-spot-charcoal/80 font-medium">
              <div className="flex items-center gap-2"><User size={20} className="text-spot-red" /> {project.student}</div>
              <div className="flex items-center gap-2"><Users size={20} className="text-spot-red" /> {project.ageGroup}</div>
              <div className="flex items-center gap-2"><Tag size={20} className="text-spot-red" /> {project.category}</div>
            </div>

            <p className="text-xl text-spot-charcoal/80 leading-relaxed mb-8">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border border-black/5"
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover aspect-square md:aspect-[4/3]" />
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="space-y-16">
          
          {/* Description */}
          <div>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-6">The Challenge</h2>
            <p className="text-lg text-spot-charcoal/80 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-spot-pastel-blue/20 p-8 rounded-3xl border border-spot-pastel-blue/50">
            <h2 className="font-display font-black text-2xl text-spot-charcoal mb-6 flex items-center gap-3">
              <Target className="text-spot-red" /> Learning Objectives
            </h2>
            <ul className="space-y-4">
              {project.objectives.map((obj, index) => (
                <li key={index} className="flex items-start gap-3 text-spot-charcoal/80 font-medium">
                  <CheckCircle2 size={20} className="text-spot-pastel-blue shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Build Process */}
          <div>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-8">The Build Process</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {project.processPhotos.map((photo, index) => (
                <div key={index} className="group">
                  <div className="rounded-2xl overflow-hidden mb-3 h-48">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-sm font-bold text-spot-charcoal/60 text-center">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Outcome */}
          <div>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-8">Final Outcome</h2>
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl shadow-black/10 group cursor-pointer">
              <img src={project.outcomeVideo} alt="Final Outcome" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <PlayCircle size={80} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          {/* What We Learned */}
          <div className="bg-spot-charcoal text-spot-cream p-10 rounded-[3rem] shadow-xl">
            <h2 className="font-display font-black text-3xl text-spot-pastel-yellow mb-8">What We Learned</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {project.skillsGained.map((skill, index) => (
                <div key={index}>
                  <h4 className="font-bold text-lg text-white mb-2">{skill.title}</h4>
                  <p className="text-sm text-spot-cream/70 leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-8 tracking-tighter">
          Inspired by this project?
        </h2>
        <Link 
          to={project.studioLink}
          className="inline-flex items-center gap-3 px-10 py-5 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-xl shadow-xl shadow-spot-red/20"
        >
          Explore the Studio <ArrowRight size={24} />
        </Link>
      </section>

    </main>
  );
}
