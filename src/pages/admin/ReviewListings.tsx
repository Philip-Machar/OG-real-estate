import { useState, useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { fetchAllProperties, updatePropertyStatus } from '@/services/propertyService';
import type { Property } from '@/mocks/properties';

export default function ReviewListings() {
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPending = async () => {
    setLoading(true);
    const data = await fetchAllProperties('pending');
    setPendingProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleAction = async (id: string, action: 'published' | 'rejected') => {
    try {
      await updatePropertyStatus(id, action);
      // Remove it from the local queue
      setPendingProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Error updating property status.");
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      <section className="bg-primary-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-2xl font-bold mb-1">Review Pending Listings</h1>
          <p className="text-white/70 text-sm">Approve or reject properties submitted by users.</p>
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <i className="ri-loader-4-line text-3xl animate-spin text-primary-500" />
            <p className="text-foreground-500 mt-2">Loading queue...</p>
          </div>
        ) : pendingProperties.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-background-200">
            <i className="ri-check-double-line text-4xl text-green-500 mb-2" />
            <h3 className="text-lg font-bold text-foreground-950">You're all caught up!</h3>
            <p className="text-sm text-foreground-500">There are no pending listings to review.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingProperties.map((property: any) => (
              <div key={property.id} className="bg-card rounded-2xl border border-background-200 p-5 flex flex-col md:flex-row gap-6 shadow-sm">
                
                {/* Images */}
                <div className="w-full md:w-64 shrink-0">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-background-100 relative">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                      {property.imageCount} Photos
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-foreground-950">{property.title}</h3>
                    <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-[11px] font-bold uppercase rounded-md">Pending Review</span>
                  </div>
                  
                  <div className="text-primary-600 font-bold mb-3">{property.currency} {property.price}</div>
                  
                  <div className="grid grid-cols-2 text-sm text-foreground-600 mb-4 gap-y-2">
                    <div><i className="ri-map-pin-line mr-1" /> {property.location}</div>
                    <div><i className="ri-building-line mr-1" /> {property.type} (For {property.status})</div>
                    <div><i className="ri-user-line mr-1" /> {property.contactName || 'N/A'}</div>
                    <div><i className="ri-phone-line mr-1" /> <a href={`tel:${property.contactPhone}`} className="text-primary-600">{property.contactPhone || 'N/A'}</a></div>
                  </div>

                  <p className="text-sm text-foreground-500 line-clamp-2 mb-4">{property.description}</p>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleAction(property.id, 'published')}
                      className="px-5 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <i className="ri-check-line mr-1" /> Approve & Publish
                    </button>
                    <button 
                      onClick={() => handleAction(property.id, 'rejected')}
                      className="px-5 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <i className="ri-close-line mr-1" /> Reject
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