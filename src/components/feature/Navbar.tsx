// File: src/components/feature/Navbar.tsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Insights', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Helper function to determine if the current path matches the link
  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Sleek Floating Glass Pill Navbar */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 rounded-full border bg-white/70 dark:bg-black/50 border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          {/* Logo */}
          <a className="flex items-center gap-3 shrink-0 group" href="/">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-transparent flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105">
              <img
                src="/logo.jpg"
                alt="Kevlin & Company"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-heading font-bold text-base md:text-xl whitespace-nowrap text-foreground-950 tracking-tight">
              Kevlin & Company
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-[13px] uppercase tracking-wider font-semibold transition-all duration-300 rounded-full whitespace-nowrap ${
                    active
                      ? 'bg-black/5 dark:bg-white/10 text-foreground-950'
                      : 'text-foreground-800 hover:text-foreground-950 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:block">
              <a
                href="/list-with-us"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs uppercase tracking-wider font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-400 h-10 px-6 bg-foreground-950 text-background-50 hover:bg-primary-600 hover:text-white active:scale-[0.97] shadow-md hover:shadow-xl hover:shadow-primary-500/20"
              >
                List with us
              </a>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all lg:hidden text-foreground-700 hover:bg-black/5"
              aria-label="Open menu"
            >
              {mobileOpen ? (
                <i className="ri-close-line text-xl" />
              ) : (
                <i className="ri-menu-4-line text-xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[calc(4rem+1rem)] md:top-[calc(5rem+1rem)] left-4 right-4 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-[440px] backdrop-blur-2xl rounded-3xl border p-4 space-y-2 bg-white/80 border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`block px-5 py-3.5 text-sm uppercase tracking-wide font-semibold rounded-2xl transition-colors ${
                  active
                    ? 'bg-black/5 dark:bg-white/10 text-foreground-950'
                    : 'text-foreground-800 hover:text-foreground-950 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-3 pb-1 px-1">
            <a
              href="/list-with-us"
              className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm uppercase tracking-wide font-bold transition-all h-12 px-4 bg-foreground-950 text-background-50 active:scale-[0.98]"
            >
              List with us
            </a>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm lg:hidden transition-opacity duration-500"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}