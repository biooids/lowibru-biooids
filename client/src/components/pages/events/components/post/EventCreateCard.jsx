import { Avatar, Button } from "flowbite-react";
import React from "react";

import { FileInput, Label } from "flowbite-react";

function EventCreateCard() {
  return (
    <article className="  lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700 ">
      <div className=" p-3">
        <Label
          htmlFor="dropzone-file"
          className="flex h-56 p-3   w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-amber-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput id="dropzone-file" className="" multiple />
        </Label>
      </div>

      <div className=" flex gap-3 flex-col  rounded-md p-3 ">
        <div className="bg-slate-700  rounded-lg p-3 flex flex-col">
          <h4 className="text-xl w-full mb-1 font-bold">
            Work Shop Lorem ipsum dolor sit amet consectetur,
          </h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
            sapiente iusto excepturi velit quos ratione rem distinctio quis
            minima, eaque laboriosam, facere ex pariatur vel, ea voluptatum quam
            officiis aut?
          </p>
          <div className="flex justify-between mt-3">
            <Button>Done</Button>
            <Button color="red">Reset</Button>
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center w-fit">
          <Avatar
            img="/images/people/profile-picture-5.jpg"
            rounded
            bordered
            className="flex justify-start items-start"
          />
          <div className=" font-medium dark:text-white flex justify-center items-center  gap-3">
            <span>Jese Leos</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ">
              posted in August 2014
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventCreateCard;
