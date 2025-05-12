import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      DASH
    </div>
  );
}
