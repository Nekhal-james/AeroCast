# AeroCast Setup Guide

Complete step-by-step guide to get AeroCast running on your local machine.

## Quick Start

### Step 1: Install Dependencies

**Frontend:**
\`\`\`bash
npm install
\`\`\`

**Backend:**
\`\`\`bash
cd backend
npm install
cd ..
\`\`\`

### Step 2: Start the Backend Server

Open a terminal and run:

\`\`\`bash
cd backend
npm start
\`\`\`

You should see:
\`\`\`
Connected to the SQLite cache database.
AeroCast Server is listening on http://localhost:3001
\`\`\`

### Step 3: Start the Frontend

Open a **new terminal** (keep the backend running) and run:

\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
▲ Next.js 15.5.4
- Local:        http://localhost:3000
\`\`\`

### Step 4: Open the App

Navigate to `http://localhost:3000` in your browser.

## Detailed Setup

### System Requirements

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

#### 1. Clone or Download the Project

If you have the project as a ZIP file, extract it to your desired location.

#### 2. Install Frontend Dependencies

Open a terminal in the project root directory:

\`\`\`bash
# Check Node.js version (should be 18+)
node --version

# Install dependencies
npm install
\`\`\`

This will install:
- Next.js 15
- React 19
- Tailwind CSS v4
- Recharts (for charts)
- Leaflet (for maps)
- All other required packages

#### 3. Install Backend Dependencies

\`\`\`bash
cd backend
npm install
\`\`\`

This will install:
- Express (web server)
- Axios (HTTP client)
- CORS (cross-origin requests)
- SQLite3 (database)
- dotenv (environment variables)

#### 4. Configure Environment (Optional)

The backend works out of the box with NASA's public API. If you need custom configuration:

\`\`\`bash
cd backend
cp .env.example .env
\`\`\`

Edit `.env` if needed (usually not required).

### Running the Application

#### Option 1: Run Both Servers Separately (Recommended)

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm start
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
npm run dev
\`\`\`

#### Option 2: Use npm Scripts

**Start Backend:**
\`\`\`bash
npm run backend
\`\`\`

**Start Frontend (in new terminal):**
\`\`\`bash
npm run dev
\`\`\`

### Verifying the Setup

1. **Backend Check**: Visit `http://localhost:3001` - you should see "AeroCast Backend is running!"

2. **Frontend Check**: Visit `http://localhost:3000` - you should see the AeroCast home page with a map

3. **API Check**: Test the API directly:
   \`\`\`
   http://localhost:3001/api/weather-probability?lat=40.7128&lon=-74.0060&date=2025-01-15
   \`\`\`
   You should get JSON data with weather probabilities.

### Troubleshooting

#### Port Already in Use

If port 3000 or 3001 is already in use:

**Frontend (port 3000):**
\`\`\`bash
# Next.js will automatically suggest an alternative port
# Or specify a custom port:
PORT=3002 npm run dev
\`\`\`

**Backend (port 3001):**
Edit `backend/server.js` and change:
\`\`\`javascript
const PORT = 3001; // Change to 3002 or another port
\`\`\`

Then update the frontend API URL in `app/results/page.tsx`:
\`\`\`typescript
const response = await fetch(\`http://localhost:3002/api/weather-probability?...\`)
\`\`\`

#### Module Not Found Errors

\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for backend
cd backend
rm -rf node_modules package-lock.json
npm install
\`\`\`

#### Map Not Displaying

If the map doesn't show:
1. Check browser console for errors
2. Ensure you have internet connection (Leaflet loads map tiles from online)
3. Try refreshing the page

#### Backend Connection Failed

If you see "Failed to fetch weather data":
1. Verify backend is running on port 3001
2. Check backend terminal for errors
3. Test the API endpoint directly in your browser
4. Check CORS settings in `backend/server.js`

#### NASA API Errors

If you get NASA API errors:
1. Check your internet connection
2. The NASA POWER API is public and doesn't require authentication
3. Wait a moment and try again (rate limiting)

### Development Tips

#### Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Changes to React components reload automatically
- **Backend**: Use `npm run dev` in backend folder (requires nodemon)

#### Database

The SQLite database (`weather_cache.db`) is created automatically in the `backend` folder. You can delete it to clear the cache.

#### Debugging

Add console.log statements:
\`\`\`typescript
console.log("[v0] Debug info:", data)
\`\`\`

Check:
- Browser DevTools Console (F12)
- Backend terminal output

### Production Build

To build for production:

\`\`\`bash
# Build frontend
npm run build

# Start production server
npm start
\`\`\`

The backend runs the same in development and production.

### Next Steps

1. Select a location on the map
2. Choose a date
3. Click "ANALYZE" to see 10-month weather probabilities
4. Click any month on the chart for detailed information
5. Use the back button to analyze different locations

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Verify all dependencies are installed correctly
3. Ensure both servers are running
4. Check browser and terminal console for error messages
\`\`\`
