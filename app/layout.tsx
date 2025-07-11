import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import localFont from "next/font/local";
import { Open_Sans, Work_Sans } from "next/font/google";
import { LocationProvider } from "@/lib/location-context";
import { IngredientsProvider } from "@/lib/ingredients-context";
import "leaflet/dist/leaflet.css";

const calSans = localFont({
  src: "../public/fonts/CalSans-Regular.woff2",
  variable: "--font-cal-sans",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Kanapki",
  description: "Niecodzienne i pyszne kanapki",
  icons: {
    icon: "/favicon.svg",
  },
  authors: [{ name: "Karol Skolasiński" }],
  openGraph: {
    title: "Kanapki",
    description: "Niecodzienne i pyszne kanapki",
    url: "https://kanapki.gda.pl/",
    siteName: "Kanapki",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${calSans.variable} ${workSans.variable} ${openSans.className}`}>
      <body className="antialiased bg-gray-100 min-h-[100vh] flex flex-col">
        <LocationProvider>
          <Header />
          <IngredientsProvider>
            {children}
          </IngredientsProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
