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
  BookOpen,
  Sparkles,
  Search,
  Database,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton } from '../components/ui/Skeleton';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    leads: 0,
    studios: 0,
    events: 0,
    posts: 0,
    waitlist: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leads, studios, events, posts, waitlist, recent] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('studios').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('posts').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }).filter('metadata->>is_waitlist', 'eq', 'true'),
          supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(6)
        ]);

        setStats({
          leads: leads.count || 0,
          studios: studios.count || 0,
          events: events.count || 0,
          posts: posts.count || 0,
          waitlist: waitlist.count || 0
        });
        setRecentLeads(recent.data || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchData();
  }, []);

  const cards = [
    { label: 'Inbound Registry', value: stats.leads, icon: <Activity size={24} />, color: 'bg-spot-pastel-blue', size: 'col-span-1 md:col-span-2' },
    { label: 'Studios', value: stats.studios, icon: <Sparkles size={24} />, color: 'bg-spot-pastel-pink', size: 'col-span-1' },
    { label: 'Events', value: stats.events, icon: <Calendar size={24} />, color: 'bg-spot-pastel-green', size: 'col-span-1' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-12 pb-20 p-6">
          <Skeleton className="h-64 w-full rounded-[4rem]" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Skeleton className="h-48 md:col-span-2 rounded-[3.5rem]" />
            <Skeleton className="h-48 rounded-[3.5rem]" />
            <Skeleton className="h-48 rounded-[3.5rem]" />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Skeleton className="h-[500px] lg:col-span-2 rounded-[4rem]" />
            <Skeleton className="h-[500px] rounded-[4rem]" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12 pb-20 p-4 md:p-6 lg:p-8">
        {/* Command Center: Enhanced Glassmorphism */}
        <div className="relative group overflow-hidden rounded-[4rem] shadow-2xl bg-spot-charcoal p-8 md:p-14 text-white">
          <div className="absolute top-[-50%] right-[-20%] w-[100%] h-[200%] bg-gradient-to-br from-spot-red/30 via-spot-pastel-pink/5 to-transparent blur-[120px] rounded-full rotate-45 animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-spot-pastel-blue/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-white/50">
                <Smartphone size={12} className="text-spot-red" /> Device ID: Command_v1.0
              </div>
              <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter uppercase leading-[0.85] mb-8 text-wrap-balance">
                Command <br /><span className="text-spot-red italic">Center</span>
              </h1>
              <p className="text-white/60 font-medium text-lg md:text-xl leading-snug italic text-pretty">
                "Connection Before Correction." Your neural interface for scaling the affirmative future.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 relative z-10 w-full lg:w-auto">
               <div className="flex-1 lg:flex-none p-6 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 text-center min-w-[140px] shadow-inner">
                  <span className="block text-[10px] uppercase font-black tracking-widest opacity-40 mb-3">Health</span>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]" />
                    <span className="text-2xl font-black text-white leading-none">ACTIVE</span>
                  </div>
               </div>
               <div className="flex-1 lg:flex-none p-6 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 text-center min-w-[140px] shadow-inner">
                  <span className="block text-[10px] uppercase font-black tracking-widest opacity-40 mb-3">Sync State</span>
                  <div className="text-2xl font-black text-spot-pastel-yellow flex items-center justify-center gap-2 leading-none">
                     <TrendingUp size={20} className="mb-0.5" /> +12%
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bento Grid: Stats Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`${card.size} ${card.color} p-8 md:p-12 rounded-[3.5rem] border border-black/5 shadow-xl group relative overflow-hidden flex flex-col justify-between min-h-[220px]`}
            >
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-700 text-spot-charcoal">
                {React.cloneElement(card.icon as React.ReactElement, { size: 160 })}
              </div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500">
                  {React.cloneElement(card.icon as React.ReactElement, { className: 'text-spot-charcoal', size: 24 })}
                </div>
                <ArrowUpRight className="text-spot-charcoal/20 group-hover:text-spot-charcoal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/40 block mb-2">{card.label}</span>
                <div className="flex items-end gap-3 leading-none">
                  <span className="text-6xl font-display font-black text-spot-charcoal tracking-tighter">{card.value}</span>
                  <span className="text-[10px] font-black text-spot-charcoal/30 mb-2 uppercase tracking-widest">Total Active</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Bento Cell: Resonance Archive (Posts) */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.01 }}
            className="col-span-1 bg-spot-pastel-yellow p-8 md:p-12 rounded-[3.5rem] border border-black/5 shadow-xl group relative overflow-hidden flex flex-col justify-between"
          >
             <div className="flex justify-between items-start relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center transition-all group-hover:-rotate-12">
                   <BookOpen size={24} className="text-spot-charcoal" />
                </div>
             </div>
             <div className="mt-8 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-spot-charcoal/40 block mb-2">Resonance Archive</span>
                <div className="text-6xl font-display font-black text-spot-charcoal tracking-tighter leading-none">{stats.posts}</div>
             </div>
          </motion.div>
        </div>

        {/* Intelligence Feed & Registry Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart Cell */}
          <div className="lg:col-span-2 bg-white rounded-[4rem] p-10 md:p-14 border border-black/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-14 opacity-[0.02] -rotate-12">
               <Activity size={200} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 relative z-10">
              <div>
                <h2 className="font-display font-black text-3xl uppercase tracking-tighter text-spot-charcoal">Intelligence Feed</h2>
                <p className="text-xs font-bold text-spot-charcoal/30 uppercase tracking-widest mt-1 text-pretty">Registry Flow Analysis (7 Days)</p>
              </div>
               <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
                  <button className="px-5 py-2.5 bg-white shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest">Growth</button>
                  <button className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest opacity-30">Intensity</button>
               </div>
            </div>
            
            <div className="h-80 flex items-end gap-5 relative z-10 px-2 lg:px-6">
               {[45, 75, 55, 100, 65, 85, 95].map((h, i) => (
                  <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "circOut" }}
                      className={`w-full rounded-2xl transition-all duration-500 relative ${i === 3 ? 'bg-spot-red shadow-[0_10px_30px_rgba(217,45,32,0.3)]' : 'bg-slate-100 hover:bg-slate-200'}`}
                    >
                      {i === 3 && <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-spot-charcoal text-white text-[9px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">PEAK</div>}
                    </motion.div>
                    <div className="text-[9px] font-black text-center mt-6 text-spot-charcoal/20 group-hover:text-spot-charcoal transition-colors uppercase tracking-widest">Phase 0{i+1}</div>
                  </div>
               ))}
            </div>
          </div>

          {/* Activity Sidebar Cell */}
          <div className="bg-white rounded-[4rem] p-10 md:p-12 border border-black/5 shadow-2xl flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-spot-charcoal">Narratives</h3>
              <div className="px-3 py-1 bg-spot-pastel-blue/20 text-spot-charcoal text-[9px] font-black rounded-full uppercase tracking-tighter">Live</div>
            </div>
            
            <div className="space-y-4 flex-grow">
              {recentLeads.length > 0 ? recentLeads.map((lead, i) => (
                <motion.div 
                  key={lead.id} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                  className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-3xl border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all cursor-default"
                >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center font-black text-sm text-spot-red group-hover:bg-spot-red group-hover:text-white transition-colors">
                        {lead.name?.[0].toUpperCase()}
                     </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-tighter text-spot-charcoal line-clamp-1">{lead.name}</span>
                        <span className="text-[9px] font-bold text-spot-charcoal/40 uppercase tracking-widest mt-0.5">
                          {lead.type?.replace('_', ' ') || 'Enquiry'}
                        </span>
                      </div>
                  </div>
                  <div className="text-[9px] font-black text-spot-charcoal/30 uppercase tabular-nums">
                    {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-20 opacity-20 italic text-xs font-black uppercase tracking-widest">Registry Silent</div>
              )}
            </div>
            
            <button 
              aria-label="View Full Registry"
              className="w-full min-h-[56px] mt-8 py-4 bg-spot-charcoal text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-spot-red active:scale-[0.98] transition-all shadow-xl shadow-spot-charcoal/10 outline-none focus-visible:ring-4 focus-visible:ring-spot-red/20"
            >
               Open Intelligence Core
            </button>
          </div>
        </div>

        {/* Bottom Bento: Infrastructure & Health */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="bg-white rounded-[4rem] p-10 border border-black/5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 rounded-2xl bg-spot-pastel-green/20 text-spot-pastel-green flex items-center justify-center">
                    <Database size={20} />
                 </div>
                 <h3 className="font-display font-black text-xl uppercase tracking-tighter tracking-widest">Infrastructure</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { name: 'Core Engine', status: 'Optimal', icon: <Zap size={14} /> },
                   { name: 'Storage Node', status: 'Synced', icon: <Database size={14} /> },
                   { name: 'Safety Shield', status: 'Secured', icon: <ShieldCheck size={14} /> },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-black/5 group hover:bg-white transition-all">
                      <div className="flex items-center gap-3">
                         <span className="text-spot-charcoal/30 group-hover:text-spot-red transition-colors">{s.icon}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/60">{s.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-green-500">{s.status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-2 bg-gradient-to-br from-spot-pastel-pink/20 to-spot-pastel-blue/20 rounded-[4rem] p-10 border border-black/5 shadow-2xl flex flex-col md:flex-row items-center gap-10 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              <div className="w-40 h-40 rounded-full bg-white border-8 border-white shadow-2xl flex items-center justify-center shrink-0 relative z-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 <motion.div
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 >
                    <Activity size={80} className="text-spot-red opacity-10" strokeWidth={1} />
                 </motion.div>
                 <div className="absolute inset-0 flex items-center justify-center font-display font-black text-4xl text-spot-charcoal">
                    {Math.round((stats.posts / 20) * 100)}%
                 </div>
              </div>
              <div className="relative z-10">
                 <div className="inline-block px-4 py-1.5 bg-spot-red text-white rounded-full text-[9px] font-black uppercase tracking-widest mb-4">Milestone Target</div>
                 <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-4 leading-none">Content Resonance</h3>
                 <p className="text-spot-charcoal/60 font-medium text-lg leading-snug text-pretty">
                    You've reached <span className="text-spot-red font-black">{stats.posts}</span> published narratives. The AI ingestion layer is running at <span className="text-spot-charcoal font-black italic underline">high efficiency</span>.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};
