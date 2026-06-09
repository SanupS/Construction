import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import { submitContact } from '../lib/api'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await submitContact({
        name: data.get('name') as string,
        email: data.get('email') as string,
        phone: (data.get('phone') as string) || '',
        plan: (data.get('plan') as string) || '',
        message: data.get('message') as string,
      })
      setSubmitted(true)
    } catch {
      setError('Could not save to database. Check that the server is running.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-brand-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              Contact Us
            </span>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Let&apos;s Build
              <br />
              <span className="text-gradient">Together</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Ready to start your dream home? Reach out for a free consultation and
              personalized quote.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+1 (555) 123-4567',
                  href: 'tel:+15551234567',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@apexcraft.com',
                  href: 'mailto:hello@apexcraft.com',
                },
                {
                  icon: MapPin,
                  label: 'Office',
                  value: '742 Builder Lane, Austin, TX 78701',
                  href: '#',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/5"
                >
                  <div className="rounded-xl bg-brand-500/10 p-3 transition-colors group-hover:bg-brand-500/20">
                    <Icon className="h-5 w-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">{label}</div>
                    <div className="font-medium text-white">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="glass flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl p-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-400" />
                <h3 className="mt-4 text-2xl font-bold text-white">Message Sent!</h3>
                <p className="mt-2 text-slate-400">
                  Thank you for reaching out. Our team will get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
                {error && (
                  <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                    {error}
                  </div>
                )}                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-slate-400">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="John Smith"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-slate-400">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="phone" className="mb-2 block text-sm text-slate-400">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="plan" className="mb-2 block text-sm text-slate-400">
                    Interested Plan
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                  >
                    <option value="">Select a plan (optional)</option>
                    <option value="horizon-villa">Horizon Villa</option>
                    <option value="evergreen-estate">Evergreen Estate</option>
                    <option value="skyline-penthouse">Skyline Penthouse</option>
                    <option value="cottage-comfort">Cottage Comfort</option>
                    <option value="aurora-modern">Aurora Modern</option>
                    <option value="heritage-manor">Heritage Manor</option>
                    <option value="custom">Custom Design</option>
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-sm text-slate-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your dream home..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-colors focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110 disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <Send className="h-4 w-4" />
                </button>              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
