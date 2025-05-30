"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Ingredient } from "@/components/IngredientForm";

interface IngredientsContextType {
  ingredients: Ingredient[];
}

const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("/api/ingredients");
        const data = await res.json();
        setIngredients(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <IngredientsContext.Provider value={{ ingredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error("useIngredients must be used within an IngredientsProvider");
  }
  return context;
};
