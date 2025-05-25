"use client";

import { useState } from "react";
import { Ingredient } from "@/components/IngredientForm";
import IngredientForm from "@/components/IngredientForm";
import Image from "next/image";

type IngredientsEditorProps = {
  ingredients: Ingredient[];
};

export default function IngredientsEditor(props: IngredientsEditorProps) {
  const [ingredient, setIngredient] = useState<Ingredient>();

  return (
    <>
      <div className="mb-4">
        <div className="flex gap-3 flex-wrap">
          {props.ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="bg-gray-100 px-3 py-1 rounded-xl text-gray-600 flex gap-1 items-center justify-center"
            >
              {ingredient.name}
              <button onClick={() => setIngredient(ingredient)}>
                <Image
                  src="/edit.svg"
                  alt="edit"
                  width={0}
                  height={0}
                  className="w-5 cursor-pointer"
                  priority
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <IngredientForm ingredient={ingredient} />
    </>
  );
}
