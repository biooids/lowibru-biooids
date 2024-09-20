import React, { useEffect, useState } from "react";
import { Avatar, Button, Carousel } from "flowbite-react";
import profilePic from "../../../../../assets/father.jpg";
import { Link } from "react-router-dom";

import { FaShareAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaRecordVinyl } from "react-icons/fa";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaMessage, FaRegMessage } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";

import { RiDeleteBin2Fill } from "react-icons/ri";

import { useSelector } from "react-redux";
import moment from "moment";
import CommentComp from "../comments/CommentComp";

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
  isLiked,
  fetchedLikes,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [numberOfLikes, setNumberOfLikes] = useState(fetchedLikes);
  const [liked, setLiked] = useState(isLiked);

  const [openComments, setOpenComments] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [comments, setComments] = useState([]);

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
          <div className="bg-slate-700  rounded-lg p-3 flex flex-col gap-3">
            <h4 className="text-xl  line-clamp-2  font-bold break-all ">
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

          <div className="flex  justify-between items-center gap-1">
            <div className="flex gap-1 justify-center items-center">
              <Avatar
                img={currentUser.user.profilePicture}
                rounded
                bordered
                className="flex justify-start items-start"
              />

              <p className="pl-1 pr-1 h-7 w-[170px] sm:w-auto bg-black line-clamp-1">
                {currentUser.user.userName}
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ">
              {moment(createdAt).fromNow()}
            </p>
          </div>
          <div className="flex">
            <div className=" p-2 w-full flex justify-between items-center text-xl">
              {/* <span className="flex justify-center gap-1 items-center text-red-600 cursor-pointer">
              <FaRecordVinyl className="" /> Rec
            </span> */}
              <span className="flex justify-center gap-1 items-center cursor-pointer hover:text-amber-400">
                {liked ? (
                  <FaHeart onClick={handleLike} className="cursor-pointer" />
                ) : (
                  <FaRegHeart onClick={handleLike} className="cursor-pointer" />
                )}
                <span>{numberOfLikes}</span>
              </span>
              <div className="flex justify-center gap-1 items-center cursor-pointer hover:text-amber-400">
                {openComments ? (
                  <FaMessage onClick={handleOpenComments} />
                ) : (
                  <FaRegMessage onClick={handleOpenComments} />
                )}
                <span>{numberOfComments}</span>
              </div>
              <Link to={`/events/post/updatepost/${id}`}>
                <MdEditSquare className="hover:text-amber-400 cursor-pointer" />
              </Link>
              <RiDeleteBin2Fill
                className="hover:text-amber-400 cursor-pointer text-red-600"
                onClick={handleDelete}
              />
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

export default EventMyPostCard;
