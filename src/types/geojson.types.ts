
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
}
