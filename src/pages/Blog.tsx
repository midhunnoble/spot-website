import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Calendar, ChevronRight, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

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
          .select('id, title, slug, excerpt, author, author_role, category, published_at, reading_time, image_url, tags, featured')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        
        if (data) {
          setPosts(data);
        } else {
            // Fallback if no data yet (for demonstration)
            setPosts([]);
        }
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

  const featuredPost = posts.find(p => p.featured) || posts[0];

  return (
    <main className="bg-spot-cream min-h-screen pt-20">
      <SEO 
        title="Journal of Growth | SPOT Blog" 
        description="Divergent thoughts on education, community stories, and microschool insights from the SPOT collective."
      />
      {/* Dynamic Header section */}
      <section className="px-6 py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 relative">
          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-spot-red font-black text-[12px] uppercase tracking-[0.5em] mb-6 block">The Collective Intelligence</span>
              <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[140px] text-spot-charcoal leading-[0.75] uppercase tracking-tighter mb-10">
                Journal <br/>of <span className="text-spot-red italic">Growth.</span>
              </h1>
              <p className="text-2xl md:text-3xl text-spot-charcoal/50 font-medium leading-tight max-w-2xl">
                Navigating the frontier of education through narratives, science, and divergent studio culture.
              </p>
            </motion.div>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-[400px] relative z-20">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-spot-charcoal/20 group-focus-within:text-spot-red transition-all" size={24} />
              <input 
                type="text" 
                placeholder="Search the collective..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-6 rounded-full bg-white/50 backdrop-blur-xl border border-black/5 focus:outline-none focus:border-spot-red focus:bg-white transition-all font-bold text-lg shadow-2xl"
              />
            </div>
          </div>
          
          {/* Abstract Shape Background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-spot-pastel-pink/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        </div>
      </section>

      {/* Featured Insight (Framer Style Large Card) */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[5rem] bg-spot-charcoal min-h-[70vh] flex flex-col md:flex-row shadow-2xl cursor-pointer"
          >
            <div className="md:w-[55%] relative h-[50vh] md:h-auto overflow-hidden">
              <img 
                src={featuredPost.image_url} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-[2000ms] opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-spot-charcoal via-transparent to-transparent" />
            </div>
            <div className="md:w-[45%] p-12 md:p-24 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-2 rounded-full bg-spot-red animate-ping" />
                <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Latest Insight</span>
              </div>
              <h2 className="font-display font-black text-5xl md:text-7xl lg:text-[80px] text-white mb-10 leading-[0.8] uppercase tracking-tighter group-hover:text-spot-red transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-xl text-white/50 mb-12 leading-relaxed font-medium line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <Link to={`/blog/${featuredPost.slug}`} className="flex items-center gap-6 group/btn">
                <div className="w-20 h-20 bg-white text-spot-charcoal rounded-3xl flex items-center justify-center group-hover/btn:bg-spot-red group-hover/btn:text-white transition-all rotate-12 group-hover/btn:rotate-0 shadow-2xl">
                   <ArrowRight size={32} />
                </div>
                <span className="font-display font-black text-2xl uppercase tracking-tighter text-white group-hover/btn:translate-x-3 transition-transform">Begin Reading</span>
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Modern Filter System */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-8">
           <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-spot-charcoal">Browse by Theme</h3>
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-spot-pastel-blue" />
              <div className="w-2 h-2 rounded-full bg-spot-pastel-pink" />
              <div className="w-2 h-2 rounded-full bg-spot-pastel-yellow" />
           </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-spot-red text-white shadow-xl scale-110 z-10' 
                : 'bg-white glass-morphism text-spot-charcoal/30 hover:text-spot-red border border-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Minimalist Visual Grid (Framer Style) */}
      <section className="px-6 py-12 pb-48 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
               <Loader2 className="animate-spin text-spot-red mb-4" size={40} />
               <p className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">Sychnronizing Collective...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-32">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 2) * 0.2 }}
                className="group flex flex-col relative"
              >
                <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] rounded-[4rem] overflow-hidden mb-10 shadow-lg group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 bg-white">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute bottom-10 left-10">
                    <span className="px-6 py-2.5 glass-morphism border border-white/20 text-spot-charcoal text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl backdrop-blur-3xl">
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="flex-1 flex flex-col px-4">
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/20 mb-6">
                    <span className="flex items-center gap-2 font-bold text-spot-charcoal/40"><Calendar size={14} className="text-spot-red" /> {post.published_at}</span> 
                    <span className="flex items-center gap-2 font-bold text-spot-charcoal/40"><Clock size={14} className="text-spot-pastel-blue" /> {post.reading_time}</span>
                  </div>
                  
                  <h3 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-spot-charcoal mb-6 uppercase tracking-tighter leading-[0.85] group-hover:text-spot-red transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-spot-charcoal/50 text-xl font-medium leading-relaxed line-clamp-2 mb-10 pr-12">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-4 text-spot-red font-black text-[11px] uppercase tracking-[0.3em] group/btn">
                    Details of the Narrative <div className="w-10 h-10 rounded-full border border-spot-red/20 flex items-center justify-center group-hover/btn:bg-spot-red group-hover/btn:text-white transition-all"><ChevronRight size={18} /></div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-4 border-dashed border-black/5 rounded-[5rem]">
            <h3 className="font-display text-4xl font-black text-spot-charcoal/10 uppercase tracking-tighter">No narratives found</h3>
          </div>
        )}
      </section>

      {/* Floating Bottom Section */}
      <section className="px-6 py-32 md:py-40 bg-spot-charcoal rounded-t-[5rem] md:rounded-t-[8rem] relative overflow-hidden mt-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                <Sparkles className="text-spot-red mb-8 md:mb-10" size={60} md-size={80} />
                <h2 className="font-display font-black text-5xl md:text-8xl text-white mb-8 md:mb-10 tracking-tighter uppercase leading-[0.8]">
                  The Culture <br/><span className="text-spot-red">Unfiltered.</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/40 font-medium leading-tight max-w-xl">
                  Monthly deep-dives into divergent learning architecture and student project forensics.
                </p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative w-full min-h-[400px] flex items-center"
             >
                {newsletterSuccess ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full text-center bg-white/5 p-12 md:p-20 rounded-[3rem] md:rounded-[4rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
                    <CheckCircle2 size={80} className="text-spot-pastel-green mx-auto mb-6 shadow-2xl shadow-spot-pastel-green/20" />
                    <h3 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tighter">Synchronized.</h3>
                    <p className="text-white/40 font-medium mt-4">Welcome to the collective intelligence.</p>
                  </motion.div>
                ) : (
                  <form className="w-full space-y-6" onSubmit={async (e) => {
                    e.preventDefault();
                    
                    const nameInput = (e.currentTarget.elements.namedItem('subscriber_name') as HTMLInputElement).value;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(newsletterEmail)) {
                      alert("Please enter a valid email address.");
                      return;
                    }

                    setIsSubmittingNewsletter(true);
                    try {
                      const { error } = await supabase.from('leads').insert([{ 
                        type: 'newsletter', 
                        name: nameInput,
                        email: newsletterEmail,
                        status: 'new'
                      }]);
                      if (error) throw error;
                      setNewsletterSuccess(true);
                    } catch (err: any) { 
                      console.error('Newsletter Error:', err);
                      alert(err.message || 'Connection error. Please try again.'); 
                    } finally { 
                      setIsSubmittingNewsletter(false); 
                    }
                  }}>
                    <div className="space-y-4">
                      <input 
                        name="subscriber_name"
                        required type="text" placeholder="Your name" 
                        className="w-full px-8 py-6 md:px-10 md:py-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/10 border border-white/10 text-white placeholder:text-white/20 focus:ring-4 focus:ring-spot-red focus:bg-white focus:text-spot-charcoal transition-all font-bold text-lg md:text-xl shadow-2xl"
                      />
                      <input 
                        required type="email" placeholder="Primary email" 
                        value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full px-8 py-6 md:px-10 md:py-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/10 border border-white/10 text-white placeholder:text-white/20 focus:ring-4 focus:ring-spot-red focus:bg-white focus:text-spot-charcoal transition-all font-bold text-lg md:text-xl shadow-2xl"
                      />
                    </div>
                    <button 
                      disabled={isSubmittingNewsletter}
                      className="group w-full py-6 md:py-8 bg-spot-red text-white font-black uppercase tracking-[0.2em] rounded-[2rem] md:rounded-[2.5rem] text-xs md:text-sm shadow-2xl hover:bg-white hover:text-spot-red transition-all haptic-feedback flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmittingNewsletter ? <Loader2 className="animate-spin" /> : (
                        <>
                          Join the Collective <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-white/20 text-center font-black uppercase tracking-widest px-6 md:px-10 leading-relaxed">
                      By Joining, you agree to receive Divergent insights and Studio updates. 
                    </p>
                  </form>
                )}
             </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
