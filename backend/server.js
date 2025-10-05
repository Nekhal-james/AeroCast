require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./database.js")
const axios = require("axios")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("AeroCast Backend is running!")
})

app.get("/api/weather-probability", async (req, res) => {
  const { lat, lon, date } = req.query

  if (!lat || !lon || !date) {
    return res.status(400).json({ error: "Latitude, longitude, and date are required." })
  }

  const START_YEAR = 1985
  const END_YEAR = 2024
  const totalYears = END_YEAR - START_YEAR + 1

  const parameters = ["T2M_MAX", "PRECTOTCORR", "WS10M_MAX", "T2M_MIN", "RH2M", "ALLSKY_SFC_SW_DWN", "QV2M"].join(",")
  const nasaApiUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${parameters}&community=RE&longitude=${lon}&latitude=${lat}&start=${START_YEAR}&end=${END_YEAR}&format=JSON`

  try {
    const requestedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isFutureDate = requestedDate > today

    const nasaResponse = await axios.get(nasaApiUrl)
    const nasaData = nasaResponse.data.properties.parameter

    const thresholds = {
      heatwave: 35,
      heavyRain: 20,
      highWind: 13.8,
      snow: 0,
    }

    const startDate = new Date(date)
    const monthlyData = []

    for (let monthOffset = 0; monthOffset < 10; monthOffset++) {
      const targetDate = new Date(startDate)
      targetDate.setMonth(startDate.getMonth() + monthOffset)

      const month = String(targetDate.getMonth() + 1).padStart(2, "0")
      const day = String(targetDate.getDate()).padStart(2, "0")

      let heatwaveDays = 0,
        heavyRainDays = 0,
        highWindDays = 0,
        snowDays = 0
      let validYears = 0
      let tempSum = 0,
        rainSum = 0,
        windSum = 0,
        humiditySum = 0,
        solarSum = 0,
        cloudSum = 0

      for (let year = START_YEAR; year <= END_YEAR; year++) {
        const dateKey = `${year}${month}${day}`

        const temp = nasaData.T2M_MAX[dateKey]
        const tempMin = nasaData.T2M_MIN[dateKey]
        const rain = nasaData.PRECTOTCORR[dateKey]
        const wind = nasaData.WS10M_MAX[dateKey]
        const humidity = nasaData.RH2M?.[dateKey]
        const solar = nasaData.ALLSKY_SFC_SW_DWN?.[dateKey]

        if (temp !== undefined && temp > -999) {
          validYears++
          tempSum += temp
          if (temp > thresholds.heatwave) heatwaveDays++
          if (tempMin !== undefined && tempMin < thresholds.snow && rain > 0) snowDays++
        }
        if (rain !== undefined && rain > -999) {
          rainSum += rain
          if (rain > thresholds.heavyRain) heavyRainDays++
        }
        if (wind !== undefined && wind > -999) {
          windSum += wind
          if (wind > thresholds.highWind) highWindDays++
        }
        if (humidity !== undefined && humidity > -999) {
          humiditySum += humidity
        }
        if (solar !== undefined && solar > -999) {
          solarSum += solar
        }
      }

      const yearsToUse = validYears > 0 ? validYears : totalYears

      const baseConfidence = isFutureDate ? 0.75 : 0.95
      const monthConfidenceDecay = isFutureDate ? monthOffset * 0.03 : 0
      const confidence = Math.max(0.5, baseConfidence - monthConfidenceDecay)

      const aiVariation = isFutureDate ? (Math.random() - 0.5) * 10 : 0

      monthlyData.push({
        month: monthOffset + 1,
        date: targetDate.toISOString().split("T")[0],
        monthName: targetDate.toLocaleString("default", { month: "long", year: "numeric" }),
        isFuturePrediction: isFutureDate,
        confidence: Math.round(confidence * 100),
        probabilities: {
          heat: Math.max(0, Math.min(100, Math.round((heatwaveDays / yearsToUse) * 100 + aiVariation))),
          rain: Math.max(0, Math.min(100, Math.round((heavyRainDays / yearsToUse) * 100 + aiVariation))),
          wind: Math.max(0, Math.min(100, Math.round((highWindDays / yearsToUse) * 100 + aiVariation))),
          snow: Math.max(0, Math.min(100, Math.round((snowDays / yearsToUse) * 100 + aiVariation))),
        },
        averages: {
          temperature: Math.round((tempSum / yearsToUse) * 10) / 10,
          rainfall: Math.round((rainSum / yearsToUse) * 10) / 10,
          windSpeed: Math.round((windSum / yearsToUse) * 10) / 10,
          humidity: Math.round((humiditySum / yearsToUse) * 10) / 10,
          solarRadiation: Math.round((solarSum / yearsToUse) * 10) / 10,
          cloudCover: Math.round((100 - solarSum / yearsToUse / 3) * 10) / 10,
        },
        details: {
          heat: `${Math.round((heatwaveDays / yearsToUse) * 100)}% chance of extreme heat (>${thresholds.heatwave}°C)`,
          rain: `${Math.round((heavyRainDays / yearsToUse) * 100)}% chance of heavy rainfall (>${thresholds.heavyRain}mm)`,
          wind: `${Math.round((highWindDays / yearsToUse) * 100)}% chance of strong winds (>${thresholds.highWind}m/s)`,
          snow: `${Math.round((snowDays / yearsToUse) * 100)}% chance of snow conditions`,
        },
      })
    }

    const finalResponse = {
      location: { lat: Number.parseFloat(lat), lon: Number.parseFloat(lon) },
      startDate: date,
      isFuturePrediction: isFutureDate,
      monthlyForecasts: monthlyData,
    }

    res.json(finalResponse)
  } catch (error) {
    console.error("Error fetching or processing NASA data:", error.message)
    res.status(500).json({ error: "Failed to retrieve or process data from NASA API." })
  }
})

app.listen(PORT, () => {
  console.log(`AeroCast Server is listening on http://localhost:${PORT}`)
})
