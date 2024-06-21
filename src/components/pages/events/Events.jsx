import { Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
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
        <div className="flex bg-black  ">
          <Link
            to="."
            relative="path"
            className="hover:bg-amber-900 border-2 rounded-l-md p-1 border-amber-500   flex justify-center items-center"
          >
            <HiUserCircle />
            Activities
          </Link>

          <Link
            to="live"
            className="hover:bg-amber-900 border-2 p-1 border-amber-500   flex justify-center items-center"
          >
            <HiAdjustments />
            Live
          </Link>
          <Link
            to="upcomming"
            className="hover:bg-amber-900 border-2 p-1 border-amber-500 rounded-r-md  flex justify-center items-center"
          >
            <HiAdjustments />
            Upcomming
          </Link>
        </div>

        <div className="flex bg-black">
          <Link
            to="post"
            className="hover:bg-amber-900 border-2 p-1 border-amber-500 rounded-md  flex justify-center items-center"
          >
            <HiCloudDownload />
            Post
          </Link>

          <Link
            to="saved"
            className="hover:bg-amber-900 border-2 p-1 border-amber-500 rounded-md  flex justify-center items-center"
          >
            <HiCloudDownload />
            Saved
          </Link>
        </div>
      </Navbar>
      <section className="p-10 bg-slate-900">
        <Outlet />
      </section>
    </section>
  );
}

export default Events;
