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
  Users
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import * as XLSX from 'xlsx';

export const AdminLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, `SPOT_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || lead.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none mb-2">Form Leads</h1>
            <p className="text-spot-charcoal/60 font-medium">Manage and track all incoming requests from the website.</p>
          </div>
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-6 py-3 bg-spot-charcoal text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-spot-red transition-all shadow-xl haptic-feedback"
          >
            <Download size={16} />
            Export to Excel
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Enquiries', value: leads.length, icon: <Users className="text-blue-500" />, color: 'bg-blue-50' },
            { label: 'New Today', value: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length, icon: <Clock className="text-orange-500" />, color: 'bg-orange-50' },
            { label: 'Waitlist/Enrollment', value: leads.filter(l => l.type === 'studio_enrollment').length, icon: <Tag className="text-green-500" />, color: 'bg-green-50' },
          ].map((stat, idx) => (
            <div key={idx} className={`${stat.color} p-6 rounded-[2.5rem] border border-black/5 flex items-center justify-between`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block mb-1">{stat.label}</span>
                <span className="text-3xl font-display font-black text-spot-charcoal">{stat.value}</span>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-spot-charcoal/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-black/5 rounded-2xl focus:outline-none focus:border-spot-red transition-all font-medium text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'general', 'studio_enrollment', 'booking', 'career', 'newsletter'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] transition-all whitespace-nowrap ${
                  filterType === type 
                    ? 'bg-spot-charcoal text-white shadow-lg' 
                    : 'bg-slate-50 text-spot-charcoal/40 hover:bg-slate-100'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-[3rem] border border-black/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-black/5">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Timestamp</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Lead Name</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Type</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Contact</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Details</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-black/5 hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-spot-charcoal">{new Date(lead.created_at).toLocaleDateString()}</span>
                        <span className="text-[10px] font-bold text-spot-charcoal/40">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-spot-pastel-pink rounded-xl flex items-center justify-center font-black text-spot-red text-xs">
                          {lead.name?.[0]}
                        </div>
                        <span className="text-sm font-black text-spot-charcoal uppercase tracking-tight">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                        lead.type === 'studio_enrollment' ? 'bg-orange-100 text-orange-700' : 
                        lead.type === 'booking' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        <Tag size={12} />
                        {lead.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-spot-charcoal/70">
                          <Mail size={14} className="text-spot-red" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-xs font-bold text-spot-charcoal/70">
                            <Phone size={14} className="text-spot-red" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="max-w-xs truncate text-[11px] font-medium text-spot-charcoal/60 leading-tight italic">
                        {lead.metadata?.message || lead.metadata?.studio_interest || lead.metadata?.program || "N/A"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button className="p-2 text-spot-charcoal/20 hover:text-spot-red transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLeads.length === 0 && !loading && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-200" />
              </div>
              <h3 className="text-lg font-black text-spot-charcoal uppercase tracking-tighter">No leads found</h3>
              <p className="text-spot-charcoal/40 text-sm">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
