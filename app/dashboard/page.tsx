import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardItem from "@/components/DashboardItem";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const usersSnap = await getCountFromServer(collection(db, "users"));
  const ingredientsSnap = await getCountFromServer(collection(db, "ingredients"));
  const menuSnap = await getCountFromServer(collection(db, "menu"));

  const usersCount = usersSnap.data().count;
  const ingredientsCount = ingredientsSnap.data().count;
  const menuCount = menuSnap.data().count;

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Dashboard</small>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <DashboardItem item="users" count={usersCount} />
        <DashboardItem item="ingredients" count={ingredientsCount} />
        <DashboardItem item="menu" count={menuCount} />
        <DashboardItem item="location" count={0} />
        <DashboardItem item="password" count={0} />
        <LogoutButton />
      </div>
    </section>
  );
}
