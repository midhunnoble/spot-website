import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-spot-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-spot-pastel-pink rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-spot-pastel-blue rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div 
        className="relative z-10 bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-black/5 text-center max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-spot-pastel-yellow rounded-full flex items-center justify-center mx-auto mb-8 text-spot-charcoal shadow-inner">
          <Compass size={48} />
        </div>
        
        <h1 className="font-display font-black text-8xl md:text-9xl text-spot-charcoal mb-4 tracking-tighter">
          404
        </h1>
        
        <h2 className="font-display font-bold text-3xl md:text-4xl text-spot-red mb-6">
          Looks like you wandered off the map.
        </h2>
        
        <p className="text-lg text-spot-charcoal/70 mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. But don't worry, exploration is part of the learning process!
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-spot-charcoal text-white font-bold rounded-full hover:bg-spot-red transition-colors shadow-lg"
        >
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
