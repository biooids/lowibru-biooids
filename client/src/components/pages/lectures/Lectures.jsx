import { Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { IoWarningSharp } from "react-icons/io5";

import { Link, Outlet } from "react-router-dom";
import "./lectures.css";
function Lectures() {
  return (
    <section className="">
      <div className="flex gap-3 mt-3 mb-3 flex-col p-3">
        <p className="text-3xl text-red-500 flex justify-center items-center gap-3">
          <IoWarningSharp />
          <span>Under construction</span>
        </p>
        <h2 className="text-3xl">Welcome to Lectures Section</h2>
        <p className="text-xl  text-center leading-relaxed">
          This is the hub for all your lecture content. Explore the available
          lectures, access your personal collection, or upload new materials to
          share with others. We're constantly working to improve your
          experience, so stay tuned for more features!
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
