import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Loader2, BookOpen, Globe, Layout, Search, Sparkles, Send
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { ImageUpload, TagInput, SectionHeader } from './components/AdminInputs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
    // Fetch a few recent images to show as suggestions
    supabase.storage.from('spot-assets').list('', { limit: 10, sortBy: { column: 'created_at', order: 'desc' } })
      .then(({ data }) => {
        if (data) {
          const urls = data.map(f => supabase.storage.from('spot-assets').getPublicUrl(f.name).data.publicUrl);
          setPreviewImages(urls);
        }
      }).catch(err => console.error('Storage list error:', err));
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingPost) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const openForm = (post: any = null) => {
    setEditingPost(post);
    setTitle(post?.title || '');
    setSlug(post?.slug || '');
    setContent(post?.content || '');
    setImageUrl(post?.image_url || '');
    setTags(post?.tags || []);
    setCategory(post?.category || 'Education');
    setIsModalOpen(true);
    setIsPreview(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const postData = {
      title,
      slug,
      content,
      excerpt: formData.get('excerpt'),
      category: formData.get('category'),
      author: formData.get('author_name'),
      image_url: imageUrl,
      tags,
      meta_title: formData.get('meta_title'),
      meta_description: formData.get('meta_description'),
      status: formData.get('status') === 'on' ? 'published' : 'draft',
      published_at: editingPost?.published_at || new Date().toISOString(),
      reading_time: `${calculateReadTime(content)} min read`
    };

    try {
      let error;
      if (editingPost) {
        ({ error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', editingPost.id));
      } else {
        ({ error } = await supabase
          .from('posts')
          .insert([postData]));
      }

      if (error) throw error;
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save story. Connection error?');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this story?')) return;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('Image exceeds 1MB threshold. Please optimize for performance.');
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `blog-inline-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('spot-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('spot-assets')
        .getPublicUrl(filePath);

      insertMarkdown(`![Resonance Insight](${publicUrl})`);
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert('Asset upload failed. Connectivity issue?');
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('blog-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newContent = before + prefix + (selected || 'text') + suffix + after;
    setContent(newContent);
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected?.length || 4));
    }, 10);
  };

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const getSEOScore = () => {
    let score = 0;
    if (title.length > 30) score += 20;
    if (content.length > 500) score += 30;
    if (imageUrl) score += 20;
    if (tags.length >= 3) score += 20;
    if (content.includes('![')) score += 10;
    return score;
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-32">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-spot-pastel-green/20 flex items-center justify-center text-emerald-600 shadow-inner">
                <BookOpen size={24} />
              </div>
              <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none">Journal Lab</h1>
            </div>
            <p className="text-spot-charcoal/60 font-medium text-sm">Crafting stories that redefine education and parent-child bonds.</p>
          </div>
          <button 
            onClick={() => openForm()}
            className="group flex items-center gap-3 px-8 py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl hover:scale-[1.02] active:scale-95"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Write New Entry
          </button>
        </header>

        {/* Journal Performance Insights (Simplified) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                 <Globe size={24} />
              </div>
              <div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">Total Reach</span>
                 <div className="text-2xl font-black text-spot-charcoal uppercase tracking-tighter">High Performance</div>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-spot-charcoal/40">
                 <Sparkles size={24} />
              </div>
              <div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">AI Synergy</span>
                 <div className="text-2xl font-black text-spot-charcoal uppercase tracking-tighter">Optimized</div>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-spot-pastel-pink/50 flex items-center justify-center text-spot-red">
                 <Send size={24} />
              </div>
              <div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-spot-charcoal/30">Total Stories</span>
                 <div className="text-2xl font-black text-spot-charcoal uppercase tracking-tighter">{posts.length} Published</div>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div 
               layout
               key={post.id}
               className={`bg-white rounded-[3rem] border border-black/5 shadow-xl shadow-black/5 overflow-hidden flex flex-col group transition-all hover:shadow-2xl hover:border-black/10 ${post.status === 'draft' ? 'opacity-60 bg-slate-50' : ''}`}
            >
               <div className="h-48 relative overflow-hidden bg-slate-100 italic">
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-1 rounded-full text-[9px] font-black bg-white/90 backdrop-blur-md text-spot-charcoal uppercase tracking-widest shadow-lg">
                      {post.category}
                    </div>
                  </div>
                  {post.status === 'published' && (
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Globe size={14} />
                    </div>
                  )}
               </div>
               
               <div className="p-8 flex-1 flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-spot-charcoal/30 mb-4 block">
                    {new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h3 className="font-display font-black text-2xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-[0.9] group-hover:text-spot-red transition-colors">{post.title}</h3>
                  <p className="text-xs text-spot-charcoal/60 font-medium line-clamp-2 leading-relaxed mb-6">{post.excerpt}</p>
                  
                  <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                     <span className="text-[10px] font-bold text-spot-red uppercase tracking-widest">{post.author_name}</span>
                     <div className="flex gap-2">
                        <button onClick={() => openForm(post)} className="w-10 h-10 bg-slate-50 text-spot-charcoal hover:text-white hover:bg-spot-charcoal rounded-xl transition-all flex items-center justify-center shadow-sm">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="w-10 h-10 bg-slate-50 text-spot-charcoal hover:bg-spot-red hover:text-white rounded-xl transition-all flex items-center justify-center shadow-sm">
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Create/Edit Blog Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 overflow-hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-spot-charcoal/95 backdrop-blur-2xl" onClick={() => setIsModalOpen(false)} />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 30 }} 
                className="bg-white w-full max-w-[95vw] lg:max-w-7xl rounded-[3rem] lg:rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[95vh] border border-white/20"
              >
                <div className="p-6 lg:p-10 border-b border-black/5 flex justify-between items-center bg-slate-50/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-spot-red mb-1 italic">Mindful Creation</span>
                    <h2 className="font-display font-black text-xl lg:text-3xl text-spot-charcoal uppercase tracking-tighter leading-none">
                      {editingPost ? 'Edit Journal' : 'Fresh Perspective'}
                    </h2>
                  </div>
                  <div className="flex gap-4">
                     <div className="hidden sm:flex items-center gap-3 px-6 py-2 rounded-2xl bg-white border border-black/5 shadow-sm">
                        <span className="text-[10px] font-black uppercase text-spot-charcoal/20">Read Time:</span>
                        <span className="text-[10px] font-black text-spot-red uppercase tracking-widest">{calculateReadTime(content)} Min</span>
                     </div>
                     <button 
                       type="button"
                       onClick={() => setIsPreview(!isPreview)}
                       className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isPreview ? 'bg-spot-red text-white' : 'bg-white text-spot-charcoal border border-black/5 shadow-sm'}`}
                     >
                       {isPreview ? 'Close Preview' : 'Live Preview'}
                     </button>
                     <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-black/5 transition-all text-spot-charcoal active:scale-90">
                       <X size={24} />
                     </button>
                  </div>
                </div>

                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-16 hide-scrollbar custom-scrollbar">
                  
                  {/* Phase 1: Identity */}
                  <div className="space-y-10">
                    <SectionHeader num={1} label="Identity & Classification" />
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Headline</label>
                          <input name="title" required value={title} onChange={handleTitleChange} placeholder="Unlocking Neuro-Inclusion in Modern Learning" className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-display font-black text-3xl tracking-tighter uppercase" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Domain</label>
                           <select name="category" required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-black/5 font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-spot-red">
                                <option value="">Select Domain</option>
                                <option value="Learnings">Learnings</option>
                                <option value="Projects">Projects</option>
                                <option value="Topics">Topics</option>
                                <option value="Education Models">Education Models</option>
                              </select>
                           </div>
                           <div>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Public Slug</label>
                              <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-black/5 font-mono text-xs text-spot-red focus:outline-none" />
                           </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                         <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Brief Excerpt (SEO Summary)</label>
                            <textarea name="excerpt" required rows={4} placeholder="Summarize the core insight for social cards and search results..." defaultValue={editingPost?.excerpt} className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-black/5 text-sm font-medium italic leading-relaxed focus:outline-none focus:border-spot-red" />
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div>
                               <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-3">Author Aura</label>
                                <input name="author_name" placeholder="Author Name" defaultValue={editingPost?.author || 'Midhun Noble'} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 font-bold text-[10px] uppercase tracking-widest focus:outline-none" />
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: Narrative Lab */}
                  <div className="space-y-10">
                    <SectionHeader num={2} label="The Narrative Lab" />
                    <div className="grid lg:grid-cols-12 gap-12 min-h-[500px]">
                      {/* Markdown Editor Column */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                         <div className="flex items-center justify-between bg-slate-100/50 p-4 rounded-3xl border border-black/5">
                            <div className="flex gap-2">
                               <button type="button" onClick={() => insertMarkdown('**', '**')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-xs font-black hover:bg-spot-red hover:text-white transition-all">B</button>
                               <button type="button" onClick={() => insertMarkdown('*', '*')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-xs font-black italic hover:bg-spot-red hover:text-white transition-all">I</button>
                               <button type="button" onClick={() => insertMarkdown('# ')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-xs font-black hover:bg-spot-red hover:text-white transition-all">H1</button>
                               <button type="button" onClick={() => insertMarkdown('## ')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-xs font-black hover:bg-spot-red hover:text-white transition-all">H2</button>
                               <button type="button" onClick={() => insertMarkdown('> ')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-xs font-black hover:bg-spot-red hover:text-white transition-all">"</button>
                               <button type="button" onClick={() => insertMarkdown('[', '](url)')} className="w-10 h-10 bg-white rounded-xl shadow-sm text-xs font-black hover:bg-spot-red hover:text-white transition-all">🔗</button>
                               <label className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center cursor-pointer hover:bg-spot-red hover:text-white transition-all group/upload">
                                 <Plus size={16} />
                                 <input type="file" accept="image/*" onChange={handleInlineImageUpload} className="hidden" />
                               </label>
                            </div>
                            <div className="flex gap-4">
                               <div className="text-[10px] font-black uppercase text-spot-charcoal/30 flex items-center gap-2">
                                  SEO Readiness: 
                                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                     <div className={`h-full ${getSEOScore() > 70 ? 'bg-emerald-500' : 'bg-amber-400'} transition-all`} style={{ width: `${getSEOScore()}%` }} />
                                  </div>
                               </div>
                            </div>
                         </div>
                         <textarea 
                           id="blog-editor"
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                           className="flex-1 w-full px-10 py-10 rounded-[3rem] bg-slate-900 text-slate-100 font-mono text-sm leading-loose border-0 focus:ring-4 focus:ring-spot-red/20 hide-scrollbar resize-none shadow-2xl min-h-[400px]"
                           placeholder="Type your story in Markdown..."
                         />
                      </div>
                      
                      {/* Preview / Assets Column */}
                      <div className="lg:col-span-5 flex flex-col gap-8">
                         <div className="bg-slate-50 p-8 rounded-[3rem] border border-black/5 flex-1 flex flex-col">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-6 flex items-center justify-between">
                               <span>Resonance Preview</span>
                               <span className="text-spot-red/40 italic">Live Update</span>
                            </label>
                            <div className="flex-1 overflow-y-auto prose prose-spot max-w-none custom-scrollbar p-6 bg-white rounded-3xl shadow-inner italic-images">
                               {content ? (
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                               ) : (
                                  <div className="h-full flex items-center justify-center opacity-10">
                                    <Layout size={60} />
                                  </div>
                               )}
                            </div>
                         </div>
                         
                         {/* Quick Assets Suggestion */}
                         <div className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-inner">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-4">Quick Asset Insert</label>
                            <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                               {previewImages.map((u, i) => (
                                  <button 
                                    key={i} 
                                    type="button" 
                                    onClick={() => insertMarkdown(`![Resonance](${u})`)}
                                    className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-black/5 hover:scale-110 transition-transform active:scale-95 shadow-sm"
                                  >
                                     <img src={u} alt="Asset" className="w-full h-full object-cover" />
                                  </button>
                               ))}
                               <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-dashed border-black/5 flex items-center justify-center shrink-0">
                                  <Plus size={16} className="opacity-20" />
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 3: Assets & Signals */}
                  <div className="space-y-10">
                    <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-black/5">
                       <ImageUpload label="Primary Banner Visual" value={imageUrl} onChange={setImageUrl} maxSizeKB={500} />
                       <div className="space-y-8">
                          <TagInput label="Thematic Tags" tags={tags} onChange={setTags} maxTags={5} placeholder="Innovation, Wellness..." />
                          <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-black/5 space-y-8">
                             <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40">Search Signals (SEO Lab)</label>
                             <div className="space-y-6">
                                <div className="relative">
                                  <Search className="absolute left-6 top-5 text-spot-charcoal/30" size={16} />
                                  <input name="meta_title" placeholder="Force Meta Title" defaultValue={editingPost?.meta_title} className="w-full pl-14 pr-6 py-4 rounded-xl bg-white border border-black/5 text-xs font-bold focus:outline-none focus:border-spot-red" />
                                </div>
                                <textarea name="meta_description" rows={2} placeholder="Meta Description (Override)" defaultValue={editingPost?.meta_description} className="w-full px-6 py-4 rounded-xl bg-white border border-black/5 text-[10px] font-medium leading-relaxed focus:outline-none focus:border-spot-red" />
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Broadcast Trigger */}
                  <div className="pt-12 border-t border-black/5 flex flex-col items-center gap-12">
                     <div className="flex flex-wrap gap-8 items-center justify-center p-8 bg-black rounded-[3rem] shadow-2xl">
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <input type="checkbox" name="status" defaultChecked={editingPost?.status !== 'draft'} className="w-8 h-8 rounded-xl text-emerald-500 border-2 border-white/20 focus:ring-0 bg-transparent transition-all" />
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-white/50 group-hover:text-emerald-500">Universal Broadcast (Published)</span>
                        </label>
                     </div>

                     <div className="flex gap-6 pb-10">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-50 rounded-[2rem] transition-all">
                           Dismiss
                        </button>
                        <button type="submit" disabled={isSaving} className="px-20 py-5 bg-spot-charcoal text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-[2rem] hover:bg-spot-red transition-all shadow-2xl flex items-center gap-4 group relative overflow-hidden">
                           <div className="absolute inset-0 bg-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                           {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                           <span className="relative">{editingPost ? 'Synchronize Mindset' : 'Initiate Broadcast'}</span>
                        </button>
                     </div>
                  </div>

                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
