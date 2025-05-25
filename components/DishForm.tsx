"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ingredient } from "@/components/IngredientForm";
import Input from "@/components/Input";
import { Dish } from "@/app/dashboard/dishes/page";
import { User } from "@/app/dashboard/users/page";

type DishFormProps = {
  dish?: Dish;
  ingredients: Ingredient[];
  users: User[];
};

export default function DishForm(props: DishFormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.value === "ingredient" && e.target instanceof HTMLInputElement) {
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

    if (e.target.value === "userId" && e.target instanceof HTMLInputElement) {
      const userIds = new Set(formData?.userIds);
      if (e.target.checked) {
        userIds.add(e.target.name);
      } else {
        userIds.delete(e.target.name);
      }
      setFormData((prev) => ({
        ...prev,
        userIds: Array.from(userIds),
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

    try {
      const response = await fetch("/api/dishes", {
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
      router.push("/dashboard/dishes");
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
        <div>
          <div className="block text-sm text-gray-600 my-1">Pojazd</div>
          <div className="flex gap-3">
            {props.users.map((user) => (
              <Input
                key={user.id}
                type="userId"
                name={user.id!}
                value={user.name}
                checked={formData?.userIds?.includes(user.id!)}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="block text-sm text-gray-600 my-1">Kategoria</div>
          <ul className="flex gap-3">
            {["jc", "nz"].map((category) => (
              <li key={category}>
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  className="sr-only peer h-10 w-fit"
                  required
                  checked={formData?.category === category}
                  onChange={handleChange}
                />
                <label
                  htmlFor={category.toLowerCase()}
                  className="flex items-center p-2 h-10 bg-white border border-gray-300 rounded-xl cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-purple-800 hover:bg-gray-50"
                >
                  {category === "jc" ? "Jeszcze ciepłe" : "Nieźle zmrożone"}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
        <label className="block text-sm text-gray-600 my-1">Opcje</label>
        <div className="w-fit flex gap-3 flex-wrap">
          <Input
            type="checkbox"
            name="vegetarian"
            value="Wegetariańskie"
            checked={formData?.vegetarian ?? false}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="vegan"
            value="Wegańskie"
            checked={formData?.vegan ?? false}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="glutenFree"
            value="Bez glutenu"
            checked={formData?.glutenFree ?? false}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="lactoseFree"
            value="Bez laktozy"
            checked={formData?.lactoseFree ?? false}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="sugarFree"
            value="Bez cukru"
            checked={formData?.sugarFree ?? false}
            handleChange={handleChange}
          />
        </div>
      </div>

      <div className="pt-6">
        <label className="block text-sm text-gray-600 my-1">Składniki</label>

        <div className="flex flex-wrap gap-3">
          {props.ingredients.map((ingredient: Ingredient) => (
            <Input
              key={ingredient.id}
              type="ingredient"
              name={ingredient?.id ?? ""}
              value={ingredient.name}
              checked={formData?.ingredients?.includes(ingredient.id ?? "")}
              handleChange={handleChange}
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
