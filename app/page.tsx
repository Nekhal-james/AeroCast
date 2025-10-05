"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { AnimatedButton } from "@/components/animated-button"
import { Card } from "@/components/ui/card"
import { Loader } from "@/components/loader"
import { LocationSearch } from "@/components/location-search"
import { WeatherVariables } from "@/components/weather-variables"
import { MapPin, Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"

const MapSelector = dynamic(() => import("@/components/map-selector").then((mod) => mod.MapSelector), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border-2 border-border bg-muted flex items-center justify-center">
      <Loader />
    </div>
  ),
})

export default function HomePage() {
  const router = useRouter()
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 9.84,
    lng: 77.16,
  })
  const [locationName, setLocationName] = useState<string>("Selected Location")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedVariables, setSelectedVariables] = useState<string[]>(["temperature", "precipitation"])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const handleLocationSelect = (loc: { lat: number; lng: number; name?: string }) => {
    setLocation({ lat: loc.lat, lng: loc.lng })
    if (loc.name) {
      setLocationName(loc.name)
    }
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setIsGettingLocation(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setLocation({ lat: latitude, lng: longitude })
        setLocationName("Current Location")
        setIsGettingLocation(false)
      },
      (error) => {
        console.error("[v0] Error getting location:", error)
        setIsGettingLocation(false)

        let errorMessage = "Unable to retrieve your location"
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location access denied. Please enable location permissions in your browser."
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable."
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out."
        }

        alert(errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  const handleAnalyze = () => {
    if (!selectedDate) {
      alert("Please select a date to analyze weather patterns")
      return
    }

    if (selectedVariables.length === 0) {
      alert("Please select at least one weather variable")
      return
    }

    setIsAnalyzing(true)
    const url = `/results?lat=${location.lat}&lng=${location.lng}&date=${selectedDate}&variables=${selectedVariables.join(",")}`

    setTimeout(() => {
      router.push(url)
    }, 300)
  }

  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setFullYear(today.getFullYear() + 1)
  const maxDateString = maxDate.toISOString().split("T")[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight text-balance">AEROCAST</h1>
          <p className="text-xl text-white/80 text-pretty">AI-Powered Weather Probability Analysis</p>
        </header>

        <Card className="max-w-4xl mx-auto p-8 bg-card/95 backdrop-blur-sm shadow-2xl animate-scale-in">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-foreground">Search Location</h2>
                <Button
                  onClick={handleUseCurrentLocation}
                  disabled={isGettingLocation}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  {isGettingLocation ? (
                    <>
                      <Loader />
                      <span>Getting location...</span>
                    </>
                  ) : (
                    <>
                      <Crosshair className="h-4 w-4" />
                      <span>Use Current Location</span>
                    </>
                  )}
                </Button>
              </div>
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>

            {/* Map Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Select Location on Map</h2>
              <MapSelector initialPosition={[location.lat, location.lng]} onLocationSelect={handleLocationSelect} />
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                <MapPin className="h-4 w-4 text-purple-500" />
                <span className="font-medium">{locationName}</span>
              </div>
            </div>

            {/* Date Picker Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Select Date</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                }}
                max={maxDateString}
                className="w-full px-6 py-4 text-lg rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <p className="text-xs text-muted-foreground">
                Select past dates for historical analysis or future dates (up to 1 year) for AI predictions
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-1">Select Weather Variables</h2>
                <p className="text-sm text-muted-foreground">Choose the weather parameters you want to analyze</p>
              </div>
              <WeatherVariables selectedVariables={selectedVariables} onVariablesChange={setSelectedVariables} />
            </div>

            {/* Location Info */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">Coordinates:</span> {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </div>
              {selectedDate && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">Date:</span> {selectedDate}
                </div>
              )}
              {selectedVariables.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">Variables:</span> {selectedVariables.length} selected
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center pt-4">
              {isAnalyzing ? (
                <div className="flex items-center gap-3">
                  <Loader />
                  <span className="text-foreground">Preparing analysis...</span>
                </div>
              ) : (
                <AnimatedButton onClick={handleAnalyze} text="ANALYZE" />
              )}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-12 text-white/60 text-sm animate-fade-in">
          Powered by NASA Earthdata • AI Predictions • Historical Analysis 1985-2024
        </footer>
      </div>
    </div>
  )
}
