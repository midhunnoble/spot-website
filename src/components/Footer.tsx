import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-spot-charcoal text-spot-cream py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="col-span-1">
          <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity p-2 -ml-2">
            <img src="/assets/logo/spot-logo-orange.png" alt="SPOT Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-spot-cream/60 text-sm leading-relaxed max-w-xs">
            A microschool and studio ecosystem where <span className="text-spot-cream/80 font-bold">neuro-divergent minds</span> build their world.
          </p>
        </div>
        
        <div className="pt-4 md:pt-0">
          <h4 className="font-bold mb-6 uppercase tracking-[0.2em] text-[10px] text-spot-cream/30">Registry & Studios</h4>
          <ul className="space-y-4">
            <li><Link to="/microschool" className="block py-2 hover:text-spot-pastel-pink transition-colors font-bold tracking-tight text-lg">The Microschool</Link></li>
            <li><Link to="/studios" className="block py-2 hover:text-spot-pastel-pink transition-colors font-bold tracking-tight text-lg">The Studios</Link></li>
            <li><Link to="/projects" className="block py-2 hover:text-spot-pastel-pink transition-colors font-bold tracking-tight text-lg">Resonance Archive</Link></li>
            <li><Link to="/events" className="block py-2 hover:text-spot-pastel-pink transition-colors font-bold tracking-tight text-lg">Event Streams</Link></li>
          </ul>
        </div>

        <div className="pt-4 md:pt-0">
          <h4 className="font-bold mb-6 uppercase tracking-[0.2em] text-[10px] text-spot-cream/30">Connect</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="block py-2 hover:text-spot-pastel-blue transition-colors font-bold tracking-tight text-lg">Philosophy</Link></li>
            <li><Link to="/careers" className="block py-2 hover:text-spot-pastel-blue transition-colors font-bold tracking-tight text-lg">Join the Movement</Link></li>
            <li><Link to="/contact" className="block py-2 hover:text-spot-pastel-blue transition-colors font-bold tracking-tight text-lg">Inbound Narrative</Link></li>
          </ul>
        </div>
        
        <div className="pt-4 md:pt-0">
          <h4 className="font-bold mb-6 uppercase tracking-[0.2em] text-[10px] text-spot-cream/30">System Shield</h4>
          <ul className="space-y-4">
            <li><Link to="/privacy" className="block py-2 hover:text-spot-pastel-yellow transition-colors font-bold tracking-tight text-lg">Privacy Policy</Link></li>
            <li><Link to="/terms" className="block py-2 hover:text-spot-pastel-yellow transition-colors font-bold tracking-tight text-lg">Terms of Service</Link></li>
            <li><Link to="/refund" className="block py-2 hover:text-spot-pastel-yellow transition-colors font-bold tracking-tight text-lg">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-spot-cream/10 flex flex-col md:flex-row items-center justify-between text-spot-cream/40 text-sm gap-4">
        <div>© {new Date().getFullYear()} SPOT Microschool. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link to="/admin/login" className="hover:text-spot-red transition-colors opacity-25 hover:opacity-100 transition-opacity">Spot Admin</Link>
        </div>
      </div>
    </footer>
  );
};
