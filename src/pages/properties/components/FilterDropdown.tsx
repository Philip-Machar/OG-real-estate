import { useState, useRef, useEffect } from 'react';

interface FilterDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FilterDropdown({ options, value, onChange, placeholder }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder || value;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full md:w-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between md:justify-start gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm border w-full md:w-auto ${
          open
            ? 'bg-foreground-950 text-white border-foreground-950 shadow-lg scale-105'
            : 'bg-white/60 dark:bg-black/20 backdrop-blur-md text-foreground-600 border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-black/40 hover:border-black/10 hover:text-foreground-950'
        }`}
      >
        <span className="truncate">{selectedLabel}</span>
        <i className={`ri-arrow-down-s-line text-[14px] transition-transform duration-300 ${open ? 'rotate-180 text-white/70' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 w-full md:w-56 bg-white/90 dark:bg-card/90 backdrop-blur-2xl rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-40 overflow-hidden animate-[dropdown-in_0.15s_ease-out]">
          <div className="max-h-64 overflow-y-auto py-2 overscroll-contain">
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-[13px] transition-colors duration-200 whitespace-nowrap flex items-center justify-between ${
                    isActive
                      ? 'bg-foreground-50/50 dark:bg-white/5 text-foreground-950 font-bold'
                      : 'text-foreground-600 hover:bg-foreground-50 dark:hover:bg-white/5 hover:text-foreground-950 font-medium'
                  }`}
                >
                  {opt.label}
                  {isActive && (
                    <i className="ri-check-line text-primary-500 text-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}