// File: src/pages/admin/Dashboard.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { seedBlogDatabase } from '@/utils/seedBlog';
import { seedDatabase } from '@/utils/seedDatabase';
import { fetchAllProperties, updatePropertyData, uploadImageToStorage } from '@/services/propertyService';
import { fetchAllBlogPosts, updateBlogPost, uploadBlogImageToStorage } from '@/services/blogService';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Property States
  const [seedingProperties, setSeedingProperties] = useState(false);
  const [automatingImages, setAutomatingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Blog States
  const [seedingBlogs, setSeedingBlogs] = useState(false);
  const [automatingBlogImages, setAutomatingBlogImages] = useState(false);
  const [blogUploadProgress, setBlogUploadProgress] = useState(0);

  const handleSeedProperties = async () => {
    if (window.confirm("Are you sure you want to upload the dummy properties to Firebase?")) {
      setSeedingProperties(true);
      await seedDatabase();
      setSeedingProperties(false);
    }
  };

  const handleSeedBlogs = async () => {
    if (window.confirm("Are you sure you want to upload the 10 editorial articles to Firebase?")) {
      setSeedingBlogs(true);
      await seedBlogDatabase();
      setSeedingBlogs(false);
    }
  };

  const handleAutomatedImageUpload = async () => {
    if (!window.confirm("Ensure your images are named 1 to 36 in public/seed-images/. Supported formats: .jpg, .png, .jpeg, .webp. Ready to proceed?")) return;
    
    setAutomatingImages(true);
    setUploadProgress(0);
    
    const extensions = ['.jpg', '.png', '.jpeg', '.webp'];

    try {
      const properties = await fetchAllProperties('all');
      
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const imageNumber = i + 1; 
        
        let response: Response | null = null;
        let currentExt = '';

        try {
          for (const ext of extensions) {
            const res = await fetch(`/seed-images/${imageNumber}${ext}`);
            const contentType = res.headers.get('content-type') || '';
            
            if (res.ok && contentType.includes('image/')) {
              response = res;
              currentExt = ext;
              break; 
            }
          }
          
          if (!response || !response.ok) {
            console.warn(`Image ${imageNumber} not found with any supported extension in public/seed-images/. Skipping...`);
            continue;
          }
          
          const blob = await response.blob();
          const file = new File([blob], `property-seed-${imageNumber}${currentExt}`, { type: blob.type || 'image/jpeg' });
          
          const storageUrl = await uploadImageToStorage(file);
          
          await updatePropertyData(property.id, {
            image: storageUrl,
            images: [storageUrl],
            imageCount: 1
          });
          
          setUploadProgress(i + 1);
        } catch (err) {
          console.error(`Failed to process image for property ${i + 1}:`, err);
        }
      }
      
      alert("Success! Property images have been uploaded and linked.");
    } catch (error) {
      console.error("Master failure during image automation:", error);
      alert("Failed to automate image uploads. Check the console.");
    } finally {
      setAutomatingImages(false);
    }
  };

  const handleAutomatedBlogImageUpload = async () => {
    if (!window.confirm("Ensure your images are named article-image-1 to article-image-10 in public/seed-blog-images/. Supported formats: .jpg, .png, .jpeg, .webp. Ready to proceed?")) return;
    
    setAutomatingBlogImages(true);
    setBlogUploadProgress(0);
    
    const extensions = ['.jpg', '.png', '.jpeg', '.webp'];

    try {
      const posts = await fetchAllBlogPosts('all');
      
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const imageNumber = i + 1; 
        
        let response: Response | null = null;
        let currentExt = '';

        try {
          for (const ext of extensions) {
            // UPDATED: Now looks for "article-image-X"
            const res = await fetch(`/seed-blog-images/article-image-${imageNumber}${ext}`);
            const contentType = res.headers.get('content-type') || '';
            
            if (res.ok && contentType.includes('image/')) {
              response = res;
              currentExt = ext;
              break; 
            }
          }
          
          if (!response || !response.ok) {
            console.warn(`Blog image article-image-${imageNumber} not found with any supported extension in public/seed-blog-images/. Skipping...`);
            continue;
          }
          
          const blob = await response.blob();
          const file = new File([blob], `blog-seed-${imageNumber}${currentExt}`, { type: blob.type || 'image/jpeg' });
          
          const storageUrl = await uploadBlogImageToStorage(file);
          
          await updateBlogPost(post.id, {
            image: storageUrl
          });
          
          setBlogUploadProgress(i + 1);
        } catch (err) {
          console.error(`Failed to process image for blog post ${i + 1}:`, err);
        }
      }
      
      alert("Success! Blog images have been uploaded and linked.");
    } catch (error) {
      console.error("Master failure during blog image automation:", error);
      alert("Failed to automate blog image uploads. Check the console.");
    } finally {
      setAutomatingBlogImages(false);
    }
  };

  const adminModules = [
    {
      category: 'Property Portfolio',
      items: [
        { title: 'Upload Property', desc: 'Add a new listing to the catalog', icon: 'ri-upload-cloud-2-line', path: '/admin/upload-property', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { title: 'Manage Listings', desc: 'Edit or remove active properties', icon: 'ri-building-4-line', path: '/admin/manage-listings', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
        { title: 'Review Pending', desc: 'Approve user-submitted listings', icon: 'ri-checkbox-multiple-line', path: '/admin/review-listings', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
      ]
    },
    {
      category: 'Editorial & Content',
      items: [
        { title: 'Blog Dashboard', desc: 'Manage articles, drafts, and views', icon: 'ri-article-line', path: '/admin/blog', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
        { title: 'Write Article', desc: 'Draft a new insights piece', icon: 'ri-quill-pen-line', path: '/admin/write-blog', color: 'text-fuchsia-500', bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="relative overflow-hidden bg-primary-950 py-16 md:py-24">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-4 backdrop-blur-md">
            Command Center
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Admin <span className="italic text-primary-400 font-light">Portal</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto font-light">
            Manage your high-end property portfolio and editorial content from one unified interface.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {adminModules.map((section) => (
              <div key={section.category}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground-950">{section.category}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => navigate(item.path)}
                      className="group flex flex-col items-start p-8 bg-white dark:bg-card rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 text-left w-full"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <i className={`${item.icon} ${item.color} text-2xl`} />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground-500 font-light leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">
                        Access Module <i className="ri-arrow-right-line" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DEVELOPER TOOLS */}
          <div className="mt-20 pt-10 border-t border-black/5 text-center">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground-400 mb-8">
              Developer Tools
            </h3>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
              
              {/* Properties Automation Box */}
              <div className="flex-1 bg-blue-50/50 dark:bg-blue-500/5 rounded-3xl p-6 border border-blue-100 dark:border-blue-500/10 w-full">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-building-4-line text-xl" />
                </div>
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-4">Properties Sync</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleSeedProperties}
                    disabled={seedingProperties}
                    className="w-full px-6 py-3 bg-white dark:bg-card text-blue-600 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {seedingProperties ? <><i className="ri-loader-4-line animate-spin mr-2" /> Seeding...</> : <>1. Seed Data (36)</>}
                  </button>
                  
                  <button 
                    onClick={handleAutomatedImageUpload}
                    disabled={automatingImages}
                    className="w-full px-6 py-3 bg-blue-600 text-white border border-blue-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {automatingImages ? (
                      <><i className="ri-loader-4-line animate-spin mr-2" /> Uploading ({uploadProgress}/36)...</>
                    ) : (
                      <>2. Sync Local Images</>
                    )}
                  </button>
                </div>
              </div>

              {/* Blogs Automation Box */}
              <div className="flex-1 bg-purple-50/50 dark:bg-purple-500/5 rounded-3xl p-6 border border-purple-100 dark:border-purple-500/10 w-full">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-article-line text-xl" />
                </div>
                <h4 className="text-sm font-bold text-purple-900 dark:text-purple-400 mb-4">Editorial Sync</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleSeedBlogs}
                    disabled={seedingBlogs}
                    className="w-full px-6 py-3 bg-white dark:bg-card text-purple-600 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-purple-50 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {seedingBlogs ? <><i className="ri-loader-4-line animate-spin mr-2" /> Seeding...</> : <>1. Seed Articles (10)</>}
                  </button>
                  <button 
                    onClick={handleAutomatedBlogImageUpload}
                    disabled={automatingBlogImages}
                    className="w-full px-6 py-3 bg-purple-600 text-white border border-purple-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {automatingBlogImages ? (
                      <><i className="ri-loader-4-line animate-spin mr-2" /> Uploading ({blogUploadProgress}/10)...</>
                    ) : (
                      <>2. Sync Local Images</>
                    )}
                  </button>
                </div>
              </div>

            </div>
            
            <p className="text-[10px] text-foreground-400 mt-6 max-w-lg mx-auto leading-relaxed">
              Ensure you have created the folders <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-foreground-950 font-mono">public/seed-images/</code> and <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-foreground-950 font-mono">public/seed-blog-images/</code> containing correctly named files before syncing.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}