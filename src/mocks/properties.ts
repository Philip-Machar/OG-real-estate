export interface Property {
  id: string;
  title: string;
  price: string;
  currency: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
  imageCount: number;
  type: string;
  status?: 'sale' | 'rent';
  beds?: number;
  baths?: number;
  sqft?: string;
  yearBuilt?: number;
  amenities?: string[];
  badges?: string[];
  tags: string[];
  constructionProgress?: number;
  featured?: boolean;
  hotDeal?: boolean;
  fullyFurnished?: boolean;
  underConstruction?: boolean;
}

export const propertyCategories = [
  'All',
  'House',
  'Apartment',
  'Villa',
  'Townhouse',
  'Land',
  'Office',
  'Commercial Space',
  'Studio',
  'Other',
];

export const quickFilters = ['For Sale', 'For Rent', 'Apartments', 'Villas', 'Commercial'];

export const popularLocations = ['Westlands', 'Kilimani', 'Karen', 'Lavington', 'Muthaiga'];

export const primeLocations = [
  {
    name: 'Westlands',
    propertyCount: '320+',
    description: 'Premium business district with modern architecture',
    image: 'https://readdy.ai/api/search-image?query=Modern%20Nairobi%20Westlands%20cityscape%20with%20tall%20glass%20office%20buildings%20and%20residential%20towers%20at%20golden%20hour%2C%20urban%20skyline%20with%20warm%20lighting%2C%20clean%20professional%20real%20estate%20photography%2C%20warm%20neutral%20tones&width=800&height=600&seq=westlands-loc&orientation=landscape',
  },
  {
    name: 'Kileleshwa',
    propertyCount: '215+',
    description: 'Upscale residential area with green spaces',
    image: 'https://readdy.ai/api/search-image?query=Upscale%20Nairobi%20residential%20neighborhood%20with%20mature%20trees%20and%20greenery%2C%20elegant%20apartment%20buildings%20and%20townhouses%2C%20quiet%20suburban%20street%20with%20well-maintained%20gardens%2C%20warm%20natural%20lighting%2C%20professional%20real%20estate%20photography&width=800&height=600&seq=kileleshwa-loc&orientation=landscape',
  },
  {
    name: 'Kilimani',
    propertyCount: '180+',
    description: 'Coastal paradise with beachfront luxury',
    image: 'https://readdy.ai/api/search-image?query=Luxury%20Nairobi%20Kilimani%20neighborhood%20aerial%20view%20showing%20modern%20apartments%20and%20palm%20trees%2C%20upscale%20urban%20residential%20area%2C%20warm%20golden%20sunlight%2C%20clean%20professional%20real%20estate%20photography%2C%20tropical%20greenery&width=800&height=600&seq=kilimani-loc&orientation=landscape',
  },
  {
    name: 'Lavington',
    propertyCount: '290+',
    description: 'Exclusive residential community near conservation area',
    image: 'https://readdy.ai/api/search-image?query=Exclusive%20Nairobi%20Lavington%20gated%20community%20with%20luxury%20homes%20and%20manicured%20lawns%2C%20tree-lined%20streets%20with%20elegant%20residential%20properties%2C%20warm%20afternoon%20lighting%2C%20professional%20real%20estate%20photography%2C%20serene%20suburban%20atmosphere&width=800&height=600&seq=lavington-loc&orientation=landscape',
  },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Esther Chebet',
    role: 'Property Investor',
    image: 'https://picsum.photos/60/60?random=30',
    text: 'Kevlin & Company found me the perfect investment property. Their team was professional, transparent, and efficient throughout the entire process.',
  },
  {
    id: 't2',
    name: 'James Kipchoge',
    role: 'Business Owner',
    image: 'https://picsum.photos/60/60?random=31',
    text: 'Outstanding service from start to finish. They understand the market and provided valuable insights that helped me make the right decision.',
  },
  {
    id: 't3',
    name: 'Amelia Kariuki',
    role: 'First-time Buyer',
    image: 'https://picsum.photos/60/60?random=32',
    text: 'As a first-time buyer, I felt overwhelmed. The team at Kevlin & Company guided me patiently and made the process smooth and enjoyable.',
  },
];

export const stats = [
  { value: '500+', label: 'Properties Listed', icon: 'ri-building-line' },
  { value: '1,500+', label: 'Happy Clients', icon: 'ri-user-smile-line' },
  { value: '9.5%', label: 'Avg. ROI', icon: 'ri-line-chart-line' },
  { value: '4+', label: 'Industry Awards', icon: 'ri-award-line' },
];

export const whyChooseFeatures = [
  {
    title: 'Verified Properties',
    description: 'Every property undergoes rigorous verification and quality checks before listing',
    icon: 'ri-shield-check-line',
  },
  {
    title: 'Lightning Fast Process',
    description: 'Complete transactions in weeks, not months with our streamlined process',
    icon: 'ri-flashlight-line',
  },
  {
    title: 'Legal Protection',
    description: 'Full legal compliance and comprehensive documentation for peace of mind',
    icon: 'ri-file-shield-line',
  },
  {
    title: 'Expert Guidance',
    description: 'Dedicated property consultants to guide you through every step',
    icon: 'ri-customer-service-2-line',
  },
];