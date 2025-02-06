// // src/components/PolygonList/PolygonList.tsx
// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "@/store/store"
// import {
//   updatePolygon,
//   deletePolygon,
//   setSelectedPolygon,
// } from "@/store/slices/polygonSlice"
// import { ColorPicker } from "../ColorPicker/ColorPicker"
// import styles from "./PolygonList.module.scss"

// export const PolygonList = () => {
//   const dispatch = useDispatch()
//   const { polygons, selectedPolygonId } = useSelector(
//     (state: RootState) => state.polygons
//   )
//   const [searchTerm, setSearchTerm] = useState("")

//   const handleColorChange = (
//     id: string,
//     type: "fill" | "stroke",
//     color: string
//   ) => {
//     const polygon = polygons[id]
//     if (polygon) {
//       dispatch(
//         updatePolygon({
//           ...polygon,
//           [type === "fill" ? "fillColor" : "strokeColor"]: color,
//         })
//       )
//     }
//   }

//   const handleDelete = (id: string) => {
//     dispatch(deletePolygon(id))
//   }

//   const handleExport = () => {
//     const data = JSON.stringify(polygons, null, 2)
//     const blob = new Blob([data], { type: "application/json" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = "polygons.json"
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//   }

//   const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         try {
//           const importedPolygons = JSON.parse(e.target?.result as string)
//           Object.values(importedPolygons).forEach((polygon: any) => {
//             dispatch(updatePolygon(polygon))
//           })
//         } catch (error) {
//           console.error("Error importing polygons:", error)
//         }
//       }
//       reader.readAsText(file)
//     }
//   }

//   const filteredPolygons = Object.values(polygons).filter((polygon) =>
//     polygon.id.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Polygons</h2>
//         <div className={styles.actions}>
//           <button onClick={handleExport}>Export</button>
//           <label className={styles.importButton}>
//             Import
//             <input
//               type="file"
//               accept=".json"
//               onChange={handleImport}
//               style={{ display: "none" }}
//             />
//           </label>
//         </div>
//       </div>

//       <div className={styles.searchBar}>
//         <input
//           type="text"
//           placeholder="Search by ID..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className={styles.list}>
//         {filteredPolygons.map((polygon) => (
//           <div
//             key={polygon.id}
//             className={`${styles.polygonItem} ${
//               selectedPolygonId === polygon.id ? styles.selected : ""
//             }`}
//             onClick={() => dispatch(setSelectedPolygon(polygon.id))}
//           >
//             <div className={styles.polygonInfo}>
//               <span className={styles.id}>ID: {polygon.id}</span>
//               <span className={styles.area}>
//                 Area: {polygon.area?.toFixed(2)} km²
//               </span>
//             </div>

//             <div className={styles.colorPickers}>
//               <div className={styles.colorPicker}>
//                 <label>Fill:</label>
//                 <ColorPicker
//                   color={polygon.fillColor}
//                   onChange={(color) =>
//                     handleColorChange(polygon.id, "fill", color)
//                   }
//                 />
//               </div>
//               <div className={styles.colorPicker}>
//                 <label>Stroke:</label>
//                 <ColorPicker
//                   color={polygon.strokeColor}
//                   onChange={(color) =>
//                     handleColorChange(polygon.id, "stroke", color)
//                   }
//                 />
//               </div>
//             </div>

//             <button
//               className={styles.deleteButton}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 handleDelete(polygon.id)
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
// src/components/PolygonList/PolygonList.tsx
"use client"

import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import {
  updatePolygon,
  deletePolygon,
  setSelectedPolygon,
} from "@/store/slices/polygonSlice"
import styles from "./PolygonList.module.scss"

export const PolygonList = () => {
  const dispatch = useDispatch()
  const { polygons, selectedPolygonId } = useSelector(
    (state: RootState) => state.polygons
  )
  const [searchTerm, setSearchTerm] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleColorChange = (
    id: string,
    type: "fill" | "stroke",
    color: string
  ) => {
    const polygon = polygons[id]
    if (polygon) {
      dispatch(
        updatePolygon({
          ...polygon,
          [type === "fill" ? "fillColor" : "strokeColor"]: color,
        })
      )
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(polygons, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "polygons.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const importedPolygons = JSON.parse(text)
      Object.values(importedPolygons).forEach((polygon: any) => {
        dispatch(updatePolygon(polygon))
      })
    } catch (error) {
      console.error("Error importing polygons:", error)
    }
  }

  const filteredPolygons = Object.values(polygons).filter(
    (polygon) =>
      polygon.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      polygon.label?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Polygons</h2>
        <div className={styles.actions}>
          <button className={styles.exportBtn} onClick={handleExport}>
            Export
          </button>
          <button
            className={styles.importBtn}
            onClick={() => fileInputRef.current?.click()}
          >
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleImport}
          />
        </div>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by ID or label..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {filteredPolygons.map((polygon) => (
          <div
            key={polygon.id}
            className={`${styles.polygonItem} ${
              selectedPolygonId === polygon.id ? styles.selected : ""
            }`}
            onClick={() => dispatch(setSelectedPolygon(polygon.id))}
          >
            <div className={styles.polygonHeader}>
              <span className={styles.id}>ID: {polygon.id}</span>
              {polygon.label && (
                <span className={styles.label}>{polygon.label}</span>
              )}
            </div>

            <div className={styles.polygonDetails}>
              <div className={styles.area}>
                Area: {polygon.area?.toFixed(2)} km²
              </div>

              <div className={styles.colors}>
                <div className={styles.colorInput}>
                  <label>Fill:</label>
                  <input
                    type="color"
                    value={polygon.fillColor}
                    onChange={(e) =>
                      handleColorChange(polygon.id, "fill", e.target.value)
                    }
                  />
                </div>
                <div className={styles.colorInput}>
                  <label>Stroke:</label>
                  <input
                    type="color"
                    value={polygon.strokeColor}
                    onChange={(e) =>
                      handleColorChange(polygon.id, "stroke", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation()
                dispatch(deletePolygon(polygon.id))
              }}
            >
              Delete
            </button>
          </div>
        ))}
        {filteredPolygons.length === 0 && (
          <div className={styles.noPolygons}>No polygons found</div>
        )}
      </div>
    </div>
  )
}
