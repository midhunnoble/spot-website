import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Calendar, User, Tag, ChevronRight, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

// This structure is designed to be directly compatible with a Supabase 'posts' table
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  author_role: string;
  category: string;
  published_at: string;
  reading_time: string;
  image_url: string;
  tags: string[];
  featured?: boolean;
}

const CATEGORIES = ["All", "Learning Models", "Microschool Projects", "SPOT Insights", "Community Stories"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('published_at', { ascending: false });
        
        // Filter for published posts in frontend for safety if we can't update DB
        // But for dummy data to show, we might need to show drafts too
        if (data) setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured);

  return (
    <main className="bg-spot-cream min-h-screen pt-20">
      {/* Header section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-spot-red font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">The SPOT Journal</span>
              <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[100px] text-spot-charcoal leading-[0.85] uppercase tracking-tighter mb-8">
                Insights <br/>& <span className="text-spot-red">Learnings.</span>
              </h1>
              <p className="text-2xl text-spot-charcoal/60 font-medium leading-tight max-w-xl">
                Documenting the evolution of divergent learning, studio culture, and project narratives.
              </p>
            </motion.div>
          </div>

          <div className="w-full md:w-96">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-spot-charcoal/30 group-focus-within:text-spot-red transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium shadow-sm hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post (Heroic) */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="group relative overflow-hidden rounded-[4rem] bg-spot-charcoal min-h-[60vh] flex flex-col md:flex-row shadow-2xl"
          >
            <div className="md:w-3/5 relative h-[40vh] md:h-auto overflow-hidden">
              <img 
                src={featuredPost.image_url} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-spot-charcoal via-spot-charcoal/40 to-transparent" />
            </div>
            <div className="md:w-2/5 p-12 md:p-20 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-1.5 bg-spot-red text-white text-[10px] font-black uppercase tracking-widest rounded-full">Featured</span>
                <span className="text-spot-cream/40 text-[10px] font-black uppercase tracking-widest">{featuredPost.category}</span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[0.9] uppercase tracking-tighter group-hover:text-spot-pastel-pink transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-spot-cream/70 mb-10 leading-snug font-medium line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-10 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-spot-pastel-pink flex items-center justify-center text-spot-charcoal font-black text-xl">
                    {featuredPost.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm tracking-tighter">{featuredPost.author}</div>
                    <div className="text-spot-cream/40 text-[10px] font-black uppercase tracking-widest">{featuredPost.published_at}</div>
                  </div>
                </div>
                <Link to={`/blog/${featuredPost.slug}`} className="w-14 h-14 bg-white text-spot-charcoal rounded-full flex items-center justify-center hover:bg-spot-red hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95">
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Categories filter */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-spot-charcoal text-white shadow-xl scale-105 z-10' 
                : 'bg-white glass-morphism text-spot-charcoal/40 hover:text-spot-red border border-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 py-12 pb-32 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
               <img src="/assets/logos/the_circle_india.png" alt="The Circle India" className="w-full h-auto" />
              <p className="mt-6 font-display font-black uppercase text-xs tracking-widest text-spot-charcoal/40">Proudly Sponsored By</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="block relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 shadow-xl border border-black/5 bg-white">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 glass-morphism border border-white/20 text-spot-charcoal text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">
                    <Calendar size={14} className="text-spot-red" /> {post.published_at} 
                    <span className="opacity-30">•</span> 
                    <Clock size={14} className="text-spot-pastel-blue" /> {post.reading_time}
                  </div>
                  
                  <h3 className="font-display font-black text-3xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-none group-hover:text-spot-red transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-spot-charcoal/70 text-lg font-medium leading-snug line-clamp-3 mb-8">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-spot-cream border border-black/5 flex items-center justify-center font-black text-xs">
                        {post.author[0]}
                      </div>
                      <span className="text-xs font-bold text-spot-charcoal/60">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-spot-red font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                      Read More <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-black/5">
            <h3 className="font-display text-4xl font-black text-spot-charcoal opacity-20 uppercase tracking-tighter">No writings found</h3>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-6 text-spot-red font-black uppercase tracking-[0.2em] text-[10px] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter / Join the culture */}
      <section className="px-6 py-32 pb-48">
        <div className="max-w-7xl mx-auto">
          <div className="bg-spot-pastel-pink/20 rounded-[5rem] p-12 md:p-24 relative overflow-hidden border border-spot-pastel-pink/30">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-spot-red rounded-full blur-[150px]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              {newsletterSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12"
                >
                  <div className="w-20 h-20 bg-spot-pastel-green rounded-3xl flex items-center justify-center text-spot-charcoal mb-8 mx-auto rotate-12 shadow-xl">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-display font-black text-5xl text-spot-charcoal mb-4 uppercase tracking-tighter">Welcome!</h3>
                  <p className="text-spot-charcoal/70 text-2xl font-medium">You're now part of the collective.</p>
                </motion.div>
              ) : (
                <>
                  <Sparkles className="text-spot-red mb-8" size={60} />
                  <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[80px] text-spot-charcoal mb-8 tracking-tighter uppercase leading-[0.85]">
                    Get the <span className="text-spot-red">Unfiltered</span> <br/>Insights.
                  </h2>
                  <p className="text-2xl text-spot-charcoal/70 mb-12 font-medium leading-tight">
                    Monthly updates on divergent learning models, student project breakdowns, and the science of studio culture.
                  </p>
                  
                  <form className="w-full flex flex-col sm:flex-row gap-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmittingNewsletter(true);
                    try {
                      const { error } = await supabase
                        .from('leads')
                        .insert([{
                          type: 'newsletter',
                          email: newsletterEmail,
                          name: 'Newsletter Subscriber'
                        }]);
                      if (error) throw error;
                      setNewsletterSuccess(true);
                    } catch (err) {
                      console.error('Newsletter error:', err);
                      alert('Something went wrong. Please try again.');
                    } finally {
                      setIsSubmittingNewsletter(false);
                    }
                  }}>
                    <input 
                      required
                      type="email" 
                      placeholder="Your primary email" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-8 py-6 rounded-3xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-lg shadow-sm"
                    />
                    <button 
                      disabled={isSubmittingNewsletter}
                      className="px-12 py-6 bg-spot-charcoal text-white font-black uppercase tracking-widest rounded-3xl text-sm shadow-2xl hover:bg-black transition-all haptic-feedback disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmittingNewsletter ? <><Loader2 className="animate-spin" size={20} /> Joining...</> : "Join Collective"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
