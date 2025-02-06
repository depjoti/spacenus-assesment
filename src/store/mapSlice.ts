// // src/store/mapSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { MapState, Polygon } from "../types/map.types"
// import {
//   calculatePolygonCenter,
//   calculatePolygonArea,
// } from "../utils/polygonUtils"

// const initialState: MapState = {
//   polygons: {},
//   selectedPolygonId: null,
//   drawingMode: false,
//   currentPolygon: null,
//   searchQuery: "",
//   mapCenter: [51.505, -0.09],
//   mapZoom: 13,
// }

// const mapSlice = createSlice({
//   name: "map",
//   initialState,
//   reducers: {
//     addPolygon: (
//       state,
//       action: PayloadAction<Omit<Polygon, "center" | "area">>
//     ) => {
//       const center = calculatePolygonCenter(action.payload.coordinates)
//       const area = calculatePolygonArea(action.payload.coordinates)
//       state.polygons[action.payload.id] = {
//         ...action.payload,
//         center,
//         area,
//       }
//     },
//     updatePolygon: (
//       state,
//       action: PayloadAction<Partial<Polygon> & { id: string }>
//     ) => {
//       if (state.polygons[action.payload.id]) {
//         state.polygons[action.payload.id] = {
//           ...state.polygons[action.payload.id],
//           ...action.payload,
//         }
//       }
//     },
//     deletePolygon: (state, action: PayloadAction<string>) => {
//       delete state.polygons[action.payload]
//       if (state.selectedPolygonId === action.payload) {
//         state.selectedPolygonId = null
//       }
//     },
//     setSelectedPolygon: (state, action: PayloadAction<string | null>) => {
//       state.selectedPolygonId = action.payload
//     },
//     setDrawingMode: (state, action: PayloadAction<boolean>) => {
//       state.drawingMode = action.payload
//     },
//     setCurrentPolygon: (state, action: PayloadAction<LatLngTuple[] | null>) => {
//       state.currentPolygon = action.payload
//     },
//     setSearchQuery: (state, action: PayloadAction<string>) => {
//       state.searchQuery = action.payload
//     },
//     setMapCenter: (state, action: PayloadAction<LatLngTuple>) => {
//       state.mapCenter = action.payload
//     },
//     setMapZoom: (state, action: PayloadAction<number>) => {
//       state.mapZoom = action.payload
//     },
//     importPolygons: (state, action: PayloadAction<Record<string, Polygon>>) => {
//       state.polygons = action.payload
//     },
//   },
// })

// export const {
//   addPolygon,
//   updatePolygon,
//   deletePolygon,
//   setSelectedPolygon,
//   setDrawingMode,
//   setCurrentPolygon,
//   setSearchQuery,
//   setMapCenter,
//   setMapZoom,
//   importPolygons,
// } = mapSlice.actions

// export default mapSlice.reducer
// src/store/mapSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { MapState, GeoJSONFeature, GeoJSONData } from "../types/geojson.types"

// const initialState: MapState = {
//   fields: {},
//   selectedFieldId: null,
//   mapCenter: [48.35117, 12.54524], // Centered on example coordinates
//   mapZoom: 16,
//   searchQuery: "",
// }

// const mapSlice = createSlice({
//   name: "map",
//   initialState,
//   reducers: {
//     importGeoJSON: (state, action: PayloadAction<GeoJSONData>) => {
//       const fields: Record<string, GeoJSONFeature> = {}
//       action.payload.features.forEach((feature) => {
//         fields[feature.properties.FID] = feature
//       })
//       state.fields = fields
//     },
//     setSelectedField: (state, action: PayloadAction<string | null>) => {
//       state.selectedFieldId = action.payload
//     },
//     updateFieldProperties: (
//       state,
//       action: PayloadAction<{
//         id: string
//         properties: Partial<GeoJSONFeature["properties"]>
//       }>
//     ) => {
//       const field = state.fields[action.payload.id]
//       if (field) {
//         field.properties = {
//           ...field.properties,
//           ...action.payload.properties,
//         }
//       }
//     },
//     setMapCenter: (state, action: PayloadAction<[number, number]>) => {
//       state.mapCenter = action.payload
//     },
//     setMapZoom: (state, action: PayloadAction<number>) => {
//       state.mapZoom = action.payload
//     },
//     setSearchQuery: (state, action: PayloadAction<string>) => {
//       state.searchQuery = action.payload
//     },
//   },
// })

