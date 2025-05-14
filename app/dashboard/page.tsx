import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="overflow-auto max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Dashboard</small>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <Link
          href="/dashboard/vehicles"
          className="bg-white p-4 text-lg rounded-3xl flex gap-3 items-center border border-transparent hover:border hover:border-violet-200 duration-300 ease-in-out font-semibold flex-1"
        >
          <div className="bg-[#ebeafc] p-5 rounded-full">
            <img
              src="/speed_truck.svg"
              alt="pojazdy"
              className="w-6"
            />
          </div>

          <div>
            <small className="text-gray-400">1 szt.</small>
            <div>Pojazdy</div>
          </div>
        </Link>

        <Link
          className="bg-white p-4 text-lg rounded-3xl flex gap-3 items-center border border-transparent hover:border hover:border-pink-200 duration-300 ease-in-out font-semibold flex-1"
          href="/dashboard/ingredients"
        >
          <div className="bg-[#f9ebfd] p-5 rounded-full">
            <img
              src="/ingredients.svg"
              alt="składinki"
              className="w-6"
            />
          </div>

          <div>
            <small className="text-gray-400">X szt.</small>
            <div>Składniki</div>
          </div>
        </Link>

        <Link
          className="bg-white p-4 text-lg rounded-3xl flex gap-3 items-center border border-transparent hover:border hover:border-sky-200 duration-300 ease-in-out font-semibold flex-1"
          href="/dashboard/menu"
        >
          <div className="bg-[#e9f6fa] p-5 rounded-full">
            <img
              src="/dish.svg"
              alt="menu"
              className="w-6"
            />
          </div>

          <div>
            <small className="text-gray-400">X szt.</small>
            <div>Menu</div>
          </div>
        </Link>
      </div>
    </section>
  );
}
