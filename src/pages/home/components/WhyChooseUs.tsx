import { whyChooseFeatures } from '@/mocks/properties';

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 px-4 overflow-hidden bg-background-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 mb-6 leading-tight">
              The Kevlin <span className="italic text-primary-400 font-light">Advantage</span>
            </h2>
            <div className="w-12 h-1 bg-accent-500 mb-8 rounded-full" />
            <p className="text-foreground-500 text-lg mb-12 font-light leading-relaxed">
              We combine deep market expertise, transparent practices, and bespoke client-centric solutions to deliver an elite real estate experience in Kenya.
            </p>
            
            <div className="space-y-8">
              {whyChooseFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-[1.25rem] bg-white dark:bg-black/20 border border-black/5 dark:border-white/10 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                    <i className={`${feature.icon} text-primary-500 text-2xl`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground-950 mb-2 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-foreground-500 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <div className="relative aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://img.magnific.com/premium-photo/group-three-black-men-stylish-suits-meeting-summer-park-african-americans-friends-hispanic-businessman-greeting-pose-teamwork-outdoors_175356-895.jpg"
                alt="Kevlin & Company Excellence"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Elegant Floating Glass Card */}
            <div className="absolute -bottom-10 -left-6 md:-left-12 bg-white/70 dark:bg-black/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white">
                  <i className="ri-award-fill text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground-950 font-heading">15+ Years</p>
                  <p className="text-xs uppercase tracking-widest text-primary-600 font-bold">Of Excellence</p>
                </div>
              </div>
              <p className="text-sm text-foreground-600 leading-relaxed font-light">
                Trusted by high-net-worth individuals and corporate clients for reliable, transparent, and discreet real estate solutions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}