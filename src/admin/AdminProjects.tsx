import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Loader2, Star, LayoutGrid, Award, BookOpen, UserCircle, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { ImageUpload, TagInput, SectionHeader } from './components/AdminInputs';
import { Skeleton } from '../components/ui/Skeleton';

export const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Form States
  const [imageUrl, setImageUrl] = useState('');
  const [concepts, setConcepts] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (project: any = null) => {
    setEditingProject(project);
    setImageUrl(project?.image_url || '');
    setConcepts(project?.concepts_explored || []);
    setSkills(project?.skills_developed || []);
    setErrorStatus(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently remove this showcase?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) fetchProjects();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const projectData = {
      title: formData.get('title') || '',
      student_name: formData.get('student_name') || '',
      age_group: formData.get('age_group') || '',
      category: formData.get('category') || '',
      description: formData.get('description') || '',
      image_url: imageUrl,
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'published' : 'draft',
      summary: formData.get('summary') || '',
      big_question: formData.get('big_question') || '',
      what_children_did: formData.get('what_children_did') || '',
      concepts_explored: concepts,
      skills_developed: skills,
      reflection: formData.get('reflection') || '',
      studio_link: formData.get('studio_link') || '',
    };

    try {
      let result;
      if (editingProject) {
        result = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
      } else {
        result = await supabase.from('projects').insert([projectData]);
      }

      const { error: saveError } = result;

      if (saveError) {
        console.error('Supabase Error:', saveError);
        setErrorStatus(saveError.code === '23505' ? 'URL ID (Slug) must be unique.' : saveError.message);
        setIsSaving(false);
        return;
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      console.error('Save error:', err);
      setErrorStatus(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-4 md:p-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-spot-pastel-yellow/20 flex items-center justify-center text-spot-charcoal shadow-inner backdrop-blur-md border border-spot-pastel-yellow/5">
                <Award size={26} />
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal tracking-tighter uppercase leading-none text-wrap-balance">Portfolio Hub</h1>
            </div>
            <p className="text-spot-charcoal/60 font-medium text-sm md:text-base text-pretty max-w-lg">Curating student innovation and creative triumphs across the ecosystem.</p>
          </div>
          <button 
            onClick={() => openForm()}
            aria-label="Showcase New Success"
            className="group flex items-center gap-4 px-10 py-6 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[2.5rem] hover:bg-spot-red transition-all shadow-2xl hover:scale-[1.02] active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-spot-red/20"
          >
            <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" /> 
            Showcase New Success
          </button>
        </header>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-[3rem] border border-black/5 p-6 space-y-4">
                <Skeleton className="h-44 w-full rounded-[2rem]" />
                <div className="flex gap-2">
                   <Skeleton className="h-4 w-1/2 rounded-full" />
                   <Skeleton className="h-4 w-1/4 rounded-full ml-auto" />
                </div>
                <Skeleton className="h-8 w-3/4 rounded-xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                  <Skeleton className="h-8 w-20 rounded-lg" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project) => (
              <motion.div 
                layout
                key={project.id} 
                className={`bg-white rounded-[3rem] border border-black/5 shadow-xl shadow-black/5 overflow-hidden flex flex-col group transition-all hover:shadow-2xl hover:border-black/10 ${project.status === 'draft' ? 'opacity-60 bg-slate-50' : ''}`}
              >
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="px-4 py-1.5 rounded-full text-[9px] font-black bg-white text-spot-charcoal uppercase tracking-[0.2em] shadow-lg border border-black/5">
                      {project.category}
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-spot-pastel-yellow text-spot-charcoal flex items-center justify-center shadow-lg animate-pulse">
                      <Star size={14} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 flex items-center gap-2">
                       <UserCircle size={10} /> {project.student_name}
                    </span>
                    <div className="h-px bg-black/5 flex-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">{project.age_group}</span>
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-[0.9] group-hover:text-spot-red transition-colors">{project.title}</h3>
                  <p className="text-xs text-spot-charcoal/60 font-medium line-clamp-2 italic leading-relaxed mb-6">{project.description}</p>
                  
                  <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                      project.status === 'published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-black/5'
                    }`}>
                      {project.status || 'Draft'}
                    </span>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => openForm(project)} 
                        aria-label="Edit Project"
                        className="w-12 h-12 bg-slate-50 text-spot-charcoal hover:text-white hover:bg-spot-charcoal rounded-xl transition-all flex items-center justify-center shadow-sm active:scale-95"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        aria-label="Delete Project"
                        className="w-12 h-12 bg-slate-50 text-spot-charcoal hover:bg-spot-red hover:text-white rounded-xl transition-all flex items-center justify-center shadow-sm active:scale-95"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-spot-charcoal/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 30 }} 
                className="bg-white w-full max-w-6xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] border border-white/20"
              >
                <div className="p-10 border-b border-black/5 flex justify-between items-center bg-slate-50/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-spot-red mb-1">Portfolio Curator</span>
                    <h2 className="font-display font-black text-3xl text-spot-charcoal uppercase tracking-tighter leading-none">
                      {editingProject ? 'Refine Showcase' : 'Architect New Story'}
                    </h2>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-spot-red hover:text-white transition-all active:scale-90">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 space-y-16 hide-scrollbar custom-scrollbar">
                  {/* Phase 1: Core Context */}
                  <div className="space-y-10">
                    <SectionHeader num={1} label="Ownership & Resonance" />
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Project Title</label>
                          <input name="title" required placeholder="The Eco-Kinetic Sculpture" defaultValue={editingProject?.title} className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-display font-black text-2xl tracking-tighter uppercase" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Inventor Name</label>
                              <input name="student_name" required placeholder="Alex Noble" defaultValue={editingProject?.student_name} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-xs" />
                           </div>
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Age Group</label>
                              <input name="age_group" required placeholder="9-12 Years" defaultValue={editingProject?.age_group} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-xs" />
                           </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">The Big Question</label>
                          <input name="big_question" placeholder="Can we build tools that grow themselves?" defaultValue={editingProject?.big_question} className="w-full px-8 py-6 rounded-[2.5rem] bg-spot-pastel-yellow border border-black/5 focus:outline-none font-medium italic text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Domain</label>
                              <select name="category" required defaultValue={editingProject?.category} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-[10px] uppercase tracking-widest">
                                <option value="Art & Design">Art & Design</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Science">Science</option>
                                <option value="Media">Media</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Studio Source</label>
                              <input name="studio_link" placeholder="/studios/..." defaultValue={editingProject?.studio_link} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-mono text-[10px] text-spot-red" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: Narrative Deep Dive */}
                  <div className="space-y-10">
                    <SectionHeader num={2} label="Process & Insight" />
                    <div className="grid lg:grid-cols-2 gap-12">
                       <div className="space-y-8">
                          <div>
                             <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">The Narrative (Summary)</label>
                             <textarea name="summary" required rows={6} placeholder="How it started, what happened, and why..." defaultValue={editingProject?.summary} className="w-full px-8 py-6 rounded-[2.5rem] bg-slate-50 border border-black/5 text-sm font-medium leading-relaxed" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Technical Highlights</label>
                             <textarea name="what_children_did" rows={4} placeholder="Specific builds, code snippets, or sketches..." defaultValue={editingProject?.what_children_did} className="w-full px-8 py-6 rounded-[2.5rem] bg-slate-50 border border-black/5 text-sm font-medium leading-relaxed" />
                          </div>
                       </div>
                       <div className="space-y-8">
                          <div>
                             <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Student Reflection</label>
                             <textarea name="reflection" rows={6} placeholder="In the words of the student..." defaultValue={editingProject?.reflection} className="w-full px-8 py-6 rounded-[2.5rem] bg-spot-cream/50 border border-black/5 text-sm font-medium italic leading-relaxed" />
                          </div>
                          <div>
                             <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Short Elevator Pitch</label>
                             <textarea name="description" required rows={3} placeholder="Condensed resonance..." defaultValue={editingProject?.description} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 text-sm font-medium" />
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Phase 3: Assets & Growth */}
                  <div className="space-y-10">
                    <SectionHeader num={3} label="Visual Archive" />
                    <div className="grid lg:grid-cols-2 gap-12">
                       <ImageUpload label="Hero Outcome Visual" value={imageUrl} onChange={setImageUrl} maxSizeKB={500} />
                       <div className="space-y-8">
                          <TagInput label="Concepts Mastered" tags={concepts} onChange={setConcepts} maxTags={5} placeholder="e.g. Iteration" />
                          <TagInput label="Skills Forged" tags={skills} onChange={setSkills} maxTags={5} placeholder="e.g. Python" />
                       </div>
                    </div>
                  </div>

                  {/* Phase 4: Broadcast Status */}
                  <div className="flex flex-wrap gap-12 items-center justify-center p-10 bg-spot-charcoal rounded-[3rem] shadow-2xl">
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <input type="checkbox" name="featured" defaultChecked={editingProject?.featured} className="w-8 h-8 rounded-xl text-spot-pastel-yellow border-2 border-white/20 focus:ring-0 bg-transparent transition-all" />
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-spot-pastel-yellow">Star Showcase</span>
                        </label>
                        <div className="w-px h-8 bg-white/10" />
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <input type="checkbox" name="status" defaultChecked={editingProject?.status !== 'draft'} className="w-8 h-8 rounded-xl text-emerald-500 border-2 border-white/20 focus:ring-0 bg-transparent transition-all" />
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-emerald-500">Public Archive</span>
                        </label>
                  </div>

                  <AnimatePresence>
                    {errorStatus && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        className="my-6 p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-center gap-4 text-red-600 text-sm font-bold"
                      >
                        <AlertCircle className="shrink-0" size={20} />
                        {errorStatus}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-end gap-6 pt-12 border-t border-black/5">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-50 rounded-[2rem] transition-all flex items-center gap-2">
                       Dismiss
                    </button>
                    <button type="submit" disabled={isSaving} className="px-16 py-5 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl flex items-center gap-3 relative overflow-hidden group">
                       {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}
                       <span className="relative">{editingProject ? 'Refine Artifact' : 'Commit to Portfolio'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
