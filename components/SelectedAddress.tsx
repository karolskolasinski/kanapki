"use client";

import { User } from "@/app/dashboard/users/page";
import { useLocation } from "@/lib/location-context";
import { useEffect, useState } from "react";

type SelectedAddressProps = {
  users: User[];
};

export default function SelectedAddress(props: SelectedAddressProps) {
  const { users } = props;
  const { location, setLocation } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("selectedUserId") ?? "{}").userId;

    const user = users.find((user) => user.id === userId);
    if (user) {
      setIsOpen(user.isOpen);
    }
  }, [users, setLocation]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;

    const user = users.find((user) => user.id === userId);
    if (user) {
      localStorage.setItem("selectedUserId", JSON.stringify({ userId: user.id }));
      setLocation(user.id);
      setIsOpen(user.isOpen);
    }
  };

  return (
    <div className="flex flex-col gap-3 px-2 py-5 md:flex-row md:gap-5 md:justify-center">
      <div className="w-full md:w-auto uppercase bg-black px-3 py-2 text-white font-work-sans text-lg lg:text-2xl font-black flex gap-1 justify-center items-center">
        {isOpen !== undefined && !isOpen
          ? "Zamknięte, zapraszamy następnym razem"
          : location?.label
          ? "Menu na dziś"
          : "Brak wybranej lokalizacji"}
      </div>

      {users.length > 0 && (
        <select
          onChange={handleSelect}
          value={location?.userId ?? "loading"}
          className="appearance-none border-4 border-black rounded-2xl px-4 py-2 pr-10 bg-white bg-no-repeat bg-[length:1rem] bg-[right_0.75rem_center] bg-[url('/down-arrow.svg')]"
        >
          <option value="loading" disabled>Wybierz</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
