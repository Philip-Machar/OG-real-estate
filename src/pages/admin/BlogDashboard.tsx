// File: src/pages/admin/BlogDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllBlogPosts, deleteBlogPost } from '@/services/blogService';

export default function BlogDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchAllBlogPosts('all');
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await deleteBlogPost(postToDelete);
        setPosts(posts.filter(post => post.id !== postToDelete));
      } catch (error) {
        console.error("Failed to delete post", error);
      }
      setPostToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-card/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={() => navigate('/admin')} className="w-10 h-10 rounded-full bg-background-50 hover:bg-background-100 flex items-center justify-center transition-colors text-foreground-500 shrink-0">
            <i className="ri-arrow-left-line text-xl" />
          </button>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-primary-500">Admin Control</span>
            <span className="block text-sm font-bold text-foreground-950">Editorial Dashboard</span>
          </div>
        </div>
        <button onClick={() => navigate('/admin/write-blog')} className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-foreground-950 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-all shadow-md shrink-0">
          <i className="ri-pencil-line text-sm" />
          <span className="hidden sm:inline">Write Article</span>
          <span className="sm:hidden">Write</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            { label: 'Total Articles', value: totalPosts, icon: 'ri-article-line' },
            { label: 'Published', value: publishedPosts, icon: 'ri-checkbox-circle-line' },
            { label: 'Drafts', value: draftPosts, icon: 'ri-draft-line' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-card rounded-3xl sm:rounded-[2rem] p-5 sm:p-6 border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-background-50 dark:bg-white/5 flex items-center justify-center text-primary-500 mb-3 sm:mb-4"><i className={`${stat.icon} text-lg`} /></div>
              <span className="text-2xl sm:text-3xl font-heading font-bold text-foreground-950 mb-1">{stat.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-card rounded-[2rem] sm:rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-black/5 dark:border-white/5 bg-background-50/50">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground-950">Manage Articles</h2>
          </div>

          <div className="overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-foreground-400"><i className="ri-loader-4-line animate-spin text-2xl" /></div>
            ) : posts.length === 0 ? (
              <div className="p-16 text-center text-foreground-400 text-sm">No articles found. Click "Write Article" to create your first post.</div>
            ) : (
              <>
                {/* Mobile View: Beautiful stacked cards instead of a squished table */}
                <div className="block md:hidden divide-y divide-black/5 dark:divide-white/5">
                  {posts.map((post) => (
                    <div key={post.id} className="p-5 flex flex-col gap-4">
                      <div className="flex items-start gap-4">
                        <img src={post.image} alt={post.title} className="w-16 h-16 rounded-xl object-cover shadow-sm shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-foreground-950 line-clamp-2 mb-1 leading-snug">{post.title}</h3>
                          <p className="text-[11px] text-foreground-500 mb-2">{post.date}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-block px-2.5 py-1 bg-background-100 text-[9px] font-bold uppercase tracking-widest rounded-full truncate max-w-[100px]">{post.category}</span>
                            {post.status === 'draft' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-600 text-[9px] font-bold uppercase rounded-full shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />Draft</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-600 text-[9px] font-bold uppercase rounded-full shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Published</span>
                            )}
                            <span className="text-[10px] text-foreground-400 font-bold ml-auto flex items-center gap-1 shrink-0"><i className="ri-eye-line"/>{post.views || 0}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                        <button onClick={() => navigate(`/admin/edit-blog/${post.id}`)} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-background-50 hover:bg-background-100 text-foreground-700 text-[10px] font-bold uppercase tracking-wider transition-colors">
                          <i className="ri-edit-line text-sm" /> Edit
                        </button>
                        <button onClick={() => setPostToDelete(post.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider transition-colors">
                          <i className="ri-delete-bin-line text-sm" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Full data table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/5 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-foreground-400 bg-background-50/20">
                        <th className="px-8 py-5">Article</th>
                        <th className="px-8 py-5">Category</th>
                        <th className="px-8 py-5">Views</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-background-50/50 transition-colors group">
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-4">
                              <img src={post.image} alt={post.title} className="w-12 h-12 rounded-xl object-cover shadow-sm shrink-0" />
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-foreground-950 line-clamp-1">{post.title}</p>
                                <p className="text-xs text-foreground-500 mt-0.5">{post.date}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-4"><span className="inline-block px-3 py-1 bg-background-100 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">{post.category}</span></td>
                          <td className="px-8 py-4 text-xs font-bold text-foreground-600">{post.views || 0}</td>
                          <td className="px-8 py-4">
                            {post.status === 'draft' ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-600 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />Draft</span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Published</span>
                            )}
                          </td>
                          <td className="px-8 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => navigate(`/admin/edit-blog/${post.id}`)} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-foreground-500 hover:text-primary-600 hover:border-primary-200 shadow-sm transition-all" title="Edit">
                                <i className="ri-edit-line text-sm" />
                              </button>
                              <button onClick={() => setPostToDelete(post.id)} className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center text-foreground-500 hover:text-red-500 hover:border-red-200 shadow-sm transition-all" title="Delete">
                                <i className="ri-delete-bin-line text-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPostToDelete(null)} />
          <div className="relative bg-white dark:bg-card w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-6"><i className="ri-error-warning-line text-3xl" /></div>
            <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-3">Delete Article?</h3>
            <p className="text-sm text-foreground-500 mb-8 font-light leading-relaxed">This action cannot be undone.</p>
            <div className="flex flex-col gap-3">
              <button onClick={handleDeleteConfirm} className="w-full py-3.5 rounded-full bg-red-500 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-red-600 shadow-md">Yes, Delete</button>
              <button onClick={() => setPostToDelete(null)} className="w-full py-3.5 rounded-full bg-background-50 text-foreground-950 border border-black/5 text-[11px] font-bold uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}