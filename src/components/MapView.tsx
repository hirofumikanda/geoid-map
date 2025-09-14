import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { LegendItem } from "../utils/LegendItem";

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [showGeoid, setShowGeoid] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [139.21, 37.18],
      zoom: 2,
      minZoom: 1,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.setLayoutProperty(
        "geoid-relief",
        "visibility",
        showGeoid ? "visible" : "none"
      );
    }
  }, [showGeoid, mapLoaded]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.85)",
          padding: "8px 14px",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={showGeoid}
            onChange={(e) => setShowGeoid(e.target.checked)}
          />
          ジオイドレイヤ表示
        </label>
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.85)",
          padding: "8px 14px",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          display: showGeoid ? "block" : "none",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>ジオイド高凡例 (m)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <LegendItem color="rgb(0,0,255)" label="-60" />
          <LegendItem color="rgb(0,128,255)" label="-30" />
          <LegendItem color="rgb(0,255,255)" label="0" />
          <LegendItem color="rgb(255,255,0)" label="+30" />
          <LegendItem color="rgb(255,0,0)" label="+60" />
        </div>
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
