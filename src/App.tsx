import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { supabase } from './lib/supabase';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Microschool = React.lazy(() => import('./pages/Microschool'));
const Studios = React.lazy(() => import('./pages/Studios'));
const Careers = React.lazy(() => import('./pages/Careers'));
const About = React.lazy(() => import('./pages/About'));
const Events = React.lazy(() => import('./pages/Events'));
const EventDetail = React.lazy(() => import('./pages/EventDetail'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Philosophy = React.lazy(() => import('./pages/Philosophy'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Makerverse = React.lazy(() => import('./pages/Makerverse'));
const StudioDetail = React.lazy(() => import('./pages/StudioDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Refund = React.lazy(() => import('./pages/Refund'));

// Admin Components (Lazy)
const AdminLogin = React.lazy(() => import('./admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const AdminLeads = React.lazy(() => import('./admin/AdminLeads').then(m => ({ default: m.AdminLeads })));
const AdminStudios = React.lazy(() => import('./admin/AdminStudios').then(m => ({ default: m.AdminStudios })));
const AdminEvents = React.lazy(() => import('./admin/AdminEvents').then(m => ({ default: m.AdminEvents })));
const AdminBlog = React.lazy(() => import('./admin/AdminBlog').then(m => ({ default: m.AdminBlog })));
const AdminProjects = React.lazy(() => import('./admin/AdminProjects').then(m => ({ default: m.AdminProjects })));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-spot-cream">
    <div className="w-12 h-12 border-4 border-spot-red border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Router>
      <div className="relative">
        <div className="paper-texture" />
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/microschool" element={<Microschool />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/studios/:id" element={<StudioDetail />} />
            <Route path="/makerverse" element={<Makerverse />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={session ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
            />
            <Route 
              path="/admin/leads" 
              element={session ? <AdminLeads /> : <Navigate to="/admin/login" />} 
            />
            <Route 
              path="/admin/studios" 
              element={session ? <AdminStudios /> : <Navigate to="/admin/login" />} 
            />
            <Route 
              path="/admin/events" 
              element={session ? <AdminEvents /> : <Navigate to="/admin/login" />} 
            />
            <Route 
              path="/admin/blog" 
              element={session ? <AdminBlog /> : <Navigate to="/admin/login" />} 
            />
            <Route 
              path="/admin/projects" 
              element={session ? <AdminProjects /> : <Navigate to="/admin/login" />} 
            />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
