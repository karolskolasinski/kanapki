import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth-config";
import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name } = body;
    const userRef = doc(db, "ingredients", id);
    await updateDoc(userRef, { name });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}
