import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Loader2, Calendar, Clock, Users, Image as ImageIcon, CheckCircle, Download, UserX, Ticket
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';

export const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states for dynamic logic
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Attendees Modal
  const [attendeesModalEventId, setAttendeesModalEventId] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [loadingAttendees, setLoadingAttendees] = useState(false);

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
    }
    setLoading(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingEvent) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image (Make sure "event-images" bucket exists and is public). Falling back to URL input.');
      console.error(uploadError);
    } else {
      const { data } = supabase.storage.from('event-images').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    }
    setUploadingImage(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) fetchEvents();
  };

  const openForm = (event: any = null) => {
    setEditingEvent(event);
    setTitle(event?.title || '');
    setSlug(event?.slug || '');
    setIsFree(event ? event.price === 'Free' || event.price === '0' || event.is_free : true);
    setImageUrl(event?.image_url || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const isFreeCheck = formData.get('is_free') === 'on';
    const priceValue = isFreeCheck ? 'Free' : formData.get('price');

    const eventData = {
      title: title,
      slug: slug,
      category: formData.get('category'),
      event_date: formData.get('event_date'),
      event_time: formData.get('event_time'),
      expiry_date: formData.get('expiry_date'),
      audience: formData.get('audience'),
      tags: formData.get('tags')?.toString().split(',').map(s => s.trim()) || [],
      location: formData.get('location'),
      is_free: isFreeCheck,
      price: priceValue,
      total_seats: parseInt(formData.get('total_seats') as string) || 0,
      image_url: imageUrl || formData.get('image_url_text'),
      description: formData.get('description'),
      about: formData.get('about'),
      featured: formData.get('featured') === 'on',
      status: formData.get('status') === 'on' ? 'active' : 'inactive',
    };

    let error;
    if (editingEvent) {
      const { error: updateError } = await supabase.from('events').update(eventData).eq('id', editingEvent.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('events').insert([eventData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving event:', error);
      alert('DB Error tracking missing columns? Please run the SQL schema update in Supabase if new columns are missing.');
    } else {
      setIsModalOpen(false);
      setEditingEvent(null);
      fetchEvents();
    }
    setIsSaving(false);
  };

  const openAttendees = async (eventId: string) => {
    setAttendeesModalEventId(eventId);
    setLoadingAttendees(true);
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (!error) {
      setAttendees(data || []);
    }
    setLoadingAttendees(false);
  };

  const updateAttendeeStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('event_registrations').update({ status }).eq('id', id);
    if (!error) {
      setAttendees(attendees.map(a => a.id === id ? { ...a, status } : a));
    }
  };

  const deleteAttendee = async (id: string) => {
    if (!confirm('Remove this attendee?')) return;
    const { error } = await supabase.from('event_registrations').delete().eq('id', id);
    if (!error) {
      setAttendees(attendees.filter(a => a.id !== id));
      fetchEvents(); // update count
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
    XLSX.writeFile(wb, `event_attendees_${attendeesModalEventId}.xlsx`);
  };

  const isCompleted = (expiryDate: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
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
            <p className="text-spot-charcoal/60 font-medium">Manage events, attendees, and waitlists.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="flex items-center gap-2 px-6 py-4 bg-spot-red text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20"
          >
            <Plus size={20} /> Add New Event
          </button>
        </div>

        <div className="bg-white rounded-[3rem] border border-black/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-black/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Event Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Schedule</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Seats & Price</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Status</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const completed = isCompleted(event.expiry_date);
                  const registered = registrations[event.id] || 0;
                  const seatText = event.total_seats ? `${registered} / ${event.total_seats} Sold` : `${registered} Registered`;

                  return (
                    <tr key={event.id} className={`border-b border-black/5 hover:bg-slate-50/50 transition-all group ${completed ? 'opacity-60' : ''}`}>
                      <td className="px-8 py-6 flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5">
                          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter">{event.title}</span>
                          <span className="text-[10px] font-bold text-spot-charcoal/40 italic flex items-center gap-1">
                            {event.audience} • {event.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-spot-charcoal flex items-center gap-2"><Calendar size={12} className="text-spot-red" /> {event.event_date || event.date_text}</span>
                        <span className="text-[10px] font-bold text-spot-charcoal/40 flex items-center gap-2"><Clock size={12} /> {event.event_time}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-spot-charcoal flex items-center gap-2 mb-1">
                          <Ticket size={12} /> {seatText}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-spot-charcoal">
                          {event.is_free || event.price === 'Free' ? 'Free' : event.price}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {completed ? (
                          <span className="px-3 py-1 bg-spot-charcoal/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-spot-charcoal/60">Completed</span>
                        ) : (
                          <span className="px-3 py-1 bg-spot-pastel-green/20 rounded-lg text-[9px] font-black uppercase tracking-widest text-green-700">Upcoming</span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => openAttendees(event.id)} className="p-2 text-spot-blue/60 hover:text-spot-blue transition-all" title="Attendees">
                            <Users size={18} />
                          </button>
                          <button onClick={() => openForm(event)} className="p-2 text-spot-charcoal/40 hover:text-spot-charcoal transition-all">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(event.id)} className="p-2 text-spot-charcoal/40 hover:text-spot-red transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Event Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-spot-charcoal/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-black/5 flex justify-between items-center bg-slate-50">
                  <h2 className="font-display font-black text-2xl text-spot-charcoal uppercase tracking-tighter">
                    {editingEvent ? 'Edit Event' : 'Create Event'}
                  </h2>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full"><X size={24} /></button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto">
                  
                  {/* Title & Slug */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Event Name</label>
                      <input name="title" required value={title} onChange={handleTitleChange} placeholder="E.g. Creative Coding Camp" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Auto Slug (URL)</label>
                      <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="creative-coding-camp" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-xs text-spot-red/80" />
                    </div>
                  </div>

                  {/* Schedule & Availability */}
                  <div className="grid md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-[2rem] border border-black/5">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Event Date</label>
                      <input type="date" name="event_date" required defaultValue={editingEvent?.event_date} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-medium text-sm focus:border-spot-red focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Time Slot</label>
                      <input type="time" name="event_time" required defaultValue={editingEvent?.event_time} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-medium text-sm focus:border-spot-red focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Expiry Date (Auto-completes after)</label>
                      <input type="date" name="expiry_date" required defaultValue={editingEvent?.expiry_date} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-medium text-sm focus:border-spot-red focus:outline-none text-spot-red/80" />
                    </div>
                  </div>

                  {/* Ticketing Options */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-black/5 space-y-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Pricing Option</label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="is_free" checked={isFree} onChange={() => setIsFree(!isFree)} className="w-5 h-5 rounded" />
                        <span className="text-sm font-bold">Free Event (Default)</span>
                      </label>
                      {!isFree && (
                        <input name="price" placeholder="Ticket Price (e.g. ₹5,000)" defaultValue={editingEvent?.price} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-medium text-sm focus:border-spot-red focus:outline-none" />
                      )}
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-black/5 space-y-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Seat Availability</label>
                      <input type="number" name="total_seats" placeholder="Max Tickets (e.g. 20)" defaultValue={editingEvent?.total_seats} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-medium text-sm focus:border-spot-red focus:outline-none" />
                      <p className="text-[10px] text-spot-charcoal/40 leading-tight">If tickets sell out, "Waitlist" button will show automatically.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-black/5 space-y-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Category & Location</label>
                      <select name="category" required defaultValue={editingEvent?.category || ''} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-bold text-xs uppercase focus:border-spot-red focus:outline-none">
                        <option value="">Select Category</option>
                        <option value="Kids Workshops">Kids Workshops</option>
                        <option value="Parent Sessions">Parent Sessions</option>
                        <option value="Camps">Camps</option>
                        <option value="School Programs">School Programs</option>
                        <option value="Community Events">Community Events</option>
                      </select>
                      <input name="location" required placeholder="Location / Online" defaultValue={editingEvent?.location || 'In Person - SPOT Studio'} className="w-full px-4 py-3 rounded-xl bg-white border border-black/5 font-medium text-sm focus:border-spot-red focus:outline-none" />
                    </div>
                  </div>

                  {/* Target & Image Upload */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Simplifed Info (Target & Tags)</label>
                      <input name="audience" placeholder="Target Audience (e.g. Ages 8-12)" defaultValue={editingEvent?.audience} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-medium focus:border-spot-red focus:outline-none" />
                      <input name="tags" placeholder="Filter Tags (comma separated. e.g. Design, Tech)" defaultValue={editingEvent?.tags?.join(', ')} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-medium text-xs focus:border-spot-red focus:outline-none" />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Event Banner Image</label>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-black/5 flex flex-col gap-3">
                        {imageUrl && <img src={imageUrl} alt="Preview" className="h-32 object-cover rounded-xl border border-black/10 w-full" />}
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-black/10 rounded-xl cursor-pointer hover:border-spot-red transition-all font-bold text-sm text-spot-charcoal/70">
                          {uploadingImage ? <Loader2 className="animate-spin" size={16} /> : <ImageIcon size={16} />}
                          <span>{uploadingImage ? 'Uploading...' : 'Upload Image to Supabase'}</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        <div className="text-center text-[10px] font-bold text-spot-charcoal/30">OR Paste URL</div>
                        <input name="image_url_text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2 rounded-xl bg-white border border-black/5 text-xs text-spot-charcoal/60" />
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Description & About</label>
                    <textarea name="description" required rows={2} placeholder="Short card description..." defaultValue={editingEvent?.description} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm leading-relaxed" />
                    <textarea name="about" rows={4} placeholder="Full event details for the event page..." defaultValue={editingEvent?.about} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm leading-relaxed" />
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-black/5">
                    <div className="flex gap-8">
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input type="checkbox" name="featured" defaultChecked={editingEvent?.featured} className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-red" />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter">Featured</span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer group">
                         <input type="checkbox" name="status" defaultChecked={editingEvent?.status !== 'off'} className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-pastel-green" />
                         <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter">Active (Live)</span>
                       </label>
                    </div>
                    
                    <div className="flex gap-4">
                       <button type="submit" disabled={isSaving || uploadingImage} className="px-10 py-4 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-spot-red transition-all shadow-xl haptic-feedback flex items-center gap-2">
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Event
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Attendees Modal */}
        <AnimatePresence>
          {attendeesModalEventId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-spot-charcoal/80 backdrop-blur-md" onClick={() => setAttendeesModalEventId(null)} />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-black/5 flex justify-between items-center bg-slate-50">
                  <div>
                    <h2 className="font-display font-black text-2xl text-spot-charcoal uppercase tracking-tighter mb-1">
                      Event Attendees
                    </h2>
                    <p className="text-sm font-bold text-spot-charcoal/40 uppercase tracking-widest">
                      {attendees.length} Registrations
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={exportToExcel} className="flex items-center gap-2 px-6 py-3 bg-spot-pastel-green text-green-800 font-bold text-sm rounded-xl hover:bg-green-200 transition-colors">
                      <Download size={16} /> Excel Export
                    </button>
                    <button onClick={() => setAttendeesModalEventId(null)} className="p-3 hover:bg-black/5 rounded-full"><X size={24} /></button>
                  </div>
                </div>

                <div className="p-8 overflow-y-auto">
                  {loadingAttendees ? (
                     <div className="flex justify-center py-20"><Loader2 className="animate-spin text-spot-red" size={40} /></div>
                  ) : attendees.length === 0 ? (
                     <div className="text-center py-20 text-spot-charcoal/40 font-bold">No attendees yet.</div>
                  ) : (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-black/10 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">
                          <th className="py-4">Parent Details</th>
                          <th className="py-4">Child Details</th>
                          <th className="py-4">Status & Waitlist</th>
                          <th className="py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendees.map(a => (
                          <tr key={a.id} className="border-b border-black/5 hover:bg-slate-50">
                            <td className="py-4">
                              <div className="font-bold text-sm">{a.user_name}</div>
                              <div className="text-xs text-spot-charcoal/60">{a.user_email}</div>
                              <div className="text-xs text-spot-charcoal/60">{a.user_phone}</div>
                            </td>
                            <td className="py-4">
                              <div className="font-bold text-sm">{a.child_name || 'N/A'}</div>
                              <div className="text-xs text-spot-charcoal/60">Age: {a.child_age || '-'}</div>
                            </td>
                            <td className="py-4">
                              <select 
                                value={a.status || 'pending'} 
                                onChange={(e) => updateAttendeeStatus(a.id, e.target.value)}
                                className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 focus:outline-none ${
                                  a.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                  a.status === 'waitlist' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                  'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="waitlist">Waitlist</option>
                                <option value="approved">Approved</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-4 text-right">
                              <button onClick={() => deleteAttendee(a.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Remove Attendee">
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
