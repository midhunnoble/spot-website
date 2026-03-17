import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, User, Users, Tag, Target, CheckCircle2, PlayCircle, ArrowRight, Loader2, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-spot-cream flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-spot-red animate-spin" />
        <p className="font-display font-black text-xl uppercase tracking-tighter text-spot-charcoal/40 tracking-widest">Entering Project Archive...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black mb-6 uppercase">Project Not Found</h2>
          <Link to="/projects" className="text-spot-red font-bold underline flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20 pb-20 bg-spot-cream min-h-screen">
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
            <span className="inline-block py-1.5 px-4 rounded-full bg-spot-pastel-yellow text-spot-charcoal border border-black/5 font-black text-[10px] tracking-widest uppercase mb-6">
              {project.category}
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-spot-charcoal tracking-tighter mb-8 leading-[0.9]">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-8 mb-10 text-spot-charcoal/80 font-bold uppercase text-xs tracking-widest">
              <div className="flex items-center gap-3"><User size={18} className="text-spot-red" /> {project.student_name}</div>
              <div className="flex items-center gap-3"><Users size={18} className="text-spot-red" /> {project.age_group}</div>
            </div>

            <p className="text-xl md:text-2xl text-spot-charcoal/80 leading-snug mb-8 font-medium italic">
              {project.summary || project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/10 border border-black/5 aspect-4/3"
          >
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="space-y-24">
          
          {/* Big Question */}
          {project.big_question && (
            <div className="bg-spot-red text-white p-12 rounded-[4rem] shadow-2xl text-center transform -rotate-1 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <h2 className="font-display font-black text-[10px] text-spot-pastel-yellow mb-6 uppercase tracking-[0.3em]">The Big Question</h2>
              <p className="font-display font-bold text-3xl md:text-4.5xl leading-tight">
                "{project.big_question}"
              </p>
            </div>
          )}

          {/* What Children Did */}
          <div>
            <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
               <span className="w-12 h-1 bg-spot-red rounded-full" /> The Process
            </h2>
            <div className="prose prose-xl font-medium text-spot-charcoal/80 leading-relaxed italic">
              <p>{project.what_children_did || project.description}</p>
            </div>
          </div>

          {/* Concepts Explored */}
          {project.concepts_explored && project.concepts_explored.length > 0 && (
            <div className="bg-spot-pastel-blue/10 p-12 rounded-[3.5rem] border border-spot-pastel-blue/30 relative">
               <div className="absolute -top-6 left-12 px-6 py-2 bg-spot-pastel-blue text-white rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg">
                  Concepts Explored
               </div>
              <ul className="grid sm:grid-cols-2 gap-6 pt-4">
                {project.concepts_explored.map((concept: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 text-spot-charcoal font-bold uppercase tracking-tighter">
                    <CheckCircle2 size={24} className="text-spot-pastel-blue shrink-0" />
                    <span className="text-lg leading-tight">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Build Process Gallery */}
          {project.process_photos && project.process_photos.length > 0 && (
            <div>
              <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-12">Process Gallery</h2>
              <div className="grid sm:grid-cols-3 gap-8">
                {project.process_photos.map((photo: any, index: number) => (
                  <div key={index} className="group">
                    <div className="rounded-[2.5rem] overflow-hidden mb-4 aspect-square border border-black/5 shadow-xl">
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 text-center">{photo.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Outcome */}
          {project.final_outcome_url && (
            <div>
              <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4 text-spot-red">
                 Final Outcome
              </h2>
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-black/5 group cursor-pointer aspect-video">
                <img src={project.final_outcome_url} alt="Final Outcome" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all backdrop-blur-sm group-hover:backdrop-blur-none">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                     <PlayCircle size={64} className="text-white fill-white/20" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Developed */}
          {project.skills_developed && project.skills_developed.length > 0 && (
            <div className="bg-spot-charcoal text-spot-cream p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-spot-red via-spot-pastel-blue to-spot-pastel-yellow" />
              <h2 className="font-display text-3xl font-black text-spot-pastel-yellow mb-12 uppercase tracking-tighter">Skills Developed</h2>
              <div className="grid sm:grid-cols-3 gap-10">
                {project.skills_developed.map((skill: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-black text-lg text-white uppercase tracking-tighter italic">{skill.title}</h4>
                    <p className="text-[13px] font-medium text-spot-cream/50 leading-relaxed italic">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflection */}
          {project.reflection && (
            <div className="bg-spot-pastel-yellow/20 p-16 rounded-[4rem] text-center border-2 border-dashed border-spot-pastel-yellow/40 relative">
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 p-4 bg-spot-pastel-yellow rounded-2xl shadow-xl">
                  <Star size={32} className="text-spot-charcoal" fill="currentColor" />
               </div>
              <h2 className="font-display font-black text-[10px] text-spot-charcoal/30 mb-8 uppercase tracking-[0.4em]">Student Reflection</h2>
              <p className="font-display font-bold text-2xl md:text-3.5xl text-spot-charcoal leading-tight italic">
                "{project.reflection}"
              </p>
              <div className="mt-8 font-black uppercase text-xs tracking-widest text-spot-charcoal/40">— {project.student_name}</div>
            </div>
          )}

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal mb-12 tracking-tighter uppercase leading-[0.85]">
          Inspired by this <span className="text-spot-red">Maker Voyage?</span>
        </h2>
        <Link 
          to={project.studio_link || '/studios'}
          className="inline-flex items-center gap-4 px-12 py-6 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-black transition-all text-sm shadow-2xl shadow-black/20 group haptic-feedback"
        >
          Explore This Studio <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </section>

    </main>
  );
}
