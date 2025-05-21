import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function Menu() {
  const menuDocRef = collection(db, "menu");
  const menuQ = query(menuDocRef, orderBy("createdAt", "desc"));
  const menuDocSnap = await getDocs(menuQ);
  const menu = menuDocSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const usersDocRef = collection(db, "users");
  const usersQ = query(usersDocRef, orderBy("updatedAt", "desc"));
  const usersDocSnap = await getDocs(usersQ);
  const users = usersDocSnap.docs.map((doc) => ({
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
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form action={`/dashboard/menu/new`} method="GET" className="flex justify-end mt-10">
        <button className="button">Dodaj</button>
      </form>
    </section>
  );
}

export default Menu;
