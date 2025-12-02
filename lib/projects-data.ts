export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  year: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  scope: string[];
  images: {
    main: string;
    gallery: string[];
  };
  testimonial?: {
    text: string;
    author: string;
    designation: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "botinical-garden",
    title: "Botanical Garden Public Park",
    client: "Municipal Corporation",
    location: "Hyderabad",
    category: "Public Parks",
    year: "2023",
    duration: "4 months",
    description: "Comprehensive outdoor fitness and recreational equipment installation for a major botanical garden renovation project.",
    challenge: "Creating modern recreational facilities while preserving the natural botanical environment and heritage trees.",
    solution: "We designed equipment with earth-tone colors and organic forms that blend seamlessly with the natural landscape, using eco-friendly materials and minimal ground disturbance installation methods.",
    scope: [
      "Nature-themed playground",
      "Outdoor fitness stations",
      "Interpretive signage",
      "Accessible pathways",
      "Rest area furniture"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/1.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/6.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/botinical-garden/7.jpg",
      ]
    }
  },
  {
    id: "eipl",
    title: "EIPL Square Commercial Complex",
    client: "EIPL Developers",
    location: "Bangalore",
    category: "Commercial Spaces",
    year: "2021",
    duration: "3 months",
    description: "Modern outdoor amenities for a premium commercial complex focusing on employee wellness and visitor experience.",
    challenge: "Designing versatile outdoor spaces that serve both corporate employees during work hours and public visitors during weekends.",
    solution: "We created flexible zones with modular equipment that can accommodate different user groups, including fitness areas, relaxation zones, and interactive installations.",
    scope: [
      "Corporate wellness equipment",
      "Outdoor seating solutions",
      "Interactive art installations",
      "Shade structures",
      "Landscaping elements"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/1.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/6.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/7.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/8.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/eipl/9.jpg"
      ]
    }
  },
  {
    id: "kothwalguda",
    title: "Kothwalguda Community Park",
    client: "GHMC",
    location: "Hyderabad",
    category: "Community Parks",
    year: "2022",
    duration: "6 months",
    description: "Transformation of underutilized community space into a vibrant recreational hub for local residents.",
    challenge: "Addressing diverse community needs within budget constraints while ensuring long-term durability and minimal maintenance.",
    solution: "We implemented cost-effective, vandal-resistant equipment with a focus on multi-use facilities that serve various age groups throughout the day.",
    scope: [
      "Multi-age playground",
      "Street workout area",
      "Walking trail furniture",
      "Community amphitheater",
      "Sports equipment"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/1.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/5.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/6.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/7.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/8.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/9.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/10.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/11.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/12.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/kothwalguda/13.jpeg"
      ]
    }
  },
  {
    id: "muppa-melody",
    title: "Muppa Melody Residential Township",
    client: "Muppa Projects",
    location: "Hyderabad",
    category: "Residential Community",
    year: "2023",
    duration: "4 months",
    description: "Premium outdoor amenities for a luxury residential township emphasizing wellness and community interaction.",
    challenge: "Creating distinct recreational zones within a large township while maintaining visual cohesion and premium aesthetics.",
    solution: "We developed themed zones connected by a central design language, featuring premium materials and smart equipment placement for optimal flow and usage.",
    scope: [
      "Themed play areas",
      "Yoga and meditation deck",
      "Outdoor gym equipment",
      "Senior citizen corners",
      "Adventure play zone"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/1.JPG",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/3.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/4.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/6.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/7.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/8.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/muppa-melody/9.jpg"
      ]
    }
  },
  {
    id: "my-home-avatar",
    title: "My Home Avatar Luxury Apartments",
    client: "My Home Constructions",
    location: "Hyderabad",
    category: "Premium Residential",
    year: "2021",
    duration: "5 months",
    description: "Ultra-premium outdoor amenities befitting a luxury residential development with focus on exclusivity and sophistication.",
    challenge: "Delivering world-class recreational facilities that match the premium positioning of the property while ensuring child safety.",
    solution: "We curated premium imported equipment with sophisticated design aesthetics, incorporating smart features and sustainable materials throughout.",
    scope: [
      "Designer playground",
      "Luxury fitness pavilion",
      "Water play features",
      "Sculpture garden furniture",
      "Rooftop recreation deck"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/1.JPG",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/2.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/3.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/4.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/5.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/6.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-avatar/7.JPG"
      ]
    }
  },
  {
    id: "my-home-booja",
    title: "My Home Booja Residential Complex",
    client: "My Home Constructions",
    location: "Hyderabad",
    category: "Residential Community",
    year: "2022",
    duration: "3 months",
    description: "Contemporary outdoor recreational facilities for a modern residential complex focusing on active lifestyle amenities.",
    challenge: "Maximizing recreational options in compact spaces while ensuring smooth traffic flow and minimal noise for residents.",
    solution: "We implemented space-efficient equipment with noise-dampening features and strategic placement to create distinct activity zones without interference.",
    scope: [
      "Compact play systems",
      "Calisthenics equipment",
      "Reflexology path",
      "Meditation corners",
      "Multi-sport courts"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/1.JPG",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/3.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/4.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/6.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/7.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-booja/8.JPG",
      ]
    }
  },
  {
    id: "my-home-mangala",
    title: "My Home Mangala Residential Project",
    client: "My Home Constructions",
    location: "Hyderabad",
    category: "Residential Community",
    year: "2023",
    duration: "4 months",
    description: "Family-focused outdoor amenities for a mid-segment residential project emphasizing safety and inclusive design.",
    challenge: "Creating engaging recreational spaces for families with varying budgets while maintaining quality and safety standards.",
    solution: "We selected durable, value-engineered equipment that doesn't compromise on safety or play value, with inclusive design features for children of all abilities.",
    scope: [
      "Inclusive playground",
      "Family fitness zone",
      "Toddler play area",
      "Basketball court",
      "Community pavilion"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/1.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/6.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/my-home-mangala/7.jpg"
      ]
    }
  },
  {
    id: "phoenix-aquila",
    title: "Phoenix Aquila Business Park",
    client: "Phoenix Mills",
    location: "Hyderabad",
    category: "Corporate Campus",
    year: "2021",
    duration: "6 months",
    description: "State-of-the-art outdoor wellness and recreational facilities for a premium IT business park.",
    challenge: "Creating world-class amenities that promote employee wellness while reflecting the corporate brand's premium positioning.",
    solution: "We designed futuristic fitness installations and relaxation zones with smart technology integration, creating Instagram-worthy spaces that enhance corporate culture.",
    scope: [
      "Smart fitness equipment",
      "Zen gardens",
      "Outdoor collaboration spaces",
      "Running track amenities",
      "Tech-integrated play areas"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/1.png",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/6.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/7.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/phoenix-aquila/8.jpg"

      ]
    }
  },
  {
    id: "ramky",
    title: "Ramky One Galaxia Township",
    client: "Ramky Estates",
    location: "Hyderabad",
    category: "Integrated Township",
    year: "2022",
    duration: "8 months",
    description: "Comprehensive outdoor infrastructure for a large integrated township serving 2000+ families.",
    challenge: "Developing diverse recreational facilities across multiple zones while maintaining consistent quality and creating distinct neighborhood identities.",
    solution: "We created themed recreational clusters with unique identities while maintaining overall design coherence through consistent materials and color schemes.",
    scope: [
      "Multiple playgrounds",
      "Central sports complex",
      "Neighborhood fitness pods",
      "Adventure park",
      "Amphitheater seating"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/ramky/1.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/ramky/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/ramky/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/ramky/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/ramky/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/ramky/6.jpeg"
      ]
    }
  },
  {
    id: "tank-bund",
    title: "Tank Bund Beautification Project",
    client: "HMDA",
    location: "Hyderabad",
    category: "Urban Renewal",
    year: "2023",
    duration: "7 months",
    description: "Iconic waterfront development featuring recreational facilities along Hyderabad's historic Tank Bund.",
    challenge: "Preserving historical significance while adding modern recreational amenities that can withstand heavy public use and weather conditions.",
    solution: "We installed weather-resistant, culturally-themed equipment that celebrates local heritage while providing modern recreational experiences for citizens.",
    scope: [
      "Heritage-themed playground",
      "Waterfront fitness trail",
      "Public art installations",
      "Viewing deck furniture",
      "Cultural activity zones"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/6.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/1.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/5.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/7.jpeg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/8.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/9.JPG",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tank-bund/10.JPG"
      ]
    }
  },
  {
    id: "tridasa",
    title: "Tridasa Aspira Gated Community",
    client: "Tridasa Builders",
    location: "Tellapur, Hyderabad",
    category: "Gated Community",
    year: "2021",
    duration: "5 months",
    description: "Boutique recreational amenities for an exclusive gated community focusing on wellness and sustainable living.",
    challenge: "Creating unique recreational experiences that align with the community's eco-conscious philosophy while meeting luxury expectations.",
    solution: "We integrated sustainable materials and nature-inspired designs, creating recreational spaces that promote both physical wellness and environmental consciousness.",
    scope: [
      "Eco-friendly playground",
      "Natural fitness trail",
      "Organic gardens furniture",
      "Sustainable sports facilities",
      "Nature play elements"
    ],
    images: {
      main: "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/1.jpg",
      gallery: [
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/2.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/3.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/4.jpg",
        "https://infrascapes-website.blr1.cdn.digitaloceanspaces.com/assets/projects/tridasa/5.jpeg"

      ]
    }
  }

];

export const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "public-parks", name: "Public Parks" },
  { id: "residential-community", name: "Residential Community" },
  { id: "corporate-campus", name: "Corporate Campus" },
  { id: "commercial-spaces", name: "Commercial Spaces" },
  { id: "community-parks", name: "Community Parks" },
  { id: "premium-residential", name: "Premium Residential" },
  { id: "integrated-township", name: "Integrated Township" },
  { id: "urban-renewal", name: "Urban Renewal" },
  { id: "gated-community", name: "Gated Community" },
];