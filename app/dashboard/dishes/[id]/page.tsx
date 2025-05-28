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
        createdAt: data.createdAt.toDate(),
      };
    } else {
      throw new Error("Nie znaleziono pozycji menu o takim id");
    }
  }

  const ingredientsRef = collection(db, "ingredients");
  const ingredientsSnap = await getDocs(ingredientsRef);
  ingredients = ingredientsSnap.docs.map((doc) => {
    const data = doc.data();
    return ({
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    });
  });

  const usersRef = collection(db, "users");
  const usersSnap = await getDocs(usersRef);
  const users = usersSnap.docs.map((doc) => {
    const data = doc.data();
    return ({
      id: doc.id,
      ...data,
      updatedAt: data.updatedAt.toDate(),
    });
  });

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Formularz pozycji menu</small>
      </div>

      <DishForm dish={dish} ingredients={ingredients} users={users} />
    </section>
  );
}

export default Page;
