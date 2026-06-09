import mongoose, { Schema, type Document } from 'mongoose'

export interface IContactInquiry extends Document {
  name: string
  email: string
  phone?: string
  plan?: string
  message: string
  createdAt: Date
}

const contactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    plan: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

export const ContactInquiry = mongoose.model<IContactInquiry>(
  'ContactInquiry',
  contactInquirySchema,
)
