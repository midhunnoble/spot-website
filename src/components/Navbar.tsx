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
        { name: 'About', path: '/about' },
        { name: 'Philosophy', path: '/philosophy' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' }
      ]
    },
    { name: 'Microschool', path: '/microschool' },
    { 
      name: 'Studios', 
      dropdown: [
        { name: 'Studios', path: '/studios' },
        { name: 'Makerverse (Summer Camp)', path: '/makerverse' },
        { name: 'Projects', path: '/projects' }
      ]
    },
    { name: 'Events', path: '/events' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (dropdown: { path: string }[]) => dropdown.some(item => isActive(item.path));

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="hover:scale-105 transition-transform duration-300">
          <img src="/assets/logo/spot-logo.png" alt="SPOT Logo" className="h-8 md:h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <div 
              key={link.name} 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <button className={`flex items-center gap-1 font-bold text-sm uppercase tracking-wider hover:text-spot-red transition-all duration-300 ${isDropdownActive(link.dropdown) ? 'text-spot-red' : 'text-spot-charcoal'}`}>
                  {link.name}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link to={link.path!} className={`font-bold text-sm uppercase tracking-wider hover:text-spot-red transition-all duration-300 relative group/link ${isActive(link.path!) ? 'text-spot-red' : 'text-spot-charcoal'}`}>
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-spot-red transform origin-left transition-transform duration-300 ${isActive(link.path!) ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100'}`} />
                </Link>
              )}

              {/* Desktop Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 15, rotateX: -10 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                      className="absolute top-full left-0 w-56 glass-morphism rounded-2xl shadow-2xl py-3 overflow-hidden border border-black/5"
                    >
                      {link.dropdown.map((item, idx) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link 
                            to={item.path} 
                            className={`block px-6 py-3 font-bold text-sm hover:bg-spot-red/5 hover:text-spot-red transition-colors ${isActive(item.path) ? 'text-spot-red bg-spot-red/5' : 'text-spot-charcoal'}`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact" className="px-6 py-2.5 bg-spot-charcoal text-spot-cream font-bold rounded-full text-sm hover:bg-spot-red transition-all duration-300 shadow-lg shadow-black/5">
              Book a Visit
            </Link>
          </motion.div>
          <Link 
            to="/admin/login" 
            className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30 hover:text-spot-red transition-all duration-300"
          >
            Spot Admin
          </Link>
        </div>
        <button className="md:hidden text-spot-charcoal p-2 hover:bg-black/5 rounded-xl transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden absolute top-20 left-0 w-full bg-spot-cream/98 backdrop-blur-xl border-b border-black/5 shadow-2xl flex flex-col p-6 gap-2 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            {links.map((link, idx) => (
              <motion.div 
                key={link.name} 
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {link.dropdown ? (
                  <>
                    <div className="font-bold text-xs uppercase tracking-widest text-spot-charcoal/40 pt-4 pb-1">
                      {link.name}
                    </div>
                    <div className="flex flex-col gap-1 pl-4">
                      {link.dropdown.map(item => (
                        <Link 
                          key={item.path} 
                          to={item.path} 
                          onClick={() => setIsOpen(false)} 
                          className={`py-2 font-bold text-xl tracking-tight transition-colors ${isActive(item.path) ? 'text-spot-red' : 'text-spot-charcoal'}`}
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
                    className={`py-4 font-bold text-2xl tracking-tight border-b border-black/5 ${isActive(link.path!) ? 'text-spot-red' : 'text-spot-charcoal'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="px-6 py-5 bg-spot-red text-white font-bold rounded-2xl text-xl mt-6 text-center shadow-xl shadow-spot-red/20 active:scale-95 transition-transform">
              Book a Visit
            </Link>
            <Link 
              to="/admin/login" 
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-spot-charcoal/20 hover:text-spot-red transition-all"
            >
              Spot Admin Portal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
