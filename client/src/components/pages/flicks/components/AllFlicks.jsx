import React, { useRef } from "react";
import AllFlicksCard from "./AllFlicksCard";
import { Button } from "flowbite-react";

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
    <section className="flex ">
      <Button onClick={() => scrollTo("up")} className="h-fit">
        Up
      </Button>

      <section
        className="flicks-container bg-slate-950"
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

      <Button onClick={() => scrollTo("down")} className="h-fit">
        Down
      </Button>
    </section>
  );
}

export default AllFlicks;
