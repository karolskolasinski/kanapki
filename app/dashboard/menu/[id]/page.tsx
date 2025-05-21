import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import MenuForm from "@/components/MenuForm";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let menu;

  if (id !== "new") {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      menu = {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw new Error("Nie znaleziono pozycji menu o takim id.");
    }
  }

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <div className="text-gray-500 uppercase font-semibold mx-5 my-3">
        <small>Formularz pozycji menu</small>
      </div>

      <MenuForm menu={menu} />
    </section>
  );
}

export default Page;
