import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Eye, 
  EyeOff, 
  Save,
  X,
  Loader2,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';

export const AdminStudios = () => {
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudio, setEditingStudio] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('studios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching studios:', error);
    } else {
      setStudios(data || []);
    }
    setLoading(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const { error } = await supabase
      .from('studios')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling status:', error);
    } else {
      fetchStudios();
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const skills = formData.get('skills')?.toString().split(',').map(s => s.trim()) || [];
    
    const studioData = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      long_description: formData.get('long_description'),
      age_group: formData.get('age_group'),
      category: formData.get('category'),
      color_class: formData.get('color_class'),
      fee: formData.get('fee'),
      image_url: formData.get('image_url'),
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'active' : 'inactive',
      skills: skills,
      outcomes: formData.get('outcomes')?.toString().split(',').map(s => s.trim()) || [],
      schedule: formData.get('schedule'),
    };

    let error;
    if (editingStudio) {
      const { error: updateError } = await supabase
        .from('studios')
        .update(studioData)
        .eq('id', editingStudio.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('studios')
        .insert([studioData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving studio:', error);
      alert('Error saving studio. Check if slug is unique.');
    } else {
      setIsModalOpen(false);
      setEditingStudio(null);
      fetchStudios();
    }
    setIsSaving(false);
  };

  if (loading && studios.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="animate-spin text-spot-red" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none mb-2">Studio Management</h1>
            <p className="text-spot-charcoal/60 font-medium">Create, edit, and control the visibility of SPOT studios.</p>
          </div>
          <button 
            onClick={() => { setEditingStudio(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-4 bg-spot-red text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20"
          >
            <Plus size={20} />
            Add New Studio
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {studios.map((studio) => (
            <div 
              key={studio.id} 
              className={`bg-white rounded-[2.5rem] border border-black/5 shadow-xl overflow-hidden flex flex-col group transition-all ${
                studio.status === 'inactive' ? 'opacity-60 grayscale' : ''
              }`}
            >
              <div className="h-40 relative">
                <img src={studio.image_url} alt={studio.name} className="w-full h-full object-cover" />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black ${studio.color_class} text-spot-charcoal uppercase tracking-widest shadow-lg`}>
                  {studio.status}
                </div>
                {studio.featured && (
                  <div className="absolute top-4 right-4 p-2 bg-spot-pastel-yellow rounded-xl shadow-lg">
                    <Tag size={12} className="text-spot-charcoal" />
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-[9px] font-black uppercase tracking-widest text-spot-red mb-1 opacity-60">{studio.category}</div>
                <h3 className="font-display font-black text-xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-none">{studio.name}</h3>
                <p className="text-xs text-spot-charcoal/60 font-medium line-clamp-2 mb-6 flex-1 italic">{studio.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingStudio(studio); setIsModalOpen(true); }}
                      className="p-3 bg-slate-50 text-spot-charcoal hover:text-white hover:bg-spot-charcoal rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(studio.id, studio.status)}
                      className={`p-3 rounded-xl transition-all ${
                        studio.status === 'active' 
                          ? 'bg-slate-50 text-spot-charcoal hover:bg-orange-50 hover:text-orange-600' 
                          : 'bg-orange-50 text-orange-600 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      {studio.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <span className="font-black text-sm text-spot-charcoal">{studio.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
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
                className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-8 border-b border-black/5 flex justify-between items-center bg-slate-50">
                  <h2 className="font-display font-black text-2xl text-spot-charcoal uppercase tracking-tighter">
                    {editingStudio ? 'Edit Studio' : 'Create New Studio'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Studio Identity</label>
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            name="name" 
                            required 
                            placeholder="Studio Name" 
                            defaultValue={editingStudio?.name}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium" 
                          />
                          <input 
                            name="slug" 
                            required 
                            placeholder="url-slug (no spaces)" 
                            defaultValue={editingStudio?.slug}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Detailed Narrative (Website Detail Page)</label>
                        <textarea 
                          name="long_description" 
                          rows={6}
                          placeholder="Rich description for the detail page..." 
                          defaultValue={editingStudio?.long_description}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm leading-relaxed" 
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Age Group</label>
                          <input 
                            name="age_group" 
                            required 
                            placeholder="e.g. 10-15 yrs" 
                            defaultValue={editingStudio?.age_group}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Monthly Fee</label>
                          <input 
                            name="fee" 
                            required 
                            placeholder="e.g. ₹5,000/mo" 
                            defaultValue={editingStudio?.fee}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                          />
                        </div>
                      </div>

                      <div>
                         <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Weekly Schedule</label>
                         <input 
                           name="schedule" 
                           placeholder="e.g. Saturdays, 10 AM - 1 PM" 
                           defaultValue={editingStudio?.schedule}
                           className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                         />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Categorization & Style</label>
                        <div className="grid grid-cols-2 gap-4">
                          <select 
                            name="category" 
                            required
                            defaultValue={editingStudio?.category || ''}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold text-[10px] uppercase tracking-widest"
                          >
                            <option value="">Select Category</option>
                            <option value="Creative Arts">Creative Arts</option>
                            <option value="Engineering & Making">Engineering & Making</option>
                            <option value="Science & Nature">Science & Nature</option>
                            <option value="Communication & Storytelling">Communication & Storytelling</option>
                            <option value="Entrepreneurship">Entrepreneurship</option>
                          </select>
                          <select 
                            name="color_class" 
                            required
                            defaultValue={editingStudio?.color_class || ''}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold text-[10px] uppercase tracking-widest"
                          >
                            <option value="">Background Theme</option>
                            <option value="bg-spot-pastel-blue">Blue (Tech)</option>
                            <option value="bg-spot-pastel-pink">Pink (Creative)</option>
                            <option value="bg-spot-pastel-green">Green (Nature)</option>
                            <option value="bg-spot-pastel-yellow">Yellow (Biz)</option>
                            <option value="bg-spot-red">Red (Forensics)</option>
                            <option value="bg-spot-charcoal">Charcoal (Space)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Visual & Outcomes</label>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="relative">
                        <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-spot-charcoal/30" size={20} />
                        <input 
                          name="image_url" 
                          required 
                          placeholder="Public Image URL" 
                          defaultValue={editingStudio?.image_url}
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                        />
                      </div>
                      <input 
                        name="outcomes" 
                        placeholder="Key Outcomes (comma separated)" 
                        defaultValue={editingStudio?.outcomes?.join(', ')}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-black/5">
                    <div className="flex gap-8">
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input 
                           type="checkbox" 
                           name="featured" 
                           defaultChecked={editingStudio?.featured}
                           className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-red focus:ring-spot-red transition-all" 
                         />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter group-hover:text-spot-red">Featured</span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input 
                           type="checkbox" 
                           name="status" 
                           defaultChecked={editingStudio?.status !== 'off'}
                           className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-pastel-green focus:ring-spot-pastel-green transition-all" 
                         />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter group-hover:text-spot-pastel-green">Active (Live)</span>
                       </label>
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="px-8 py-4 text-spot-charcoal font-black uppercase tracking-widest text-xs hover:bg-slate-100 rounded-2xl transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-10 py-4 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-spot-red transition-all shadow-xl haptic-feedback flex items-center gap-2"
                      >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {editingStudio ? 'Update Studio' : 'Launch Studio'}
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
