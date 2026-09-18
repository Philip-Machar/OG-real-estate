// File: src/utils/seedDatabase.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const placeholderImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop";

export const propertiesToSeed = [
  // --- MINOR CATEGORIES (Oldest timestamps, appear at bottom) ---
  {
    title: "10,000 Sqft Industrial Warehouse",
    price: "350,000", currency: "KES", location: "Industrial Area, Nairobi", mapLocation: "Enterprise Road, Industrial Area, Nairobi",
    description: "A heavy-duty, highly secure warehouse located just off Enterprise road. Features a 12-meter high roof clearance with insulated roofing to regulate temperature, heavy-duty industrial flooring, and a 1,000 sqft mezzanine office block overlooking the warehouse floor. Wide gates allow for easy articulation of 40-foot trailers.",
    type: "other", status: "rent", visibilityStatus: "published",
    beds: 0, baths: 0, sqft: "10,000", yearBuilt: 2012,
    amenities: ["High Roof Clearance", "3-Phase Power", "Trailer Access", "Mezzanine Office", "Insulated Roof"],
    tags: ["High Roof", "3-Phase Power", "Trailer Access"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Premium Restaurant Space in Riverside",
    price: "350,000", currency: "KES", location: "Riverside, Nairobi", mapLocation: "Riverside Drive, Nairobi",
    description: "An exceptional opportunity to establish a fine-dining restaurant or high-end cafe in Riverside. The space includes a 2,000 sqft indoor dining area and a beautiful 1,500 sqft outdoor covered terrace. The back-of-house is pre-fitted with commercial kitchen extraction hoods and grease traps. Surrounded by high-net-worth residential and corporate buildings.",
    type: "commercial space", status: "rent", visibilityStatus: "published",
    beds: 0, baths: 0, sqft: "3,500", yearBuilt: 2018,
    amenities: ["Outdoor Terrace", "Kitchen Extraction Setup", "Ample Parking", "Generator", "Security"],
    tags: ["Outdoor Terrace", "Ample Parking", "Generator"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Grade A Office Space in Westlands",
    price: "150", currency: "KES", location: "Westlands, Nairobi", mapLocation: "Waiyaki Way, Westlands, Nairobi",
    description: "Premium 3,500 sqft office space located in a highly sought-after Grade A commercial tower along Waiyaki Way. The space features large glass facades allowing excellent natural light, raised floors for easy cabling, and central air conditioning. Price is KES 150 per sqft per month. Includes an allocation of 4 basement parking bays.",
    type: "office", status: "rent", visibilityStatus: "published",
    beds: 0, baths: 0, sqft: "3,500", yearBuilt: 2022,
    amenities: ["Grade A Building", "High-Speed Lifts", "Basement Parking", "Backup Generator", "24/7 Security", "Fibre Optic"],
    tags: ["Grade A", "Basement Parking", "Fibre Optic"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Chic Modern Studio Apartment in Westlands",
    price: "65,000", currency: "KES", location: "Westlands, Nairobi", mapLocation: "Rhapta Road, Westlands, Nairobi",
    description: "A stylish, fully furnished studio apartment located along Rhapta Road. Designed for expatriates or traveling professionals, it features a comfortable queen-sized bed, a well-equipped modern kitchenette, and a dedicated workspace. The building offers a rooftop gym, a coffee shop on the ground floor, and excellent security.",
    type: "studio", status: "rent", visibilityStatus: "published",
    beds: 1, baths: 1, sqft: "450", yearBuilt: 2023,
    amenities: ["Fully Furnished", "Fast Wi-Fi", "Rooftop Gym", "Backup Generator", "Smart TV", "Balcony"],
    tags: ["Fully Furnished", "Rooftop Gym", "Balcony"],
    hotDeal: false, fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Prime 1-Acre Residential Plot in Karen",
    price: "65,000,000", currency: "KES", location: "Karen, Nairobi", mapLocation: "Mukoma Road, Karen, Nairobi",
    description: "A magnificent 1-acre parcel of land located along the prestigious Mukoma Road in Karen. Featuring rich red soil, perfectly flat terrain, and scattered mature indigenous trees. Water and electricity are already connected to the site. Perfect for building a luxury family estate. Clean title deed ready for transfer.",
    type: "land", status: "sale", visibilityStatus: "published",
    beds: 0, baths: 0, sqft: "43,560", yearBuilt: 0,
    amenities: ["Red Soil", "Flat Terrain", "Mature Trees", "Water Connected", "Electricity Connected", "Ready Title"],
    tags: ["Red Soil", "Ready Title", "Water Connected"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },

  // --- MAJOR CATEGORIES (Newer timestamps, appear at top) ---
  {
    title: "Elegant 6-Bedroom Mansion in Muthaiga",
    price: "2,500,000", currency: "USD", location: "Muthaiga, Nairobi", mapLocation: "Muthaiga Road, Muthaiga, Nairobi",
    description: "A rare masterpiece in Nairobi's most exclusive neighborhood. This palatial 6-bedroom mansion features classic colonial architecture blended with modern amenities. Highlights include a subterranean wine cellar, a state-of-the-art home theater, and expansive entertainment terraces. The security is UN-approved, making it ideal for expatriates or diplomats.",
    type: "house", status: "sale", visibilityStatus: "published",
    beds: 6, baths: 7, sqft: "10,500", yearBuilt: 2018,
    amenities: ["Wine Cellar", "Home Theater", "Swimming Pool", "High Perimeter Wall", "3-Car Garage", "Guard House"],
    tags: ["Swimming Pool", "Home Theater", "Wine Cellar"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Spacious 4-Bedroom Duplex in Kilimani",
    price: "28,500,000", currency: "KES", location: "Kilimani, Nairobi", mapLocation: "Argwings Kodhek Road, Kilimani, Nairobi",
    description: "This expansive 4-bedroom duplex apartment feels like a townhouse in the sky. Located in a serene pocket of Kilimani, the lower level features a massive living room, dining area, and guest suite, while the upper level hosts a family room and three en-suite bedrooms. Includes a separate domestic staff quarter and two dedicated basement parking spots.",
    type: "apartment", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 5, sqft: "2,900", yearBuilt: 2020,
    amenities: ["Duplex Layout", "DSQ", "Children's Play Area", "2 Parking Spots", "Borehole", "Electric Fence"],
    tags: ["DSQ", "Borehole", "Electric Fence"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Modern 4-Bedroom Townhouse in Spring Valley",
    price: "2,200", currency: "USD", location: "Spring Valley, Nairobi", mapLocation: "Shanzu Road, Spring Valley, Nairobi",
    description: "Located in the serene and highly sought-after Spring Valley neighborhood. This cozy 4-bedroom townhouse features warm wooden floors, a lovely sunken lounge, and a modern kitchen. The compound is beautifully maintained and offers residents a shared swimming pool, a fully equipped gym, and excellent security.",
    type: "townhouse", status: "rent", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "3,100", yearBuilt: 2018,
    amenities: ["Shared Pool", "Gym", "Secure Compound", "Wooden Floors", "DSQ", "Borehole"],
    tags: ["Shared Pool", "Gym", "Secure Compound"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Tropical 3-Bedroom Villa in Watamu",
    price: "42,000,000", currency: "KES", location: "Watamu, Kenya", mapLocation: "Turtle Bay Road, Watamu, Kenya",
    description: "A beautiful, modern 3-bedroom villa situated in a secure coastal estate just 5 minutes from Watamu Marine Park. Featuring clean, white-washed architecture, a private swimming pool, and an outdoor BBQ dining area. The villa is sold fully furnished with bespoke coastal decor, making it an ideal holiday home or Airbnb investment.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 3, baths: 3, sqft: "3,100", yearBuilt: 2020,
    amenities: ["Swimming Pool", "Tropical Garden", "Furnished", "Gated Estate", "Air Conditioning", "Borehole"],
    tags: ["Swimming Pool", "Gated Estate", "Borehole"],
    hotDeal: false, fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Modern 5-Bedroom House in Nyari Estate",
    price: "400,000", currency: "KES", location: "Nyari, Nairobi", mapLocation: "Redhill Road, Nyari Estate, Nairobi",
    description: "A turnkey, fully furnished luxury home located in the secure Nyari Estate. This property offers a bright, open-plan living and dining area with high-end modern furniture. The kitchen is fully fitted with Bosch appliances. Enjoy unparalleled peace of mind with 24/7 estate security and a beautifully landscaped private garden.",
    type: "house", status: "rent", visibilityStatus: "published",
    beds: 5, baths: 6, sqft: "5,100", yearBuilt: 2021,
    amenities: ["Fully Furnished", "Gated Community", "CCTV", "Landscaped Garden", "Fitted Kitchen", "DSQ"],
    tags: ["Gated Community", "CCTV", "DSQ"],
    hotDeal: false, fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Premium 3-Bedroom Apartment in Kileleshwa",
    price: "125,000", currency: "KES", location: "Kileleshwa, Nairobi", mapLocation: "Mandera Road, Kileleshwa, Nairobi",
    description: "A brand new, highly sought-after 3-bedroom apartment in Kileleshwa, perfect for young families. The unit offers a spacious layout with excellent natural lighting, an open kitchen design, and large bedrooms with ample wardrobe space. The building features a rooftop terrace perfect for hosting guests and a fully equipped residents' gym.",
    type: "apartment", status: "rent", visibilityStatus: "published",
    beds: 3, baths: 3, sqft: "1,950", yearBuilt: 2023,
    amenities: ["Gym", "Rooftop Terrace", "Backup Power", "Borehole", "High-Speed Lifts", "Intercom"],
    tags: ["Gym", "Rooftop Terrace", "Backup Power"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Secure 4-Bedroom Townhouse in Lavington",
    price: "250,000", currency: "KES", location: "Lavington, Nairobi", mapLocation: "Convent Drive, Lavington, Nairobi",
    description: "Located in a quiet, family-friendly compound of just 8 units on Convent Drive. This 4-bedroom all en-suite townhouse offers a spacious living room, a closed-plan kitchen with a pantry, and a private backyard garden. The compound is highly secure with 24-hour manned gates, making it a favorite among expatriate families.",
    type: "townhouse", status: "rent", visibilityStatus: "published",
    beds: 4, baths: 5, sqft: "3,800", yearBuilt: 2016,
    amenities: ["Gated Community", "Private Garden", "DSQ", "Backup Inverter", "24/7 Guards", "Borehole"],
    tags: ["Gated Community", "Private Garden", "DSQ"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Beachfront 4-Bedroom Holiday Villa in Diani",
    price: "850,000", currency: "USD", location: "Diani Beach, Kenya", mapLocation: "Galu Beach Road, Diani, Kenya",
    description: "A stunning slice of paradise. This fully furnished 4-bedroom Swahili-style villa sits directly on the white sands of Galu Kinondo, Diani. It boasts magnificent Makuti-thatched roofs, an infinity pool overlooking the Indian Ocean, and expansive outdoor lounging areas. A proven high-yield vacation rental property, sold as a turnkey business or private getaway.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "4,500", yearBuilt: 2019,
    amenities: ["Ocean View", "Direct Beach Access", "Infinity Pool", "Thatched Roof", "Fully Furnished", "Staff Quarters"],
    tags: ["Ocean View", "Beach Access", "Infinity Pool"],
    hotDeal: true,
    fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Contemporary 5-Bedroom Family Home in Lavington",
    price: "85,000,000", currency: "KES", location: "Lavington, Nairobi", mapLocation: "James Gichuru Road, Lavington, Nairobi",
    description: "A beautifully appointed standalone family home sitting on half an acre in Lavington. It features expansive, well-lit living spaces, a chef's kitchen, and a magnificent outdoor patio facing a mature garden. The master bedroom boasts a walk-in closet and a jacuzzi. An ideal environment for luxurious family living.",
    type: "house", status: "sale", visibilityStatus: "published",
    beds: 5, baths: 5, sqft: "5,500", yearBuilt: 2015,
    amenities: ["Mature Garden", "Jacuzzi", "Chef's Kitchen", "Electric Fence", "DSQ", "Patio"],
    tags: ["Mature Garden", "Jacuzzi", "Chef's Kitchen"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Luxurious 2-Bedroom Executive Apartment in Upper Hill",
    price: "19,500,000", currency: "KES", location: "Upper Hill, Nairobi", mapLocation: "Hospital Road, Upper Hill, Nairobi",
    description: "Situated in Nairobi's financial hub, this premium 2-bedroom apartment offers unparalleled convenience and style. The unit features high-end European finishes, floor-to-ceiling windows, and access to a stunning rooftop infinity pool. Currently generating excellent rental returns from expatriates working in the nearby corporate towers.",
    type: "apartment", status: "sale", visibilityStatus: "published",
    beds: 2, baths: 2, sqft: "1,450", yearBuilt: 2022,
    amenities: ["Rooftop Pool", "Gym", "Concierge", "Backup Generator", "High-Speed Lifts", "CCTV"],
    tags: ["Rooftop Pool", "Gym", "Concierge"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Spacious 4-Bedroom Townhouse in Kilimani",
    price: "180,000", currency: "KES", location: "Kilimani, Nairobi", mapLocation: "Dennis Pritt Road, Kilimani, Nairobi",
    description: "An exceptionally spacious 4-bedroom townhouse in a gated compound along Dennis Pritt Road. This property offers a sunken lounge, a separate dining area, and a private rear garden. The master suite occupies the entire top floor, providing ultimate privacy. Ideal for families seeking space in the heart of Kilimani.",
    type: "townhouse", status: "rent", visibilityStatus: "published",
    beds: 4, baths: 5, sqft: "3,400", yearBuilt: 2017,
    amenities: ["Private Garden", "Gated Community", "DSQ", "Balcony", "24/7 Security", "Borehole"],
    tags: ["Private Garden", "DSQ", "Gated Community"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Exclusive 5-Bedroom Coastal Villa in Malindi",
    price: "65,000,000", currency: "KES", location: "Malindi, Kenya", mapLocation: "Casuarina Road, Malindi, Kenya",
    description: "A spectacular 5-bedroom coastal villa located in the prestigious Casuarina area of Malindi. The property is designed with open-air Swahili architecture, allowing the ocean breeze to flow through. Features a massive central swimming pool, lush tropical gardens, and an expansive rooftop terrace perfect for sunset viewing.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 5, baths: 5, sqft: "5,200", yearBuilt: 2018,
    amenities: ["Swimming Pool", "Rooftop Terrace", "Tropical Garden", "Air Conditioning", "Staff Quarters", "Walled Estate"],
    tags: ["Swimming Pool", "Rooftop Terrace", "Tropical Garden"],
    hotDeal: false, fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Stunning 5-Bedroom Mansion in Kitisuru",
    price: "145,000,000", currency: "KES", location: "Kitisuru, Nairobi", mapLocation: "Kitisuru Road, Nairobi",
    description: "An architectural triumph in the leafy suburbs of Kitisuru. This 5-bedroom mansion features double-volume living spaces, a gourmet kitchen, and a master suite with a private lounge. The property sits on a beautifully landscaped half-acre and includes a heated pool, an entertainment pavilion, and a 3-car garage.",
    type: "house", status: "sale", visibilityStatus: "published",
    beds: 5, baths: 6, sqft: "7,500", yearBuilt: 2023,
    amenities: ["Heated Pool", "Entertainment Pavilion", "Gourmet Kitchen", "3-Car Garage", "Smart Home", "DSQ"],
    tags: ["Heated Pool", "Smart Home", "Entertainment Pavilion"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Modern 3-Bedroom Apartment in Parklands",
    price: "110,000", currency: "KES", location: "Parklands, Nairobi", mapLocation: "3rd Parklands Avenue, Nairobi",
    description: "A bright and airy 3-bedroom apartment offering modern finishes and excellent proximity to major hospitals, schools, and shopping malls. Features include a spacious living room with a balcony, an open-plan kitchen, and a dedicated laundry area. The building provides excellent security, high-speed elevators, and backup power.",
    type: "apartment", status: "rent", visibilityStatus: "published",
    beds: 3, baths: 3, sqft: "2,100", yearBuilt: 2020,
    amenities: ["Balcony", "Open-Plan Kitchen", "Backup Generator", "High-Speed Lifts", "24/7 Security", "Borehole"],
    tags: ["Balcony", "Backup Generator", "Borehole"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Beautiful 4-Bedroom Townhouse in Loresho",
    price: "68,000,000", currency: "KES", location: "Loresho, Nairobi", mapLocation: "Loresho Ridge, Nairobi",
    description: "Set within a secure gated community on Loresho Ridge, this beautiful 4-bedroom townhouse offers serene, leafy surroundings. The property boasts a large private garden, a modern kitchen, and spacious bedrooms. The community is highly sought-after, offering residents a shared swimming pool and walking trails.",
    type: "townhouse", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "3,600", yearBuilt: 2019,
    amenities: ["Private Garden", "Shared Pool", "Walking Trails", "Gated Community", "DSQ", "Borehole"],
    tags: ["Private Garden", "Shared Pool", "Gated Community"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Exclusive 4-Bedroom Golf Villa in Vipingo",
    price: "55,000,000", currency: "KES", location: "Vipingo, Kilifi", mapLocation: "Vipingo Ridge, Kilifi, Kenya",
    description: "A spectacular 4-bedroom luxury villa located within the prestigious Vipingo Ridge Golf Estate. This home offers breathtaking views of the baobab course and the Indian Ocean in the distance. It features an open-plan living area, a private infinity pool, and rooftop lounging. An absolute dream for golf enthusiasts.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "4,000", yearBuilt: 2021,
    amenities: ["Golf Course Views", "Infinity Pool", "Rooftop Lounge", "Gated Estate", "Clubhouse Access", "Furnished"],
    tags: ["Golf Course Views", "Infinity Pool", "Gated Estate"],
    hotDeal: false, fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Classic 4-Bedroom Family House in Karen",
    price: "350,000", currency: "KES", location: "Karen, Nairobi", mapLocation: "Bogani Road, Karen, Nairobi",
    description: "Nestled in the quiet, leafy suburbs of Karen along Bogani Road, this classic 4-bedroom family home sits on one acre of mature, tree-lined gardens. The house features a sunken lounge with a traditional stone fireplace, a large covered veranda perfect for entertaining, and spacious en-suite bedrooms. Safe, serene, and minutes away from the Hub Karen.",
    type: "house", status: "rent", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "4,800", yearBuilt: 2015,
    amenities: ["Mature Garden", "Electric Fence", "Solar Water Heating", "Fireplace", "Guard House", "Ample Parking"],
    tags: ["Mature Garden", "Fireplace", "Ample Parking"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Ultra-Modern 3-Bedroom Penthouse in Riverside",
    price: "45,000,000", currency: "KES", location: "Riverside, Nairobi", mapLocation: "Riverside Drive, Nairobi",
    description: "Perched atop a premium new development on Riverside Drive, this 3-bedroom penthouse offers sweeping views of the Nairobi skyline. It features a massive wrap-around balcony, a European-style open kitchen with an island, and expansive en-suite bedrooms. Residents enjoy exclusive access to a rooftop infinity pool, a commercial-grade gym, and a residents' lounge.",
    type: "apartment", status: "sale", visibilityStatus: "published",
    beds: 3, baths: 4, sqft: "3,200", yearBuilt: 2024,
    amenities: ["Rooftop Infinity Pool", "Gym", "High-Speed Lifts", "Panoramic Balcony", "Biometric Access", "Borehole"],
    tags: ["Infinity Pool", "Gym", "Balcony"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Premium 4-Bedroom Townhouse in Runda",
    price: "65,000,000", currency: "KES", location: "Runda, Nairobi", mapLocation: "Mimosa Drive, Runda, Nairobi",
    description: "An exceptional deal in Runda. This 4-bedroom townhouse sits in an exclusive compound on Mimosa Drive. It features a modern, fully fitted German kitchen, a spacious upstairs family/TV room, and well-lit en-suite bedrooms. Priced below market value for a quick sale, it meets all UN security standards for diplomatic leasing.",
    type: "townhouse", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "4,200", yearBuilt: 2021,
    amenities: ["UN-Approved Security", "Fitted Kitchen", "Family Room", "Backup Generator", "Solar Water", "Garden"],
    tags: ["Fitted Kitchen", "Backup Generator", "Garden"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Boutique 5-Bedroom Villa in Karen",
    price: "75,000,000", currency: "KES", location: "Karen, Nairobi", mapLocation: "Windy Ridge, Karen, Nairobi",
    description: "A masterclass in modern architecture located on Windy Ridge, Karen. This 5-bedroom luxury villa is part of an elite, contemporary development. It features massive windowscapes, a stunning rooftop entertainment terrace, and top-tier finishes. Residents have access to a communal luxury swimming pool and a state-of-the-art clubhouse.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 5, baths: 5, sqft: "4,600", yearBuilt: 2023,
    amenities: ["Contemporary Design", "Rooftop Terrace", "Club House", "Shared Pool", "Smart Security", "DSQ"],
    tags: ["Rooftop Terrace", "Club House", "Shared Pool"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Contemporary 5-Bedroom Ambassadorial Home in Runda",
    price: "1,200,000", currency: "USD", location: "Runda, Nairobi", mapLocation: "Ruaka Road, Runda, Nairobi",
    description: "Set on a lush half-acre in the prestigious Runda estate, this newly built contemporary home offers ambassadorial-level security and luxury. The double-volume lounge features floor-to-ceiling windows overlooking a manicured garden and heated swimming pool. It boasts a custom Italian kitchen, a master wing with a walk-in mahogany closet, and a 2-room domestic staff quarter (DSQ).",
    type: "house", status: "sale", visibilityStatus: "published",
    beds: 5, baths: 6, sqft: "7,200", yearBuilt: 2023,
    amenities: ["Swimming Pool", "2-Room DSQ", "Borehole", "Backup Generator", "Smart Security System", "Half-Acre Garden"],
    tags: ["Swimming Pool", "Borehole", "Backup Generator"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Executive 2-Bedroom Apartment in Westlands",
    price: "180,000", currency: "KES", location: "Westlands, Nairobi", mapLocation: "General Mathenge Drive, Westlands, Nairobi",
    description: "A sophisticated, fully furnished 2-bedroom apartment located in the heart of Westlands along General Mathenge. Ideal for corporate expatriates, this unit boasts stylish modern decor, a fully equipped kitchen with integrated appliances, and a cozy balcony. The complex offers 5-star amenities including a heated pool, gym, and 24-hour concierge service.",
    type: "apartment", status: "rent", visibilityStatus: "published",
    beds: 2, baths: 2, sqft: "1,800", yearBuilt: 2022,
    amenities: ["Furnished", "Heated Pool", "Gym", "Backup Generator", "Fibre Internet", "Concierge Desk"],
    tags: ["Heated Pool", "Gym", "Concierge"],
    hotDeal: false, fullyFurnished: true, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Luxury 4-Bedroom Townhouse in Riverside",
    price: "58,000,000", currency: "KES", location: "Riverside, Nairobi", mapLocation: "Riverside Drive, Nairobi",
    description: "A spectacularly designed 4-bedroom townhouse situated in a highly secure, diplomatic enclave in Riverside. The property features a multi-level layout with a beautiful rooftop terrace, a modern open-plan kitchen, and premium hardwood floors. It offers a rare blend of suburban tranquility and city convenience.",
    type: "townhouse", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 5, sqft: "3,900", yearBuilt: 2021,
    amenities: ["Rooftop Terrace", "Hardwood Floors", "Open-Plan Kitchen", "Gated Compound", "DSQ", "Backup Power"],
    tags: ["Rooftop Terrace", "Gated Compound", "Backup Power"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Tuscan-Style 5-Bedroom Villa in Runda",
    price: "4,500", currency: "USD", location: "Runda, Nairobi", mapLocation: "Pan Africa Insurance Avenue, Runda",
    description: "An elegant, Tuscan-inspired 5-bedroom villa located in the heart of Runda. The property is built around a beautiful central courtyard that floods the home with natural light. It features rich mahogany hardwood floors, a spacious family kitchen, two fireplaces, and highly secure diplomatic-level perimeter walls.",
    type: "villa", status: "rent", visibilityStatus: "published",
    beds: 5, baths: 5, sqft: "5,500", yearBuilt: 2017,
    amenities: ["Fireplace", "Courtyard", "Security System", "DSQ for 2", "Backup Generator", "Hardwood Floors"],
    tags: ["Courtyard", "Backup Generator", "Security System"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Exclusive 5-Bedroom Estate House in Karen",
    price: "135,000,000", currency: "KES", location: "Karen, Nairobi", mapLocation: "Ndege Road, Karen, Nairobi",
    description: "Situated in an ultra-exclusive gated community of only 10 properties, this 5-bedroom masterpiece on Ndege Road redefines luxury. Built on a full acre, it features smart-home technology, double-height ceilings, a private plunge pool, and lush, manicured lawns. The community shares a private clubhouse, gym, and a forested jogging track.",
    type: "house", status: "sale", visibilityStatus: "published",
    beds: 5, baths: 5, sqft: "6,800", yearBuilt: 2022,
    amenities: ["Gated Community", "Club House", "Private Pool", "Smart Home", "1-Acre Plot", "Jogging Track"],
    tags: ["Private Pool", "Smart Home", "Gated Community"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Stunning 4-Bedroom Penthouse in Westlands",
    price: "55,000,000", currency: "KES", location: "Westlands, Nairobi", mapLocation: "Brookside Drive, Westlands, Nairobi",
    description: "An incredibly rare 4-bedroom duplex penthouse offering unmatched luxury on Brookside Drive. This unit boasts a massive double-volume living area, floor-to-ceiling glass offering 180-degree city views, a private jacuzzi on the balcony, and a state-of-the-art Italian kitchen. Includes 3 dedicated parking bays and elite 24/7 security.",
    type: "apartment", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 5, sqft: "4,500", yearBuilt: 2023,
    amenities: ["Duplex Penthouse", "Private Jacuzzi", "Panoramic Views", "Italian Kitchen", "Gym", "Swimming Pool"],
    tags: ["Penthouse", "Private Jacuzzi", "Panoramic Views"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Elegant 4-Bedroom Townhouse in Muthaiga",
    price: "85,000,000", currency: "KES", location: "Muthaiga, Nairobi", mapLocation: "Muthaiga Road, Nairobi",
    description: "Nestled in Nairobi's most prestigious zip code, this elegant 4-bedroom townhouse combines classic charm with modern convenience. Situated in a highly secure, UN-approved compound. It features a private lush garden, a chef's kitchen, spacious living areas, and a massive master suite with a walk-in closet.",
    type: "townhouse", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "4,000", yearBuilt: 2018,
    amenities: ["UN-Approved Security", "Private Garden", "Chef's Kitchen", "Walk-in Closet", "Backup Generator", "DSQ"],
    tags: ["UN-Approved", "Private Garden", "Chef's Kitchen"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Luxurious 4-Bedroom Villa in Riverside",
    price: "72,000,000", currency: "KES", location: "Riverside, Nairobi", mapLocation: "Riverside Drive, Nairobi",
    description: "An architecturally stunning 4-bedroom villa set in a lush, highly secure compound in Riverside. The property features soaring high ceilings, expansive glass windows, and a private plunge pool. The sleek, modern interiors are complemented by smart home integrations and premium European fittings.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 4, sqft: "4,800", yearBuilt: 2022,
    amenities: ["Private Plunge Pool", "Smart Home", "High Ceilings", "European Fittings", "Gated Compound", "Generator"],
    tags: ["Plunge Pool", "Smart Home", "High Ceilings"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Grand 6-Bedroom Estate Home in Runda",
    price: "165,000,000", currency: "KES", location: "Runda, Nairobi", mapLocation: "Ruaka Road, Runda, Nairobi",
    description: "A monumental 6-bedroom estate home sitting on a perfectly flat half-acre plot in the heart of Runda. This palatial home boasts a grand sweeping staircase, a dedicated home theater, a sprawling outdoor entertainment pavilion, and a magnificent swimming pool. Designed for ultimate luxury and high-profile entertaining.",
    type: "house", status: "sale", visibilityStatus: "published",
    beds: 6, baths: 7, sqft: "8,500", yearBuilt: 2021,
    amenities: ["Swimming Pool", "Home Theater", "Entertainment Pavilion", "Grand Staircase", "Half-Acre", "DSQ for 2"],
    tags: ["Swimming Pool", "Home Theater", "Entertainment Pavilion"],
    hotDeal: true,
    fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Modern 3-Bedroom Apartment in Lavington",
    price: "115,000", currency: "KES", location: "Lavington, Nairobi", mapLocation: "Gitanga Road, Lavington, Nairobi",
    description: "A spacious, naturally lit 3-bedroom apartment located along the prestigious Gitanga Road. The unit features a large balcony with unobstructed green views, an open-plan fitted kitchen, and en-suite bedrooms. The complex offers fantastic family amenities including a heated pool, a fully equipped gym, and a children's play area.",
    type: "apartment", status: "rent", visibilityStatus: "published",
    beds: 3, baths: 3, sqft: "2,200", yearBuilt: 2020,
    amenities: ["Heated Pool", "Gym", "Balcony", "Children's Play Area", "Fitted Kitchen", "Borehole"],
    tags: ["Heated Pool", "Gym", "Balcony"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  },
  {
    title: "Stunning 4-Bedroom Villa in Kilimani",
    price: "58,000,000", currency: "KES", location: "Kilimani, Nairobi", mapLocation: "Dennis Pritt Road, Kilimani, Nairobi",
    description: "A beautiful, contemporary 4-bedroom villa tucked away in a quiet, highly secure gated community in Kilimani. The property features spacious, sun-drenched rooms, a modern kitchen, and a private rear garden perfect for family barbecues. Outstanding location with immediate access to top schools and shopping malls.",
    type: "villa", status: "sale", visibilityStatus: "published",
    beds: 4, baths: 5, sqft: "3,500", yearBuilt: 2019,
    amenities: ["Private Garden", "Gated Community", "DSQ", "Modern Kitchen", "24/7 Security", "Borehole"],
    tags: ["Private Garden", "Gated Community", "DSQ"],
    hotDeal: false, fullyFurnished: false, image: placeholderImage, images: [placeholderImage], imageCount: 1
  }
];

export const seedDatabase = async () => {
  try {
    for (const property of propertiesToSeed) {
      await addDoc(collection(db, 'properties'), {
        ...property,
        createdAt: serverTimestamp(),
      });
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    alert("Success! All 36 properties have been injected into Firebase.");
  } catch (error) {
    console.error("Error seeding properties:", error);
    alert("Failed to seed properties. Check the console.");
  }
};