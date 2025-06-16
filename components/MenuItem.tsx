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
  let bgClass = dish.category === "jc" ? "bg-orange-400" : "bg-cyan-400";
  bgClass = userId ? "bg-white" : bgClass;
  let liClass = "text-xl xs:text-2xl";
  liClass = userId ? "" : liClass;
  const fontClass = userId ? "" : "font-bold";
  const selectedIngredients = dish.ingredients
    ?.map((id) => ingredients.find((i) => i.id === id))
    .filter(Boolean);

  return (
    <>
      <li
        className={`clear-both after:float-left after:w-0 after:whitespace-nowrap flow-root ${liClass}`}
      >
        <span className={bgClass}>
          {showLabel && <h2 className="my-3 font-semibold">{label}</h2>}

          {userId && (
            <div className="inline align-text-top">
              <Switcher checked={checked} dishId={dish.id!} userId={userId} />
            </div>
          )}

          <span className={`${fontClass} pr-1`}>{dish.name}</span>
          {dish.weight && <small className={`text-xs pr-1 ${fontClass}`}>{dish.weight}g</small>}

          {userId && (
            <Link href={`/dashboard/dishes/${dish.id}`} className="pl-1 align-text-top">
              <Image
                src="/edit.svg"
                alt="edycja"
                width={20}
                height={20}
                className="inline"
              />
            </Link>
          )}
        </span>

        <span className={`${bgClass} float-right relative z-10 pl-1 ${fontClass}`}>
          {dish.price}
        </span>
      </li>

      {!userId && (
        <div className="text-[.7rem] xs:text-xs pt-2">
          {formatDishLabels(dish)}
        </div>
      )}

      {!userId && (
        <div className="text-[.7rem] xs:text-xs pb-5">
          {(selectedIngredients?.length ?? 0) > 0 && <span className="font-semibold">skład:</span>}
          {" "}
          {selectedIngredients?.map((i) => i?.name).join(", ")}
        </div>
      )}
    </>
  );
}
