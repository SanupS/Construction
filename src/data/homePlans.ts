export interface HomePlan {
  id: string
  name: string
  category: 'modern' | 'classic' | 'luxury' | 'compact'
  sqft: number
  bedrooms: number
  bathrooms: number
  floors: number
  price: string
  description: string
  features: string[]
  image: string
}

export const homePlans: HomePlan[] = [
  {
    id: 'horizon-villa',
    name: 'Horizon Villa',
    category: 'modern',
    sqft: 3200,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    price: '$485,000',
    description:
      'Open-concept living with floor-to-ceiling windows and a seamless indoor-outdoor flow.',
    features: ['Smart Home Ready', 'Solar Pre-Wired', '3-Car Garage', 'Chef Kitchen'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 'evergreen-estate',
    name: 'Evergreen Estate',
    category: 'classic',
    sqft: 4100,
    bedrooms: 5,
    bathrooms: 4,
    floors: 2,
    price: '$620,000',
    description:
      'Timeless colonial architecture with premium finishes and a grand foyer entrance.',
    features: ['Library Nook', 'Wine Cellar', 'Wrap-around Porch', 'Master Suite'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 'skyline-penthouse',
    name: 'Skyline Penthouse',
    category: 'luxury',
    sqft: 5500,
    bedrooms: 5,
    bathrooms: 5,
    floors: 3,
    price: '$1.2M',
    description:
      'Ultra-luxury multi-level residence with rooftop terrace and panoramic city views.',
    features: ['Rooftop Pool', 'Home Theater', 'Elevator', 'Panoramic Views'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
  {
    id: 'cottage-comfort',
    name: 'Cottage Comfort',
    category: 'compact',
    sqft: 1800,
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    price: '$295,000',
    description:
      'Efficient single-story design perfect for first-time homeowners and downsizers.',
    features: ['Energy Star Rated', 'Open Layout', 'Backyard Patio', 'Storage Loft'],
    image: 'https://images.unsplash.com/photo-1605276374104-de7432d0ebd3?w=800&q=80',
  },
  {
    id: 'aurora-modern',
    name: 'Aurora Modern',
    category: 'modern',
    sqft: 2800,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    price: '$420,000',
    description:
      'Minimalist Scandinavian-inspired design with natural wood accents and clean lines.',
    features: ['Passive Solar', 'Rainwater Harvest', 'Floating Stairs', 'Home Office'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    id: 'heritage-manor',
    name: 'Heritage Manor',
    category: 'classic',
    sqft: 3600,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    price: '$540,000',
    description:
      'Elegant brick facade with traditional craftsmanship and modern amenities inside.',
    features: ['Fireplace', 'Formal Dining', 'Butler Pantry', 'Covered Entry'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa0a6a3?w=800&q=80',
  },
]

export const planCategories = [
  { id: 'all', label: 'All Plans' },
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'compact', label: 'Compact' },
] as const
