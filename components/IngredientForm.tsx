"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Ingredient = {
  id?: string;
  name?: string;
};

export default function IngredientForm() {
  const [formData, setFormData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/ingredients", {
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
      // router.push("/dashboard/users");
    } catch (err) {
      console.error(err);
      setError("Błąd zapisu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex flex-col w-96">
        <label className="block text-sm text-gray-600 my-1">Nowy składnik</label>
        <input
          type="text"
          name="ingredient"
          value={formData}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value)}
          className="h-10 p-2 border border-gray-300 rounded-xl"
          required
        />
      </div>

      <button type="submit" className="button">
        Dodaj nowy
      </button>
      {error && <div className="h-10 text-red-500 flex items-center">{error}</div>}
    </form>
  );
}
