"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface WeatherFilterProps {
  filters: {
    showHeat: boolean
    showRain: boolean
    showWind: boolean
    showSnow: boolean
    minProbability: number
  }
  onFilterChange: (filters: any) => void
}

export function WeatherFilter({ filters, onFilterChange }: WeatherFilterProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Filter Data</h3>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold mb-3 block">Weather Variables</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="heat-toggle" className="text-sm">
                Heat
              </Label>
              <Switch
                id="heat-toggle"
                checked={filters.showHeat}
                onCheckedChange={(checked) => onFilterChange({ ...filters, showHeat: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="rain-toggle" className="text-sm">
                Rain
              </Label>
              <Switch
                id="rain-toggle"
                checked={filters.showRain}
                onCheckedChange={(checked) => onFilterChange({ ...filters, showRain: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="wind-toggle" className="text-sm">
                Wind
              </Label>
              <Switch
                id="wind-toggle"
                checked={filters.showWind}
                onCheckedChange={(checked) => onFilterChange({ ...filters, showWind: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="snow-toggle" className="text-sm">
                Snow
              </Label>
              <Switch
                id="snow-toggle"
                checked={filters.showSnow}
                onCheckedChange={(checked) => onFilterChange({ ...filters, showSnow: checked })}
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-semibold mb-3 block">Minimum Probability: {filters.minProbability}%</Label>
          <Slider
            value={[filters.minProbability]}
            onValueChange={(value) => onFilterChange({ ...filters, minProbability: value[0] })}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Only show months where at least one variable exceeds this threshold
          </p>
        </div>
      </div>
    </Card>
  )
}
