// src/utils/validation.ts
import { Polygon, ValidationError } from "@/types"

export const validatePolygon = (
  newPolygon: Polygon,
  existingPolygons: Polygon[]
): void => {
  // Check if polygon has at least 3 points
  if (newPolygon.coordinates.length < 3) {
    throw {
      type: "INVALID_SHAPE",
      message: "Polygon must have at least 3 points",
    } as ValidationError
  }

  // Check for self-intersection
  if (hasSelfIntersection(newPolygon.coordinates)) {
    throw {
      type: "INTERSECTION",
      message: "Polygon cannot intersect itself",
    } as ValidationError
  }

  // Check for overlap with existing polygons
  for (const polygon of existingPolygons) {
    if (polygonsOverlap(newPolygon.coordinates, polygon.coordinates)) {
      throw {
        type: "OVERLAP",
        message: "Polygon cannot overlap with existing polygons",
      } as ValidationError
    }
  }
}

const hasSelfIntersection = (
  coordinates: { lat: number; lng: number }[]
): boolean => {
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 2; j < coordinates.length; j++) {
      if (i === 0 && j === coordinates.length - 1) continue

      const line1Start = coordinates[i]
      const line1End = coordinates[(i + 1) % coordinates.length]
      const line2Start = coordinates[j]
      const line2End = coordinates[(j + 1) % coordinates.length]

      if (linesIntersect(line1Start, line1End, line2Start, line2End)) {
        return true
      }
    }
  }
  return false
}

const linesIntersect = (
  line1Start: { lat: number; lng: number },
  line1End: { lat: number; lng: number },
  line2Start: { lat: number; lng: number },
  line2End: { lat: number; lng: number }
): boolean => {
  const det =
    (line1End.lng - line1Start.lng) * (line2End.lat - line2Start.lat) -
    (line2End.lng - line2Start.lng) * (line1End.lat - line1Start.lat)

  if (det === 0) return false

  const lambda =
    ((line2End.lat - line2Start.lat) * (line2End.lng - line1Start.lng) +
      (line2Start.lng - line2End.lng) * (line2End.lat - line1Start.lat)) /
    det
  const gamma =
    ((line1Start.lat - line1End.lat) * (line2End.lng - line1Start.lng) +
      (line1End.lng - line1Start.lng) * (line2End.lat - line1Start.lat)) /
    det

  return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
}

const polygonsOverlap = (
  coords1: { lat: number; lng: number }[],
  coords2: { lat: number; lng: number }[]
): boolean => {
  // Check if any line segments intersect
  for (let i = 0; i < coords1.length; i++) {
    for (let j = 0; j < coords2.length; j++) {
      const line1Start = coords1[i]
      const line1End = coords1[(i + 1) % coords1.length]
      const line2Start = coords2[j]
      const line2End = coords2[(j + 1) % coords2.length]

      if (linesIntersect(line1Start, line1End, line2Start, line2End)) {
        return true
      }
    }
  }

  // Check if one polygon is completely inside the other
  return (
    isPointInPolygon(coords1[0], coords2) ||
    isPointInPolygon(coords2[0], coords1)
  )
}

const isPointInPolygon = (
  point: { lat: number; lng: number },
  polygon: { lat: number; lng: number }[]
): boolean => {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng
    const yi = polygon[i].lat
    const xj = polygon[j].lng
    const yj = polygon[j].lat

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}
