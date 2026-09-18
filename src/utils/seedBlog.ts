// File: src/utils/seedBlog.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const placeholderImage = "https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop";

export const articlesToSeed = [
  {
    title: "Nairobi's Luxury Real Estate Market Resilience in 2026",
    category: "Market Insights",
    excerpt: "Despite global economic shifts, Nairobi's high-end property sector continues to demonstrate remarkable resilience and growth.",
    content: "The luxury real estate market in Nairobi has proven to be an impenetrable fortress against global economic headwinds. As we move deeper into 2026, neighborhoods like Karen, Runda, and Muthaiga are seeing a steady appreciation in land values and an uptick in demand for bespoke, move-in-ready mansions.\n\nData indicates a 14% year-on-year growth in prime residential property inquiries, largely driven by diaspora remittances and multinational executives relocating to East Africa's commercial hub. The demand is shifting aggressively towards gated communities that offer self-sustaining ecosystems—complete with solar power, boreholes, and smart-home security integrations.\n\nFor sellers, this means that premium properties priced correctly are spending less time on the market. For buyers, the window to secure prime assets in legacy neighborhoods is narrowing as inventory remains tight.",
    author: "Peter Njoroge",
    readTime: "4 min read"
  },
  {
    title: "The Shift Towards Eco-Friendly Developments in East Africa",
    category: "Market Insights",
    excerpt: "Sustainability is no longer a buzzword; it is a primary deciding factor for modern property buyers in Kenya.",
    content: "Green building standards are rapidly reshaping the Nairobi skyline and its leafy suburbs. Developers are increasingly abandoning traditional, energy-heavy designs in favor of sustainable, eco-friendly architectures that promise lower running costs and a reduced carbon footprint.\n\nToday's discerning buyer is actively looking for EDGE-certified buildings, solar water heating, rainwater harvesting systems, and natural lighting optimization. Properties in Westlands and Riverside that incorporate vertical gardens and energy-efficient glass facades are commanding premium rental yields compared to their older counterparts.\n\nThis shift is not just environmental—it is strictly economic. Properties with sustainable features offer landlords up to 20% savings on utility maintenance, a saving that is driving immense investment into the green real estate sector.",
    author: "Faith Wambui",
    readTime: "3 min read"
  },
  {
    title: "A Step-by-Step Guide to Buying Off-Plan Properties in Kenya",
    category: "Guides",
    excerpt: "Navigate the lucrative but complex world of off-plan property investments with this comprehensive buyer's guide.",
    content: "Buying off-plan can be one of the most profitable ways to enter the real estate market, often allowing investors to secure properties at 20% to 30% below market value. However, the risks of delayed projects or sub-standard finishes require rigorous due diligence.\n\nThe first step is always developer verification. At Kevlin & Company, we strictly advise clients to review the developer's track record, previous completed projects, and financial backing. Never rely solely on 3D renders; visit their past developments to inspect the actual build quality and facility maintenance.\n\nSecondly, scrutinize the sale agreement with a qualified property lawyer. Ensure the contract includes clear clauses on completion dates, penalty fees for delays, and an escrow account arrangement for your deposits. Protect your investment by understanding exactly what happens if the developer fails to deliver.",
    author: "Jane Ndung’u",
    readTime: "6 min read"
  },
  {
    title: "Navigating Property Taxes and Stamp Duty in Kenya",
    category: "Guides",
    excerpt: "Understand the hidden costs of property acquisition to effectively budget for your next real estate transaction.",
    content: "One of the most common pitfalls for first-time buyers in Kenya is failing to account for the closing costs associated with property acquisition. The purchase price is just the beginning; legal fees and government taxes must be factored into your investment calculus from day one.\n\nStamp duty is the most significant additional cost. In urban areas like Nairobi and Mombasa, the government levies a 4% stamp duty on the property's valued price, while rural areas incur a 2% charge. It is vital to note that this percentage is calculated based on the government valuer's report, which may differ from the agreed sale price.\n\nAdditionally, buyers should budget between 1% to 2% for legal fees, plus valuation and registration fees. Engaging a reputable agency like Kevlin & Company ensures that all these costs are mapped out transparently before you sign any agreements.",
    author: "Kevin Otieno",
    readTime: "5 min read"
  },
  {
    title: "Why Satellite Towns Are the Next Goldmine for Investors",
    category: "Investment",
    excerpt: "Infrastructure developments are unlocking massive real estate potential in towns on the outskirts of Nairobi.",
    content: "As land prices in central Nairobi reach historic highs, smart money is aggressively moving towards the city's satellite towns. Areas such as Ruiru, Syokimau, and Ngong are experiencing unprecedented growth, transforming from quiet outskirts into bustling residential and commercial hubs.\n\nThe catalyst for this boom is infrastructure. The expansion of the Eastern Bypass, the Nairobi Expressway, and the upgraded commuter rail networks have drastically reduced commute times. A journey that previously took two hours now takes thirty minutes, making these towns highly attractive to young professionals and growing families.\n\nFor investors, the opportunity lies in buying multi-dwelling residential blocks or commercial plots in these areas. Rental yields are stabilizing at impressive rates, and capital appreciation is vastly outpacing traditional, mature neighborhoods.",
    author: "Peter Njoroge",
    readTime: "4 min read"
  },
  {
    title: "High-Yield Airbnb Neighborhoods: Kilimani vs. Westlands",
    category: "Investment",
    excerpt: "A comparative analysis of Nairobi's two most popular short-term rental markets to help you maximize your ROI.",
    content: "The short-term rental market in Nairobi is thriving, driven by business tourism, expatriates, and diaspora visitors. Kilimani and Westlands consistently rank as the top-performing neighborhoods for Airbnb investments, but they cater to slightly different demographics.\n\nWestlands is the undisputed commercial capital of the city. Apartments here attract corporate travelers and diplomats willing to pay a premium for luxury, proximity to UN offices, and vibrant nightlife. Studios and 1-bedroom units in Grade A buildings here offer the highest daily rates.\n\nKilimani, on the other hand, appeals to a broader base including families and long-stay leisure travelers. The area boasts excellent shopping malls, international schools, and a family-friendly vibe. While daily rates might be slightly lower than Westlands, occupancy rates in Kilimani are exceptionally consistent. Choosing between the two depends on your target market and initial capital outlay.",
    author: "Faith Wambui",
    readTime: "5 min read"
  },
  {
    title: "5 Crucial Red Flags to Watch Out for When Viewing a Property",
    category: "Tips",
    excerpt: "Don't let fresh paint blind you to structural issues. Here is what our expert agents look for during a property viewing.",
    content: "Viewing a property is an emotional experience, but it requires an analytical eye. A fresh coat of paint and staging furniture can easily mask underlying issues that will cost you millions in repairs down the line.\n\nFirst, always check for water damage and dampness. Look closely at the skirting boards, the ceilings in the bathrooms, and inside the under-sink cabinets. Musty smells or freshly painted patches in isolated areas are immediate red flags. Second, test the water pressure and inspect the electrical panels; poor infrastructure is expensive to overhaul.\n\nFinally, inspect the exterior drainage and the neighborhood during different times of the day. A beautiful house sitting in a flood-prone zone or next to a noisy, unzoned commercial plot will ruin your living experience. Always conduct viewings with a professional agent who knows how to spot these hidden defects.",
    author: "Jane Ndung’u",
    readTime: "4 min read"
  },
  {
    title: "How to Maximize the Resale Value of Your Nairobi Home",
    category: "Tips",
    excerpt: "Simple, high-impact upgrades that will drastically increase your property's market value before you list it for sale.",
    content: "If you are preparing to put your home on the market, strategic renovations can offer massive returns on investment. However, not all upgrades are created equal. The goal is to spend money only on areas that buyers value most.\n\nKitchens and bathrooms sell houses. You don't need a total teardown; refacing cabinets, upgrading to granite or quartz countertops, and installing modern, high-quality faucets can completely transform the space. In the bathrooms, replacing old grout, updating mirrors, and ensuring absolute cleanliness provides a premium feel.\n\nCurb appeal is equally critical. The first impression is formed within seconds of driving through the gate. Invest in professional landscaping, power-wash the driveway, and ensure the exterior paint is flawless. A well-maintained exterior communicates to buyers that the entire property has been treated with care.",
    author: "Kevin Otieno",
    readTime: "3 min read"
  },
  {
    title: "Government Announces New Infrastructure Projects Boosting Real Estate",
    category: "News",
    excerpt: "Major highway expansions and water projects are set to unlock new premium property zones across the country.",
    content: "The Ministry of Transport and Infrastructure has unveiled a new blueprint for road network expansions that is already sending ripples through the real estate sector. The upcoming dual-carriage upgrades connecting major satellite towns to the CBD are projected to cut transit times by half.\n\nFor real estate investors, this is the most reliable signal for capital appreciation. Historical data shows that land values along newly tarmacked corridors spike by up to 40% within the first two years of project completion. The newly announced water and sewerage reticulation projects in the greater Kiambu and Machakos counties will also allow developers to build higher-density luxury apartments in previously restricted zones.\n\nKevlin & Company is currently mapping out exclusive land parcels along these upcoming corridors, offering our clients first-mover advantages before market prices adjust to the new infrastructure.",
    author: "Peter Njoroge",
    readTime: "2 min read"
  },
  {
    title: "Kevlin & Company Awarded Premier Luxury Brokerage of the Year",
    category: "News",
    excerpt: "A milestone achievement celebrating our commitment to transparency, elite service, and industry innovation.",
    content: "We are incredibly proud to announce that Kevlin & Company has been officially recognized as the Premier Luxury Brokerage of the Year at the 2026 East Africa Real Estate Excellence Awards. This prestigious accolade is a testament to our unwavering dedication to our clients and our disruptive approach to property sales and management.\n\nThe award recognizes our innovative use of technology—including our proprietary AI-driven property matching systems and virtual tour capabilities—as well as our flawless track record in closing high-value transactions with absolute discretion and legal integrity.\n\nWe dedicate this award to our elite team of advisors, our legal partners, and most importantly, our clients who have trusted us with their most valuable assets. As we move forward, we remain committed to setting the gold standard for luxury real estate in Africa.",
    author: "Faith Wambui",
    readTime: "2 min read"
  }
];

export const seedBlogDatabase = async () => {
  try {
    for (const article of articlesToSeed) {
      const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const dateString = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      await addDoc(collection(db, 'blogPosts'), {
        ...article,
        slug,
        date: dateString,
        image: placeholderImage,
        status: 'published',
        views: Math.floor(Math.random() * 500) + 50,
        createdAt: serverTimestamp(),
        timestamp: Date.now(),
      });
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    alert("Success! All 10 articles have been injected into Firebase.");
  } catch (error) {
    console.error("Error seeding blogs:", error);
    alert("Failed to seed blogs. Check the console.");
  }
};