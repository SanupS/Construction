import { useState, useEffect, useCallback } from 'react'
import type { Review, ReviewFormData } from '../types/review'
import { defaultReviews } from '../data/reviews'
import { fetchReviews, createReview } from '../lib/api'

const STORAGE_KEY = 'apexcraft-reviews-fallback'

function loadFallbackReviews(): Review[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const userReviews: Review[] = JSON.parse(stored)
      return [...userReviews, ...defaultReviews]
    }
  } catch {
    /* ignore corrupt storage */
  }
  return [...defaultReviews]
}

function saveFallbackReviews(reviews: Review[]) {
  const userOnly = reviews.filter((r) => r.isUserSubmitted)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userOnly))
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingDatabase, setUsingDatabase] = useState(false)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchReviews()
      setReviews(data)
      setUsingDatabase(true)
    } catch {
      setReviews(loadFallbackReviews())
      setUsingDatabase(false)
      setError('Could not reach the database. Showing cached reviews — try Refresh in a moment.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  const addReview = useCallback(
    async (data: ReviewFormData) => {
      setError(null)

      try {
        const newReview = await createReview(data)
        setReviews((prev) => [newReview, ...prev])
        setUsingDatabase(true)
        return newReview
      } catch {
        const newReview: Review = {
          id: crypto.randomUUID(),
          name: data.name.trim(),
          email: data.email.trim() || undefined,
          role: data.role.trim() || 'Homeowner',
          quote: data.quote.trim(),
          rating: data.rating,
          createdAt: new Date().toISOString(),
          isUserSubmitted: true,
        }

        setReviews((prev) => {
          const updated = [newReview, ...prev]
          saveFallbackReviews(updated)
          return updated
        })

        setUsingDatabase(false)
        setError('Saved locally — database unavailable. Start the server to persist globally.')
        return newReview
      }
    },
    [],
  )

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

  return {
    reviews,
    addReview,
    averageRating,
    totalReviews: reviews.length,
    loading,
    error,
    usingDatabase,
    reload: loadReviews,
  }
}
