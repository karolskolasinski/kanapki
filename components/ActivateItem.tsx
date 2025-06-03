"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { itemClassName } from "@/components/DashboardItem";

type Props = {
  userId?: string;
};

export default function ActivateItem(props: Props) {
  const { userId } = props;
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        if (!response.ok || !result.location.length) {
          return;
        }

        console.log(result);

        setIsOpen(result.isOpen);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocation();
  }, [userId]);

  const handleClick = () => {
    if (!userId) return;

    const activate = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          body: JSON.stringify({ isOpen: !isOpen }),
        });

        if (!response.ok) {
          return;
        }

        setIsOpen(!isOpen);
      } catch (err) {
        console.error(err);
      }
    };

    activate();
  };

  return (
    <div onClick={handleClick} className={`${itemClassName} hover:border-purple-200`}>
      <div className="p-5 rounded-full bg-[#f3e5f5]">
        <Image src="bolt.svg" alt="Lokalizacja" width={24} height={24} />
      </div>

      <div>
        <small className="text-gray-400">
          {isOpen === null ? "Ładowanie..." : isOpen ? "Otwarte" : "Zapraszamy później"}
        </small>
        <div>{isOpen === null ? "Dostępność" : isOpen ? "Zamknij" : "Otwórz"}</div>
      </div>
    </div>
  );
}
