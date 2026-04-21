🌍 AeroCast — AI Weather Probability Engine
7

AeroCast is a full-stack AI-powered weather analysis platform that transforms 40 years of NASA climate data into probabilistic forecasts for the next 10 months.

Not just weather prediction — probability intelligence for the atmosphere.

🧠 Why AeroCast?

Traditional weather apps tell you:

“It will rain.”

AeroCast tells you:

“There’s a 45% probability of heavy rainfall based on 40 years of historical patterns.”

This makes it useful for:

🌾 Agriculture planning
🏙️ Urban decision-making
📊 Data-driven forecasting
🧠 AI/ML experimentation
✨ Core Features
🌍 Interactive Global Map
6
Select any location worldwide
Real-time coordinate-based analysis
📊 10-Month Probability Forecast
7
Heat 🌡️
Rain 🌧️
Wind 🌬️
Snow ❄️
Based on long-term climate trends
🔍 Deep Monthly Insights
Click any month → get detailed breakdowns
Understand why a probability exists, not just the number
⚡ Fast + Cached Backend
SQLite caching for faster responses
Efficient NASA API integration
🏗️ Architecture
User تعامل → Next.js Frontend → Express API → NASA POWER API
                                 ↓
                              SQLite Cache
🛠️ Tech Stack
Frontend
⚡ Next.js 15 (App Router)
⚛️ React 19
🎨 Tailwind CSS v4
📊 Recharts
🗺️ Leaflet
🧩 shadcn/ui
Backend
🟢 Node.js + Express
🗄️ SQLite (caching layer)
🌍 NASA POWER API
🔗 Axios
📁 Project Structure
/
├── app/                # Next.js frontend
├── backend/            # Express server
├── components/         # UI components
└── README.md
⚡ Quick Start
1. Clone the repo
git clone https://github.com/Nekhal-james/AeroCast.git
cd AeroCast
2. Run Backend
cd backend
npm install
npm start
3. Run Frontend
npm install
npm run dev
4. Open App
http://localhost:3000
🧪 How It Works
User selects location + date
Backend fetches historical NASA data (1985–2024)
Data is analyzed to compute probability distributions
Results are cached + visualized
📡 API Endpoint
/api/weather-probability

Params

lat
lon
date

Returns:

10-month probabilistic forecast
Detailed explanations per weather type
🎨 Design System
Role	Color
Primary	#3E1E68
Secondary	#5D2F77
Accent	#E45A92
Soft Tone	#FFACAC
🌐 Data Source

Powered by NASA POWER API

40+ years of climate data
Global coverage
High reliability for research-grade analysis
🚀 Future Improvements
🤖 ML-based predictive models (LSTM / Time Series)
🌐 Deployment (Vercel + cloud backend)
📱 Mobile responsive PWA
📊 Export reports (PDF / CSV)
🧠 AI explanation engine (“Why this prediction?”)
🧭 Vision

AeroCast aims to become:

A decision intelligence platform for weather, not just a forecast tool.

📜 License

MIT — free to use, modify, and build upon.

🙌 Author

Built by Nekhal James

Turning data into intelligence.
