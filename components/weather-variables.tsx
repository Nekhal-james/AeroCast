"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Cloud, CloudRain, Thermometer, Wind, Droplets, Sun } from "lucide-react"

interface WeatherVariable {
  id: string
  label: string
  icon: React.ReactNode
  description: string
}

const weatherVariables: WeatherVariable[] = [
  {
    id: "temperature",
    label: "Temperature",
    icon: <Thermometer className="h-5 w-5" />,
    description: "Daily temperature patterns",
  },
  {
    id: "precipitation",
    label: "Precipitation",
    icon: <CloudRain className="h-5 w-5" />,
    description: "Rainfall probability",
  },
  {
    id: "humidity",
    label: "Humidity",
    icon: <Droplets className="h-5 w-5" />,
    description: "Moisture levels",
  },
  {
    id: "wind",
    label: "Wind Speed",
    icon: <Wind className="h-5 w-5" />,
    description: "Wind patterns",
  },
  {
    id: "cloud_cover",
    label: "Cloud Cover",
    icon: <Cloud className="h-5 w-5" />,
    description: "Sky conditions",
  },
  {
    id: "solar_radiation",
    label: "Solar Radiation",
    icon: <Sun className="h-5 w-5" />,
    description: "Sunlight intensity",
  },
]

interface WeatherVariablesProps {
  selectedVariables: string[]
  onVariablesChange: (variables: string[]) => void
}

export function WeatherVariables({ selectedVariables, onVariablesChange }: WeatherVariablesProps) {
  const handleToggle = (variableId: string) => {
    if (selectedVariables.includes(variableId)) {
      onVariablesChange(selectedVariables.filter((id) => id !== variableId))
    } else {
      onVariablesChange([...selectedVariables, variableId])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {weatherVariables.map((variable) => (
        <Card
          key={variable.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
            selectedVariables.includes(variable.id) ? "border-accent bg-accent/5" : "border-border"
          }`}
          onClick={() => handleToggle(variable.id)}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              id={variable.id}
              checked={selectedVariables.includes(variable.id)}
              onCheckedChange={() => handleToggle(variable.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-accent">{variable.icon}</div>
                <Label htmlFor={variable.id} className="font-semibold cursor-pointer">
                  {variable.label}
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">{variable.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
