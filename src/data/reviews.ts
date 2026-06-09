import type { Review } from '../types/review'

export const defaultReviews: Review[] = [
  {
    id: 'default-1',
    name: 'Sarah & Michael Chen',
    role: 'Horizon Villa Owners',
    quote:
      'ApexCraft turned our dream into reality. The attention to detail and communication throughout the build was exceptional.',
    rating: 5,
    createdAt: '2025-11-12T10:00:00.000Z',
    isUserSubmitted: false,
  },
  {
    id: 'default-2',
    name: 'James Rodriguez',
    role: 'Evergreen Estate Owner',
    quote:
      'We chose the Evergreen plan and customized every detail. The result exceeded our expectations in every way.',
    rating: 5,
    createdAt: '2025-10-28T10:00:00.000Z',
    isUserSubmitted: false,
  },
  {
    id: 'default-3',
    name: 'Emily Watson',
    role: 'Cottage Comfort Owner',
    quote:
      'As first-time builders, we were nervous. ApexCraft guided us through every step with patience and expertise.',
    rating: 5,
    createdAt: '2025-09-15T10:00:00.000Z',
    isUserSubmitted: false,
  },
]
