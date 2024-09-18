import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReplyComp from "./ReplyComp";

function CommentSection({
  content,
  commentId,
  fetchedLikes,
  isLiked,
  userId,
  onDelete,
  fetchedNumberOfReplies,
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
        navigate("/sign-up");
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
    <section className="p-2 border-2 border-slate-800">
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
        <div>
          <p>{realContent}</p>
          <div className="flex justify-between w-[300px]">
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

            {currentUser.user._id === userId ? (
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
              "you can reply"
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
