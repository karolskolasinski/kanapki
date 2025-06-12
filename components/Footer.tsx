import Image from "next/image";
import Link from "next/link";
import InstaIcon from "../public/instagram.svg";
import FacebookIcon from "../public/facebook.svg";
import YoutubeIcon from "../public/youtube.svg";
import TikTokIcon from "../public/tiktok.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-100 w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-10 md:pt-20 md:pb-0">
        <div className="flex flex-col lg:flex-row gap-16 pb-8">
          <div className="flex-1">
            <div className="flex flex-col gap-2 pb-10">
              <a href="./" className="flex gap-2 items-center font-bold py-1">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={0}
                  height={0}
                  priority
                  className="h-8 w-auto"
                />

                <div className="flex flex-col">
                  <div className="text-[1.5rem] leading-none uppercase font-cal-sans tracking-wider">
                    kanapki
                  </div>

                  <div className="text-xs tracking-widest">
                    kanapki.gda.pl
                  </div>
                </div>
              </a>
            </div>

            kanapki, sandwiche, gofry, napoje, desery, kawa, herbata
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
              <a href="mailto:biuro@kanapki.gda.pl?subject=Kontakt z kanapki.gda.pl">
                biuro@kanapki.gda.pl
              </a>
            </div>

            <div>
              <Image src="qr.svg" alt="qr" width="0" height="0" className="w-22" />
              <small>kanapki.gda.pl</small>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Obserwuj</h2>

            <div className="flex gap-10">
              <Link href="#" className="w-fit">
                <InstaIcon className="w-6 h-6 fill-[#E1306C] hover:fill-[#FF5A91] transition-colors cursor-pointer" />
              </Link>

              <Link href="#" className="w-fit">
                <FacebookIcon className="w-6 h-6 fill-[#1877F2] hover:fill-[#3B99FC] transition-colors cursor-pointer" />
              </Link>

              <Link href="#" className="w-fit">
                <TikTokIcon className="w-6 h-6 fill-black hover:fill-[#555555] transition-colors cursor-pointer" />
              </Link>

              <Link href="#" className="w-fit">
                <YoutubeIcon className="w-6 h-6 fill-[#FF0000] hover:fill-[#FF4D4D] transition-colors cursor-pointer" />
              </Link>
            </div>

            {/*<div className="flex gap-10">*/}
            {/*  <Link href="#" className="w-fit">*/}
            {/*    <Image*/}
            {/*      src="fb.svg"*/}
            {/*      alt="facebook"*/}
            {/*      width="0"*/}
            {/*      height="0"*/}
            {/*      className="w-6 h-6 cursor-pointer fill-[#1877F2] hover:fill-[#3B99FC]"*/}
            {/*    />*/}
            {/*  </Link>*/}

            {/*  <Link href="#" className="w-fit">*/}
            {/*    <Image*/}
            {/*      src="tiktok.svg"*/}
            {/*      alt="tik tok"*/}
            {/*      width="0"*/}
            {/*      height="0"*/}
            {/*      className="w-6 h-6 cursor-pointer fill-black hover:fill-[#555555]"*/}
            {/*    />*/}
            {/*  </Link>*/}

            {/*  <Link href="#" className="w-fit">*/}
            {/*    <Image*/}
            {/*      src="yt.svg"*/}
            {/*      alt="youtube"*/}
            {/*      width="0"*/}
            {/*      height="0"*/}
            {/*      className="w-6 h-6 cursor-pointer fill-[#FF0000] hover:fill-[#FF4D4D]"*/}
            {/*    />*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="py-4 text-center text-xs border-t border-t-gray-400 text-gray-600">
          2025 - kanapki.gda.pl
        </div>
      </div>
    </footer>
  );
}
