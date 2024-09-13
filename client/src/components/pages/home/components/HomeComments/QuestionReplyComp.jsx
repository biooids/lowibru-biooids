import { Label, TextInput, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
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
      console.log(data);

      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        setReplyContent("");
        setReplies([...replies, data.savedReply]);
        setNumberOfReplies((prevNumberOfReplies) => prevNumberOfReplies + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReplies = async () => {
    try {
      const res = await fetch(
        `/api/replyQuestion/getQuestionReplies/${questionId}`
      );
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        console.log(data.message);
        return;
      } else {
        setReplies(data.replies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, [questionId]);

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
      <div className="flex flex-col gap-3">
        {replies.length > 0
          ? replies.map((reply) => (
              <QuestionReplySection
                key={reply._id}
                replyId={reply._id}
                userId={reply.userId}
                replyContent={reply.replyContent}
                isLiked={reply.likes.includes(userId)}
                fetchedLikes={reply.numberOfLikes}
                onDelete={handleReplyDelete}
                replyReply={replyReply}
              />
            ))
          : "No replies yet."}
      </div>
    </div>
  );
}

export default QuestionReplyComp;
