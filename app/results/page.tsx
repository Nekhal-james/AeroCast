"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { AnimatedBackButton } from "@/components/animated-back-button"
import { AnimatedActionButton } from "@/components/animated-action-button"
import { Loader } from "@/components/loader"
import { WeatherChart } from "@/components/weather-chart"
import { AiConditionSummary } from "@/components/ai-condition-summary"
import { CloudRain, Thermometer, Wind, Sun, Droplets, Cloud, Calendar, Sparkles } from "lucide-react"

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
  averages: {
    temperature: number
    rainfall: number
    windSpeed: number
    humidity: number
    cloudCover: number
    solarRadiation: number
  }
  isFuturePrediction: boolean
  confidence: number
}

interface WeatherData {
  location: { lat: number; lon: number }
  startDate: string
  monthlyForecasts: MonthlyForecast[]
}

function ResultsContent() {
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
  const [showFilters, setShowFilters] = useState(false)

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
        setError(
          "Failed to fetch weather data. Please ensure:\n1. Backend server is running on port 3001\n2. Run 'cd backend && npm start' to start the server",
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [lat, lng, date])

  const fetchDayDetail = async () => {
    if (!selectedDayDate || !lat || !lng) return

    setIsDayLoading(true)
    setShowDayDetail(false)
    setDayDetailData(null)

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

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setFullYear(today.getFullYear() + 1)
  const maxDateString = maxDate.toISOString().split("T")[0]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center">
        <div className="text-center space-y-6">
          <Loader />
          <p className="text-white text-xl">Analyzing weather data with AI...</p>
          <p className="text-white/60 text-sm">Processing NASA historical records and generating predictions</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center">
          <p className="text-destructive mb-4 whitespace-pre-line">{error}</p>
          <AnimatedBackButton onClick={() => router.push("/")} />
        </Card>
      </div>
    )
  }

  if (!weatherData) {
    return null
  }

  const firstMonth = weatherData.monthlyForecasts[0]
  const isFuturePrediction = firstMonth.isFuturePrediction || false
  const confidence = firstMonth.confidence || 95

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">AEROCAST</h1>
            <p className="text-white/80">
              Weather Analysis for {weatherData.location.lat.toFixed(4)}, {weatherData.location.lon.toFixed(4)}
            </p>
            <p className="text-white/60 text-sm mt-1 flex items-center gap-2">
              {isFuturePrediction && <Sparkles className="w-4 h-4" />}
              {isFuturePrediction ? "AI Prediction" : "Historical Analysis"} • Starting from {weatherData.startDate}
            </p>
          </div>
          <div className="flex gap-2">
            <AnimatedActionButton text="Filters" onClick={() => setShowFilters(!showFilters)} />
            <AnimatedActionButton text="Export" onClick={exportData} />
            <AnimatedBackButton onClick={() => router.push("/")} />
          </div>
        </header>

        {/* AI Condition Summary */}
        <div className="mb-8 animate-fade-in">
          <AiConditionSummary
            temperature={firstMonth.averages.temperature}
            rainfall={firstMonth.probabilities.rain}
            windSpeed={firstMonth.averages.windSpeed}
            humidity={firstMonth.averages.humidity}
            aqi={100 - firstMonth.averages.cloudCover}
            cloudCover={firstMonth.averages.cloudCover}
            confidence={confidence}
            isFuture={isFuturePrediction}
          />
        </div>

        {/* Main Chart */}
        <Card className="p-8 mb-8 bg-card/95 backdrop-blur-sm shadow-2xl animate-scale-in border-2 border-purple-300/30">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">10-Month Weather Forecast</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Colorful multi-variable visualization with gradient fills
          </p>
          <WeatherChart weatherData={weatherData} onMonthSelect={setSelectedMonth} />
        </Card>

        {/* Single Day Detail View */}
        <Card className="p-8 mb-8 bg-card/95 backdrop-blur-sm shadow-2xl animate-fade-in border-2 border-purple-300/30">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-foreground">Single Day Detail View</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Select a specific date to view detailed weather probability with AI predictions
          </p>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDayDate}
                onChange={(e) => setSelectedDayDate(e.target.value)}
                max={maxDateString}
                className="w-full px-4 py-3 text-base rounded-lg border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <AnimatedActionButton
              text="View Detail"
              onClick={fetchDayDetail}
              disabled={!selectedDayDate || isDayLoading}
            />
          </div>

          {isDayLoading && (
            <div className="mt-6 p-12 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-lg border-2 border-purple-300/30 flex flex-col items-center justify-center">
              <Loader />
              <p className="text-foreground mt-4 text-sm">Loading detailed weather data...</p>
            </div>
          )}

          {showDayDetail && dayDetailData && !isDayLoading && (
            <div className="mt-6 p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-lg border-2 border-purple-300/30 animate-slide-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">Weather Detail for {dayDetailData.monthName}</h3>
                {dayDetailData.isFuturePrediction && (
                  <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Prediction ({dayDetailData.confidence}% confidence)
                  </span>
                )}
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-card rounded-xl border-2 border-orange-300/30 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-500">Temperature</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{dayDetailData.averages.temperature}°C</p>
                  <p className="text-xs text-muted-foreground mt-1">Average expected</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                        style={{ width: `${dayDetailData.probabilities.heat}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-orange-500">{dayDetailData.probabilities.heat}%</span>
                  </div>
                </div>

                <div className="p-4 bg-card rounded-xl border-2 border-blue-300/30 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-blue-500">Rainfall</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{dayDetailData.averages.rainfall}mm</p>
                  <p className="text-xs text-muted-foreground mt-1">Average expected</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                        style={{ width: `${dayDetailData.probabilities.rain}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-blue-500">{dayDetailData.probabilities.rain}%</span>
                  </div>
                </div>

                <div className="p-4 bg-card rounded-xl border-2 border-teal-300/30 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-teal-500" />
                    <span className="font-semibold text-teal-500">Wind Speed</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{dayDetailData.averages.windSpeed} km/h</p>
                  <p className="text-xs text-muted-foreground mt-1">Average expected</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
                        style={{ width: `${dayDetailData.probabilities.wind}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-teal-500">{dayDetailData.probabilities.wind}%</span>
                  </div>
                </div>

                <div className="p-4 bg-card rounded-xl border-2 border-yellow-300/30 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-500">Solar Radiation</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{dayDetailData.averages.solarRadiation} W/m²</p>
                  <p className="text-xs text-muted-foreground mt-1">Average expected</p>
                </div>

                <div className="p-4 bg-card rounded-xl border-2 border-purple-300/30 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-purple-500">Humidity</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{dayDetailData.averages.humidity}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Average expected</p>
                </div>

                <div className="p-4 bg-card rounded-xl border-2 border-gray-300/30 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold text-gray-500">Cloud Cover</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{dayDetailData.averages.cloudCover}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Average expected</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Summary Tiles with Colorful Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <Card className="p-6 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 border-orange-300/30 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Thermometer className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Temperature</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{firstMonth.averages.temperature}°C</p>
            <p className="text-sm text-white/90">Average expected</p>
            <p className="text-xs text-white/80 mt-2">Heat probability: {firstMonth.probabilities.heat}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 border-blue-300/30 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <CloudRain className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Rainfall</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{firstMonth.averages.rainfall}mm</p>
            <p className="text-sm text-white/90">Average expected</p>
            <p className="text-xs text-white/80 mt-2">Rain probability: {firstMonth.probabilities.rain}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-teal-500 via-green-500 to-emerald-500 border-teal-300/30 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Wind className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Wind Speed</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{firstMonth.averages.windSpeed} km/h</p>
            <p className="text-sm text-white/90">Average expected</p>
            <p className="text-xs text-white/80 mt-2">Wind probability: {firstMonth.probabilities.wind}%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 border-yellow-300/30 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Solar Radiation</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{firstMonth.averages.solarRadiation} W/m²</p>
            <p className="text-sm text-white/90">Average expected</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 border-purple-300/30 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Humidity</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{firstMonth.averages.humidity}%</p>
            <p className="text-sm text-white/90">Average expected</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-gray-500 via-slate-500 to-zinc-500 border-gray-300/30 shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Cloud className="w-8 h-8 text-white" />
              <h3 className="text-lg font-semibold text-white">Cloud Cover</h3>
            </div>
            <p className="text-4xl font-bold text-white mb-2">{firstMonth.averages.cloudCover}%</p>
            <p className="text-sm text-white/90">Average expected</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
