
export interface LatLng {
  lat: number
  lng: number
}

export interface Polygon {
  id: string
  label?: string
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

export interface MapState {
  center: LatLng
  zoom: number
}
