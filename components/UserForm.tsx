"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { User } from "@/app/dashboard/users/page";

export default function UserForm(props: { user?: User }) {
  const [formData, setFormData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (props.user) {
      setFormData(props.user as User);
    } else {
      setFormData((prev) => ({
        ...prev,
        updatedAt: new Date(),
        password: crypto.randomUUID().replaceAll("-", "").toUpperCase().substring(0, 10),
      }));
    }
  }, [props.user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Błąd zapisu");
        return;
      }

      setError(null);
      router.push("/dashboard/users");
    } catch (err) {
      console.error(err);
      setError("Błąd zapisu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 lg:p-8 rounded-3xl">
      <h1 className="h-[1.25rem] text-xl font-bold my-3">{formData?.name}</h1>
      <small className="h-[1rem] block mb-3 text-gray-500">
        {formData?.updatedAt ? formData.updatedAt.toLocaleString() : ""}
      </small>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <input type="hidden" name="id" value={formData?.id ?? ""} />
        <Input name="name" value={formData?.name} handleChange={handleChange} />
        <Input name="email" value={formData?.email} handleChange={handleChange} />
        <Input name="fullName" value={formData?.fullName} handleChange={handleChange} />
        <Input name="location" value={formData?.location} handleChange={handleChange} />
        <Input name="model" value={formData?.model} handleChange={handleChange} />
        <Input name="registration" value={formData?.registration} handleChange={handleChange} />
        <Input name="role" value={formData?.role} handleChange={handleChange} />
      </div>

      <div className="flex gap-3 justify-end items-center mt-10">
        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" className="button">
          Zapisz pojazd
        </button>
      </div>
    </form>
  );
}
