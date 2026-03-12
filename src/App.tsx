import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

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

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-spot-cream">
    <div className="w-12 h-12 border-4 border-spot-red border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
