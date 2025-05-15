"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  model?: string;
  registration?: string;
  fullName?: string;
  location?: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("fetching data error: ", err);
        setError("Błąd pobierania danych");
      }

      setLoading(false);
    };

    loadUsers();
  }, []);

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Pojazdy</small>
      </div>

      {loading && <Loading />}

      {error && (
        <h1 className="text-red-500 flex space-x-2 justify-center items-center h-24">
          Błąd: {error}
        </h1>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-3xl flex flex-col gap-2 border border-transparent hover:border text-gray-700"
          >
            <h2 className="text-base font-bold text-gray-900">{user.name}</h2>

            {location(user.location)}

            <small>
              <strong>Imię i nazwisko:</strong> {user.fullName}
            </small>

            <small>
              <strong>Email:</strong> {user.email}
            </small>

            <small>
              <strong>Model:</strong> {user.model}
            </small>

            <small>
              <strong>Rejestracja:</strong> {user.registration}
            </small>

            <div className="flex gap-3 justify-end">
              <button className="button !bg-transparent !border-gray-300">
                Usuń
              </button>

              <button
                className="button"
                onClick={() => router.push(`/dashboard/users/${user.id}`)}
              >
                Edytuj
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  function location(location: User["location"]) {
    return (
      <small>
        <strong className="hidden xs:inline">Lokalizacja:</strong>{" "}
        {location ? location : <span className="text-red-500">Brak ustawionej lokalizacji</span>}
      </small>
    );
  }
}

export default Users;
