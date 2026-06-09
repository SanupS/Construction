export interface Review {
  id: string
  name: string
  email?: string
  role: string
  quote: string
  rating: number
  createdAt: string
  isUserSubmitted: boolean
}

export interface ReviewFormData {
  name: string
  email: string
  role: string
  quote: string
  rating: number
}
