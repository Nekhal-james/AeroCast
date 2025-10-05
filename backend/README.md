# AeroCast Backend

Express.js backend server that fetches and processes historical weather data from NASA POWER API.

## Features

- Fetches 40 years of historical weather data (1985-2024)
- Calculates 10-month probability forecasts
- SQLite caching for improved performance
- CORS enabled for frontend integration
- RESTful API design

## Installation

\`\`\`bash
npm install
\`\`\`

## Running

**Development (with auto-reload):**
\`\`\`bash
npm run dev
\`\`\`

**Production:**
\`\`\`bash
npm start
\`\`\`

## API Endpoints

### GET `/`
Health check endpoint.

**Response:**
\`\`\`
AeroCast Backend is running!
\`\`\`

### GET `/api/weather-probability`

Get 10-month weather probability forecast for a location and date.

**Query Parameters:**
- `lat` (required): Latitude (-90 to 90)
- `lon` (required): Longitude (-180 to 180)
- `date` (required): Start date in YYYY-MM-DD format

**Example Request:**
\`\`\`
http://localhost:3001/api/weather-probability?lat=40.7128&lon=-74.0060&date=2025-01-15
\`\`\`

**Example Response:**
\`\`\`json
{
  "location": {
    "lat": 40.7128,
    "lon": -74.0060
  },
  "startDate": "2025-01-15",
  "monthlyForecasts": [
    {
      "month": 1,
      "date": "2025-01-15",
      "monthName": "January 2025",
      "probabilities": {
        "heat": 5,
        "rain": 42,
        "wind": 28,
        "snow": 18
      },
      "details": {
        "heat": "5% chance of extreme heat (>35°C)",
        "rain": "42% chance of heavy rainfall (>20mm)",
        "wind": "28% chance of strong winds (>13.8m/s)",
        "snow": "18% chance of snow conditions"
      }
    }
    // ... 9 more months
  ]
}
\`\`\`

## Data Source

**NASA POWER API** (Prediction Of Worldwide Energy Resources)
- URL: https://power.larc.nasa.gov/api/temporal/daily/point
- Coverage: Global, 1985-2024
- Parameters:
  - `T2M_MAX`: Maximum temperature at 2 meters (°C)
  - `T2M_MIN`: Minimum temperature at 2 meters (°C)
  - `PRECTOTCORR`: Precipitation (mm/day)
  - `WS10M_MAX`: Maximum wind speed at 10 meters (m/s)

## Weather Thresholds

The backend uses these thresholds to calculate probabilities:

- **Heatwave**: Temperature > 35°C
- **Heavy Rain**: Precipitation > 20mm
- **High Wind**: Wind speed > 13.8 m/s (50 km/h)
- **Snow**: Temperature < 0°C with precipitation

## Database

SQLite database (`weather_cache.db`) stores cached results for faster subsequent requests.

**Schema:**
\`\`\`sql
CREATE TABLE cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lat REAL NOT NULL,
  lon REAL NOT NULL,
  day_of_year INTEGER NOT NULL,
  result TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
\`\`\`

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `400`: Bad request (missing parameters)
- `500`: Server error (NASA API failure, processing error)

## Environment Variables

Create a `.env` file (optional):

\`\`\`
PORT=3001
DB_PATH=./weather_cache.db
\`\`\`

## Dependencies

- **express**: Web server framework
- **cors**: Enable cross-origin requests
- **axios**: HTTP client for NASA API
- **sqlite3**: Database for caching
- **dotenv**: Environment variable management

## Development

The backend is designed to be simple and maintainable:

1. `server.js`: Main application logic
2. `database.js`: SQLite database setup
3. `package.json`: Dependencies and scripts

To modify weather thresholds, edit the `thresholds` object in `server.js`.
\`\`\`
