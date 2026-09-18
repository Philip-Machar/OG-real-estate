// File: src/pages/blog/PostPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/feature/SEO';
import { fetchBlogPostBySlug, incrementBlogView } from '@/services/blogService';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      const data = await fetchBlogPostBySlug(slug);
      if (data) {
        setPost(data);
        if (data.id) {
          incrementBlogView(data.id).catch(console.error);
        }
      } else {
        navigate('/blog');
      }
      setLoading(false);
    }
    loadPost();
  }, [slug, navigate]);

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-4xl text-primary-500" />
      </div>
    );
  }

  // Generate Google Article Schema
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.kenyaclassichomes.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author || "Peter Njoroge"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kevlin & Company",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.jpg"
      }
    },
    "datePublished": new Date(post.timestamp || post.date || Date.now()).toISOString(),
  });

  return (
    <div className="min-h-screen bg-background-50">
      <SEO 
        title={`${post.title} | Kevlin & Company Insights`}
        description={post.excerpt}
        image={post.image}
        type="article"
        url={`https://www.kenyaclassichomes.com/blog/${post.slug}`}
        schema={articleSchema}
      />
      <Navbar />
      <div className="h-16 md:h-20" />

      {/* Clean Hero - Solid dark gradient, NO white blur bleed */}
      <section className="relative overflow-hidden bg-black py-32 md:py-48">
        <div className="absolute inset-0 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-4 py-1.5 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-md">
              {post.category}
            </span>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
              {post.date}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.15] drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Improved Back Button Layout */}
          <div className="mb-10">
            <button 
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-card border border-black/5 dark:border-white/10 rounded-full text-[11px] font-bold uppercase tracking-widest text-foreground-600 hover:text-foreground-950 shadow-sm transition-all"
            >
              <i className="ri-arrow-left-line text-base" />
              Back to Articles
            </button>
          </div>

          <div className="prose prose-lg md:prose-xl max-w-none text-foreground-600 font-light leading-relaxed prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground-950 prose-a:text-primary-600">
            
            {/* Standard paragraph formatting - No Drop Cap */}
            <p className="text-xl md:text-2xl text-foreground-800 leading-relaxed font-medium mb-12">
              {post.excerpt}
            </p>

            {/* Support for both plain text lines and HTML formats if applicable */}
            {post.content ? (
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            ) : (
              <p>Content unavailable.</p>
            )}
          </div>

          {/* Social Share Footer */}
          <div className="mt-16 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground-950">Share this insight</span>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-background-100 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <i className="ri-twitter-x-line text-lg" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background-100 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <i className="ri-linkedin-fill text-lg" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background-100 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors">
                <i className="ri-facebook-fill text-lg" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background-100 hover:bg-primary-500 hover:text-white flex items-center justify-center transition-colors" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <i className="ri-link text-lg" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}