# AeroCast Installation Guide

## Quick Start

Follow these steps to get AeroCast running on your machine:

### 1. Install Frontend Dependencies

\`\`\`bash
npm install
\`\`\`

**Important:** If you see any errors about missing modules (like `react-is` or `@tailwindcss/postcss`), run:

\`\`\`bash
npm install --force
\`\`\`

### 2. Install Backend Dependencies

\`\`\`bash
cd backend
npm install
cd ..
\`\`\`

### 3. Configure Backend Environment

Create a `.env` file in the `backend` directory:

\`\`\`bash
cd backend
cp .env.example .env
\`\`\`

Edit `backend/.env` and add your NASA Earthdata API key:

\`\`\`
NASA_API_KEY=your_api_key_here
PORT=3001
\`\`\`

Get your free NASA API key at: https://api.nasa.gov/

### 4. Start the Backend Server

In one terminal:

\`\`\`bash
cd backend
npm start
\`\`\`

The backend will run on `http://localhost:3001`

### 5. Start the Frontend

In another terminal (from the root directory):

\`\`\`bash
npm run dev
\`\`\`

The frontend will run on `http://localhost:3000`

### 6. Open the App

Visit `http://localhost:3000` in your browser.

## Troubleshooting

### "window is not defined" Error

This is a Next.js SSR issue with Leaflet. If you see this error:
1. Stop the dev server (Ctrl+C)
2. Delete the `.next` folder: `rm -rf .next` (or manually delete it)
3. Restart: `npm run dev`

### "Cannot find module" Errors

Run:
\`\`\`bash
npm install --force
\`\`\`

### Backend Connection Failed

Make sure:
1. Backend server is running on port 3001
2. You have a valid NASA API key in `backend/.env`
3. No firewall is blocking localhost connections

### Map Not Loading

1. Check browser console for errors
2. Ensure you have internet connection (Leaflet tiles load from external servers)
3. Try refreshing the page

## Development Notes

- Frontend runs on port 3000
- Backend runs on port 3001
- Database (SQLite) is created automatically in `backend/weather_cache.db`
- All weather data is cached to reduce API calls

## Need Help?

Check the main README.md for more detailed information about the project architecture and features.
