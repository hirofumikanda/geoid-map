# Geoid Map - AI Coding Agent Instructions# Earthquake Map - AI Coding Agent Instructions



## Project Overview## Project Overview

Japanese geoid visualization web app using MapLibre GL JS + React + PMTiles. Displays geoid height data with color-coded visualization (-60m to +60m), earthquake data by depth, bathymetry, and optional layer toggles. All geographic data served as PMTiles files.Japanese earthquake visualization web app using MapLibre GL JS + React + PMTiles. Displays M6+ earthquakes (2005-2025) color-coded by depth, with optional tectonic plate overlay. Uses Natural Earth 2 background and bathymetry data.



## Architecture Pattern## Architecture Pattern

- **Single-component React app**: `App.tsx` → `MapView.tsx` (main map container)

- **Utility-based organization**: Map behavior split into `/utils/` modules by function## Key Components & Data Flow

- **PMTiles data strategy**: All geographic data served as PMTiles files from `/public/data/`

- **MapLibre style-driven**: Map styling entirely defined in `/public/styles/style.json`### Map Initialization (`MapView.tsx`)

```tsx

## Key Components & Data Flow// PMTiles protocol registration (required before map creation)

const protocol = new Protocol();

### Map Initialization (`MapView.tsx`)maplibregl.addProtocol("pmtiles", protocol.tile);

```tsx

// PMTiles protocol registration (required before map creation)// Map uses local style.json with PMTiles sources

const protocol = new Protocol();style: "styles/style.json"

maplibregl.addProtocol("pmtiles", protocol.tile);```



// Map uses local style.json with PMTiles sources### Data Layer Architecture

style: "styles/style.json"

```### Utility Modules Pattern

Each map behavior isolated in `/utils/`:

### Data Layer Architecture

- **6 PMTiles sources**: bathymetry, earthquake, land_cover, geoid (egm2008_rgb), gebco (DEM), plate## Development Workflows

- **Geoid layer**: RGB raster data with specific color mapping (-60→blue, 0→cyan, +60→red)

- **Layer visibility**: Controlled via React state + MapLibre `setLayoutProperty("layername", "visibility", "visible|none")`### Local Development

```bash

### Utility Modules Patternnpm run dev         # Vite dev server

Each map behavior isolated in `/utils/`:npm run build       # TypeScript compile + Vite build

- `onMapLoad.ts` - Preloads earthquake depth color icons (red.png, orange.png, etc.)npm run preview     # Preview production build

- `LegendItem.tsx` - Reusable circular legend components with color/label```

- `popup.ts`, `pointer.ts` - Feature interaction handlers (referenced but not actively used)

### Deployment

## Development Workflows```bash

npm run deploy      # Builds and deploys to GitHub Pages

### Local Development```

```bash**Note**: `vite.config.ts` sets `base: "/geoid-map/"` for GitHub Pages deployment.

npm run dev         # Vite dev server

npm run build       # TypeScript compile + Vite build## Project-Specific Conventions

npm run preview     # Preview production build

npm run lint        # ESLint checking### PMTiles Integration

```

### Icon Loading Pattern

### Deployment

```bash### Layer Management

npm run deploy      # Builds and deploys to GitHub Pages via gh-pages

```### Japanese Localization

**Note**: `vite.config.ts` sets `base: "/geoid-map/"` for GitHub Pages deployment.

## Common Integration Points

## Project-Specific Conventions

## When Adding Features

### PMTiles Integration1. **New data layers**: Add PMTiles to `/public/data/`, update style.json sources/layers

- All geographic data stored as `.pmtiles` files in `/public/data/`2. **Map interactions**: Create new utility module in `/utils/`, import to MapView.tsx

- Style.json references PMTiles via `"url": "pmtiles:///geoid-map/data/filename.pmtiles"`3. **UI controls**: Add to MapView.tsx return JSX with absolute positioning (follow existing checkbox pattern)

- Protocol registration required before map instantiation4. **Layer toggles**: Use React state + useEffect + `setLayoutProperty()` pattern from plate layer


### Layer Toggle Pattern
```tsx
// Safe layer visibility control (wait for map load)
const [mapLoaded, setMapLoaded] = useState(false);
map.on("load", () => setMapLoaded(true));

useEffect(() => {
  if (mapRef.current && mapLoaded) {
    mapRef.current.setLayoutProperty("layername", "visibility", show ? "visible" : "none");
  }
}, [show, mapLoaded]);
```

### Icon Loading Pattern
- PNG icons preloaded in `onMapLoad.ts` via `map.loadImage()` then `map.addImage()`
- Icons stored in `/public/img/` (red.png, orange.png, yellow.png, etc.)
- Style.json references loaded icons by name in symbol layers

### Legend Components
- `LegendItem.tsx`: Circular color indicator + text label
- Conditional legend display: `display: showLayer ? "block" : "none"`
- Geoid color mapping: RGB values from data (-60→`rgb(0,0,255)`, +60→`rgb(255,0,0)`)

### Japanese Localization
- UI text in Japanese ("ジオイドレイヤ表示", "ジオイド高凡例 (m)")
- Layer-specific units: geoid (m), earthquakes (km), bathymetry (m)

## Common Integration Points
- **Font handling**: Custom fonts via `/public/font/` directory, referenced in style.json `glyphs` property
- **Data attribution**: Each PMTiles source includes attribution in style.json
- **Error handling**: Wait for map load state before layer operations to avoid "Style is not done loading" errors

## When Adding Features
1. **New data layers**: Add PMTiles to `/public/data/`, update style.json sources/layers
2. **Layer toggles**: Follow geoid pattern - React state + mapLoaded check + setLayoutProperty
3. **UI controls**: Add to MapView.tsx JSX with absolute positioning (`left: 10, top: 10` for controls)
4. **Icon-based layers**: Add images to `/public/img/`, load in `onMapLoad.ts`, reference in style.json
5. **Legends**: Create conditional display tied to layer visibility state