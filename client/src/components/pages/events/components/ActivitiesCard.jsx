import React, { useEffect, useState } from "react";
import { Avatar, Button, Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaShareAlt, FaSave, FaRegSave } from "react-icons/fa";
import { FaMessage, FaRegMessage } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { MdInsertComment } from "react-icons/md";
import CommentComp from "./comments/CommentComp";
import moment from "moment";

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
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [comments, setComments] = useState([]);

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

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };
  const getComments = async () => {
    try {
      const res = await fetch(`/api/comment/getPostComments/${id}`);
      const data = await res.json();

      console.log(data);

      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        setNumberOfComments(data.totalComments);
        setComments(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
  }, [id]);

  return (
    <article className=" border-amber-700 pb-3 border-b-2">
      <article className="  lg:grid lg:grid-cols-2 gap-3 ">
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
          <div className="bg-slate-700 rounded-lg p-3 flex flex-col gap-3">
            <h4 className="text-xl line-clamp-2 font-bold break-all ">
              {title}{" "}
            </h4>
            <p className="break-all h-[150px] overflow-y-auto border-2 p-1 rounded-lg">
              {content}
            </p>

            <p className="text-cyan-500">
              {category === "upcoming" && new Date(schedule) < new Date() ? (
                <span className="text-red-600">
                  Ended : {moment(schedule).fromNow()}
                </span>
              ) : category === "upcoming" && new Date(schedule) > new Date() ? (
                <span>Upcoming : {moment(schedule).fromNow()} </span>
              ) : (
                "happened"
              )}
            </p>
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

          <div className="flex items-center gap-1">
            <Avatar
              img={currentUser.user.profilePicture}
              rounded
              bordered
              className="flex justify-start items-start"
            />
            <div className="flex sm:flex-row flex-col gap-1 ">
              <p className="pl-1 pr-1   black line-clamp-1">
                {currentUser.user.userName}
              </p>
              <p className="text-sm  dark:text-gray-500 ">
                {moment(createdAt).fromNow()}
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
              <div className="flex justify-center gap-1 items-center cursor-pointer hover:text-amber-400">
                {openComments ? (
                  <FaMessage onClick={handleOpenComments} />
                ) : (
                  <FaRegMessage onClick={handleOpenComments} />
                )}
                <span>{numberOfComments}</span>
              </div>
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
            </div>
          </div>
        </div>
      </article>
      {openComments ? (
        <section className="w-full  p-3">
          <CommentComp
            postId={id}
            numberOfComments={numberOfComments}
            setNumberOfComments={setNumberOfComments}
            comments={comments}
            setComments={setComments}
          />
        </section>
      ) : (
        ""
      )}
    </article>
  );
}

export default ActivitiesCard;
