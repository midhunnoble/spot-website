import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const links = [
    { 
      name: 'Inside SPOT', 
      dropdown: [
        { name: 'Philosophy', path: '/philosophy' },
        { name: 'Projects', path: '/projects' }
      ]
    },
    { name: 'Microschool', path: '/microschool' },
    { name: 'Studios', path: '/studios' },
    { name: 'Events', path: '/events' },
    { 
      name: 'About SPOT', 
      dropdown: [
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' }
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (dropdown: { path: string }[]) => dropdown.some(item => isActive(item.path));

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-spot-cream/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-display font-black text-3xl text-spot-red tracking-tighter">SPOT.</Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <button className={`flex items-center gap-1 font-bold text-sm uppercase tracking-wider hover:text-spot-red transition-colors ${isDropdownActive(link.dropdown) ? 'text-spot-red' : 'text-spot-charcoal'}`}>
                  {link.name}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link to={link.path!} className={`font-bold text-sm uppercase tracking-wider hover:text-spot-red transition-colors ${isActive(link.path!) ? 'text-spot-red' : 'text-spot-charcoal'}`}>
                  {link.name}
                </Link>
              )}

              {/* Desktop Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-4 w-48 bg-white rounded-2xl shadow-xl border border-black/5 py-2 overflow-hidden"
                    >
                      {link.dropdown.map(item => (
                        <Link 
                          key={item.path} 
                          to={item.path} 
                          className={`block px-6 py-3 font-bold text-sm hover:bg-spot-pastel-yellow transition-colors ${isActive(item.path) ? 'text-spot-red bg-spot-pastel-yellow/30' : 'text-spot-charcoal'}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <button className="px-6 py-2 bg-spot-charcoal text-spot-cream font-bold rounded-full text-sm hover:bg-spot-red transition-colors">
            Book a Visit
          </button>
        </div>
        <button className="md:hidden text-spot-charcoal" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-spot-cream border-b border-black/5 shadow-xl flex flex-col p-6 gap-4 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            {links.map(link => (
              <div key={link.name} className="flex flex-col gap-2">
                {link.dropdown ? (
                  <>
                    <div className="font-bold text-lg uppercase tracking-wider text-spot-charcoal/50 border-b border-black/5 pb-2 mt-2">
                      {link.name}
                    </div>
                    <div className="flex flex-col gap-3 pl-4">
                      {link.dropdown.map(item => (
                        <Link 
                          key={item.path} 
                          to={item.path} 
                          onClick={() => setIsOpen(false)} 
                          className={`font-bold text-lg uppercase tracking-wider ${isActive(item.path) ? 'text-spot-red' : 'text-spot-charcoal'}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    to={link.path!} 
                    onClick={() => setIsOpen(false)} 
                    className={`font-bold text-lg uppercase tracking-wider ${isActive(link.path!) ? 'text-spot-red' : 'text-spot-charcoal'} mt-2`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <button className="px-6 py-4 bg-spot-charcoal text-spot-cream font-bold rounded-full text-lg mt-6">
              Book a Visit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
