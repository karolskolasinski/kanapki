import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-config";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div>
        <strong>JESZCZE CIEPŁE 🔥</strong>: https://jeszczecieple.pl
      </div>

      <div>
        <strong>NIEŹLE ZMROŻONE 🥶</strong>: https://niezlezmrozone.pl
      </div>

      <div>
        {session ? <p>Witaj, {session.user?.name}</p> : (
          <p>
            Nie jesteś zalogowany. <a href="/login">Zaloguj się</a>
          </p>
        )}
      </div>
    </div>
  );
}
