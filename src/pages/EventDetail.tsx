import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';

const EVENT_DATA = {
  id: 'maker-robotics-workshop',
  title: 'Maker Robotics Workshop',
  category: 'Kids Workshops',
  date: 'Oct 15, 2026',
  time: '10:00 AM - 1:00 PM',
  duration: '3 Hours',
  audience: 'Ages 8-12',
  location: 'In Person - SPOT Studio',
  price: '$45',
  seatsAvailable: 12,
  image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
  description: 'Build and program your first robot using recycled materials and basic electronics.',
  about: 'In this hands-on workshop, children will dive into the world of robotics by building their very own moving creations. We believe in learning through making, so participants will use a mix of recycled materials, simple motors, and basic circuitry to bring their ideas to life. This isn\'t about following a step-by-step manual; it\'s about understanding how things work and creatively solving problems when they don\'t.',
  whyValuable: 'Robotics teaches more than just coding and engineering. It fosters resilience, spatial reasoning, and creative confidence. By starting with raw materials instead of pre-packaged kits, children learn that they have the power to invent and modify the world around them.',
  differentiation: 'Unlike typical robotics classes that rely on expensive, proprietary kits, our approach emphasizes "junk modeling" and accessible electronics. This means children can easily replicate and expand upon their projects at home using everyday items.',
  whoIsFor: [
    'Children ages 8-12 who love taking things apart',
    'Beginners with no prior coding or electronics experience',
    'Creative thinkers who enjoy building and crafting',
    'Kids looking for a fun, hands-on weekend activity'
  ],
  outcomes: [
    { title: 'Basic Circuitry', desc: 'Understand how to create closed loops to power motors and LEDs.' },
    { title: 'Mechanical Design', desc: 'Learn how to translate rotational motion into linear movement.' },
    { title: 'Creative Problem Solving', desc: 'Troubleshoot physical bugs and iterate on designs.' },
    { title: 'A Working Robot', desc: 'Take home a custom-built, battery-powered robot.' }
  ],
  agenda: [
    { time: '10:00 AM', title: 'Welcome & Safety Briefing', desc: 'Introduction to the studio, tools, and safety guidelines.' },
    { time: '10:15 AM', title: 'Deconstructing Toys', desc: 'Taking apart old electronics to understand how motors work.' },
    { time: '11:00 AM', title: 'Circuit Basics', desc: 'Hands-on practice wiring batteries, switches, and motors.' },
    { time: '11:30 AM', title: 'Robot Construction', desc: 'Designing and building the robot body using recycled materials.' },
    { time: '12:30 PM', title: 'Testing & Iteration', desc: 'Testing the robots on the track and making improvements.' },
    { time: '12:50 PM', title: 'Showcase & Cleanup', desc: 'Sharing creations and cleaning up the workspace.' }
  ],
  facilitator: {
    name: 'Sarah Jenkins',
    expertise: 'Creative Technologist & Educator',
    bio: 'Sarah has spent the last decade designing interactive learning experiences for children. She previously worked at the MIT Media Lab and is passionate about making technology accessible and playful.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
  },
  pricing: {
    regular: '$45',
    earlyBird: '$35 (Book by Oct 1)',
    siblingDiscount: '10% off for siblings'
  },
  whatToBring: [
    'A water bottle',
    'Comfortable clothes that can get messy',
    'A snack (optional)',
    'Curiosity and a willingness to make mistakes!'
  ],
  venue: {
    address: 'SPOT Microschool, 123 Innovation Drive, Bangalore',
    parking: 'Free parking available on site.',
    landmarks: 'Located next to the Community Library.'
  },
  faqs: [
    { q: 'Does my child need prior experience?', a: 'Not at all! This workshop is designed for complete beginners.' },
    { q: 'Can parents stay and watch?', a: 'This is a drop-off workshop to encourage independent learning, but parents are welcome to join us for the final 15 minutes to see the showcase.' },
    { q: 'Are materials provided?', a: 'Yes, all materials, including motors, batteries, and craft supplies, are included in the ticket price.' }
  ],
  policies: [
    'Refund Policy: Full refund if canceled 48 hours before the event.',
    'Photography: We take photos for our gallery. Please let us know if you prefer your child not be photographed.',
    'Safety: All participants must follow the facilitator\'s safety instructions when using tools.'
  ]
};

