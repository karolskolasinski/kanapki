import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Ingredient } from "@/components/IngredientForm";
import IngredientsEditor from "@/components/IngredientsEditor";

async function Ingredients() {
  const docRef = collection(db, "ingredients");
  const q = query(docRef, orderBy("createdAt", "asc"));
  const docSnap = await getDocs(q);
  const ingredients: Ingredient[] = docSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Składniki</small>
      </div>

      <div className="bg-white rounded-3xl p-4 lg:p-8">
        <IngredientsEditor ingredients={ingredients} />
      </div>
    </section>
  );
}

export default Ingredients;
