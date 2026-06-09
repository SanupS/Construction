import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bed, Bath, Layers, Maximize2, ArrowRight, X } from 'lucide-react'
import { homePlans, planCategories, type HomePlan } from '../data/homePlans'

function PlanCard({ plan, onSelect }: { plan: HomePlan; onSelect: (plan: HomePlan) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass group overflow-hidden rounded-2xl transition-all hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5"
    >
      <div className="relative overflow-hidden">
        <img
          src={plan.image}
          alt={plan.name}
          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold text-slate-950 capitalize">
            {plan.category}
          </span>
        </div>
        <div className="absolute right-4 bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
          <p className="mt-1 text-2xl font-bold text-brand-400">{plan.price}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-slate-400">{plan.description}</p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { icon: Maximize2, value: `${plan.sqft}`, label: 'sqft' },
            { icon: Bed, value: `${plan.bedrooms}`, label: 'beds' },
            { icon: Bath, value: `${plan.bathrooms}`, label: 'baths' },
            { icon: Layers, value: `${plan.floors}`, label: 'floors' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-lg bg-white/5 p-2 text-center">
              <Icon className="mx-auto h-4 w-4 text-brand-400" />
              <div className="mt-1 text-sm font-semibold text-white">{value}</div>
              <div className="text-[10px] text-slate-500 uppercase">{label}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onSelect(plan)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-white transition-all hover:border-brand-500/50 hover:bg-brand-500/10"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

function PlanModal({ plan, onClose }: { plan: HomePlan; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <img src={plan.image} alt={plan.name} className="aspect-[16/9] w-full object-cover" />

        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-400 capitalize">
                {plan.category}
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">{plan.name}</h3>
            </div>
            <div className="text-3xl font-bold text-brand-400">{plan.price}</div>
          </div>

          <p className="mt-4 text-slate-400">{plan.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Square Feet', value: plan.sqft.toLocaleString() },
              { label: 'Bedrooms', value: plan.bedrooms },
              { label: 'Bathrooms', value: plan.bathrooms },
              { label: 'Floors', value: plan.floors },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 p-4 text-center">
                <div className="text-xl font-bold text-white">{item.value}</div>
                <div className="mt-1 text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-white">Included Features</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {plan.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 py-4 text-sm font-semibold text-slate-950 transition-all hover:brightness-110"
          >
            Request This Plan
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HomePlans() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedPlan, setSelectedPlan] = useState<HomePlan | null>(null)

  const filtered =
    activeCategory === 'all'
      ? homePlans
      : homePlans.filter((p) => p.category === activeCategory)

  return (
    <section id="plans" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Home Plans
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
            Find Your Perfect Plan
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Browse our collection of expertly designed floor plans — each customizable to
            match your unique vision.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {planCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-slate-950 shadow-lg shadow-brand-500/25'
                  : 'border border-white/10 text-slate-400 hover:border-brand-500/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={setSelectedPlan} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
