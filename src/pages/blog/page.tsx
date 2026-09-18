// File: src/pages/blog/page.tsx
import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { fetchAllBlogPosts } from '@/services/blogService';

const categories = ['All', 'Market Insights', 'Guides', 'Investment', 'Tips', 'News'];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchAllBlogPosts('published');
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filtered = useMemo(() => {
    let result = [...posts];
    if (activeCategory !== 'All') result = result.filter((post) => post.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const visible = rest.slice(0, visibleCount);
  const hasMore = visibleCount < rest.length;

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="relative overflow-hidden bg-black py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-110 animate-ken-burns" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 backdrop-blur-md">Editorial</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">Insights & <span className="italic text-primary-400 font-light">Perspectives</span></h1>
        </div>
      </section>

      <section className="relative z-30 py-8 md:py-12 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
          <div className="relative w-full lg:w-[320px] shrink-0 group">
            <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-foreground-400 text-lg" />
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-6 py-3.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-md text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm" />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all shadow-sm border ${activeCategory === cat ? 'bg-foreground-950 text-white border-foreground-950 shadow-lg' : 'bg-white/60 text-foreground-600 border-black/5 hover:bg-white hover:text-foreground-950'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-32 text-center text-foreground-400"><i className="ri-loader-4-line animate-spin text-3xl" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-32 bg-white dark:bg-card rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm max-w-3xl mx-auto mb-16">
          <i className="ri-quill-pen-line text-5xl text-foreground-300 mb-6 block" />
          <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-3">No Articles Found</h3>
          <p className="text-foreground-500 text-sm max-w-md mx-auto mb-8">We haven't published any articles in this category yet. Check back soon for the latest insights.</p>
          <button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="px-8 py-3.5 bg-foreground-950 text-background-50 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 transition-all shadow-lg hover:-translate-y-1">
            View All Articles
          </button>
        </div>
      ) : (
        <>
          {featured && (
            <section className="py-10 md:py-16 bg-background-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  <a href={`/blog/${featured.slug}`} className="block group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all">
                    <div className="relative h-64 md:h-72 bg-background-100 overflow-hidden">
                      <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white border border-white/30 text-[10px] font-bold uppercase rounded-full mb-3 backdrop-blur-md">{featured.category}</span>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">{featured.title}</h3>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-sm text-foreground-500 line-clamp-2 mb-6">{featured.excerpt}</p>
                    </div>
                  </a>
                  {rest[0] && (
                    <a href={`/blog/${rest[0].slug}`} className="block group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all">
                      <div className="relative h-64 md:h-72 bg-background-100 overflow-hidden">
                        <img src={rest[0].image} alt={rest[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <span className="inline-block px-3 py-1 bg-white/20 text-white border border-white/30 text-[10px] font-bold uppercase rounded-full mb-3 backdrop-blur-md">{rest[0].category}</span>
                          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2">{rest[0].title}</h3>
                        </div>
                      </div>
                      <div className="p-8">
                        <p className="text-sm text-foreground-500 line-clamp-2 mb-6">{rest[0].excerpt}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="py-16 md:py-24 bg-background-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visible.map((post) => (
                  <a key={post.id} href={`/blog/${post.slug}`} className="block group bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all flex flex-col h-full">
                    
                    <div className="relative h-56 bg-background-100 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1.5 bg-white/40 text-black shadow-lg text-[10px] font-bold uppercase rounded-full backdrop-blur-md">{post.category}</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl font-bold text-foreground-950 mb-3 line-clamp-2 group-hover:text-primary-600">{post.title}</h3>
                      <p className="text-sm text-foreground-500 font-light line-clamp-2 flex-1">{post.excerpt}</p>
                    </div>
                  </a>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 md:mt-16 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + 6)}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full border border-foreground-200 text-foreground-950 font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-foreground-950 hover:text-white transition-all duration-300 group shadow-sm bg-white"
                  >
                    Load More Articles
                    <i className="ri-arrow-down-line text-sm group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
}