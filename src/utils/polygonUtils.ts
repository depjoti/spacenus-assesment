
import { LatLngTuple } from "leaflet"
import { Polygon } from "../types/map.types"

export const calculatePolygonCenter = (
  coordinates: LatLngTuple[]
): LatLngTuple => {
  const lat =
    coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length
  const lng =
    coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length
  return [lat, lng]
}

export const calculatePolygonArea = (coordinates: LatLngTuple[]): number => {
  if (coordinates.length < 3) return 0

  const R = 6371 // Earth's radius in km
  let area = 0

  for (let i = 0; i < coordinates.length; i++) {
    const j = (i + 1) % coordinates.length
    const xi = (coordinates[i][1] * Math.PI) / 180
    const yi = (coordinates[i][0] * Math.PI) / 180
    const xj = (coordinates[j][1] * Math.PI) / 180
    const yj = (coordinates[j][0] * Math.PI) / 180

    area += (xj - xi) * (2 + Math.sin(yi) + Math.sin(yj))
  }

  area = Math.abs((area * R * R) / 2)
  return Math.round(area * 100) / 100 // Round to 2 decimal places
}

export const doPolygonsIntersect = (
  polygon1: LatLngTuple[],
  polygon2: LatLngTuple[]
): boolean => {
  // Check if any line segments intersect
  for (let i = 0; i < polygon1.length; i++) {
    const line1Start = polygon1[i]
    const line1End = polygon1[(i + 1) % polygon1.length]

    for (let j = 0; j < polygon2.length; j++) {
      const line2Start = polygon2[j]
      const line2End = polygon2[(j + 1) % polygon2.length]

      if (doLinesIntersect(line1Start, line1End, line2Start, line2End)) {
        return true
      }
    }
  }
  return false
}

const doLinesIntersect = (
  p1: LatLngTuple,
  p2: LatLngTuple,
  p3: LatLngTuple,
  p4: LatLngTuple
): boolean => {
  const det =
    (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p4[0] - p3[0]) * (p2[1] - p1[1])
  if (det === 0) return false

  const lambda =
    ((p4[1] - p3[1]) * (p4[0] - p1[0]) + (p3[0] - p4[0]) * (p4[1] - p1[1])) /
    det
  const gamma =
    ((p1[1] - p2[1]) * (p4[0] - p1[0]) + (p2[0] - p1[0]) * (p4[1] - p1[1])) /
    det

  return lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1
}

export const validateNewPolygon = (
  newPolygon: LatLngTuple[],
  existingPolygons: Record<string, Polygon>
): boolean => {
  return !Object.values(existingPolygons).some((polygon) =>
    doPolygonsIntersect(newPolygon, polygon.coordinates)
  )
}

export const exportPolygonsToJson = (
  polygons: Record<string, Polygon>
): string => {
  return JSON.stringify(polygons, null, 2)
}

export const importPolygonsFromJson = (
  jsonString: string
): Record<string, Polygon> => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    throw new Error("Invalid JSON format")
  }
}
