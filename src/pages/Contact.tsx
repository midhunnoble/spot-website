import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';

export default function Contact() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <main className="pt-20 pb-20 bg-spot-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal mb-6 tracking-tighter">
            Let's <span className="text-spot-red">Connect</span>
          </h1>
          <p className="text-xl text-spot-charcoal/80 max-w-2xl mx-auto font-medium">
            Whether you're interested in our microschool, after-school studios, or just want to learn more about our philosophy, we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-black/5">
              <h2 className="font-display font-bold text-3xl mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-spot-pastel-pink rounded-full flex items-center justify-center text-spot-red shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                    <p className="text-spot-charcoal/70 leading-relaxed">
                      123 Curiosity Way<br />
                      Innovation District<br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-spot-pastel-blue rounded-full flex items-center justify-center text-spot-charcoal shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-spot-charcoal/70">hello@spotmicroschool.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-spot-pastel-yellow rounded-full flex items-center justify-center text-spot-charcoal shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-spot-charcoal/70">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendly Placeholder */}
            <div className="bg-spot-charcoal text-spot-cream p-8 md:p-12 rounded-[3rem] shadow-xl text-center">
              <h3 className="font-display font-bold text-2xl mb-4 text-spot-pastel-yellow">Schedule a Tour</h3>
              <p className="mb-8 text-spot-cream/80">Pick a time that works for you to visit our campus and see SPOT in action.</p>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors w-full shadow-lg shadow-spot-red/20"
              >
                Open Calendar
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-black/5">
            <h2 className="font-display font-bold text-3xl mb-8">Send a Message</h2>
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center h-full"
              >
                <div className="w-20 h-20 bg-spot-pastel-green rounded-full flex items-center justify-center text-spot-charcoal mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display font-black text-3xl text-spot-charcoal mb-4">Message Sent!</h3>
                <p className="text-spot-charcoal/70 text-lg">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-sm text-spot-charcoal/70 ml-2">Parent's Name</label>
                  <input type="text" placeholder="Jane Doe" className="w-full p-4 rounded-2xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red focus:ring-2 focus:ring-spot-red/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-spot-charcoal/70 ml-2">Email Address</label>
                  <input type="email" placeholder="jane@example.com" className="w-full p-4 rounded-2xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red focus:ring-2 focus:ring-spot-red/20 transition-all" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-sm text-spot-charcoal/70 ml-2">Phone Number</label>
                  <input type="tel" placeholder="(555) 000-0000" className="w-full p-4 rounded-2xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red focus:ring-2 focus:ring-spot-red/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-spot-charcoal/70 ml-2">Child's Age</label>
                  <select className="w-full p-4 rounded-2xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red focus:ring-2 focus:ring-spot-red/20 transition-all appearance-none">
                    <option value="">Select age...</option>
                    <option value="6-8">6-8 years old</option>
                    <option value="9-11">9-11 years old</option>
                    <option value="12-14">12-14 years old</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-spot-charcoal/70 ml-2">Program of Interest</label>
                <select className="w-full p-4 rounded-2xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red focus:ring-2 focus:ring-spot-red/20 transition-all appearance-none">
                  <option value="">Select program...</option>
                  <option value="microschool">Full-time Microschool</option>
                  <option value="studios">After-school Studios</option>
                  <option value="camps">Holiday Camps</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-sm text-spot-charcoal/70 ml-2">Your Message</label>
                <textarea rows={5} placeholder="Tell us a bit about your child and what you're looking for..." className="w-full p-4 rounded-2xl bg-spot-cream border border-black/10 focus:outline-none focus:border-spot-red focus:ring-2 focus:ring-spot-red/20 transition-all resize-none"></textarea>
              </div>

              <button className="w-full py-5 bg-spot-charcoal text-white font-bold rounded-2xl text-lg hover:bg-spot-red transition-colors flex items-center justify-center gap-2 shadow-lg">
                Send Message <Send size={20} />
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
      
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        eventTitle="Campus Tour"
      />
    </main>
  );
}
