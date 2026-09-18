// File: src/pages/home/page.tsx
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SEO from '@/components/feature/SEO';
import HeroSection from './components/HeroSection';
import ExploreProperties from './components/ExploreProperties';
import FeaturedProperties from './components/FeaturedProperties';
import PrimeLocations from './components/PrimeLocations';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FadeInScroll from '@/components/base/FadeInScroll';

export default function Home() {
  // Define Kevlin & Company as a local real estate business to Google
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Kevlin & Company",
    "image": "/logo.jpg",
    "description": "Nairobi's premier real estate agency specializing in luxury properties in Karen, Runda, Westlands, and Kilimani.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Riverside Drive",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "telephone": "702601384",
    "url": "https://www.kenyaclassichomes.com"
  });

  return (
    <div className="min-h-screen bg-background-50">
      <SEO 
        title="Kevlin & Company | Luxury Real Estate in Nairobi (Karen, Runda, Westlands, Kilimani, Lavington)"
        description="Discover premium apartments, villas, and mansions for rent and sale in Nairobi's most prestigious neighbourhoods, including Karen, Runda, Kilimani, and Westlands."
        schema={schema}
      />
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <FadeInScroll><ExploreProperties /></FadeInScroll>
        <FadeInScroll><FeaturedProperties /></FadeInScroll>
        <FadeInScroll><PrimeLocations /></FadeInScroll>
        <FadeInScroll><WhyChooseUs /></FadeInScroll>
        <FadeInScroll><Testimonials /></FadeInScroll>
      </main>
      <Footer />
    </div>
  );
}