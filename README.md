🛰️ AeroCast<p align="center"><strong>A modern, full-stack weather probability application powered by 40 years of NASA data.</strong></p><p align="center"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" /><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /><img src="https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" /><img src="https://img.shields.io/badge/NASA_POWER-API-red?style=for-the-badge&logo=nasa" alt="NASA API" /><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></p>📖 OverviewAeroCast bridges the gap between historical data and future insights. By analyzing daily atmospheric patterns from the NASA POWER API (1985-2024), AeroCast generates high-fidelity weather probability forecasts for the next 10 months. Whether you're planning an event or analyzing climate trends, AeroCast provides the data you need with a stunning, modern UI.🌟 Key Features🌍 Interactive Geospatial Selection: Pinpoint any location on Earth using a high-performance Leaflet-integrated map.📅 10-Month Predictive Analysis: Probability modeling for Heat, Rain, Wind, and Snow.📈 Data Visualization: Dynamic, interactive charts powered by Recharts.⚡ Intelligent Caching: Optimized backend with SQLite to ensure lightning-fast response times.🎨 Cutting-Edge UI: A bespoke design system built on Tailwind CSS v4 and shadcn/ui.🛠️ Tech StackLayerTechnologyFrontendNext.js 15 (App Router), React 19, TypeScript, Tailwind v4ChartsRecharts (Responsive & Interactive)MapsLeaflet.jsComponentsshadcn/uiBackendNode.js, Express.jsDatabaseSQLite (Caching Layer)Data SourceNASA POWER API📂 Project StructurePlaintext.
├── app/                  # Next.js App Router (UI & Routing)
│   ├── results/          # Probability analysis display
│   └── globals.css       # Tailwind v4 styles & custom palette
├── backend/              # Node.js/Express Server
│   ├── server.js         # NASA API Logic
│   └── database.js       # SQLite configuration
├── components/           # Reusable UI Architecture
│   ├── map-selector.tsx  # Interactive map engine
│   ├── weather-chart.tsx # Data visualization engine
│   └── loader.tsx        # Framer-motion powered animations
└── README.md
🚀 Getting StartedPrerequisitesNode.js 18+npm or yarn1. Backend IntegrationBashcd backend
npm install
npm start
The backend will initialize the SQLite cache and listen on port 3001.2. Frontend LaunchBash# Return to root
npm install
npm run dev
The application will be live at http://localhost:3000.🔌 API ReferenceGET /api/weather-probabilityParameterTypeDescriptionlatfloatRequired. Latitude of the target location.lonfloatRequired. Longitude of the target location.datestringRequired. Start date in YYYY-MM-DD format.Success Response Snippet:JSON{
  "monthName": "January 2025",
  "probabilities": {
    "heat": 15,
    "rain": 45,
    "wind": 30,
    "snow": 25
  }
}
🎨 Design SystemAeroCast utilizes a signature "Nebula" color palette, designed for high contrast and modern aesthetics:ToneHexPreviewPrimary#3E1E68Secondary#5D2F77Accent#E45A92Light#FFACAC📊 Data IntegrityThe analysis is based on the NASA POWER (Prediction Of Worldwide Energy Resources) dataset. We process daily records across 40 years to calculate the variance and frequency of weather events, ensuring that the 10-month probability model is grounded in long-term historical accuracy.📄 LicenseDistributed under the MIT License. See LICENSE for more information.🙌 CreditsNASA POWER Project - For the invaluable open-data resource.shadcn/ui - For the beautiful accessible components.<p align="center">Built with ❤️ by Nekhal James</p>
