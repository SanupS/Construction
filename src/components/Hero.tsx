import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />

      <div className="aurora absolute inset-0 opacity-60" />

      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse-slow" />

      <div className="relative mx-auto max-w-4xl px-6 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
            <span className="text-xs font-medium uppercase tracking-wider text-brand-300">
              Building Dreams Since 2008
            </span>
          </div>

          <h1 className="font-display text-5xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
            Crafting{' '}
            <span className="text-gradient">Extraordinary</span>
            <br />
            <span className="relative">
              Homes
              <span className="absolute -bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Premium residential construction with custom floor plans, sustainable
            materials, and unmatched craftsmanship. Your vision, built to last.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#plans"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110 hover:scale-105"
            >
              Explore Home Plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#reviews"
              className="group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-brand-500/50 hover:bg-white/5 hover:scale-105"
            >
              <Play className="h-4 w-4 text-brand-400" />
              Read Reviews
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { value: '350+', label: 'Homes Built' },
              { value: '18yr', label: 'Experience' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-2xl font-bold text-white transition-colors group-hover:text-brand-400 md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
