import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/app/dashboard/users/page";
import MenuItem from "@/components/MenuItem";
import Link from "next/link";

export type Dish = {
  id?: string;
  createdAt?: unknown;
  name?: string;
  category?: string;
  price?: number;
  weight?: number;
  kcal?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  userIds?: string[];
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  lactoseFree?: boolean;
  sugarFree?: boolean;
  ingredients?: string[];
};

async function Dishes() {
  const dishesRef = collection(db, "dishes");
  const dishesQ = query(dishesRef, orderBy("createdAt", "desc"));
  const dishesSnap = await getDocs(dishesQ);
  const dishes: Dish[] = dishesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  const usersRef = collection(db, "users"); // todo: where id === currentId / if admin let it as it is
  const usersQ = query(usersRef, orderBy("updatedAt", "desc"));
  const usersSnap = await getDocs(usersQ);
  const users: User[] = usersSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const gridCols = users.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  const { groupedDishes, unassigned } = groupDishes(users, dishes);

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Menu</small>
      </div>

      <div className={`grid ${gridCols} gap-5 pb-5`}>
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-3xl p-4 lg:p-8">
            <h1 className="block mb-5 font-bold text-xl">{user.name}</h1>

            {groupedDishes[user.id!].jc.map((dish, index) => (
              <MenuItem dish={dish} key={dish.id} showLabel={index === 0} />
            ))}

            {groupedDishes[user.id!].nz.map((dish, index) => (
              <MenuItem dish={dish} key={dish.id} showLabel={index === 0} />
            ))}
          </div>
        ))}
      </div>

      {(unassigned.jc.length > 0 || unassigned.nz.length > 0) && (
        <div className="bg-white rounded-3xl p-4 lg:p-8">
          <h1 className="block mb-5 font-bold text-xl text-gray-500">Nie przypisane</h1>

          {unassigned.jc.map((dish, index) => (
            <MenuItem dish={dish} key={dish.id} showLabel={index === 0} />
          ))}
          {unassigned.nz.map((dish, index) => (
            <MenuItem dish={dish} key={dish.id} showLabel={index === 0} />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-10">
        <Link href="/dashboard/dishes/new" className="button">
          Dodaj
        </Link>
      </div>
    </section>
  );
}

function groupDishes(users: User[], dishes: Dish[]) {
  const groupedDishes: Record<string, { jc: Dish[]; nz: Dish[] }> = {};
  const unassigned: { jc: Dish[]; nz: Dish[] } = { jc: [], nz: [] };

  for (const user of users) {
    groupedDishes[user.id!] = { jc: [], nz: [] };
  }

  for (const dish of dishes) {
    const assigned = !!dish.userIds?.length;

    if (!assigned) {
      if (dish.category === "jc") {
        unassigned.jc.push(dish);
      } else if (dish.category === "nz") {
        unassigned.nz.push(dish);
      }
      continue;
    }

    dish.userIds?.forEach((userId) => {
      if (groupedDishes[userId]) {
        if (dish.category === "jc") {
          groupedDishes[userId].jc.push(dish);
        } else if (dish.category === "nz") {
          groupedDishes[userId].nz.push(dish);
        }
      }
    });
  }
  return { groupedDishes, unassigned };
}

export default Dishes;
