import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/components/UserForm";

async function Users() {
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

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Pojazdy</small>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-3xl flex flex-col gap-2 border border-transparent hover:border"
          >
            <div className="flex gap-3 items-center">
              <h2 className="text-base font-bold text-black">{user.name}</h2>
              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                {user.role}
              </span>
            </div>

            {user.location
              ? user.location
              : <span className="text-red-500">Brak ustawionej lokalizacji</span>}

            <small>
              <strong>Aktualizacja:</strong> {user.updatedAt?.toLocaleString()}
            </small>

            <small>
              <strong>Email:</strong> {user.email}
            </small>

            <small>
              <strong>Imię i nazwisko:</strong> {user.fullName}
            </small>

            <small>
              <strong>Model:</strong> {user.model}
            </small>

            <small>
              <strong>Rejestracja:</strong> {user.registration}
            </small>

            <div className="flex gap-3 justify-end">
              <button className="button !bg-transparent !border-gray-300">Usuń</button>

              <form action={`/dashboard/users/${user.id}`} method="GET">
                <button className="button">Edytuj</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
