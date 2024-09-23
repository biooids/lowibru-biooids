import { Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { IoWarningSharp } from "react-icons/io5";

import { Link, Outlet } from "react-router-dom";
import "./market.css";
function Market() {
  return (
    <section className="">
      <div className="flex gap-3 mt-3 mb-3 flex-col p-3">
        <p className="text-3xl text-red-500 flex justify-center items-center gap-3  ">
          <IoWarningSharp />
          <span>Under construction</span>
        </p>
        <h2 className="text-3xl">Welcome to Lectures Section</h2>
        <p className="text-xl  text-center leading-relaxed mt-2">
          Discover a wide range of items, manage your purchases, and easily
          upload new listings. Your shopping experience starts here!
        </p>
      </div>
      <Navbar className="sticky top-0 z-50">
        <Link
          to="."
          relative="path"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          All Items
        </Link>

        <Link
          to="mycart"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          My Cart
        </Link>
        <Link
          to="status"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Status
        </Link>
        <Link
          to="uploaditems"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Upload
        </Link>
      </Navbar>
      <section className="sm:p-10 p-2 bg-slate-900">
        <Outlet />
      </section>
      <div className="p-3">
        <h4>Information About Buying and Selling</h4>
        <div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti,
            cupiditate iste ex possimus nesciunt, harum ipsa reiciendis culpa
            consectetur similique cumque, maxime natus cum veritatis molestias
            laudantium quibusdam maiores assumenda.
          </p>
          <div>
            <h5>Have a Question or probles</h5>
            <form action="">
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Market;
