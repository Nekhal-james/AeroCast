"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Loader } from "@/components/loader"
import { WeatherChart } from "@/components/weather-chart"
import { MonthDetail } from "@/components/month-detail"
import { CloudRain, Thermometer, Wind, Snowflake, Calendar, Download, Info } from "lucide-react"
import { motion } from "framer-motion"

interface MonthlyForecast {
  month: number
  date: string
  monthName: string
  probabilities: {
    heat: number
    rain: number
    wind: number
    snow: number
  }
  details: {
    heat: string
    rain: string
    wind: string
    snow: string
  }
}

interface WeatherData {
  location: { lat: number; lon: number }
  startDate: string
  monthlyForecasts: MonthlyForecast[]
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [showDayDetail, setShowDayDetail] = useState(false)
  const [selectedDayDate, setSelectedDayDate] = useState<string>("")
  const [dayDetailData, setDayDetailData] = useState<any>(null)
  const [isDayLoading, setIsDayLoading] = useState(false)
  const [showAISummary, setShowAISummary] = useState(false)

  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const date = searchParams.get("date")

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!lat || !lng || !date) {
        setError("Missing location or date parameters")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const apiUrl = `http://localhost:3001/api/weather-probability?lat=${lat}&lon=${lng}&date=${date}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.status}`)
        }

        const data = await response.json()
        setWeatherData(data)
      } catch (err) {
        console.error("[v0] Error fetching weather data:", err)
        setError("Failed to fetch weather data. Please ensure the backend server is running on port 3001.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [lat, lng, date])

  const fetchDayDetail = async () => {
    if (!selectedDayDate || !lat || !lng) return

    setIsDayLoading(true)
    try {
      const apiUrl = `http://localhost:3001/api/weather-probability?lat=${lat}&lon=${lng}&date=${selectedDayDate}`
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error("Failed to fetch day detail")
      const data = await response.json()
      setDayDetailData(data.monthlyForecasts[0])
      setShowDayDetail(true)
    } catch (err) {
      console.error("[v0] Error fetching day detail:", err)
      alert("Failed to fetch day detail. Please try again.")
    } finally {
      setIsDayLoading(false)
    }
  }

  const exportData = () => {
    if (!weatherData) return
    const dataStr = JSON.stringify(weatherData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `aerocast-data-${weatherData.location.lat}-${weatherData.location.lon}.json`
    link.click()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <Loader />
          <p className="text-white text-xl">Analyzing decades of weather data...</p>
          <p className="text-white/60 text-sm">Processing NASA historical records from 1985-2024</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent/20 flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center">
          <p className="text-destructive mb-4 whitespace-pre-line">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all"
          >
            Go Back Home
          </button>
        </Card>
      </div>
    )
  }

  if (!weatherData) {
    return null
  }

  const avgHeat = Math.round(
    weatherData.monthlyForecasts.reduce((sum, m) => sum + m.probabilities.heat, 0) /
      weatherData.monthlyForecasts.length,
  )
  const avgRain = Math.round(
    weatherData.monthlyForecasts.reduce((sum, m) => sum + m.probabilities.rain, 0) /
      weatherData.monthlyForecasts.length,
  )
  const avgWind = Math.round(
    weatherData.monthlyForecasts.reduce((sum, m) => sum + m.probabilities.wind, 0) /
      weatherData.monthlyForecasts.length,
  )
  const avgSnow = Math.round(
    weatherData.monthlyForecasts.reduce((sum, m) => sum + m.probabilities.snow, 0) /
      weatherData.monthlyForecasts.length,
  )

  const maxHeat = Math.max(...weatherData.monthlyForecasts.map((m) => m.probabilities.heat))
  const maxRain = Math.max(...weatherData.monthlyForecasts.map((m) => m.probabilities.rain))
  const maxSnow = Math.max(...weatherData.monthlyForecasts.map((m) => m.probabilities.snow))

  const generateAISummary = () => {
    const summaries = []
    if (avgHeat > 60) summaries.push("High heat risk detected across multiple months")
    else if (avgHeat < 30) summaries.push("Heat risk is minimal for the forecast period")

    if (avgRain > 60) summaries.push("Significant rainfall probability throughout the period")
    else if (avgRain < 30) summaries.push("Low rainfall expected")

    if (avgSnow > 40) summaries.push("Notable snowfall probability in colder months")

    return summaries.length > 0
      ? summaries.join(". ") + "."
      : "Weather conditions appear moderate across all parameters."
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-primary to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
            <p className="text-white/80">
              {weatherData.location.lat.toFixed(4)}, {weatherData.location.lon.toFixed(4)}
            </p>
            <p className="text-white/60 text-sm mt-1">Starting from {weatherData.startDate}</p>
          </div>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </motion.header>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 mb-8 bg-card/95 backdrop-blur-sm shadow-2xl">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">10-Month Weather Probability Forecast</h2>
            <p className="text-sm text-muted-foreground mb-6">Click on any month to view detailed breakdown</p>
            <WeatherChart weatherData={weatherData} onMonthSelect={setSelectedMonth} />
          </Card>
        </motion.div>

        {/* AI Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 mb-8 bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm border-accent/30">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Weather Insights</h3>
                <p className="text-foreground/80">{generateAISummary()}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Summary Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-chart-1 to-chart-1/80 border-chart-1/30 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <Thermometer className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Heat Risk</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{avgHeat}%</p>
            <p className="text-sm text-white/90">Average probability</p>
            <p className="text-xs text-white/80 mt-2">Peak: {maxHeat}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-chart-2 to-chart-2/80 border-chart-2/30 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <CloudRain className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Rainfall</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{avgRain}%</p>
            <p className="text-sm text-white/90">Average probability</p>
            <p className="text-xs text-white/80 mt-2">Peak: {maxRain}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-chart-3 to-chart-3/80 border-chart-3/30 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <Snowflake className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Snowfall</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{avgSnow}%</p>
            <p className="text-sm text-white/90">Average probability</p>
            <p className="text-xs text-white/80 mt-2">Peak: {maxSnow}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-chart-4 to-chart-4/80 border-chart-4/30 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <Wind className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Wind Risk</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{avgWind}%</p>
            <p className="text-sm text-white/90">Average probability</p>
          </Card>
        </motion.div>

        {/* Single Day Detail View */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="p-8 mb-8 bg-card/95 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Single Day Detail View</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Select a specific date to view detailed weather probability for that single day
            </p>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDayDate}
                  onChange={(e) => setSelectedDayDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 text-base rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
              </div>
              <button
                onClick={fetchDayDetail}
                disabled={!selectedDayDate || isDayLoading}
                className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDayLoading ? "Loading..." : "View Day Detail"}
              </button>
            </div>

            {showDayDetail && dayDetailData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-muted/50 rounded-lg border-2 border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Weather Detail for {dayDetailData.monthName}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5 text-chart-1" />
                      <span className="font-semibold text-chart-1">Heat</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{dayDetailData.probabilities.heat}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{dayDetailData.details.heat}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CloudRain className="w-5 h-5 text-chart-2" />
                      <span className="font-semibold text-chart-2">Rain</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{dayDetailData.probabilities.rain}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{dayDetailData.details.rain}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-5 h-5 text-chart-4" />
                      <span className="font-semibold text-chart-4">Wind</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{dayDetailData.probabilities.wind}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{dayDetailData.details.wind}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Snowflake className="w-5 h-5 text-chart-3" />
                      <span className="font-semibold text-chart-3">Snow</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{dayDetailData.probabilities.snow}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{dayDetailData.details.snow}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Month Details */}
        {selectedMonth !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-8 mb-8 bg-card/95 backdrop-blur-sm shadow-2xl">
              <MonthDetail month={selectedMonth} weatherData={weatherData} onClose={() => setSelectedMonth(null)} />
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
