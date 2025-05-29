"use client";

import { useEffect, useState } from "react";
import { useLocation } from "@/lib/location-context";
import { User } from "@/app/dashboard/users/page";

type SelectedAddressProps = {
  users: User[];
};

export default function SelectedAddress(props: SelectedAddressProps) {
  const { users } = props;
  const { location, setLocation } = useLocation();
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    if (location?.userId) {
      setSelectedUserId(location.userId);
    }
  }, [location]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    setSelectedUserId(userId);

    let user = users.find((user) => user.id === userId);
    if (!user) {
      user = users[0];
    }

    const loc = {
      userId: user.id,
      label: user.location,
      lat: user.lat,
      lng: user.lng,
    };
    setLocation(loc);
    localStorage.setItem("selectedLocation", JSON.stringify(loc));
  };

  return (
    <div>
      Gdzie jestem?

      <select
        onChange={handleSelect}
        value={selectedUserId}
        className="block appearance-none border border-black rounded px-4 py-2 pr-10 bg-white bg-no-repeat bg-[length:1rem] bg-[right_0.75rem_center] bg-[url('/down-arrow.svg')]"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {location?.label ?? "brak wybranej lokalizacji"}
    </div>
  );
}
