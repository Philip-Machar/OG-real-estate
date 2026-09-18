import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { fetchAllProperties } from '@/services/propertyService';
import type { Property } from '@/mocks/properties';

export default function FeaturedProperties() {
  const [hotDeals, setHotDeals] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadHotDeals() {
      try {
        const properties = await fetchAllProperties('published');
        // Filter strictly for properties marked "Hot Deal"
        // We fetch ALL of them, but we will control how many are displayed in the render
        const deals = properties.filter((p) => p.hotDeal === true);
        setHotDeals(deals);
      } catch (error) {
        console.error("Failed to load hot deals:", error);
      } finally {
        setLoading(false);
      }
    }
    loadHotDeals();
  }, []);

  // Determine which properties to show based on the 'showAll' state
  const displayedDeals = showAll ? hotDeals : hotDeals.slice(0, 4);

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-white dark:bg-background-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* High-end Editorial Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4">
            Curated Selection
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
            Exclusive <span className="italic text-primary-400 font-light">Hot Deals</span>
          </h2>
          <div className="w-12 h-1 bg-accent-500 mb-6 rounded-full" />
          <p className="text-foreground-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Handpicked properties offering exceptional value and unparalleled luxury. Act fast—these exclusive opportunities won't last long.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin mb-4" />
            <p className="text-foreground-500 font-medium tracking-widest uppercase text-xs">Curating properties...</p>
          </div>
        ) : hotDeals.length === 0 ? (
          <div className="text-center py-24 bg-background-100/50 rounded-[2.5rem] border border-background-200 max-w-3xl mx-auto shadow-inner">
            <i className="ri-vip-diamond-line text-5xl text-primary-300 mb-6 block" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground-800 mb-3">Awaiting New Discoveries</h3>
            <p className="text-foreground-500 mb-10 max-w-md mx-auto text-sm md:text-base leading-relaxed">We are currently hand-selecting the next portfolio of exclusive deals. Check back soon for extraordinary opportunities.</p>
            <a href="/properties" className="inline-flex items-center gap-3 px-8 py-4 bg-foreground-950 text-background-50 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              View Full Catalog
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {displayedDeals.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {/* View All Hot Deals Button (Only visible if there are more than 4 deals and not already expanded) */}
            {!showAll && hotDeals.length > 4 && (
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full border border-foreground-200 text-foreground-950 font-bold uppercase tracking-[0.15em] text-xs hover:bg-foreground-950 hover:text-white transition-all duration-300 group"
                >
                  View All Hot Deals
                  <i className="ri-arrow-right-line text-base group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Show Less Button (Appears when expanded so the user can collapse it back) */}
            {showAll && hotDeals.length > 4 && (
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={() => setShowAll(false)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full border border-foreground-200 text-foreground-950 font-bold uppercase tracking-[0.15em] text-xs hover:bg-foreground-950 hover:text-white transition-all duration-300 group"
                >
                  Show Less
                  <i className="ri-arrow-up-line text-base group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}