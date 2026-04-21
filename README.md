<div align="center">

# 🛰️ AeroCast

**A modern, full-stack weather probability application powered by 40 years of NASA data.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![NASA API](https://img.shields.io/badge/NASA_POWER-API-red?style=for-the-badge&logo=nasa)](https://power.larc.nasa.gov/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

<br />

## 📖 Overview

AeroCast bridges the gap between historical data and future insights. By analyzing daily atmospheric patterns from the **NASA POWER API (1985–2024)**, AeroCast generates high-fidelity weather probability forecasts for the next 10 months. Whether you're planning an event or analyzing climate trends, AeroCast provides the data you need within a stunning, premium UI ecosystem.

---

## 🌟 Key Features

- **🌍 Interactive Geospatial Selection**: Pinpoint any location on Earth using a high-performance Leaflet-integrated map.
- **📅 10-Month Predictive Analysis**: Robust probability modeling for Heat, Rain, Wind, and Snow.
- **📈 Data Visualization**: Dynamic, interactive, and beautiful charts powered by Recharts.
- **⚡ Intelligent Caching**: Optimized Express.js backend with SQLite integration to ensure lightning-fast response times.
- **🎨 Cutting-Edge UI**: A bespoke and premium design system built on the latest Tailwind CSS v4 and shadcn/ui.

---

## 🛠️ Tech Stack

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| **Frontend**   | Next.js 15 (App Router), React 19, TypeScript|
| **UI Styling** | Tailwind v4, shadcn/ui, Framer Motion        |
| **Charts**     | Recharts (Responsive & Interactive)          |
| **Maps**       | Leaflet.js                                   |
| **Backend**    | Node.js, Express.js                          |
| **Database**   | SQLite (Caching Layer)                       |
| **Data Source**| NASA POWER API                               |

---

## 📂 Project Structure

```plaintext
├── app/                  # Next.js App Router (UI & Routing)
│   ├── results/          # Probability analysis display pages
│   └── globals.css       # Tailwind v4 styles & custom palette
├── backend/              # Node.js/Express Server
│   ├── server.js         # NASA API Logic & Express routing
│   └── database.js       # SQLite configuration & caching operations
├── components/           # Reusable UI Architecture (shadcn/ui & custom)
│   ├── map-selector.tsx  # Interactive map engine
│   ├── weather-chart.tsx # Data visualization engine
│   └── loader.tsx        # Framer-motion powered animations
├── README.md             # You are here!
└── package.json          # Project metadata and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### 1. Backend Integration

Navigate to the `backend` directory, install dependencies, and start the local server. The backend will initialize the SQLite cache automatically.

```bash
cd backend
npm install
npm start
```
*The backend will actively listen on `http://localhost:3001`.*

### 2. Frontend Launch

In a new terminal window, return to the project root directory, install frontend dependencies, and start the Next.js development server.

```bash
# From the project root
npm install
npm run dev
```
*The application will be live at `http://localhost:3000`.*

---

## 🔌 API Reference

### `GET /api/weather-probability`

Retrieves weather probability analytics for a target location based on NASA historical data.

| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| `lat`     | `float`| **Required**. Latitude of the target location.  |
| `lon`     | `float`| **Required**. Longitude of the target location. |
| `date`    | `string`| **Required**. Start date in `YYYY-MM-DD` format.|

**Success Response Snippet:**

```json
{
  "monthName": "January 2025",
  "probabilities": {
    "heat": 15,
    "rain": 45,
    "wind": 30,
    "snow": 25
  }
}
```

---

## 🎨 Design System

AeroCast utilizes a signature **"Nebula"** color palette, carefully designed for high contrast, aesthetic brilliance, and modern premium visual flair:

| Tone       | Hex       |
| ---------- | --------- |
| **Primary**| `#3E1E68` |
| **Secondary**| `#5D2F77`|
| **Accent** | `#E45A92` |
| **Light**  | `#FFACAC` |

---

## 📊 Data Integrity

The analysis is based on the **NASA POWER (Prediction Of Worldwide Energy Resources)** dataset. We process daily records across 40 years to calculate the variance and frequency of weather events, ensuring that the 10-month probability model is firmly grounded in long-term historical accuracy.

---

## 📄 License & Credits

- **License**: Distributed under the [MIT License](LICENSE). 
- **Data**: Analysis generated via the [NASA POWER Project](https://power.larc.nasa.gov/) - providing invaluable open-data resources.
- **UI Components**: Thanks to [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible component foundations.

<p align="center">Built with ❤️ by Nekhal James</p>
