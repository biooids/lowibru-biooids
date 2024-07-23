import { Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import "./lectures.css";
function Lectures() {
  return (
    <section className="">
      <div className="flex gap-3 mt-3 mb-3 flex-col p-3">
        <h2 className="text-3xl">Welcome to Lectures Section</h2>
        <p>
          Explore activities going on and discover both live and upcoming events
          and join us in fostering a community of learning and growth.
        </p>
      </div>

      <Navbar className="sticky top-0 z-50">
        <Link
          to="."
          relative="path"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Discover
        </Link>

        <Link
          to="mylectures"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          My Lectures
        </Link>
        <Link
          to="upload"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Upload
        </Link>
      </Navbar>
      <section className="sm:p-10 p-2">
        <Outlet />
      </section>
    </section>
  );
}

export default Lectures;
