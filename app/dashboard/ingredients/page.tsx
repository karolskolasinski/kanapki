import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import IngredientForm, { Ingredient } from "@/components/IngredientForm";
import Image from "next/image";

async function Ingredients() {
  const docRef = collection(db, "ingredients");
  const q = query(docRef, orderBy("createdAt", "desc"));
  const docSnap = await getDocs(q);
  const ingredients: Ingredient[] = docSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Ingredients</small>
      </div>

      <div className="bg-white rounded-3xl p-4 lg:p-8">
        <div className="mb-4">
          <div className="flex gap-3 flex-wrap">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="bg-gray-100 px-3 py-1 rounded-xl text-gray-600 flex gap-1 items-center justify-center"
              >
                {ingredient.name}
                <Image
                  src="/close.svg"
                  alt="logo"
                  width={0}
                  height={0}
                  className="w-5 cursor-pointer"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        <IngredientForm />
      </div>
    </section>
  );
}

export default Ingredients;
