import mongoose from 'mongoose'
import { DB_NAME } from './config.js'

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  mongoose.set('strictQuery', true)

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    dbName: DB_NAME,
  })

  console.log(`Connected to MongoDB database: ${DB_NAME}`)
}

export function disconnectDB() {
  return mongoose.disconnect()
}
