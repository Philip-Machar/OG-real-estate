// File: src/pages/home/components/Testimonials.tsx
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/mocks/properties';

export default function Testimonials() {
  // Quadruple the array to ensure the infinite scroll has enough content to loop seamlessly
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    let animationId: number;

    const scroll = () => {
      // Only auto-scroll if the user isn't actively hovering, touching, or dragging
      if (scrollRef.current && !isHovered && !isDragging) {
        scrollRef.current.scrollLeft += 1; // Speed of auto-scroll
        
        // Seamless infinite loop logic
        // When we scroll past half the content, instantly snap back to the beginning.
        // Because the arrays are identical, the user won't notice the jump.
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging]);

  // Mouse drag functionality for desktop users
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-background-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4">
            Words of Trust
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
            Client <span className="italic text-primary-400 font-light">Stories</span>
          </h2>
          <div className="w-12 h-1 bg-accent-500 rounded-full" />
        </div>

      </div>

      <div className="relative w-full mt-10">
        
        {/* Gradient fades on the edges for a clean look */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-white dark:from-background-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-white dark:from-background-100 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className={`flex gap-6 md:gap-8 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {extendedTestimonials.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="shrink-0 w-[320px] md:w-[450px] bg-background-50/60 dark:bg-card/40 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col select-none"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <i key={idx} className="ri-star-fill text-accent-500 text-lg" />
                ))}
              </div>
              
              <p className="text-foreground-700 text-base md:text-lg mb-10 italic font-light leading-relaxed flex-1">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md pointer-events-none">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground-950 tracking-wide">{t.name}</p>
                  <p className="text-[11px] uppercase tracking-widest text-primary-500 font-bold mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}