import React from "react";
import "./flicks.css";
import { Link, Outlet } from "react-router-dom";
import { Button } from "flowbite-react";
import { IoIosWarning } from "react-icons/io";

function FlicksPage() {
  return (
    <section className="flex flex-col gap-3   main-flicks-container">
      <div className="flex gap-3 justify-center items-center">
        <IoIosWarning className="text-lg text-red-700" />
        <h3 className=" text-red-600">
          Make sure you pose previous video before opening the other one
        </h3>
      </div>
      <nav className="P-3 flex justify-around w-full p-3 bg-slate-700">
        <Link to="." className="p-1 bg-slate-800 rounded-lg">
          All flicks
        </Link>
        <Link to="myflicks" className="p-1 bg-slate-800 rounded-lg">
          My flicks
        </Link>
        <Link to="createflick" className="p-1 bg-slate-800 rounded-lg">
          Create flick
        </Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </section>
  );
}

export default FlicksPage;
