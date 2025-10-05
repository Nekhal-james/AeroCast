"use client"

import { Card } from "@/components/ui/card"
import { Thermometer, CloudRain, Wind, Droplets, Sun, Cloud } from "lucide-react"
import { motion } from "framer-motion"

interface MonthGridProps {
  monthlyForecasts: Array<{
    month: number
    monthName: string
    probabilities: {
      heat: number
      rain: number
      wind: number
      snow: number
    }
    averages: {
      temperature: number
      rainfall: number
      windSpeed: number
      humidity: number
      solarRadiation: number
      cloudCover: number
    }
    isFuturePrediction?: boolean
    confidence?: number
  }>
  onMonthClick: (month: number) => void
}

export function MonthGrid({ monthlyForecasts, onMonthClick }: MonthGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {monthlyForecasts.map((forecast, index) => (
        <motion.div
          key={forecast.month}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            className="p-4 bg-card/95 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer border-2 hover:border-accent/50 relative overflow-hidden group"
            onClick={() => onMonthClick(forecast.month)}
          >
            {forecast.isFuturePrediction && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-accent/20 rounded-full text-xs font-semibold text-accent">
                AI {forecast.confidence}%
              </div>
            )}
            <h3 className="text-lg font-bold text-foreground mb-3">{forecast.monthName.split(" ")[0]}</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-chart-1" />
                  <span className="text-xs text-muted-foreground">Temp</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{forecast.averages.temperature}°C</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-chart-2" />
                  <span className="text-xs text-muted-foreground">Rain</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{forecast.probabilities.rain}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-chart-4" />
                  <span className="text-xs text-muted-foreground">Wind</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{forecast.averages.windSpeed} km/h</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{forecast.averages.humidity}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs text-muted-foreground">Solar</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{forecast.averages.solarRadiation} W/m²</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-muted-foreground">Cloud</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{forecast.averages.cloudCover}%</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex gap-1">
                {[forecast.probabilities.heat, forecast.probabilities.rain, forecast.probabilities.wind].map(
                  (prob, i) => (
                    <div key={i} className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${prob}%`,
                          backgroundColor: `hsl(var(--chart-${i + 1}))`,
                        }}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
