export interface Brand {
  id: string;
  name: string;
  logo: string;
  lightLogo?: string;
  tagline: string;
  subtitle: string;
  description: string;
  heroImage: string;
  gradient: string;
  accentColor: string;
  primaryButton: string;
  primaryButtonLink: string;
  secondaryButton: string;
  secondaryButtonLink: string;
  categories: string[];
}

export const brandsData: Record<string, Brand> = {
  outopia: {
    id: 'outopia',
    name: 'OUTOPIA',
    logo: '/images/logo/outopia-logo.png',
    lightLogo: '/images/logo/infrascapes-light.png',
    tagline: 'Premium Outdoor Living',
    subtitle: 'From elegant seating to exciting shades, we offer comprehensive solutions for every outdoor space',
    description: 'Transform spaces with elegant seating, innovative shades, and contemporary outdoor elements designed for modern lifestyles',
    heroImage: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/4.jpg',
    gradient: 'from-emerald-600 to-teal-700',
    accentColor: 'text-emerald-600',
    primaryButton: 'Explore Outopia Collection',
    primaryButtonLink: '#products',
    secondaryButton: 'Download Outopia Catalog',
    secondaryButtonLink: '/contact',
    categories: ['seating-and-benches', 'outdoor-elements', 'shades']
  },
  infrascapes: {
    id: 'infrascapes',
    name: 'INFRASCAPES',
    logo: '/images/logo/cropped-cropped-OFFICE-LOGO-01-300x54-1.png',
    lightLogo: '/images/logo/outopia-light.png',
    tagline: 'Active Living Solutions',
    subtitle: 'Apart from standard outdoor furniture, we specialize in custom products for waterfront parks, outdoor play areas and Fitness Equipment.',
    description: 'Creating extraordinary outdoor experiences with world-class play equipment, fitness installations, and aquatic adventures',
    heroImage: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/2.jpg',
    gradient: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-600',
    primaryButton: 'View Projects',
    primaryButtonLink: '/projects',
    secondaryButton: 'Get Quote',
    secondaryButtonLink: '/contact',
    categories: ['play-equipment', 'fitness-equipment', 'water-park-equipment']
  }
};

export function getBrandByCategory(categoryId: string): Brand | undefined {
  return Object.values(brandsData).find(brand => 
    brand.categories.includes(categoryId)
  );
}

export function getBrandById(brandId: string): Brand | undefined {
  return brandsData[brandId];
}