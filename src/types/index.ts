// src/types/index.ts
export interface LatLng {
  lat: number
  lng: number
}

export interface Polygon {
  id: string
  coordinates: LatLng[]
  fillColor: string
  strokeColor: string
  area?: number
  center?: LatLng
}

export interface PolygonState {
  polygons: Record<string, Polygon>
  selectedPolygonId: string | null
  error: string | null
}
