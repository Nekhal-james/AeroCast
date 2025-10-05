"use client"

import { useEffect, useRef } from "react"

interface MapSelectorProps {
  initialPosition: [number, number]
  onLocationSelect: (location: { lat: number; lng: number }) => void
}

export function MapSelector({ initialPosition, onLocationSelect }: MapSelectorProps) {
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const initMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      if (!containerRef.current || mapRef.current) return

      // Initialize map
      const map = L.map(containerRef.current).setView(initialPosition, 10)
      mapRef.current = map

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      // Custom marker icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: '<div style="background: #E45A92; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      // Add initial marker
      const marker = L.marker(initialPosition, { icon: customIcon }).addTo(map)
      markerRef.current = marker

      // Handle map clicks
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng
        marker.setLatLng([lat, lng])
        onLocationSelect({ lat, lng })
      })
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border-2 border-border" />
  )
}
