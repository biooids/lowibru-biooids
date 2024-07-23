import { Avatar, Carousel } from "flowbite-react";
import React from "react";
import pictest from "../../../../assets/father.jpg";

import { FaShareAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";
import { FaRecordVinyl } from "react-icons/fa";

function ActivitiesCard() {
  return (
    <article className="  lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700">
      <div className="h-56  sm:h-64 xl:h-80 2xl:h-96 p-3 ">
        <Carousel slideInterval={1000000} as={"div"}>
          <img src={pictest} alt="..." />
          <img src={pictest} alt="..." />
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
      <div className=" flex gap-3 flex-col  p-3 rounded-md justify-between">
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
        <div className="flex">
          <div className="b-amber-950 p-2 w-full flex justify-between items-center text-xl b-slate-300">
            <span className="flex justify-center gap-1 items-center text-red-600 cursor-pointer">
              <FaRecordVinyl className="" /> Rec
            </span>
            <span className="flex justify-center gap-1 items-center cursor-pointer hover:text-amber-400">
              <BiLike /> 1k
            </span>
            <FaShareAlt className="hover:text-amber-400 cursor-pointer" />
            <FaRegSave className="hover:text-amber-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default ActivitiesCard;
