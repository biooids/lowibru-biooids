import React from "react";
import DiscoverCard from "./DiscoverCard";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

function Discover() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 ">
        <input
          type="search"
          placeholder="search for a lesson "
          className="bg-white text-black p-2 rounded-lg border-none outline-none"
        />
        <Button>Submit</Button>
      </div>
      <div className="lectures-card-containers ">
        <Link to="mylectures/1">
          <DiscoverCard />
        </Link>
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
      </div>
    </div>
  );
}

export default Discover;
