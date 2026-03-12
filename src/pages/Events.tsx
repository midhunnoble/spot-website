import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Clock, Users, ArrowRight, ChevronDown, ChevronUp, Star, PlayCircle } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';

const EVENTS_DATA = [
  {
    id: 'maker-robotics-workshop',
    title: 'Maker Robotics Workshop',
    category: 'Kids Workshops',
    date: 'Oct 15, 2026',
    time: '10:00 AM - 1:00 PM',
    audience: 'Ages 8-12',
    location: 'In Person - SPOT Studio',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1585468273280-7c6536979201?auto=format&fit=crop&q=80',
    description: 'Build and program your first robot using recycled materials and basic electronics.',
    featured: true
  },
  {
    id: 'future-of-learning-panel',
    title: 'The Future of Learning Panel',
    category: 'Parent Sessions',
    date: 'Oct 20, 2026',
    time: '6:30 PM - 8:00 PM',
    audience: 'Parents & Educators',
    location: 'Online',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?auto=format&fit=crop&q=80',
    description: 'Join leading educators to discuss how self-directed learning is reshaping education.',
    featured: true
  },
  {
    id: 'creative-coding-camp',
    title: 'Creative Coding Winter Camp',
    category: 'Camps',
    date: 'Dec 10 - Dec 14, 2026',
    time: '9:00 AM - 3:00 PM',
    audience: 'Ages 10-14',
    location: 'In Person - SPOT Studio',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80',
    description: 'A 5-day intensive camp where kids build their own interactive stories and games.',
    featured: false
  },
  {
    id: 'educator-design-thinking',
    title: 'Design Thinking for Educators',
    category: 'Educator Trainings',
    date: 'Nov 5, 2026',
    time: '9:00 AM - 4:00 PM',
    audience: 'Educators',
    location: 'In Person - SPOT Studio',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    description: 'Learn how to integrate design thinking methodologies into your classroom.',
    featured: false
  },
  {
    id: 'storytelling-through-art',
    title: 'Storytelling Through Art',
    category: 'Kids Workshops',
    date: 'Nov 12, 2026',
    time: '2:00 PM - 4:00 PM',
    audience: 'Ages 5-8',
    location: 'In Person - SPOT Studio',
    price: '$30',
    image: 'https://images.unsplash.com/photo-1627556592933-ffe99c1c9dd8?auto=format&fit=crop&q=80',
    description: 'Explore different art mediums to tell compelling visual stories.',
    featured: false
  },
  {
    id: 'school-innovation-tour',
    title: 'School Innovation Tour',
    category: 'School Programs',
    date: 'Nov 18, 2026',
    time: '10:00 AM - 12:00 PM',
    audience: 'School Leaders',
    location: 'In Person - SPOT Studio',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    description: 'A guided tour of our studios and a discussion on progressive education models.',
    featured: false
  }
];

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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tabs = ['All Events', 'Kids Workshops', 'Parent Sessions', 'Educator Trainings', 'Camps', 'School Programs', 'Online', 'In Person'];

  const handleBookNow = (title: string) => {
    setSelectedEventTitle(title);
    setIsBookingModalOpen(true);
  };

  const filteredEvents = EVENTS_DATA.filter(event => {
    const matchesTab = activeTab === 'All Events' || 
                       event.category === activeTab || 
                       (activeTab === 'Online' && event.location.includes('Online')) ||
                       (activeTab === 'In Person' && event.location.includes('In Person'));
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const featuredEvents = EVENTS_DATA.filter(e => e.featured);

  return (
    <main className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585468273280-7c6536979201?auto=format&fit=crop&q=80" 
            alt="Children in a workshop" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spot-cream/80 via-spot-cream/90 to-spot-cream" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
              <a href="#discover" className="w-full sm:w-auto px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20">
                Explore Upcoming Events
              </a>
              <a href="#host" className="w-full sm:w-auto px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10">
                Host an Event at SPOT
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Discovery */}
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
            <select className="w-full md:w-auto py-3 px-4 rounded-full border-2 border-black/10 bg-white focus:outline-none focus:border-spot-red font-medium appearance-none cursor-pointer">
              <option>Upcoming</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
            </select>
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

      {/* Featured Events */}
      {activeTab === 'All Events' && searchQuery === '' && (
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-4xl text-spot-charcoal mb-10">Featured Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-black/5 flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-spot-red uppercase tracking-wider">
                    {event.category}
                  </div>
                </div>
                <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-2xl text-spot-charcoal mb-3 leading-tight group-hover:text-spot-red transition-colors">
                      <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </h3>
                    <p className="text-spot-charcoal/70 mb-6 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-spot-charcoal/80 font-medium">
                        <Calendar size={16} className="text-spot-red" /> {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-spot-charcoal/80 font-medium">
                        <Users size={16} className="text-spot-red" /> {event.audience}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <span className="font-black text-xl text-spot-charcoal">{event.price}</span>
                    <button 
                      onClick={() => handleBookNow(event.title)}
                      className="px-6 py-2.5 bg-spot-charcoal text-white font-bold rounded-full hover:bg-spot-red transition-colors text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="font-display font-black text-3xl md:text-4xl text-spot-charcoal mb-10">
          {activeTab === 'All Events' ? 'Upcoming Events' : `${activeTab}`}
        </h2>
        
        {filteredEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-black/5 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-spot-charcoal uppercase tracking-wider">
                    {event.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-black text-xl text-spot-charcoal mb-4 leading-tight">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-spot-charcoal/70">
                      <Calendar size={16} /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-spot-charcoal/70">
                      <Clock size={16} /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-spot-charcoal/70">
                      <Users size={16} /> {event.audience}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-spot-charcoal/70">
                      <MapPin size={16} /> {event.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-black/5 mb-4">
                    <span className="font-black text-lg text-spot-charcoal">{event.price}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      to={`/events/${event.id}`}
                      className="text-center px-4 py-2.5 bg-spot-pastel-blue text-spot-charcoal font-bold rounded-xl hover:bg-blue-200 transition-colors text-sm"
                    >
                      Details
                    </Link>
                    <button 
                      onClick={() => handleBookNow(event.title)}
                      className="px-4 py-2.5 bg-spot-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5">
            <p className="text-xl text-spot-charcoal/60 font-medium">No events found matching your criteria.</p>
            <button 
              onClick={() => { setActiveTab('All Events'); setSearchQuery(''); }}
              className="mt-4 text-spot-red font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Event Formats */}
      <section className="py-20 px-6 bg-spot-charcoal text-spot-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6">Ways to Experience SPOT</h2>
            <p className="text-xl text-spot-cream/70 max-w-2xl mx-auto">We design diverse learning formats to fit different schedules, ages, and learning goals.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMATS.map((format, index) => (
              <motion.div 
                key={format.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-display font-black text-2xl text-spot-pastel-yellow mb-4">{format.title}</h3>
                <p className="text-spot-cream/80 leading-relaxed">{format.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-4">Past Highlights</h2>
            <p className="text-xl text-spot-charcoal/70 max-w-xl">A glimpse into the energy, creativity, and community at our recent events.</p>
          </div>
          <a href="#" className="flex items-center gap-2 font-bold text-spot-red hover:underline">
            View Gallery <ArrowRight size={20} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1585468273280-7c6536979201?auto=format&fit=crop&q=80" alt="Highlight" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1627556592933-ffe99c1c9dd8?auto=format&fit=crop&q=80" alt="Highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80" alt="Highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?auto=format&fit=crop&q=80" alt="Highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-3xl overflow-hidden h-48 md:h-auto">
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80" alt="Highlight" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-spot-pastel-pink/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="text-spot-red fill-spot-red" />)}
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-spot-charcoal mb-8 leading-tight">
            "The robotics workshop was incredible. My daughter came home buzzing with ideas and couldn't wait to show us what she built. The facilitators were so encouraging!"
          </h2>
          <p className="font-bold text-lg text-spot-charcoal">— Priya S., Parent</p>
        </div>
      </section>

      {/* Host an Event */}
      <section id="host" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-spot-pastel-blue rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/40 rounded-full blur-3xl"></div>
          
          <div className="md:w-1/2 relative z-10">
            <h2 className="font-display font-black text-4xl md:text-5xl text-spot-charcoal mb-6 leading-tight">
              Bring a SPOT Workshop to Your Community
            </h2>
            <p className="text-xl text-spot-charcoal/80 mb-8 font-medium">
              We partner with schools, community centers, and organizations to deliver custom hands-on learning experiences.
            </p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-spot-charcoal text-white font-bold rounded-full hover:bg-spot-red transition-colors text-lg shadow-lg">
              Enquire Now
            </Link>
          </div>
          <div className="md:w-1/2 relative z-10">
            <div className="polaroid rotate-3">
              <img src="https://images.unsplash.com/photo-1585468273280-7c6536979201?auto=format&fit=crop&q=80" alt="School Partnership" className="w-full h-64 object-cover" />
              <div className="polaroid-caption">School Partnerships</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl text-spot-charcoal mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-lg text-spot-charcoal hover:bg-black/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.q}
                {openFaq === index ? <ChevronUp size={20} className="text-spot-red shrink-0" /> : <ChevronDown size={20} className="text-spot-charcoal/40 shrink-0" />}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-spot-charcoal/70 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal mb-8 tracking-tighter">
          Join an Upcoming <br/><span className="text-spot-red">SPOT Experience</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#discover" className="px-8 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20">
            Book a Workshop
          </a>
          <button className="px-8 py-4 bg-white text-spot-charcoal font-bold rounded-full hover:bg-spot-pastel-yellow transition-colors text-lg border-2 border-spot-charcoal/10">
            Explore Trainings
          </button>
          <Link to="/contact" className="px-8 py-4 bg-spot-charcoal text-white font-bold rounded-full hover:bg-black transition-colors text-lg">
            Contact SPOT
          </Link>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        eventTitle={selectedEventTitle} 
      />
    </main>
  );
}
