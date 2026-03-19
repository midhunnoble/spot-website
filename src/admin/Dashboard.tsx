import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Layout, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight, 
  TrendingUp,
  Activity,
  Zap,
  BookOpen
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion } from 'motion/react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    leads: 0,
    studios: 0,
    events: 0,
    posts: 0,
    waitlist: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [leads, studios, events, posts, waitlist] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('studios').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).filter('metadata->>is_waitlist', 'eq', 'true')
      ]);

      setStats({
        leads: leads.count || 0,
        studios: studios.count || 0,
        events: events.count || 0,
        posts: posts.count || 0,
        waitlist: waitlist.count || 0
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Inbound Registry', value: stats.leads, icon: <Activity size={24} />, color: 'bg-spot-pastel-blue' },
    { label: 'Studio Ecosystem', value: stats.studios, icon: <Sparkles size={24} />, color: 'bg-spot-pastel-pink' },
    { label: 'Event Streams', value: stats.events, icon: <Calendar size={24} />, color: 'bg-spot-pastel-green' },
    { label: 'Resonance Archive', value: stats.posts, icon: <BookOpen size={24} />, color: 'bg-spot-pastel-yellow' },
  ];

  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  useEffect(() => {
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5).then(({ data }) => setRecentLeads(data || []));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-spot-charcoal p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-spot-red/20 blur-[100px] rounded-full rotate-45" />
          
          <div className="relative z-10 max-w-xl">
            <h1 className="font-display font-black text-6xl tracking-tighter uppercase leading-[0.9] mb-6 animate-in slide-in-from-left duration-700">Command Center</h1>
            <p className="text-white/60 font-medium text-lg leading-relaxed italic animate-in slide-in-from-left delay-200">
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${card.color} p-10 rounded-[3.5rem] border border-black/5 hover:scale-105 transition-all shadow-xl group cursor-default relative overflow-hidden`}
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all text-spot-charcoal">
                {card.icon}
              </div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-5 bg-white rounded-[1.5rem] shadow-lg group-hover:rotate-12 transition-transform">
                  {React.cloneElement(card.icon as React.ReactElement, { className: 'text-spot-charcoal' })}
                </div>
                <ArrowUpRight className="text-spot-charcoal/20 group-hover:text-spot-charcoal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/40 block mb-2 relative z-10">{card.label}</span>
              <div className="flex items-end gap-3 relative z-10">
                <span className="text-5xl font-display font-black text-spot-charcoal leading-none tracking-tighter">{card.value}</span>
                <span className="text-[10px] font-black text-spot-charcoal/60 mb-1">{card.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deep Insights */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Growth Chart */}
          <div className="lg:col-span-2 bg-white rounded-[4rem] p-12 border border-black/5 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-spot-red">Intelligence Feed</h2>
               <div className="flex gap-2">
                  <div className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">7 Days</div>
                  <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-40">30 Days</div>
               </div>
            </div>
            <div className="h-72 flex items-end gap-4">
               {[40, 65, 45, 90, 55, 75, 85].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className={`w-full rounded-2xl ${i === 3 ? 'bg-spot-red' : 'bg-spot-charcoal/5 group-hover:bg-spot-charcoal/10'} transition-all shadow-inner`}
                    />
                    <div className="text-[9px] font-black text-center mt-4 opacity-20 group-hover:opacity-100 uppercase tracking-widest">D{i+1}</div>
                  </div>
               ))}
            </div>
          </div>

          {/* Recent Activity / Registry */}
          <div className="bg-white rounded-[4rem] p-12 border border-black/5 shadow-2xl">
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-8 text-spot-charcoal">Inbound Narratives</h3>
            <div className="space-y-6">
              {recentLeads.length > 0 ? recentLeads.map((lead, i) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-black/5 hover:bg-white hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-spot-pastel-blue flex items-center justify-center font-black text-xs text-spot-charcoal">
                        {lead.name?.[0].toUpperCase()}
                     </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tighter text-spot-charcoal line-clamp-1">{lead.name}</span>
                        <span className="text-[9px] font-bold text-spot-charcoal/40 uppercase tracking-widest">
                          {lead.type === 'studio_enrollment' || lead.type === 'studio_interest' ? 'Studios' : 
                          (lead.type === 'event_booking' || lead.type === 'booking') ? 'Events' : 
                          lead.type === 'newsletter' ? 'Newsletter' : 'Enquiry'}
                        </span>
                      </div>
                  </div>
                  <span className="text-[8px] font-black text-spot-charcoal/20 uppercase whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )) : (
                <div className="text-center py-10 opacity-20 italic text-xs font-black uppercase tracking-widest">Registry Silent</div>
              )}
            </div>
            <button className="w-full mt-8 py-4 bg-spot-charcoal text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-spot-red transition-all shadow-xl">
               View Full Registry
            </button>
          </div>

          {/* Journal Lab & Health */}
          <div className="bg-white rounded-[4rem] p-10 border border-black/5 shadow-2xl flex flex-col justify-between overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <BookOpen size={120} />
             </div>
             
             <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-8 text-spot-charcoal/40">Infrastructure</h3>
              <div className="space-y-4">
                {[
                  { name: 'Database', status: 'Optimal', color: 'bg-green-500' },
                  { name: 'Assets', status: 'Connected', color: 'bg-green-500' },
                  { name: 'Search', status: 'Indexed', color: 'bg-green-500' },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/60">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.color} animate-pulse shadow-lg ${s.color}`} />
                      <span className="text-[10px] font-bold text-spot-charcoal">{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
             </div>
             
             <div className="bg-spot-pastel-pink/30 p-8 rounded-[2.5rem] mt-8 border border-spot-pastel-pink/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/40 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-3 relative z-10">
                   <Activity size={14} className="text-spot-red" /> 
                   Journal Velocity
                </span>
                <div className="text-lg font-black text-spot-charcoal uppercase leading-none tracking-tighter relative z-10">
                   {stats.posts} Stories Published
                </div>
                <p className="text-[9px] font-bold text-spot-charcoal/40 uppercase tracking-widest mt-2 relative z-10">
                   Optimized for AI & Discovery Logic
                </p>
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
