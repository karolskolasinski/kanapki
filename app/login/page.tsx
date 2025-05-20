"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", { redirect: false, email, password });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Błędne dane logowania");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-96 mx-auto mt-44 gap-4"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="h-10 border border-gray-300 rounded-md p-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Hasło"
        required
        className="h-10 border border-gray-300 rounded-md p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">
        Zaloguj się
      </button>
    </form>
  );
}
