import React, { useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionReplyComp from "./QuestionReplyComp";

function QuestionSection({
  content,
  questionId,
  fetchedLikes,
  isLiked,
  userId,
  onDelete,
  fetchedNumberOfReplies,
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
    <section className="p-2 border-2 border-slate-800">
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
        <div>
          <p>{realContent}</p>
          <div className="flex justify-between w-[300px]">
            <div className="flex items-center gap-2">
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
            {currentUser.user._id === userId && (
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
            )}
          </div>
          {showReplies ? (
            <QuestionReplyComp
              questionId={questionId}
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

export default QuestionSection;
