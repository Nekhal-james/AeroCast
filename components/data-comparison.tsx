"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ComparisonData {
  month: string
  heat: number
  rain: number
  wind: number
  snow: number
}

interface DataComparisonProps {
  data: ComparisonData[]
}

export function DataComparison({ data }: DataComparisonProps) {
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])

  const toggleMonth = (index: number) => {
    if (selectedMonths.includes(index)) {
      setSelectedMonths(selectedMonths.filter((i) => i !== index))
    } else if (selectedMonths.length < 3) {
      setSelectedMonths([...selectedMonths, index])
    }
  }

  const getTrend = (current: number, previous: number) => {
    if (current > previous + 5) return <TrendingUp className="w-4 h-4 text-destructive" />
    if (current < previous - 5) return <TrendingDown className="w-4 h-4 text-green-500" />
    return <Minus className="w-4 h-4 text-muted-foreground" />
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Month-to-Month Comparison</h3>
      <p className="text-sm text-muted-foreground mb-4">Select up to 3 months to compare</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {data.map((month, index) => (
          <Button
            key={index}
            variant={selectedMonths.includes(index) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleMonth(index)}
            disabled={!selectedMonths.includes(index) && selectedMonths.length >= 3}
          >
            {month.month}
          </Button>
        ))}
      </div>

      {selectedMonths.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Variable</th>
                {selectedMonths.map((index) => (
                  <th key={index} className="text-center py-3 px-4 font-semibold text-foreground">
                    {data[index].month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">Heat</td>
                {selectedMonths.map((index, i) => (
                  <td key={index} className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-chart-1">{data[index].heat}%</span>
                      {i > 0 && getTrend(data[index].heat, data[selectedMonths[i - 1]].heat)}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">Rain</td>
                {selectedMonths.map((index, i) => (
                  <td key={index} className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-chart-2">{data[index].rain}%</span>
                      {i > 0 && getTrend(data[index].rain, data[selectedMonths[i - 1]].rain)}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-foreground">Wind</td>
                {selectedMonths.map((index, i) => (
                  <td key={index} className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-chart-4">{data[index].wind}%</span>
                      {i > 0 && getTrend(data[index].wind, data[selectedMonths[i - 1]].wind)}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-foreground">Snow</td>
                {selectedMonths.map((index, i) => (
                  <td key={index} className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-chart-3">{data[index].snow}%</span>
                      {i > 0 && getTrend(data[index].snow, data[selectedMonths[i - 1]].snow)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
