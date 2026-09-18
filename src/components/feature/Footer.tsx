// File: src/components/feature/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-50 dark:bg-background-950 border-t border-black/5 dark:border-white/5 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Contact Column */}
          <div className="w-full lg:w-[35%] xl:w-[30%]">
            <a className="flex items-center gap-3 shrink-0 group mb-6" href="/">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-background-100 dark:border-white/10 shadow-sm bg-transparent flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/logo.jpg"
                  alt="Kevlin & Company"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-heading font-bold text-2xl whitespace-nowrap text-foreground-950 tracking-tight">
                Kevlin & Company
              </span>
            </a>
            <p className="text-sm text-foreground-500 leading-relaxed max-w-sm mb-8 font-light">
              Nairobi's premier real estate agency. We specialize in luxury properties, commercial spaces, and helping you find the perfect place to call home across Kenya.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:hello@Kevlinhomes.com" className="flex items-center gap-3 text-sm text-foreground-600 hover:text-primary-600 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300 shadow-sm">
                  <i className="ri-mail-send-line text-lg" />
                </div>
                <span className="font-medium tracking-wide">hello@Kevlinhomes.com</span>
              </a>
              <a href="tel:+254700000000" className="flex items-center gap-3 text-sm text-foreground-600 hover:text-primary-600 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300 shadow-sm">
                  <i className="ri-phone-line text-lg" />
                </div>
                <span className="font-medium tracking-wide">+254 700 000 000</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-foreground-600 group">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                  <i className="ri-map-pin-line text-lg" />
                </div>
                <span className="font-medium tracking-wide">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Links Grid - 2 columns on mobile, 3 on desktop */}
          <div className="w-full lg:w-[60%] xl:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-8 lg:pt-0 border-t border-black/5 dark:border-white/5 lg:border-t-0">
            
            {/* Quick Links Column */}
            <div>
              <h3 className="text-[11px] font-bold text-foreground-950 uppercase tracking-[0.2em] mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Browse Properties', href: '/properties' },
                  { label: 'List Your Property', href: '/list-with-us' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Services', href: '/services' },
                  { label: 'Contact Support', href: '/contact' }
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="relative inline-flex items-center text-sm text-foreground-500 hover:text-primary-600 transition-all duration-300 group font-light">
                      <i className="ri-arrow-right-s-line text-primary-400 absolute left-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="transition-transform duration-300 group-hover:translate-x-5">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Property Types Column */}
            <div>
              <h3 className="text-[11px] font-bold text-foreground-950 uppercase tracking-[0.2em] mb-6">Property Types</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Houses & Mansions', term: 'House' },
                  { label: 'Luxury Apartments', term: 'Apartment' },
                  { label: 'Holiday Villas', term: 'Villa' },
                  { label: 'Commercial Spaces', term: 'Commercial' },
                  { label: 'Plots & Land', term: 'Land' }
                ].map((link) => (
                  <li key={link.label}>
                    <a href={`/properties?search=${link.term}`} className="relative inline-flex items-center text-sm text-foreground-500 hover:text-primary-600 transition-all duration-300 group font-light">
                      <i className="ri-arrow-right-s-line text-primary-400 absolute left-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="transition-transform duration-300 group-hover:translate-x-5">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prime Locations Column */}
            <div className="col-span-2 md:col-span-1 border-t border-black/5 dark:border-white/5 md:border-t-0 pt-6 md:pt-0">
              <h3 className="text-[11px] font-bold text-foreground-950 uppercase tracking-[0.2em] mb-6">Prime Locations</h3>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {['Karen', 'Runda', 'Westlands', 'Riverside', 'Kilimani'].map((location) => (
                  <li key={location}>
                    <a href={`/properties?search=${location}`} className="relative inline-flex items-center text-sm text-foreground-500 hover:text-primary-600 transition-all duration-300 group font-light">
                      <i className="ri-arrow-right-s-line text-primary-400 absolute left-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="transition-transform duration-300 group-hover:translate-x-5">{location}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-foreground-400 text-center md:text-left font-light tracking-wide flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            © {currentYear} Kevlin & Company. All rights reserved.
          </p>
          
          <div className="flex items-center justify-center gap-3 w-full md:w-auto">
            {/* The Discreet Admin Entry Point */}
            <a 
              href="/admin" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-foreground-300 hover:text-primary-500 transition-colors"
              title="Admin Portal"
            >
              <i className="ri-lock-2-line text-lg" />
            </a>
            
            <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

            {/* UPDATED SOCIALS BLOCK */}
            {[
              { 
                icon: 'ri-facebook-fill', 
                label: 'Facebook', 
                href: 'https://www.facebook.com/KevinCompanyRealEstate/?ref=PROFILE_EDIT_xav_ig_profile_page_web#' 
              },
              { 
                icon: 'ri-instagram-line', 
                label: 'Instagram', 
                href: 'https://www.instagram.com/kevlin_company/' 
              }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-foreground-500 hover:bg-foreground-950 hover:text-white hover:border-foreground-950 transition-all duration-300 shadow-sm" 
                aria-label={social.label}
              >
                <i className={`${social.icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}