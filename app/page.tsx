import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/app/dashboard/users/page";
import SelectedAddress from "@/components/SelectedAddress";
import Menu from "@/components/Menu";

export default async function Home() {
  const docRef = collection(db, "users");
  const docSnap = await getDocs(docRef);
  const users: User[] = docSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
    };
  });

  return (
    <>
      <SelectedAddress users={users} />
      <Menu />
    </>
  );
}
