import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";

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
  // const getComments = async () => {
  //   try {
  //     const res = await fetch(`/api/comment/getPostComments/${postId}`);
  //     const data = await res.json();

  //     console.log(data);

  //     if (!data.success) {
  //       console.log(data.message);
  //       return;
  //     } else {
  //       setComments(data.comments);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getComments();
  // }, [postId]);

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    setNumberOfComments((prevNumberOfReplies) => prevNumberOfReplies - 1);
  };
  return (
    <div className=" flex flex-col  gap-3">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {currentUser ? (
          <div>
            <p>Signed is as : {currentUser.user.userName} </p>
          </div>
        ) : (
          <Button>login or sign up</Button>
        )}
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
      <div className="flex flex-col gap-5 w-full">
        {comments.length > 0
          ? comments.map((comment) => (
              <CommentSection
                key={comment._id}
                commentId={comment._id}
                content={comment.content}
                fetchedLikes={comment.numberOfLikes}
                isLiked={comment.likes.includes(currentUser.user._id)}
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
