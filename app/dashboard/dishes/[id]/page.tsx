import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DishForm from "@/components/DishForm";
import { Ingredient } from "@/components/IngredientForm";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let dish;
  let ingredients: Ingredient[] = [];

  if (id !== "new") {
    const dishesRef = doc(db, "dishes", id);
    const dishesSnap = await getDoc(dishesRef);
    if (dishesSnap.exists()) {
      const data = dishesSnap.data();
      dish = {
        id: dishesSnap.id,
        ...data,
      };
    } else {
      throw new Error("Nie znaleziono pozycji menu o takim id.");
    }
  }

  const ingredientsRef = collection(db, "ingredients");
  const ingredientsSnap = await getDocs(ingredientsRef);
  ingredients = ingredientsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  }));

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Formularz pozycji menu</small>
      </div>

      <DishForm dish={dish} ingredients={ingredients} />
    </section>
  );
}

export default Page;
