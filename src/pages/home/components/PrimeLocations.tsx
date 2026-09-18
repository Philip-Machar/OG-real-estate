import { useState, useEffect } from 'react';
import { fetchAllProperties } from '@/services/propertyService';

const LOCATIONS = [
  {
    id: 'karen',
    name: 'Karen',
    description: 'Luxurious family homes and leafy compounds.',
    image: 'https://avenuevaluers.co.ke/wp-content/uploads/2025/10/maxresdefault-1.jpg'
  },
  {
    id: 'westlands',
    name: 'Westlands',
    description: 'Vibrant city living, penthouses, and business.',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/623174198.jpg?k=a5f578b7a7117f88a85ed028127bec8b604fee86fdd101222c96752c9899a802&o=',
  },
  {
    id: 'runda',
    name: 'Runda',
    description: 'Exclusive estates and diplomatic residences.',
    image: 'https://www.homelinkafrica.co.ke/wp-content/uploads/2025/11/Ultra-Luxury-Modern-6-Bedroom-House-in-Runda-Homelink-Africa-Properties.jpeg',
  },
  {
    id: 'riverside',
    name: 'Riverside',
    description: 'Premium apartments and modern commercial hubs.',
    image: 'https://ownitkenya.com/wp-content/uploads/2025/09/Apartments-for-Sale-in-Kilimani.jpeg',
  },
];

export default function PrimeLocations() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadLocationCounts() {
      try {
        const properties = await fetchAllProperties('published');
        const newCounts: Record<string, number> = {};
        LOCATIONS.forEach(loc => {
          newCounts[loc.id] = properties.filter(p => 
            p.location?.toLowerCase().includes(loc.name.toLowerCase())
          ).length;
        });
        setCounts(newCounts);
      } catch (error) {
        console.error("Failed to load location counts", error);
      }
    }
    loadLocationCounts();
  }, []);

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-background-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4">
            Coveted Addresses
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
            Prime <span className="italic text-primary-400 font-light">Locations</span>
          </h2>
          <div className="w-12 h-1 bg-accent-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {LOCATIONS.map((location) => (
            <a
              key={location.id}
              href={`/properties?search=${location.name}`}
              className="group relative h-80 md:h-[22rem] rounded-[2.5rem] overflow-hidden block focus-visible:outline-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={location.image}
                alt={`${location.name} real estate`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-3">
                  {/* Floating Glass Pill for Count */}
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-xl border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold rounded-full shadow-lg">
                      {counts[location.id] !== undefined ? counts[location.id] : '...'} Properties
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-3xl font-bold text-white tracking-tight">{location.name}</h3>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                      <i className="ri-arrow-right-up-line text-white" />
                    </div>
                  </div>
                  <p className="text-white text-sm line-clamp-2 font-light leading-relaxed">
                    {location.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}