const RELATED_EVENTS = [
  {
    id: 'storytelling-through-art',
    title: 'Storytelling Through Art',
    category: 'Kids Workshops',
    date: 'Nov 12, 2026',
    price: '$30',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
  },
  {
    id: 'creative-coding-camp',
    title: 'Creative Coding Winter Camp',
    category: 'Camps',
    date: 'Dec 10 - Dec 14, 2026',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
  },
  {
    id: 'future-of-learning-panel',
    title: 'The Future of Learning Panel',
    category: 'Parent Sessions',
    date: 'Oct 20, 2026',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
  }
];

export default function EventDetail() {
  const { id } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // In a real app, you would fetch the event data based on the ID.
  // For this template, we'll use the mock EVENT_DATA.
  const event = EVENT_DATA;

  return (
    <main className="pt-20 pb-20">
      {/* Event Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-spot-charcoal via-spot-charcoal/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-spot-red text-white font-bold text-sm tracking-wider uppercase mb-4 shadow-lg">
              {event.category}
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter mb-6 leading-tight max-w-4xl">
              {event.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-8 text-white/90 font-medium text-lg">
              <div className="flex items-center gap-2"><Calendar size={20} className="text-spot-pastel-yellow" /> {event.date}</div>
              <div className="flex items-center gap-2"><Clock size={20} className="text-spot-pastel-yellow" /> {event.time}</div>
              <div className="flex items-center gap-2"><MapPin size={20} className="text-spot-pastel-yellow" /> {event.location}</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20"
              >
                Enroll Now — {event.price}
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full hover:bg-white/20 transition-colors text-lg border border-white/20">
                Ask a Question
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-black/5 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex overflow-x-auto hide-scrollbar gap-8 md:justify-between items-center text-sm font-bold text-spot-charcoal/80 whitespace-nowrap">
          <div className="flex items-center gap-2"><Calendar size={18} className="text-spot-red" /> {event.date}</div>
          <div className="flex items-center gap-2"><Clock size={18} className="text-spot-red" /> {event.duration}</div>
          <div className="flex items-center gap-2"><Users size={18} className="text-spot-red" /> {event.audience}</div>
          <div className="flex items-center gap-2"><MapPin size={18} className="text-spot-red" /> {event.location}</div>
          <div className="flex items-center gap-2"><Info size={18} className="text-spot-red" /> {event.seatsAvailable} Seats Left</div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-16">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* About the Event */}
          <section>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-6">About the Event</h2>
            <div className="prose prose-lg text-spot-charcoal/80 leading-relaxed">
              <p className="mb-4">{event.about}</p>
              <h3 className="font-bold text-xl text-spot-charcoal mt-8 mb-3">Why this workshop is valuable</h3>
              <p className="mb-4">{event.whyValuable}</p>
              <h3 className="font-bold text-xl text-spot-charcoal mt-8 mb-3">What makes it different</h3>
              <p>{event.differentiation}</p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-6">Learning Outcomes</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {event.outcomes.map((outcome, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex gap-4">
                  <div className="mt-1"><CheckCircle2 size={24} className="text-spot-red" /></div>
                  <div>
                    <h4 className="font-bold text-spot-charcoal mb-1">{outcome.title}</h4>
                    <p className="text-sm text-spot-charcoal/70 leading-relaxed">{outcome.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Agenda */}
          <section>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-6">Agenda</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-black/10 before:to-transparent">
              {event.agenda.map((item, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-spot-cream bg-spot-pastel-yellow text-spot-charcoal font-bold text-xs shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {index + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-spot-charcoal text-lg">{item.title}</h4>
                      <span className="text-xs font-bold text-spot-red bg-spot-pastel-pink px-2 py-1 rounded-md">{item.time}</span>
                    </div>
                    <p className="text-sm text-spot-charcoal/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-display font-black text-3xl text-spot-charcoal mb-6">Event FAQ</h2>
            <div className="space-y-4">
              {event.faqs.map((faq, index) => (
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

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Pricing Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 sticky top-40">
            <h3 className="font-display font-black text-2xl text-spot-charcoal mb-6">Pricing</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-black/5">
                <span className="font-bold text-spot-charcoal/70">Regular Price</span>
                <span className="font-black text-2xl text-spot-charcoal">{event.pricing.regular}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-black/5">
                <span className="font-bold text-spot-charcoal/70">Early Bird</span>
                <span className="font-bold text-spot-red">{event.pricing.earlyBird}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-spot-charcoal/70">Group</span>
                <span className="font-bold text-spot-charcoal">{event.pricing.siblingDiscount}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full py-4 bg-spot-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-lg shadow-lg shadow-spot-red/20 mb-4"
            >
              Book Now
            </button>
            <p className="text-center text-xs text-spot-charcoal/50 font-medium flex items-center justify-center gap-1">
              <AlertCircle size={14} /> Only {event.seatsAvailable} seats remaining
            </p>
          </div>

          {/* Who is this for */}
          <div className="bg-spot-pastel-blue/30 p-8 rounded-3xl border border-spot-pastel-blue">
            <h3 className="font-display font-black text-2xl text-spot-charcoal mb-4">Who is this for?</h3>
            <ul className="space-y-3">
              {event.whoIsFor.map((item, index) => (
                <li key={index} className="flex gap-3 text-spot-charcoal/80 font-medium">
                  <span className="text-spot-red mt-1">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Facilitator */}
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <h3 className="font-display font-black text-2xl text-spot-charcoal mb-6">Facilitator</h3>
            <div className="flex items-center gap-4 mb-4">
              <img src={event.facilitator.image} alt={event.facilitator.name} className="w-16 h-16 rounded-full object-cover border-2 border-spot-pastel-yellow" />
              <div>
                <h4 className="font-bold text-lg text-spot-charcoal">{event.facilitator.name}</h4>
                <p className="text-sm text-spot-red font-bold">{event.facilitator.expertise}</p>
              </div>
            </div>
            <p className="text-sm text-spot-charcoal/70 leading-relaxed">{event.facilitator.bio}</p>
          </div>

          {/* What to Bring */}
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <h3 className="font-display font-black text-2xl text-spot-charcoal mb-4">What to Bring</h3>
            <ul className="space-y-2">
              {event.whatToBring.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-spot-charcoal/80 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-spot-pastel-green" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Venue Details */}
          <div className="bg-spot-charcoal text-spot-cream p-8 rounded-3xl shadow-lg">
            <h3 className="font-display font-black text-2xl mb-4 text-spot-pastel-yellow">Venue Details</h3>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="block text-spot-cream/60 mb-1 uppercase tracking-wider text-xs">Address</strong>
                <p>{event.venue.address}</p>
              </div>
              <div>
                <strong className="block text-spot-cream/60 mb-1 uppercase tracking-wider text-xs">Parking</strong>
                <p>{event.venue.parking}</p>
              </div>
              <div>
                <strong className="block text-spot-cream/60 mb-1 uppercase tracking-wider text-xs">Landmarks</strong>
                <p>{event.venue.landmarks}</p>
              </div>
            </div>
          </div>

          {/* Terms and Policies */}
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
            <h3 className="font-display font-black text-xl text-spot-charcoal mb-4">Terms & Policies</h3>
            <ul className="space-y-3 text-xs text-spot-charcoal/60">
              {event.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Related Events */}
      <section className="py-20 px-6 bg-spot-charcoal text-spot-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display font-black text-4xl text-spot-pastel-yellow">Similar Events</h2>
            <Link to="/events" className="hidden sm:flex items-center gap-2 font-bold text-spot-red hover:text-white transition-colors">
              View All Events <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {RELATED_EVENTS.map((relatedEvent, index) => (
              <Link to={`/events/${relatedEvent.id}`} key={relatedEvent.id} className="group block">
                <div className="h-48 rounded-3xl overflow-hidden mb-4 relative">
                  <img src={relatedEvent.image} alt={relatedEvent.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-spot-charcoal uppercase tracking-wider">
                    {relatedEvent.category}
                  </div>
                </div>
                <h3 className="font-display font-black text-xl mb-2 group-hover:text-spot-red transition-colors">{relatedEvent.title}</h3>
                <div className="flex justify-between items-center text-sm text-spot-cream/60 font-medium">
                  <span>{relatedEvent.date}</span>
                  <span className="text-white">{relatedEvent.price}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/events" className="inline-flex items-center gap-2 font-bold text-spot-red hover:text-white transition-colors">
              View All Events <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <h2 className="font-display font-black text-5xl md:text-6xl text-spot-charcoal mb-8 tracking-tighter">
          Ready to Join?
        </h2>
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          className="px-12 py-5 bg-spot-red text-white font-bold rounded-full hover:bg-red-700 transition-colors text-xl shadow-xl shadow-spot-red/20"
        >
          Enroll Now
        </button>
      </section>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        eventTitle={event.title} 
      />
    </main>
  );
}
