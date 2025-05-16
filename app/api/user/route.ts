import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, model, registration, fullName, location, password } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await addDoc(collection(db, "users"), {
      name,
      email,
      model,
      registration,
      fullName,
      updatedAt: serverTimestamp(),
      location,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
