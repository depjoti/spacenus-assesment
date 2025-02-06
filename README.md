# Polygon Map Editor

A Next.js application for creating, editing, and managing polygons on a map. Built with React, TypeScript, and Leaflet.

## Features

- Draw polygons on an interactive map
- Edit and delete existing polygons
- View polygon information (area, coordinates)
- Automatic area calculation
- Center markers with tooltips
- Export/Import polygon data
- Geolocation support
- Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm (v9 or later)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/depjoti/spacenus-assesment.git
cd spacenus-assesment
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
polygon-map-editor/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── page.module.scss
│   │   └── globals.scss
│   ├── components/
│   │   ├── Map/
│   │   │   ├── Map.tsx
│   │   │   └── Map.module.scss
│   │   └── PolygonList/
│   │       ├── PolygonList.tsx
│   │       └── PolygonList.module.scss
│   ├── store/
│   │   ├── provider.tsx
│   │   ├── store.ts
│   │   └── slices/
│   │       └── polygonSlice.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── calculations.ts
│       ├── polygonUtils.ts
│       └── validation.ts
├── public/
│   ├── marker-icon-2x.png
│   ├── marker-icon.png
│   └── marker-shadow.png
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
    

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Redux Toolkit
- React Leaflet
- Leaflet Draw
- SASS Modules

## Features in Detail

### Map Functionality
- Interactive map with drawing tools
- Polygon drawing with area calculation
- Center markers showing polygon information
- Geolocation support for finding user location

### Polygon Management
- Create, edit, and delete polygons
- View polygon details (area, coordinates)
- Validation to prevent overlapping polygons
- Export/Import polygon data as JSON

### State Management
- Redux store for polygon data
- Persistent state across sessions
- TypeScript type safety

### Styling
- SASS modules for component styling
- Responsive design for all screen sizes
- Custom loading states


## Troubleshooting

### Common Issues

1. If you see "window is not defined" error:
   - This is normal during development as it's related to SSR
   - The application will still work correctly in the browser

2. Map not loading:
   - Check if all dependencies are installed
   - Ensure you have internet connection (for map tiles)
   - Clear browser cache and reload

3. Drawing tools not appearing:
   - Check if leaflet-draw is properly installed
   - Try clearing browser cache

