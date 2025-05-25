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

  const usersRef = collection(db, "users"); // where id === currentId / if admin let it as it is
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
          <div className="grid lg:grid-cols-2 gap-3">
            {users.map((user) => {
              const jc = dishes.filter((dish) => dish.userId === user.id && dish.category === "jc");
              const nz = dishes.filter((dish) => dish.userId === user.id && dish.category === "nz");

              return (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-xl p-3 text-center text-xl"
                >
                  <strong className="block mb-5">{user.name}</strong>

                  {jc.map((dish) => (
                    <div key={dish.id} className="flex items-center text-gray-500">
                      <div className="pr-4">on/off</div>
                      <div className="w-48">{dish.name}</div>
                      <div className="flex-1 mx-2 h-[2px] bg-repeat-x bg-center bg-[length:8px_2px] bg-[url('/dots.svg')]" />
                      <div className="w-16 text-right">{dish.price}</div>
                      <div className="pl-4">edit</div>
                      <div className="pl-4">delete</div>
                    </div>
                  ))}
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
