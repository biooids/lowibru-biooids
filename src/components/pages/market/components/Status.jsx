import React from "react";
import StatusCard from "./StatusCard";

function Status() {
  return (
    <section className="flex flex-col gap-3 ">
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
    </section>
  );
}

export default Status;
