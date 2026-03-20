import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Calendar, Clock, MapPin, Users, ArrowRight, Zap, Palette, Microscope, Hammer, Heart, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// SEO Component with JSON-LD
const SEO = ({ title, description }: { title: string; description: string }) => {
  React.useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Makerverse Summer Camp 2026",
      "description": "A 4-week maker journey for teenagers in Bangalore covering fermentation, art, electronics, and printmaking.",
      "provider": {
        "@type": "Organization",
        "name": "SPOT Microschool",
        "sameAs": "https://spotschool.in"
      },
      "educationalCredentialAwarded": "Certificate of Completion",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Onsite",
        "location": {
          "@type": "Place",
          "name": "SPOT Microschool Bangalore",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "KA",
            "addressCountry": "IN"
          }
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Full 4-Week Course",
            "price": "10000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "name": "Single Week Lab",
            "price": "4000",
            "priceCurrency": "INR"
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [title, description]);
  return null;
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-32 pb-20 bg-spot-cream antigravity-perspective">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-spot-cream/40 via-spot-cream/80 to-spot-cream z-10" />
        <motion.div
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 0.15 }}
           transition={{ duration: 1.5 }}
           className="w-full h-full"
        >
          <img 
            src="/assets/real-photos/summer_camp_hero.png" 
            alt="Vibrant Makerverse Summer Camp activities in Bangalore" 
            className="w-full h-full object-cover blur-sm"
          />
        </motion.div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -top-20 -left-10 text-spot-red font-handwriting text-4xl transform -rotate-12 opacity-40 pointer-events-none hidden md:block">
             Limited Seats!
          </div>
          
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-2 px-6 rounded-full glass-morphism border border-spot-red/20 text-spot-red font-black text-xs tracking-widest uppercase mb-8 shadow-xl"
          >
            Summer Camp 2026
          </motion.span>
          <h1 className="font-display font-black text-6xl md:text-[140px] text-spot-charcoal tracking-[calc(-0.04em)] mb-8 leading-[0.75] uppercase italic">
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="inline-block"
            >
              MAKER
            </motion.span> <br />
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
              className="inline-block text-spot-red relative"
            >
              VERSE
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-4 bg-spot-pastel-yellow/60 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              />
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-3xl text-spot-charcoal/80 mb-12 max-w-3xl mx-auto font-medium leading-tight italic font-handwriting"
          >
            "Where learning comes home"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link to="/studios?studio=Makerverse Summer Camp#enroll" className="px-12 py-6 bg-spot-red text-white font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-black transition-all text-sm shadow-2xl shadow-spot-red/30 haptic-feedback">
              Register Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Flyer Detail */}
      <motion.div 
        className="absolute top-40 right-[10%] hidden lg:block z-10"
        initial={{ rotate: 10, y: 100, opacity: 0 }}
        animate={{ rotate: 5, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="relative p-4 bg-white shadow-2xl transform hover:rotate-0 transition-transform duration-500 cursor-pointer">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/80 border border-black/10 shadow-sm transform -rotate-2" />
          <img src="/assets/real-photos/summer_camp_hero.png" alt="Makerverse Summer Camp Brochure 2026" className="w-64 shadow-inner" />
          <div className="mt-4 text-center text-xs font-black uppercase tracking-widest text-spot-charcoal/40">Limited to 20 seats</div>
        </div>
      </motion.div>
    </section>
  );
};

