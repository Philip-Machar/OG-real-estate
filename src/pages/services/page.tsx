// File: src/pages/services/page.tsx
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { services } from '@/mocks/siteData';

const processSteps = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'We start by understanding your needs, preferences, and budget to tailor our services to you.',
    icon: 'ri-chat-1-line',
  },
  {
    step: '02',
    title: 'Search & Analysis',
    description: 'Our team curates properties that match your criteria, complete with detailed market analysis.',
    icon: 'ri-search-line',
  },
  {
    step: '03',
    title: 'Viewings & Strategy',
    description: 'We arrange private viewings and handle all negotiations to secure the best possible deal.',
    icon: 'ri-eye-line',
  },
  {
    step: '04',
    title: 'Closing & Handover',
    description: 'From legal paperwork to final handover, we ensure a smooth, discreet, and hassle-free process.',
    icon: 'ri-shield-check-line',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <div className="h-16 md:h-20" />

      {/* Premium Cinematic Hero */}
      <section className="relative overflow-hidden bg-black py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-110 animate-ken-burns"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 backdrop-blur-md animate-fade-up">
            Our Expertise
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-up-delayed max-w-4xl leading-[1.1]">
            Comprehensive Real Estate <span className="italic text-primary-400 font-light">Solutions</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed animate-fade-up-delayed-2">
            From exclusive property acquisitions to bespoke investment consulting, we offer a full spectrum of elite real estate services tailored to your exact needs.
          </p>
        </div>
      </section>

      {/* Services Grid - Cohesive Light Theme */}
      <section className="py-24 md:py-32 bg-white dark:bg-background-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              What We Offer
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
              Our Expert <span className="italic text-primary-400 font-light">Services</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-background-50 dark:bg-card rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/5 hover:border-primary-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group transform hover:-translate-y-2 flex flex-col"
              >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-background-50 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center mb-8 group-hover:bg-primary-500 transition-colors duration-500 shrink-0">
                  <i className={`${service.icon} text-primary-500 text-2xl group-hover:text-white transition-colors duration-500`} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-4">{service.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed font-light mb-8 flex-1">
                  {service.description}
                </p>
                <ul className="space-y-3 mt-auto pt-6 border-t border-black/5 dark:border-white/5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center shrink-0">
                        <i className="ri-check-line text-primary-600 text-xs" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process - Light Mode with Watermark Numbers */}
      <section className="py-24 md:py-32 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              How It Works
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
              The Kevlin <span className="italic text-primary-400 font-light">Process</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mx-auto" />
            <p className="text-foreground-500 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
              We have refined our property acquisition and management process to ensure absolute transparency, speed, and discretion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className="relative bg-white dark:bg-card rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 overflow-hidden group transform hover:-translate-y-2"
              >
                <span className="absolute -bottom-8 -right-4 text-[8rem] font-heading font-black text-black/[0.03] dark:text-white/[0.02] pointer-events-none select-none z-0 group-hover:scale-110 group-hover:text-primary-500/[0.05] transition-all duration-700">
                  {step.step}
                </span>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-background-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors duration-500">
                    <i className={`${step.icon} text-xl text-primary-500 group-hover:text-white transition-colors`} />
                  </div>
                  <h3 className="font-bold text-foreground-950 mb-3 text-lg">{step.title}</h3>
                  <p className="text-sm text-foreground-500 leading-relaxed font-light">{step.description}</p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 -right-4 w-8 h-px bg-gradient-to-r from-primary-200 to-transparent z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Advantage / Editorial Split Layout */}
      <section className="py-20 md:py-32 bg-white dark:bg-background-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative flex flex-col items-center lg:block">
              <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                  alt="Kevlin & Company Interior Consultation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
              
              {/* Floating Glass Card overlapping the image - refined for mobile */}
              <div className="relative -mt-16 lg:absolute lg:mt-0 lg:-right-12 lg:bottom-12 w-[90%] lg:w-auto bg-white/90 dark:bg-card/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12)] max-w-[280px] md:max-w-sm transform hover:-translate-y-2 transition-transform duration-500 z-10">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white mb-5 shadow-lg shadow-accent-500/30">
                  <i className="ri-hand-coin-line text-2xl" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-3">Ready to Begin?</h3>
                <p className="text-sm text-foreground-600 font-light leading-relaxed mb-6">
                  Schedule a private consultation with our elite property advisors today.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground-950 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 transition-all shadow-md active:scale-95"
                  >
                    Contact Us Now
                  </a>
                  <a
                    href="tel:+254700000000"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-background-50 dark:bg-white/5 text-foreground-950 border border-black/5 dark:border-white/10 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white dark:hover:bg-white/10 transition-all active:scale-95"
                  >
                    <i className="ri-phone-line" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
                Why Choose Us
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6 leading-tight">
                The Kevlin <span className="italic text-primary-400 font-light">Advantage</span>
              </h2>
              <div className="w-12 h-1 bg-accent-500 mb-8 rounded-full" />
              <p className="text-foreground-500 text-lg mb-12 font-light leading-relaxed">
                When you partner with Kevlin & Company, you are not just getting a broker—you are gaining a dedicated advisory team committed to your absolute success in the real estate market.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                {[
                  { icon: 'ri-global-line', title: 'Global Reach', desc: 'Connecting local properties with international investors.' },
                  { icon: 'ri-vip-crown-line', title: 'Discreet Service', desc: 'Absolute confidentiality for high-profile clients.' },
                  { icon: 'ri-scales-3-line', title: 'Legal Protection', desc: 'Rigorous due diligence on every transaction.' },
                  { icon: 'ri-line-chart-line', title: 'Market Insights', desc: 'Data-driven intelligence to maximize your ROI.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-background-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <i className={`${item.icon} text-2xl`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground-950 mb-2">{item.title}</h4>
                      <p className="text-sm text-foreground-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[3rem] bg-foreground-950 px-8 py-16 md:px-16 md:py-24 text-center shadow-2xl border border-black/10">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Need a Bespoke Solution?
              </h2>
              <p className="text-white/70 mb-10 text-base md:text-lg font-light leading-relaxed">
                Every client is unique. Contact us to discuss your specific requirements and we will create a tailored real estate strategy exclusively for you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-primary-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
              >
                <i className="ri-mail-send-line text-lg" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}