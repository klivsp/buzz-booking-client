'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center: [number, number];
    zoom?: number;
    scrollWheelZoom?: boolean;
}

export default function Map({ center, zoom = 13, scrollWheelZoom = false }: MapProps) {
    return (
        <div className="relative z-0 h-[280px] w-full overflow-hidden rounded-lg border border-border [&_.leaflet-bottom]:z-10 [&_.leaflet-control]:z-10 [&_.leaflet-pane]:z-0 [&_.leaflet-top]:z-10">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={scrollWheelZoom}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center}>
                    <Popup>
                        Property Location
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}