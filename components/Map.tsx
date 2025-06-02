"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLocation } from "@/lib/location-context";
import Image from "next/image";

const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

function Map() {
  const { location } = useLocation();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    if (location?.lat && location?.lng) {
      setLat(location.lat);
      setLng(location.lng);
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex gap-2 items-center">
        <Image
          src="/map-marker.svg"
          alt="lokalizacja"
          width={30}
          height={30}
          className="inline"
        />
        <div className="flex flex-col">{location?.label}</div>
      </div>

      <div className="grayscale-100 duration-300 hover:grayscale-0 h-[300px] w-full">
        {lat && lng && <MapClient lat={lat} lng={lng} label={location?.label} />}
      </div>
    </div>
  );
}

export default Map;
