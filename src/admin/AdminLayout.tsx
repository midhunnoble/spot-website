import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Calendar, 
  Layout, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <BarChart3 size={20} />, path: '/admin' },
    { name: 'Leads', icon: <Users size={20} />, path: '/admin/leads' },
    { name: 'Studios', icon: <Layout size={20} />, path: '/admin/studios' },
    { name: 'Events', icon: <Calendar size={20} />, path: '/admin/events' },
    { name: 'Projects', icon: <Sparkles size={20} />, path: '/admin/projects' },
    { name: 'Journal', icon: <BookOpen size={20} />, path: '/admin/blog' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-spot-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-spot-charcoal text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 shadow-2xl`}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-spot-red rounded-xl flex items-center justify-center shadow-lg shadow-spot-red/30">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-display font-black text-xl tracking-tighter uppercase leading-none">SPOT</h1>
              <span className="text-[10px] font-black uppercase tracking-widest text-spot-red">Admin Portal</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold text-sm tracking-tight ${
                  location.pathname === item.path
                    ? 'bg-spot-red text-white shadow-lg shadow-spot-red/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.name}
                {location.pathname === item.path && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            ))}
            <Link
              to="/"
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold text-sm mt-4"
            >
              <Sparkles size={20} />
              View Site
            </Link>
          </nav>

          <div className="pt-8 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/40 hover:text-spot-red hover:bg-spot-red/5 transition-all w-full font-bold text-sm"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-spot-charcoal"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="ml-auto flex items-center gap-4">
            <div className="text-right flex flex-col">
              <span className="text-xs font-black text-spot-charcoal/40 uppercase tracking-widest leading-none mb-1">Authenticated as</span>
              <span className="text-sm font-bold text-spot-charcoal">{user?.email}</span>
            </div>
            <div className="w-10 h-10 bg-spot-pastel-blue rounded-full flex items-center justify-center font-black text-spot-charcoal shadow-inner">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
