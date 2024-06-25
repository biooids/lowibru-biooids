import React from "react";
import EventCreateCard from "./EventCreateCard";
import { Avatar, Button, Carousel, Label, Select } from "flowbite-react";
import profilePic from "../../../../../assets/father.jpg";

import { FaShareAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";

function EventCreate() {
  return (
    <section className=" flex flex-col gap-6 w-[320px]  m-auto sm:w-[450px] lg:w-auto">
      <EventCreateCard />
      <article className="  lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700">
        <div className="h-56  sm:h-64 xl:h-80 2xl:h-96 p-3">
          <Carousel slideInterval={1000000} as={"div"}>
            <img src={profilePic} alt="..." />
            <img src={profilePic} alt="..." />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel>
        </div>
        <div className=" flex gap-3 flex-col bg-ambe-800 p-3 rounded-md justify-between">
          <div className="bg-slate-700  rounded-lg p-3 flex flex-col">
            <h4 className="text-xl w-full mb-1 font-bold">
              Work Shop Lorem ipsum dolor sit amet consectetur,
            </h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate sapiente iusto excepturi velit quos ratione rem
              distinctio quis minima, eaque laboriosam, facere ex pariatur vel,
              ea voluptatum quam officiis aut?
            </p>
            <div className="mt-3 flex gap-3 flex-col">
              <div>
                <Label htmlFor="message" className="mb-2 block">
                  Choose Category
                </Label>
                <Select id="region" name="country" required>
                  <option>Casual</option>
                  <option>Upcomming</option>
                </Select>
              </div>
              <span className="text-2xl font-bold">1/3/2024</span>
              <div>
                <div className="flex justify-between mt-3">
                  <Button>Post now</Button>
                  <Button color="red">Delete</Button>
                </div>
              </div>
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
    </section>
  );
}

export default EventCreate;
