import React, { useEffect, useRef, useState } from "react";
import AllFlicksCard from "./AllFlicksCard";
import { Button } from "flowbite-react";

import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function AllFlicks() {
  const { currentUser } = useSelector((state) => state.user);

  const flicksContainerRef = useRef(null);
  const [flicks, setFlicks] = useState([]);

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

  const getFlicks = async () => {
    try {
      const res = await fetch("/api/flick/getFlicks");
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
      } else {
        console.log(data);
        setFlicks(data.flicks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFlicks();
  }, [currentUser]);

  return (
    <section className="flex justify-center items-center gap-5">
      <section
        className="flicks-container w-[300px] sm:w-[450px] bg-slate-950 relative z-10"
        ref={flicksContainerRef}
      >
        {flicks && flicks.length > 0
          ? flicks.map((flick) => (
              <AllFlicksCard key={flick._id} videoUrl={flick.videoUrl} />
            ))
          : "No flicks yet"}
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
