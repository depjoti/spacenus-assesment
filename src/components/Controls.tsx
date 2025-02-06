// // src/components/Controls.tsx
// import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "../store"
// import {
//   setDrawingMode,
//   setSearchQuery,
//   importPolygons,
// } from "../store/mapSlice"
// import {
//   exportPolygonsToJson,
//   importPolygonsFromJson,
// } from "../utils/polygonUtils"
// import styles from "../styles/Controls.module.scss"

// export const Controls = () => {
//   const dispatch = useDispatch()
//   const { drawingMode, polygons, searchQuery } = useSelector(
//     (state: RootState) => state.map
//   )

//   const handleExport = () => {
//     const jsonData = exportPolygonsToJson(polygons)
//     const blob = new Blob([jsonData], { type: "application/json" })
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
//     if (!file) return

//     const reader = new FileReader()
//     reader.onload = (e) => {
//       try {
//         const importedPolygons = importPolygonsFromJson(
//           e.target?.result as string
//         )
//         dispatch(importPolygons(importedPolygons))
//       } catch (error) {
//         alert("Error importing file: Invalid format")
//       }
//     }
//     reader.readAsText(file)
//   }

//   return (
//     <div className={styles.controls}>
//       <div className={styles.searchBar}>
//         <input
//           type="text"
//           placeholder="Search polygons..."
//           value={searchQuery}
//           onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//         />
//       </div>
//       <div className={styles.buttons}>
//         <button
//           className={`${styles.drawButton} ${drawingMode ? styles.active : ""}`}
//           onClick={() => dispatch(setDrawingMode(!drawingMode))}
//         >
//           {drawingMode ? "Cancel Drawing" : "Draw Polygon"}
//         </button>
//         <button onClick={handleExport}>Export Polygons</button>
//         <label className={styles.importButton}>
//           Import Polygons
//           <input
//             type="file"
//             accept=".json"
//             onChange={handleImport}
//             style={{ display: "none" }}
//           />
//         </label>
//       </div>
//     </div>
//   )
// }
"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { setDrawingMode, importPolygons } from "../store/mapSlice"
import styles from "../styles/Controls.module.scss"

const Controls = () => {
  const dispatch = useDispatch()
  const { drawingMode } = useSelector((state: RootState) => state.map)

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          dispatch(importPolygons(data))
        } catch (error) {
          console.error("Error importing file:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className={styles.controls}>
      <button
        className={`${styles.button} ${drawingMode ? styles.active : ""}`}
        onClick={() => dispatch(setDrawingMode(!drawingMode))}
      >
        {drawingMode ? "Cancel Drawing" : "Draw Polygon"}
      </button>

      <label className={styles.importButton}>
        Import JSON
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: "none" }}
        />
      </label>
    </div>
  )
}

export default Controls
