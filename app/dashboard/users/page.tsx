"use client";

import { useEffect, useState } from "react";

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
    <section className="flex-1 w-full overflow-auto max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Pojazdy</small>
      </div>

      {loading && <p className="text-gray-400 text-sm mx-5">Ładowanie...</p>}
      {error && <p className="text-red-500 text-sm mx-5">Błąd: {error}</p>}

      <ul className="mx-5 space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-3 rounded bg-white shadow-sm">
            <p className="font-semibold">{user.fullName || user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.model && <p className="text-sm">Model: {user.model}</p>}
            {user.registration && <p className="text-sm">Rejestracja: {user.registration}</p>}
            {user.location && <p className="text-sm">Lokalizacja: {user.location}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
