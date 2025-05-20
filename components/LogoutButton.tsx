"use client";

import { signOut } from "next-auth/react";
import { itemClassName } from "@/components/DashboardItem";
import Image from "next/image";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={itemClassName + " hover:border-red-200"}
    >
      <div className="p-5 rounded-full bg-[#FFE9ED]">
        <Image
          src="/off.svg"
          alt="logout"
          width={24}
          height={24}
        />
      </div>

      Wyloguj się
    </button>
  );
}
