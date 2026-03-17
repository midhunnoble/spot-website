import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, User, Share2, Facebook, Twitter, Link2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recommendations, setRecommendations] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPostData() {
      try {
        setIsLoading(true);
        const { data: postData, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (postData) {
          setPost(postData);
          
          // Fetch recommendations
          const { data: recData } = await supabase
            .from('posts')
            .select('*')
            .neq('id', postData.id)
            .limit(2);
          
          if (recData) setRecommendations(recData);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPostData();
    window.scrollTo(0, 0);
  }, [slug]);

  const shareOnWhatsApp = () => {
    const url = window.location.href;
    const text = `Check out this insight from SPOT: ${post?.title}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const shareOnGmail = () => {
    const url = window.location.href;
    const subject = `Insight from SPOT: ${post?.title}`;
    const body = `I thought you might find this interesting: ${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const shareOther = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-12 h-12 text-spot-red animate-spin" />
        <p className="font-display font-black text-xl uppercase tracking-tighter text-spot-charcoal/40 tracking-widest">Opening Article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-spot-cream flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-4xl font-display font-black mb-8 uppercase tracking-tighter">Writing not found</h2>
          <Link to="/blog" className="px-8 py-4 bg-spot-red text-white font-black uppercase tracking-widest rounded-2xl text-xs hover:bg-red-700 transition-colors shadow-xl">
             Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen selection:bg-spot-red selection:text-white">
      {/* Article Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/blog" className="pointer-events-auto flex items-center gap-3 px-6 py-3 bg-white shadow-xl rounded-full border border-black/5 font-black uppercase text-[10px] tracking-widest hover:bg-spot-red hover:text-white transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Journal
          </Link>
          <div className="flex gap-2 pointer-events-auto">
             <button 
               onClick={shareOnWhatsApp}
               className="p-3 bg-white shadow-xl rounded-full border border-black/5 hover:bg-green-500 hover:text-white transition-all"
               title="Share on WhatsApp"
             >
               <Share2 size={16} />
             </button>
             <button 
               onClick={shareOnGmail}
               className="p-3 bg-white shadow-xl rounded-full border border-black/5 hover:bg-red-500 hover:text-white transition-all"
               title="Share via Email"
             >
               <User size={16} />
             </button>
             <button 
               onClick={shareOther}
               className="p-3 bg-white shadow-xl rounded-full border border-black/5 hover:bg-spot-charcoal hover:text-white transition-all"
               title="Other Share Options"
             >
               <Link2 size={16} />
             </button>
          </div>
        </div>
      </nav>

      <article className="pt-32 pb-48">
        {/* Hero Section */}
        <header className="px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="px-4 py-1 bg-spot-red/10 text-spot-red text-[10px] font-black uppercase tracking-widest rounded-full">{post.category}</span>
                <span className="text-spot-charcoal/30 text-[10px] font-black uppercase tracking-widest">{post.reading_time}</span>
              </div>
              <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-spot-charcoal leading-[0.85] uppercase tracking-tighter mb-12">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center gap-12 py-10 border-y border-black/5">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-14 h-14 rounded-full bg-spot-pastel-pink flex items-center justify-center text-spot-charcoal font-black text-2xl border border-black/5 shadow-inner">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="text-spot-charcoal font-black text-sm tracking-tight">{post.author}</div>
                    <div className="text-spot-charcoal/40 text-[10px] font-black uppercase tracking-widest">{post.author_role}</div>
                  </div>
                </div>
                <div className="text-left">
                   <div className="text-spot-charcoal/40 text-[10px] font-black uppercase tracking-widest mb-1">Published On</div>
                   <div className="text-spot-charcoal font-bold text-sm tracking-tight">{post.published_at}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <section className="px-6 mb-24 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="aspect-video md:aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl bg-spot-cream"
          >
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover grayscale-[0.5] contrast-125" />
          </motion.div>
        </section>

        {/* Content Body */}
        <section className="px-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-2xl prose-spot max-w-none text-spot-charcoal/80 font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-20 pt-12 border-t border-black/5 flex flex-wrap gap-3">
             {post.tags.map((tag: string) => (
                <span key={tag} className="px-5 py-2 bg-spot-cream rounded-full text-[10px] font-black uppercase tracking-widest text-spot-charcoal/50 hover:text-spot-red transition-colors cursor-pointer">
                   #{tag}
                </span>
             ))}
          </div>
        </section>
      </article>

      {/* Recommended Posts */}
      <section className="bg-spot-cream py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
             <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">Continue <br/><span className="text-spot-red">Reading</span></h2>
             <Link to="/blog" className="font-handwriting text-3xl text-spot-charcoal/40 hover:text-spot-red transition-colors">View all entries</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
             {recommendations.map((p) => (
               <Link 
                 key={p.id} 
                 to={`/blog/${p.slug}`}
                 className="group flex flex-col md:flex-row gap-8 bg-white p-6 rounded-[3rem] shadow-xl border border-black/5 hover:scale-[1.02] transition-all duration-500"
               >
                 <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden shrink-0">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 </div>
                 <div className="flex flex-col justify-center">
                    <div className="text-spot-red text-[10px] font-black uppercase tracking-widest mb-3">{p.category}</div>
                    <h3 className="font-display font-black text-3xl uppercase tracking-tighter leading-none mb-4 group-hover:text-spot-red transition-colors">{p.title}</h3>
                    <p className="text-spot-charcoal/60 text-sm font-medium line-clamp-2">{p.excerpt}</p>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 text-center bg-white">
         <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-black text-4xl mb-8 uppercase tracking-tighter">Stay Connected</h2>
            <Link to="/contact" className="px-10 py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest rounded-2xl text-xs hover:bg-spot-red transition-all shadow-xl">
               Contact the Team
            </Link>
         </div>
      </section>
    </main>
  );
}
