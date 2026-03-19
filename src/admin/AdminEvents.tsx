import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Loader2, Calendar, Clock, Users, Download, UserX, Ticket, LayoutGrid, CalendarDays, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import { ImageUpload, TagInput, SectionHeader } from './components/AdminInputs';

export const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [keyOutcomes, setKeyOutcomes] = useState<string[]>([]);
  const [facilitators, setFacilitators] = useState<{name: string, bio: string}[]>([]);

  // Attendees Modal
  const [attendeesModalEventId, setAttendeesModalEventId] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loadingAttendees, setLoadingAttendees] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
      
      // Fetch registration counts
      if (data && data.length > 0) {
        const { data: regData } = await supabase
          .from('event_registrations')
          .select('event_id');
        
        if (regData) {
          const counts: Record<string, number> = {};
          regData.forEach(reg => {
            counts[reg.event_id] = (counts[reg.event_id] || 0) + 1;
          });
          setRegistrations(counts);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingEvent) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const openForm = (event: any = null) => {
    setEditingEvent(event);
    setTitle(event?.title || '');
    setSlug(event?.slug || '');
    setIsFree(event ? event.price === 'Free' || event.price === '0' || event.is_free : true);
    setImageUrl(event?.image_url || '');
    setTags(event?.tags || []);
    setKeyOutcomes(event?.key_outcomes || []);
    setFacilitators(event?.facilitators || [{ name: '', bio: '' }]);
    setErrorStatus(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const isFreeCheck = isFree;
    const priceValue = isFreeCheck ? 'Free' : formData.get('price');

    const eventData = {
      title,
      slug,
      category: formData.get('category'),
      event_date: formData.get('event_date') || null,
      event_time: formData.get('event_time') || null,
      expiry_date: formData.get('expiry_date') || null,
      audience: formData.get('audience'),
      tags,
      location: formData.get('location'),
      is_free: isFreeCheck,
      price: priceValue,
      total_seats: parseInt(formData.get('total_seats') as string) || 0,
      image_url: imageUrl,
      description: formData.get('description'),
      about: formData.get('about'),
      facilitators: facilitators.filter(f => f.name),
      key_outcomes: keyOutcomes,
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'active' : 'inactive',
    };

    try {
      let result;
      if (editingEvent) {
        result = await supabase.from('events').update(eventData).eq('id', editingEvent.id);
      } else {
        result = await supabase.from('events').insert([eventData]);
      }

      const { error: saveError } = result;

      if (saveError) {
        console.error('Supabase Error:', saveError);
        setErrorStatus(saveError.code === '23505' ? 'URL ID (Slug) must be unique.' : saveError.message);
        setIsSaving(false);
        return;
      }

      setIsModalOpen(false);
      fetchEvents();
    } catch (err: any) {
      console.error('Save error:', err);
      setErrorStatus(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const openAttendees = async (eventId: string) => {
    setAttendeesModalEventId(eventId);
    setLoadingAttendees(true);
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });

      if (!error) setAttendees(data || []);
    } catch (err) {
      console.error('Load attendees error:', err);
    } finally {
      setLoadingAttendees(false);
    }
  };

  const updateAttendeeStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from('event_registrations').update({ status }).eq('id', id);
      if (!error) {
        setAttendees(attendees.map(a => a.id === id ? { ...a, status } : a));
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const deleteAttendee = async (id: string) => {
    if (!confirm('Remove this attendee?')) return;
    try {
      const { error } = await supabase.from('event_registrations').delete().eq('id', id);
      if (!error) {
        setAttendees(attendees.filter(a => a.id !== id));
        fetchEvents(); // update count
      }
    } catch (err) {
      console.error('Delete attendee error:', err);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(attendees.map(a => ({
      Name: a.user_name,
      Email: a.user_email,
      Phone: a.user_phone,
      Status: a.status,
      Child_Name: a.child_name || 'N/A',
      Child_Age: a.child_age || 'N/A',
      Registered_At: new Date(a.created_at).toLocaleString()
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendees");
    XLSX.writeFile(wb, `event_attendees.xlsx`);
  };

  const isCompleted = (expiryDate: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-spot-red/10 flex items-center justify-center text-spot-red shadow-inner">
                <Ticket size={24} />
              </div>
              <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none">Event Pulse</h1>
            </div>
            <p className="text-spot-charcoal/60 font-medium text-sm">Orchestrate workshops, parent labs, and community gatherings.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="group flex items-center gap-3 px-8 py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl hover:scale-[1.02] active:scale-95"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Orchestrate New Event
          </button>
        </header>

        <div className="bg-white rounded-[3.5rem] border border-black/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-black/5">
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30">Atmosphere</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30">Timeline</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30">Market & Sales</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30">Presence</th>
                  <th className="px-10 py-8 text-right text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const completed = isCompleted(event.expiry_date);
                  const registered = registrations[event.id] || 0;
                  const seatText = event.total_seats ? `${registered} / ${event.total_seats}` : `${registered}`;

                  return (
                    <motion.tr 
                      layout
                      key={event.id} 
                      className={`border-b border-black/5 hover:bg-slate-50/50 transition-all group ${completed ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-20 h-14 rounded-2xl overflow-hidden shrink-0 border border-black/5 shadow-sm group-hover:scale-105 transition-transform duration-500">
                            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter leading-none mb-2 group-hover:text-spot-red transition-colors">{event.title}</span>
                            <div className="flex flex-wrap gap-2">
                               <span className="text-[9px] font-black text-spot-charcoal/30 uppercase tracking-widest">{event.audience}</span>
                               <span className="text-[9px] font-black text-spot-red/40 uppercase tracking-widest">• {event.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-black text-spot-charcoal flex items-center gap-2 tracking-tighter uppercase"><Calendar size={14} className="text-spot-red" /> {event.event_date}</span>
                          <span className="text-[10px] font-bold text-spot-charcoal/40 flex items-center gap-2 uppercase tracking-widest"><Clock size={12} /> {event.event_time}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-spot-charcoal/20">
                              <Ticket size={14} />
                            </div>
                            <span className="text-xs font-black text-spot-charcoal tracking-tighter uppercase">{seatText}</span>
                          </div>
                          <span className={`inline-block self-start px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                            event.is_free || event.price === 'Free' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-spot-charcoal border-black/5'
                          }`}>
                            {event.is_free || event.price === 'Free' ? 'Complimentary' : event.price}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        {completed ? (
                          <div className="flex items-center gap-2 text-spot-charcoal/40">
                             <div className="w-2 h-2 rounded-full bg-slate-300" />
                             <span className="text-[10px] font-black uppercase tracking-widest">Archived</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-500">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-widest">In Stream</span>
                          </div>
                        )}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openAttendees(event.id)} className="w-10 h-10 bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white rounded-xl transition-all flex items-center justify-center shadow-sm" title="Registry">
                            <Users size={16} />
                          </button>
                          <button onClick={() => openForm(event)} className="w-10 h-10 bg-slate-50 text-spot-charcoal hover:bg-spot-charcoal hover:text-white rounded-xl transition-all flex items-center justify-center shadow-sm" title="Redesign">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(event.id)} className="w-10 h-10 bg-slate-50 text-spot-charcoal hover:bg-spot-red hover:text-white rounded-xl transition-all flex items-center justify-center shadow-sm" title="Deconstruct">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Event Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-spot-charcoal/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 30 }} 
                className="bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] border border-white/20"
              >
                <div className="p-10 border-b border-black/5 flex justify-between items-center bg-slate-50/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-spot-red mb-1">Atmosphere Lab</span>
                    <h2 className="font-display font-black text-3xl text-spot-charcoal uppercase tracking-tighter leading-none">
                      {editingEvent ? 'Refine Gathering' : 'Blueprint New Event'}
                    </h2>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-spot-red hover:text-white transition-all active:scale-90 pb-0.5">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-12 space-y-16 hide-scrollbar custom-scrollbar">
                  
                  {/* Phase 1: Identity */}
                  <div className="space-y-10">
                    <SectionHeader num={1} label="Core Identity" />
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Event Signature (Title)</label>
                          <input name="title" required value={title} onChange={handleTitleChange} placeholder="Future Explorers Open House" className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-display font-black text-2xl tracking-tighter uppercase" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Public URL Slug</label>
                          <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-black/5 font-mono text-xs text-spot-red focus:outline-none" />
                        </div>
                      </div>
                      <div className="space-y-8">
                         <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Domain</label>
                              <select name="category" required defaultValue={editingEvent?.category || ''} className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-black/5 font-black uppercase text-[10px] tracking-widest">
                                <option value="">Select Domain</option>
                                <option value="Kids Workshops">Kids Workshops</option>
                                <option value="Parent Sessions">Parent Sessions</option>
                                <option value="Camps">Camps</option>
                                <option value="Community Events">Community Events</option>
                              </select>
                            </div>
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Target Audience</label>
                               <input name="audience" required placeholder="Ages 8-12" defaultValue={editingEvent?.audience} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-[10px] uppercase tracking-widest" />
                            </div>
                         </div>
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Location Signature</label>
                            <input name="location" required placeholder="SPOT Studio, Bangalore" defaultValue={editingEvent?.location || 'In Person - SPOT Studio'} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-[10px] uppercase tracking-widest" />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: Timeline */}
                  <div className="space-y-10">
                    <SectionHeader num={2} label="Temporal Logic" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50/50 p-10 rounded-[3rem] border border-black/5">
                      <div>
                        <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">
                          <Calendar size={16} /> Heartbeat (Date)
                        </label>
                        <input type="date" name="event_date" required defaultValue={editingEvent?.event_date} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 font-bold text-xs" />
                      </div>
                      <div>
                        <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">
                          <Clock size={16} /> Resonance (Time)
                        </label>
                        <input type="time" name="event_time" required defaultValue={editingEvent?.event_time} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 font-bold text-xs" />
                      </div>
                      <div>
                        <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">
                          <CalendarDays size={16} /> Expiry (Archive Date)
                        </label>
                        <input type="date" name="expiry_date" required defaultValue={editingEvent?.expiry_date} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 font-bold text-xs text-spot-red" />
                      </div>
                    </div>
                  </div>

                  {/* Phase 3: Sales Logic */}
                  <div className="space-y-10">
                    <SectionHeader num={3} label="Market Framework" />
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-black/5 space-y-8">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Admission Control</label>
                        <div className="flex items-center gap-8">
                           <button 
                             type="button" 
                             onClick={() => setIsFree(true)}
                             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isFree ? 'bg-spot-charcoal text-white shadow-xl scale-105' : 'bg-white text-spot-charcoal/40 border border-black/5'}`}
                           >
                             Complimentary
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setIsFree(false)}
                             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!isFree ? 'bg-spot-red text-white shadow-xl scale-105' : 'bg-white text-spot-charcoal/40 border border-black/5'}`}
                           >
                             Paid Access
                           </button>
                        </div>
                        <AnimatePresence>
                          {!isFree && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4">
                               <input name="price" required placeholder="₹ Token Amount (Ex: ₹2,500)" defaultValue={editingEvent?.price} className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-spot-red/20 font-black text-xs text-spot-red uppercase tracking-widest focus:outline-none focus:border-spot-red shadow-inner" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-black/5 flex flex-col justify-between">
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">Capacity Threshold</label>
                            <input type="number" name="total_seats" placeholder="Infinity" defaultValue={editingEvent?.total_seats} className="w-full px-8 py-6 rounded-[2rem] bg-white border border-black/5 font-display font-black text-3xl tracking-tighter text-spot-charcoal focus:outline-none focus:border-spot-red shadow-sm" />
                         </div>
                         <p className="text-[10px] font-bold text-spot-charcoal/30 uppercase tracking-[0.1em] leading-relaxed mt-4 flex items-center gap-3">
                           <LayoutGrid size={12} />
                           System automatically triggers waitlist mechanism upon saturation.
                         </p>
                      </div>
                    </div>
                  </div>

                  {/* Phase 4: Narratives */}
                  <div className="space-y-10">
                    <SectionHeader num={4} label="The Pulse (Content)" />
                    <div className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-10">
                         <ImageUpload label="Hero Visual" value={imageUrl} onChange={setImageUrl} maxSizeKB={500} />
                         <TagInput label="Stream Filters (Discovery)" tags={tags} onChange={setTags} maxTags={5} placeholder="Design, Tech, Art..." />
                      </div>
                      <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-black/5">
                        <div className="space-y-8">
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Architect's Note (Short)</label>
                           <textarea name="description" required rows={3} placeholder="Condensed resonance of the gathering..." defaultValue={editingEvent?.description} className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 text-sm font-medium italic leading-relaxed" />
                        </div>
                        <div className="space-y-8">
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">The Full Narrative (Deep)</label>
                           <textarea name="about" rows={5} placeholder="Detailed resonance for those who seek the deep dive..." defaultValue={editingEvent?.about} className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 text-sm font-medium leading-relaxed" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 5: Support Structures */}
                    <div className="space-y-10">
                      <SectionHeader num={5} label="Ground Support" />
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">The Mentors</label>
                          <div className="space-y-4">
                            {facilitators.map((f, i) => (
                              <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-black/5 relative group">
                                <button type="button" onClick={() => setFacilitators(facilitators.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-spot-charcoal/20 hover:text-spot-red transition-colors opacity-0 group-hover:opacity-100">
                                  <Trash2 size={14} />
                                </button>
                                <input placeholder="Facilitator Name" value={f.name} onChange={(e) => { const newF = [...facilitators]; newF[i].name = e.target.value; setFacilitators(newF); }} className="w-full bg-transparent border-b border-black/5 pb-2 mb-3 font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-spot-red" />
                                <textarea placeholder="Expertise Resonance..." value={f.bio} onChange={(e) => { const newF = [...facilitators]; newF[i].bio = e.target.value; setFacilitators(newF); }} className="w-full bg-transparent text-[10px] font-medium italic focus:outline-none" rows={2} />
                              </div>
                            ))}
                            <button type="button" onClick={() => setFacilitators([...facilitators, { name: '', bio: '' }])} className="w-full py-4 border-2 border-dashed border-black/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-spot-charcoal/30 hover:border-spot-red hover:text-spot-red transition-all">
                              + Add Mentor
                            </button>
                          </div>
                        </div>
                        <div className="space-y-6">
                           <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Projected Outcomes</label>
                           <TagInput label="" tags={keyOutcomes} onChange={setKeyOutcomes} maxTags={5} placeholder="Visual Thinking..." />
                        </div>
                      </div>

                    <div className="flex flex-wrap gap-12 items-center justify-center p-10 bg-spot-charcoal rounded-[3rem] shadow-2xl">
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <input type="checkbox" name="featured" defaultChecked={editingEvent?.featured} className="w-8 h-8 rounded-xl text-spot-red border-2 border-white/20 focus:ring-0 bg-transparent transition-all" />
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-spot-red">Spotlight Resonance</span>
                        </label>
                        <div className="w-px h-8 bg-white/10" />
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <input type="checkbox" name="status" defaultChecked={editingEvent?.status !== 'inactive'} className="w-8 h-8 rounded-xl text-emerald-500 border-2 border-white/20 focus:ring-0 bg-transparent transition-all" />
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-emerald-500">Universal Broadcast</span>
                        </label>
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
                       <span className="relative">{editingEvent ? 'Synchronize Resonance' : 'Initiate Broadcast'}</span>
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Attendees Modal (Registry) */}
        <AnimatePresence>
          {attendeesModalEventId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-spot-charcoal/95 backdrop-blur-2xl" onClick={() => setAttendeesModalEventId(null)} />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 30 }} 
                className="bg-white w-full max-w-6xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] border border-white/10"
              >
                <div className="p-12 border-b border-black/5 flex justify-between items-end bg-slate-50/50">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-spot-red mb-3 block">Citizen Registry</span>
                    <h2 className="font-display font-black text-4xl text-spot-charcoal uppercase tracking-tighter leading-none mb-4">
                      {attendees.length} Registrations
                    </h2>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-spot-charcoal/40">Approved: {attendees.filter(a => a.status === 'approved').length}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-spot-charcoal/40">Waitlist: {attendees.filter(a => a.status === 'waitlist').length}</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={exportToExcel} className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                      <Download size={18} /> Deep Export (XLSX)
                    </button>
                    <button onClick={() => setAttendeesModalEventId(null)} className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-black/5 transition-all text-spot-charcoal active:scale-90">
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="p-12 overflow-y-auto custom-scrollbar">
                  {loadingAttendees ? (
                     <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <div className="w-10 h-10 border-4 border-black/5 border-t-spot-red rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/20">Decrypting Registry...</span>
                     </div>
                  ) : attendees.length === 0 ? (
                     <div className="text-center py-32 space-y-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-spot-charcoal/10">
                           <Users size={40} />
                        </div>
                        <p className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-charcoal/20">The registry is currently void.</p>
                     </div>
                  ) : (
                    <table className="w-full text-left border-separate border-spacing-y-4">
                      <thead>
                        <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/20">
                          <th className="px-6 pb-4">Architect (Parent)</th>
                          <th className="px-6 pb-4">Explorer (Child)</th>
                          <th className="px-6 pb-4">Flow State</th>
                          <th className="px-6 pb-4 text-right">Deconstruct</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendees.map(a => (
                          <tr key={a.id} className="group">
                            <td className="px-6 py-6 bg-slate-50/50 rounded-l-[2rem] border-y border-l border-black/5 transition-all group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 group-hover:border-black/10">
                              <div className="font-black text-sm text-spot-charcoal uppercase tracking-tighter mb-1">{a.user_name}</div>
                              <div className="text-[10px] font-bold text-spot-charcoal/40 uppercase tracking-widest">{a.user_email} • {a.user_phone}</div>
                            </td>
                            <td className="px-6 py-6 bg-slate-50/50 border-y border-black/5 transition-all group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 group-hover:border-black/10">
                              <div className="font-black text-sm text-spot-charcoal uppercase tracking-tighter mb-1">{a.child_name || 'N/A'}</div>
                              <div className="text-[10px] font-bold text-spot-charcoal/40 uppercase tracking-widest">Horizon: {a.child_age || '-'} Cycles</div>
                            </td>
                            <td className="px-6 py-6 bg-slate-50/50 border-y border-black/5 transition-all group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 group-hover:border-black/10">
                              <select 
                                value={a.status || 'pending'} 
                                onChange={(e) => updateAttendeeStatus(a.id, e.target.value)}
                                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 transition-all focus:outline-none appearance-none cursor-pointer ${
                                  a.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                  a.status === 'waitlist' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                  'bg-slate-100 text-slate-400 border-black/5'
                                }`}
                              >
                                <option value="pending">Initiated</option>
                                <option value="waitlist">Stasis (Waitlist)</option>
                                <option value="approved">Authenticated</option>
                                <option value="cancelled">Voided</option>
                              </select>
                            </td>
                            <td className="px-6 py-6 bg-slate-50/50 rounded-r-[2rem] border-y border-r border-black/5 text-right transition-all group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 group-hover:border-black/10">
                              <button onClick={() => deleteAttendee(a.id)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-300 hover:bg-red-500 hover:text-white hover:shadow-xl hover:shadow-red-500/20 transition-all opacity-0 group-hover:opacity-100 mx-auto mr-0">
                                <UserX size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
