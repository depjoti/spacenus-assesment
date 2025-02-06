

"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  FeatureGroup,
  useMap,
} from "react-leaflet"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import {
  addPolygon,
  updatePolygon,
  deletePolygon,
  setSelectedPolygon,
} from "@/store/slices/polygonSlice"
import type { LatLng } from "@/types"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import styles from "./Map.module.scss"

// Import Leaflet Draw properly
import "leaflet-draw"

const DrawingControl = () => {
  const map = useMap()
  const dispatch = useDispatch()
  const featureGroupRef = useRef<L.FeatureGroup | null>(null)

  useEffect(() => {
    if (!map) return

    const editableLayers = new L.FeatureGroup()
    map.addLayer(editableLayers)
    featureGroupRef.current = editableLayers

    // Initialize draw control after ensuring the plugin is loaded
    const drawControl = new (L.Control as any).Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          drawError: {
            color: "#e1e100",
            message: "<strong>Error:</strong> Polygon edges cannot cross!",
          },
          shapeOptions: {
            color: "#2196f3",
            fillColor: "#2196f3",
            fillOpacity: 0.4,
          },
        },
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: editableLayers,
        remove: true,
      },
    })

    map.addControl(drawControl)

    // Handle polygon creation
    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer
      editableLayers.addLayer(layer)

      const coordinates = layer.getLatLngs()[0].map((latlng: L.LatLng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }))

      // Calculate area
      const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0])
      const areaInKm = (area / 1000000).toFixed(2)

      // Calculate center
      const bounds = layer.getBounds()
      const center = bounds.getCenter()

      const newPolygon = {
        id: Date.now().toString(),
        coordinates,
        fillColor: "#2196f3",
        strokeColor: "#1976d2",
        area: parseFloat(areaInKm),
        center: { lat: center.lat, lng: center.lng },
      }

      dispatch(addPolygon(newPolygon))
    })

    // Handle polygon editing
    map.on(L.Draw.Event.EDITED, (e: any) => {
      const layers = e.layers
      layers.eachLayer((layer: any) => {
        if (layer.options.id) {
          const coordinates = layer.getLatLngs()[0].map((latlng: L.LatLng) => ({
            lat: latlng.lat,
            lng: latlng.lng,
          }))

          const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0])
          const areaInKm = (area / 1000000).toFixed(2)

          const bounds = layer.getBounds()
          const center = bounds.getCenter()

          dispatch(
            updatePolygon({
              id: layer.options.id,
              coordinates,
              fillColor: layer.options.fillColor,
              strokeColor: layer.options.color,
              area: parseFloat(areaInKm),
              center: { lat: center.lat, lng: center.lng },
            })
          )
        }
      })
    })

    // Handle polygon deletion
    map.on(L.Draw.Event.DELETED, (e: any) => {
      const layers = e.layers
      layers.eachLayer((layer: any) => {
        if (layer.options.id) {
          dispatch(deletePolygon(layer.options.id))
        }
      })
    })

    return () => {
      map.removeControl(drawControl)
      map.removeLayer(editableLayers)
    }
  }, [map, dispatch])

  return null
}

// Geolocation control component remains unchanged
const GeolocationControl = () => {
  const map = useMap()

  const handleGeolocation = () => {
    map.locate({ setView: true, maxZoom: 16 })
  }

  return (
    <div className={styles.geolocationControl} onClick={handleGeolocation}>
      <button title="Center to my location">📍</button>
    </div>
  )
}

const MapComponent = () => {
  const { polygons, selectedPolygonId } = useSelector(
    (state: RootState) => state.polygons
  )
  const dispatch = useDispatch()

  const initialCenter: LatLng = {
    lat: 48.35117569829906,
    lng: 12.545244605302017,
  }

  useEffect(() => {
    // Fix Leaflet default icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    })
  }, [])

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={15}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.values(polygons).map((polygon) => (
          <div key={polygon.id}>
            <Polygon
              positions={polygon.coordinates.map((coord) => [
                coord.lat,
                coord.lng,
              ])}
              pathOptions={{
                color: polygon.strokeColor,
                fillColor: polygon.fillColor,
                fillOpacity: 0.4,
                weight: 2,
              }}
              eventHandlers={{
                click: () => dispatch(setSelectedPolygon(polygon.id)),
              }}
            />
            {polygon.center && (
              <Marker position={[polygon.center.lat, polygon.center.lng]}>
                <Popup>
                  <div className={styles.popup}>
                    <strong>Area:</strong> {polygon.area?.toFixed(2)} km²
                    <br />
                    <strong>ID:</strong> {polygon.id}
                    {polygon.label && (
                      <>
                        <br />
                        <strong>Label:</strong> {polygon.label}
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            )}
          </div>
        ))}
        <DrawingControl />
        <GeolocationControl />
      </MapContainer>
    </div>
  )
}

export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
})