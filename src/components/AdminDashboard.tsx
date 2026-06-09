import { useState, useEffect, useCallback, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Lock,
  LogOut,
  Mail,
  Phone,
  Home,
  MessageSquare,
  RefreshCw,
  Inbox,
  ArrowLeft,
} from 'lucide-react'
import { fetchContactInquiries } from '../lib/api'
import type { ContactInquiry } from '../types/contact'
import { formatPlan, formatDate } from '../types/contact'

const SESSION_KEY = 'apexcraft-admin-session'

export default function AdminDashboard() {
  const [password, setPassword] = useState('')
  const [adminKey, setAdminKey] = useState<string | null>(
    () => sessionStorage.getItem(SESSION_KEY),
  )
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)

  const loadInquiries = useCallback(async (key: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchContactInquiries(key)
      setInquiries(data)
    } catch {
      setError('Failed to load inquiries. Please sign in again.')
      sessionStorage.removeItem(SESSION_KEY)
      setAdminKey(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (adminKey) loadInquiries(adminKey)
  }, [adminKey, loadInquiries])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setLoading(true)

    try {
      await fetchContactInquiries(password)
      sessionStorage.setItem(SESSION_KEY, password)
      setAdminKey(password)
      setPassword('')
    } catch {
      setLoginError('Incorrect admin password')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAdminKey(null)
    setInquiries([])
    window.location.hash = ''
  }

  if (!adminKey) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass w-full max-w-md rounded-3xl p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-brand-500/20 p-3">
              <Lock className="h-6 w-6 text-brand-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Login</h1>
              <p className="text-sm text-slate-400">Owner access only</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm text-slate-400">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter owner password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-brand-500/50"
              />
            </div>

            {loginError && <p className="text-sm text-red-400">{loginError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <a
            href="#"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="glass-strong border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Inbox className="h-6 w-6 text-brand-400" />
            <div>
              <h1 className="font-display text-xl font-bold text-white">Quote Inquiries</h1>
              <p className="text-xs text-slate-400">ApexCraft Construction — Owner Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => loadInquiries(adminKey)}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-brand-500/30 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:border-red-500/30 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <a
              href="#"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-slate-950"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-brand-400">{inquiries.length}</div>
            <div className="mt-1 text-sm text-slate-400">Total Quote Requests</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-white">
              {inquiries.filter((i) => {
                const d = new Date(i.createdAt)
                const now = new Date()
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
              }).length}
            </div>
            <div className="mt-1 text-sm text-slate-400">This Month</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-3xl font-bold text-white">
              {inquiries.length > 0 ? formatDate(inquiries[0].createdAt).split(',')[0] : '—'}
            </div>
            <div className="mt-1 text-sm text-slate-400">Latest Inquiry</div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {loading && inquiries.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-slate-400">
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Inbox className="mx-auto h-12 w-12 text-slate-600" />
            <h3 className="mt-4 text-lg font-semibold text-white">No inquiries yet</h3>
            <p className="mt-2 text-slate-400">
              Quote requests from the Contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-slate-950">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  {item.plan && (
                    <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-400">
                      {formatPlan(item.plan)}
                    </span>
                  )}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="h-4 w-4 text-brand-400" />
                    <a href={`mailto:${item.email}`} className="hover:text-brand-400">
                      {item.email}
                    </a>
                  </div>
                  {item.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone className="h-4 w-4 text-brand-400" />
                      <a href={`tel:${item.phone}`} className="hover:text-brand-400">
                        {item.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Home className="h-4 w-4 text-brand-400" />
                    {formatPlan(item.plan)}
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Message
                  </div>
                  <p className="leading-relaxed text-slate-300">{item.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
