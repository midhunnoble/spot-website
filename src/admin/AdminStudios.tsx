import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Save, X, Loader2, Users, ShieldCheck, Globe, MapPin, Trash2, LayoutGrid, CalendarDays, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { ImageUpload, TagInput, SectionHeader } from './components/AdminInputs';

export const AdminStudios = () => {
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudio, setEditingStudio] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Form States
  const [modules, setModules] = useState<{title: string, content: string}[]>([]);
  const [facilitators, setFacilitators] = useState<{name: string, bio: string, image?: string}[]>([]);
  const [keyOutcomes, setKeyOutcomes] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [daysActive, setDaysActive] = useState<Record<string, {active: boolean, time: string}>>({
    mon: { active: false, time: '' },
    tue: { active: false, time: '' },
    wed: { active: false, time: '' },
    thu: { active: false, time: '' },
    fri: { active: false, time: '' },
    sat: { active: false, time: '' },
    sun: { active: false, time: '' },
  });

  useEffect(() => {
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('studios')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setStudios(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (studio: any = null) => {
    setEditingStudio(studio);
    setModules(studio?.modules || [{ title: '', content: '' }]);
    setFacilitators(studio?.facilitators || [{ name: '', bio: '' }]);
    setKeyOutcomes(studio?.key_outcomes || []);
    setSkills(studio?.skills || []);
    setImageUrl(studio?.image_url || '');
    setDaysActive(studio?.days_active || {
      mon: { active: false, time: '' },
      tue: { active: false, time: '' },
      wed: { active: false, time: '' },
      thu: { active: false, time: '' },
      fri: { active: false, time: '' },
      sat: { active: false, time: '' },
      sun: { active: false, time: '' },
    });
    setErrorStatus(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    // Validate required fields
    const name = formData.get('name');
    const slug = formData.get('slug');
    if (!name || !slug) {
      alert('Name and Slug are required.');
      setIsSaving(false);
      return;
    }

    const studioData = {
      name,
      slug,
      description: formData.get('description') || '',
      long_description: formData.get('long_description') || '',
      age_group: formData.get('age_group') || '',
      category: formData.get('category') || '',
      fee: formData.get('fee') || '',
      image_url: imageUrl,
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'active' : 'inactive',
      start_date: formData.get('start_date') || null,
      end_date: formData.get('end_date') || null,
      total_hours: formData.get('total_hours') || '',
      total_seats: parseInt(formData.get('total_seats') as string) || 0,
      is_online: formData.get('mode') === 'online',
      has_certificate: formData.get('has_certificate') === 'on',
      days_active: daysActive,
      modules: modules.filter(m => m.title),
      facilitators: facilitators.filter(f => f.name),
      key_outcomes: keyOutcomes,
      skills: skills,
      color_class: formData.get('color_class') || 'bg-spot-pastel-green',
    };

    console.log('Saving Studio Data:', studioData);

    try {
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
        console.error('Supabase Error:', error);
        setErrorStatus(error.code === '23505' ? 'URL ID must be unique. This one is already taken.' : error.message);
        setIsSaving(false);
        return;
      }

      setIsModalOpen(false);
      fetchStudios();
    } catch (err: any) {
      console.error('Exception during save:', err);
      setErrorStatus(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-spot-red/10 flex items-center justify-center text-spot-red shadow-inner">
                <LayoutGrid size={24} />
              </div>
              <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none">Studio Forge</h1>
            </div>
            <p className="text-spot-charcoal/60 font-medium text-sm">Design and deploy high-intensity immersive learning pods.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="group flex items-center gap-3 px-8 py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl hover:scale-[1.02] active:scale-95"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Launch New Studio
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-black/5 border-t-spot-red rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/20">Syncing with Cloud...</span>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {studios.map((studio) => (
              <motion.div 
                layout
                key={studio.id} 
                className={`bg-white rounded-[3rem] border border-black/5 shadow-xl shadow-black/5 overflow-hidden flex flex-col group transition-all hover:shadow-2xl hover:border-black/10 ${studio.status === 'inactive' ? 'opacity-60 grayscale bg-slate-50' : ''}`}
              >
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img src={studio.image_url} alt={studio.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black ${studio.color_class || 'bg-white'} text-spot-charcoal uppercase tracking-[0.2em] shadow-lg backdrop-blur-md border border-white/20`}>
                      {studio.status}
                    </div>
                  </div>
                  {studio.featured && (
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-spot-pastel-yellow text-spot-charcoal flex items-center justify-center shadow-lg animate-pulse">
                      <Plus size={14} className="rotate-45" />
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-spot-red">{studio.category}</span>
                    <div className="h-px bg-black/5 flex-1" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-[0.9] group-hover:text-spot-red transition-colors">{studio.name}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {studio.is_online ? 
                      <span className="text-[9px] bg-sky-50 text-sky-600 px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border border-sky-100 flex items-center gap-2"><Globe size={12} /> Digital</span> : 
                      <span className="text-[9px] bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border border-slate-100 flex items-center gap-2"><MapPin size={12} /> Physical</span>
                    }
                    {studio.has_certificate && 
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2"><ShieldCheck size={12} /> Credentials</span>
                    }
                  </div>

                  <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-spot-charcoal/20">Base Fee</span>
                      <span className="font-display font-black text-lg text-spot-charcoal tracking-tighter">{studio.fee}</span>
                    </div>
                    <button 
                      onClick={() => openForm(studio)} 
                      className="w-12 h-12 bg-slate-50 text-spot-charcoal hover:text-white hover:bg-spot-charcoal rounded-2xl transition-all flex items-center justify-center shadow-sm"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-spot-charcoal/90 backdrop-blur-xl" 
                onClick={() => setIsModalOpen(false)} 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 30 }} 
                className="bg-white w-full max-w-6xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] border border-white/20"
              >
                <div className="p-10 border-b border-black/5 flex justify-between items-center bg-slate-50/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-spot-red mb-1">Architecture Workshop</span>
                    <h2 className="font-display font-black text-3xl text-spot-charcoal uppercase tracking-tighter leading-none">
                      {editingStudio ? 'Refine Experience' : 'Blueprint New Studio'}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-spot-red hover:text-white transition-all active:scale-90"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 space-y-16 hide-scrollbar custom-scrollbar">
                  
                  {/* Phase 1: Identity */}
                  <div className="space-y-10">
                    <SectionHeader num={1} label="Core Identity" />
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Studio Title</label>
                          <input name="name" required placeholder="The AI Storyteller's Lab" defaultValue={editingStudio?.name} className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-display font-black text-2xl tracking-tighter uppercase" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">URL ID (Slug)</label>
                          <input name="slug" required placeholder="ai-storytellers-lab" defaultValue={editingStudio?.slug} className="w-full px-6 py-4 rounded-2xl border border-black/5 font-mono text-xs text-spot-red focus:outline-none focus:border-spot-red" />
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Short Elevator Pitch</label>
                          <textarea name="description" placeholder="Building the next generation of narrative tech..." defaultValue={editingStudio?.description} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 text-sm h-20 focus:outline-none focus:border-spot-red italic font-medium" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Deep Narrative (Rich Content)</label>
                          <textarea name="long_description" placeholder="Expanded details for the deep dive..." defaultValue={editingStudio?.long_description} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 text-sm h-32 focus:outline-none focus:border-spot-red leading-relaxed" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: Logistics */}
                  <div className="space-y-10">
                    <SectionHeader num={2} label="Operational Framework" />
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                         <div className="grid grid-cols-2 gap-6 text-center">
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Launch Date</label>
                              <input type="date" name="start_date" defaultValue={editingStudio?.start_date} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 font-bold text-xs" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Finale Date</label>
                              <input type="date" name="end_date" defaultValue={editingStudio?.end_date} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 font-bold text-xs" />
                            </div>
                         </div>
                         <div className="grid grid-cols-3 gap-6">
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Total Hrs</label>
                               <input name="total_hours" placeholder="48h" defaultValue={editingStudio?.total_hours} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-xs" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Seat Limit</label>
                               <input type="number" name="total_seats" placeholder="20" defaultValue={editingStudio?.total_seats} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-xs" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Fee Plan</label>
                               <input name="fee" placeholder="₹5K/mo" defaultValue={editingStudio?.fee} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-xs" />
                            </div>
                         </div>
                         <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-black/5">
                            <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-6">
                              <CalendarDays size={16} /> Heartbeat (Operating Schedule)
                            </label>
                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                              {Object.keys(daysActive).map(day => (
                                <div key={day} className="flex flex-col gap-2">
                                  <button 
                                    type="button" 
                                    onClick={() => setDaysActive({...daysActive, [day]: {...daysActive[day], active: !daysActive[day].active}})}
                                    className={`w-full aspect-square rounded-2xl flex items-center justify-center text-[10px] font-black uppercase transition-all shadow-sm ${
                                      daysActive[day].active ? 'bg-spot-red text-white border-spot-red' : 'bg-white text-spot-charcoal/20 border-black/5'
                                    }`}
                                  >
                                    {day.slice(0, 3)}
                                  </button>
                                  <AnimatePresence>
                                    {daysActive[day].active && (
                                      <motion.input 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        placeholder="Time" 
                                        value={daysActive[day].time} 
                                        onChange={(e) => setDaysActive({...daysActive, [day]: {...daysActive[day], time: e.target.value}})}
                                        className="w-full text-[8px] text-center p-2 bg-white rounded-lg border border-black/5 focus:outline-none focus:border-spot-red"
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                         </div>
                      </div>
                      <div className="space-y-8">
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Studio Domain</label>
                            <select name="category" required defaultValue={editingStudio?.category || ''} className="w-full px-8 py-5 rounded-2xl border border-black/5 font-black uppercase text-xs tracking-widest bg-spot-pastel-yellow/20">
                              <option value="">Select Domain</option>
                              <option value="Creative Arts">Creative Arts</option>
                              <option value="Engineering & Making">Engineering & Making</option>
                              <option value="Science & Nature">Science & Nature</option>
                              <option value="Digital Narrative">Digital Narrative</option>
                              <option value="Social Innovation">Social Innovation</option>
                            </select>
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Target Age</label>
                               <input name="age_group" placeholder="9-14 Years" defaultValue={editingStudio?.age_group} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 font-bold text-xs" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Theme Color</label>
                               <select name="color_class" defaultValue={editingStudio?.color_class || 'bg-spot-pastel-green'} className="w-full px-6 py-4 rounded-2xl border border-black/5 font-bold text-xs">
                                 <option value="bg-spot-pastel-green">Pastel Green</option>
                                 <option value="bg-spot-pastel-blue">Pastel Blue</option>
                                 <option value="bg-spot-pastel-yellow">Pastel Yellow</option>
                                 <option value="bg-spot-cream">Cream</option>
                               </select>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 3: Curriculum */}
                  <div className="space-y-10">
                    <SectionHeader num={3} label="The Journey (Modules)" />
                    <div className="grid md:grid-cols-2 gap-8">
                      {modules.map((m, i) => (
                        <div key={i} className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-black/5 relative group hover:border-spot-red/20 transition-all">
                          <button type="button" onClick={() => setModules(modules.filter((_, idx) => idx !== i))} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-spot-charcoal/20 hover:text-spot-red hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                          <div className="flex items-center gap-3 mb-6">
                             <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[10px] font-black text-spot-charcoal shadow-sm">M{i+1}</div>
                             <input placeholder="Module Objective" value={m.title} onChange={(e) => { const newM = [...modules]; newM[i].title = e.target.value; setModules(newM); }} className="flex-1 bg-transparent border-b border-black/5 p-2 font-black uppercase text-xs focus:outline-none focus:border-spot-red" />
                          </div>
                          <textarea placeholder="Explorations, experiments, and outcomes..." value={m.content} onChange={(e) => { const newM = [...modules]; newM[i].content = e.target.value; setModules(newM); }} className="w-full bg-transparent p-2 text-xs h-32 focus:outline-none leading-relaxed italic" />
                        </div>
                      ))}
                      <button 
                        type="button" 
                        onClick={() => setModules([...modules, {title: '', content: ''}])} 
                        className="h-full min-h-[200px] border-2 border-dashed border-black/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-spot-charcoal/20 hover:border-spot-red hover:text-spot-red transition-all group"
                      >
                        <Plus size={32} className="group-hover:rotate-90 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add New Phase</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <SectionHeader num={4} label="Visual DNA & Impact" />
                    <div className="grid lg:grid-cols-2 gap-12">
                      <ImageUpload label="Main Showcase Asset" value={imageUrl} onChange={setImageUrl} maxSizeKB={500} />
                      <div className="space-y-10">
                        <TagInput label="Key Outcomes (Headline Boxes)" tags={keyOutcomes} onChange={setKeyOutcomes} maxTags={5} placeholder="e.g. Creative Coder, Problem Solver" />
                        <TagInput label="Skills to Master (Comma Separated)" tags={skills} onChange={setSkills} maxTags={10} placeholder="e.g. LLM Interaction, Rapid Prototyping" />
                        
                        <div className="bg-slate-50/50 p-8 rounded-[3rem] border border-black/5">
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">Facilitator Spotlight</label>
                           <div className="space-y-4">
                             {facilitators.map((f, i) => (
                               <div key={i} className="p-6 bg-white rounded-3xl border border-black/5 relative group">
                                 <button type="button" onClick={() => setFacilitators(facilitators.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-spot-charcoal/20 hover:text-spot-red transition-colors opacity-0 group-hover:opacity-100">
                                   <Trash2 size={14} />
                                 </button>
                                 <input placeholder="Facilitator Name" value={f.name} onChange={(e) => { const newF = [...facilitators]; newF[i].name = e.target.value; setFacilitators(newF); }} className="w-full bg-transparent border-b border-black/5 pb-2 mb-3 font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-spot-red" />
                                 <textarea placeholder="Bio & Expertise..." value={f.bio} onChange={(e) => { const newF = [...facilitators]; newF[i].bio = e.target.value; setFacilitators(newF); }} className="w-full bg-transparent text-[10px] font-medium italic focus:outline-none" rows={2} />
                               </div>
                             ))}
                             <button type="button" onClick={() => setFacilitators([...facilitators, { name: '', bio: '' }])} className="w-full py-4 border-2 border-dashed border-black/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-spot-charcoal/30 hover:border-spot-red hover:text-spot-red transition-all">
                               + Add Mentor
                             </button>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-black/5 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-3">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Studio Mode</label>
                          <select name="mode" defaultValue={editingStudio?.is_online ? 'online' : 'offline'} className="w-full p-4 bg-white rounded-2xl font-black uppercase text-xs tracking-widest border border-black/5 shadow-sm">
                            <option value="offline">In-Person (Physical)</option>
                            <option value="online">Cloud-First (Online)</option>
                          </select>
                        </div>
                        <div className="flex flex-col justify-center">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="has_certificate" defaultChecked={editingStudio?.has_certificate} className="w-6 h-6 rounded-lg text-spot-red border-2 border-black/10 focus:ring-spot-red" />
                            <span className="text-xs font-black uppercase tracking-widest text-spot-charcoal group-hover:text-spot-red transition-colors">Digital Credentials</span>
                          </label>
                        </div>
                        <div className="flex flex-col justify-center border-l border-black/5 pl-8">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="featured" defaultChecked={editingStudio?.featured} className="w-6 h-6 rounded-lg text-spot-pastel-yellow border-2 border-black/10 focus:ring-spot-pastel-yellow" />
                            <span className="text-xs font-black uppercase tracking-widest text-spot-charcoal group-hover:text-spot-red transition-colors">Hero Status</span>
                          </label>
                        </div>
                        <div className="flex flex-col justify-center border-l border-black/5 pl-8">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="status" defaultChecked={editingStudio?.status !== 'inactive'} className="w-6 h-6 rounded-lg text-green-500 border-2 border-black/10 focus:ring-green-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-spot-charcoal group-hover:text-emerald-500 transition-colors">Publicly Live</span>
                          </label>
                        </div>
                    </div>
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

                  <div className="flex justify-end gap-6 pt-12">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-50 rounded-[2rem] transition-all flex items-center gap-2">
                       Dismiss
                    </button>
                    <button type="submit" disabled={isSaving} className="px-16 py-5 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl flex items-center gap-3 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                       {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} className="group-hover:translate-x-1 transition-transform" />}
                       <span className="relative">{editingStudio ? 'Sync Evolution' : 'Initialize Studio'}</span>
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
