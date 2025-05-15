import UserForm from "@/components/UserForm";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  let user;

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    user = {
      id: docSnap.id,
      ...data,
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
    };
  }

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto py-4 px-2">
      <UserForm user={user} />
    </section>
  );
}

export default Page;
