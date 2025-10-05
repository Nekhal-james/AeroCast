"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface WeatherChartProps {
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
      averages: {
        temperature: number
        rainfall: number
        windSpeed: number
        humidity: number
        cloudCover: number
        solarRadiation: number
      }
      isFuturePrediction?: boolean
      confidence?: number
    }>
  }
  onMonthSelect: (month: number) => void
  compareMode?: boolean
}

const COLORS = {
  heat: "#FF6B6B", // Red/Orange for temperature
  rain: "#4A90E2", // Blue for rainfall
  wind: "#1ABC9C", // Teal for wind
  snow: "#9B59B6", // Purple for snow
}

export function WeatherChart({ weatherData, onMonthSelect, compareMode = false }: WeatherChartProps) {
  const data = weatherData.monthlyForecasts.map((forecast) => ({
    month: forecast.monthName.split(" ")[0].substring(0, 3),
    monthNumber: forecast.month,
    heat: forecast.probabilities.heat,
    rain: forecast.probabilities.rain,
    wind: forecast.probabilities.wind,
    snow: forecast.probabilities.snow,
    expectedTemp: forecast.averages.temperature,
    expectedRain: forecast.averages.rainfall,
    expectedWind: forecast.averages.windSpeed,
    isFuture: forecast.isFuturePrediction,
    confidence: forecast.confidence,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isFuture = payload[0]?.payload?.isFuture
      const confidence = payload[0]?.payload?.confidence
      const expectedTemp = payload[0]?.payload?.expectedTemp
      const expectedRain = payload[0]?.payload?.expectedRain
      const expectedWind = payload[0]?.payload?.expectedWind

      return (
        <div className="bg-card/95 backdrop-blur-sm border-2 border-border rounded-lg p-4 shadow-xl">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {isFuture && <p className="text-xs text-accent mb-2">AI Prediction (Confidence: {confidence}%)</p>}

          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index}>
                <p className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}: {entry.value}%
                </p>
                {entry.dataKey === "heat" && (
                  <p className="text-xs text-muted-foreground ml-5">Expected: {expectedTemp}°C</p>
                )}
                {entry.dataKey === "rain" && (
                  <p className="text-xs text-muted-foreground ml-5">Expected: {expectedRain}mm</p>
                )}
                {entry.dataKey === "wind" && (
                  <p className="text-xs text-muted-foreground ml-5">Expected: {expectedWind} km/h</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <ChartContainer
      config={{
        heat: {
          label: "Temperature",
          color: COLORS.heat,
        },
        rain: {
          label: "Rainfall",
          color: COLORS.rain,
        },
        wind: {
          label: "Wind Speed",
          color: COLORS.wind,
        },
        snow: {
          label: "Snowfall",
          color: COLORS.snow,
        },
      }}
      className="h-[500px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          onClick={(e) => {
            if (e && e.activePayload && e.activePayload[0]) {
              const monthNum = e.activePayload[0].payload.monthNumber
              onMonthSelect(monthNum)
            }
          }}
        >
          <defs>
            <linearGradient id="colorHeat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.heat} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.heat} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.rain} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.rain} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.wind} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.wind} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorSnow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.snow} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.snow} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={1} opacity={0.3} />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--foreground))"
            fontSize={13}
            fontWeight={600}
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <YAxis
            domain={[0, 100]}
            stroke="hsl(var(--foreground))"
            fontSize={13}
            fontWeight={600}
            label={{
              value: "Probability (%)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "hsl(var(--foreground))", fontSize: 14, fontWeight: 600 },
            }}
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="rect"
            iconSize={16}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="heat"
            stroke={COLORS.heat}
            strokeWidth={3}
            fill="url(#colorHeat)"
            dot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--background))" }}
            activeDot={{ r: 8, cursor: "pointer", strokeWidth: 3 }}
            name="Temperature"
          />
          <Area
            type="monotone"
            dataKey="rain"
            stroke={COLORS.rain}
            strokeWidth={3}
            fill="url(#colorRain)"
            dot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--background))" }}
            activeDot={{ r: 8, cursor: "pointer", strokeWidth: 3 }}
            name="Rainfall"
          />
          <Area
            type="monotone"
            dataKey="wind"
            stroke={COLORS.wind}
            strokeWidth={3}
            fill="url(#colorWind)"
            dot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--background))" }}
            activeDot={{ r: 8, cursor: "pointer", strokeWidth: 3 }}
            name="Wind Speed"
          />
          <Area
            type="monotone"
            dataKey="snow"
            stroke={COLORS.snow}
            strokeWidth={3}
            fill="url(#colorSnow)"
            dot={{ r: 5, strokeWidth: 2, fill: "hsl(var(--background))" }}
            activeDot={{ r: 8, cursor: "pointer", strokeWidth: 3 }}
            name="Snowfall"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
