import React, { useRef } from "react";
import AllFlicksCard from "./AllFlicksCard";
import { Button } from "flowbite-react";

import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";

function AllFlicks() {
  const flicksContainerRef = useRef(null);

  const scrollTo = (direction) => {
    if (flicksContainerRef.current) {
      const container = flicksContainerRef.current;
      const scrollAmount = container.clientHeight;
      const scrollTop = container.scrollTop;

      if (direction === "down") {
        container.scrollTo({
          top: scrollTop + scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "up") {
        container.scrollTo({
          top: scrollTop - scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="flex justify-center items-center gap-5">
      <section
        className="flicks-container w-[300px] sm:w-[450px] bg-slate-950 relative z-10"
        ref={flicksContainerRef}
      >
        <AllFlicksCard />
        <AllFlicksCard />
        <AllFlicksCard />
        <AllFlicksCard />
        <AllFlicksCard />
        <AllFlicksCard />
        <AllFlicksCard />
      </section>

      <div className="sm:flex flex-col hidden gap-5">
        <FaArrowCircleUp
          className="text-5xl cursor-pointer"
          onClick={() => scrollTo("up")}
        />
        <FaArrowCircleDown
          className="text-5xl cursor-pointer   "
          onClick={() => scrollTo("down")}
        />
      </div>
    </section>
  );
}

export default AllFlicks;
