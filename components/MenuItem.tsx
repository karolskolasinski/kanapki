import Link from "next/link";
import Image from "next/image";
import { Dish } from "@/app/dashboard/dishes/page";

type MenuItemProps = {
  dish: Dish;
  checked?: boolean;
  showLabel?: boolean;
};

function Switcher(props: { checked?: boolean }) {
  const { checked } = props;
  return (
    <label className="inline-flex items-center cursor-pointer pr-3">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        defaultChecked={checked}
      />
      <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600" />
    </label>
  );
}

function MenuItem(props: MenuItemProps) {
  const { dish, checked, showLabel } = props;
  const label = dish.category === "jc" ? "Jeszcze ciepłe" : "Nieźle zmrożone";

  return (
    <div className="pb-5">
      {showLabel && <h2 className="my-3 font-semibold">{label}</h2>}
      <div className="text-sm flex">
        <Switcher checked={checked} />

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
