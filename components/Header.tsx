import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center py-4 px-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <a href="./" className="flex gap-2 items-center font-bold py-1">
            <Image
              src="/logo.svg"
              alt="logo"
              width={0}
              height={0}
              priority
              className="h-10 w-auto"
            />

            <div className="flex flex-col uppercase leading-none text-xl tracking-wider font-cal-sans">
              <div>Jeszcze</div>
              <div className="flex items-center">
                ciepłe<span className="text-[1rem]">🔥</span>
              </div>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a href="./" className="flex gap-2 items-center font-bold py-1">
            <div className="flex flex-col uppercase leading-none text-xl tracking-wider font-cal-sans">
              <div className="tracking-[1.5px] text-right">
                <span className="text-[1rem]">🥶</span>Nieźle
              </div>
              <div className="flex items-center tracking-[.5px]">zmrożone</div>
            </div>

            <Image
              src="/nz-logo.svg"
              alt="logo"
              width={0}
              height={0}
              className="h-10 w-auto"
              priority
            />
          </a>
        </div>
      </div>
    </header>
  );
}
