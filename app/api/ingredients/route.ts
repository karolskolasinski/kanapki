import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const usersRef = collection(db, "ingredients");
    await addDoc(usersRef, { name: body.name, createdAt: serverTimestamp() });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}
