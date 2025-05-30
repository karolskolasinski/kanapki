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

      <div className="flex items-baseline">
        {userId && <Switcher checked={checked} dishId={dish.id!} userId={userId} />}

        <div>
          {!userId && (dish.vegetarian || dish.vegan) && (
            <Image
              src="/vege.svg"
              alt="Wege lub vegan"
              width={24}
              height={24}
              className="inline"
            />
          )}

          <span className="text-base align-middle">{dish.name}</span>

          {dish.weight && <small className="text-xs pl-1 align-text-bottom">{dish.weight}g</small>}
        </div>

        <div className="self-end grow flex px-1">
          <div className="min-w-4 grow self-baseline h-[2px] bg-repeat-x bg-center bg-[length:8px_2px] bg-[url('/dot.svg')]" />
          <span className="self-baseline">{dish.price}</span>
        </div>

        {userId && (
          <Link href={`/dashboard/dishes/${dish.id}`} className="pl-3">
            <Image
              src="/edit.svg"
              alt="edycja"
              width={20}
              height={20}
              className="inline"
            />
          </Link>
        )}
      </div>

      {!userId && (
        <div className={`${fontWeightClass} text-[.7rem] xs:text-xs pt-3 pb-2`}>
          {formatDishLabels(dish)}
        </div>
      )}

      {!userId && (
        <div className={`${fontWeightClass} text-[.7rem] xs:text-xs`}>
          <span className="font-bold">skład:</span> {ingredients
            .filter((i) => dish.ingredients?.includes(i.id!))
            .map((i) => i.name)
            .join(", ")}
        </div>
      )}
    </div>
  );
}
