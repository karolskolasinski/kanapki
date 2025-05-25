"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Ingredient = {
  id?: string;
  name?: string;
  createdAt?: unknown;
};

type IngredientFormProps = {
  ingredient?: Ingredient;
};

export default function IngredientForm(props: IngredientFormProps) {
  const [formData, setFormData] = useState<Ingredient>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (props.ingredient) {
      setFormData(props.ingredient);
    }
  }, [props.ingredient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const URL = props.ingredient ? `/api/ingredients/${props.ingredient.id}` : "/api/ingredients";
      const response = await fetch(URL, {
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
      setFormData(undefined);
      router.push("/dashboard/ingredients");
    } catch (err) {
      console.error(err);
      setError("Błąd zapisu");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex flex-col w-96">
        <label className="block text-sm text-gray-600 my-1">
          {formData?.id ? "Edytuj składnik" : "Nowy składnik"}
        </label>
        <input
          type="text"
          name="name"
          maxLength={30}
          value={formData?.name ?? ""}
          onChange={handleChange}
          className="h-10 p-2 border border-gray-300 rounded-xl"
          required
        />
      </div>

      <button type="submit" className="button">
        {formData?.id ? "Zapisz" : "Dodaj nowy"}
      </button>
      {error && <div className="h-10 text-red-500 flex items-center">{error}</div>}
    </form>
  );
}
