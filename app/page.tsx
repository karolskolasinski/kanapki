// "use client";
// import { useEffect, useRef } from "react";

export default function Home() {
  // await new Promise((r) => setTimeout(r, 2000));
  // const containerRef = useRef(null);
  //
  // useEffect(() => {
  //   console.dir(containerRef.current);
  //   if (containerRef.current) {
  //     containerRef.current.scrollLeft = containerRef.current.scrollWidth;
  //   }
  // }, []);

  return (
    <div className="flex gap-5 overflow-auto snap-x max-w-7xl mx-auto py-12 px-2">
      <section className="snap-center">
        <div className="card bg-orange-400">
          <div className="card-title">
            <h3 className="uppercase font-work-sans text-2xl font-black text-center">
              Kanapki
            </h3>
          </div>

          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
          <div>Menu 1</div>
        </div>
      </section>

      <section className="snap-center">
        {/*<div>*/}
        {/*  <strong>NIEŹLE ZMROŻONE 🥶</strong>: https://niezlezmrozone.pl*/}
        {/*</div>*/}

        <div className="card bg-cyan-400">
          <div className="card-title">
            <h3 className="uppercase font-work-sans text-2xl font-black text-center">
              Napoje
            </h3>
          </div>

          Menu 1
        </div>
      </section>
    </div>
  );
}
