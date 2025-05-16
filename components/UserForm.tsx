"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";

export type User = {
  id?: string;
  name?: string;
  email?: string;
  fullName?: string;
  model?: string;
  registration?: string;
  location?: string;
  password?: string;
  role?: string;
  updatedAt?: Date | null;
};

export default function UserForm(props: { user?: User }) {
  const [formData, setFormData] = useState<User | null>(null);

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
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Błąd zapisu");
      }

      alert("Zapisano pojazd!");
    } catch (err) {
      console.error(err);
      alert("Nie udało się zapisać.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-3xl">
      <h1 className="text-xl font-bold text-gray-700 mt-3">Nowy pojazd</h1>
      <small className="h-[1rem] block mb-3 text-gray-500">
        {formData?.updatedAt ? formData.updatedAt.toLocaleString() : ""}
      </small>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <input type="hidden" name="id" value={formData?.id ?? ""} />
        <Input name="name" value={formData?.name} handleChange={handleChange} />
        <Input name="email" value={formData?.email} handleChange={handleChange} />
        <Input name="fullName" value={formData?.fullName} handleChange={handleChange} />
        <Input name="password" value={formData?.password} handleChange={handleChange} />

        <Input name="model" value={formData?.model} handleChange={handleChange} />
        <Input name="registration" value={formData?.registration} handleChange={handleChange} />
        <Input name="location" value={formData?.location} handleChange={handleChange} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="button"
        >
          Zapisz pojazd
        </button>
      </div>
    </form>
  );
}
