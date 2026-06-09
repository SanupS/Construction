import { Router, type Request, type Response } from 'express'
import { Review } from '../models/Review.js'
import { defaultReviewsSeed } from '../seed.js'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean()
    res.json(
      reviews.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        email: r.email,
        role: r.role,
        quote: r.quote,
        rating: r.rating,
        isUserSubmitted: r.isUserSubmitted,
        createdAt: r.createdAt.toISOString(),
      })),
    )
  } catch (error) {
    console.error('GET /api/reviews error:', error)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, role, quote, rating } = req.body

    if (!name?.trim() || !quote?.trim() || !rating) {
      res.status(400).json({ error: 'Name, review text, and rating are required' })
      return
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Rating must be between 1 and 5' })
      return
    }

    const review = await Review.create({
      name: name.trim(),
      email: email?.trim() || undefined,
      role: role?.trim() || 'Homeowner',
      quote: quote.trim(),
      rating: Number(rating),
      isUserSubmitted: true,
    })

    res.status(201).json({
      id: review._id.toString(),
      name: review.name,
      email: review.email,
      role: review.role,
      quote: review.quote,
      rating: review.rating,
      isUserSubmitted: review.isUserSubmitted,
      createdAt: review.createdAt.toISOString(),
    })
  } catch (error) {
    console.error('POST /api/reviews error:', error)
    res.status(500).json({ error: 'Failed to save review' })
  }
})

export async function seedReviewsIfEmpty() {
  const count = await Review.countDocuments()
  if (count === 0) {
    await Review.insertMany(defaultReviewsSeed)
    console.log('Seeded default reviews')
  }
}

export default router
