"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, MapPin, Download, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface LocationData {
  name: string
  lat: number
  lng: number
  avgHeat: number
  avgRain: number
  avgWind: number
  avgSnow: number
}

export default function InsightsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<"1m" | "3m" | "6m" | "1y">("3m")
  const [isLoading, setIsLoading] = useState(false)

  // Mock historical trend data
  const historicalTrends = [
    { month: "Jan", heat: 45, rain: 65, wind: 55, snow: 75 },
    { month: "Feb", heat: 48, rain: 62, wind: 58, snow: 70 },
    { month: "Mar", heat: 52, rain: 58, wind: 52, snow: 55 },
    { month: "Apr", heat: 58, rain: 55, wind: 48, snow: 35 },
    { month: "May", heat: 65, rain: 52, wind: 45, snow: 15 },
    { month: "Jun", heat: 72, rain: 48, wind: 42, snow: 5 },
  ]

  // Mock comparison data for different locations
  const locationComparison: LocationData[] = [
    { name: "Location A", lat: 9.84, lng: 77.16, avgHeat: 65, avgRain: 55, avgWind: 45, avgSnow: 25 },
    { name: "Location B", lat: 10.5, lng: 76.2, avgHeat: 58, avgRain: 62, avgWind: 52, avgSnow: 35 },
    { name: "Location C", lat: 11.2, lng: 75.8, avgHeat: 62, avgRain: 58, avgWind: 48, avgSnow: 28 },
  ]

  // Mock anomaly detection data
  const anomalies = [
    {
      type: "heat",
      severity: "high",
      message: "Unusually high heat probability detected in upcoming months",
      probability: 78,
    },
    {
      type: "rain",
      severity: "medium",
      message: "Above-average rainfall expected compared to historical data",
      probability: 65,
    },
  ]

  // Radar chart data for weather pattern analysis
  const weatherPatternData = [
    { variable: "Heat", current: 65, historical: 58 },
    { variable: "Rain", current: 55, historical: 62 },
    { variable: "Wind", current: 45, historical: 48 },
    { variable: "Snow", current: 25, historical: 35 },
    { variable: "Humidity", current: 70, historical: 65 },
  ]

  // Statistical insights
  const statistics = [
    { label: "Avg Heat Increase", value: "+7%", trend: "up", color: "text-chart-1" },
    { label: "Rainfall Decrease", value: "-11%", trend: "down", color: "text-chart-2" },
    { label: "Wind Stability", value: "±3%", trend: "stable", color: "text-chart-4" },
    { label: "Snow Reduction", value: "-29%", trend: "down", color: "text-chart-3" },
  ]

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      timeRange: selectedTimeRange,
      historicalTrends,
      locationComparison,
      anomalies,
      statistics,
    }
    const dataStr = JSON.stringify(report, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `aerocast-insights-${new Date().toISOString().split("T")[0]}.json`
    link.click()
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
            <h1 className="text-4xl font-bold text-white mb-2">Weather Insights & Trends</h1>
            <p className="text-white/80">Advanced analytics and historical comparisons</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.header>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-4 bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-semibold text-foreground">Time Range:</span>
              <div className="flex gap-2">
                {(["1m", "3m", "6m", "1y"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedTimeRange === range
                        ? "bg-accent text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {range === "1m" && "1 Month"}
                    {range === "3m" && "3 Months"}
                    {range === "6m" && "6 Months"}
                    {range === "1y" && "1 Year"}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statistics.map((stat, index) => (
            <Card key={index} className="p-6 bg-card/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                {stat.trend === "up" && <TrendingUp className="w-5 h-5 text-chart-1" />}
                {stat.trend === "down" && <TrendingDown className="w-5 h-5 text-chart-2" />}
                {stat.trend === "stable" && <div className="w-5 h-0.5 bg-muted-foreground" />}
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </motion.div>

        {/* Anomaly Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Weather Anomalies Detected</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anomalies.map((anomaly, index) => (
              <Card
                key={index}
                className={`p-6 border-2 ${
                  anomaly.severity === "high"
                    ? "border-destructive/50 bg-destructive/10"
                    : "border-accent/50 bg-accent/10"
                } backdrop-blur-sm`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-6 h-6 flex-shrink-0 ${
                      anomaly.severity === "high" ? "text-destructive" : "text-accent"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground capitalize">{anomaly.type} Alert</span>
                      <span className="text-sm font-bold text-foreground">{anomaly.probability}%</span>
                    </div>
                    <p className="text-sm text-foreground/80">{anomaly.message}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Historical Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-8 bg-card/95 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Historical Weather Trends</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="heat" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Heat" />
                <Line type="monotone" dataKey="rain" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Rain" />
                <Line type="monotone" dataKey="wind" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Wind" />
                <Line type="monotone" dataKey="snow" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Snow" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Weather Pattern Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="p-8 bg-card/95 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Weather Pattern Analysis</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={weatherPatternData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="variable" stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                  <Radar
                    name="Current Period"
                    dataKey="current"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Historical Average"
                    dataKey="historical"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Location Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="p-8 bg-card/95 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Location Comparison</h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={locationComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="avgHeat" fill="hsl(var(--chart-1))" name="Heat" />
                <Bar dataKey="avgRain" fill="hsl(var(--chart-2))" name="Rain" />
                <Bar dataKey="avgWind" fill="hsl(var(--chart-4))" name="Wind" />
                <Bar dataKey="avgSnow" fill="hsl(var(--chart-3))" name="Snow" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="p-8 bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm border-accent/30">
            <h2 className="text-2xl font-semibold text-foreground mb-4">AI-Powered Recommendations</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-foreground/90">
                  Based on historical patterns, heat probability is trending upward. Consider planning outdoor
                  activities during early morning or evening hours.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-foreground/90">
                  Rainfall patterns show a decreasing trend. Water conservation measures may be advisable for the
                  upcoming months.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-foreground/90">
                  Snow probability has significantly decreased compared to historical averages, indicating warmer winter
                  conditions.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
