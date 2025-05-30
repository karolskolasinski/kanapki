"use client";

import { useLocation } from "@/lib/location-context";
import { useEffect, useState } from "react";
import { Dish } from "@/app/dashboard/dishes/page";

function Menu() {
  const { location, setLocation } = useLocation();
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const res = await fetch(`/api/dishes/${location?.userId}`);
      const data = await res.json();
      setDishes(data);
    };

    fetchDishes();
  }, [location, setLocation]);

  return (
    <section className="flex-1 w-full flex gap-5 overflow-auto snap-x max-w-7xl mx-auto py-14 px-2">
      <div className="snap-center md:w-[50%]">
        <div className="card bg-orange-400">
          <div className="card-title">
            <h3 className="uppercase font-work-sans text-2xl font-black text-center">
              Jeszcze ciepłe
            </h3>
          </div>

          {dishes.filter((d) => d.category === "jc").map((dish) => (
            <div key={dish.id}>{dish.name}</div>
          ))}
        </div>
      </div>

      <div className="snap-center md:w-[50%]">
        <div className="card bg-cyan-400">
          <div className="card-title">
            <h3 className="uppercase font-work-sans text-2xl font-black text-center">
              Nieźle zmrożone
            </h3>
          </div>

          Menu 1
        </div>
      </div>
    </section>
  );
}

export default Menu;
