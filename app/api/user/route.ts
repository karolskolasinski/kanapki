import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const id = body?.id;
  const data = {
    name: body.name,
    email: body.email,
    fullName: body.fullName,
    model: body.model,
    registration: body.registration,
    location: body?.location ?? "",
  };

  try {
    if (id) {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, "users"), {
        ...data,
        password: await bcrypt.hash(body.password, 12),
        updatedAt: serverTimestamp(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
