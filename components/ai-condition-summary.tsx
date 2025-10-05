"use client"

import { Sparkles, TrendingUp, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AiConditionSummaryProps {
  temperature: number
  rainfall: number
  windSpeed: number
  humidity: number
  aqi: number
  cloudCover: number
  confidence: number
  isFuture: boolean
}

export function AiConditionSummary({
  temperature,
  rainfall,
  windSpeed,
  humidity,
  aqi,
  cloudCover,
  confidence,
  isFuture,
}: AiConditionSummaryProps) {
  const generateSummary = () => {
    let tempDesc = "moderate"
    let rainDesc = ""
    let windDesc = ""
    let aqiDesc = ""

    // Temperature
    if (temperature > 35) tempDesc = "very hot"
    else if (temperature > 30) tempDesc = "hot"
    else if (temperature < 15) tempDesc = "very cold"
    else if (temperature < 20) tempDesc = "cold"
    else if (temperature >= 20 && temperature <= 28) tempDesc = "pleasant"

    // Rainfall
    if (rainfall > 60) rainDesc = ", with a high chance of rain"
    else if (rainfall > 30) rainDesc = ", with a moderate chance of rain"
    else if (rainfall > 10) rainDesc = ", with a slight chance of rain"
    else rainDesc = ", with clear skies expected"

    // Wind
    if (windSpeed > 30) windDesc = " and very windy conditions"
    else if (windSpeed > 20) windDesc = " and windy conditions"
    else if (windSpeed > 10) windDesc = " and mild winds"
    else windDesc = " and calm winds"

    // Air Quality
    if (aqi > 150) aqiDesc = " Air quality may feel very uncomfortable."
    else if (aqi > 100) aqiDesc = " Air quality may feel slightly uncomfortable."
    else if (aqi > 50) aqiDesc = " Air quality is moderate."
    else aqiDesc = " Air quality is good."

    return `The day is expected to be ${tempDesc}${rainDesc}${windDesc}.${aqiDesc}`
  }

  const getStatusBadges = () => {
    const badges = []

    if (temperature > 35) badges.push({ label: "Very Hot", color: "bg-red-500" })
    else if (temperature > 30) badges.push({ label: "Hot", color: "bg-orange-500" })
    else if (temperature < 15) badges.push({ label: "Very Cold", color: "bg-blue-500" })
    else if (temperature >= 20 && temperature <= 28) badges.push({ label: "Pleasant", color: "bg-green-500" })

    if (rainfall > 60) badges.push({ label: "Wet Day", color: "bg-blue-600" })
    else if (rainfall < 10) badges.push({ label: "Clear Sky", color: "bg-green-400" })

    if (windSpeed > 30) badges.push({ label: "Very Windy", color: "bg-teal-600" })

    if (aqi > 150) badges.push({ label: "Poor Air", color: "bg-gray-600" })
    else if (aqi < 50) badges.push({ label: "Good Air", color: "bg-green-500" })

    return badges
  }

  const badges = getStatusBadges()

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 border-2 border-purple-300/30 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">AI Weather Summary</h3>
            {isFuture && (
              <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full font-medium">
                Prediction
              </span>
            )}
          </div>
          <p className="text-foreground/90 leading-relaxed mb-4">{generateSummary()}</p>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`${badge.color} text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* Confidence Indicator */}
          {isFuture && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>AI Confidence</span>
                  <span className="font-semibold">{confidence}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
              {confidence > 80 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-orange-500" />
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
