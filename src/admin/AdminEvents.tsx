import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save,
  X,
  Loader2,
  Calendar,
  Clock,
  Users,
  Image as ImageIcon
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';

export const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
    } else {
      fetchEvents();
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const eventData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      date_text: formData.get('date_text'),
      event_time: formData.get('event_time'),
      audience: formData.get('audience'),
      location: formData.get('location'),
      price: formData.get('price'),
      image_url: formData.get('image_url'),
      description: formData.get('description'),
      about: formData.get('about'),
      why_valuable: formData.get('why_valuable'),
      differentiation: formData.get('differentiation'),
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'active' : 'inactive',
      // Handling jsonb fields as comma separated strings for now in admin UI simplicity
      who_is_for: formData.get('who_is_for')?.toString().split(',').map(s => s.trim()) || [],
      outcomes: formData.get('outcomes')?.toString().split(',').map(s => s.trim()) || [],
      pricing: { 
        original: formData.get('original_price'), 
        inclusive: formData.get('inclusive_items')?.toString().split(',').map(s => s.trim()) || [] 
      }
    };

    let error;
    if (editingEvent) {
      const { error: updateError } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', editingEvent.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('events')
        .insert([eventData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Check if slug is unique.');
    } else {
      setIsModalOpen(false);
      setEditingEvent(null);
      fetchEvents();
    }
    setIsSaving(false);
  };

  if (loading && events.length === 0) {
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
            <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none mb-2">Event Calendar</h1>
            <p className="text-spot-charcoal/60 font-medium">Manage workshops, camps, and sessions for the community.</p>
          </div>
          <button 
            onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-4 bg-spot-red text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20"
          >
            <Plus size={20} />
            Add New Event
          </button>
        </div>

        <div className="bg-white rounded-[3rem] border border-black/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-black/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Event Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Schedule</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Target</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-black/5 hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5">
                          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter">{event.title}</span>
                          <span className="text-[10px] font-bold text-spot-charcoal/40 italic">{event.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-spot-charcoal flex items-center gap-2"><Calendar size={12} className="text-spot-red" /> {event.date_text}</span>
                        <span className="text-[10px] font-bold text-spot-charcoal/40 flex items-center gap-2"><Clock size={12} /> {event.event_time}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-600">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-spot-charcoal/60 uppercase tracking-tighter flex items-center gap-2">
                        <Users size={14} /> {event.audience}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2 justify-end">
                        <button 
                          onClick={() => { setEditingEvent(event); setIsModalOpen(true); }}
                          className="p-2 text-spot-charcoal/40 hover:text-spot-charcoal transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-spot-charcoal/40 hover:text-spot-red transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                    {editingEvent ? 'Edit Event' : 'Schedule New Event'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Event Identity</label>
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            name="title" 
                            required 
                            placeholder="Event Title" 
                            defaultValue={editingEvent?.title}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium" 
                          />
                          <input 
                            name="slug" 
                            required 
                            placeholder="url-slug (no spaces)" 
                            defaultValue={editingEvent?.slug}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Narrative (Intro Card)</label>
                        <textarea 
                          name="description" 
                          required 
                          rows={2}
                          placeholder="Quick catchphrase for card..." 
                          defaultValue={editingEvent?.description}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm leading-relaxed" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Detailed About (Detail Page)</label>
                        <textarea 
                          name="about" 
                          rows={4}
                          placeholder="Rich content for the event page..." 
                          defaultValue={editingEvent?.about}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm leading-relaxed" 
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Date (Text)</label>
                          <input 
                            name="date_text" 
                            required 
                            placeholder="e.g. Oct 15, 2026" 
                            defaultValue={editingEvent?.date_text}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Time Slot</label>
                          <input 
                            name="event_time" 
                            required 
                            placeholder="e.g. 10 AM - 1 PM" 
                            defaultValue={editingEvent?.event_time}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                          />
                        </div>
                      </div>

                      <div className="p-6 bg-slate-50 rounded-2xl border border-black/5 space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Pricing Detail</label>
                        <div className="grid grid-cols-2 gap-4">
                           <input 
                             name="price" 
                             required 
                             placeholder="Selling Price (e.g. ₹5,000)" 
                             defaultValue={editingEvent?.price}
                             className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                           />
                           <input 
                             name="original_price" 
                             placeholder="Original (Strike-through)" 
                             defaultValue={editingEvent?.pricing?.original}
                             className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                           />
                        </div>
                        <input 
                           name="inclusive_items" 
                           placeholder="What's included? (comma separated)" 
                           defaultValue={editingEvent?.pricing?.inclusive?.join(', ')}
                           className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Logistic Location</label>
                        <input 
                          name="location" 
                          required 
                          placeholder="Location / Online" 
                          defaultValue={editingEvent?.location}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div>
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Value & Targets</label>
                           <textarea 
                             name="why_valuable" 
                             rows={2}
                             placeholder="Why is this valuable?" 
                             defaultValue={editingEvent?.why_valuable}
                             className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input 
                             name="who_is_for" 
                             placeholder="Who is this for? (comma separated)" 
                             defaultValue={editingEvent?.who_is_for?.join(', ')}
                             className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                           />
                           <input 
                             name="outcomes" 
                             placeholder="Outcomes (comma separated)" 
                             defaultValue={editingEvent?.outcomes?.join(', ')}
                             className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                           />
                        </div>
                     </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Classification</label>
                      <div className="grid grid-cols-2 gap-4">
                        <select 
                          name="category" 
                          required
                          defaultValue={editingEvent?.category || ''}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold text-[10px] uppercase tracking-widest"
                        >
                          <option value="">Category</option>
                          <option value="Kids Workshops">Kids Workshops</option>
                          <option value="Parent Sessions">Parent Sessions</option>
                          <option value="Educator Trainings">Educator Trainings</option>
                          <option value="Camps">Camps</option>
                          <option value="School Programs">School Programs</option>
                        </select>
                        <input 
                          name="audience" 
                          required 
                          placeholder="Target Audience" 
                          defaultValue={editingEvent?.audience}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Visual Heritage</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-spot-charcoal/30" size={20} />
                        <input 
                          name="image_url" 
                          required 
                          placeholder="Public Image URL" 
                          defaultValue={editingEvent?.image_url}
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-black/5">
                    <div className="flex gap-8">
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input 
                           type="checkbox" 
                           name="featured" 
                           defaultChecked={editingEvent?.featured}
                           className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-red focus:ring-spot-red transition-all" 
                         />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter group-hover:text-spot-red">Featured</span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input 
                           type="checkbox" 
                           name="status" 
                           defaultChecked={editingEvent?.status !== 'off'}
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
                        {editingEvent ? 'Update Event' : 'Launch Event'}
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
