import Link from "next/link";
import Image from "next/image";

type DashboardItemProps = {
  item: "users" | "ingredients" | "menu" | "location" | "password";
  count: number;
};

const items = {
  users: {
    label: "Pojazdy",
    icon: "speed_truck.svg",
    bg: "bg-[#ebeafc]",
    bgHover: "hover:border-violet-200",
  },
  ingredients: {
    label: "Składniki",
    icon: "ingredients.svg",
    bg: "bg-[#f9ebfd]",
    bgHover: "hover:border-pink-200",
  },
  menu: {
    label: "Menu",
    icon: "dish.svg",
    bg: "bg-[#e9f6fa]",
    bgHover: "hover:border-sky-200",
  },
  location: {
    label: "Lokalizacja",
    icon: "location.svg",
    bg: "bg-[#f8edeb]",
    bgHover: "hover:border-orange-200",
  },
  password: {
    label: "Hasło",
    icon: "password.svg",
    bg: "bg-[#D6F5E3]",
    bgHover: "hover:border-green-200",
  },
};

export const itemClassName =
  "bg-white p-4 text-lg rounded-3xl flex gap-3 items-center border border-transparent hover:border duration-300 ease-in-out font-semibold flex-1 cursor-pointer ";

export default function DashboardItem(props: DashboardItemProps) {
  const { item, count } = props;

  return (
    <Link href={`/dashboard/${item}`} className={itemClassName + items[item].bgHover}>
      <div className={`p-5 rounded-full ${items[item].bg}`}>
        <Image
          src={items[item].icon}
          alt={item}
          width={24}
          height={24}
        />
      </div>

      <div>
        <small className="text-gray-400">{count} szt.</small>
        <div>{items[item].label}</div>
      </div>
    </Link>
  );
}
