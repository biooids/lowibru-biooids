import React, { useState } from "react";
import { Avatar, Button, Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaShareAlt, FaSave, FaRegSave } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdInsertComment } from "react-icons/md";
import CommentComp from "./comments/CommentComp";

function ActivitiesCard({
  id,
  category,
  content,
  createdAt,
  images,
  title,
  ended,
  slug,
  externalLink,
  schedule,

  isLiked,
  fetchedLikes,

  isSaved,
  fetchedSaves,
}) {
  const { currentUser } = useSelector((state) => state.user);

  const [numberOfLikes, setNumberOfLikes] = useState(fetchedLikes);
  const [liked, setLiked] = useState(isLiked);

  const [numberOfSaves, setNumberOfSaves] = useState(fetchedSaves);
  const [saved, setSaved] = useState(isSaved);
  const [openComments, setOpenComments] = useState(false);

  const handleLike = async () => {
    try {
      if (!currentUser) {
        navigate("/sign-up");
        return;
      }

      const res = await fetch(`/api/post/likePost/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        const isLiked = data.updatedPost.likes.includes(currentUser.user._id);
        setNumberOfLikes((prev) => (isLiked ? prev + 1 : prev - 1));
        setLiked(isLiked);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/post/savePost/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        const isSaved = data.updatedPost.saves.includes(currentUser.user._id);
        setNumberOfSaves((prev) => (isSaved ? prev + 1 : prev - 1));
        setSaved(isSaved);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="lg:grid lg:grid-cols-2 gap-3 pb-4 border-b-2 border-amber-700">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 p-3">
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

      <div className="flex gap-3 flex-col p-3 rounded-md justify-between">
        <div className="bg-slate-700 rounded-lg p-3 flex flex-col">
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
        </div>
        {externalLink ? (
          <a href={externalLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full rounded-md text-white bg-slate-700 hover:bg-slate-800">
              Visit Event
            </Button>
          </a>
        ) : (
          ""
        )}
        <div className="flex gap-2 justify-center items-center w-fit">
          <Avatar
            img={currentUser.user.profilePicture}
            rounded
            bordered
            className="flex justify-start items-start"
          />
          <div className="font-medium dark:text-white flex justify-center items-center gap-3">
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
            <span className="flex justify-center gap-1 items-center  ">
              {liked ? (
                <FaHeart
                  onClick={handleLike}
                  className="cursor-pointer hover:text-amber-400"
                />
              ) : (
                <FaRegHeart
                  onClick={handleLike}
                  className="cursor-pointer hover:text-amber-400"
                />
              )}
              <span>{numberOfLikes}</span>
            </span>
            <FaShareAlt className="hover:text-amber-400 cursor-pointer" />
            <div className="flex justify-center gap-1 items-center ">
              {saved ? (
                <FaSave
                  onClick={handleSave}
                  className="cursor-pointer hover:text-amber-400 "
                />
              ) : (
                <FaRegSave
                  onClick={handleSave}
                  className="cursor-pointer hover:text-amber-400 "
                />
              )}
              <span>{numberOfSaves}</span>
            </div>
            <div className="flex justify-center gap-1 items-center ">
              <MdInsertComment className="cursor-pointer hover:text-amber-400 " />
            </div>
          </div>
        </div>
      </div>
      <CommentComp postId={id} />
    </article>
  );
}

export default ActivitiesCard;
