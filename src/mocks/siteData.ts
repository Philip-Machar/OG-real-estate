// File: src/mocks/siteData.ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  author: string;
  authorAvatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  isHQ: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Kevlin Mwangi',
    role: 'Founder & CEO',
    image: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20African%20businessman%20in%20his%2040s%20wearing%20a%20navy%20blue%20suit%20with%20a%20subtle%20smile%2C%20clean%20neutral%20studio%20background%2C%20soft%20professional%20lighting%2C%20corporate%20headshot%20style%2C%20warm%20skin%20tones&width=400&height=400&seq=team-peter-01&orientation=squarish',
    bio: 'With over 15 years in Kenyan real estate, Kevlin founded Kevlin & Company with a vision to transform property transactions through transparency and client-first service.',
  },
  {
    id: 'tm2',
    name: 'Faith Wambui',
    role: 'Head of Sales',
    image: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20African%20businesswoman%20in%20her%2030s%20wearing%20an%20elegant%20emerald%20green%20blazer%20with%20a%20confident%20smile%2C%20clean%20neutral%20studio%20background%2C%20soft%20professional%20lighting%2C%20corporate%20headshot%20style%2C%20warm%20skin%20tones&width=400&height=400&seq=team-faith-01&orientation=squarish',
    bio: 'Faith leads our sales team with exceptional market knowledge and a proven track record of matching clients with their perfect properties across Nairobi and the coast.',
  },
  {
    id: 'tm3',
    name: 'Kevin Otieno',
    role: 'Property Valuation Expert',
    image: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20African%20man%20in%20his%20late%2030s%20wearing%20a%20charcoal%20gray%20suit%20and%20glasses%20with%20a%20friendly%20expression%2C%20clean%20neutral%20studio%20background%2C%20soft%20professional%20lighting%2C%20corporate%20headshot%20style%2C%20warm%20skin%20tones&width=400&height=400&seq=team-kevin-01&orientation=squarish',
    bio: 'A certified valuation expert, Kevin ensures every property is accurately priced using comprehensive market analysis and industry-leading valuation methodologies.',
  },
  {
    id: 'tm4',
    name: 'Jane Ndung\u2019u',
    role: 'Client Relations Manager',
    image: 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20an%20African%20woman%20in%20her%20early%2030s%20wearing%20a%20warm%20burgundy%20blouse%20with%20a%20welcoming%20smile%2C%20clean%20neutral%20studio%20background%2C%20soft%20professional%20lighting%2C%20corporate%20headshot%20style%2C%20warm%20skin%20tones&width=400&height=400&seq=team-jane-01&orientation=squarish',
    bio: 'Jane ensures every client receives personalized attention throughout their property journey, from initial inquiry to final handover.',
  },
];

export const services: Service[] = [
  {
    id: 's1',
    title: 'Property Sales',
    description: 'Expert assistance in buying or selling residential and commercial properties across Kenya. We handle everything from listing to closing.',
    icon: 'ri-home-5-line',
    features: [
      'Market Analysis',
      'Property Valuation',
      'Negotiation Support',
      'Legal Documentation',
    ],
  },
  {
    id: 's2',
    title: 'Property Rentals',
    description: 'Find your perfect rental property or let us manage your rental listings. We match tenants with landlords seamlessly.',
    icon: 'ri-key-2-line',
    features: [
      'Tenant Screening',
      'Lease Preparation',
      'Rent Collection',
      'Maintenance Coordination',
    ],
  },
  {
    id: 's3',
    title: 'Property Management',
    description: 'Comprehensive property management services to maximize your investment returns while minimizing your workload.',
    icon: 'ri-settings-3-line',
    features: [
      '24/7 Support',
      'Regular Inspections',
      'Financial Reporting',
      'Vendor Management',
    ],
  },
  {
    id: 's4',
    title: 'Investment Consulting',
    description: 'Strategic advice on real estate investments. We help you identify high-yield opportunities and build a profitable portfolio.',
    icon: 'ri-line-chart-line',
    features: [
      'Market Research',
      'ROI Analysis',
      'Portfolio Strategy',
      'Risk Assessment',
    ],
  },
  {
    id: 's5',
    title: 'Property Valuation',
    description: 'Accurate property valuations by certified professionals. Essential for sales, purchases, insurance, and legal purposes.',
    icon: 'ri-bar-chart-box-line',
    features: [
      'Certified Valuers',
      'Detailed Reports',
      'Market Comparisons',
      'Quick Turnaround',
    ],
  },
  {
    id: 's6',
    title: 'Legal Support',
    description: 'Navigate real estate legal requirements with confidence. We connect you with experienced property lawyers.',
    icon: 'ri-scales-3-line',
    features: [
      'Title Search',
      'Contract Review',
      'Transfer Process',
      'Dispute Resolution',
    ],
  },
];

