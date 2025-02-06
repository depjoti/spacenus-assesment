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
