import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Heart, Rocket } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-spot-charcoal text-spot-cream py-24 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-spot-red rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-block mb-10 hover:opacity-80 transition-opacity p-2 -ml-2">
            <img src="/assets/logo/spot-logo-orange.png" alt="SPOT Logo" className="h-[50px] w-auto" />
          </Link>
          <p className="text-spot-cream/40 text-lg leading-tight max-w-xs mb-10 font-bold uppercase tracking-tighter italic">
            A divergent microschool where <span className="text-white">personal curiosity</span> forges the future.
          </p>
          <div className="flex items-center gap-4 text-spot-red">
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 15, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-spot-pastel-pink"
            >
              <Rocket size={24} fill="currentColor" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 leading-none">Made in Bangalore <br/>for the world</span>
          </div>
        </div>
        
        <div className="pt-4 md:pt-0">
          <h4 className="font-black mb-10 uppercase tracking-[0.4em] text-[10px] text-spot-red/50">Ecosystem Navigator</h4>
          <ul className="space-y-6">
            {[
              { label: 'Microschool', to: '/microschool', color: 'hover:text-spot-red' },
              { label: 'Studios', to: '/studios', color: 'hover:text-spot-pastel-pink' },
              { label: 'Projects', to: '/projects', color: 'hover:text-spot-pastel-yellow' },
              { label: 'Workshops', to: '/events', color: 'hover:text-spot-pastel-blue' },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.to} className={`group block py-1 ${link.color} transition-all font-black tracking-tight text-3xl flex items-center gap-3 uppercase italic leading-none hover:translate-x-3`}>
                  {link.label}
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 md:pt-0">
          <h4 className="font-black mb-10 uppercase tracking-[0.4em] text-[10px] text-spot-red/50">Collaborate</h4>
          <ul className="space-y-6">
            {[
              { label: 'Our Narrative', to: '/about', color: 'hover:text-spot-pastel-blue' },
              { label: 'Open Roles', to: '/careers', color: 'hover:text-spot-pastel-green' },
              { label: 'Secure Spot', to: '/contact', color: 'hover:text-spot-red' },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.to} className={`group block py-1 ${link.color} transition-all font-black tracking-tight text-3xl flex items-center gap-3 uppercase italic leading-none hover:translate-x-3`}>
                  {link.label}
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4 md:pt-0">
          <h4 className="font-black mb-10 uppercase tracking-[0.4em] text-[10px] text-spot-red/50">Legals</h4>
          <ul className="space-y-4">
            {[
              { label: 'Privacy', to: '/privacy' },
              { label: 'Terms', to: '/terms' },
              { label: 'Refunds', to: '/refund' },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.to} className="block py-1 hover:text-white/100 text-white/20 transition-colors font-black uppercase text-[11px] tracking-widest">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-white/10 text-[9px] font-black uppercase tracking-[0.5em] gap-8">
        <div className="text-center md:text-left">© {new Date().getFullYear()} SPOT STUDIO • COGNITIVE GROUNDING • STUDENT AGENCY</div>
        <div className="flex items-center gap-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-3 text-white/30"
          >
            <Sparkles size={14} className="text-spot-pastel-yellow animate-pulse" />
            <span>Stay Divergent</span>
          </motion.div>
          <Link to="/admin/login" className="hover:text-spot-red transition-colors opacity-20 hover:opacity-100 border border-white/10 px-4 py-2 rounded-full">Archive Core</Link>
        </div>
      </div>
    </footer>
  );
};
