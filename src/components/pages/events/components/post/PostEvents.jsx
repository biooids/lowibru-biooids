import { Avatar, Navbar } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import profilePic from "../../../../../assets/father.jpg";

function PostEvents() {
  return (
    <section className="flex flex-col gap-3 ">
      <section className=" rounded-md">
        <div className="flex flex-col gap-3 p-2 bg-slate-700 rounded-lg mt-4">
          <div className="flex gap-3 ">
            <h3 className="text-xl border-l-4 pl-3 justify-center">
              Your details
            </h3>
            <span className=" text-sm flex justify-center items-center hover:underline cursor-pointer ">
              Edit
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col justify-center items-start">
              <Avatar img={profilePic} rounded bordered size="sm" />
              <h4 className=" ">Hwapyong Maniragaba</h4>
            </div>
            <div className=" w-full justify-between gap-3 flex  flex-row text-xs sm:text-sm">
              <div className="flex flex-col">
                <span>role</span>
                <span>Leader</span>
              </div>
              <div className="flex flex-col">
                <span>number</span>
                <span>(+250) 790 931 024</span>
              </div>
              <div className="flex flex-col">
                <span>Email Adress</span>
                <span>ehwapyongm@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <Navbar className="mt-3 rounded-md ">
          <div className="flex gap-3">
            <Link
              to="."
              relative="path"
              className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
            >
              Create
            </Link>
            <Link
              to="mypost"
              className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
            >
              My Posts
            </Link>
            <Link
              to="golive"
              className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
            >
              Go live
            </Link>
            <Link
              to="permission"
              className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
            >
              Permissions
            </Link>
          </div>
        </Navbar>
      </section>
      <section className="rounded-md  ">
        <Outlet />
      </section>
    </section>
  );
}

export default PostEvents;
