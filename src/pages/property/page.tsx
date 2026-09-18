// File: src/pages/property/page.tsx
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PropertyCard from '@/pages/home/components/PropertyCard';
import ImageGallery from '@/pages/property/components/ImageGallery';
import SEO from '@/components/feature/SEO';
import { type Property } from '@/mocks/properties';
import { fetchPropertyById, fetchAllProperties } from '@/services/propertyService';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [shareOpen, setShareOpen] = useState(false);
  
  const [property, setProperty] = useState<Property | null>(null);
  const [related, setRelated] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      
      setLoading(true);
      try {
        const foundProperty = await fetchPropertyById(id);
        setProperty(foundProperty);

        if (foundProperty) {
          const allFetched = await fetchAllProperties('published');
          const relatedProps = allFetched
            .filter((p) => String(p.id) !== String(foundProperty.id))
            .filter((p) => p.type?.toLowerCase() === foundProperty.type?.toLowerCase())
            .slice(0, 4);
            
          setRelated(relatedProps);
        }
      } catch (error) {
        console.error("Error loading property:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [id]);

  const statusLabel = useMemo(() => {
    if (!property?.status) {
      if (property?.title?.toLowerCase().includes('rent')) return 'For Rent';
      if (property?.title?.toLowerCase().includes('sale')) return 'For Sale';
      return 'Available';
    }
    return property.status === 'rent' ? 'For Rent' : 'For Sale';
  }, [property]);

  const statusColor = statusLabel === 'For Sale' ? 'bg-primary-500' : 'bg-accent-500';

  const images = useMemo(() => {
    if (!property) return [];
    if (Array.isArray(property.images) && property.images.length > 0) return property.images;
    return property.image ? [property.image] : [];
  }, [property]);

  // Safe Date parsing for Firestore Timestamps, Strings, or Numbers
  const datePostedISO = useMemo(() => {
    try {
      const rawDate = (property as any)?.createdAt;
      if (!rawDate) return new Date().toISOString();
      if (typeof rawDate?.toDate === 'function') return rawDate.toDate().toISOString();
      if (rawDate instanceof Date) return rawDate.toISOString();
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) return parsed.toISOString();
      return new Date().toISOString();
    } catch {
      return new Date().toISOString();
    }
  }, [property]);

  const rawMapInput = ((property as any)?.mapLocation || property?.location || '').trim();
  let mapIframeSrc = '';
  let externalMapLink = '';

  const isUrl = /^https?:\/\//i.test(rawMapInput);
  const isIframe = rawMapInput.toLowerCase().startsWith('<iframe') && rawMapInput.includes('src="');
  const isEmbedUrl = rawMapInput.startsWith('https://www.google.com/maps/embed');

  if (isIframe) {
    const match = rawMapInput.match(/src="([^"]+)"/);
    mapIframeSrc = match ? match[1] : '';
  } else if (isEmbedUrl) {
    mapIframeSrc = rawMapInput;
  } else if (isUrl) {
    externalMapLink = rawMapInput;
    mapIframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(property?.location || '')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  } else {
    mapIframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(rawMapInput || property?.location || 'Nairobi, Kenya')}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50">
        <Navbar />
        <div className="h-16 md:h-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin mb-4" />
          <p className="text-foreground-500 font-bold tracking-widest uppercase text-xs">Loading Details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background-50">
        <Navbar />
        <div className="h-16 md:h-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="w-20 h-20 bg-white dark:bg-card border border-black/5 dark:border-white/5 shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-home-gear-line text-3xl text-foreground-400" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground-950 mb-3">Property Unavailable</h1>
          <p className="text-foreground-500 mb-8 max-w-md mx-auto">This exclusive listing may have been sold, rented, or removed from our portfolio.</p>
          <a
            href="/properties"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-foreground-950 text-background-50 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 transition-all shadow-lg hover:-translate-y-1"
          >
            <i className="ri-arrow-left-line text-sm" />
            Return to Portfolio
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const listingSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title || "Luxury Property",
    "description": property.description || "",
    "image": images[0] || property.image || "",
    "url": `https://www.kenyaclassichomes.com/properties/${property.id}`,
    "datePosted": datePostedISO,
    "offers": {
      "@type": "Offer",
      "price": String(property.price || '').replace(/,/g, ''),
      "priceCurrency": property.currency || "KES",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "Apartment",
        "name": property.title || "Property",
        "numberOfRooms": property.beds || 0,
        "numberOfBathroomsTotal": property.baths || 0,
      }
    }
  });

  return (
    <div className="min-h-screen bg-background-50">
      <SEO 
        title={`${property.title || 'Property'} | Kevlin & Company`}
        description={(property.description || '').substring(0, 160) + '...'}
        image={images[0] || property.image}
        url={`https://www.kenyaclassichomes.com/properties/${property.id}`}
        schema={listingSchema}
      />
      <Navbar />
      <div className="h-16 md:h-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* FIX: Added relative and z-50 here to ensure the dropdown overlays the text below */}
        <div className="relative z-50 flex items-center justify-between mb-8 animate-fade-up">
          <a
            href="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-foreground-600 hover:text-foreground-950 hover:bg-white dark:hover:bg-black/40 transition-all shadow-sm"
          >
            <i className="ri-arrow-left-line text-sm" />
            <span className="hidden sm:inline">Portfolio</span>
          </a>

          <div className="relative">
            <button
              onClick={() => setShareOpen(!shareOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-foreground-600 hover:text-foreground-950 hover:bg-white dark:hover:bg-black/40 transition-all shadow-sm"
            >
              <i className="ri-share-line text-sm" />
              <span className="hidden sm:inline">Share</span>
            </button>
            
            {shareOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-card/90 backdrop-blur-2xl rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-40 p-2 animate-[dropdown-in_0.15s_ease-out]">
                <button
                  onClick={copyLink}
                  className="w-full text-left px-5 py-3 rounded-2xl text-[13px] font-semibold text-foreground-700 hover:bg-foreground-50 dark:hover:bg-white/5 hover:text-foreground-950 transition-colors flex items-center gap-3"
                >
                  <i className="ri-link text-foreground-400 text-lg" />
                  Copy Link
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Take a look at this exclusive property from Kevlin & Company: ${property.title} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-5 py-3 rounded-2xl text-[13px] font-semibold text-foreground-700 hover:bg-foreground-50 dark:hover:bg-white/5 hover:text-foreground-950 transition-colors flex items-center gap-3"
                >
                  <i className="ri-whatsapp-line text-green-500 text-lg" />
                  WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 mb-10 text-center md:text-left animate-fade-up-delayed">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm ${statusColor}`}>
              {statusLabel}
            </span>
            
            {property.hotDeal && (
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-accent-500 text-foreground-950 shadow-sm">
                Hot Deal
              </span>
            )}
            
            {property.fullyFurnished && (
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white border border-black/10 dark:bg-white/10 dark:border-white/20 text-foreground-950 dark:text-white shadow-sm">
                Fully Furnished
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground-950 leading-[1.1] mb-6">
            {property.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <div className="flex items-baseline justify-center md:justify-start gap-1.5">
              <span className="text-lg font-medium text-foreground-500">{property.currency || 'KES'}</span>
              <span className="text-4xl md:text-5xl font-bold text-primary-600 tracking-tight">
                {property.price}
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-foreground-500 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/5 dark:border-white/5">
              <i className="ri-map-pin-line text-lg text-primary-500" />
              <span className="text-sm font-medium tracking-wide">{property.location}</span>
            </div>
          </div>
        </div>

        <ImageGallery images={images} title={property.title || 'Property'} />

        <div className="grid gap-10 lg:grid-cols-3 lg:items-start mt-12 md:mt-16 animate-fade-up-delayed-2">
          
          <div className="space-y-12 lg:col-span-2">
            
            <div className="prose-container">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-6">Property Overview</h2>
              <p className="text-base md:text-[17px] text-foreground-600 leading-[2] font-light whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-black/10 via-black/5 to-transparent dark:from-white/10 dark:via-white/5" />

            {Array.isArray(property.amenities) && property.amenities.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-8">Premium Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 bg-white dark:bg-card border border-black/5 dark:border-white/5 rounded-2xl p-4 shadow-sm group hover:border-primary-200 hover:shadow-md transition-all duration-300">
                      <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500 transition-colors duration-300">
                        <i className="ri-check-line text-primary-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[13px] font-semibold text-foreground-800 tracking-wide group-hover:text-foreground-950 transition-colors">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full h-px bg-gradient-to-r from-black/10 via-black/5 to-transparent dark:from-white/10 dark:via-white/5" />

            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950">Neighborhood Map</h2>
                {externalMapLink && (
                  <a 
                    href={externalMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-background-200/50 hover:bg-background-200 text-foreground-950 text-[11px] font-bold uppercase tracking-widest rounded-full transition-colors"
                  >
                    <i className="ri-external-link-line" />
                    Open in Google Maps
                  </a>
                )}
              </div>
              <div className="rounded-[2rem] overflow-hidden border-4 border-white dark:border-card shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white">
                <iframe
                  title={`Map showing location`}
                  src={mapIframeSrc}
                  className="w-full h-72 md:h-96 grayscale-[20%] contrast-125"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-4 text-sm text-foreground-500 font-medium flex items-center gap-2">
                <i className="ri-information-line text-primary-500 text-lg" />
                Exact Location: {(!isUrl && !isIframe) ? rawMapInput : property.location}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[7rem] space-y-6">
              
              <div className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-10">
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary-500 mb-8 text-center">
                  Property Highlights
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3 text-foreground-500">
                      <i className="ri-hotel-bed-line text-xl" />
                      <span className="text-sm font-medium tracking-wide">Bedrooms</span>
                    </div>
                    <span className="text-lg font-bold text-foreground-950">{property.beds ?? '-'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3 text-foreground-500">
                      <i className="ri-showers-line text-xl" />
                      <span className="text-sm font-medium tracking-wide">Bathrooms</span>
                    </div>
                    <span className="text-lg font-bold text-foreground-950">{property.baths ?? '-'}</span>
                  </div>

                  {property.sqft && (
                    <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-3 text-foreground-500">
                        <i className="ri-ruler-line text-xl" />
                        <span className="text-sm font-medium tracking-wide">Total Area (sqft)</span>
                      </div>
                      <span className="text-lg font-bold text-foreground-950">{property.sqft}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3 text-foreground-500">
                      <i className="ri-calendar-line text-xl" />
                      <span className="text-sm font-medium tracking-wide">Year Built</span>
                    </div>
                    <span className="text-lg font-bold text-foreground-950">{property.yearBuilt ?? '-'}</span>
                  </div>

                  <div className="flex items-center justify-between pb-6">
                    <div className="flex items-center gap-3 text-foreground-500">
                      <i className="ri-building-4-line text-xl" />
                      <span className="text-sm font-medium tracking-wide">Property Type</span>
                    </div>
                    <span className="text-sm font-bold text-foreground-950 uppercase tracking-widest">{property.type || '-'}</span>
                  </div>
                </div>
                
                <div className="mt-10">
                  <a
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground-950 text-background-50 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <i className="ri-calendar-schedule-line text-base" />
                    Request a Tour
                  </a>
                </div>
              </div>

              <div className="bg-primary-50/50 dark:bg-white/5 rounded-[2rem] border border-primary-100 dark:border-white/10 p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center shrink-0">
                  <i className="ri-shield-star-line text-primary-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground-950 tracking-wide mb-1">Verified Listing</p>
                  <p className="text-xs text-foreground-500 leading-relaxed font-light">
                    This property has been physically verified by Kevlin & Company agents. All legal documentation is secured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24 md:mt-32 pt-16 border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4">
                Exclusive Selection
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground-950 mb-6">
                Similar <span className="italic text-primary-400 font-light">Properties</span>
              </h2>
              <div className="w-10 h-1 bg-accent-500 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}