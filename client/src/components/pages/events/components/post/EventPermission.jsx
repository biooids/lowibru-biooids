import React from "react";
import EventPermissionCard from "./EventPermissionCard";

function EventPermission() {
  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      <EventPermissionCard />
    </section>
  );
}

export default EventPermission;
