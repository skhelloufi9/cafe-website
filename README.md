# The Corner Cafe — Minimal React App

This is a very small React app scaffolded for a cafe website using Vite.

Quick start (macOS / zsh):

```bash
# install dependencies for frontend
npm install

# start dev server for frontend
npm run dev

# in a separate terminal start backend server (optional)
npm run start:server
```

Backend

A very small Express backend is provided under the `server/` folder. It exposes:
- GET /api/health
- GET /api/bookings
- POST /api/bookings

To run the backend:

```bash
cd server
npm install
npm run dev   # or npm start
```

During development the frontend proxies `/api` to `http://localhost:4000` via `vite.config.js` so you can call `/api/bookings` from the frontend.

Files added:
- `index.html` — app entry
- `src/main.jsx` — React mount
- `src/App.jsx` — main layout
- `src/components/*` — Header, Menu, Footer, BookingForm
- `src/index.css` — basic styles
- `package.json` — scripts and deps
- `server/` — simple Express backend that stores bookings in `server/bookings.json`
- `vite.config.js` — dev proxy for `/api` to backend

You can build with `npm run build` and preview the production build with `npm run preview`.

Security note: The example backend stores bookings in a local JSON file and exposes `GET /api/bookings` without auth for demo purposes. For production, use a proper database and authentication.
