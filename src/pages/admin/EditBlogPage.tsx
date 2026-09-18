// File: src/pages/admin/EditBlogPage.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBlogPostById, updateBlogPost, uploadBlogImageToStorage } from '@/services/blogService';

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Idle');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;
      const data = await fetchBlogPostById(id);
      if (data) {
        setTitle(data.title);
        setCategory(data.category);
        setExcerpt(data.excerpt);
        setContent(data.content || '');
        setPreviewUrl(data.image);
      }
      setLoading(false);
    }
    loadPost();
  }, [id]);

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
    if (!id) return;
    if (!validatePost()) return;

    setStatus(postStatus === 'draft' ? 'Saving Draft...' : 'Publishing...');
    
    try {
      let imageUrl = previewUrl;
      if (selectedFile) imageUrl = await uploadBlogImageToStorage(selectedFile);

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      await updateBlogPost(id, {
        slug, title, excerpt, category, content, status: postStatus,
        image: imageUrl
      });

      setStatus(postStatus === 'draft' ? 'Draft Saved' : 'Published');
      setTimeout(() => navigate('/admin/blog'), 1500);
    } catch (error) {
      console.error("Error saving post", error);
      setStatus('Error');
    }
  };

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading editor...</div>;

  return (
    <div className="min-h-screen bg-background-50">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/blog')} className="w-10 h-10 rounded-full bg-background-50 hover:bg-background-100 flex items-center justify-center transition-colors text-foreground-500"><i className="ri-arrow-left-line text-xl" /></button>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-primary-500">Admin Dashboard</span>
            <span className="block text-sm font-bold text-foreground-950">Edit Editorial Post</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-foreground-400 mr-4 hidden sm:inline">{status}</span>
          <button onClick={() => savePostToFirebase('draft')} disabled={status.includes('ing...')} className="px-6 py-2.5 rounded-full bg-background-100 text-foreground-950 text-[11px] font-bold uppercase tracking-widest hover:bg-background-200 shadow-sm disabled:opacity-50">Save Draft</button>
          <button onClick={() => savePostToFirebase('published')} disabled={status.includes('ing...')} className="px-6 py-2.5 rounded-full bg-primary-500 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-primary-600 shadow-md disabled:opacity-50">Update Post</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div onClick={() => fileInputRef.current?.click()} className="relative w-full h-64 md:h-80 rounded-[2rem] border-2 border-dashed border-black/10 dark:border-white/10 bg-white dark:bg-card flex flex-col items-center justify-center text-foreground-400 hover:bg-background-50 hover:border-primary-300 transition-all cursor-pointer group mb-10 overflow-hidden shadow-sm">
          {previewUrl && (
            <>
              <img src={previewUrl} alt="Cover Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 text-white"><i className="ri-image-edit-line text-3xl" /></div>
                <span className="text-sm font-bold text-white tracking-wide">Change Cover Image</span>
              </div>
            </>
          )}
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Article Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 font-heading text-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm" />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-5 py-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm appearance-none">
              <option>Market Insights</option><option>Guides</option><option>Investment</option><option>Tips</option><option>News</option>
            </select>
          </div>
        </div>

        {/* Updated Hook Field */}
        <div className="mb-10">
          <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Hook</label>
          <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Write a compelling one-sentence hook..." className="w-full px-5 py-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 text-base font-light focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm resize-none" />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Article Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="w-full min-h-[400px] px-8 py-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-card text-foreground-950 text-lg font-light leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm resize-y" 
          />
        </div>
      </main>
    </div>
  );
}