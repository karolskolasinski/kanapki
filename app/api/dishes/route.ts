import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { authOptions } from "@/auth/auth-config";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const body = await req.json();
  const id = body?.id;
  const data = {
    ...body.name ? { name: body?.name } : {},
    ...body.category ? { category: body?.category } : {},
    ...body.price ? { price: body?.price } : {},
    ...body.weight ? { weight: body?.weight } : {},
    ...body.kcal ? { kcal: body?.kcal } : {},
    ...body.protein ? { protein: body?.protein } : {},
    ...body.fat ? { fat: body?.fat } : {},
    ...body.carbs ? { carbs: body?.carbs } : {},
    ...body.userIds ? { userIds: body?.userIds } : {},
    ...body.vegetarian ? { vegetarian: body?.vegetarian } : {},
    ...body.vegan ? { vegan: body?.vegan } : {},
    ...body.glutenFree ? { glutenFree: body?.glutenFree } : {},
    ...body.lactoseFree ? { lactoseFree: body?.lactoseFree } : {},
    ...body.sugarFree ? { sugarFree: body?.sugarFree } : {},
    ...body.ingredients ? { ingredients: body?.ingredients } : {},
  };

  if (body.userId) {
    data.userIds = body.checked ? arrayUnion(body.userId) : arrayRemove(body.userId);
  }

  try {
    if (id) {
      const userRef = doc(db, "dishes", id);
      await updateDoc(userRef, data);
    } else {
      const usersRef = collection(db, "dishes");
      await addDoc(usersRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}
