import React, { useState, useEffect } from "react";
import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import QuestionReplySection from "./QuestionReplySection";

function QuestionReplyComp({ questionId, setNumberOfReplies }) {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.user._id;

  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/replyQuestion/createReply/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyContent,
          userId,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setReplyContent(""); // Clear the input field
        modifyAndSetReply(
          data.savedReply,
          currentUser.user.profilePicture,
          currentUser.user.userName
        );

        // Increment the reply count
        setNumberOfReplies((prev) => prev + 1);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifyAndSetReply = (savedReply, profilePicture, userName) => {
    const modifiedReply = {
      ...savedReply,
      userId: { ...savedReply.userId, profilePicture, userName },
    };
    setReplies((prevReplies) => [modifiedReply, ...prevReplies]);
  };

  const getReplies = async (limit = 3, skip = 0) => {
    try {
      const res = await fetch(
        `/api/replyQuestion/getQuestionReplies/${questionId}?limit=${limit}&skip=${skip}`
      );
      const data = await res.json();

      if (data.success) {
        setReplies((prevReplies) => [...prevReplies, ...data.replies]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreReplies = () => {
    const currentCount = replies.length;
    getReplies(3, currentCount);
  };

  useEffect(() => {
    getReplies();
  }, [questionId]);

  const handleReplyDelete = (replyId) => {
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply._id !== replyId)
    );
  };

  return (
    <div className="p-3">
      <form className="flex flex-col gap-3 mb-5" onSubmit={handleSubmit}>
        <TextInput
          name="reply"
          id="reply"
          type="text"
          placeholder="Add a reply"
          required
          shadow
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          maxLength="200"
        />
        <Button
          type="submit"
          className="w-fit"
          disabled={replyContent.trim().length === 0}
        >
          Submit
        </Button>
      </form>

      {/* List of replies */}
      <div className="flex flex-col gap-5">
        {replies.length > 0
          ? replies.map((reply) => (
              <QuestionReplySection
                key={reply._id}
                replyId={reply._id}
                userId={reply.userId._id}
                replyContent={reply.replyContent}
                isLiked={reply.likes.includes(userId)}
                fetchedLikes={reply.numberOfLikes}
                onDelete={handleReplyDelete}
                replyReply={setReplyContent}
                profilePicture={reply.userId.profilePicture}
                userName={reply.userId.userName}
                createdAt={new Date(reply.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              />
            ))
          : "No replies yet."}

        <Button onClick={loadMoreReplies}>Load More Replies</Button>
      </div>
    </div>
  );
}

export default QuestionReplyComp;
