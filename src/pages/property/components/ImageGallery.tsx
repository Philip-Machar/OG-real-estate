import { useState, useCallback, useEffect, useRef } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const preloaded = useRef<Set<string>>(new Set());

  const preload = useCallback((src: string) => {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    const img = new window.Image();
    img.src = src;
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const next = (current + 1) % images.length;
    const prev = (current - 1 + images.length) % images.length;
    preload(images[next]);
    preload(images[prev]);
  }, [current, images, preload]);

  useEffect(() => {
    if (images.length > 1) {
      preload(images[1]);
    }
  }, [images, preload]); 

  const goNext = useCallback(() => {
    setLoaded(false);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLoaded(false);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setLoaded(false);
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!fullscreen) return;
      if (e.key === 'Escape') setFullscreen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullscreen, goNext, goPrev]);

  useEffect(() => {
    setLoaded(false);
  }, [current]);

  if (images.length === 0) return null;

  return (
    <div className="animate-fade-up">
      {/* Main Gallery */}
      <div className="relative w-full bg-background-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-lg">
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-background-100 via-background-200 to-background-100 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
          )}

          {/* Blurred Background Layer */}
          <img
            src={images[current]}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-60 transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Main Foreground Image */}
          <img
            src={images[current]}
            alt={`${title} - Photo ${current + 1}`}
            className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            fetchpriority="high"
            decoding="async"
          />

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                aria-label="Previous image"
              >
                <i className="ri-arrow-left-s-line text-2xl" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                aria-label="Next image"
              >
                <i className="ri-arrow-right-s-line text-2xl" />
              </button>
            </>
          )}

          {/* Fullscreen toggle */}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Open fullscreen"
          >
            <i className="ri-fullscreen-line text-lg" />
          </button>

          {/* Elegant Dash Bullets */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === current
                      ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                      : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Luxury Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 py-6 overflow-x-auto scrollbar-hide px-2">
          {images.map((img, idx) => (
            <button
              key={`${img}-thumb`}
              onClick={() => goTo(idx)}
              className={`relative shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                idx === current
                  ? 'ring-2 ring-primary-500 ring-offset-4 ring-offset-background-50 scale-105 shadow-md'
                  : 'opacity-50 hover:opacity-100 hover:scale-105'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center animate-[fade-in_0.3s_ease-out]"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all z-10"
            aria-label="Close fullscreen"
          >
            <i className="ri-close-line text-2xl" />
          </button>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 border border-white/10 rounded-full text-white text-xs font-bold tracking-widest uppercase">
            {current + 1} of {images.length}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all z-10"
              >
                <i className="ri-arrow-left-s-line text-3xl" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all z-10"
              >
                <i className="ri-arrow-right-s-line text-3xl" />
              </button>
            </>
          )}

          <img
            src={images[current]}
            alt={title}
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            decoding="async"
          />
        </div>
      )}
    </div>
  );
}