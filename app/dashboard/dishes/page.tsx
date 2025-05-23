import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/app/dashboard/users/page";

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
  userId?: string;
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
  }));

  const usersRef = collection(db, "users");
  const usersQ = query(usersRef, orderBy("updatedAt", "desc"));
  const usersSnap = await getDocs(usersQ);
  const users: User[] = usersSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Menu</small>
      </div>

      <div className="bg-white rounded-3xl p-4 lg:p-8">
        <div className="mb-4">
          <div className="flex gap-3 flex-wrap">
            {users.map((user) => {
              // const userMenu = menu.filter((item) => item.userId === user.id);

              return (
                <div
                  key={user.id}
                  className="bg-gray-100 px-3 py-1 rounded-xl text-gray-600 flex gap-1 items-center justify-center"
                >
                  {user.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form action={`/dashboard/dishes/new`} method="GET" className="flex justify-end mt-10">
        <button className="button">Dodaj</button>
      </form>
    </section>
  );
}

export default Dishes;
