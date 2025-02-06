import { LatLng } from "@/types"

export const calculatePolygonArea = (coordinates: LatLng[]): number => {
  if (coordinates.length < 3) return 0

  let area = 0
  const R = 6371 // Earth's radius in kilometers

  for (let i = 0; i < coordinates.length; i++) {
    const j = (i + 1) % coordinates.length
    const p1 = coordinates[i]
    const p2 = coordinates[j]

    area +=
      (p2.lng - p1.lng) *
      (2 + Math.sin(toRad(p1.lat)) + Math.sin(toRad(p2.lat)))
  }

  area = Math.abs((area * R * R) / 2)
  return Number(area.toFixed(2))
}

export const calculatePolygonCenter = (coordinates: LatLng[]): LatLng => {
  const length = coordinates.length
  if (length === 0) return { lat: 0, lng: 0 }

  const sumLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0)
  const sumLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0)

  return {
    lat: sumLat / length,
    lng: sumLng / length,
  }
}

const toRad = (deg: number): number => (deg * Math.PI) / 180
