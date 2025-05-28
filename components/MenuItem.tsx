import Link from "next/link";
import Image from "next/image";
import { Dish } from "@/app/dashboard/dishes/page";
import Switcher from "@/components/Switcher";

type MenuItemProps = {
  dish: Dish;
  checked?: boolean;
  showLabel?: boolean;
  userId: string;
};

function MenuItem(props: MenuItemProps) {
  const { dish, checked, showLabel, userId } = props;
  const label = dish.category === "jc" ? "Jeszcze ciepłe" : "Nieźle zmrożone";

  return (
    <div className="pb-5">
      {showLabel && <h2 className="my-3 font-semibold">{label}</h2>}
      <div className="text-sm flex">
        <Switcher checked={checked} dishId={dish.id!} userId={userId} />

        <div className="flex-1 flex items-baseline">
          <div className="">{dish.name}</div>

          <div className="flex-1 w-22 h-[2px] bg-repeat-x bg-center bg-[length:8px_2px] bg-[url('/dot.svg')]" />

          <div className="">{dish.price}</div>
        </div>

        <Link href={`/dashboard/dishes/${dish.id}`} className="pl-3">
          <Image src="/edit.svg" alt="edycja" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
}

export default MenuItem;
