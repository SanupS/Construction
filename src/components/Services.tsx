import { motion } from 'framer-motion'
import { services } from '../data/content'
import Card3D from './Card3D'

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Our Services
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
            End-to-End Construction
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            From concept to keys in hand — we handle every detail of your home building
            journey.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card3D className="h-full">
                <div className="glass card-glow group relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:border-brand-500/30 hover:bg-white/5 hover:shadow-xl hover:shadow-brand-500/5">
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-brand-500/5 transition-all group-hover:bg-brand-500/10" />

                  <div className="relative">
                    <div className="mb-5 inline-flex rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 p-3 transition-transform group-hover:scale-110">
                      <service.icon className="h-6 w-6 text-brand-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400">{service.description}</p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
