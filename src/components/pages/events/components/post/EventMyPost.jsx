import React from "react";
import EventMyPostCard from "./EventMyPostCard";

function EventMyPost() {
  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      <EventMyPostCard />
      <EventMyPostCard />
      <EventMyPostCard />
      <EventMyPostCard />
    </section>
  );
}

export default EventMyPost;
