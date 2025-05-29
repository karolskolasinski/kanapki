"use client";

import { useLocation } from "@/lib/location-context";

function Menu() {
  const { location, setLocation } = useLocation();

  return <div>MENU NOWE {location?.label}</div>;
}

export default Menu;
