import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/app/dashboard/users/page";
import Link from "next/link";
import Image from "next/image";

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
  }));

  const usersRef = collection(db, "users"); // todo: where id === currentId / if admin let it as it is
  const usersQ = query(usersRef, orderBy("updatedAt", "desc"));
  const usersSnap = await getDocs(usersQ);
  const users: User[] = usersSnap.docs.map((doc) => {
    return ({
      id: doc.id,
      ...doc.data(),
    });
  });
  const gridCols = users.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Menu</small>
      </div>

      <div className={`grid ${gridCols} gap-5`}>
        {users.map((user) => {
          const jc = dishes.filter((dish) =>
            dish.userIds?.includes(user.id ?? "") && dish.category === "jc"
          );
          const nz = dishes.filter((dish) =>
            dish.userIds?.includes(user.id ?? "") && dish.category === "nz"
          );

          return (
            <div
              key={user.id}
              className="bg-white rounded-3xl p-4 lg:p-8"
            >
              <h1 className="block mb-5 font-bold text-xl">{user.name}</h1>

              {jc.map((dish) => (
                <div key={dish.id}>
                  <h2 className="my-3 text-orange-400">Jeszcze ciepłe</h2>
                  <div className="text-sm flex">
                    <div className="flex-1 flex items-baseline">
                      <div className="">{dish.name}</div>

                      <div className="flex-1 w-22 h-[2px] bg-repeat-x bg-center bg-[length:8px_2px] bg-[url('/dot.svg')]" />

                      <div className="">{dish.price}</div>
                    </div>

                    <Link href={`/dashboard/dishes/${dish.id}`} className="pl-3">
                      <Image src="/edit.svg" alt="edycja" width={20} height={20} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <form action={`/dashboard/dishes/new`} method="GET" className="flex justify-end mt-10">
        <button className="button">Dodaj</button>
      </form>
    </section>
  );
}

export default Dishes;
