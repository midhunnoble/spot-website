import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
}

export const BookingModal = ({ isOpen, onClose, eventTitle = 'SPOT Event' }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    seats: '1',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', { ...formData, eventSelected: eventTitle });
    // Handle submission logic here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        childName: '',
        childAge: '',
        seats: '1',
        notes: ''
      });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-spot-charcoal/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-spot-cream rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 sm:p-8 border-b border-black/5 flex justify-between items-center shrink-0">
              <div>
                <h2 className="font-display font-black text-2xl text-spot-charcoal">Book Your Spot</h2>
                <p className="text-spot-charcoal/60 text-sm mt-1">{eventTitle}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-spot-charcoal" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto hide-scrollbar">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-spot-pastel-green rounded-full flex items-center justify-center text-spot-charcoal mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-display font-black text-3xl text-spot-charcoal mb-4">Request Received!</h3>
                  <p className="text-spot-charcoal/70 text-lg">
                    Thank you for your interest. We'll be in touch shortly to confirm your booking for {eventTitle}.
                  </p>
                </motion.div>
              ) : (
                <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-bold text-spot-charcoal mb-1">Full Name *</label>
                  <input required type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="Jane Doe" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-spot-charcoal mb-1">Email *</label>
                    <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-spot-charcoal mb-1">Phone *</label>
                    <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="childName" className="block text-sm font-bold text-spot-charcoal mb-1">Child's Name (Optional)</label>
                    <input type="text" id="childName" name="childName" value={formData.childName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="Alex" />
                  </div>
                  <div>
                    <label htmlFor="childAge" className="block text-sm font-bold text-spot-charcoal mb-1">Child's Age (Optional)</label>
                    <input type="text" id="childAge" name="childAge" value={formData.childAge} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all" placeholder="10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="eventSelected" className="block text-sm font-bold text-spot-charcoal mb-1">Event Selected *</label>
                    <input required type="text" id="eventSelected" name="eventSelected" value={eventTitle} readOnly className="w-full px-4 py-3 rounded-xl border border-black/10 bg-black/5 focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all cursor-not-allowed text-spot-charcoal/60" />
                  </div>
                  <div>
                    <label htmlFor="seats" className="block text-sm font-bold text-spot-charcoal mb-1">Seats *</label>
                    <select id="seats" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all">
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5+ People</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-bold text-spot-charcoal mb-1">Notes / Questions</label>
                  <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-spot-red/20 focus:border-spot-red transition-all resize-none" placeholder="Any special requirements or questions?"></textarea>
                </div>
              </form>
              )}
            </div>

            {!isSubmitted && (
              <div className="p-6 sm:p-8 border-t border-black/5 bg-white shrink-0">
                <button 
                  type="submit" 
                  form="booking-form"
                  className="w-full py-4 bg-spot-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20"
                >
                  Reserve My Spot
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
