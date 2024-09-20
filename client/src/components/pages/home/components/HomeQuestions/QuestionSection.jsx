import React, { useState } from "react";
import { Avatar, Button, Textarea } from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionReplyComp from "./QuestionReplyComp";
import moment from "moment";

function QuestionSection({
  content,
  questionId,
  fetchedLikes,
  isLiked,
  userId,
  onDelete,
  fetchedNumberOfReplies,
  profilePicture,
  userName,
  createdAt,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [realContent, setRealContent] = useState(content);

  const [showReplies, setShowReplies] = useState(false);
  const [numberOfReplies, setNumberOfReplies] = useState(
    fetchedNumberOfReplies
  );

  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(isLiked);
  const [numberOfLikes, setNumberOfLikes] = useState(fetchedLikes);

  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (!currentUser) {
        navigate("/sign-up");
        return;
      }

      const res = await fetch(`/api/question/likeQuestion/${questionId}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        const isLiked = data.updatedQuestion.likes.includes(
          currentUser.user._id
        );
        setNumberOfLikes((prev) => (isLiked ? prev + 1 : prev - 1));
        setLiked(isLiked);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/question/editQuestion/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data.success) {
        setRealContent(data.editedQuestion.content);
        setIsEditing(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/question/deleteQuestion/${questionId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      if (data.success) {
        onDelete(data.deletedQuestion._id);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" p-3 rounded-lg bg-slate-900  ">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <p>Characters remaining: {200 - editedContent.length}</p>
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            <Textarea
              maxLength="200"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="w-fit"
                disabled={editedContent.trim().length === 0}
              >
                Save
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
            <div className="flex  flex-col gap-3 w-[80%] sm:w-[85%] ">
              <div className=" font-medium  text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between gap-1 rounded-lg ">
                <p className="line-clamp-1 break-all h-7 bg-black pl-1 pr-1">
                  {userName}
                </p>
                <p className="text-sm">{createdAt}</p>
              </div>

              <p className="break-all w-[85%]">{realContent}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 ">
            <div className="flex items-center gap-1">
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
                  className="hover:underline cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </span>
                <span
                  className="hover:underline cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {showReplies ? (
              <QuestionReplyComp
                questionId={questionId}
                setNumberOfReplies={setNumberOfReplies}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default QuestionSection;
