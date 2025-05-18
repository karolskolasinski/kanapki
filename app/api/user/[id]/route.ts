import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-config";
import { NextResponse, NextRequest } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.formData();
  const method = body.get("_method");

  if (method === "DELETE") {
    const userRef = doc(db, "users", params.id);
    try {
      await deleteDoc(userRef);
      return NextResponse.redirect(new URL("/dashboard/users", req.url));
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
