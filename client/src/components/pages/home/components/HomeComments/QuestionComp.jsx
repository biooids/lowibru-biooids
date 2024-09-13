import React, { useState, useEffect } from "react";
import { Button, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import QuestionSection from "./QuestionSection";

function QuestionComp() {
  const { currentUser } = useSelector((state) => state.user);

  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/question/createQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: question,
          userId: currentUser.user._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setQuestion("");
        setQuestions([...questions, data.savedQuestion]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestions = async () => {
    try {
      const res = await fetch("/api/question/getQuestions");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setQuestions(data.questions);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleQuestionDelete = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question._id !== questionId)
    );
  };

  return (
    <div className="p-3">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {currentUser ? (
          <div>
            <p>Signed in as: {currentUser.user.userName}</p>
          </div>
        ) : (
          <Button>Login or Sign up</Button>
        )}
        <Textarea
          onChange={(e) => setQuestion(e.target.value)}
          maxLength="200"
          value={question}
        />
        <p>{200 - question.length} characters remaining</p>
        <Button
          type="submit"
          className="w-fit"
          disabled={question.trim().length === 0}
        >
          Submit
        </Button>
      </form>

      <div className="flex flex-col gap-3 p-5 border-2 border-slate-800 mt-3">
        {questions.length > 0
          ? questions.map((question) => (
              <QuestionSection
                key={question._id}
                questionId={question._id}
                content={question.content}
                fetchedLikes={question.numberOfLikes}
                isLiked={question.likes.includes(currentUser.user._id)}
                userId={question.userId}
                onDelete={handleQuestionDelete}
                fetchedNumberOfReplies={question.numberOfReplies}
              />
            ))
          : "No questions yet."}
      </div>
    </div>
  );
}

export default QuestionComp;
