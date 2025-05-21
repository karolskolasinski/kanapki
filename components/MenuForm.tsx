"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ingredient } from "@/components/IngredientForm";
import Input from "@/components/Input";

export type Menu = {
  id?: string;
  createdAt?: unknown;
  name?: string;
  category?: string;
  price?: number;
  weight?: number;
  cal?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  userId?: string;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  lactoseFree?: boolean;
  sugarFree?: boolean;
  ingredients?: Ingredient[];
};

export default function MenuForm(props: { menu?: Menu }) {
  const { menu } = props;
  const [formData, setFormData] = useState<Menu | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (props.menu) {
      setFormData(props.menu as Menu);
    } else {
      setFormData((prev) => ({
        ...prev,
        createdAt: new Date(),
      }));
    }
  }, [props.menu]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/menu", {
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
      router.push("/dashboard/menu");
    } catch (err) {
      console.error(err);
      setError("Błąd zapisu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 lg:p-8 rounded-3xl">
      <h1 className="h-[1.25rem] text-xl font-bold my-3">{formData?.name}</h1>
      <small className="h-[1rem] block mb-3 text-gray-500">
        {formData?.createdAt ? formData.createdAt.toLocaleString() : ""}
      </small>

      <input type="hidden" name="id" value={formData?.id ?? ""} />
      <Input name="category" value={formData?.category} handleChange={handleChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        <Input name="name" value={formData?.name} handleChange={handleChange} />
        <Input type="number" name="price" value={formData?.price} handleChange={handleChange} />
        <Input type="number" name="weight" value={formData?.weight} handleChange={handleChange} />
        <Input type="number" name="cal" value={formData?.cal} handleChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        <Input type="number" name="protein" value={formData?.protein} handleChange={handleChange} />
        <Input type="number" name="fat" value={formData?.fat} handleChange={handleChange} />
        <Input type="number" name="carbs" value={formData?.carbs} handleChange={handleChange} />
      </div>

      <div className="w-fit pt-6 flex gap-3 flex-wrap">
        <Input
          type="checkbox"
          name="vege"
          value={formData?.vegetarian}
          handleChange={handleChange}
        />

        <Input type="checkbox" name="vegan" value={formData?.vegan} handleChange={handleChange} />

        <Input
          type="checkbox"
          name="glutenFree"
          value={formData?.glutenFree}
          handleChange={handleChange}
        />

        <Input
          type="checkbox"
          name="lactoseFree"
          value={formData?.lactoseFree}
          handleChange={handleChange}
        />

        <Input
          type="checkbox"
          name="sugarFree"
          value={formData?.sugarFree}
          handleChange={handleChange}
        />
      </div>

      {/*<select name="ingredients" value={formData?.ingredients} handleChange={handleChange}>*/}
      {/*  {ingredients.map((ingredient: Ingredient) => (*/}
      {/*    <option key={ingredient.id} value={ingredient.id}>*/}
      {/*      {ingredient.name}*/}
      {/*    </option>*/}
      {/*  ))}*/}
      {/*</select>*/}

      <div className="flex gap-3 justify-end items-center mt-10">
        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" className="button">
          Zapisz pozycję menu
        </button>
      </div>
    </form>
  );
}
