import { Avatar, Button, Carousel } from "flowbite-react";
import React from "react";
import profilePic from "../../../../../assets/father.jpg";
import { Link } from "react-router-dom";

import { FaShareAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import { FaRecordVinyl } from "react-icons/fa";
import { useSelector } from "react-redux";

function EventMyPostCard({
  id,
  handleDeletePost,
  category,
  content,
  createdAt,
  images,
  title,
  ended,
  slug,
  externalLink,
  saveCount,
  schedule,
  onDeletePost,
}) {
  const { currentUser } = useSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/post/deletePost/${id}/${currentUser.user._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        onDeletePost(data.deletedPost._id);
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <article className="  lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700">
      <div className="h-56  sm:h-64 xl:h-80 2xl:h-96 p-3">
        <Carousel slideInterval={1000000} as={"div"}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="h-full w-full object-cover rounded-lg"
            />
          ))}
        </Carousel>
      </div>
      <div className=" flex gap-3 flex-col  p-3 rounded-md justify-between">
        <div className="bg-slate-700  rounded-lg p-3 flex flex-col">
          <h4 className="text-xl w-full mb-1 font-bold">{title} </h4>
          <p>{content}</p>
          <div className="">
            <p className="text-cyan-500">
              {category === "upcoming" && new Date(schedule) < new Date() ? (
                <span className="text-red-600">
                  Upcoming : {schedule} ended
                </span>
              ) : category === "upcoming" && new Date(schedule) > new Date() ? (
                <span>Upcoming : {schedule} </span>
              ) : (
                "happened"
              )}
            </p>
          </div>
          <Button className="mt-3" outline>
            posted
          </Button>
        </div>

        <div className="flex gap-2 justify-center items-center w-fit">
          <Avatar
            img={currentUser.user.profilePicture}
            rounded
            bordered
            className="flex justify-start items-start"
          />
          <div className=" font-medium dark:text-white flex justify-center items-center  gap-3">
            <p>{currentUser.user.userName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 ">
              {createdAt}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className=" p-2 w-full flex justify-between items-center text-xl">
            {/* <span className="flex justify-center gap-1 items-center text-red-600 cursor-pointer">
              <FaRecordVinyl className="" /> Rec
            </span> */}
            <span className="flex justify-center gap-1 items-center cursor-pointer hover:text-amber-400">
              <BiLike /> 1k
            </span>
            <FaShareAlt className="hover:text-amber-400 cursor-pointer" />
            <MdDeleteForever
              className="hover:text-amber-400 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventMyPostCard;
