"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Location {
  userId?: string;
  label?: string;
  lat?: number;
  lng?: number;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (loc: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedLocation");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocation(parsed);
      } catch (err) {
        console.error("Nieprawidłowy JSON w localStorage:", err);
      }
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
