import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Mail, 
  Phone, 
  Tag, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  X,
  FileSpreadsheet,
  ArrowRight,
  Filter,
  MessageSquare,
  Activity,
  Layout
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import { Skeleton } from '../components/ui/Skeleton';

export const AdminLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const getLabelForType = (type: string) => {
    switch (type) {
      case 'studio_enrollment':
      case 'studio_interest': return 'Studios';
      case 'event_booking': 
      case 'booking': return 'Events';
      case 'general':
      case 'contact': return 'General Inquiry';
      case 'newsletter': return 'Newsletter Spot';
      case 'career':
      case 'careers': return 'Career Pulse';
      case 'tour': return 'Experience Tour';
      default: return type.replace(/_/g, ' ').toUpperCase();
    }
  };

  const exportToExcel = () => {
    const dataToExport = filteredLeads.map(lead => {
      const exportRow: any = {
        'Category': getLabelForType(lead.type),
        'Submission Date': new Date(lead.created_at).toLocaleDateString('en-IN'),
        'Submission Time': new Date(lead.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        'Full Name': lead.name,
        'Email Address': lead.email,
        'Contact Number': lead.phone || 'N/A',
        'Lead Status': lead.status?.toUpperCase() || 'NEW',
        'Notes': lead.notes || 'N/A'
      };

      // Add metadata fields with pretty keys
      if (lead.metadata && typeof lead.metadata === 'object') {
        Object.entries(lead.metadata).forEach(([key, value]) => {
          const prettyKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          exportRow[prettyKey] = value === true ? 'Yes' : 
                                value === false ? 'No' : 
                                value === null || value === undefined ? 'N/A' :
                                typeof value === 'object' ? JSON.stringify(value) : 
                                value;
        });
      }

      return exportRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Website Registry");
    
    // Set column widths for better readability
    worksheet["!cols"] = [
      { wch: 15 }, // Date
      { wch: 15 }, // Time
      { wch: 20 }, // Category
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // Type
      { wch: 10 }, // Status
      ...Object.keys(dataToExport[0] || {}).slice(8).map(() => ({ wch: 20 }))
    ];

    const fileName = `SPOT_Registry_${dateRange.start || 'all'}_to_${dateRange.end || 'today'}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Normalize filter type comparison
    let matchesFilter = filterType === 'all';
    if (!matchesFilter) {
      if (filterType === 'events') {
        matchesFilter = lead.type === 'event_booking' || lead.type === 'booking';
      } else if (filterType === 'studios') {
        matchesFilter = lead.type === 'studio_enrollment' || lead.type === 'studio_interest';
      } else if (filterType === 'other') {
        matchesFilter = !['event_booking', 'booking', 'studio_enrollment', 'studio_interest'].includes(lead.type);
      }
    }
    
    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const leadDate = new Date(lead.created_at);
      if (dateRange.start) {
        const start = new Date(dateRange.start);
        start.setHours(0, 0, 0, 0);
        matchesDate = matchesDate && leadDate >= start;
      }
      if (dateRange.end) {
        const end = new Date(dateRange.end);
        end.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && leadDate <= end;
      }
    }

    return matchesSearch && matchesFilter && matchesDate;
  });

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white p-12 rounded-[4rem] border border-black/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-spot-pastel-blue/10 blur-[100px] rounded-full -mr-20 -mt-20" />
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-spot-charcoal rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md border border-white/10">
                <Users className="text-white" size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-spot-charcoal/30">Growth Logistics</span>
            </div>
            <h1 className="font-display font-black text-6xl text-spot-charcoal tracking-tighter uppercase leading-[0.85] mb-6 text-wrap-balance">
              Inbound <span className="text-spot-red italic">Registry.</span>
            </h1>
            <p className="text-lg md:text-xl text-spot-charcoal/50 font-medium leading-normal max-w-xl text-pretty">
              Track and transform interest into impact. High-density lead intelligence for the SPOT ecosystem.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4">
            <button 
              onClick={exportToExcel}
              aria-label="Download Full Report"
              className="px-10 py-6 bg-spot-charcoal text-white font-black uppercase tracking-[0.15em] text-[10px] rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl flex items-center gap-4 group active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-spot-red/20"
            >
              <FileSpreadsheet size={20} className="group-hover:rotate-12 transition-transform duration-500" />
              Download Full Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-xl space-y-6">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2 rounded-full" />
                  <Skeleton className="h-10 w-3/4 rounded-xl" />
                </div>
              </div>
            ))
          ) : (
            [
              { label: 'Total Volume', value: leads.length, color: 'bg-white', icon: <Activity size={20} className="text-spot-charcoal" /> },
              { label: 'New This Week', value: leads.filter(l => {
                const d = new Date(l.created_at);
                const now = new Date();
                return d > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              }).length, color: 'bg-spot-red', icon: <Clock size={20} className="text-white" />, textColor: 'text-white' },
              { label: 'Studio Interests', value: leads.filter(l => l.type === 'studio_enrollment').length, color: 'bg-spot-pastel-pink', icon: <Layout size={20} className="text-spot-charcoal" /> },
              { label: 'Event Bookings', value: leads.filter(l => l.type === 'event_booking' || l.type === 'booking').length, color: 'bg-spot-pastel-blue', icon: <Calendar size={20} className="text-spot-charcoal" /> },
            ].map((stat, i) => (
              <div key={i} className={`${stat.color} p-8 rounded-[3rem] border border-black/5 shadow-xl group hover:scale-[1.02] transition-all`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${stat.textColor === 'text-white' ? 'bg-white/20' : 'bg-slate-50'} shadow-sm group-hover:rotate-6 transition-transform`}>
                    {stat.icon}
                  </div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${stat.textColor || 'text-spot-charcoal/40'}`}>{stat.label}</span>
                <span className={`text-4xl font-display font-black tracking-tighter tabular-nums ${stat.textColor || 'text-spot-charcoal'}`}>{stat.value}</span>
              </div>
            ))
          )}
        </div>

        {/* Controls Section */}
        <div className="bg-white p-10 rounded-[4rem] border border-black/5 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-spot-charcoal/20 group-focus-within:text-spot-red transition-all" size={24} />
              <input 
                type="text" 
                placeholder="Search name, email, or content..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-black/5 rounded-[2rem] focus:outline-none focus:border-spot-red focus:bg-white transition-all font-bold text-lg"
              />
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-[2rem] border border-black/5">
              <div className="flex items-center gap-3 px-6 py-2 bg-white rounded-xl shadow-sm flex-1">
                <Calendar size={18} className="text-spot-red" />
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full bg-transparent border-none text-[10px] font-black uppercase focus:ring-0 p-0"
                />
              </div>
              <span className="text-spot-charcoal/20 font-black uppercase text-[10px]">to</span>
              <div className="flex items-center gap-3 px-6 py-2 bg-white rounded-xl shadow-sm flex-1">
                <Calendar size={18} className="text-spot-red" />
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full bg-transparent border-none text-[10px] font-black uppercase focus:ring-0 p-0"
                />
              </div>
              {(dateRange.start || dateRange.end) && (
                <button 
                  onClick={() => setDateRange({ start: '', end: '' })}
                  className="p-3 hover:bg-spot-red/10 group rounded-xl transition-all"
                >
                  <X size={18} className="text-spot-charcoal/40 group-hover:text-spot-red" />
                </button>
              )}
            </div>
          </div>

          {/* Filtering Tabs */}
          <div className="flex gap-4 overflow-x-auto pb-4 scroll-hide border-t border-black/5 pt-10">
            {[
              { id: 'all', label: 'All Narratives' },
              { id: 'studios', label: 'Studios' },
              { id: 'events', label: 'Events' },
              { id: 'other', label: 'Other Inquiries' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all whitespace-nowrap active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-spot-red/20 ${
                  filterType === type.id 
                    ? 'bg-spot-red text-white shadow-xl translate-y-[-2px]' 
                    : 'bg-slate-50 text-spot-charcoal/30 hover:text-spot-charcoal hover:bg-slate-100'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Table / View */}
        <div className="bg-white rounded-[4rem] border border-black/5 shadow-2xl overflow-hidden relative min-h-[400px]">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 space-y-8">
                <div className="flex gap-8 pb-4 border-b border-black/5">
                   {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-6 flex-1 rounded-full" />)}
                </div>
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-8 items-center">
                    <Skeleton className="w-16 h-16 rounded-[1.5rem]" />
                    <Skeleton className="h-12 flex-1 rounded-2xl" />
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-12 w-48 rounded-2xl" />
                    <Skeleton className="w-14 h-14 rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-black/5">
                    <th className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/40">Inbound Data</th>
                    <th className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/40">Category</th>
                    <th className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/40">Intelligence</th>
                    <th className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/40">Contact Method</th>
                    <th className="px-12 py-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-spot-pastel-pink/30 rounded-[1.5rem] flex items-center justify-center font-display font-black text-spot-red text-xl shadow-inner group-hover:rotate-6 transition-transform">
                            {lead.name?.[0]}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-black text-spot-charcoal uppercase tracking-tighter leading-none mb-2">{lead.name}</span>
                            <span className="text-[10px] font-black text-spot-charcoal/40 uppercase tracking-widest flex items-center gap-2 tabular-nums">
                              <Clock size={12} className="text-spot-red" />
                              {new Date(lead.created_at).toLocaleDateString()} @ {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-8">
                         <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-sm ${
                          lead.type === 'studio_enrollment' ? 'bg-orange-100 text-orange-700' : 
                          (lead.type === 'event_booking' || lead.type === 'booking') ? 'bg-blue-100 text-blue-700' :
                          lead.type === 'newsletter' ? 'bg-spot-red/10 text-spot-red' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                             lead.type === 'studio_enrollment' ? 'bg-orange-500' : 
                             (lead.type === 'event_booking' || lead.type === 'booking') ? 'bg-blue-500' :
                             'bg-slate-500'
                          }`} />
                          {getLabelForType(lead.type)}
                        </span>
                      </td>
                      <td className="px-12 py-8">
                        <div className="max-w-xs space-y-1">
                          <div className="text-sm font-bold text-spot-charcoal/80 line-clamp-2 italic leading-snug text-pretty">
                            {lead.metadata?.message || lead.metadata?.studio_interest || lead.metadata?.program || "No additional context."}
                          </div>
                          {lead.metadata?.child_name && (
                             <div className="text-[10px] font-black uppercase tracking-widest text-spot-red">
                               Prospective: {lead.metadata.child_name}
                             </div>
                          )}
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <div className="flex flex-col gap-3">
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-sm font-bold text-spot-charcoal hover:text-spot-red transition-colors group/link">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/link:bg-spot-red/10 transition-colors">
                              <Mail size={14} className="text-spot-red" />
                            </div>
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="flex items-center gap-3 text-sm font-bold text-spot-charcoal hover:text-spot-red transition-colors group/link">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/link:bg-spot-red/10 transition-colors">
                                <Phone size={14} className="text-spot-red" />
                              </div>
                              {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-12 py-8 text-right">
                         <button 
                          onClick={() => setSelectedLead(lead)}
                          aria-label="View Details"
                          className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-charcoal/20 hover:text-white hover:bg-spot-red transition-all active:scale-95 shadow-sm"
                         >
                           <ChevronRight size={24} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filteredLeads.length === 0 && !loading && (
            <div className="py-40 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search size={40} className="text-slate-200" />
              </div>
              <h3 className="text-3xl font-display font-black text-spot-charcoal uppercase tracking-tighter mb-4">Void of Signal</h3>
              <p className="text-spot-charcoal/40 text-lg font-medium max-w-sm mx-auto">No inbound narratives match your current coordinates. Try broad-spectrum filtering.</p>
            </div>
          )}
        </div>

        {/* Lead Details Modal */}
        <AnimatePresence>
          {selectedLead && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLead(null)}
                className="absolute inset-0 bg-spot-charcoal/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-black/5"
              >
                <div className="p-10 md:p-14 space-y-12">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-spot-pastel-pink/50 rounded-[2.5rem] flex items-center justify-center font-display font-black text-spot-red text-4xl shadow-inner">
                        {selectedLead.name?.[0]}
                      </div>
                      <div>
                        <h2 className="font-display font-black text-5xl text-spot-charcoal uppercase tracking-tighter leading-none mb-4">{selectedLead.name}</h2>
                        <span className="px-6 py-2 bg-spot-red/10 text-spot-red rounded-full text-[10px] font-black uppercase tracking-widest">{selectedLead.type.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="p-4 hover:bg-slate-50 rounded-2xl transition-all">
                      <X size={24} className="text-spot-charcoal/40" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-y border-black/5 py-10">
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 block">Electronic Node</span>
                        <div className="text-xl font-bold text-spot-charcoal break-all font-display tracking-tight hover:underline cursor-pointer">
                          <a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 block">Physical Frequency</span>
                        <div className="text-xl font-bold text-spot-charcoal font-display tracking-tight">
                          {selectedLead.phone ? <a href={`tel:${selectedLead.phone}`}>{selectedLead.phone}</a> : 'NO FREQUENCY'}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 block border-b border-black/5 pb-4">Metadata Payload</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {Object.entries(selectedLead.metadata || {}).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <span className="text-[9px] font-black uppercase text-spot-red/50 tracking-widest">{key.replace(/_/g, ' ')}</span>
                          <div className="text-sm font-bold text-spot-charcoal/80 leading-snug">
                             {typeof value === 'boolean' ? (value ? 'YES' : 'NO') : String(value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 flex gap-4">
                     <a 
                      href={`mailto:${selectedLead.email}`}
                      className="flex-1 py-6 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-3xl text-center hover:bg-spot-red transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
                     >
                       <Mail size={18} />
                       Establish Connection
                     </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
