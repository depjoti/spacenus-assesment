// src/store/slices/polygonSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PolygonState, Polygon, ValidationError } from "@/types"
import {
  calculatePolygonArea,
  calculatePolygonCenter,
} from "@/utils/calculations"
import { validatePolygon } from "@/utils/validation"

const initialState: PolygonState = {
  polygons: {},
  selectedPolygonId: null,
  error: null,
}

const polygonSlice = createSlice({
  name: "polygons",
  initialState,
  reducers: {
    addPolygon: (
      state,
      action: PayloadAction<Omit<Polygon, "area" | "center">>
    ) => {
      const newPolygon = action.payload

      // Validate polygon
      try {
        validatePolygon(newPolygon, Object.values(state.polygons))

        // Calculate area and center
        const area = calculatePolygonArea(newPolygon.coordinates)
        const center = calculatePolygonCenter(newPolygon.coordinates)

        state.polygons[newPolygon.id] = {
          ...newPolygon,
          area,
          center,
        }
        state.error = null
      } catch (error) {
        state.error = (error as ValidationError).message
      }
    },

    updatePolygon: (state, action: PayloadAction<Polygon>) => {
      const updatedPolygon = action.payload
      try {
        validatePolygon(
          updatedPolygon,
          Object.values(state.polygons).filter(
            (p) => p.id !== updatedPolygon.id
          )
        )
        state.polygons[updatedPolygon.id] = updatedPolygon
        state.error = null
      } catch (error) {
        state.error = (error as ValidationError).message
      }
    },

    deletePolygon: (state, action: PayloadAction<string>) => {
      const id = action.payload
      delete state.polygons[id]
      if (state.selectedPolygonId === id) {
        state.selectedPolygonId = null
      }
    },

    setSelectedPolygon: (state, action: PayloadAction<string | null>) => {
      state.selectedPolygonId = action.payload
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  addPolygon,
  updatePolygon,
  deletePolygon,
  setSelectedPolygon,
  clearError,
} = polygonSlice.actions

export default polygonSlice.reducer
