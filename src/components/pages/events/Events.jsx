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

        <p> You are watching events from: </p>
        <Dropdown label="Dropdown button" dismissOnClick={false}>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <p>you can change the country above</p>
      </div>
      <Navbar className="sticky top-0 z-50 ">
        <Link
          to="."
          relative="path"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Activities
        </Link>

        <Link
          to="live"
          className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
        >
          Live
        </Link>
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