const QuickInfo = () => {
  const info = [
    { icon: <Clock />, label: "Timing", value: "10:30 AM - 1:00 PM" },
    { icon: <Calendar />, label: "Duration", value: "4 Weeks | 5 days/week" },
    { icon: <Users />, label: "Ages", value: "7+ years" },
    { icon: <MapPin />, label: "Capacity", value: "Max 20 creators" }
  ];

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {info.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-spot-cream/50 border border-black/5 glass-morphism hover:bg-white hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-spot-red/10 text-spot-red rounded-2xl flex items-center justify-center mb-6">
              {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">{item.label}</span>
            <span className="text-lg font-display font-bold text-spot-charcoal">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Journey = () => {
  const weeks = [
    {
      week: "Week 1",
      title: "The Wild Jar Project",
      lab: "Fermentation & Food Lab",
      items: ["Pickles", "Ginger bug", "Flavoured soda", "Zines", "Tiny worlds"],
      learning: "Ratios, hygiene, time-based change",
      color: "bg-spot-pastel-green",
      icon: <Microscope />
    },
    {
      week: "Week 2",
      title: "Artlore",
      lab: "Art with Multiple Mediums",
      items: ["Tie & dye", "Clay", "Felt toys", "Pendulum painting", "Zines", "Tiny worlds"],
      learning: "Material handling, composition, colour control",
      color: "bg-spot-pastel-pink",
      icon: <Palette />
    },
    {
      week: "Week 3",
      title: "Spark Lab",
      lab: "Electronics & LEGO Engineering",
      items: ["Working circuits", "Switch-controlled lights", "LEGO mechanical builds & circuits"],
      learning: "Electricity basics, systems thinking, engineering logic",
      color: "bg-spot-pastel-yellow",
      icon: <Zap />
    },
    {
      week: "Week 4",
      title: "INKubator",
      lab: "Printmaking & Reproducible Art",
      items: ["Nature prints", "Foam prints", "Block printing", "Cyanotype"],
      learning: "Layering, alignment, motif design",
      color: "bg-spot-pastel-blue",
      icon: <Hammer />
    }
  ];

  return (
    <section id="journey" className="py-32 px-6 bg-spot-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-display font-black text-5xl md:text-7xl text-spot-charcoal mb-8 uppercase tracking-tighter">
            The 4-Week <span className="text-spot-red underline decoration-spot-pastel-yellow underline-offset-8">Making Journey</span>
          </h2>
          <p className="text-2xl text-spot-charcoal/70 max-w-2xl mx-auto font-medium">Four distinct labs, one transformation journey. From fermented foods to robotic engineering.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 antigravity-perspective">
          {weeks.map((week, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 ${week.color} rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
              <div className="relative h-full bg-white rounded-[3rem] p-12 shadow-2xl shadow-black/5 border border-black/5 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="px-6 py-2 bg-spot-charcoal text-white rounded-full font-black text-xs tracking-widest uppercase">{week.week}</div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-spot-charcoal ${week.color.replace('bg-', 'bg-')}`}>
                     {React.cloneElement(week.icon as React.ReactElement, { size: 32 })}
                  </div>
                </div>
                
                <h3 className="font-display font-black text-4xl text-spot-charcoal mb-2 uppercase tracking-tighter">{week.title}</h3>
                <p className="text-spot-red font-bold text-xl mb-8">{week.lab}</p>
                
                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">Activities</h4>
                  <ul className="grid grid-cols-2 gap-4 mb-8">
                    {week.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-lg font-medium text-spot-charcoal/80">
                        <CheckCircle2 size={18} className="text-spot-red mt-1 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-black/5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Core Learning</h4>
                  <p className="font-display font-bold text-xl text-spot-charcoal leading-tight">{week.learning}</p>
                </div>

                {/* Background Decor */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${week.color} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-32 px-6 bg-spot-charcoal text-spot-cream relative overflow-hidden">
       <div className="absolute top-0 right-0 w-1/2 h-full bg-spot-red opacity-5 transform skew-x-12 translate-x-1/2" />
       
       <div className="max-w-5xl mx-auto relative z-10">
         <div className="grid md:grid-cols-2 gap-16 items-center">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="font-display font-black text-5xl md:text-7xl mb-8 leading-[0.85] uppercase tracking-tighter">
               Simple, <br/><span className="text-spot-pastel-pink">Flexible</span> <br/>Pricing.
             </h2>
             <p className="text-xl text-spot-cream/70 mb-10 max-w-sm">Choose the full 4-week deep dive or join for a single week focus.</p>
             <div className="flex items-center gap-6">
               <Heart className="text-spot-red fill-spot-red animate-pulse" size={32} />
               <span className="font-handwriting text-3xl text-spot-pastel-yellow">Take-home products included!</span>
             </div>
           </motion.div>

           <div className="grid gap-6">
             <motion.div 
               className="glass-morphism bg-white/5 border border-white/20 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="font-display font-bold text-3xl uppercase tracking-tighter mb-2">Full Course</h3>
                   <p className="text-spot-cream/40 font-black text-xs uppercase tracking-widest">Complete 4-Week Journey</p>
                 </div>
                 <div className="text-right">
                   <div className="text-4xl md:text-5xl font-display font-black text-spot-pastel-pink">₹10,000</div>
                 </div>
               </div>
               <ul className="space-y-3 mb-10">
                 {["All 4 specialized labs", "All materials provided", "Full portfolio of creations", "Guaranteed seat"].map((feat, i) => (
                   <li key={i} className="flex items-center gap-3 text-lg font-medium">
                     <CheckCircle2 size={18} className="text-spot-red" />
                     {feat}
                   </li>
                 ))}
               </ul>
               <Link to="/studios?studio=Makerverse Summer Camp#enroll" className="block w-full text-center py-5 bg-spot-pastel-pink text-spot-charcoal font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-xl shadow-spot-pastel-pink/10">
                 Enroll in Full Course
               </Link>
             </motion.div>

             <motion.div 
               className="glass-morphism bg-white/5 border border-white/20 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
             >
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="font-display font-bold text-3xl uppercase tracking-tighter mb-2">Single Week</h3>
                   <p className="text-spot-cream/40 font-black text-xs uppercase tracking-widest">Focused Lab Exploration</p>
                 </div>
                 <div className="text-right">
                   <div className="text-4xl md:text-5xl font-display font-black text-spot-pastel-yellow">₹4,000</div>
                 </div>
               </div>
               <Link to="/studios?studio=Makerverse Summer Camp#enroll" className="block w-full text-center py-5 border-2 border-white/20 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                 Join for 1 Week
               </Link>
             </motion.div>
           </div>
         </div>
       </div>
    </section>
  );
};

const Outcomes = () => {
  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
           >
             <div className="absolute inset-0 bg-spot-pastel-pink opacity-20 blur-[100px] rounded-full" />
             <div className="relative p-4 bg-white shadow-[0_50px_100px_rgba(0,0,0,0.1)] rounded-[3rem] border border-black/5">
                <img src="/assets/real-photos/clay_figures_2.jpg" alt="Teenagers creating clay figures at Makerverse" className="rounded-[2.5rem] w-full aspect-video object-cover" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white p-4 shadow-2xl rounded-3xl transform -rotate-6 hidden md:block">
                  <img src="/assets/real-photos/clay_figures_1.jpg" alt="Creative clay sculpts by students" className="rounded-2xl w-full h-full object-cover" />
                </div>
             </div>
           </motion.div>

           <div>
              <h2 className="font-display font-black text-5xl md:text-6xl text-spot-charcoal mb-8 leading-tight tracking-tighter uppercase">
                Real Hands-on <span className="text-spot-red">Outcomes</span>.
              </h2>
              <p className="text-xl text-spot-charcoal/70 mb-10 leading-relaxed font-medium">
                We believe in small groups for big impact. With a maximum of 20 young builders, every maker gets the facilitation, space, and resources they need to thrive.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Hands-on projects", desc: "No boring lectures. Just making, building, and doing from day one." },
                  { title: "Small Groups", desc: "Personalized attention ensuring every child's vision is supported." },
                  { title: "Real Life Impact", desc: "Building tangible products that work and matter." }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-spot-cream flex items-center justify-center text-spot-red shrink-0 font-display font-black text-2xl">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-2xl uppercase tracking-tighter mb-1">{item.title}</h4>
                      <p className="text-lg text-spot-charcoal/60 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = () => {
  return (
    <section className="py-24 px-6 bg-spot-pastel-yellow/30 border-t border-black/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display font-black text-4xl mb-12 uppercase tracking-tighter">Have Questions?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <a href="tel:9353784759" className="glass-morphism bg-white p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform">
             <div className="w-12 h-12 bg-spot-pastel-yellow rounded-xl flex items-center justify-center mx-auto mb-6 text-spot-charcoal">
               <Zap />
             </div>
             <div className="text-xs font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Call Us</div>
             <div className="text-2xl font-display font-bold">9353784759</div>
          </a>
          <a href="mailto:spotschoolblr@gmail.com" className="glass-morphism bg-white p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-transform">
             <div className="w-12 h-12 bg-spot-pastel-blue rounded-xl flex items-center justify-center mx-auto mb-6 text-spot-charcoal">
               <Heart />
             </div>
             <div className="text-xs font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Email Us</div>
             <div className="text-xl font-display font-bold">spotschoolblr@gmail.com</div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Makerverse() {
  return (
    <main className="relative pt-0">
      <SEO 
        title="Makerverse Summer Camp 2026 | Bangalore's Best Maker Experience" 
        description="Join our 4-week making journey for teenagers in Bangalore. From food labs to electronics and engineering, discover where learning comes home."
      />
      <HeroSection />
      <QuickInfo />
      <Journey />
      <Pricing />
      <Outcomes />
      <ContactInfo />
      
      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="font-display font-black text-6xl md:text-8xl lg:text-[100px] mb-12 tracking-tighter uppercase leading-none">
          READY TO <br/><span className="text-spot-red">CREATE?</span>
        </h2>
        <Link to="/studios?studio=Makerverse Summer Camp#enroll">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-8 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] rounded-full text-xl shadow-2xl hover:bg-spot-red transition-all"
          >
            Join the Summer Camp
          </motion.button>
        </Link>
      </section>
    </main>
  );
}
