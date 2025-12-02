export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
  brand: string;
  count?: string;
  subcategories?: string[];
}

export const categoriesData: Record<string, Category> = {
  'seating-and-benches': {
    id: 'seating-and-benches',
    name: 'Seating and Benches',
    description: 'Premium seating, tables, and modular solutions designed to transform any outdoor space',
    image: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/4.jpg',
    href: '/premium-category/seating-and-benches',
    brand: 'outopia',
    count: '40+ Products',
    subcategories: [
      'Park Benches',
      'Garden Seating',
      'Modular Seating Systems',
      'Picnic Tables',
      'Outdoor Chairs'
    ]
  },
  'outdoor-elements': {
    id: 'outdoor-elements',
    name: 'Outdoor Elements',
    description: 'Contemporary outdoor fixtures including planters, dustbins, bollards, and decorative elements',
    image: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/40s-infra/1.jpeg',
    href: '/premium-category/outdoor-elements',
    brand: 'outopia',
    count: '35+ Products',
    subcategories: [
      'Planters',
      'Dustbins',
      'Cycle Racks',
      'Bollards',
      'Lamp Posts'
    ]
  },
  'shades': {
    id: 'shades',
    name: 'Shades',
    description: 'Innovative shade solutions including pergolas, gazebos, and canopy structures for outdoor comfort',
    image: '/images/UPDATE-1.jpg.jpeg',
    href: '/premium-category/shades',
    brand: 'outopia',
    count: '25+ Products',
    subcategories: [
      'Pergolas',
      'Gazebos',
      'Canopy Structures',
      'Shade Sails',
      'Umbrella Systems'
    ]
  },
  'play-equipment': {
    id: 'play-equipment',
    name: 'Play Equipment',
    description: 'Safe, engaging play structures designed to inspire imagination and active play',
    image: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/2.jpg',
    href: '/premium-category/play-equipment',
    brand: 'infrascapes',
    count: '50+ Products',
    subcategories: [
      'Multi-Play Systems',
      'Swings & Slides',
      'Climbing Structures',
      'Spring Riders & Seesaws',
      'Sand & Water Play'
    ]
  },
  'fitness-equipment': {
    id: 'fitness-equipment',
    name: 'Fitness Equipment',
    description: 'Professional-grade outdoor gym equipment for public spaces and community wellness',
    image: 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/5.jpg',
    href: '/premium-category/fitness-equipment',
    brand: 'infrascapes',
    count: '45+ Products',
    subcategories: [
      'Cardio Stations',
      'Strength Training',
      'Flexibility & Balance',
      'Multi-Station Units',
      'Calisthenics Equipment'
    ]
  },
  'water-park-equipment': {
    id: 'water-park-equipment',
    name: 'Water Park Equipment',
    description: 'Exciting aquatic play features and water attractions for unforgettable experiences',
    image: 'https://images.unsplash.com/photo-1472805911884-dc4c5797ee37?q=80&w=2070',
    href: '/premium-category/water-park-equipment',
    brand: 'infrascapes',
    count: '30+ Products',
    subcategories: [
      'Water Slides',
      'Splash Pads',
      'Water Features',
      'Interactive Play Systems',
      'Pool Accessories'
    ]
  }
};

export function getCategoriesByBrand(brandId: string): Category[] {
  return Object.values(categoriesData).filter(category => category.brand === brandId);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categoriesData[categoryId];
}

export const getAllCategories = (): Category[] => Object.values(categoriesData);