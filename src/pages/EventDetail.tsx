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
  Loader2
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

        if (error) throw error;
        setEvent(data);
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
          <h2 className="text-4xl font-display font-black mb-6 uppercase">Event Not Found</h2>
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
            <h1 className="font-display text-6xl md:text-8xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.85] mb-10">
              {event.title}
            </h1>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <Calendar className="text-spot-red" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Date</div>
                     <div className="font-bold text-sm tracking-tighter italic whitespace-nowrap">{event.date_text}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <Clock className="text-spot-pastel-blue" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Time</div>
                     <div className="font-bold text-sm tracking-tighter italic">{event.event_time}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <MapPin className="text-spot-pastel-green" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Location</div>
                     <div className="font-bold text-sm tracking-tighter italic">{event.location}</div>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-lg border border-black/5">
                     <Users className="text-spot-pastel-pink" size={20} />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Audience</div>
                     <div className="font-bold text-sm tracking-tighter italic uppercase">{event.audience}</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 md:gap-24 mt-24">
         <div className="md:col-span-8 space-y-24">
            {/* About the Event */}
            <div>
               <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-spot-charcoal to-spot-charcoal/40 bg-clip-text text-transparent">About the Session</h2>
               <div className="prose prose-xl font-medium text-spot-charcoal/80 leading-relaxed italic">
                  <p>{event.about || event.description}</p>
               </div>
            </div>

            {/* Why Join */}
            <div className="bg-spot-charcoal rounded-[3rem] p-12 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-spot-red opacity-10 rounded-full blur-[100px]" />
               <h3 className="font-display text-3xl font-black uppercase tracking-tighter mb-10 text-spot-pastel-yellow">Why is this valuable?</h3>
               <p className="text-xl font-medium text-white/80 leading-relaxed mb-12">
                  {event.why_valuable || 'This event is designed to provide high-impact learning and community connection.'}
               </p>
               <div className="grid sm:grid-cols-2 gap-8">
                  {(event.differentiation ? [event.differentiation] : ["Expert-led curriculum", "Tangible take-aways", "Safe, inclusive space", "Future-focused methodology"]).map((point: string, i: number) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                           <CheckCircle2 size={14} className="text-spot-pastel-green" />
                        </div>
                        <div className="font-bold text-sm uppercase tracking-tighter leading-tight">{point}</div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Outcomes */}
            <div>
               <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-12">What you'll walk away with</h2>
               <div className="grid sm:grid-cols-2 gap-6">
                  {(event.outcomes || ["A deeper understanding", "New connections", "Actionable skills"]).map((outcome: string, i: number) => (
                     <div key={i} className="flex items-center gap-6 p-8 glass-morphism rounded-[2rem] border border-black/5">
                        <div className="w-12 h-12 bg-spot-pastel-blue/20 text-spot-pastel-blue rounded-2xl flex items-center justify-center shrink-0">
                           <Star size={24} fill="currentColor" />
                        </div>
                        <div className="font-black text-lg uppercase tracking-tighter leading-tight italic">{outcome}</div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Agenda Section */}
            {event.agenda && event.agenda.length > 0 && (
              <div>
                <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-12">The Agenda</h2>
                <div className="space-y-4">
                    {event.agenda.map((item: any, i: number) => (
                        <div key={i} className="flex gap-8 group">
                            <div className="w-24 shrink-0 font-display font-black text-spot-red text-xl py-6">{item.time}</div>
                            <div className="flex-1 p-6 glass-morphism rounded-3xl border border-black/5 group-hover:border-spot-red/30 transition-all">
                                <h4 className="font-black uppercase tracking-tighter text-lg mb-2">{item.title}</h4>
                                <p className="text-sm font-medium text-spot-charcoal/60 italic">{item.description}</p>
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
               <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-black/5 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-spot-pastel-green opacity-20 blur-3xl" />
                  
                  <div className="relative z-10">
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Registration Fee</div>
                     <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-display font-black">{event.price}</span>
                        {event.pricing?.original && <span className="text-xl font-bold opacity-30 line-through italic">{event.pricing.original}</span>}
                     </div>

                     <div className="space-y-4 mb-10">
                        {(event.pricing?.inclusive || ["Admission to Session", "Materials & Kit", "Post-session support"]).map((item: string, i: number) => (
                           <div key={i} className="flex items-center gap-3 text-xs font-bold italic text-spot-charcoal/60 uppercase">
                              <ShieldCheck size={14} className="text-spot-pastel-green" /> {item}
                           </div>
                        ))}
                     </div>

                     <button 
                       onClick={() => setIsBookingModalOpen(true)}
                       className="w-full py-6 bg-spot-red text-white font-black uppercase tracking-[0.2em] rounded-3xl text-sm hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20 active:scale-95 flex items-center justify-center gap-3"
                     >
                        Register Now <ChevronRight size={18} />
                     </button>
                  </div>
               </div>

               {/* Facilitator Card */}
               {event.facilitator?.name && (
                  <div className="p-8 glass-morphism rounded-[3rem] border border-black/5 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl">
                        <img src={event.facilitator.image || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"} alt={event.facilitator.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-spot-red mb-1">Facilitator</div>
                    <h4 className="font-display font-black text-xl uppercase tracking-tighter mb-2">{event.facilitator.name}</h4>
                    <p className="text-xs font-bold text-spot-charcoal/40 italic uppercase tracking-tighter mb-4">{event.facilitator.role}</p>
                    <p className="text-xs font-medium text-spot-charcoal/60 leading-relaxed italic">{event.facilitator.bio}</p>
                  </div>
               )}

               {/* Emergency/Help Card */}
               <div className="p-8 bg-spot-pastel-blue/10 rounded-[3rem] border border-spot-pastel-blue/20 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-spot-pastel-blue rounded-2xl flex items-center justify-center text-white mb-6">
                     <Info size={24} />
                  </div>
                  <h4 className="font-black uppercase tracking-tighter mb-2 italic">Need group bookings?</h4>
                  <p className="text-xs font-medium text-spot-charcoal/60 mb-6 italic">We offer special rates for schools and communities of 10+ learners.</p>
                  <a href="mailto:hello@spot.org" className="text-xs font-black uppercase tracking-widest text-spot-pastel-blue underline">Inquire Here</a>
               </div>
            </div>
         </aside>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        eventTitle={event.title}
      />
    </div>
  );
}
