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
  const dishesQ = query(dishesRef, orderBy("category", "asc"));
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

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Menu</small>
      </div>

      <div className={`grid ${gridCols} gap-5 pb-5`}>
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-3xl p-4 lg:p-8">
            <h1 className="block mb-5 font-bold text-xl">{user.name}</h1>

            {dishes.map((dish, index) => {
              const checked = dish.userIds?.includes(user.id!);
              const showLabel = index === 0 || dishes[index - 1].category !== dish.category;

              return (
                <MenuItem
                  dish={dish}
                  key={dish.id}
                  checked={checked}
                  showLabel={showLabel}
                  userId={user.id!}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <Link href="/dashboard/dishes/new" className="button">
          Dodaj
        </Link>
      </div>
    </section>
  );
}

export default Dishes;
