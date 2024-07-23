import React from "react";
import ActivitiesCard from "./ActivitiesCard";

function Activities() {
  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      <ActivitiesCard />
      <ActivitiesCard />
      <ActivitiesCard />
      <ActivitiesCard />
      <ActivitiesCard />
    </section>
  );
}

export default Activities;
