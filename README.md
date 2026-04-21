# AeroCast - Weather Probability Analysis

A modern, full-stack weather probability application that analyzes historical NASA data (1985-2024) to predict weather patterns for the next 10 months.

## 🌟 Features

- **Interactive Map Selection**: Choose any location worldwide using an interactive Leaflet map.
- **10-Month Forecast**: Get probability predictions for heat, rain, wind, and snow.
- **Historical Analysis**: Powered by 40 years of NASA POWER API data.
- **Beautiful UI**: Modern design with smooth animations, built with Tailwind CSS v4.
- **Detailed Month View**: Deep-dive into specific monthly probability breakdowns with a single click.

## 🛠 Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Recharts** for data visualization
- **Leaflet** for interactive maps
- **shadcn/ui** components

### Backend
- **Node.js** with Express
- **SQLite** for intelligent caching
- **NASA POWER API** for historical weather data
- **Axios** for API requests

## 📂 Project Structure

```text
/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Home page with map and date selector
│   ├── results/          # Results page
│   │   └── page.tsx      # 10-month forecast display
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles with custom color palette
├── backend/              # Express backend server
│   ├── server.js         # Main server file with NASA API integration
│   ├── database.js       # SQLite database setup
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
├── components/           # React components
│   ├── map-selector.tsx  # Interactive map component
│   ├── weather-chart.tsx # 10-month probability chart
│   ├── month-detail.tsx  # Detailed month view
│   ├── animated-button.tsx # Custom animated button
│   ├── back-button.tsx   # Navigation back button
│   └── loader.tsx        # Loading animation
└── README.md
```
# 🚀 Getting Started
Prerequisites
Node.js 18+ installed

npm or yarn package manager

1. Backend Setup
Navigate to the backend directory and install dependencies:

Bash
cd backend
npm install
Start the backend server:

Bash
npm start
The backend will run on http://localhost:3001

2. Frontend Setup
In a new terminal, install frontend dependencies from the root directory:

Bash
npm install
Start the Next.js development server:

Bash
npm run dev
The frontend will run on http://localhost:3000

3. Open the Application
Open your browser and navigate to http://localhost:3000

# 📖 How to Use
Select Location: Click on the map or drag the marker to choose your target location.

Choose Date: Pick a starting date for the analysis.

Analyze: Click the ANALYZE button to fetch weather probabilities.

View Results: Explore the 10-month forecast with interactive Recharts visualizations.

Month Details: Click any month on the chart to see specific threshold probabilities.

Navigate: Use the back button to reset and select a new location or date.

# 🔌 API Endpoints
GET /api/weather-probability
Fetches a 10-month weather probability forecast.

Query Parameters:

lat (required): Latitude

lon (required): Longitude

date (required): Starting date (YYYY-MM-DD format)

Sample Response:

JSON
{
  "location": { "lat": 40.7128, "lon": -74.0060 },
  "startDate": "2025-01-15",
  "monthlyForecasts": [
    {
      "month": 1,
      "date": "2025-01-15",
      "monthName": "January 2025",
      "probabilities": {
        "heat": 15,
        "rain": 45,
        "wind": 30,
        "snow": 25
      },
      "details": {
        "heat": "15% chance of extreme heat (>35°C)",
        "rain": "45% chance of heavy rainfall (>20mm)",
        "wind": "30% chance of strong winds (>13.8m/s)",
        "snow": "25% chance of snow conditions"
      }
    }
  ]
}
# 🎨 Color Palette
AeroCast features a custom purple-pink gradient design:

Primary: #3E1E68 (Deep Purple)

Secondary: #5D2F77 (Medium Purple)

Accent: #E45A92 (Pink)

Light Accent: #FFACAC (Light Pink)

# 📊 Data Source
Weather data is sourced from the NASA POWER API (Prediction Of Worldwide Energy Resources), providing:

40 years of historical data (1985-2024).

Daily temperature, precipitation, and wind measurements.

Global coverage with high-resolution accuracy.

# 📄 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it for your own purposes.

# 🙌 Credits
NASA POWER API for providing the foundational weather data.

Next.js & React for the robust framework architecture.

Modern weather UI designs for visual inspiration.
