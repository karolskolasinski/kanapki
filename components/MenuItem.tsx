"use client";

import Link from "next/link";
import Image from "next/image";
import { Dish } from "@/app/dashboard/dishes/page";
import Switcher from "@/components/Switcher";
import { useIngredients } from "@/lib/ingredients-context";

type MenuItemProps = {
  dish: Dish;
  checked?: boolean;
  showLabel?: boolean;
  userId?: string;
};

function formatDishLabels(dish: Dish): string {
  return [
    dish.vegetarian && "wege",
    dish.vegan && "vegan",
    dish.glutenFree && "bez glutenu",
    dish.lactoseFree && "bez laktozy",
    dish.sugarFree && "bez cukru",
    dish.kcal && `${dish.kcal}kcal`,
    dish.protein && `Białko ${dish.protein}g`,
    dish.fat && `Tłuszcze: ${dish.fat}g`,
    dish.carbs && `Węglowodany ${dish.carbs}g`,
  ].filter(Boolean).join(", ");
}

export default function MenuItem(props: MenuItemProps) {
  const { dish, checked, showLabel, userId } = props;
  const label = dish.category === "jc" ? "Jeszcze ciepłe" : "Nieźle zmrożone";
  const { ingredients } = useIngredients();
  const fontWeightClass = userId ? "font-normal" : "font-semibold";

  return (
    <div className="pb-5">
      {showLabel && <h2 className="my-3 font-semibold">{label}</h2>}
      <div className="flex">
        {userId && <Switcher checked={checked} dishId={dish.id!} userId={userId} />}

        <div className="flex-1 flex items-baseline">
          {!userId && (dish.vegetarian || dish.vegan) && (
            <div className="self-center">
              <Image src="/vege.svg" alt="Wege lub vegan" width={23} height={23} />
            </div>
          )}
          <div>{dish.name}</div>

          {dish.weight && <small className="text-xs px-1">{dish.weight}g</small>}

          <div className="flex-1 w-22 h-[2px] bg-repeat-x bg-center bg-[length:8px_2px] bg-[url('/dot.svg')]" />

          <div>{dish.price}</div>
        </div>

        {userId && (
          <Link href={`/dashboard/dishes/${dish.id}`} className="pl-3">
            <Image src="/edit.svg" alt="edycja" width={20} height={20} />
          </Link>
        )}
      </div>

      {!userId && (
        <div className={`${fontWeightClass} text-xs pt-3`}>
          {formatDishLabels(dish)}
        </div>
      )}

      {!userId && (
        <div className={`${fontWeightClass} text-xs`}>
          skład: {ingredients
            .filter((i) => dish.ingredients?.includes(i.id!))
            .map((i) => i.name)
            .join(", ")}
        </div>
      )}
    </div>
  );
}
