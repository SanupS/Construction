import { motion } from 'framer-motion'
import { galleryImages } from '../data/content'

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Portfolio
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
            Our Recent Projects
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            A showcase of homes we&apos;ve built — each one a testament to quality and
            craftsmanship.
          </p>
        </motion.div>

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ height: i % 3 === 0 ? '320px' : i % 3 === 1 ? '260px' : '300px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-4 bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
