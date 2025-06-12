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
              className="h-12 w-auto"
            />

            <div className="flex flex-col">
              <div className="text-[1.75rem] leading-none uppercase font-cal-sans tracking-wider">
                kanapki
              </div>

              <div className="text-sm tracking-widest">
                kanapki.gda.pl
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
