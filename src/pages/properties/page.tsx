// File: src/pages/properties/page.tsx
import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PropertyCard from '@/pages/home/components/PropertyCard';
import FilterDropdown from '@/pages/properties/components/FilterDropdown';
import { propertyCategories, type Property } from '@/mocks/properties';
import { fetchAllProperties } from '@/services/propertyService';

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

const transactionTypes = ['All', 'For Sale', 'For Rent'];
const furnishingOptions = ['All Furnishing', 'Furnished', 'Unfurnished', 'Semi-Furnished'];

function parsePrice(price: any): number {
  if (!price) return 0;
  if (typeof price === 'number') return price;
  return parseInt(String(price).replace(/,/g, ''), 10) || 0;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(() => new URLSearchParams(window.location.search).get('search') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [transactionType, setTransactionType] = useState('All');
  const [furnishing, setFurnishing] = useState('All Furnishing');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    let mounted = true;
    async function loadProperties() {
      try {
        const fetchedProperties = await fetchAllProperties('published');
        if (mounted) {
          const unique = Array.from(new Map(fetchedProperties.map(p => [p.id, p])).values());
          setProperties(unique);
        }
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProperties();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    try {
      let result = [...properties];

      if (activeCategory !== 'All') {
        const cat = activeCategory.toLowerCase();
        result = result.filter((p) => 
          (p.type?.toLowerCase() || '').includes(cat) || 
          (p.title?.toLowerCase() || '').includes(cat)
        );
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            (p.title?.toLowerCase() || '').includes(q) ||
            (p.location?.toLowerCase() || '').includes(q) ||
            (p.description?.toLowerCase() || '').includes(q)
        );
      }

      if (transactionType === 'For Sale') {
        result = result.filter((p) => 
          (p.title?.toLowerCase() || '').includes('sale') || 
          (p.status?.toLowerCase() || '') === 'sale'
        );
      } else if (transactionType === 'For Rent') {
        result = result.filter((p) => 
          (p.title?.toLowerCase() || '').includes('rent') || 
          (p.status?.toLowerCase() || '') === 'rent'
        );
      }

      if (sortBy === 'price-asc') {
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      } else if (sortBy === 'price-desc') {
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      }

      return result;
    } catch (err) {
      console.error("Filter error:", err);
      return properties;
    }
  }, [properties, activeCategory, searchQuery, sortBy, transactionType]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleReset = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('newest');
    setTransactionType('All');
    setFurnishing('All Furnishing');
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="relative overflow-hidden bg-black py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 backdrop-blur-md animate-fade-up">
            Portfolio
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-up-delayed">
            Find Your <span className="italic text-primary-400 font-light">Dream Property</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed animate-fade-up-delayed-2">
            Explore our extensive collection of premium properties across Kenya. Filter by location, price, and type to find exactly what you are looking for.
          </p>
        </div>
      </section>

      <section className="relative z-30 py-6 md:py-8 bg-background-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
            <div className="relative flex-1 lg:max-w-md group">
              <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-foreground-400 text-lg group-focus-within:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search location or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 rounded-full border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/20 backdrop-blur-md text-foreground-950 placeholder:text-foreground-400 text-[13px] font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white dark:focus:bg-card transition-all duration-300 shadow-sm hover:bg-white dark:hover:bg-black/40"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 flex-1">
              <FilterDropdown options={transactionTypes.map((t) => ({ label: t, value: t }))} value={transactionType} onChange={setTransactionType} />
              <FilterDropdown options={[{ label: 'All Types', value: 'All' }, ...propertyCategories.filter((c) => c !== 'All').map((c) => ({ label: c, value: c }))]} value={activeCategory} onChange={setActiveCategory} />
              <FilterDropdown options={furnishingOptions.map((f) => ({ label: f, value: f }))} value={furnishing} onChange={setFurnishing} />
              <FilterDropdown options={sortOptions} value={sortBy} onChange={setSortBy} />
              
              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-full bg-background-200/50 dark:bg-white/5 border border-transparent text-foreground-600 hover:border-black/5 dark:hover:border-white/10 hover:bg-white dark:hover:bg-black/40 hover:text-foreground-950 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ml-auto shadow-sm"
              >
                Reset
              </button>
            </div>
          </div>
          
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-foreground-500 font-medium">
              Showing <span className="text-foreground-950 font-bold">{visible.length}</span> of <span className="text-foreground-950 font-bold">{filtered.length}</span> properties
            </p>
          </div>

          {loading ? (
            <div className="text-center py-32 flex flex-col items-center">
              <div className="w-12 h-12 border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin mb-4" />
              <p className="text-foreground-500 font-medium tracking-widest uppercase text-xs">Loading Catalog...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 bg-white dark:bg-card rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm max-w-3xl mx-auto">
              <i className="ri-search-line text-5xl text-foreground-300 mb-6 block" />
              <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-3">No matches found</h3>
              <p className="text-foreground-500 text-sm max-w-md mx-auto mb-8">We couldn't find any properties matching your exact criteria. Try adjusting your filters or search terms.</p>
              <button onClick={handleReset} className="px-8 py-3.5 bg-foreground-950 text-background-50 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 transition-all shadow-lg hover:-translate-y-1">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {visible.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-16">
                  <button
                    onClick={() => setVisibleCount((c) => c + 12)}
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-foreground-200 text-foreground-950 font-bold uppercase tracking-[0.15em] text-xs hover:bg-foreground-950 hover:text-white transition-all duration-300 group"
                  >
                    Load More Properties
                    <i className="ri-arrow-down-line text-base group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}