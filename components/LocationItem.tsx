"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocation } from "@/lib/location-context";
import { itemClassName } from "@/components/DashboardItem";

type Props = {
  userId?: string;
};

export default function LocationItem(props: Props) {
  const { userId } = props;
  const [location, setLocation] = useState<string>("Ładowanie...");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const { setLocation: setLocationHook } = useLocation();

  useEffect(() => {
    if (!userId) return;

    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        if (!response.ok || !result.location.length) {
          setLocation("Kliknij, aby ustawić lokalizację");
          return;
        }

        setLocation(result.location);
      } catch (err) {
        console.error(err);
        setLocation("Błąd pobierania lokalizacji");
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
          setLocation(location);

          await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, location, lat, lng }),
          });
        } else {
          setLocation("Nie udało się odczytać adresu");
        }
      } catch (err) {
        console.error(err);
        setLocation("Błąd przy pobieraniu adresu");
      }
    };

    fetchAddress();
  }, [coords, userId]);

  const handleClick = () => {
    setLocation("Ładowanie...");
    if (!navigator.geolocation) {
      setLocation("Lokalizacja niedostępna");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
      setLocationHook(userId);
    }, () => setLocation("Nie udało się pobrać lokalizacji"));
  };

  return (
    <div onClick={handleClick} className={`${itemClassName} hover:border-orange-200`}>
      <div className="p-5 rounded-full bg-[#f8edeb]">
        <Image src="location.svg" alt="Lokalizacja" width={24} height={24} />
      </div>

      <div>
        <small className="text-gray-400">{location}</small>
        <div>Lokalizacja</div>
      </div>
    </div>
  );
}
