export default function Header(props: { font: string }) {
  const { font } = props;

  return (
    <header>
      <div className="flex justify-between items-center p-4 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <a href="#" className="flex gap-2 items-center font-bold">
            <img
              src="/logo.svg"
              alt="Opis obrazka"
              className="w-12"
            />

            <div
              className={`${font} flex flex-col uppercase leading-none text-xl tracking-wider`}
            >
              <div>Jeszcze</div>
              <div className="flex items-center">
                ciepłe<span className="text-[1rem]">🔥</span>
              </div>
            </div>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-orange-500 duration-100 ease-in-out">Home</a>
          <a href="#" className="hover:text-orange-500 duration-100 ease-in-out">Usługi</a>
        </nav>

        <nav className="md:hidden">
          <div className="relative flex items-center">
            <input
              id="hamburger"
              type="checkbox"
              className="peer opacity-0 w-0 h-[26px] cursor-pointer"
            />

            <label
              htmlFor="hamburger"
              className="absolute top-0 right-0 w-[26px] h-[26px] z-10 flex items-center justify-center cursor-pointer before:absolute before:w-full before:h-[2px] before:bg-gray-700 before:-translate-y-[8px] before:transition-all after:absolute after:w-full after:h-[2px] after:bg-gray-700 after:translate-y-[8px] after:transition-all peer-checked:rotate-45 peer-checked:before:translate-y-0 peer-checked:before:rotate-0 peer-checked:after:translate-y-0 peer-checked:after:rotate-90 transition-transform duration-300"
            >
            </label>

            <span className="w-[26px] h-[2px] bg-gray-700 peer-checked:rotate-90 transition-transform duration-300">
            </span>

            <ul className="peer-checked:right-0 fixed top-0 -right-full w-4/5 h-full pt-28 bg-gray-50 duration-[.25s] shadow-2xl p-4 flex flex-col text-xl">
              <li className="border-b border-t border-gray-200 py-4">
                <a href="#">Home</a>
              </li>
              <li className="border-b border-gray-200 py-4">
                <a href="#">Usługi</a>
              </li>
              <li className="border-b border-gray-200 py-4">
                <a href="#">Zespół</a>
              </li>
              <li className="border-b border-gray-200 py-4">
                <a href="#">Kontakt</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
