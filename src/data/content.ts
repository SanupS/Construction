import {
  Hammer,
  Home,
  Layers,
  Paintbrush,
  Ruler,
  Shield,
  type LucideIcon,
} from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: Home,
    title: 'Custom Home Building',
    description:
      'From foundation to finish, we build bespoke residences tailored to your lifestyle and vision.',
  },
  {
    icon: Layers,
    title: 'Architectural Plans',
    description:
      'Choose from our curated floor plans or collaborate with our architects for a fully custom design.',
  },
  {
    icon: Hammer,
    title: 'Renovation & Remodeling',
    description:
      'Transform existing spaces with expert renovations that add value and modern functionality.',
  },
  {
    icon: Ruler,
    title: 'Site Planning',
    description:
      'Comprehensive land assessment, permitting, and site preparation for a smooth build process.',
  },
  {
    icon: Paintbrush,
    title: 'Interior Finishing',
    description:
      'Premium materials, custom cabinetry, and designer finishes that elevate every room.',
  },
  {
    icon: Shield,
    title: '10-Year Warranty',
    description:
      'Every ApexCraft home is backed by our industry-leading structural warranty for peace of mind.',
  },
]

export const stats = [
  { value: '350+', label: 'Homes Built' },
  { value: '18', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '45', label: 'Floor Plans' },
]

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    alt: 'Modern luxury home exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    alt: 'Contemporary living room interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa0a6a3?w=600&q=80',
    alt: 'Classic brick home facade',
  },
  {
    src: 'https://images.unsplash.com/photo-1605276374104-de7432d0ebd3?w=600&q=80',
    alt: 'Cozy cottage style home',
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    alt: 'Minimalist modern architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    alt: 'Luxury villa with pool',
  },
]
