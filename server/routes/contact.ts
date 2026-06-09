import { Router, type Request, type Response } from 'express'
import { ContactInquiry } from '../models/ContactInquiry.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 }).lean()
    res.json(
      inquiries.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        phone: item.phone,
        plan: item.plan,
        message: item.message,
        createdAt: item.createdAt.toISOString(),
      })),
    )
  } catch (error) {
    console.error('GET /api/contact error:', error)
    res.status(500).json({ error: 'Failed to fetch inquiries' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, plan, message } = req.body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({ error: 'Name, email, and message are required' })
      return
    }

    const inquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      plan: plan?.trim() || undefined,
      message: message.trim(),
    })

    res.status(201).json({
      id: inquiry._id.toString(),
      message: 'Quote request received successfully',
    })
  } catch (error) {
    console.error('POST /api/contact error:', error)
    res.status(500).json({ error: 'Failed to save inquiry' })
  }
})

export default router
