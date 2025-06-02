"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocation } from "@/lib/location-context";

type Props = {
  icon: string;
  label: string;
  bg: string;
  bgHover: string;
  className: string;
  userId?: string;
};

export default function LocationItem(props: Props) {
  const { icon, label, bg, bgHover, className, userId } = props;
  const [tempLocation, setTempLocation] = useState<string>("Ładowanie...");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const { location, setLocation } = useLocation();

  useEffect(() => {
    if (!userId) return;

    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        if (!response.ok || !result.location.length) {
          setTempLocation("Kliknij, aby ustawić lokalizację");
          return;
        }

        setTempLocation(result.location);
      } catch (err) {
        console.error(err);
        setTempLocation("Błąd pobierania lokalizacji");
      }
    };

    fetchLocation();
  }, [userId]);

  const buildLocation = (address: Record<string, string>): string => {
    const street = [address?.road, address?.house_number].filter(Boolean).join(" ");
    const city = address?.city || address?.town || address?.village || address?.hamlet;
    return [street, city].filter(Boolean).join(", ");
  };

  useEffect(() => {
    if (!coords || !userId) return;

    const fetchAddress = async () => {
      try {
        const { lat, lng } = coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        const location = buildLocation(data.address);

        if (location) {
          setTempLocation(location);

          await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, location, lat, lng }),
          });
        } else {
          setTempLocation("Nie udało się odczytać adresu");
        }
      } catch (err) {
        console.error(err);
        setTempLocation("Błąd przy pobieraniu adresu");
      }
    };

    fetchAddress();
  }, [coords, userId]);

  const handleClick = () => {
    setTempLocation("Ładowanie...");
    if (!navigator.geolocation) {
      setTempLocation("Lokalizacja niedostępna");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
      setLocation({ lat: latitude, lng: longitude, label });
    }, () => setTempLocation("Nie udało się pobrać lokalizacji"));
  };

  return (
    <div onClick={handleClick} className={className + bgHover}>
      <div className={`p-5 rounded-full ${bg}`}>
        <Image src={icon} alt={label} width={24} height={24} />
      </div>

      <div>
        <small className="text-gray-400">{tempLocation}</small>
        <div>{label}</div>
      </div>
    </div>
  );
}
