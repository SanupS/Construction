import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.js'
import { DB_NAME } from './config.js'
import reviewsRouter, { seedReviewsIfEmpty } from './routes/reviews.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: DB_NAME, connected: true })
})

app.use('/api/reviews', reviewsRouter)
app.use('/api/contact', contactRouter)

async function start() {
  try {
    await connectDB()
    await seedReviewsIfEmpty()

    app.listen(PORT, () => {
      console.log(`API server running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('\nFailed to start server — could not connect to MongoDB.\n')
    if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
      console.error('MongoDB is not running on localhost:27017.')
      console.error('\nFix options:')
      console.error('  1. Start local MongoDB, OR')
      console.error('  2. Use MongoDB Atlas and set MONGODB_URI in your .env file')
      console.error('     Example: mongodb+srv://user:pass@cluster.mongodb.net/apexcraft\n')
    } else if (
      error instanceof Error &&
      (error.message.includes('bad auth') || error.message.includes('Authentication failed'))
    ) {
      console.error('Authentication failed — wrong username or password in .env')
      console.error('\nFix steps:')
      console.error('  1. Atlas → Security → Database Access → verify your username')
      console.error('  2. Reset the user password if unsure')
      console.error('  3. Update MONGODB_URI in .env with the correct credentials')
      console.error('  4. If password has special chars (@ # % etc), URL-encode them')
      console.error('     Example: MyP@ss → MyP%40ss\n')
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

start()
