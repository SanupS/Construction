import type { Review, ReviewFormData } from '../types/review'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries = 5,
  delayMs = 1500,
): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url, options)
      if (res.ok) return res
      lastError = new Error(`Request failed with status ${res.status}`)
    } catch (err) {
      lastError = err
    }

    if (attempt < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }

  throw lastError
}

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetchWithRetry(`${API_BASE}/reviews`)
  return res.json()
}

export async function createReview(data: ReviewFormData): Promise<Review> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to submit review')
  }

  return res.json()
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`)
    return res.ok
  } catch {
    return false
  }
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  plan: string
  message: string
}

export async function submitContact(data: ContactFormData): Promise<void> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to submit inquiry')
  }
}

export async function fetchContactInquiries(adminKey: string) {
  const res = await fetch(`${API_BASE}/contact`, {
    headers: { 'x-admin-key': adminKey },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to fetch inquiries')
  }

  return res.json()
}