// export const {
//   importGeoJSON,
//   setSelectedField,
//   updateFieldProperties,
//   setMapCenter,
//   setMapZoom,
//   setSearchQuery,
// } = mapSlice.actions

// export default mapSlice.reducer

// src/store/mapSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { MapState, GeoJSONFeature, GeoJSONData } from "../types/geojson.types"

// const initialState: MapState = {
//   fields: {},
//   selectedFieldId: null,
//   mapCenter: [48.35117, 12.54524],
//   mapZoom: 16,
//   searchQuery: "",
// }

// export const mapSlice = createSlice({
//   name: "map",
//   initialState,
//   reducers: {
//     importGeoJSON: (state, action: PayloadAction<GeoJSONData>) => {
//       const fields: Record<string, GeoJSONFeature> = {}
//       action.payload.features.forEach((feature) => {
//         fields[feature.properties.FID] = feature
//       })
//       state.fields = fields
//     },
//     setSelectedField: (state, action: PayloadAction<string | null>) => {
//       state.selectedFieldId = action.payload
//     },
//     setSearchQuery: (state, action: PayloadAction<string>) => {
//       state.searchQuery = action.payload
//     },
//     setMapCenter: (state, action: PayloadAction<[number, number]>) => {
//       state.mapCenter = action.payload
//     },
//     setMapZoom: (state, action: PayloadAction<number>) => {
//       state.mapZoom = action.payload
//     },
//   },
// })

// export const {
//   importGeoJSON,
//   setSelectedField,
//   setSearchQuery,
//   setMapCenter,
//   setMapZoom,
// } = mapSlice.actions

// export default mapSlice.reducer
// src/store/mapSlice.ts
// src/store/mapSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MapState, Polygon } from "../types/map.types"

const initialState: MapState = {
  fields: {},
  selectedFieldId: null,
  mapCenter: [48.35117, 12.54524],
  mapZoom: 16,
  searchQuery: "",
  drawingMode: false,
  currentPolygon: null,
}

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    importGeoJSON: (state, action) => {
      const fields: Record<string, any> = {}
      action.payload.features.forEach((feature: any) => {
        fields[feature.properties.FID] = feature
      })
      state.fields = fields
    },
    setSelectedField: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setMapCenter: (state, action: PayloadAction<[number, number]>) => {
      state.mapCenter = action.payload
    },
    setMapZoom: (state, action: PayloadAction<number>) => {
      state.mapZoom = action.payload
    },
    setDrawingMode: (state, action: PayloadAction<boolean>) => {
      state.drawingMode = action.payload
      if (!action.payload) {
        state.currentPolygon = null
      }
    },
    updateCurrentPolygon: (
      state,
      action: PayloadAction<[number, number][] | null>
    ) => {
      state.currentPolygon = action.payload
    },
    addPolygon: (state, action: PayloadAction<Polygon>) => {
      state.fields[action.payload.id] = {
        type: "Feature",
        properties: {
          FID: action.payload.id,
          Name: action.payload.label,
          LFlaeche: action.payload.area,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            action.payload.coordinates.map((coord) => [coord[1], coord[0]]),
          ],
        },
      }
      state.currentPolygon = null
      state.drawingMode = false
    },
    deletePolygon: (state, action: PayloadAction<string>) => {
      delete state.fields[action.payload]
      if (state.selectedFieldId === action.payload) {
        state.selectedFieldId = null
      }
    },
  },
})

export const {
  importGeoJSON,
  setSelectedField,
  setSearchQuery,
  setMapCenter,
  setMapZoom,
  setDrawingMode,
  updateCurrentPolygon,
  addPolygon,
  deletePolygon,
} = mapSlice.actions

export default mapSlice.reducer
