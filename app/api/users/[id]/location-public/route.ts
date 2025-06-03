import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const userRef = doc(db, "users", id);
  const user = await getDoc(userRef);

  if (!user.exists()) {
    return NextResponse.json({ error: "Nie znaleziono użytkownika" }, { status: 404 });
  }

  const { location, lat, lng, isOpen } = user.data();
  return NextResponse.json({ location, lat, lng, isOpen: !!isOpen });
}
