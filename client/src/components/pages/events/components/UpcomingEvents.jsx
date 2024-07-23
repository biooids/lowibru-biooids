import React from "react";
import UpcomingEventsCard from "./UpcomingEventsCard";

function UpcomingEvents() {
  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      <UpcomingEventsCard />
      <UpcomingEventsCard />
      <UpcomingEventsCard />
      <UpcomingEventsCard />
    </section>
  );
}

export default UpcomingEvents;
