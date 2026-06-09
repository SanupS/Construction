import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Building2, LayoutDashboard } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#plans', label: 'Home Plans' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-2xl shadow-black/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
            <Building2 className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <span className="font-display text-xl font-bold text-white">ApexCraft</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-400">
              Construction
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-brand-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admin"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-brand-500/50 hover:text-brand-400"
          >
            <LayoutDashboard className="h-4 w-4" />
            Admin
          </a>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:brightness-110"
          >
            Get a Quote
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-300 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong overflow-hidden border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-brand-400"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-brand-400"
              >
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Get a Quote
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
