// File: src/pages/home/components/HeroSection.tsx
import { useState } from 'react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build the search URL based on inputs and redirect to properties page
    let url = '/properties?';
    if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
    if (propertyType !== 'All') url += `type=${encodeURIComponent(propertyType)}`;
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      
      {/* Background Image Container with Ken Burns Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns scale-110"
          style={{
            /* Using a highly reliable, premium Unsplash photograph */
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop)',
          }}
        />
      </div>

      {/* Sophisticated Gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-20">
        
        <div className="animate-fade-up">
          <span className="inline-block mb-4 text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/80 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Welcome to Kevlin and Company
          </span>
        </div>

        {/* Elegant Typography */}
        <h1 className="animate-fade-up-delayed font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.1] tracking-tight drop-shadow-2xl mb-6 max-w-5xl mx-auto">
          Discover properties that define <br className="hidden md:block" />
          <span className="italic font-light text-primary-400">luxury living</span>
        </h1>

        <p className="animate-fade-up-delayed-2 text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed font-light mb-12 drop-shadow-lg">
          Explore Kenya’s most exclusive residential and commercial real estate portfolio, curated for those with uncompromising taste.
        </p>

        {/* Floating Quick Search Console */}
        <div className="animate-fade-up-delayed-2 w-full max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 p-2 md:p-3 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Location Input */}
            <div className="relative flex-1 w-full bg-white rounded-2xl md:rounded-full flex items-center px-5 py-3.5 md:py-0 h-14 transition-colors focus-within:ring-2 focus-within:ring-primary-400">
              <i className="ri-map-pin-line text-foreground-400 text-lg mr-3" />
              <input
                type="text"
                placeholder="Where do you want to live? (e.g. Karen, Kilimani)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground-950 placeholder:text-foreground-400 outline-none"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="relative w-full md:w-64 bg-white rounded-2xl md:rounded-full flex items-center px-5 py-3.5 md:py-0 h-14 border-t md:border-t-0 md:border-l border-background-200">
              <i className="ri-home-4-line text-foreground-400 text-lg mr-3" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground-950 outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Property Types</option>
                <option value="House">Houses & Mansions</option>
                <option value="Apartment">Luxury Apartments</option>
                <option value="Villa">Villas</option>
                <option value="Commercial">Commercial Spaces</option>
                <option value="Land">Plots & Land</option>
              </select>
              <i className="ri-arrow-down-s-line text-foreground-400 absolute right-5 pointer-events-none" />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto h-14 px-8 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl md:rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 shrink-0"
            >
              <i className="ri-search-line text-lg" />
              Search
            </button>
          </form>

          {/* Quick Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Trending:</span>
            {['Riverside', 'Runda', 'Diani Beach', 'Westlands'].map(tag => (
              <a 
                key={tag} 
                href={`/properties?search=${tag}`}
                className="text-xs font-medium text-white/80 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-md"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}