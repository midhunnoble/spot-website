import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Loader2,
  Award,
  Globe
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BookingModal } from '../components/BookingModal';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
           // Try by slug if ID fails
           const { data: slugData, error: slugError } = await supabase
            .from('events')
            .select('*')
            .eq('slug', id)
            .single();
           if (slugError) throw slugError;
           setEvent(slugData);
        } else {
          setEvent(data);
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-spot-cream flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-spot-red animate-spin" />
        <p className="font-display font-black text-xl uppercase tracking-tighter text-spot-charcoal/40 tracking-widest">Loading Event Details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black mb-6 uppercase tracking-tighter">Event Not Found</h2>
          <Link to="/events" className="text-spot-red font-bold underline flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-spot-cream min-h-screen text-spot-charcoal selection:bg-spot-red selection:text-white pb-32">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none">
        <Link 
          to="/events" 
          className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full font-black uppercase text-xs tracking-widest shadow-xl hover:bg-spot-red hover:text-white transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Events
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24">
        <div className="absolute top-0 right-0 w-[60%] h-full z-0 opacity-20">
           <img 
             src={event.image_url} 
             alt={event.title} 
             className="w-full h-full object-cover grayscale blur-[2px]"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-spot-cream via-spot-cream/90 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-morphism border border-black/5 text-spot-red rounded-xl font-black uppercase text-[10px] tracking-widest mb-8">
              <Zap size={14} fill="currentColor" /> {event.category}
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-[80px] font-black uppercase tracking-tighter leading-[0.85] mb-10">
              {event.title}
            </h1>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <Calendar className="text-spot-red" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Date</div>
                     <div className="font-black text-sm tracking-tighter italic whitespace-nowrap leading-none">{event.event_date || event.date_text}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <Clock className="text-spot-pastel-blue" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Time</div>
                     <div className="font-black text-sm tracking-tighter italic leading-none">{event.event_time}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <MapPin className="text-spot-pastel-green" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Location</div>
                     <div className="font-black text-sm tracking-tighter italic leading-none">{event.location}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <Users className="text-spot-pastel-pink" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Audience</div>
                     <div className="font-black text-sm tracking-tighter italic uppercase leading-none">{event.audience}</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 md:gap-32 mt-24">
         <div className="md:col-span-8 space-y-24">
            {/* About the Event */}
            <div>
               <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                  <span className="w-12 h-1 bg-spot-red rounded-full" /> About the Session
               </h2>
               <div className="prose prose-xl font-medium text-spot-charcoal/80 leading-relaxed italic max-w-none">
                  <p className="whitespace-pre-line">{event.about || event.description}</p>
               </div>
            </div>

            {/* Key Outcomes */}
            {event.key_outcomes && event.key_outcomes.length > 0 && (
              <div>
                <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4 text-spot-blue">
                  <span className="w-12 h-1 bg-spot-pastel-blue rounded-full" /> Key Outcomes
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.key_outcomes.map((outcome: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-6 glass-morphism rounded-3xl border border-black/5 hover:bg-white transition-colors duration-500">
                      <div className="w-8 h-8 rounded-full bg-spot-pastel-green/20 text-spot-pastel-green flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="font-black text-xs uppercase tracking-widest">{outcome}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilitators Section */}
            {event.facilitators && event.facilitators.length > 0 && (
              <div className="pt-12 border-t border-black/5">
                 <h2 className="font-display text-3xl font-black uppercase tracking-tighter mb-12 flex items-center gap-4 text-spot-red">
                  <span className="w-12 h-1 bg-spot-red rounded-full" /> Led by
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {event.facilitators.map((f: any, i: number) => (
                    <div key={i} className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all h-full">
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-spot-charcoal/20 shrink-0 border border-black/5">
                        <Users size={32}/>
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xl uppercase tracking-tighter mb-2">{f.name}</h4>
                        <p className="text-[10px] font-bold text-spot-charcoal/40 uppercase tracking-widest leading-relaxed line-clamp-3">{f.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
         </div>

         <aside className="md:col-span-4">
            <div className="sticky top-32 space-y-8">
               {/* Registration Card */}
               <div className="bg-white p-10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-black/5 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-spot-pastel-green opacity-20 blur-3xl" />
                  
                  <div className="relative z-10">
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Registration Fee</div>
                     <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-display font-black text-spot-charcoal">{event.price || 'Free'}</span>
                        {event.price !== 'Free' && event.price !== '0' && <span className="text-sm font-black uppercase tracking-widest opacity-30 ml-2">per seat</span>}
                     </div>

                     <div className="space-y-4 mb-10">
                        {["Admission to Session", "Materials & Kit", "Post-session support"].map((item: string, i: number) => (
                           <div key={i} className="flex items-center gap-3 text-[10px] font-black italic text-spot-charcoal/60 uppercase tracking-widest">
                              <ShieldCheck size={14} className="text-spot-pastel-green" /> {item}
                           </div>
                        ))}
                     </div>

                     <button 
                       onClick={() => setIsBookingModalOpen(true)}
                       className="w-full py-6 bg-spot-red text-white font-black uppercase tracking-[0.2em] rounded-3xl text-sm hover:bg-black transition-all shadow-xl shadow-spot-red/20 active:scale-95 flex items-center justify-center gap-3"
                     >
                        Secure My Slot <ChevronRight size={18} />
                     </button>
                  </div>
               </div>

               {/* Help Card */}
               <div className="p-10 bg-spot-pastel-blue/10 rounded-[3rem] border border-spot-pastel-blue/20 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-spot-pastel-blue mb-6 shadow-sm">
                     <Info size={24} />
                  </div>
                  <h4 className="font-black uppercase tracking-tighter mb-2 italic text-lg">Group Bookings?</h4>
                  <p className="text-xs font-bold text-spot-charcoal/60 mb-8 italic uppercase tracking-tighter leading-relaxed">
                    We offer special rates for schools and communities of 10+ learners.
                  </p>
                  <a href="mailto:hello@spot.org" className="text-xs font-black uppercase tracking-[0.2em] text-spot-pastel-blue underline hover:text-blue-700 transition-colors">Inquire Now</a>
               </div>
            </div>
         </aside>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        eventTitle={event.title}
        eventId={event.id}
        eventPrice={event.price}
      />
    </div>
  );
}
