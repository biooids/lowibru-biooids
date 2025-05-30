import { Label, TextInput, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReplySection from "./ReplySection";
import { Link } from "react-router-dom";

function ReplyComp({ commentId, setNumberOfReplies }) {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser ? currentUser.user._id : "";

  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reply/createReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyContent,
          userId,
          commentId,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        setReplyContent("");
        setReplies([data.savedReply, ...replies]);
        setNumberOfReplies((prevNumberOfReplies) => prevNumberOfReplies + 1);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = async () => {
    try {
      const res = await fetch(`/api/reply/getCommentReplies/${commentId}`);
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        setReplies(data.replies);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReplies();
  }, [commentId]);

  const handleReplyDelete = (replyId) => {
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply._id !== replyId)
    );
    setNumberOfReplies((prevNumberOfReplies) => prevNumberOfReplies - 1);
  };

  const replyReply = (userId) => {
    setReplyContent(`@${userId} `);
  };
  return (
    <div className="p-3 flex flex-col gap-3">
      {currentUser ? (
        <form className="flex flex-col gap-3 mb-5" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2  flex gap-3">
              <p>characters remaining: {200 - replyContent.length}</p>
            </div>
            <TextInput
              name="reply"
              id="reply"
              type="text"
              placeholder="add a reply"
              required
              shadow
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              maxLength="200"
            />
          </div>
          <Button
            type="submit"
            className="w-fit"
            disabled={replyContent.trim().length === 0}
          >
            Submit
          </Button>
        </form>
      ) : (
        <Link to="/signup">
          <Button className="w-full">Log in or sign up to reply</Button>
        </Link>
      )}

      <div className="flex flex-col gap-5">
        {replies.length > 0
          ? replies.map((reply) => (
              <ReplySection
                key={reply._id}
                replyId={reply._id}
                replyContent={reply.replyContent}
                isLiked={reply.likes.includes(userId)}
                fetchedLikes={reply.numberOfLikes}
                onDelete={handleReplyDelete}
                replyReply={replyReply}
                userId={reply.userId._id}
                profilePicture={reply.userId.profilePicture}
                userName={reply.userId.userName}
              />
            ))
          : "No Replies yet "}
      </div>
    </div>
  );
}

export default ReplyComp;
