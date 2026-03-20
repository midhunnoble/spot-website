import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId?: string;
  eventTitle?: string;
  eventPrice?: string;
  isWaitlist?: boolean;
}

export const BookingModal = ({ isOpen, onClose, eventId, eventTitle = 'SPOT Event', eventPrice = '', isWaitlist = false }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    seats: '1',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s+()-]{10,20}$/;
    
    if (!emailRegex.test(formData.email)) {
      alert("Please provide a valid email so we can reach you.");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Please provide a valid phone number so we can stay connected.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      if (eventId) {
        const { error: regError } = await supabase
          .from('event_registrations')
          .insert([{
            event_id: eventId,
            user_name: formData.fullName,
            user_email: formData.email,
            user_phone: formData.phone,
            child_name: formData.childName,
            child_age: formData.childAge,
            seats: parseInt(formData.seats) || 1,
            status: isWaitlist ? 'waitlist' : 'pending',
            notes: formData.notes
          }]);
        if (regError) {
          console.warn('Event registration insert failed, fallback to leads tracking', regError);
        }
      }

      // Keep leads tracking for overall CRM purposes
      const { error } = await supabase
        .from('leads')
        .insert([{
          type: eventTitle.toLowerCase().includes('tour') ? 'tour' : 'event_booking',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          metadata: {
            child_name: formData.childName,
            child_age: formData.childAge,
            seats: formData.seats,
            event_title: eventTitle,
            event_id: eventId,
            is_waitlist: isWaitlist,
            event_price: eventPrice,
            notes: formData.notes
          }
        }]);

      if (error) throw error;

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          fullName: '', email: '', phone: '', childName: '', childAge: '', seats: '1', notes: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Error submitting booking:', err);
      alert('We hit a small snag. Please try again or reach out to us directly!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-spot-charcoal/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-spot-cream rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-black/5 flex justify-between items-center shrink-0">
              <div>
                <h2 className="font-display font-black text-2xl text-spot-charcoal">
                  {isWaitlist ? 'Join Waitlist' : 'Save Your Spot'}
                </h2>
                <p className="text-spot-charcoal/60 text-sm mt-1">{eventTitle}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X size={24} className="text-spot-charcoal" /></button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto hide-scrollbar">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-spot-pastel-green rounded-full flex items-center justify-center text-spot-charcoal mb-6">
                    <CheckCircle size={40} className="text-spot-charcoal" />
                  </div>
                  <h3 className="font-display font-black text-3xl text-spot-charcoal mb-4">You're in!</h3>
                  <p className="text-spot-charcoal/70 text-lg">
                    {isWaitlist ? `You've been added to the waitlist for ${eventTitle}. We'll notify you if a spot opens up.` : `We've received your request for ${eventTitle}. We'll be in touch very soon to confirm everything.`}
                  </p>
                </motion.div>
              ) : (
                <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-spot-charcoal mb-1">Your Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="Jane Doe" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-spot-charcoal mb-1">Email *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-spot-charcoal mb-1">Phone *</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-spot-charcoal mb-1">Child's Name</label>
                      <input type="text" name="childName" value={formData.childName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="Alex" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-spot-charcoal mb-1">Child's Age</label>
                      <input type="text" name="childAge" value={formData.childAge} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-spot-charcoal mb-1">Selected Event</label>
                      <input required type="text" value={eventTitle} readOnly className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/5 focus:outline-none cursor-not-allowed text-spot-charcoal/60" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-spot-charcoal mb-1">Number of People *</label>
                      <select name="seats" value={formData.seats} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all">
                        <option value="1">1 Person</option><option value="2">2 People</option><option value="3">3 People</option><option value="4">4 People</option><option value="5">5+ People</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-spot-charcoal mb-1">Anything else we should know?</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all resize-none" placeholder="Special requirements, interests, or questions..."></textarea>
                  </div>
                </form>
              )}
            </div>
            {!isSubmitted && (
              <div className="p-6 sm:p-8 border-t border-black/5 bg-white shrink-0">
                <button type="submit" form="booking-form" disabled={isSubmitting} className={`w-full py-4 text-white font-bold rounded-xl transition-colors text-lg shadow-lg flex items-center justify-center gap-2 ${isWaitlist ? 'bg-spot-charcoal hover:bg-black shadow-black/20' : 'bg-spot-red hover:bg-red-700 shadow-spot-red/20'} disabled:opacity-50`}>
                  {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Almost there...</> : (isWaitlist ? 'Join Waitlist' : 'Initialize Enrollment')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>

  );
};

// added generic CheckCircle icon helper here since it's not imported above
function CheckCircle(props: any) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
}
