// "use client"

// import dynamic from "next/dynamic"
// import { PolygonList } from "@/components/PolygonList/PolygonList"
// import styles from "./page.module.scss"

// // Dynamic import for the Map component to avoid SSR issues with Leaflet
// const MapComponent = dynamic(() => import("@/components/Map/Map"), {
//   ssr: false,
// })

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.header}>
//         <h1>Polygon Map Editor</h1>
//       </div>
//       <div className={styles.content}>
//         <div className={styles.mapSection}>
//           <MapComponent />
//         </div>
//         <div className={styles.sidebar}>
//           <PolygonList />
//         </div>
//       </div>
//     </main>
//   )
// }
// src/app/page.tsx
"use client"

import { PolygonList } from "@/components/PolygonList/PolygonList"
import Map from "@/components/Map/Map"
import styles from "./page.module.scss"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Polygon Map Editor</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.mapSection}>
          <Map />
        </div>
        <div className={styles.sidebar}>
          <PolygonList />
        </div>
      </div>
    </main>
  )
}
