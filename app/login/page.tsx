"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/Input";

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
      <Input
        name="email"
        type="email"
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
        required={true} /*todo: required*/
      />

      <Input
        name="password"
        type="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        required={true} /*todo: required*/
      />

      <button type="submit" className="button">
        Zaloguj się
      </button>
    </form>
  );
}
