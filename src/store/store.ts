// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit"
import polygonReducer from "./slices/polygonSlice"

export const store = configureStore({
  reducer: {
    polygons: polygonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
