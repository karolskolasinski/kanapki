import { adminDb } from "@/utils/firebase-admin";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const snapshot = await adminDb
    .collection("users")
    .where("login", "==", email)
    .get();

  if (snapshot.empty) {
    return NextResponse.json({ error: "Nie znaleziono użytkownika" }, { status: 401 });
  }

  const user = snapshot.docs[0].data();

  if (user.password !== password) {
    return NextResponse.json({ error: "Błędne hasło" }, { status: 401 });
  }

  const token = signToken({ uid: snapshot.docs[0].id, role: user.role });

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
