// // src/components/FieldDetails.tsx
// import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "../store"
// import { setSearchQuery } from "../store/mapSlice"
// import styles from "../styles/FieldDetails.module.scss"

// export const FieldDetails = () => {
//   const dispatch = useDispatch()
//   const { fields, selectedFieldId, searchQuery } = useSelector(
//     (state: RootState) => state.map
//   )

//   const filteredFields = Object.values(fields).filter(
//     (field) =>
//       field.properties.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       field.properties.FID.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>Field Details</h2>
//         <input
//           type="text"
//           placeholder="Search fields..."
//           value={searchQuery}
//           onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//           className={styles.searchInput}
//         />
//       </div>

//       <div className={styles.fieldList}>
//         {filteredFields.map((field) => (
//           <div
//             key={field.properties.FID}
//             className={`${styles.fieldItem} ${
//               selectedFieldId === field.properties.FID ? styles.selected : ""
//             }`}
//           >
//             <h3>{field.properties.Name}</h3>
//             <div className={styles.details}>
//               <div className={styles.detailRow}>
//                 <span>Field ID:</span>
//                 <span>{field.properties.FID}</span>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Area:</span>
//                 <span>{field.properties.LFlaeche.toFixed(2)} ha</span>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Type:</span>
//                 <span>{field.properties.Einstufung}</span>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Year:</span>
//                 <span>{field.properties.Jahr}</span>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Water CC:</span>
//                 <span>{field.properties.CCWasser}</span>
//               </div>
//               <div className={styles.detailRow}>
//                 <span>Wind CC:</span>
//                 <span>{field.properties.CCWind}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { setSearchQuery } from "../store/mapSlice"
import styles from "../styles/FieldDetails.module.scss"
import { GeoJSONFeature } from "../types/geojson.types"

export const FieldDetails = () => {
  const dispatch = useDispatch()
  const { fields, selectedFieldId, searchQuery } = useSelector(
    (state: RootState) => state.map
  )

  const filteredFields = Object.values(
    fields as Record<string, GeoJSONFeature>
  ).filter(
    (field) =>
      field.properties.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.properties.FID.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Field Details</h2>
        <input
          type="text"
          placeholder="Search fields..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.fieldList}>
        {filteredFields.map((field) => (
          <div
            key={field.properties.FID}
            className={`${styles.fieldItem} ${
              selectedFieldId === field.properties.FID ? styles.selected : ""
            }`}
          >
            <h3>{field.properties.Name}</h3>
            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span>Field ID:</span>
                <span>{field.properties.FID}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Area:</span>
                <span>{field.properties.LFlaeche.toFixed(2)} ha</span>
              </div>
              <div className={styles.detailRow}>
                <span>Type:</span>
                <span>{field.properties.Einstufung}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Year:</span>
                <span>{field.properties.Jahr}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Water CC:</span>
                <span>{field.properties.CCWasser}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Wind CC:</span>
                <span>{field.properties.CCWind}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
