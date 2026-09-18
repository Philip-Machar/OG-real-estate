import type { Property } from '@/mocks/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <a
      href={`/properties/${property.id}`}
      className="block h-full group focus-visible:outline-none"
    >
      <article className="relative bg-white dark:bg-card rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 border border-black/5 dark:border-white/5">
        
        {/* Premium Dual-Layer Image Container (Shorter height) */}
        <div className="relative h-52 overflow-hidden bg-background-100">
          {/* 1. Blurred Background Layer */}
          <img
            src={property.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-125 opacity-60 transition-opacity duration-500"
          />
          
          {/* 2. Main Foreground Image (Uncropped) */}
          <img
            src={property.image}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-contain z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          
          {/* Elegant Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />

          {/* Pill-shaped Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            {property.hotDeal && (
              <span className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-accent-500 text-white shadow-lg backdrop-blur-md">
                Hot Deal
              </span>
            )}
            {property.fullyFurnished && (
              <span className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/30">
                Furnished
              </span>
            )}
          </div>

          {/* Price overlaid on the image */}
          <div className="absolute bottom-4 left-5 z-20">
            <div className="flex items-baseline gap-1 text-white drop-shadow-md">
              <span className="text-sm font-medium opacity-90">{property.currency}</span>
              <span className="text-2xl font-bold tracking-tight">{property.price}</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold">
              {property.type}
            </span>
            <div className="flex items-center gap-1.5 text-foreground-400">
              <i className="ri-map-pin-line text-sm" />
              <span className="text-xs font-medium truncate max-w-[120px]">
                {property.location.split(',')[0]}
              </span>
            </div>
          </div>

          <h3 className="font-heading text-lg font-bold text-foreground-950 mb-3 leading-snug group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          
          <p className="text-sm text-foreground-500 leading-relaxed line-clamp-2 mb-6 flex-1">
            {property.description}
          </p>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-3 gap-2 pt-5 border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col items-center justify-center text-center">
              <i className="ri-hotel-bed-line text-foreground-400 mb-1.5 text-lg" />
              <span className="text-xs font-bold text-foreground-700">{property.beds || '-'} Beds</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-l border-r border-black/5 dark:border-white/5">
              <i className="ri-showers-line text-foreground-400 mb-1.5 text-lg" />
              <span className="text-xs font-bold text-foreground-700">{property.baths || '-'} Baths</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <i className="ri-ruler-line text-foreground-400 mb-1.5 text-lg" />
              <span className="text-xs font-bold text-foreground-700">
                {property.sqft ? `${property.sqft} sqft` : '-'}
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}