"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Location {
  userId?: string;
  label?: string;
  lat?: number;
  lng?: number;
  isOpen?: boolean;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (userId?: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<Location | null>(null);

  const setLocation = async (userId?: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/location-public`);
      const result = await response.json();

      if (!response.ok || !result.location?.length) {
        setLocationState(null);
        return;
      }

      setLocationState({
        userId,
        label: result.location,
        lat: result.lat,
        lng: result.lng,
        isOpen: result.isOpen,
      });
    } catch (err) {
      console.error(err);
      setLocationState(null);
    }
  };

  useEffect(() => {
    const selectedUserId = localStorage.getItem("selectedUserId");
    if (selectedUserId) {
      const { userId } = JSON.parse(selectedUserId);
      setLocation(userId);
    } else {
      setLocation("loading");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
