"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MonthDetailProps {
  month: number
  weatherData: {
    monthlyForecasts: Array<{
      month: number
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
    }>
  }
  onClose: () => void
}

export function MonthDetail({ month, weatherData, onClose }: MonthDetailProps) {
  const monthData = weatherData.monthlyForecasts.find((m) => m.month === month)

  if (!monthData) return null

  const getDominantWeather = () => {
    const probabilities = [
      { type: "Heat", value: monthData.probabilities.heat, color: "chart-1" },
      { type: "Rain", value: monthData.probabilities.rain, color: "chart-2" },
      { type: "Wind", value: monthData.probabilities.wind, color: "chart-4" },
      { type: "Snow", value: monthData.probabilities.snow, color: "chart-3" },
    ]
    return probabilities.sort((a, b) => b.value - a.value)[0]
  }

  const dominant = getDominantWeather()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">Month {month} Details</h3>
          <p className="text-sm text-muted-foreground mt-1">{monthData.monthName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-muted">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Dominant Weather Pattern</h4>
            <p className="text-3xl font-bold text-accent">{dominant.type}</p>
            <p className="text-sm text-muted-foreground mt-1">{dominant.value}% probability</p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Heat Risk</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-chart-1 transition-all duration-500"
                  style={{
                    width: `${monthData.probabilities.heat}%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold">{monthData.probabilities.heat}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{monthData.details.heat}</p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Rain Risk</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-chart-2 transition-all duration-500"
                  style={{
                    width: `${monthData.probabilities.rain}%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold">{monthData.probabilities.rain}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{monthData.details.rain}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Wind Risk</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-chart-4 transition-all duration-500"
                  style={{
                    width: `${monthData.probabilities.wind}%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold">{monthData.probabilities.wind}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{monthData.details.wind}</p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">Snow Risk</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-chart-3 transition-all duration-500"
                  style={{
                    width: `${monthData.probabilities.snow}%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold">{monthData.probabilities.snow}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{monthData.details.snow}</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border border-accent/20">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Recommendations</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Monitor weather conditions closely during this period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Prepare for {dominant.type.toLowerCase()} conditions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Consider backup plans for outdoor activities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
