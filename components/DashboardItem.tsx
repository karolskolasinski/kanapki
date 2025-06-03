import Link from "next/link";
import Image from "next/image";

type DashboardItemProps = {
  item: keyof typeof items;
  count: number;
};

const pluralize = (count: number, one: string, few: string, many: string) => {
  if (count === 1) return one;
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return few;
  return many;
};

const items = {
  users: {
    label: "Pojazdy",
    icon: "speed_truck.svg",
    bg: "bg-[#ebeafc]",
    bgHover: "hover:border-violet-200",
    getCounterLabel: (c: number) => pluralize(c, "pojazd", "pojazdy", "pojazdów"),
  },
  ingredients: {
    label: "Składniki",
    icon: "ingredients.svg",
    bg: "bg-[#f9ebfd]",
    bgHover: "hover:border-pink-200",
    getCounterLabel: (c: number) => pluralize(c, "składnik", "składniki", "składników"),
  },
  dishes: {
    label: "Menu",
    icon: "dish.svg",
    bg: "bg-[#e9f6fa]",
    bgHover: "hover:border-sky-200",
    getCounterLabel: (c: number) => pluralize(c, "pozycja", "pozycje", "pozycji"),
  },
  password: {
    label: "Hasło",
    icon: "password.svg",
    bg: "bg-[#D6F5E3]",
    bgHover: "hover:border-green-200",
    getCounterLabel: () => "",
  },
};

export const itemClassName =
  "bg-white p-4 text-lg rounded-3xl flex gap-3 items-center border border-transparent hover:border duration-300 ease-in-out font-semibold flex-1 cursor-pointer ";

export default async function DashboardItem({ item, count }: DashboardItemProps) {
  const config = items[item];

  return (
    <Link href={`/dashboard/${item}`} className={itemClassName + config.bgHover}>
      <div className={`p-5 rounded-full ${config.bg}`}>
        <Image src={config.icon} alt={item} width={24} height={24} />
      </div>

      <div>
        {count > 0 && (
          <small className="text-gray-400">
            {count} {config.getCounterLabel(count)}
          </small>
        )}
        <div>{config.label}</div>
      </div>
    </Link>
  );
}
