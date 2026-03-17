import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save,
  X,
  Loader2,
  Image as ImageIcon,
  User,
  Hash,
  Star
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';

export const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
    } else {
      fetchProjects();
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const projectData = {
      title: formData.get('title'),
      student_name: formData.get('student_name'),
      age_group: formData.get('age_group'),
      category: formData.get('category'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'published' : 'draft',
      summary: formData.get('summary'),
      big_question: formData.get('big_question'),
      what_children_did: formData.get('what_children_did'),
      concepts_explored: formData.get('concepts_explored')?.toString().split(',').map(s => s.trim()) || [],
      skills_developed: formData.get('skills_developed')?.toString().split(',').map(s => s.trim()) || [],
      reflection: formData.get('reflection'),
      studio_link: formData.get('studio_link'),
    };

    let error;
    if (editingProject) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert([projectData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving project:', error);
      alert('Error saving project.');
    } else {
      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    }
    setIsSaving(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none mb-2">Projects Portfolio</h1>
            <p className="text-spot-charcoal/60 font-medium">Manage student success stories and creative works.</p>
          </div>
          <button 
            onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-4 bg-spot-red text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20"
          >
            <Plus size={20} />
            Showcase New Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-spot-red" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-[2.5rem] border border-black/5 shadow-xl overflow-hidden flex flex-col group hover:scale-[1.02] transition-all">
                <div className="h-48 relative overflow-hidden bg-spot-cream">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black text-spot-charcoal uppercase tracking-widest shadow-lg">
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 p-2 bg-spot-pastel-yellow rounded-full text-spot-charcoal shadow-lg">
                      <Star size={12} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-[10px] font-black text-spot-charcoal/40 uppercase tracking-widest mb-2 block italic">{project.student_name} • {project.age_group}</span>
                  <h3 className="font-display font-black text-xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-none line-clamp-2">{project.title}</h3>
                  <p className="text-xs text-spot-charcoal/60 font-medium line-clamp-3 mb-6 flex-1 italic leading-relaxed">{project.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-black/5">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {project.status || 'Draft'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingProject(project); setIsModalOpen(true); }}
                        className="p-3 bg-slate-50 text-spot-charcoal hover:text-white hover:bg-spot-charcoal rounded-xl transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-3 bg-slate-50 text-spot-charcoal hover:bg-spot-red hover:text-white rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-spot-charcoal/80 backdrop-blur-md" 
                onClick={() => setIsModalOpen(false)} 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-5xl rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[95vh]"
              >
                <div className="p-8 border-b border-black/5 flex justify-between items-center bg-slate-50">
                  <h2 className="font-display font-black text-2xl text-spot-charcoal uppercase tracking-tighter">
                    {editingProject ? 'Refine Project' : 'Curate Showcase'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-10 overflow-y-auto">
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Project Title</label>
                         <input name="title" required placeholder="The Scrabble Storyteller" defaultValue={editingProject?.title} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-display font-black text-xl tracking-tighter uppercase" />
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Student Name</label>
                           <input name="student_name" required placeholder="Alex Noble" defaultValue={editingProject?.student_name} className="w-full px-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red font-bold text-xs" />
                         </div>
                         <div>
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Age / Team</label>
                           <input name="age_group" required placeholder="Age 12" defaultValue={editingProject?.age_group} className="w-full px-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red font-bold text-xs" />
                         </div>
                       </div>

                       <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Core Catchphrase (Card View)</label>
                         <textarea name="description" required rows={2} placeholder="Building machines to solve daily puzzles..." defaultValue={editingProject?.description} className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm italic" />
                       </div>

                       <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Detailed Summary (Showcase Page)</label>
                         <textarea name="summary" required rows={4} placeholder="Full narrative of the project context..." defaultValue={editingProject?.summary} className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm leading-relaxed" />
                       </div>
                    </div>

                    <div className="space-y-8">
                       <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">The 'Big Question'</label>
                         <input name="big_question" placeholder="Can we build a city that generates its own water?" defaultValue={editingProject?.big_question} className="w-full px-6 py-4 rounded-xl bg-spot-pastel-yellow overflow-hidden border border-black/5 focus:outline-none focus:border-spot-red font-medium text-sm italic" />
                       </div>

                       <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Classification</label>
                         <select name="category" required defaultValue={editingProject?.category || ''} className="w-full px-6 py-4 rounded-xl border border-black/5 font-black text-[10px] uppercase tracking-widest">
                            <option value="">Select Category</option>
                            <option value="Art & Creative">Art & Creative</option>
                            <option value="Engineering & Maker">Engineering & Maker</option>
                            <option value="Science & Nature">Science & Nature</option>
                            <option value="Storytelling & Media">Storytelling & Media</option>
                            <option value="Entrepreneurship">Entrepreneurship</option>
                         </select>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Core Concepts</label>
                            <input name="concepts_explored" placeholder="Physics, Ecology" defaultValue={editingProject?.concepts_explored?.join(', ')} className="w-full px-6 py-4 rounded-xl border border-black/5 focus:outline-none focus:border-spot-red font-bold text-xs" />
                         </div>
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Skills Forged</label>
                            <input name="skills_developed" placeholder="Prototyping, Empathy" defaultValue={editingProject?.skills_developed?.join(', ')} className="w-full px-6 py-4 rounded-xl border border-black/5 focus:outline-none focus:border-spot-red font-bold text-xs" />
                         </div>
                       </div>

                       <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Main Cover Image URL</label>
                         <input name="image_url" required placeholder="https://..." defaultValue={editingProject?.image_url} className="w-full px-6 py-4 rounded-xl border border-black/5 font-medium text-xs" />
                       </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                    <div className="flex gap-8">
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input type="checkbox" name="featured" defaultChecked={editingProject?.featured} className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-red focus:ring-spot-red transition-all" />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter group-hover:text-spot-red">Featured in Portfolio</span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input type="checkbox" name="status" defaultChecked={editingProject?.status !== 'draft'} className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-pastel-green focus:ring-spot-pastel-green transition-all" />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter group-hover:text-spot-pastel-green">Live (Published)</span>
                       </label>
                    </div>
                    
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-spot-charcoal font-black uppercase tracking-widest text-xs hover:bg-slate-100 rounded-2xl transition-all">Cancel</button>
                      <button type="submit" disabled={isSaving} className="px-10 py-4 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-spot-red transition-all shadow-xl haptic-feedback flex items-center gap-2">
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {editingProject ? 'Update Portfolio' : 'Publish Story'}
                      </button>
                    </div>
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
