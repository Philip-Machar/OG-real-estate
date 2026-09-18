import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { fetchAllProperties, deleteProperty } from '@/services/propertyService';
import type { Property } from '@/mocks/properties';

export default function ManageListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = async () => {
    setLoading(true);
    // Fetch only real properties from Firebase
    const data = await fetchAllProperties('published');
    setProperties(data.filter(p => p.id)); 
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${title}"?`);
    if (!confirmDelete) return;

    try {
      await deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete property", err);
      alert("Error deleting property. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="bg-primary-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-2xl font-bold mb-1">Manage Listings</h1>
          <p className="text-white/70 text-sm">Update details or remove properties from the platform.</p>
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <i className="ri-loader-4-line text-3xl animate-spin text-primary-500" />
            <p className="text-foreground-500 mt-2">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-background-200">
            <i className="ri-building-4-line text-4xl text-foreground-400 mb-2" />
            <h3 className="text-lg font-bold text-foreground-950">No Published Properties</h3>
            <p className="text-sm text-foreground-500">You don't have any active listings to manage.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <div key={property.id} className="group bg-card rounded-2xl border border-background-200 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col">
                
                {/* Premium Image Container */}
                <div className="relative h-48 overflow-hidden bg-background-100">
                  {/* 1. Blurred Background Layer */}
                  <img
                    src={property.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-70 group-hover:scale-[1.3] transition-transform duration-700 ease-out"
                  />
                  
                  {/* 2. Main Foreground Image (Uncropped) */}
                  <img
                    src={property.image}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-[1.06] transition-transform duration-700 ease-out z-10"
                    loading="lazy"
                  />

                  {/* Hot Deal Badge */}
                  {property.hotDeal && (
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase rounded-lg shadow-sm">
                        Hot Deal
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-[15px] font-bold text-foreground-950 line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors duration-200">
                    {property.title}
                  </h3>
                  <div className="text-primary-600 font-semibold text-sm mb-3">
                    {property.currency} {property.price}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-foreground-500 mb-4">
                    <i className="ri-map-pin-line" /> <span className="line-clamp-1">{property.location}</span>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-background-200 pt-4">
                    <a 
                      href={`/admin/edit-property/${property.id}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-background-100 hover:bg-background-200 text-foreground-800 text-xs font-semibold rounded-lg transition-colors"
                    >
                      <i className="ri-edit-line" /> Edit
                    </a>
                    <button 
                      onClick={() => handleDelete(property.id, property.title)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
                    >
                      <i className="ri-delete-bin-line" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}