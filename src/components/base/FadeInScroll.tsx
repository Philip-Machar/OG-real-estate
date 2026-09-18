// File: src/components/base/FadeInScroll.tsx
import { useEffect, useRef, useState, ReactNode } from 'react';

interface FadeInScrollProps {
  children: ReactNode;
  delay?: number; // In milliseconds
  className?: string;
}

export default function FadeInScroll({ children, delay = 0, className = '' }: FadeInScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply delay for staggered animations
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Stop observing once it has been revealed
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { 
        // Trigger the second ANY pixel of the element enters the boundary
        threshold: 0, 
        // Trigger the animation when the element is 200px BELOW the viewport
        rootMargin: '0px 0px 200px 0px' 
      }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}