"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";

type Vehicle = {
  name: string;
  email: string;
  model: string;
  registration: string;
  fullName: string;
  updatedAt: Date | null;
  location: string;
  password: string;
};

export default function VehicleForm() {
  const [formData, setFormData] = useState<Vehicle>({
    name: "",
    email: "",
    model: "",
    registration: "",
    fullName: "",
    updatedAt: null,
    location: "",
    password: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      updatedAt: new Date(),
      password: crypto.randomUUID().replaceAll("-", "").toUpperCase().substring(0, 10),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dane pojazdu:", formData);
    // tutaj możesz dodać zapis do Firestore
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-3xl"
    >
      <h1 className="text-xl font-bold text-gray-700 mt-3">Nowy pojazd</h1>
      <small className="h-[1rem] block mb-3 text-gray-500">
        {formData.updatedAt ? formData.updatedAt.toLocaleString() : ""}
      </small>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Input name="name" value={formData.name} handleChange={handleChange} />
        <Input name="email" value={formData.email} handleChange={handleChange} />
        <Input name="fullName" value={formData.fullName} handleChange={handleChange} />

        <Input name="model" value={formData.model} handleChange={handleChange} />
        <Input name="registration" value={formData.registration} handleChange={handleChange} />
        <Input name="location" value={formData.location} handleChange={handleChange} />

        <Input name="password" value={formData.password} handleChange={handleChange} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="text-white-800 mt-10 px-4 inline-flex gap-2 h-10 items-center justify-center rounded-md text-sm bg-purple-200 hover:bg-primary-400 focus:bg-purple-300 border hover:border-purple-500 border-purple-400 font-bold shadow-[0px_2px_4px_0px_rgba(10,13,18,0.1)] shadow-[0px_-3px_0px_0px_rgba(10,13,18,0.1)_inset] shadow-[0px_0px_0px_2px_rgba(10,13,18,0.25)_inset] duration-150 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-[1px] cursor-pointer"
        >
          Zapisz pojazd
        </button>
      </div>
    </form>
  );
}

