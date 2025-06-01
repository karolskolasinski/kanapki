"use client";

import { useLocation } from "@/lib/location-context";
import { useEffect, useState } from "react";
import { Dish } from "@/app/dashboard/dishes/page";
import MenuItem from "@/components/MenuItem";

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
      {["jc", "nz"].map((category) => {
        const bgClass = category === "jc" ? "bg-orange-400" : "bg-cyan-400";

        return (
          <div key={category} className="snap-center md:w-[50%]">
            <div className={`card ${bgClass}`}>
              <div className="card-title">
                <h3 className="uppercase font-work-sans text-2xl font-black text-center">
                  {category === "jc" ? "Jeszcze ciepłe" : "Nieźle zmrożone"}
                </h3>
              </div>

              <ul className="leaders">
                {dishes.filter((d) => d.category === category).map((dish) => (
                  <MenuItem key={dish.id} dish={dish} />
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Menu;
