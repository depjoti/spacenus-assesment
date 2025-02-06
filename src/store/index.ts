// // src/types/index.ts

// export interface LatLng {
//   lat: number
//   lng: number
// }

// export interface Polygon {
//   id: string
//   coordinates: LatLng[]
//   fillColor: string
//   strokeColor: string
//   label?: string
//   area?: number
//   center?: LatLng
// }

// export interface PolygonState {
//   polygons: Record<string, Polygon>
//   selectedPolygonId: string | null
//   error: string | null
// }

// export interface MapState {
//   center: LatLng
//   zoom: number
//   drawingMode: boolean
// }

// export type ValidationError = {
//   message: string
//   type: "OVERLAP" | "INTERSECTION" | "INVALID_SHAPE"
// }
// src/types/index.ts
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
