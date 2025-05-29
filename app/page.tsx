import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/app/dashboard/users/page";
import { Dish } from "@/app/dashboard/dishes/page";
import SelectedAddress from "@/components/SelectedAddress";
import Menu from "@/components/Menu";

export default async function Home() {
  const docRef = collection(db, "users");
  const docSnap = await getDocs(docRef);
  const users: User[] = docSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
    };
  });

  const dishesRef = collection(db, "dishes");
  const dishesQ = query(
    dishesRef,
    where("userIds", "!=", []),
    orderBy("userIds"), // Required when using != operator
    orderBy("category", "asc"),
  );
  const dishesSnap = await getDocs(dishesQ);
  const dishes: Dish[] = dishesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  return (
    <>
      <section className="overflow-auto max-w-7xl mx-auto py-4 px-2">
        <div className="flex justify-between">
          <SelectedAddress users={users} />
        </div>
      </section>

      {/*<Menu />*/}

      <section className="flex-1 w-full flex gap-5 overflow-auto snap-x max-w-7xl mx-auto py-14 px-2">
        <div className="snap-center md:w-[50%]">
          <div className="card bg-orange-400">
            <div className="card-title">
              <h3 className="uppercase font-work-sans text-2xl font-black text-center">
                Jeszcze ciepłe
              </h3>
            </div>

            <div>Menu 1</div>
          </div>
        </div>

        <div className="snap-center md:w-[50%]">
          {/*<div>*/}
          {/*  <strong>NIEŹLE ZMROŻONE 🥶</strong>: https://niezlezmrozone.pl*/}
          {/*</div>*/}

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
    </>
  );
}
