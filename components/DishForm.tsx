"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ingredient } from "@/components/IngredientForm";
import Input from "@/components/Input";
import { Dish } from "@/app/dashboard/dishes/page";

export default function DishForm(props: { dish?: Dish; ingredients: Ingredient[] }) {
  const [formData, setFormData] = useState<Dish>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (props.dish) {
      setFormData(props.dish as Dish);
    } else {
      setFormData((prev) => ({
        ...prev,
        createdAt: new Date(),
        ingredients: [],
      }));
    }
  }, [props.dish]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "ingredient") {
      const ingredients = new Set(formData?.ingredients);
      if (e.target.checked) {
        ingredients.add(e.target.name);
      } else {
        ingredients.delete(e.target.name);
      }
      setFormData((prev) => ({
        ...prev,
        ingredients: Array.from(ingredients),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    // try {
    //   const response = await fetch("/api/menu", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //
    //   const result = await response.json();
    //   if (!response.ok) {
    //     setError(result.error || "Błąd zapisu");
    //     return;
    //   }
    //
    //   setError(null);
    //   router.push("/dashboard/menu");
    // } catch (err) {
    //   console.error(err);
    //   setError("Błąd zapisu");
    // }
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
        <Input type="number" name="kcal" value={formData?.kcal} handleChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        <Input type="number" name="protein" value={formData?.protein} handleChange={handleChange} />
        <Input type="number" name="fat" value={formData?.fat} handleChange={handleChange} />
        <Input type="number" name="carbs" value={formData?.carbs} handleChange={handleChange} />
      </div>

      <div className="pt-6">
        <div className="text-sm text-gray-600 my-1">Opcje</div>
        <div className="w-fit flex gap-3 flex-wrap">
          <Input
            type="checkbox"
            name="vege"
            value="Wegetariańskie"
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="vegan"
            value="Wegańskie"
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="glutenFree"
            value="Bez glutenu"
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="lactoseFree"
            value="Bez laktozy"
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="sugarFree"
            value="Bez cukru"
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="pt-6">
        <div className="text-sm text-gray-600 my-1">Składniki</div>

        <div className="flex flex-wrap gap-3">
          {props.ingredients.map((ingredient: Ingredient) => (
            <Input
              key={ingredient.id}
              type="ingredient"
              name={ingredient?.id ?? ""}
              handleChange={handleChange}
              value={ingredient.name}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end items-center mt-10">
        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" className="button">
          Zapisz pozycję menu
        </button>
      </div>
    </form>
  );
}
