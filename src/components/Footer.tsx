import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-spot-charcoal text-spot-cream py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-display text-4xl font-black text-spot-pastel-yellow mb-6">SPOT.</h3>
          <p className="text-spot-cream/60 max-w-sm">
            A microschool and studio ecosystem where children build their world.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-spot-cream/40">Explore</h4>
          <ul className="space-y-3">
            {['Microschool', 'Studios', 'SPOT in School', 'Events'].map(link => (
              <li key={link}><a href="#" className="hover:text-spot-pastel-pink transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-spot-cream/40">Connect</h4>
          <ul className="space-y-3">
            {['Careers', 'Gallery', 'Contact'].map(link => (
              <li key={link}><a href="#" className="hover:text-spot-pastel-blue transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-spot-cream/10 text-center text-spot-cream/40 text-sm">
        © {new Date().getFullYear()} SPOT Microschool. All rights reserved.
      </div>
    </footer>
  );
};