export const aboutStats = [
  { value: '15+', label: 'Years Experience', icon: 'ri-calendar-check-line' },
  { value: '2,500+', label: 'Properties Sold', icon: 'ri-exchange-dollar-line' },
  { value: '50+', label: 'Expert Agents', icon: 'ri-team-line' },
  { value: '98%', label: 'Client Satisfaction', icon: 'ri-emotion-happy-line' },
];

export const timelineItems: TimelineItem[] = [
  {
    year: '2009',
    title: 'Founded in Nairobi',
    description: 'Kevlin & Company was established with a vision to transform the real estate experience in Kenya.',
  },
  {
    year: '2013',
    title: 'Expanded to Mombasa',
    description: 'Opened our coastal office to serve the growing demand for beachfront and vacation properties.',
  },
  {
    year: '2017',
    title: '1000th Property Sold',
    description: 'Celebrated a major milestone, proving our commitment to client satisfaction.',
  },
  {
    year: '2021',
    title: 'Digital Transformation',
    description: 'Launched our advanced online platform for seamless property browsing and transactions.',
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description: 'Awarded Best Real Estate Agency in East Africa for outstanding service and innovation.',
  },
];

export const coreValues = [
  {
    title: 'Trust & Integrity',
    description: 'We conduct business with the highest ethical standards, ensuring transparency in every transaction.',
    icon: 'ri-shield-check-line',
  },
  {
    title: 'Client-Centric',
    description: 'Your satisfaction is our priority. We listen, understand, and deliver beyond expectations.',
    icon: 'ri-heart-3-line',
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from property selection to after-sales support.',
    icon: 'ri-star-line',
  },
  {
    title: 'Innovation',
    description: 'Embracing modern technology and market trends to provide cutting-edge real estate solutions.',
    icon: 'ri-lightbulb-flash-line',
  },
];

export const contactInfo = [
  {
    label: 'Phone',
    value: '+254 794 444 591',
    href: 'tel:702601384',
    icon: 'ri-phone-line',
  },
  {
    label: 'Email',
    value: 'kenyaclassic@gmail.com',
    href: 'mailto:kenyaclassic@gmail.com',
    icon: 'ri-mail-line',
  },
  {
    label: 'Address',
    value: 'Riverside Drive, Nairobi, Kenya',
    href: '#',
    icon: 'ri-map-pin-line',
  },
  {
    label: 'Business Hours',
    value: 'Mon - Fri: 8:30 AM - 4:30 PM | Sat: 9:00 AM - 2:00 PM',
    href: '#',
    icon: 'ri-time-line',
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'How do I schedule a property viewing?',
    answer: 'You can schedule a property viewing by contacting us via phone, email, or through our contact form. Our team will arrange a convenient time and accompany you throughout the viewing process.',
  },
  {
    question: 'What documents do I need to buy a property?',
    answer: 'Essential documents include a valid ID or passport, KRA PIN certificate, proof of income, and sale agreement. Our legal team guides you through every document required for a smooth transaction.',
  },
  {
    question: 'Do you help with property financing?',
    answer: 'Yes, we work with leading banks and financial institutions in Kenya to help you secure mortgage financing. Our consultants can advise on the best financing options for your situation.',
  },
  {
    question: 'What are your service fees?',
    answer: 'Our service fees vary depending on the type of service. For property sales, we charge a standard commission. For rentals and management, fees are competitive and clearly outlined in our agreement.',
  },
  {
    question: 'Can I list my property with Kevlin & Company?',
    answer: 'Absolutely! We welcome property listings from owners across Kenya. Contact our team to discuss your property details, and we will handle marketing, viewings, and negotiations on your behalf.',
  },
];

export const offices: Office[] = [
  {
    city: 'Nairobi',
    address: 'Riverside Drive',
    phone: '+254 794 444 591',
    email: 'info@Kevlinhomes.com',
    isHQ: true,
  },
];