"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "map-marker-filled.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

function MapUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

type MapClientProps = {
  lat: number;
  lng: number;
  label?: string;
};

export default function MapClient(props: MapClientProps) {
  const { lat, lng, label } = props;

  return (
    <div className="grayscale-100 duration-300 hover:grayscale-0 h-[300px] w-full">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>{label || "Lokalizacja"}</Popup>
        </Marker>
        <MapUpdater lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}
