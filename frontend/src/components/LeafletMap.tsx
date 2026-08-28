// ──────────────────────────────────────────────
// CRECE — Leaflet Map Component
// ──────────────────────────────────────────────
import { useEffect, useRef } from "react";

interface LeafletMapProps {
  lat: number;
  lon: number;
  popupTitle: string;
  popupLocation: string;
}

export default function LeafletMap({ lat, lon, popupTitle, popupLocation }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    if (!L) {
      console.warn("Leaflet library not found on window");
      return;
    }

    // Clean up previous instance if any
    if (leafletInstanceRef.current) {
      leafletInstanceRef.current.remove();
      leafletInstanceRef.current = null;
    }

    // Initialize map
    const map = L.map(mapRef.current, {
      attributionControl: false,
      zoomControl: true,
    }).setView([lat, lon], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add marker
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<b>${popupTitle}</b><br/>${popupLocation}`).openPopup();

    leafletInstanceRef.current = map;

    return () => {
      if (leafletInstanceRef.current) {
        leafletInstanceRef.current.remove();
        leafletInstanceRef.current = null;
      }
    };
  }, [lat, lon, popupTitle, popupLocation]);

  return (
    <div className="w-full h-56 rounded-2xl overflow-hidden border border-stone-200 shadow-inner z-0">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
