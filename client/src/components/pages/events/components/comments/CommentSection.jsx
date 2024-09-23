import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReplyComp from "./ReplyComp";
import moment from "moment";

function CommentSection({
  content,
  commentId,
  fetchedLikes,
  isLiked,
  userId,
  onDelete,
  fetchedNumberOfReplies,

  profilePicture,
  userName,
  createdAt,
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [realContent, setRealContent] = useState(content);

  const [numberOfReplies, setNumberOfReplies] = useState(
    fetchedNumberOfReplies
  );

  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(isLiked);
  const [numberOfLikes, setNumberOfLikes] = useState(fetchedLikes);

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLike = async () => {
    try {
      if (!currentUser) {
        navigate("/signup");
        return;
      }

      // Send the request to the server
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);

      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        const message = data.updatedComment.likes.includes(currentUser.user._id)
          ? true
          : false;
        setNumberOfLikes((prevNumberOfLikes) =>
          message ? prevNumberOfLikes + 1 : prevNumberOfLikes - 1
        );
        setLiked(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comment/editComment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentId,
          content: editedContent,
        }),
      });
      const data = await res.json();

      console.log(data);
      if (!data.success) {
        console.log(data.message);
      } else {
        setRealContent(data.editedComment.content);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        console.log(data.message);
      } else {
        onDelete(data.deletedComment._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="p-3 bg-slate-950 rounded-lg  ">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <p>characters remaining: {200 - editedContent.length}</p>
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            <Textarea
              maxLength="200"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex  gap-3">
              <Button
                type="submit"
                className="w-fit"
                disabled={editedContent.trim().length === 0}
              >
                Edit
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 ">
            <div className="w-[40px] h-[40px]  rounded-full overflow-hidden ">
              <img
                src={profilePicture}
                className="w-full h-full object-cover "
              />
            </div>
            <div className="flex  flex-col gap-3 w-[85%] ">
              <div className=" font-medium  text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between gap-1 rounded-lg ">
                <p className="break-all  bg-black pl-1 pr-1 line-clamp-1">
                  {userName}
                </p>
                <p className="text-sm"> {moment(createdAt).fromNow()}</p>{" "}
              </div>
              <p className="break-all ">{realContent}</p>
            </div>
          </div>
          <div className=" flex justify-around">
            <div className="flex justify-center items-center gap-2">
              {liked ? (
                <FaHeart onClick={handleLike} className="cursor-pointer" />
              ) : (
                <FaRegHeart onClick={handleLike} className="cursor-pointer" />
              )}

              <span>{numberOfLikes}</span>
            </div>
            <span
              className=" hover:underline cursor-pointer"
              onClick={() => setShowReplies(!showReplies)}
            >
              Replies : {numberOfReplies}
            </span>

            {currentUser && currentUser.user._id === userId ? (
              <div className="flex gap-3">
                <span
                  className=" hover:underline cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  Edit{" "}
                </span>
                <span
                  className=" hover:underline cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          {showReplies ? (
            <ReplyComp
              commentId={commentId}
              setNumberOfReplies={setNumberOfReplies}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </section>
  );
}

export default CommentSection;
