// File: src/pages/home/components/ExploreProperties.tsx
import { useState, useEffect } from 'react';
import { propertyCategories, type Property } from '@/mocks/properties';
import { fetchAllProperties } from '@/services/propertyService';
import PropertyCard from './PropertyCard';

export default function ExploreProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      // Fetch all published properties
      const data = await fetchAllProperties('published');
      setProperties(data);
      setLoading(false);
    }
    loadProperties();
  }, []);

  // Filter by category and limit to 12 properties max for desktop
  const filtered = (
    activeCategory === 'All'
      ? properties
      : properties.filter((p) => p.type.toLowerCase() === activeCategory.toLowerCase())
  ).slice(0, 12);

  return (
    <section className="py-20 md:py-32 bg-background-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* High-end Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              Browse Our Portfolio
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6 md:mb-0">
              Explore <span className="italic text-primary-400 font-light">Properties</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mt-6 hidden md:block mx-auto md:mx-0" />
          </div>
          {/* The top button has been completely removed to avoid forcing the user to scroll back up */}
        </div>

        {/* Pill-Shaped Glass Categories - Centered on Mobile, Left-aligned on Desktop */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-12">
          {propertyCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm border ${
                activeCategory === cat
                  ? 'bg-foreground-950 text-white border-foreground-950 shadow-lg scale-105'
                  : 'bg-white/60 dark:bg-black/20 backdrop-blur-md text-foreground-600 border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-black/40 hover:border-black/10 hover:text-foreground-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin mb-4" />
            <p className="text-foreground-500 font-medium tracking-widest uppercase text-xs">Loading Portfolio...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <i className="ri-building-4-line text-4xl text-foreground-300 mb-3 block" />
            <p className="text-foreground-500 text-sm">No properties found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((property, index) => (
              /* Hide items after index 5 (6th item) on mobile devices only */
              <div key={property.id} className={index >= 6 ? 'hidden md:block' : ''}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        {/* View All Button - Now universally visible at the bottom for all screen sizes */}
        {!loading && filtered.length > 0 && (
          <div className="mt-10 md:mt-16 flex justify-center">
            <a
              href="/properties"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 rounded-full border border-foreground-200 text-foreground-950 font-bold uppercase tracking-[0.15em] text-[11px] hover:bg-foreground-950 hover:text-white transition-all duration-300 group shadow-sm bg-white"
            >
              View All Properties
              <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}

      </div>
    </section>
  );
}