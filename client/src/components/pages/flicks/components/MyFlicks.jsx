import React, { useEffect, useRef, useState } from "react";
import AllFlicksCard from "./AllFlicksCard";
import { Button } from "flowbite-react";

import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import MyFlicksCard from "./MyFlicksCard";

function MyFlicks() {
  const { currentUser } = useSelector((state) => state.user);

  const flicksContainerRef = useRef(null);
  const [myFlicks, setMyFlicks] = useState([]);

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

  const getMyFlicks = async () => {
    try {
      const res = await fetch(
        `/api/flick/getFlicks/?userId=${currentUser.user._id}`
      );
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
      } else {
        console.log(data);
        setMyFlicks(data.flicks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyFlicks();
  }, [currentUser]);

  const handleDeleteFlick = (deletedId) => {
    setMyFlicks((prevFlicks) =>
      prevFlicks.filter((flick) => flick._id !== deletedId)
    );
  };
  return (
    <section className="flex justify-center items-center gap-5">
      <section
        className="flicks-container w-[300px] sm:w-[450px] bg-slate-950 relative z-10"
        ref={flicksContainerRef}
      >
        {myFlicks && myFlicks.length > 0
          ? myFlicks.map((flick) => (
              <MyFlicksCard
                key={flick._id}
                id={flick._id}
                videoUrl={flick.videoUrl}
                onDeleteFlick={handleDeleteFlick}
              />
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

export default MyFlicks;
