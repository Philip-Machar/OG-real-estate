// File: src/pages/admin/WriteBlogPage.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlogPost, uploadBlogImageToStorage } from '@/services/blogService';

export default function WriteBlogPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Market Insights');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Draft');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validatePost = () => {
    if (!title.trim()) { alert("Please provide an article title."); return false; }
    if (!excerpt.trim()) { alert("Please provide a one-sentence hook."); return false; }
    if (!content.trim()) { alert("Please write some content."); return false; }
    return true;
  };

  const savePostToFirebase = async (postStatus: 'draft' | 'published') => {
    if (!validatePost()) return;

    setStatus(postStatus === 'draft' ? 'Saving Draft...' : 'Publishing...');
    
    try {
      let imageUrl = 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop';
      if (selectedFile) imageUrl = await uploadBlogImageToStorage(selectedFile);

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      await createBlogPost({
        slug, 
        title, 
        excerpt, 
        category, 
        content, 
        status: postStatus,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: '3 min read', 
        image: imageUrl,
        author: 'Peter Njoroge',
      });

      setStatus(postStatus === 'draft' ? 'Draft Saved' : 'Published');
      setTimeout(() => navigate('/admin/blog'), 1500);
    } catch (error) {
      console.error("Error saving post", error);
      setStatus('Error');
      alert("Failed to save. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      {/* Fix: Fully responsive stacking header for mobile */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin/blog')} className="w-10 h-10 rounded-full bg-background-50 hover:bg-background-100 flex items-center justify-center transition-colors text-foreground-500 shrink-0">
              <i className="ri-arrow-left-line text-xl" />
            </button>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-primary-500">Admin</span>
              <span className="block text-sm md:text-base font-bold text-foreground-950">Create Post</span>
            </div>
          </div>
          <span className="text-xs font-bold text-foreground-400 md:hidden">{status}</span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-foreground-400 hidden md:inline mr-2">{status}</span>
          <button 
            onClick={() => savePostToFirebase('draft')} 
            disabled={status.includes('ing...')} 
            className="flex-1 md:flex-none px-4 py-3 md:py-2.5 rounded-full bg-background-100 text-foreground-950 text-[11px] font-bold uppercase tracking-widest hover:bg-background-200 transition-colors shadow-sm disabled:opacity-50 text-center"
          >
            Save Draft
          </button>
          <button 
            onClick={() => savePostToFirebase('published')} 
            disabled={status.includes('ing...')} 
            className="flex-1 md:flex-none px-4 py-3 md:py-2.5 rounded-full bg-primary-500 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors shadow-md disabled:opacity-50 text-center"
          >
            Publish
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div onClick={() => fileInputRef.current?.click()} className="relative w-full h-48 md:h-80 rounded-[2rem] border-2 border-dashed border-black/10 dark:border-white/10 bg-white dark:bg-card flex flex-col items-center justify-center text-foreground-400 hover:bg-background-50 hover:border-primary-300 transition-all cursor-pointer group mb-8 overflow-hidden shadow-sm">
          {previewUrl ? (
            <>
              <img src={previewUrl} alt="Cover Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center mb-2 md:mb-4 text-white"><i className="ri-image-edit-line text-2xl md:text-3xl" /></div>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">Change Cover</span>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background-50 dark:bg-white/5 flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 group-hover:text-primary-500 transition-all"><i className="ri-image-add-line text-2xl md:text-3xl" /></div>
              <span className="text-sm font-bold text-foreground-950">Upload Cover Image</span>
            </>
          )}
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Article Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Future of Luxury Real Estate" className="w-full px-5 py-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 font-heading text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm appearance-none cursor-pointer">
              <option>Market Insights</option><option>Guides</option><option>Investment</option><option>Tips</option><option>News</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Hook</label>
          <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Write a compelling one-sentence hook..." className="w-full px-5 py-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 text-base font-light focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm resize-none" />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Article Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write your full article here..." 
            className="w-full min-h-[400px] px-6 md:px-8 py-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 text-base md:text-lg font-light leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm resize-y" 
          />
        </div>
      </main>
    </div>
  );
}