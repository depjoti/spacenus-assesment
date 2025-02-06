// src/app/layout.tsx
import { Providers } from "../components/Providers"
import "./globals.scss"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Polygon Map Editor</title>
        <meta name="description" content="Interactive polygon map editor" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
