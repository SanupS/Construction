import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { stats } from '../data/content'

const highlights = [
  'Licensed & insured in all 50 states',
  'LEED-certified sustainable building practices',
  'Dedicated project manager for every build',
  'Transparent pricing with no hidden fees',
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Construction team at work"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            <div className="glass absolute -right-4 -bottom-6 rounded-2xl p-6 shadow-2xl md:-right-8">
              <div className="font-display text-4xl font-bold text-brand-400">18+</div>
              <div className="text-sm text-slate-400">Years of Excellence</div>
            </div>

            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl border border-brand-500/30 bg-brand-500/5" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
              About Us
            </span>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Building Homes,
              <br />
              <span className="text-gradient">Building Trust</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              ApexCraft Construction has been at the forefront of residential building for
              over 18 years. We combine cutting-edge technology with time-honored
              craftsmanship to deliver homes that stand the test of time.
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              From the first blueprint to the final walkthrough, our team of architects,
              engineers, and master craftsmen work in perfect harmony to bring your dream
              home to life.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass group rounded-2xl p-6 text-center transition-all hover:border-brand-500/30 hover:bg-white/5"
            >
              <div className="text-3xl font-bold text-white transition-colors group-hover:text-brand-400 md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
