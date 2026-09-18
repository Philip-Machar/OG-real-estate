import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { aboutStats, coreValues, teamMembers, timelineItems, faqItems } from '@/mocks/siteData';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 backdrop-blur-md animate-fade-up">
            Our Heritage
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-up-delayed max-w-4xl leading-[1.1]">
            Building Dreams, <span className="italic text-primary-400 font-light">Creating Legacies</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed animate-fade-up-delayed-2">
            For over 15 years, we have been Kenya's most trusted partner in acquiring exceptional properties, blending deep local expertise with uncompromising standards of luxury.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-background-50 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-full bg-background-50 dark:bg-card border border-black/5 dark:border-white/5 flex items-center justify-center mx-auto mb-4 text-primary-500 shadow-sm">
                  <i className={`${stat.icon} text-xl`} />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-foreground-950 tracking-tight tabular-nums mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-bold text-foreground-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Editorial Split Layout */}
      <section className="py-20 md:py-32 bg-white dark:bg-background-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
                Our Story
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6 leading-tight">
                A Legacy of <span className="italic text-primary-400 font-light">Trust</span>
              </h2>
              <div className="w-12 h-1 bg-accent-500 mb-8 rounded-full" />
              
              <div className="space-y-6 text-foreground-500 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Kevlin & Company began with a singular vision: to elevate the Kenyan real estate experience by introducing unprecedented levels of transparency, sophistication, and personalized service.
                </p>
                <p>
                  What started as a boutique agency operating from a modest office along Riverside Drive has evolved into East Africa's premier real estate consultancy. We realized early on that our clients weren't just looking for structures; they were looking for sanctuaries, investments, and places to build their futures.
                </p>
                <p>
                  Today, we continue to disrupt the market. With over 2,500 successful transactions, our uncompromising dedication to our clients remains the cornerstone of our success.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground-950 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-primary-600 transition-all shadow-md active:scale-95"
                >
                  Browse Portfolio
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background-50 dark:bg-white/5 text-foreground-950 border border-black/5 dark:border-white/10 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white dark:hover:bg-white/10 transition-all active:scale-95"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
                  alt="Kevlin & Company Legacy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-6 md:-left-12 bg-white/90 dark:bg-card/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12)] max-w-[260px] transform hover:-translate-y-2 transition-transform duration-500">
                <p className="font-heading text-5xl font-bold text-primary-500 mb-1">15<span className="text-3xl">+</span></p>
                <p className="text-xs font-bold uppercase tracking-widest text-foreground-950">Years of Excellence</p>
                <div className="w-8 h-0.5 bg-accent-500 my-4" />
                <p className="text-xs text-foreground-500 font-light leading-relaxed">
                  Setting the gold standard for luxury real estate in East Africa.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 md:py-32 bg-background-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              Our Principles
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
              What We <span className="italic text-primary-400 font-light">Stand For</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-white dark:bg-card rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/5 hover:border-primary-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group transform hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-background-50 dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-500 shrink-0">
                  <i className={`${value.icon} text-primary-500 text-2xl group-hover:text-white transition-colors duration-500`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-4">{value.title}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline with Fixed Connective Line (Mobile & Desktop) */}
      <section className="py-24 md:py-32 bg-white dark:bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              Our Journey
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
              Milestones of <span className="italic text-primary-400 font-light">Success</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            
            {/* Desktop Connective Line */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-primary-100 dark:bg-white/5 -translate-x-1/2 z-0 rounded-full" />
            {/* Mobile Connective Line (Left aligned) */}
            <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-1 bg-primary-100 dark:bg-white/5 -translate-x-1/2 z-0 rounded-full" />

            <div className="space-y-12 md:space-y-20">
              {timelineItems.map((item, index) => (
                <div key={item.year} className={`relative flex flex-col md:flex-row items-center justify-between pl-10 md:pl-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-[calc(50%-3rem)] relative group z-20">
                    <div className="bg-background-50 dark:bg-card rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                      <span className="absolute -bottom-8 -right-4 text-[8rem] font-heading font-black text-black/[0.03] dark:text-white/[0.02] pointer-events-none select-none z-0 group-hover:scale-110 group-hover:text-primary-500/[0.05] transition-all duration-700">
                        {item.year}
                      </span>

                      <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 bg-white dark:bg-background-50 text-primary-600 border border-black/5 dark:border-white/5 shadow-sm text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                          {item.year}
                        </span>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-3">{item.title}</h3>
                        <p className="text-sm md:text-base text-foreground-500 leading-relaxed font-light">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center Node (Mobile & Desktop) */}
                  <div className="absolute left-[15px] md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-white dark:bg-background-50 rounded-full z-10 shadow-sm border border-background-100">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary-500 shadow-[0_0_0_4px_rgba(var(--primary-500),0.15)]" />
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This - Deep Dark Mode Section */}
      <section className="py-24 md:py-32 bg-foreground-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-400 font-bold mb-4 block">
                Our Motivation
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                The Vision <span className="italic font-light text-primary-400">Behind Kevlin</span>
              </h2>
              
              <div className="relative">
                <i className="ri-double-quotes-l absolute -top-6 -left-6 text-6xl text-white/5" />
                <p className="text-white/80 leading-relaxed text-lg md:text-xl font-light italic mb-8 relative z-10">
                  "For many Kenyans, buying a home is the most significant investment of their lives. Yet, for years, the market was plagued by a lack of transparency and inconsistent standards, making what should be a milestone moment a source of immense stress."
                </p>
              </div>

              <p className="text-white/60 leading-relaxed font-light mb-10 text-sm md:text-base">
                We established Kevlin & Company to transform this experience. By combining deep local expertise with a commitment to integrity, we ensure that every family and investor we serve can navigate the property market with absolute confidence. Our team works tirelessly to demystify real estate, offering honest valuations, clear communication, and unwavering support at every step.
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                  <span className="text-white font-heading font-bold text-xl">PN</span>
                </div>
                <div>
                  <p className="text-white font-bold tracking-wide">Kevlin Mwangi</p>
                  <p className="text-primary-400 text-xs font-bold uppercase tracking-widest mt-1">Founder & Managing Director</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[3/4] md:aspect-square rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                {/* AI Generated image specifically requesting a Black African businessman */}
                <img
                  src="https://cdn.guardian.ng/wp-content/uploads/2015/04/1727877696131.jpg"
                  alt="Kevlin & Company Founder - Peter Njoroge"
                  className="w-full h-full object-cover grayscale-[20%] contrast-125 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* The Experts / Team */}
      <section className="py-24 md:py-32 bg-white dark:bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 md:mb-24">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              The Experts
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6">
              Meet Our <span className="italic text-primary-400 font-light">Team</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mx-auto" />
            <p className="text-foreground-500 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
              Passionate professionals dedicated to making your property dreams a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-background-50 dark:bg-card rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-background-100 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 text-center bg-white dark:bg-card relative z-10 -mt-6 rounded-t-[2.5rem]">
                  <h3 className="font-heading text-xl font-bold text-foreground-950">{member.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-primary-500 font-bold mt-2">{member.role}</p>
                  <p className="text-sm text-foreground-500 mt-4 leading-relaxed font-light line-clamp-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 md:py-32 bg-background-50/50 border-t border-black/5 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              Inquiries
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground-950 mb-6">
              Frequently Asked <span className="italic text-primary-400 font-light">Questions</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-card rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                >
                  <span className="font-bold text-foreground-950 pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === index ? 'bg-primary-500 text-white' : 'bg-background-50 dark:bg-white/5 text-foreground-500'}`}>
                    <i className={`${openFaq === index ? 'ri-subtract-line' : 'ri-add-line'} text-lg`} />
                  </div>
                </button>
                <div className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-foreground-500 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
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
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-white/70 mb-10 text-base md:text-lg font-light leading-relaxed">
                Let our experienced team help you navigate the Kenyan real estate market. Whether you are buying, selling, or investing, we are here to guide you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/properties"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                >
                  <i className="ri-building-4-line text-lg" />
                  View Portfolio
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 text-white border border-white/20 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/20 transition-all hover:-translate-y-1"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}