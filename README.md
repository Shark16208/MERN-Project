# AI Mental Health Journal (MERN)

Full‑stack starter for an AI‑ready Mental Health journaling app built with the MERN stack. It ships with secure auth (JWT + httpOnly cookies), a Vite React frontend, an Express API, and MongoDB integration. In production, the Express server serves the built React app.


## Features

- User authentication: register, login, logout
- Protected routes with JWT stored in httpOnly cookies
- Update profile (name, email, password)
- React Router v6, Redux Toolkit + RTK Query
- React‑Bootstrap UI and React‑Toastify notifications
- Vite dev server with API proxy to Express
- Single deployment: Express serves `frontend/dist` in production


## Tech Stack

- Frontend: React 18, Vite, React Router, Redux Toolkit, RTK Query, React‑Bootstrap, Toastify
- Backend: Node.js, Express, cookie‑parser, jsonwebtoken, express‑async‑handler
- Database: MongoDB (Mongoose)
- Dev tooling: Nodemon, Concurrently, ESLint


## Project Structure

```
Mental_Health_MERN_Project-master/
├─ backend/
│  ├─ config/db.js            # Mongo connection
│  ├─ controllers/userController.js
│  ├─ middleware/
│  │  ├─ authMiddleware.js    # protect middleware (JWT)
│  │  └─ errorMiddleware.js   # notFound + errorHandler
│  ├─ models/userModel.js
│  ├─ routes/userRoutes.js
│  ├─ utils/generateToken.js  # signs JWT + sets cookie
│  └─ server.js               # Express app + static prod serve
├─ frontend/                  # Vite React app
│  ├─ src/
│  │  ├─ slices/              # RTK store + API slices
│  │  ├─ components/          # UI components (Header, PrivateRoute, etc.)
│  │  └─ screens/             # Pages (Home, Login, Register, Profile)
│  └─ vite.config.js          # Port 3000, /api proxy → 5000
├─ package.json               # root scripts (dev/server/client/start)
└─ README.md                  # this file
```


## Prerequisites

- Node.js 18+ and npm
- MongoDB (Atlas URI or local instance)


## Environment Variables

Create a `.env` file in the repository root (same level as `package.json`):

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/mental_health_journal
# or your Atlas URI, e.g.
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/mental_health_journal

JWT_SECRET=supersecretjwtkey
```

Notes:
- Cookies are set as `httpOnly` and `secure` when `NODE_ENV !== 'development'`.
- In production, Express serves the built React app from `frontend/dist`.


## Installation

Install backend dependencies (root):

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```


## Running the App (Development)

From the repository root, start both servers concurrently:

```bash
npm run dev
```

What happens:
- Backend: Express on `http://localhost:5000`
- Frontend: Vite on `http://localhost:3000` with a proxy that forwards `/api` to `http://localhost:5000`

Useful single processes:
```bash
npm run server   # backend only (nodemon)
npm run client   # frontend only (vite on port 3000)
```


## Building and Running (Production)

1) Build the frontend:
```bash
npm run build --prefix frontend
```

2) Ensure `.env` has `NODE_ENV=production` and valid `MONGO_URI`/`JWT_SECRET`.

3) Start the server (serves `frontend/dist`):
```bash
npm start
```

Server will run on `PORT` (default 5000).


## API Overview

Base URL (dev via Vite proxy): `/api`

- POST `/api/users` — Register
  - Body: `{ name, email, password }`
  - Sets auth cookie, returns `{ _id, name, email }`
- POST `/api/users/auth` — Login
  - Body: `{ email, password }`
  - Sets auth cookie, returns `{ _id, name, email }`
- POST `/api/users/logout` — Logout
  - Clears auth cookie
- GET `/api/users/profile` — Get profile (Protected)
  - Cookie: `jwt` (httpOnly)
  - Returns `{ _id, name, email }`
- PUT `/api/users/profile` — Update profile (Protected)
  - Body: `{ name?, email?, password? }`
  - Returns `{ _id, name, email }`

Example (PowerShell with curl):
```bash
# Register
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"password\":\"pass123\"}" ^
  -i

# Login
curl -X POST http://localhost:3000/api/users/auth ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"pass123\"}" ^
  -i
```


## Frontend Notes

- RTK Query uses a relative `baseUrl` (`""`), and Vite proxies `/api` → `http://localhost:5000` in dev.
- Auth state is persisted to `localStorage` (`authSlice`) for quick reload UX; server trust is via cookie JWT.
- Protected routes are implemented using `PrivateRoute` and Redux auth state.


## Common Issues

- 401 Unauthorized on protected endpoints:
  - Ensure you’ve logged in first and a `jwt` cookie is present
  - In production, set `JWT_SECRET` and serve over HTTPS to use `secure` cookies
- Cannot connect to MongoDB:
  - Verify `MONGO_URI` in `.env`
  - Check network/IP allowlist if using Atlas


## Roadmap

- Journal entries (CRUD) linked to user accounts
- AI‑assisted reflections and mood insights
- Tagging, search, filtering, and analytics
- Dark mode and accessibility improvements


## License

ISC (see `package.json`).


## Acknowledgements

This project scaffolds a pragmatic MERN baseline for mental health journaling with secure auth, ready for AI‑driven features.
