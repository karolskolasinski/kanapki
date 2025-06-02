import Map from "@/components/Map";

export default function Footer() {
  return (
    <footer className="bg-gray-100 w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-10 md:pt-20 md:pb-0">
        <div className="flex flex-col lg:flex-row gap-16 pb-8">
          <div className="flex-1">
            <div className="flex flex-col gap-2 pb-10">
              <a
                href="./"
                className="flex gap-2 items-center font-bold uppercase font-cal-sans leading-none tracking-wider w-fit"
              >
                Jeszcze ciepłe
              </a>
              <a
                href="./"
                className="flex gap-2 items-center font-bold uppercase font-cal-sans leading-none tracking-wider w-fit"
              >
                Nieźle zmrożone
              </a>
            </div>

            <small>kanapki, sandwiche, gofry, napoje, desery, kawa, herbata</small>
          </div>

          <div id="contact" className="flex flex-col gap-4 flex-1">
            <h2 className="text-2xl font-bold">Kontakt</h2>

            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                className="min-w-6 w-6"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
              <a href="mailto:biuro@jeszczecieple.pl?subject=Kontakt z jeszczecieple.pl">
                biuro@jeszczecieple.pl
              </a>
            </div>
          </div>

          <div className="flex-2 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Mapa</h2>
            <Map />
          </div>
        </div>

        <div className="py-4 text-center text-sm border-t border-t-gray-400">
          2025 - jeszczecieple.pl
        </div>
      </div>
    </footer>
  );
}
