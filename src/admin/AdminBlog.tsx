import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save,
  X,
  Loader2,
  Image as ImageIcon,
  Calendar,
  User as UserIcon,
  Hash
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLayout } from './AdminLayout';
import { motion, AnimatePresence } from 'motion/react';

export const AdminBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      fetchPosts();
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const tags = formData.get('tags')?.toString().split(',').map(t => t.trim()) || [];
    
    const postData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      author: formData.get('author'),
      image_url: formData.get('image_url'),
      category: formData.get('category'),
      tags: tags,
      status: formData.get('status') === 'on' ? 'published' : 'draft',
      published_at: formData.get('published_at') || new Date().toISOString(),
    };

    let error;
    if (editingPost) {
      const { error: updateError } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', editingPost.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('posts')
        .insert([postData]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Check if slug is unique.');
    } else {
      setIsModalOpen(false);
      setEditingPost(null);
      fetchPosts();
    }
    setIsSaving(false);
  };

  if (loading && posts.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="animate-spin text-spot-red" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display font-black text-4xl text-spot-charcoal tracking-tighter uppercase leading-none mb-2">Blog Editor</h1>
            <p className="text-spot-charcoal/60 font-medium">Draft, publish, and manage learnings and projects.</p>
          </div>
          <button 
            onClick={() => { setEditingPost(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-4 bg-spot-red text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-spot-red/20"
          >
            <Plus size={20} />
            Write New Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-[2.5rem] border border-black/5 shadow-xl overflow-hidden flex flex-col group transition-all">
              <div className="h-48 relative overflow-hidden">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black text-spot-charcoal uppercase tracking-widest shadow-lg">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold text-spot-charcoal/40 uppercase tracking-widest mb-3">
                  <Calendar size={12} />
                  {new Date(post.published_at).toLocaleDateString()}
                  <span className="mx-1">•</span>
                  <UserIcon size={12} />
                  {post.author}
                </div>
                <h3 className="font-display font-black text-xl text-spot-charcoal mb-4 uppercase tracking-tighter leading-none line-clamp-2">{post.title}</h3>
                <p className="text-xs text-spot-charcoal/60 font-medium line-clamp-2 mb-6 flex-1 italic leading-relaxed">{post.excerpt}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingPost(post); setIsModalOpen(true); }}
                      className="p-3 bg-slate-50 text-spot-charcoal hover:text-white hover:bg-spot-charcoal rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-3 bg-slate-50 text-spot-charcoal hover:bg-spot-red hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex -space-x-2">
                    {post.tags?.slice(0, 2).map((tag: string, i: number) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black uppercase overflow-hidden">
                        {tag[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-spot-charcoal/80 backdrop-blur-md" 
                onClick={() => setIsModalOpen(false)} 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[95vh]"
              >
                <div className="p-8 border-b border-black/5 flex justify-between items-center bg-slate-50">
                  <h2 className="font-display font-black text-2xl text-spot-charcoal uppercase tracking-tighter">
                    {editingPost ? 'Refine Post' : 'Compose Insight'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto">
                  <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Primary Heading</label>
                        <input 
                          name="title" 
                          required 
                          placeholder="What is the big idea?" 
                          defaultValue={editingPost?.title}
                          className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-display font-black text-2xl tracking-tighter uppercase" 
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">The Excerpt (Hook)</label>
                        <textarea 
                          name="excerpt" 
                          required 
                          rows={2}
                          placeholder="Sum it up in 2 sentences to grab attention..." 
                          defaultValue={editingPost?.excerpt}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-sm italic" 
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Main Content (Markdown Supported)</label>
                        <textarea 
                          name="content" 
                          required 
                          rows={12}
                          placeholder="Dive deep into the topic..." 
                          defaultValue={editingPost?.content}
                          className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-base leading-relaxed font-mono" 
                        />
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-black/5 space-y-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">URL Identifier</label>
                          <input 
                            name="slug" 
                            required 
                            placeholder="url-friendly-slug" 
                            defaultValue={editingPost?.slug}
                            className="w-full px-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-mono text-[10px] uppercase tracking-widest" 
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Author Name</label>
                          <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-spot-charcoal/30" size={16} />
                            <input 
                              name="author" 
                              required 
                              placeholder="Who wrote this?" 
                              defaultValue={editingPost?.author}
                              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold text-xs" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Category</label>
                          <select 
                            name="category" 
                            required
                            defaultValue={editingPost?.category || ''}
                            className="w-full px-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-black text-[10px] uppercase tracking-widest"
                          >
                            <option value="">Choose Path</option>
                            <option value="Learning Models">Learning Models</option>
                            <option value="Microschool Projects">Microschool Projects</option>
                            <option value="SPOT Insights">SPOT Insights</option>
                            <option value="Community Stories">Community Stories</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Keywords (tags)</label>
                          <div className="relative">
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-spot-charcoal/30" size={16} />
                            <input 
                              name="tags" 
                              placeholder="tag1, tag2, tag3" 
                              defaultValue={editingPost?.tags?.join(', ')}
                              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold text-xs" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Cover Image URL</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-spot-charcoal/30" size={16} />
                            <input 
                              name="image_url" 
                              required 
                              placeholder="https://..." 
                              defaultValue={editingPost?.image_url}
                              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-medium text-[10px]" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-spot-charcoal/40 mb-2">Publish Date</label>
                          <input 
                            name="published_at" 
                            type="datetime-local"
                            defaultValue={editingPost?.published_at ? new Date(editingPost.published_at).toISOString().slice(0, 16) : ''}
                            className="w-full px-6 py-4 rounded-xl bg-white border border-black/5 focus:outline-none focus:border-spot-red transition-all font-bold text-xs" 
                          />
                        </div>

                        <div className="pt-4">
                           <label className="flex items-center gap-3 cursor-pointer group">
                             <input 
                               type="checkbox" 
                               name="status" 
                               defaultChecked={editingPost?.status !== 'draft'}
                               className="w-6 h-6 rounded-lg border-2 border-black/10 text-spot-pastel-green focus:ring-spot-pastel-green transition-all" 
                             />
                             <span className="text-sm font-black text-spot-charcoal uppercase tracking-tighter group-hover:text-spot-pastel-green">Published / Live</span>
                           </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-6 pt-10 border-t border-black/5">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-4 text-spot-charcoal font-black uppercase tracking-widest text-xs hover:bg-slate-100 rounded-2xl transition-all"
                    >
                      Wait, not yet
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="px-12 py-5 bg-spot-charcoal text-white font-black uppercase tracking-widest text-[11px] rounded-[1.5rem] hover:bg-spot-red hover:scale-105 transition-all shadow-2xl haptic-feedback flex items-center gap-3"
                    >
                      {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                      {editingPost ? 'Apply Changes' : 'Blast Off'}
                    </button>
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
