import { Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import "./market.css";
function Market() {
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
