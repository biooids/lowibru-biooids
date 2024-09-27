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
            <h3 className="text-xl border-l-4 pl-3 justify-center">Details</h3>
          </div>
          <div className="flex flex-col gap-3">
            <p>When creating an event, please follow these posting rules:</p>
            <ul className="list-disc pl-5">
              <li>You must upload an image before submitting your post.</li>
              <li>Only a maximum of 6 images can be uploaded per event.</li>
              <li>All images must be under 2MB in size.</li>
              <li>Ensure your event description is clear and concise</li>
              <li>
                Offensive language, spam, or inappropriate content will result
                in post removal.
              </li>
              <li>
                Review your details before submission, as posts cannot be edited
                after submission.
              </li>
              <li>
                Ensure your event aligns with the community guidelines focused
                on love, peace, and unity.
              </li>
            </ul>
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
            <a
              href="https://reuvi-biooids-test.vercel.app/"
              target="_blank"
              className="bg-slate-700 rounded-md  sm:p-2 py-2 sm:text-sm text-sm px-1"
            >
              Go live
            </a>
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
