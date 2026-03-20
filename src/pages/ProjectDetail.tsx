import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, User, Users, Tag, Target, CheckCircle2, PlayCircle, ArrowRight, Loader2, Star, LayoutGrid, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { PROJECTS_DATA } from './Projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .or(`slug.eq.${id},id.eq.${id}`)
          .maybeSingle();

        if (data) {
          setProject(data);
        } else {
          // Fallback to local data
          const localProject = PROJECTS_DATA.find(p => p.id === id);
          if (localProject) {
            setProject(localProject);
          }
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching project:', err);
        // Final fallback check if error occurred during fetch
        const localProject = PROJECTS_DATA.find(p => p.id === id);
        if (localProject) setProject(localProject);
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
        <p className="font-display font-black text-xl uppercase tracking-widest text-spot-charcoal/40">Synchronizing Archive...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-[4rem] shadow-2xl border border-black/5 max-w-lg mx-6">
          <Target size={64} className="text-spot-red mx-auto mb-8 opacity-20" />
          <h2 className="text-4xl font-display font-black mb-6 uppercase tracking-tighter">Achievement Not Found</h2>
          <p className="text-spot-charcoal/50 font-medium mb-10 leading-relaxed italic">This project record may have been archived or is yet to be synchronized with the public interface.</p>
          <Link to="/projects" className="inline-flex items-center gap-4 px-12 py-5 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-black transition-all text-xs shadow-xl">
            <ArrowLeft size={18} /> Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20 pb-20 bg-spot-cream min-h-screen overflow-hidden">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
        <Link to="/projects" className="inline-flex items-center gap-3 text-spot-charcoal/40 hover:text-spot-red font-black uppercase text-[10px] tracking-widest transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Portfolio
        </Link>
      </div>

      {/* Project Hero */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
               <span className="inline-block py-2 px-6 rounded-full bg-spot-pastel-pink/20 text-spot-red border border-spot-red/10 font-black text-[10px] tracking-[0.3em] uppercase shadow-inner">
                 {project.category}
               </span>
               <div className="h-px bg-spot-red/10 flex-1" />
            </div>
            
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-spot-charcoal tracking-tighter mb-12 leading-[0.85] uppercase">
              {project.title}
            </h1>
            
            <div className="grid grid-cols-2 gap-8 mb-12 py-10 border-y border-black/5">
              <div className="space-y-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">Inventor</span>
                 <div className="flex items-center gap-3 text-xl font-bold italic text-spot-charcoal tracking-tighter">{project.student_name}</div>
              </div>
              <div className="space-y-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">Cohort</span>
                 <div className="flex items-center gap-3 text-xl font-bold italic text-spot-charcoal tracking-tighter">{project.age_group}</div>
              </div>
            </div>

            <p className="text-2xl md:text-3xl text-spot-charcoal/50 leading-snug mb-8 font-medium italic pr-12">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white relative aspect-square"
          >
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Deep Pedagogical Details */}
      <section className="py-32 px-6 max-w-5xl mx-auto space-y-40">
        
        {/* Learning Objective - The Intent */}
        {project.learning_objective && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-spot-charcoal text-white p-16 rounded-[5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 text-spot-pastel-pink rotate-12">
               <Target size={300} strokeWidth={1} />
            </div>
            <h2 className="font-display font-black text-[11px] text-spot-pastel-pink mb-10 uppercase tracking-[0.4em] flex items-center gap-4">
              <span className="w-8 h-px bg-spot-pastel-pink" /> Cognitive Objective
            </h2>
            <p className="font-display font-bold text-3xl md:text-5xl leading-[1.1] tracking-tighter italic lg:pr-32">
              "{project.learning_objective}"
            </p>
          </motion.div>
        )}

        {/* The Action - What they did */}
        <div className="grid md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter flex flex-col gap-2">
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-spot-red mb-2">The Action Loop</span>
               Phase 1: Deep Immersion
            </h2>
            <div className="prose prose-2xl font-medium text-spot-charcoal/70 leading-relaxed italic border-l-4 border-spot-red/20 pl-10">
              <p>{project.what_children_did}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tighter flex flex-col gap-2">
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-spot-pastel-blue mb-2">The Mastery Loop</span>
               Phase 2: Cognitive Synthesis
            </h2>
            <div className="prose prose-2xl font-medium text-spot-charcoal/70 leading-relaxed italic border-l-4 border-spot-pastel-blue/20 pl-10">
              <p>{project.what_they_learned}</p>
            </div>
          </motion.div>
        </div>

        {/* Process Gallery */}
        {project.process_photos && project.process_photos.length > 0 && (
          <div className="space-y-20">
            <div className="text-center">
               <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Process Artifacts</h2>
               <p className="text-spot-charcoal/40 font-bold uppercase text-[10px] tracking-widest">A timeline of iteration and failure-to-success</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-12">
              {project.process_photos.map((photo: any, index: number) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="rounded-[4rem] overflow-hidden mb-8 aspect-square border border-black/5 shadow-2xl relative">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                       <p className="text-white font-black uppercase text-[9px] tracking-widest leading-relaxed">{photo.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Synthesis of Skills */}
        {project.skills_acquired && project.skills_acquired.length > 0 && (
          <div className="bg-spot-red text-white p-20 rounded-[5rem] shadow-2xl relative overflow-hidden text-center">
             <div className="absolute inset-0 opacity-10">
                <LayoutGrid size={800} strokeWidth={0.5} className="absolute -top-40 -left-40 rotate-45" />
             </div>
             <h2 className="font-display text-[11px] font-black uppercase tracking-[0.5em] text-spot-pastel-yellow mb-16 relative z-10">Skills Integrated</h2>
             <div className="flex flex-wrap justify-center gap-6 relative z-10">
               {project.skills_acquired.map((skill: string, index: number) => (
                 <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-display font-black text-xl md:text-2xl italic tracking-tighter hover:bg-white hover:text-spot-red transition-all cursor-default">
                   {skill}
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Concepts Explored - Technical Depth */}
        {project.concepts_explored && project.concepts_explored.length > 0 && (
          <div className="text-center space-y-12">
             <h2 className="font-display text-4xl font-black uppercase tracking-tighter opacity-10 tracking-[0.3em]">Theoretical Matrix</h2>
             <div className="flex flex-wrap justify-center gap-16">
                {project.concepts_explored.map((concept: string, index: number) => (
                  <div key={index} className="flex flex-col items-center gap-4 group">
                     <div className="w-16 h-16 rounded-[1.5rem] bg-spot-pastel-blue/10 border border-spot-pastel-blue/30 flex items-center justify-center text-spot-pastel-blue group-hover:bg-spot-pastel-blue group-hover:text-white transition-all transform group-hover:rotate-12">
                        <Star size={32} />
                     </div>
                     <span className="font-black uppercase text-[10px] tracking-widest text-spot-charcoal/40 group-hover:text-spot-charcoal transition-colors">{concept}</span>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* Reflection */}
        {project.reflection && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-spot-pastel-yellow/30 p-20 rounded-[6rem] text-center border-4 border-dashed border-spot-pastel-yellow/50 relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center">
               <Quote size={40} className="text-spot-red fill-current" />
            </div>
            <h2 className="font-display font-black text-[11px] text-spot-charcoal/30 mb-12 uppercase tracking-[0.5em]">The Student's Voice</h2>
            <p className="font-display font-bold text-3xl md:text-5xl text-spot-charcoal leading-[1.1] tracking-tighter italic">
              "{project.reflection}"
            </p>
            <div className="mt-12 flex flex-col items-center gap-2">
               <div className="h-10 w-px bg-spot-charcoal/10 mb-4" />
               <div className="font-black uppercase text-xs tracking-[0.3em] text-spot-charcoal/60 leading-none">— {project.student_name}</div>
               <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/20">Inventor Statement</span>
            </div>
          </motion.div>
        )}

      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center max-w-5xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-spot-red/20 to-transparent" />
        <h2 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-spot-charcoal mb-16 tracking-tighter uppercase leading-[0.8] opacity-10 pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap">
           FUTURE PROOF CRAFT • FUTURE PROOF CRAFT
        </h2>
        <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-spot-charcoal mb-16 tracking-tighter uppercase leading-[0.85] relative z-10">
          Spark a <br/><span className="text-spot-red italic underline decoration-spot-pastel-pink/30 underline-offset-[16px]">similar voyage?</span>
        </h2>
        <Link 
          to={project.studio_link || '/studios'}
          className="relative z-10 inline-flex items-center gap-6 px-16 py-8 bg-spot-charcoal text-white font-black uppercase tracking-[0.3em] rounded-full hover:bg-spot-red transition-all text-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group haptic-feedback active:scale-95"
        >
          Explore this Studio <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
        </Link>
      </section>

    </main>
  );
}
