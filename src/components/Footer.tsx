import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-spot-charcoal text-spot-cream py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="col-span-1">
          <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/assets/logo/spot-logo-orange.png" alt="SPOT Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-spot-cream/60 text-sm">
            A microschool and studio ecosystem where children build their world.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-spot-cream/40">Explore</h4>
          <ul className="space-y-3">
            <li><Link to="/microschool" className="hover:text-spot-pastel-pink transition-colors">Microschool</Link></li>
            <li><Link to="/studios" className="hover:text-spot-pastel-pink transition-colors">Studios</Link></li>
            <li><Link to="/projects" className="hover:text-spot-pastel-pink transition-colors">Projects</Link></li>
            <li><Link to="/events" className="hover:text-spot-pastel-pink transition-colors">Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-spot-cream/40">Connect</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="hover:text-spot-pastel-blue transition-colors">About</Link></li>
            <li><Link to="/careers" className="hover:text-spot-pastel-blue transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-spot-pastel-blue transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-spot-cream/40">Policies</h4>
          <ul className="space-y-3">
            <li><Link to="/privacy" className="hover:text-spot-pastel-yellow transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-spot-pastel-yellow transition-colors">Terms of Service</Link></li>
            <li><Link to="/refund" className="hover:text-spot-pastel-yellow transition-colors">Refund Policy</Link></li>
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
