import { Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
function Events() {
  return (
    <section className="">
      <div className="flex gap-3  flex-col p-3">
        <h2 className="text-3xl">Welcome to Our Events</h2>
        <p>
          Explore activities going on and discover both live and upcoming events
          and join us in fostering a community of learning and growth.
        </p>
      </div>
      <Navbar className="sticky top-0 z-50 ">
        <Link
          to="."
          relative="path"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Activities
        </Link>

        <a
          src="https://reuvi-biooids-test.vercel.app/"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Live
        </a>
        <Link
          to="upcoming"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Upcoming
        </Link>
        {/* </div> */}
        {/* <div className="flex gap-2 "> */}
        <Link
          to="saved"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Saved
        </Link>
        <Link
          to="post"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Post
        </Link>
        {/* </div> */}
      </Navbar>
      <section className="sm:p-10 ">
        <Outlet />
      </section>
    </section>
  );
}

export default Events;
