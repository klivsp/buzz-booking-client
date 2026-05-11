"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

// No image imports needed — use CDN URLs directly
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Move icon OUTSIDE the component so it's not recreated on every render

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  useEffect(() => {
    if (map) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])
  return null
}

export default function LeafletMap({ center, zoom }: { center: [number, number], zoom: number }) {
  return (
    <MapContainer 
     center={center} 
     zoom={zoom} 
     zoomControl={false} 
     scrollWheelZoom={false}
     dragging={true} // Allow dragging but...
     className="h-full w-full"
     style={{ zIndex: 0 }} // Force the internal container to stay low
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Marker position={center} icon={customIcon}>
          <Popup>Property Location</Popup>
        </Marker>
      )}
      <ChangeView center={center} zoom={zoom} />
    </MapContainer>
  )
}