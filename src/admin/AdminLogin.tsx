import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-spot-charcoal flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,rgba(255,59,48,0.1),transparent)] overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-spot-red opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-spot-pastel-pink opacity-5 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spot-red rounded-[2rem] mb-8 shadow-xl shadow-spot-red/30 -rotate-6">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="font-display font-black text-5xl text-white tracking-tighter uppercase leading-none mb-4">Spot Admin</h1>
          <p className="text-white/40 font-medium tracking-tight">Access the command center for the SPOT ecosystem.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="group relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-spot-red transition-colors" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-spot-red focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
            </div>
            <div className="group relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-spot-red transition-colors" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Security Code"
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-spot-red focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-white text-spot-charcoal font-black uppercase tracking-widest rounded-[1.5rem] hover:bg-spot-red hover:text-white transition-all shadow-2xl haptic-feedback flex items-center justify-center gap-3 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                Initialize Session
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-white/5">
          <button 
            onClick={() => navigate('/')} 
            className="text-white/30 hover:text-white/60 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
          >
            ← Back to safe zone
          </button>
        </div>
      </motion.div>
    </div>
  );
};
