import type { Request, Response, NextFunction } from 'express'

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.headers['x-admin-key']
  const adminPassword = process.env.ADMIN_PASSWORD || 'apexcraft2026'

  if (key !== adminPassword) {
    res.status(401).json({ error: 'Unauthorized — admin login required' })
    return
  }

  next()
}
