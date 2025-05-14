export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center py-4 px-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <a href="./" className="flex gap-2 items-center font-bold">
            <img
              src="/logo.svg"
              alt="Opis obrazka"
              className="w-12"
            />

            <div className="flex flex-col uppercase leading-none text-xl tracking-wider font-cal-sans">
              <div>Jeszcze</div>
              <div className="flex items-center">
                ciepłe<span className="text-[1rem]">🔥</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
