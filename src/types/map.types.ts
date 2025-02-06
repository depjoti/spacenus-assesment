// // src/types/map.types.ts
// import { LatLngTuple, LatLngExpression } from "leaflet"

// export interface Polygon {
//   id: string
//   coordinates: LatLngTuple[]
//   fillColor: string
//   borderColor: string
//   label: string
//   area: number
//   center: LatLngTuple
// }

// export interface MapState {
//   polygons: Record<string, Polygon>
//   selectedPolygonId: string | null
//   drawingMode: boolean
//   currentPolygon: LatLngTuple[] | null
//   searchQuery: string
//   mapCenter: LatLngTuple
//   mapZoom: number
// }

// export interface ValidationError {
//   message: string
//   polygonId?: string
// }
// src/types/map.types.ts
// export interface Polygon {
//   id: string
//   coordinates: [number, number][]
//   fillColor: string
//   borderColor: string
//   label: string
//   area: number
//   center: [number, number]
// }

// export interface MapState {
//   polygons: Record<string, Polygon>
//   selectedPolygonId: string | null
//   drawingMode: boolean
//   currentPolygon: [number, number][] | null
//   searchQuery: string
//   mapCenter: [number, number]
//   mapZoom: number
//   error: string | null
// }

// export interface GeoJSONFeature {
//   type: "Feature"
//   properties: {
//     FID: string
//     Name: string
//     LFlaeche: number
//     [key: string]: any
//   }
//   geometry: {
//     type: "Polygon"
//     coordinates: number[][][]
//   }
// }

// export interface GeoJSONData {
//   type: "FeatureCollection"
//   features: GeoJSONFeature[]
//   [key: string]: any
// }

// export interface ValidationError {
//   message: string
//   polygonId?: string
// }

// src/types/map.types.ts
export interface FieldProperties {
  Betriebsnr: number
  FID: string
  FSNr: number
  Name: string
  Jahr: number
  Land: number
  LFlaeche: number
  Einstufung: string
  Nitratbela: null | string
  CCWasser: number
  CCWind: number
}

export interface GeoJSONFeature {
  type: "Feature"
  properties: FieldProperties
  geometry: {
    type: "Polygon"
    coordinates: number[][][]
  }
}

export interface GeoJSONData {
  type: "FeatureCollection"
  name: string
  crs: {
    type: string
    properties: {
      name: string
    }
  }
  features: GeoJSONFeature[]
}

export interface MapState {
  fields: Record<string, GeoJSONFeature>
  selectedFieldId: string | null
  mapCenter: [number, number]
  mapZoom: number
  searchQuery: string
  drawingMode: boolean
  currentPolygon: [number, number][] | null
}

export interface Polygon {
  id: string
  coordinates: [number, number][]
  label: string
  area: number
}
