import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

function CommentComp({
  postId,
  numberOfComments,
  setNumberOfComments,
  comments,
  setComments,
}) {
  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/comment/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          userId: currentUser.user._id,
          postId,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
      } else {
        console.log(data);
        setComment("");
        setComments([data.populatedComment, ...comments]);

        setNumberOfComments((prevNumberOfReplies) => prevNumberOfReplies + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    setNumberOfComments((prevNumberOfReplies) => prevNumberOfReplies - 1);
  };
  return (
    <div className=" flex flex-col  gap-3">
      {currentUser ? (
        <div className="flex gap-3 flex-col">
          <div>
            <p>Signed is as : {currentUser.user.userName} </p>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Textarea
              onChange={(e) => setComment(e.target.value)}
              maxLength="200"
              value={comment}
            />
            <p>{200 - comment.length} characters remaining</p>
            <Button
              type="submit"
              className="w-fit"
              disabled={comment.trim().length === 0}
            >
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Link to="/login">
          <Button className="w-full">login or sign up to comment</Button>
        </Link>
      )}
      <div className="flex flex-col gap-5 w-full">
        {comments && comments.length > 0
          ? comments.map((comment) => (
              <CommentSection
                key={comment._id}
                commentId={comment._id}
                content={comment.content}
                fetchedLikes={comment.numberOfLikes}
                isLiked={
                  currentUser
                    ? comment.likes.includes(currentUser.user._id)
                    : false
                }
                userId={comment.userId._id}
                profilePicture={comment.userId.profilePicture}
                userName={comment.userId.userName}
                onDelete={handleCommentDelete}
                fetchedNumberOfReplies={comment.numberOfReplies}
                createdAt={comment.createdAt}
              />
            ))
          : "No Comments yet "}{" "}
      </div>
    </div>
  );
}

export default CommentComp;
