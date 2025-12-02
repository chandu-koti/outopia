export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: string;
  image: string;
  description?: string;
  specifications?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    color?: string;
    warranty?: string;
  };
  features?: string[];
  inStock?: boolean;
}

export const productsData: Record<string, Product> = {
  // Outopia - Seating and Benches
  'bench-01': {
    id: 'bench-01',
    name: 'Modular Park Bench',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹45,000',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop',
    description: 'Contemporary modular bench designed for comfort and durability in public spaces',
    specifications: {
      material: 'Powder-coated steel & treated wood',
      dimensions: '1800mm x 600mm x 850mm',
      weight: '65 kg',
      warranty: '5 years'
    },
    inStock: true
  },
  'table-01': {
    id: 'table-01',
    name: 'Picnic Table Set',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹65,000',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    description: 'Complete picnic table set with integrated seating for outdoor dining',
    specifications: {
      material: 'Marine-grade aluminum & HPL top',
      dimensions: '2000mm x 1500mm x 750mm',
      weight: '120 kg',
      warranty: '7 years'
    },
    inStock: true
  },
  'garden-chair-01': {
    id: 'garden-chair-01',
    name: 'Ergonomic Garden Chair',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹25,000',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    description: 'Comfortable outdoor chair with ergonomic design',
    specifications: {
      material: 'Weather-resistant polymer',
      dimensions: '600mm x 550mm x 900mm',
      weight: '15 kg',
      warranty: '3 years'
    },
    inStock: true
  },
  'bench-02': {
    id: 'bench-02',
    name: 'Classic Wooden Bench',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹38,000',
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=600&h=400&fit=crop',
    description: 'Traditional wooden bench with modern durability',
    specifications: {
      material: 'Treated hardwood',
      dimensions: '1500mm x 500mm x 800mm',
      weight: '55 kg',
      warranty: '5 years'
    },
    inStock: true
  },
  'bench-03': {
    id: 'bench-03',
    name: 'Contemporary Metal Bench',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹42,000',
    image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&h=400&fit=crop',
    description: 'Sleek metal bench for modern spaces',
    specifications: {
      material: 'Stainless steel',
      dimensions: '1600mm x 450mm x 750mm',
      weight: '48 kg',
      warranty: '8 years'
    },
    inStock: true
  },
  'table-02': {
    id: 'table-02',
    name: 'Round Dining Table',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹72,000',
    image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=600&h=400&fit=crop',
    description: 'Circular outdoor dining table for 6 people',
    specifications: {
      material: 'Aluminum & Glass top',
      dimensions: '1500mm diameter x 750mm height',
      weight: '95 kg',
      warranty: '6 years'
    },
    inStock: true
  },
  'chair-set-01': {
    id: 'chair-set-01',
    name: 'Stackable Chair Set (4)',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹48,000',
    image: 'https://images.unsplash.com/photo-1549637642-90187f64f420?w=600&h=400&fit=crop',
    description: 'Set of 4 stackable outdoor chairs',
    specifications: {
      material: 'Polypropylene',
      dimensions: '550mm x 500mm x 850mm each',
      weight: '6 kg per chair',
      warranty: '3 years'
    },
    inStock: true
  },
  'lounger-01': {
    id: 'lounger-01',
    name: 'Adjustable Sun Lounger',
    category: 'seating-and-benches',
    brand: 'outopia',
    price: '₹58,000',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
    description: 'Reclining sun lounger with multiple positions',
    specifications: {
      material: 'Aluminum frame & Textilene fabric',
      dimensions: '2000mm x 700mm x 300-900mm',
      weight: '22 kg',
      warranty: '4 years'
    },
    inStock: true
  },

  // Outopia - Outdoor Elements
  'planter-01': {
    id: 'planter-01',
    name: 'Integrated Planter',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹25,000',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    description: 'Modern planter with built-in irrigation system',
    specifications: {
      material: 'Corten steel',
      dimensions: '1000mm x 1000mm x 600mm',
      weight: '45 kg',
      warranty: '5 years'
    },
    inStock: true
  },
  'dustbin-01': {
    id: 'dustbin-01',
    name: 'Dual Compartment Dustbin',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹18,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'Segregated waste collection system for public spaces',
    specifications: {
      material: 'Stainless steel',
      dimensions: '450mm x 450mm x 900mm',
      weight: '25 kg',
      warranty: '5 years'
    },
    inStock: true
  },
  'cycle-rack-01': {
    id: 'cycle-rack-01',
    name: 'Wave Cycle Rack',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹35,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'Artistic cycle parking solution for 6 bicycles',
    specifications: {
      material: 'Galvanized steel',
      dimensions: '2000mm x 800mm x 850mm',
      weight: '50 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'planter-02': {
    id: 'planter-02',
    name: 'Large Square Planter',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹32,000',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
    description: 'Contemporary square planter for trees',
    specifications: {
      material: 'Fiberglass',
      dimensions: '1200mm x 1200mm x 800mm',
      weight: '38 kg',
      warranty: '6 years'
    },
    inStock: true
  },
  'bollard-01': {
    id: 'bollard-01',
    name: 'LED Illuminated Bollard',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹15,000',
    image: 'https://images.unsplash.com/photo-1565591452825-67d6c5df5d84?w=600&h=400&fit=crop',
    description: 'Solar-powered LED bollard for pathways',
    specifications: {
      material: 'Aluminum with LED',
      dimensions: '200mm diameter x 1000mm height',
      weight: '12 kg',
      warranty: '5 years'
    },
    inStock: true
  },
  'lamp-post-01': {
    id: 'lamp-post-01',
    name: 'Victorian Style Lamp Post',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹68,000',
    image: 'https://images.unsplash.com/photo-1565636192335-26040d7c2a36?w=600&h=400&fit=crop',
    description: 'Classic design lamp post with modern LED',
    specifications: {
      material: 'Cast iron with powder coating',
      dimensions: '500mm base x 3500mm height',
      weight: '125 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'dustbin-02': {
    id: 'dustbin-02',
    name: 'Triple Compartment Recycling Bin',
    category: 'outdoor-elements',
    brand: 'outopia',
    price: '₹28,000',
    image: 'https://images.unsplash.com/photo-1563725911583-7d108f720483?w=600&h=400&fit=crop',
    description: 'Three-section recycling station',
    specifications: {
      material: 'Powder-coated steel',
      dimensions: '1200mm x 400mm x 900mm',
      weight: '45 kg',
      warranty: '7 years'
    },
    inStock: true
  },

  // Outopia - Shades
  'pergola-01': {
    id: 'pergola-01',
    name: 'Modular Pergola',
    category: 'shades',
    brand: 'outopia',
    price: '₹1,25,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'Customizable pergola system with adjustable louvers',
    specifications: {
      material: 'Aluminum frame with fabric canopy',
      dimensions: '4000mm x 3000mm x 2500mm',
      weight: '250 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'gazebo-01': {
    id: 'gazebo-01',
    name: 'Hexagonal Gazebo',
    category: 'shades',
    brand: 'outopia',
    price: '₹2,50,000',
    image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=600&h=400&fit=crop',
    description: 'Elegant hexagonal gazebo for events and gatherings',
    specifications: {
      material: 'Steel structure with polycarbonate roof',
      dimensions: '5000mm diameter x 3000mm height',
      weight: '500 kg',
      warranty: '15 years'
    },
    inStock: true
  },

  // Infrascapes - Play Equipment
  'slide-01': {
    id: 'slide-01',
    name: 'Adventure Slide System',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹85,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'Multi-level slide system with safety features',
    specifications: {
      material: 'HDPE & galvanized steel',
      dimensions: '3000mm x 2000mm x 2500mm',
      weight: '180 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'swing-01': {
    id: 'swing-01',
    name: 'Modular Swing Set',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹55,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: '4-seat swing set with various seat options',
    specifications: {
      material: 'Powder-coated steel with rubber seats',
      dimensions: '4000mm x 2000mm x 2300mm',
      weight: '120 kg',
      warranty: '8 years'
    },
    inStock: true
  },
  'climbing-01': {
    id: 'climbing-01',
    name: 'Climbing Structure',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹95,000',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'Adventure climbing frame with multiple routes',
    specifications: {
      material: 'Robinia wood & stainless steel',
      dimensions: '3500mm x 3500mm x 2800mm',
      weight: '350 kg',
      warranty: '12 years'
    },
    inStock: true
  },
  'seesaw-01': {
    id: 'seesaw-01',
    name: 'Modern Seesaw',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹35,000',
    image: 'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=600&h=400&fit=crop',
    description: 'Safety-enhanced seesaw with shock absorbers',
    specifications: {
      material: 'Steel frame with HDPE seats',
      dimensions: '3000mm x 400mm x 800mm',
      weight: '60 kg',
      warranty: '7 years'
    },
    inStock: true
  },
  'slide-02': {
    id: 'slide-02',
    name: 'Double Wave Slide',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹92,000',
    image: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600&h=400&fit=crop',
    description: 'Dual-lane wave slide for exciting play',
    specifications: {
      material: 'HDPE with steel support',
      dimensions: '4000mm x 2500mm x 2800mm',
      weight: '220 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'swing-02': {
    id: 'swing-02',
    name: 'Inclusive Swing Set',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹68,000',
    image: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600&h=400&fit=crop',
    description: 'Wheelchair-accessible swing with standard seats',
    specifications: {
      material: 'Galvanized steel with special seats',
      dimensions: '5000mm x 3000mm x 2500mm',
      weight: '180 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'merry-go-01': {
    id: 'merry-go-01',
    name: 'Inclusive Merry-Go-Round',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹125,000',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
    description: 'Wheelchair-accessible carousel',
    specifications: {
      material: 'Steel platform with safety rails',
      dimensions: '3000mm diameter x 1000mm height',
      weight: '350 kg',
      warranty: '12 years'
    },
    inStock: true
  },
  'spring-rider-01': {
    id: 'spring-rider-01',
    name: 'Animal Spring Riders (Set of 4)',
    category: 'play-equipment',
    brand: 'infrascapes',
    price: '₹48,000',
    image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=600&h=400&fit=crop',
    description: 'Colorful animal-themed spring riders',
    specifications: {
      material: 'HDPE with spring steel',
      dimensions: '800mm x 300mm x 900mm each',
      weight: '25 kg each',
      warranty: '8 years'
    },
    inStock: true
  },

  // Infrascapes - Fitness Equipment
  'pull-up-01': {
    id: 'pull-up-01',
    name: 'Multi-Station Pull-up Bar',
    category: 'fitness-equipment',
    brand: 'infrascapes',
    price: '₹75,000',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop',
    description: 'Professional outdoor pull-up station for multiple users',
    specifications: {
      material: 'Galvanized steel',
      dimensions: '2500mm x 1500mm x 2400mm',
      weight: '150 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'elliptical-01': {
    id: 'elliptical-01',
    name: 'Outdoor Elliptical',
    category: 'fitness-equipment',
    brand: 'infrascapes',
    price: '₹1,25,000',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    description: 'Weather-resistant elliptical trainer for outdoor gyms',
    specifications: {
      material: 'Stainless steel with anti-slip platforms',
      dimensions: '1200mm x 600mm x 1600mm',
      weight: '85 kg',
      warranty: '8 years'
    },
    inStock: true
  },
  'leg-press-01': {
    id: 'leg-press-01',
    name: 'Hydraulic Leg Press',
    category: 'fitness-equipment',
    brand: 'infrascapes',
    price: '₹95,000',
    image: 'https://images.unsplash.com/photo-1540496905036-5937c10647cc?w=600&h=400&fit=crop',
    description: 'Hydraulic resistance leg press machine',
    specifications: {
      material: 'Heavy-duty steel construction',
      dimensions: '1800mm x 800mm x 1500mm',
      weight: '120 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'bike-01': {
    id: 'bike-01',
    name: 'Stationary Bike',
    category: 'fitness-equipment',
    brand: 'infrascapes',
    price: '₹85,000',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    description: 'Outdoor stationary bike with adjustable resistance',
    specifications: {
      material: 'Weatherproof steel & polymer',
      dimensions: '1100mm x 500mm x 1200mm',
      weight: '65 kg',
      warranty: '7 years'
    },
    inStock: true
  },
  'bench-press-01': {
    id: 'bench-press-01',
    name: 'Outdoor Bench Press',
    category: 'fitness-equipment',
    brand: 'infrascapes',
    price: '₹65,000',
    image: 'https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=600&h=400&fit=crop',
    description: 'Body-weight bench press station',
    specifications: {
      material: 'Galvanized steel',
      dimensions: '1600mm x 1200mm x 1100mm',
      weight: '90 kg',
      warranty: '10 years'
    },
    inStock: true
  },
  'abs-01': {
    id: 'abs-01',
    name: 'Ab Workout Station',
    category: 'fitness-equipment',
    brand: 'infrascapes',
    price: '₹55,000',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop',
    description: 'Multi-angle ab workout equipment',
    specifications: {
      material: 'Powder-coated steel',
      dimensions: '1400mm x 700mm x 1300mm',
      weight: '70 kg',
      warranty: '8 years'
    },
    inStock: true
  },

  // Infrascapes - Water Park Equipment
  'water-slide-01': {
    id: 'water-slide-01',
    name: 'Spiral Water Slide',
    category: 'water-park-equipment',
    brand: 'infrascapes',
    price: '₹8,50,000',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop',
    description: 'Thrilling spiral water slide for aquatic parks',
    specifications: {
      material: 'Fiberglass with gel coat finish',
      dimensions: '8000mm x 3000mm x 5000mm',
      weight: '1200 kg',
      warranty: '15 years'
    },
    inStock: true
  },
  'splash-pad-01': {
    id: 'splash-pad-01',
    name: 'Interactive Splash Pad',
    category: 'water-park-equipment',
    brand: 'infrascapes',
    price: '₹5,50,000',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop',
    description: 'Zero-depth water play area with interactive features',
    specifications: {
      material: 'Stainless steel & HDPE',
      dimensions: '10m x 10m area',
      weight: 'Varies',
      warranty: '10 years'
    },
    inStock: true
  },
  'water-bucket-01': {
    id: 'water-bucket-01',
    name: 'Tipping Water Bucket',
    category: 'water-park-equipment',
    brand: 'infrascapes',
    price: '₹3,25,000',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop',
    description: 'Giant tipping bucket for splash zones',
    specifications: {
      material: 'Fiberglass',
      dimensions: '2000mm x 2000mm x 3500mm',
      weight: '300 kg',
      warranty: '12 years'
    },
    inStock: true
  },
  'fountain-01': {
    id: 'fountain-01',
    name: 'Musical Fountain System',
    category: 'water-park-equipment',
    brand: 'infrascapes',
    price: '₹4,75,000',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop',
    description: 'Programmable musical fountain with LED lights',
    specifications: {
      material: 'Stainless steel jets & LED fixtures',
      dimensions: 'Customizable',
      weight: 'Varies',
      warranty: '10 years'
    },
    inStock: true
  },
  'wave-pool-01': {
    id: 'wave-pool-01',
    name: 'Wave Generation System',
    category: 'water-park-equipment',
    brand: 'infrascapes',
    price: '₹12,00,000',
    image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=600&h=400&fit=crop',
    description: 'Professional wave generation equipment for pools',
    specifications: {
      material: 'Industrial-grade pumps & controls',
      dimensions: 'Customizable to pool size',
      weight: 'Varies',
      warranty: '15 years'
    },
    inStock: true
  },
  'lazy-river-01': {
    id: 'lazy-river-01',
    name: 'Lazy River Equipment',
    category: 'water-park-equipment',
    brand: 'infrascapes',
    price: '₹15,00,000',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop',
    description: 'Complete lazy river propulsion system',
    specifications: {
      material: 'High-flow pumps & jet systems',
      dimensions: 'Customizable',
      weight: 'Varies',
      warranty: '15 years'
    },
    inStock: true
  }
};

export function getProductsByCategory(categoryId: string): Product[] {
  return Object.values(productsData).filter(product => product.category === categoryId);
}

export function getProductsByBrand(brandId: string): Product[] {
  return Object.values(productsData).filter(product => product.brand === brandId);
}

export function getProductById(productId: string): Product | undefined {
  return productsData[productId];
}

export const getAllProducts = (): Product[] => Object.values(productsData);