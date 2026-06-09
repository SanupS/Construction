import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, Send, CheckCircle2, MessageSquarePlus } from 'lucide-react'
import { useReviews } from '../hooks/useReviews'
import Card3D from './Card3D'
import SceneBackground from './SceneBackground'

function StarDisplay({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? 'fill-brand-400 text-brand-400' : 'text-slate-600'
          }`}
        />
      ))}
    </div>
  )
}

function StarPicker({
  value,
  onChange,
}: {
  value: number
  onChange: (rating: number) => void
}) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1
        const filled = starValue <= (hover || value)
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="rounded p-0.5 transition-transform hover:scale-110"
            aria-label={`Rate ${starValue} stars`}
          >
            <Star
              className={`h-7 w-7 transition-colors ${
                filled ? 'fill-brand-400 text-brand-400' : 'text-slate-600 hover:text-brand-300'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ReviewsAndFeedback() {
  const { reviews, addReview, averageRating, totalReviews, loading, error, usingDatabase } =
    useReviews()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    quote: '',
    rating: 0,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.rating === 0) return

    setSubmitting(true)
    await addReview(form)
    setForm({ name: '', email: '', role: '', quote: '', rating: 0 })
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-32">
      <SceneBackground opacity={0.35} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950" />
      <div className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Reviews & Feedback
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
            Share Your Experience
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Read what homeowners say about us — or leave your own review and feedback.
          </p>
          {usingDatabase && (
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Connected to database
            </span>
          )}
        </motion.div>

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-300">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mx-auto mt-10 flex max-w-md flex-col items-center rounded-2xl p-6 text-center"
        >
          {loading ? (
            <div className="py-4 text-slate-400">Loading reviews...</div>
          ) : (
            <>
              <div className="text-5xl font-bold text-brand-400">{averageRating.toFixed(1)}</div>
              <StarDisplay rating={Math.round(averageRating)} size="lg" />
              <p className="mt-2 text-sm text-slate-400">
                Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
              </p>
            </>
          )}
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass sticky top-24 rounded-3xl p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-brand-500/20 p-3">
                  <MessageSquarePlus className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Write a Review</h3>
                  <p className="text-sm text-slate-400">Your feedback helps future homeowners</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-green-400" />
                    <h4 className="mt-4 text-xl font-bold text-white">Thank You!</h4>
                    <p className="mt-2 text-slate-400">
                      Your review has been published successfully.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="review-name" className="mb-2 block text-sm text-slate-400">
                        Your Name *
                      </label>
                      <input
                        id="review-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="review-email" className="mb-2 block text-sm text-slate-400">
                        Email (optional)
                      </label>
                      <input
                        id="review-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@email.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="review-role" className="mb-2 block text-sm text-slate-400">
                        Project / Home Plan
                      </label>
                      <input
                        id="review-role"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Horizon Villa Owner"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-400">Rating *</label>
                      <StarPicker
                        value={form.rating}
                        onChange={(rating) => setForm({ ...form, rating })}
                      />
                      {form.rating === 0 && (
                        <p className="mt-1 text-xs text-slate-500">Click stars to rate</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="review-quote" className="mb-2 block text-sm text-slate-400">
                        Your Review & Feedback *
                      </label>
                      <textarea
                        id="review-quote"
                        required
                        rows={4}
                        value={form.quote}
                        onChange={(e) => setForm({ ...form, quote: e.target.value })}
                        placeholder="Share your experience building with ApexCraft..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={form.rating === 0 || submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                      <Send className="h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="space-y-6 lg:col-span-3">
            {loading ? (
              <div className="glass rounded-2xl p-12 text-center text-slate-400">
                Loading reviews from database...
              </div>
            ) : (
            <AnimatePresence initial={false}>
              {reviews.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i > 2 ? 0 : i * 0.05 }}
                >
                  <Card3D>
                    <div
                      className={`glass relative rounded-2xl p-8 transition-all hover:border-brand-500/20 hover:shadow-xl hover:shadow-brand-500/5 ${
                        item.isUserSubmitted ? 'border-brand-500/20 ring-1 ring-brand-500/10' : ''
                      }`}
                    >
                      <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-500/20" />

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <StarDisplay rating={item.rating} />
                        <span className="text-xs text-slate-500">{formatDate(item.createdAt)}</span>
                      </div>

                      <p className="mt-4 leading-relaxed text-slate-300">
                        &ldquo;{item.quote}&rdquo;
                      </p>

                      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-slate-950">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{item.name}</span>
                            {item.isUserSubmitted && (
                              <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400">
                                New
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">{item.role}</div>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
