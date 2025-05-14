import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="overflow-auto max-w-7xl mx-auto py-4 px-2 flex flex-col gap-5">
      <small className="text-gray-500 uppercase font-semibold">
        Dashboard
      </small>

      <div className="bg-white p-4 text-lg rounded-3xl flex gap-3 items-center hover:bg-gray-100 duration-300 ease-in-out font-semibold">
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
      </div>

      <div className="bg-white p-4 text-lg rounded-3xl flex gap-3 items-center hover:bg-gray-100 duration-300 ease-in-out font-semibold">
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
      </div>

      <div className="bg-white p-4 text-lg rounded-3xl flex gap-3 items-center hover:bg-gray-100 duration-300 ease-in-out font-semibold">
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
      </div>
    </div>
  );
}
