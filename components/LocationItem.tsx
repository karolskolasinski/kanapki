"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [location, setLocation] = useState<string>("Ładowanie...");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

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

  const buildAddress = (address: Record<string, string>): string => {
    const street = [address.road, address.house_number].filter(Boolean).join(" ");
    const city = address.city || address.town || address.village || address.hamlet;
    return [street, city].filter(Boolean).join(", ");
  };

  useEffect(() => {
    if (!coords) return;

    const fetchAddress = async () => {
      try {
        const { lat, lng } = coords;
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        const location = buildAddress(data.address);

        if (location) {
          setLocation(location);
        } else {
          setLocation("Nie udało się odczytać adresu");
        }
      } catch (err) {
        console.error(err);
        setLocation("Błąd przy pobieraniu adresu");
      }
    };

    fetchAddress();
  }, [coords]);

  const handleClick = () => {
    if (!navigator.geolocation) {
      setLocation("Lokalizacja niedostępna");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
    }, () => setLocation("Nie udało się pobrać lokalizacji"));
  };

  return (
    <div onClick={handleClick} className={className + bgHover}>
      <div className={`p-5 rounded-full ${bg}`}>
        <Image src={icon} alt={label} width={24} height={24} />
      </div>

      <div>
        <small className="text-gray-400">{location}</small>
        <div>{label}</div>
      </div>
    </div>
  );
}
