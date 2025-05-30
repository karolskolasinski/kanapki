import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, serverTimestamp } from "firebase/firestore";
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

export async function GET() {
  try {
    const ingredientsRef = collection(db, "ingredients");
    const q = query(ingredientsRef);
    const snapshot = await getDocs(q);

    const ingredients = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));

    return NextResponse.json(ingredients);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Błąd pobierania składników" }, { status: 500 });
  }
}
