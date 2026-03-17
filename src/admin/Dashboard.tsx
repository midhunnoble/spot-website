import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Layout, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp,
  Activity,
  Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion } from 'motion/react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    leads: 0,
    studios: 0,
    events: 0,
    posts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [leads, studios, events, posts] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('studios').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('posts').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        leads: leads.count || 0,
        studios: studios.count || 0,
        events: events.count || 0,
        posts: posts.count || 0
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Website Leads', value: stats.leads, icon: <Users size={24} />, color: 'bg-spot-pastel-blue', trend: '+12%' },
    { label: 'Active Studios', value: stats.studios, icon: <Layout size={24} />, color: 'bg-spot-pastel-pink', trend: 'Stable' },
    { label: 'Upcoming Events', value: stats.events, icon: <Calendar size={24} />, color: 'bg-spot-pastel-green', trend: 'Next: 2 days' },
    { label: 'Blog Insights', value: stats.posts, icon: <MessageSquare size={24} />, color: 'bg-spot-pastel-yellow', trend: 'Weekly' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-spot-charcoal p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-spot-red/20 blur-[100px] rounded-full rotate-45" />
          
          <div className="relative z-10 max-w-xl">
            <h1 className="font-display font-black text-6xl tracking-tighter uppercase leading-[0.9] mb-6">Command Center</h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed italic">
              "Connecting before correcting." Your dashboard for scaling the neuro-affirmative future of education.
            </p>
          </div>
          
          <div className="relative z-10 flex gap-4">
             <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 text-center min-w-[120px]">
                <span className="block text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">Systems</span>
                <span className="text-2xl font-black text-spot-red">ONLINE</span>
             </div>
             <div className="p-6 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 text-center min-w-[120px]">
                <span className="block text-[10px] uppercase font-black tracking-widest opacity-40 mb-2">Traffic</span>
                <span className="text-2xl font-black text-green-400 flex items-center justify-center gap-2">
                  <TrendingUp size={20} />
                  +4%
                </span>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${card.color} p-10 rounded-[3.5rem] border border-black/5 hover:scale-105 transition-all shadow-xl group cursor-default`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-5 bg-white rounded-[1.5rem] shadow-lg group-hover:rotate-12 transition-transform">
                  {card.icon}
                </div>
                <ArrowUpRight className="text-spot-charcoal/20 group-hover:text-spot-charcoal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/40 block mb-2">{card.label}</span>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-display font-black text-spot-charcoal leading-none tracking-tighter">{card.value}</span>
                <span className="text-[10px] font-black text-spot-charcoal/60 mb-1">{card.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[4rem] p-12 border border-black/5 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display font-black text-3xl uppercase tracking-tighter">Growth Pulse</h2>
               <div className="flex gap-2">
                  <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase">7 Days</div>
                  <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase opacity-40">30 Days</div>
               </div>
            </div>
            <div className="h-64 flex items-end gap-3">
               {[40, 65, 45, 90, 55, 75, 85].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className={`w-full rounded-2xl ${i === 3 ? 'bg-spot-red' : 'bg-spot-charcoal/5 group-hover:bg-spot-charcoal/10'} transition-all`}
                    />
                    <div className="text-[9px] font-black text-center mt-3 opacity-20 group-hover:opacity-100">D{i+1}</div>
                  </div>
               ))}
            </div>
          </div>

          <div className="bg-white rounded-[4rem] p-10 border border-black/5 shadow-2xl flex flex-col justify-between overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap size={120} />
             </div>
             
             <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-8">System Health</h3>
              <div className="space-y-6">
                {[
                  { name: 'Database', status: 'Optimal', color: 'bg-green-500' },
                  { name: 'Storage Agent', status: 'Connected', color: 'bg-green-500' },
                  { name: 'Auth Server', status: 'Stable', color: 'bg-green-500' },
                  { name: 'API Gateway', status: 'Active', color: 'bg-green-500' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-black/5">
                    <span className="text-xs font-black uppercase tracking-widest text-spot-charcoal/60">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.color} animate-pulse`} />
                      <span className="text-[10px] font-bold text-spot-charcoal">{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
             </div>
             
             <div className="bg-spot-pastel-pink/30 p-6 rounded-3xl mt-8 border border-spot-pastel-pink/50">
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                   <Activity size={14} className="text-spot-red" /> 
                   Next Content Cycle
                </span>
                <div className="text-lg font-black text-spot-charcoal uppercase leading-none">April Launchpad</div>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
