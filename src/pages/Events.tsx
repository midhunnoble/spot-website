import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Clock, Users, ArrowRight, ChevronDown, ChevronUp, Star, PlayCircle, Loader2, Rocket } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

const FORMATS = [
  { title: 'Workshops', desc: 'Hands-on, 2-3 hour sessions focused on a specific skill or project.' },
  { title: 'Weekend Intensives', desc: 'Deep dives into complex topics over a Saturday and Sunday.' },
  { title: 'Camps', desc: 'Multi-day holiday programs blending learning, play, and creation.' },
  { title: 'Parent Sessions', desc: 'Evening talks and workshops to support your child\'s learning journey.' },
  { title: 'Educator Trainings', desc: 'Professional development for forward-thinking teachers.' },
  { title: 'School Partner Events', desc: 'Custom programs designed for visiting school groups.' }
];

const FAQS = [
  { q: 'Who are SPOT events for?', a: 'We host events for children (ages 5-18), parents, educators, and school leaders. Each event specifies its target audience.' },
  { q: 'Are events beginner friendly?', a: 'Yes! Unless specifically noted as an "advanced" session, all our workshops are designed to be accessible to beginners.' },
  { q: 'Do parents attend with children?', a: 'It depends on the event. Most kids workshops are drop-off, but we also host family sessions where parents and children create together.' },
  { q: 'What is the refund policy?', a: 'Cancellations made 7 days prior to the event receive a full refund. Cancellations within 7 days receive a credit for a future event.' },
  { q: 'Do you offer school workshops?', a: 'Absolutely. We partner with schools to host field trips at SPOT or bring our facilitators to your campus.' }
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [selectedEventPrice, setSelectedEventPrice] = useState('');
  const [selectedEventWaitlist, setSelectedEventWaitlist] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // Data states
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const tabs = ['All Events', 'Completed Events', 'Kids Workshops', 'Parent Sessions', 'Camps', 'Community Events', 'Online', 'In Person'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    // Optimization: Select only needed fields for list view
    const [eventsResult, regResult] = await Promise.all([
      supabase
        .from('events')
        .select('id, title, slug, image_url, category, event_date, date_text, expiry_date, total_seats, price, description, audience, location, event_time, status')
        .eq('status', 'active')
        .order('created_at', { ascending: false }),
      supabase
        .from('event_registrations')
        .select('event_id')
    ]);

    if (eventsResult.data) {
      setEvents(eventsResult.data);
    }
    
    if (regResult.data) {
      const counts: Record<string, number> = {};
      regResult.data.forEach(reg => { counts[reg.event_id] = (counts[reg.event_id] || 0) + 1; });
      setRegistrations(counts);
    }
    setLoading(false);
  };

  const handleBookNow = (evt: any) => {
    setSelectedEventId(evt.id);
    setSelectedEventTitle(evt.title);
    setSelectedEventPrice(evt.price || 'Free');
    const soldSeats = registrations[evt.id] || 0;
    const isWaitlist = evt.total_seats > 0 && soldSeats >= evt.total_seats;
    setSelectedEventWaitlist(isWaitlist);
    setIsBookingModalOpen(true);
  };

  const isCompletedEvent = (expiryDate: string) => {
    if (!expiryDate) return false;
    // Set expiry to midnight of the following day for better UX
    return new Date(expiryDate) < new Date();
  };

  const upcomingEvents = events.filter(e => !isCompletedEvent(e.expiry_date));
  const pastEvents = events.filter(e => isCompletedEvent(e.expiry_date));

  const filteredUpcoming = upcomingEvents.filter(event => {
    const matchesTab = activeTab === 'All Events' || 
                       event.category === activeTab || 
                       (activeTab === 'Online' && event.location?.includes('Online')) ||
                       (activeTab === 'In Person' && event.location?.includes('In Person'));
    
    return matchesTab && matchesSearch(event);
  });

  const filteredPast = pastEvents.filter(event => {
    // If explicitly on 'Completed Events' tab, we show all past ones
    // Otherwise, we show them at the bottom if we're on 'All Events'
    if (activeTab === 'Completed Events') return matchesSearch(event);
    
    // For other tabs, only show past events if the tab matches
    const matchesTab = activeTab === 'All Events' || 
                       event.category === activeTab;
    
    return matchesTab && matchesSearch(event);
  });

  function matchesSearch(event: any) {
    const searchableText = `${event.title} ${event.description} ${event.category} ${event.tags?.join(' ') || ''}`.toLowerCase();
    return searchableText.includes(searchQuery.toLowerCase());
  }

  const featuredEvents = events.filter(e => e.featured && !isCompletedEvent(e.expiry_date));

  // Helper to format price with "₹"
  const formatPrice = (price: string) => {
    if (!price || price === '0' || price === 'Free') return 'Free';
    if (price.includes('Rs.') || price.includes('₹')) return price;
    // If it's a number, add the symbol
    if (!isNaN(Number(price))) return `₹${price}`;
    return price;
  };

  return (
    <main className="pt-20 pb-20">
      <SEO 
        title="SPOT Events | Workshops, Camps and Parent Sessions"
        description="Join SPOT for immersive workshops, parent training, and community events. Explore our upcoming programs in Bangalore and online."
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80" 
            alt="Children in a workshop" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spot-cream/80 via-spot-cream/90 to-spot-cream" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-spot-pastel-pink text-spot-red font-bold text-sm tracking-wider uppercase mb-6">
              Community Calendar
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl text-spot-charcoal tracking-tighter mb-6 leading-none">
              SPOT <span className="text-spot-red">Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-spot-charcoal/80 mb-10 max-w-2xl mx-auto font-medium">
              Workshops, trainings and experiences for curious children, parents, educators and schools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#featured" className="w-full sm:w-auto px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20 shadow-xl">
                Explore Upcoming Events
              </a>
              <a href="#host" className="w-full sm:w-auto px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10">
                Host an Event at SPOT
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Discover and Tabs */}
      <section id="discover" className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-spot-charcoal/40" size={20} />
            <input 
              type="text" 
              placeholder="Search workshops, topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-black/10 bg-white focus:outline-none focus:border-spot-red transition-colors font-medium"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter size={20} className="text-spot-charcoal/60" />
            <div className="relative group">
              <select className="w-full md:w-auto py-3 px-8 rounded-full border-2 border-black/10 bg-white focus:outline-none focus:border-spot-red font-medium appearance-none cursor-pointer">
                <option>Upcoming</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-spot-charcoal/40" size={16} />
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-spot-charcoal text-white shadow-md' 
                  : 'bg-white text-spot-charcoal/60 hover:bg-spot-pastel-yellow hover:text-spot-charcoal border border-black/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Events (Netflix Style) */}
      {!loading && (activeTab === 'All Events' || activeTab === 'Community Events') && searchQuery === '' && featuredEvents.length > 0 && (
        <section id="featured" className="relative py-24 md:py-32 overflow-hidden bg-spot-charcoal">
          {/* Background Text Overlay */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none select-none overflow-hidden whitespace-nowrap opacity-[0.03] z-0">
            <span className="font-display font-black text-[25vw] leading-none uppercase tracking-tighter text-white inline-block">
              SPOT EVENTS SPOT EVENTS SPOT EVENTS
            </span>
          </div>

          <div className="relative z-10 px-6 max-w-7xl mx-auto mb-12 flex items-end justify-between">
            <div className="space-y-2">
              <span className="text-spot-red font-black text-[10px] uppercase tracking-[0.5em] block">Must Attend</span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-7xl text-white uppercase tracking-tighter">Featured <span className="italic">Experiences.</span></h2>
            </div>
            <div className="hidden md:flex gap-4">
               {/* Controls could potentially go here if implementing manual scroll */}
            </div>
          </div>

          <div className="relative z-10 px-6 max-w-7xl mx-auto">
            <div className="flex gap-8 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory">
              {featuredEvents.map((event, index) => {
                const soldSeats = registrations[event.id] || 0;
                const isWaitlist = event.total_seats > 0 && soldSeats >= event.total_seats;

                return (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="flex-shrink-0 w-[85vw] md:w-[600px] group relative aspect-[16/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden snap-center cursor-pointer"
                  >
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-spot-charcoal/90 via-spot-charcoal/20 to-transparent" />
                    
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {event.category}
                      </span>
                      {isWaitlist && (
                        <span className="px-4 py-2 bg-spot-red text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12">
                      <div className="flex items-center gap-4 text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                         <span className="flex items-center gap-2"><Calendar size={14} className="text-spot-red" /> {event.event_date || event.date_text}</span>
                         {event.audience && <span className="flex items-center gap-2"><Users size={14} className="text-spot-pastel-blue" /> {event.audience}</span>}
                      </div>
                      <h3 className="font-display font-black text-2xl md:text-5xl text-white uppercase tracking-tighter leading-[0.85] mb-6">
                        <Link to={`/events/${event.slug || event.id}`}>{event.title}</Link>
                      </h3>
                      
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => { e.preventDefault(); handleBookNow(event); }}
                          className="px-8 py-4 bg-white text-spot-charcoal font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-spot-red hover:text-white transition-all transform active:scale-95"
                        >
                          {isWaitlist ? 'Join Waitlist' : 'Book Now'}
                        </button>
                        <Link 
                          to={`/events/${event.slug || event.id}`}
                          className="w-14 h-14 bg-white/10 backdrop-blur-3xl border border-white/20 text-white flex items-center justify-center rounded-full hover:bg-white hover:text-spot-charcoal transition-all"
                        >
                          <ArrowRight size={24} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div className="w-1 flex-shrink-0" />
            </div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
        </section>
      )}

      {/* Upcoming Events Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal uppercase tracking-tighter leading-none">
             {activeTab === 'All Events' ? 'Upcoming Programs' : `${activeTab}`}
           </h2>
           <div className="h-1 bg-spot-red flex-grow opacity-10 rounded-full" />
        </div>
        
        {loading ? (
           <div className="flex justify-center py-20"><Loader2 className="animate-spin text-spot-red" size={40} /></div>
        ) : filteredUpcoming.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUpcoming.map((event, index) => {
              const soldSeats = registrations[event.id] || 0;
              const isWaitlist = event.total_seats > 0 && soldSeats >= event.total_seats;

              return (
                <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5 border border-black/5 flex flex-col group hover:-translate-y-2 transition-all duration-500 hover:shadow-xl">
                  <div className="h-56 relative overflow-hidden">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-xl text-[10px] font-black text-spot-charcoal uppercase tracking-[0.2em] border border-black/5">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-spot-red mb-4">
                       <Calendar size={14} /> {event.event_date || event.date_text}
                    </div>
                    <h3 className="font-display font-black text-2xl text-spot-charcoal mb-4 leading-[0.9] uppercase tracking-tighter">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-8 flex-1">
                      <div className="flex items-start gap-3 text-sm font-medium text-spot-charcoal/60 leading-tight">
                        <Clock size={16} className="shrink-0 mt-0.5" /> {event.event_time}
                      </div>
                      {event.audience && <div className="flex items-start gap-3 text-sm font-medium text-spot-charcoal/60 leading-tight">
                        <Users size={16} className="shrink-0 mt-0.5" /> {event.audience}
                      </div>}
                      <div className="flex items-start gap-3 text-sm font-medium text-spot-charcoal/60 leading-tight">
                        <MapPin size={16} className="shrink-0 mt-0.5" /> {event.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-black/5 mb-6">
                      <span className="font-black text-2xl text-spot-charcoal tracking-tighter">
                        {formatPrice(event.price)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Link to={`/events/${event.slug || event.id}`} className="text-center px-4 py-4 bg-slate-50 text-spot-charcoal font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-100 transition-all border border-black/5">
                        Details
                      </Link>
                      <button 
                        onClick={() => handleBookNow(event)} 
                        className={`px-4 py-4 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-xl translate-y-0 active:translate-y-0.5 ${isWaitlist ? 'bg-spot-charcoal hover:bg-black' : 'bg-spot-red hover:bg-red-700 shadow-spot-red/20'}`}
                      >
                        {isWaitlist ? 'Waitlist' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : activeTab !== 'Completed Events' ? (
          <div className="text-center py-24 bg-white/50 rounded-[3rem] border border-black/5 backdrop-blur-xl">
             <Rocket className="mx-auto text-spot-charcoal/10 mb-8" size={64} />
            <p className="text-2xl text-spot-charcoal/40 font-bold uppercase tracking-tighter">No upcoming events right now.</p>
            <button onClick={() => { setActiveTab('All Events'); setSearchQuery(''); }} className="mt-6 px-10 py-4 bg-spot-charcoal text-white font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-spot-red transition-all">
              See All Program Formats
            </button>
          </div>
        ) : null}
      </section>

      {/* Past Events Section (Visible when on All Events or Completed Events) */}
      {!loading && (activeTab === 'All Events' || activeTab === 'Completed Events') && filteredPast.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-50/50 rounded-[4rem] border border-black/5 mb-24">
           <div className="flex items-center gap-4 mb-12">
              <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal/30 uppercase tracking-tighter leading-none italic">
                Past Experiences
              </h2>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 grayscale-[0.6] opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             {filteredPast.slice(0, activeTab === 'All Events' ? 3 : undefined).map((event, index) => (
                <div key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-black/5 flex flex-col filter blur-[0.5px] hover:blur-0 transition-all">
                  <div className="h-40 relative overflow-hidden opacity-50">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 pb-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/40 mb-3">{event.date_text} • {event.category}</div>
                    <h3 className="font-display font-black text-xl text-spot-charcoal/60 uppercase tracking-tighter leading-none mb-6">{event.title}</h3>
                    <Link to={`/events/${event.slug || event.id}`} className="text-[10px] font-black uppercase tracking-widest text-spot-red underline underline-offset-4">View Outcomes</Link>
                  </div>
                </div>
             ))}
           </div>
           
           {activeTab === 'All Events' && filteredPast.length > 3 && (
             <div className="mt-16 text-center">
                <button onClick={() => setActiveTab('Completed Events')} className="px-10 py-4 border-2 border-black/10 text-spot-charcoal font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-spot-charcoal hover:text-white transition-all">
                  View All Past Events
                </button>
             </div>
           )}
        </section>
      )}

      {/* Event Formats */}
      <section className="py-20 px-6 bg-spot-charcoal text-spot-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6">Ways to Experience SPOT</h2>
            <p className="text-xl text-spot-cream/70 max-w-2xl mx-auto">We design diverse learning formats to fit different schedules, ages, and learning goals.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMATS.map((format, index) => (
              <motion.div key={format.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="font-display font-black text-2xl text-spot-pastel-yellow mb-4">{format.title}</h3>
                <p className="text-spot-cream/80 leading-relaxed">{format.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Host an Event Section */}
      <section id="host" className="py-24 px-6 bg-spot-pastel-yellow/30 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-spot-pastel-pink/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="inline-block py-1 px-4 rounded-full bg-spot-charcoal text-white font-black text-[10px] uppercase tracking-[0.4em]">Partner with Us</span>
              <h2 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal uppercase tracking-tighter leading-[0.85]">
                Host Your <br />
                <span className="text-spot-red">Event</span> at SPOT
              </h2>
              <p className="text-xl md:text-2xl text-spot-charcoal/70 font-medium leading-tight max-w-xl text-pretty">
                From tech workshops to art intensives and community talks—our studios are designed for deep work and high-agency learning.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-8">
                <div className="glass-morphism-heavy p-6 rounded-3xl border border-white/40">
                  <div className="w-12 h-12 bg-spot-red/10 text-spot-red rounded-2xl flex items-center justify-center mb-4">
                    <Rocket size={24} />
                  </div>
                  <h4 className="font-black text-spot-charcoal mb-2 uppercase tracking-tighter">Turn-Key Space</h4>
                  <p className="text-sm text-spot-charcoal/60 font-medium">Equipped studios with tools for AI, tech, art, and craft.</p>
                </div>
                <div className="glass-morphism-heavy p-6 rounded-3xl border border-white/40">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <h4 className="font-black text-spot-charcoal mb-2 uppercase tracking-tighter">Community Reach</h4>
                  <p className="text-sm text-spot-charcoal/60 font-medium">Benefit from our network of 2,000+ local families.</p>
                </div>
              </div>
            </div>

            <div className="glass-morphism-heavy p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-white relative">
              <HostEventForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-black/5">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal uppercase tracking-tighter">Frequently <span className="text-spot-red italic">Asked.</span></h2>
        </div>
        
        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl p-8 border border-black/5 hover:border-spot-red/20 transition-all group"
            >
              <h3 className="font-display font-black text-xl text-spot-charcoal mb-4 uppercase tracking-tighter group-hover:text-spot-red transition-colors">{faq.q}</h3>
              <p className="text-spot-charcoal/60 leading-relaxed font-medium">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        eventId={selectedEventId}
        eventTitle={selectedEventTitle} 
        eventPrice={selectedEventPrice}
        isWaitlist={selectedEventWaitlist}
      />
    </main>
  );
}

const HostEventForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    attendees: '',
    message: ''
  });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s+()-]{10,20}$/;
    
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          type: 'host_event_inquiry',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: 'new',
          metadata: {
            event_type: formData.eventType,
            estimated_attendees: formData.attendees,
            message: formData.message
          }
        }]);

      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      alert('Error connecting to admissions. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-spot-pastel-green rounded-2xl flex items-center justify-center text-spot-charcoal mx-auto mb-6 rotate-12 shadow-xl">
          <Sparkles size={40} />
        </div>
        <h3 className="font-display font-black text-3xl mb-4 uppercase tracking-tighter">Proposal Received</h3>
        <p className="text-lg text-spot-charcoal/60 font-medium">Our Community Lead will connect with you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4 font-sans">Organizer Name</label>
          <input 
            type="text" required placeholder="Full Name" 
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-5 rounded-2xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold" 
          />
        </div>
        <div className="space-y-2">
          <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4 font-sans">Email Address</label>
          <input 
            type="email" required placeholder="organizer@example.com" 
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full p-5 rounded-2xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold" 
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4 font-sans">Phone Number</label>
          <input 
            type="tel" required placeholder="+91 93537 84759" 
            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full p-5 rounded-2xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold" 
          />
        </div>
        <div className="space-y-2">
          <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4 font-sans">Type of Event</label>
          <select 
            required value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})}
            className="w-full p-5 rounded-2xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold appearance-none"
          >
            <option value="">Select format...</option>
            <option value="Workshop">Workshop</option>
            <option value="Community Meetup">Community Meetup</option>
            <option value="Talk/Panel">Talk/Panel Presentation</option>
            <option value="Training">Educator Training</option>
            <option value="Other">Other Experience</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4 font-sans">Estimated Attendees</label>
        <input 
          type="text" placeholder="Approx. headcount" 
          value={formData.attendees} onChange={e => setFormData({...formData, attendees: e.target.value})}
          className="w-full p-5 rounded-2xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold" 
        />
      </div>

      <div className="space-y-2">
        <label className="font-black text-[10px] uppercase tracking-[0.2em] text-spot-red ml-4 font-sans">Short Description</label>
        <textarea 
          rows={3} placeholder="What do you plan to create/host?" 
          value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full p-5 rounded-2xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold resize-none"
        />
      </div>

      <button 
        type="submit" disabled={isSubmitting}
        className="w-full py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-spot-red transition-all haptic-feedback disabled:opacity-50"
      >
        {isSubmitting ? 'Connecting...' : 'Initialize Collaboration'}
      </button>
    </form>
  );
};

const Sparkles = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;

