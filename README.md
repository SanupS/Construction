# ApexCraft Construction Website

Modern React construction company website with 3D visuals, home plans, and MongoDB-backed reviews.

## Features

- 3D interactive hero (React Three Fiber)
- Home plans catalog with filters
- User reviews & feedback stored in **MongoDB**
- Express API backend
- Responsive dark-theme design

## Prerequisites

- **Node.js** 18+
- **MongoDB** — local install OR free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and set your MongoDB connection string:

```bash
copy .env.example .env
```

Edit `.env`:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/apexcraft

# OR MongoDB Atlas (recommended)
# MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/apexcraft

PORT=3001
VITE_API_URL=/api
```

### 3. Start MongoDB

**Option A — MongoDB Atlas (easiest):**
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user and allow your IP (or `0.0.0.0/0` for dev)
3. Copy the connection string into `MONGODB_URI` in `.env`

**Option B — Local MongoDB:**
Install MongoDB Community Edition and ensure it runs on `localhost:27017`.

### 4. Run the app

```bash
npm run dev
```

This starts both:
- **Frontend** → http://localhost:5173
- **API server** → http://localhost:3001

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Server & database status |
| GET | `/api/reviews` | Fetch all reviews |
| POST | `/api/reviews` | Submit a new review |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + API together |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | API server only |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project Structure

```
construction/
├── server/           # Express + MongoDB API
│   ├── index.ts
│   ├── db.ts
│   ├── models/
│   └── routes/
├── src/              # React frontend
│   ├── components/
│   ├── hooks/
│   └── lib/api.ts
└── .env              # Environment variables (not committed)
```

## Troubleshooting

**tsconfig.json error about missing files**
The project uses split configs (`tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.server.json`). Restart the TypeScript server in VS Code/Cursor: `Ctrl+Shift+P` → "TypeScript: Restart TS Server".

**"Database offline" on the website**
The API server is not running or MongoDB is not connected. Run `npm run dev:server` and check your `MONGODB_URI`.

**MongoDB connection timeout**
Verify MongoDB is running locally, or your Atlas connection string, username, password, and IP whitelist are correct.
