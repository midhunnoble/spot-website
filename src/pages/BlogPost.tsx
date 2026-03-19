import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { Clock, Calendar, ChevronLeft, Share2, Link as LinkIcon, Sparkles, User, Twitter, Linkedin, Facebook, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  meta_title?: string;
  meta_description?: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recommendations, setRecommendations] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
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
      <div className="min-h-screen bg-spot-cream flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-4xl font-display font-black mb-8 uppercase tracking-tighter">Writing not found</h2>
          <Link to="/blog" className="px-8 py-4 bg-spot-charcoal text-white font-black uppercase tracking-widest rounded-2xl">Return to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-spot-cream min-h-screen">
      <SEO 
        title={post.meta_title || `${post.title} | SPOT Journal`}
        description={post.meta_description || post.excerpt}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": [post.image_url],
          "datePublished": post.published_at,
          "author": [{
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.author_role
          }]
        }}
      />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-spot-red z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-4 glass-morphism rounded-full border border-black/10 shadow-2xl flex items-center gap-6 hidden md:flex">
         <Link to="/blog" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-spot-charcoal/40 hover:text-spot-red transition-colors">
            <ChevronLeft size={16} /> Journal
         </Link>
         <div className="w-px h-4 bg-black/10" />
         <button onClick={copyToClipboard} className="text-xs font-black uppercase tracking-widest text-spot-charcoal/40 hover:text-spot-red transition-colors flex items-center gap-2">
            <LinkIcon size={16} /> Copy Link
         </button>
         <div className="w-px h-4 bg-black/10" />
         <span className="text-xs font-black uppercase tracking-widest text-spot-red">{post.category}</span>
      </div>

      <article>
        {/* Cinematic Header */}
        <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="px-6 py-2 bg-spot-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg">New Insight</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-spot-charcoal/30">{post.published_at}</span>
            </div>

            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[120px] text-spot-charcoal mb-10 leading-[0.8] uppercase tracking-tighter">
              {post.title}
            </h1>

            <p className="text-2xl md:text-3xl text-spot-charcoal/60 font-medium leading-tight max-w-3xl mx-auto mb-16">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-8 py-8 border-y border-black/5 max-w-2xl mx-auto">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-spot-pastel-pink border-2 border-white shadow-xl flex items-center justify-center text-2xl font-black text-spot-charcoal">
                    {post.author[0]}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black uppercase tracking-tight text-spot-charcoal">{post.author}</div>
                    <div className="text-[10px] text-spot-charcoal/40 font-bold uppercase">{post.author_role || 'Creative Lead'}</div>
                  </div>
               </div>
               <div className="w-px h-12 bg-black/5" />
               <div className="flex flex-col items-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-1">Time to Absorve</div>
                  <div className="text-sm font-black text-spot-red flex items-center gap-2">
                    <Clock size={16} /> {post.reading_time}
                  </div>
               </div>
            </div>
          </motion.div>
        </header>

        {/* Hero Image */}
        <div className="px-6 max-w-7xl mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white relative"
          >
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Content Body */}
        <div className="px-6 max-w-7xl mx-auto grid lg:grid-cols-[1fr,850px,1fr] gap-12 mb-32">
          {/* Left Gutter */}
          <div className="hidden lg:block pt-20">
             <div className="sticky top-40 space-y-12">
                <div>
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 mb-6">Topic</h5>
                   <div className="flex flex-wrap gap-2 text-spot-charcoal/60 font-bold uppercase text-[11px] leading-tight">
                      {post.category}
                   </div>
                </div>
                <div>
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 mb-6">Tags</h5>
                   <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase text-spot-red hover:underline cursor-pointer">#{tag}</span>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Main Markdown Content */}
          <div className="bg-white rounded-[5rem] p-12 md:p-24 shadow-2xl border border-black/5 relative overflow-hidden">
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-spot-pastel-pink/20 rounded-full blur-3xl" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-spot-pastel-blue/20 rounded-full blur-3xl" />

             <div className="markdown-content font-medium text-2xl leading-[1.6] text-spot-charcoal/80 space-y-10 prose prose-xl prose-spot max-w-none prose-headings:uppercase prose-headings:font-display prose-headings:font-black prose-headings:tracking-tighter prose-img:rounded-[3rem] prose-img:shadow-2xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                   {post.content}
                </ReactMarkdown>
             </div>
          </div>

          {/* Right Gutter - Share/Interaction */}
          <div className="hidden lg:block pt-20">
             <div className="sticky top-40 space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30 mb-6">Share Culture</h5>
                <button onClick={copyToClipboard} className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center hover:bg-spot-charcoal hover:text-white transition-all shadow-sm">
                   <LinkIcon size={20} />
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center hover:bg-spot-red hover:text-white transition-all shadow-sm">
                   <Twitter size={20} />
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
                   <Facebook size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* Bottom Navigation / Recommendations */}
        <section className="px-6 py-32 bg-spot-charcoal text-white rounded-[6rem] mx-6 mb-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spot-red/10 blur-[150px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-spot-pastel-blue/10 blur-[150px] rounded-full" />

           <div className="max-w-5xl mx-auto relative z-10 text-center">
              <Sparkles className="text-spot-red mx-auto mb-8" size={60} />
              <h3 className="font-display font-black text-5xl md:text-7xl mb-12 uppercase tracking-tighter">The Journey <span className="text-spot-red">Continues.</span></h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                 {recommendations.map(rec => (
                   <Link 
                    key={rec.id} 
                    to={`/blog/${rec.slug}`} 
                    className="group bg-white/5 border border-white/10 hover:border-white/20 p-8 rounded-[3rem] text-left transition-all hover:-translate-y-2 haptic-feedback"
                   >
                     <div className="text-spot-red text-[10px] font-black uppercase tracking-[0.2em] mb-4">{rec.category}</div>
                     <h4 className="text-2xl font-display font-black uppercase mb-4 leading-none group-hover:text-spot-red transition-colors">{rec.title}</h4>
                     <p className="text-white/40 text-sm font-medium line-clamp-2">Continue reading about {rec.excerpt}</p>
                   </Link>
                 ))}
              </div>
           </div>
        </section>
      </article>
    </main>
  );
}
