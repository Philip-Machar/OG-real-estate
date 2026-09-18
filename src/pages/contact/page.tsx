// File: src/pages/contact/page.tsx
import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { faqItems, offices } from '@/mocks/siteData';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check for bots
    const honeypot = formData.get('company_alt');
    if (honeypot && String(honeypot).trim() !== '') {
      setFormStatus('success');
      form.reset();
      return;
    }

    // Extract form values
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const inquiryType = formData.get('inquiry_type') as string;
    const message = formData.get('message') as string;

    // Structure the WhatsApp message using markdown
    const whatsappMessage = `*New Website Inquiry* 🏠\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Inquiry Type:* ${inquiryType}\n\n*Message:*\n${message}`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create the WhatsApp link (removing the + sign from the number for the API)
    const whatsappUrl = `https://wa.me/254794444591?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Show success state on the website
    setFormStatus('success');
    form.reset();
  };

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
              backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 backdrop-blur-md animate-fade-up">
            Concierge Desk
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-up-delayed max-w-4xl leading-[1.1]">
            Start Your <span className="italic text-primary-400 font-light">Journey</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed animate-fade-up-delayed-2">
            Whether you have questions about a bespoke property or require tailored investment advice, our elite advisory team is at your complete disposal.
          </p>
        </div>
      </section>

      {/* Floating Concierge Cards */}
      <section className="py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Call Us', value: '+254 794 444 591', sub: 'Mon-Fri from 8am to 6pm', icon: 'ri-phone-line', href: 'tel:702601384' },
              { label: 'Email Us', value: 'hello@Kevlinhomes.com', sub: 'We reply within 24 hours', icon: 'ri-mail-line', href: 'mailto:hello@Kevlinhomes.com' },
              { label: 'Visit Us', value: 'Riverside Drive', sub: 'Nairobi, Kenya', icon: 'ri-map-pin-line', href: '#' },
              { label: 'Business Hours', value: 'Mon - Fri: 8:30 AM - 4:30 PM', sub: 'Sat: 9:00 AM - 2:00 PM', icon: 'ri-time-line', href: '#' },
            ].map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex flex-col items-center text-center p-8 bg-white dark:bg-card rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-primary-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-full bg-background-50 dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors duration-500 shrink-0">
                  <i className={`${info.icon} text-primary-500 text-xl group-hover:text-white transition-colors duration-500`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground-950 mb-2">{info.label}</h3>
                <p className="text-sm font-medium text-foreground-700 tracking-wide">{info.value}</p>
                <p className="text-[11px] uppercase tracking-widest text-foreground-400 mt-2 font-bold">{info.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Map Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* The Form */}
            <div>
              <div className="bg-white dark:bg-card rounded-[2.5rem] p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
                  Direct Inquiry
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                  Send Us a <span className="italic text-primary-400 font-light">Message</span>
                </h2>
                <p className="text-sm text-foreground-500 mb-10 font-light leading-relaxed">
                  Fill out the form below to instantly send a structured message to our advisory team via WhatsApp.
                </p>

                {formStatus === 'success' ? (
                  <div className="text-center py-16 bg-background-50 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <i className="ri-whatsapp-line text-3xl" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground-950 mb-2">Redirecting to WhatsApp...</h3>
                    <p className="text-sm text-foreground-500 mb-8 max-w-xs mx-auto font-light leading-relaxed">
                      If the app didn't open automatically, please check your popup blocker settings.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-8 py-3.5 rounded-full bg-foreground-950 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors shadow-md"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          className="w-full px-5 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-background-50 dark:bg-white/5 text-foreground-950 placeholder:text-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="w-full px-5 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-background-50 dark:bg-white/5 text-foreground-950 placeholder:text-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000 000"
                          className="w-full px-5 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-background-50 dark:bg-white/5 text-foreground-950 placeholder:text-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Inquiry Type *</label>
                        <select
                          name="inquiry_type"
                          required
                          className="w-full px-5 py-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-background-50 dark:bg-white/5 text-foreground-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                        >
                          <option value="">Select an option</option>
                          <option value="Buying a Property">Buying a Property</option>
                          <option value="Selling a Property">Selling a Property</option>
                          <option value="Renting a Property">Renting a Property</option>
                          <option value="Investment Advisory">Investment Advisory</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-foreground-600 mb-2 pl-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        maxLength={500}
                        rows={5}
                        placeholder="How can we assist you?"
                        className="w-full px-5 py-4 rounded-2xl border border-black/10 dark:border-white/10 bg-background-50 dark:bg-white/5 text-foreground-950 placeholder:text-foreground-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all shadow-sm resize-none"
                      />
                    </div>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="company_alt"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      readOnly
                      className="hp-field"
                    />

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-foreground-950 text-white font-bold uppercase tracking-widest text-[11px] hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <i className="ri-loader-4-line animate-spin text-lg" />
                            Opening WhatsApp...
                          </>
                        ) : (
                          <>
                            <i className="ri-whatsapp-line text-lg" />
                            Send via WhatsApp
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Offices & Map */}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
                Headquarters
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-8">
                Our <span className="italic text-primary-400 font-light">Offices</span>
              </h2>

              <div className="space-y-6 mb-8">
                {offices.map((office) => (
                  <div key={office.city} className="bg-white dark:bg-card rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading text-2xl font-bold text-foreground-950">{office.city}</h3>
                      {office.isHQ && (
                        <span className="px-3 py-1.5 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Headquarters
                        </span>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 text-sm text-foreground-600 font-light">
                        <i className="ri-map-pin-line text-primary-500 text-lg shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <a href={`tel:${office.phone}`} className="flex items-center gap-4 text-sm text-foreground-600 hover:text-primary-600 transition-colors font-light">
                        <i className="ri-phone-line text-primary-500 text-lg shrink-0" />
                        <span>{office.phone}</span>
                      </a>
                      <a href={`mailto:${office.email}`} className="flex items-center gap-4 text-sm text-foreground-600 hover:text-primary-600 transition-colors font-light">
                        <i className="ri-mail-line text-primary-500 text-lg shrink-0" />
                        <span>{office.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-auto rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-card shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white h-[320px]">
                <iframe
                  title="Kevlin & Company Location"
                  src="https://maps.google.com/maps?q=Riverside%20Drive,%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[20%] contrast-125"
                />
              </div>
            </div>
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
                Prefer to Talk Directly?
              </h2>
              <p className="text-white/70 mb-10 text-base md:text-lg font-light leading-relaxed">
                Our elite advisory team is available Monday to Saturday. Call us now for immediate assistance with your real estate needs.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:702601384"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                >
                  <i className="ri-phone-line text-lg" />
                  +254 (757) 344 593
                </a>
                <a
                  href="mailto:hello@Kevlinhomes.com"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 text-white border border-white/20 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/20 transition-all hover:-translate-y-1"
                >
                  <i className="ri-mail-line text-lg" />
                  Email Us
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