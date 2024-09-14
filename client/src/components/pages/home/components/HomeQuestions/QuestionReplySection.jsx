import { Avatar, Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";

function QuestionReplySection({
  replyId,
  replyContent,
  isLiked,
  fetchedLikes,
  userId,
  onDelete,
  replyReply,
  profilePicture,
  userName,
  createdAt,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(isLiked);
  const [numberOfLikes, setNumberOfLikes] = useState(fetchedLikes);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(replyContent);
  const [realContent, setRealContent] = useState(replyContent);

  const handleLike = async () => {
    try {
      if (!currentUser) {
        navigate("/signup");
        return;
      }

      const res = await fetch(`/api/replyQuestion/likeReply/${replyId}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        const message = data.updatedReply.likes.includes(currentUser.user._id)
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
      const res = await fetch(`/api/replyQuestion/editReply/${replyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyContent: editedContent,
        }),
      });
      const data = await res.json();

      console.log(data);

      if (!data.success) {
        console.log(data.message);
      } else {
        setRealContent(data.editedReply.replyContent);
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/replyQuestion/deleteReply/${replyId}`, {
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
        onDelete(data.deletedReply._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContentWithMentions = (content) => {
    // Regular expression to match `@word` (no space) and `@` (with space)
    const regex = /(@\w+)|(@)(?=\s|$)/g;

    // Split the content by the regex
    const parts = content.split(regex);

    return parts.map((part, index) => {
      // Ensure `part` is a string before calling string methods
      if (typeof part === "string") {
        if (part.startsWith("@")) {
          if (part.length > 1 && part[1] !== " ") {
            // If `@word` is matched, highlight `@word` in red
            return (
              <span key={index} style={{ color: "red" }}>
                {part}
              </span>
            );
          } else {
            // If `@` is matched alone, highlight `@` in red
            return (
              <span key={index} style={{ color: "red" }}>
                {part}
              </span>
            );
          }
        } else {
          return part;
        }
      } else {
        // If `part` is not a string, just return it
        return part;
      }
    });
  };

  return (
    <div className="border-2 border-slate-800 p-1">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <p>characters remaining: {200 - editedContent.length}</p>
          <form className="flex flex-col gap-3" onSubmit={handleEdit}>
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
            <div
              className="w-[30px] h-[30px]
          rounded-full overflow-hidden"
            >
              <img
                src={profilePicture}
                rounded
                bordered
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-3 w-[80%] sm:[85%]">
              <div className="text-sm text-gray-500 dark:text-gray-400 sm:flex-row justify-between  flex flex-col gap-1 w-full">
                <p className="line-clamp-1 break-words h-6  bg-black pl-1 pr-1">
                  {userName}
                </p>
                <p className="text-sm ">{createdAt}</p>
              </div>
              <p className="break-words">
                {renderContentWithMentions(realContent)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex gap-1 items-center">
              {liked ? (
                <FaHeart onClick={handleLike} className="cursor-pointer" />
              ) : (
                <FaRegHeart onClick={handleLike} className="cursor-pointer" />
              )}
              <span> {numberOfLikes}</span>
            </div>
            <span
              className=" hover:underline cursor-pointer"
              onClick={() => replyReply(`@${userName}`)}
            >
              reply
            </span>
            {currentUser && currentUser.user._id === userId ? (
              <div className="flex justify-between gap-3">
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
        </div>
      )}
    </div>
  );
}

export default QuestionReplySection;
