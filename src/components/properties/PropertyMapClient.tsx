"use client";

import { useNewPropertyStore } from "@/store/new-property";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { memo, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix para los iconos por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function DraggableMarker() {
  const { position, setPosition } = useNewPropertyStore();

  const eventHandlers = useMemo(
    () => ({
      dragend(e: L.DragEndEvent) {
        const marker = e.target;
        const newPos = marker.getLatLng();
        setPosition({
          lat: newPos.lat,
          lng: newPos.lng,
        });
      },
    }),
    [setPosition]
  );

  return (
    <Marker
      position={[position.lat, position.lng]}
      draggable={true}
      eventHandlers={eventHandlers}
    />
  );
}

function MapClickHandler() {
  const { setPosition } = useNewPropertyStore();

  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

const PropertyMapClient = memo(function PropertyMapClient() {
  const { position } = useNewPropertyStore();

  return (
    <div
      style={{
        height: "250px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid oklch(1 0 0 / 10%)",
      }}
    >
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
});

export default PropertyMapClient;
