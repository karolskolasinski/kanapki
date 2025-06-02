import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Dish } from "@/app/dashboard/dishes/page";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const dishesRef = collection(db, "dishes");
  const dishesQ = query(dishesRef, where("userIds", "array-contains", id));

  const dishesSnap = await getDocs(dishesQ);
  const dishes: Dish[] = dishesSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  return NextResponse.json(dishes);
}
