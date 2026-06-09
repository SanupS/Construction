import mongoose, { Schema, type Document } from 'mongoose'

export interface IReview extends Document {
  name: string
  email?: string
  role: string
  quote: string
  rating: number
  isUserSubmitted: boolean
  createdAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    role: { type: String, default: 'Homeowner', trim: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isUserSubmitted: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
)

export const Review = mongoose.model<IReview>('Review', reviewSchema)
