import React, { useState, useEffect } from "react";
import { Button, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import QuestionSection from "./QuestionSection";
import { Link } from "react-router-dom";
import moment from "moment";

function QuestionComp() {
  const { currentUser } = useSelector((state) => state.user);

  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showMore, setShowMore] = useState(true);

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

        modifyAndSetQuestion(
          data.savedQuestion,
          currentUser.user.profilePicture
        );
      } else {
        console.log(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const modifyAndSetQuestion = (savedQuestion, newProfilePicture) => {
    const modifiedQuestion = {
      ...savedQuestion,
      userId: { ...savedQuestion.userId, profilePicture: newProfilePicture },
    };

    setQuestions((prevQuestions) => [modifiedQuestion, ...prevQuestions]);
  };

  const getQuestions = async (limit = 3, skip = 0) => {
    try {
      const res = await fetch(
        `/api/question/getQuestions?limit=${limit}&skip=${skip}`
      );
      const data = await res.json();

      if (data.success) {
        setQuestions((prevQuestions) => [...data.questions, ...prevQuestions]);
        console.log(data.questions);

        if (data.questions.length < 3) {
          setShowMore(false);
        }
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

  const loadMoreQuestions = () => {
    const currentCount = questions.length;
    getQuestions(3, currentCount);
  };

  const handleQuestionDelete = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question._id !== questionId)
    );
  };

  return (
    <div className="p-3 flex flex-col gap-5">
      <div>
        <h3 className="text-xl mb-xl mb-4"> Questions Section, feel free </h3>
        <p className=" text-gray-400">
          Please ensure that your questions are clear and relevant to the topic.
          Any rude or inappropriate questions may result in the deletion of your
          account.
        </p>
      </div>
      {currentUser ? (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <p>Signed in as: {currentUser.user.userName}</p>
          </div>

          <Textarea
            onChange={(e) => setQuestion(e.target.value)}
            maxLength="200"
            value={question}
            placeholder="Ask a question..."
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
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-500">
            You need to be logged in order to ask a question.
          </p>
          <Link to="login" className="w-full">
            <Button className="w-full">Login or Sign up</Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-3 w-full">
          {questions.length > 0
            ? questions.map((question) => (
                <QuestionSection
                  key={question._id}
                  questionId={question._id}
                  content={question.content}
                  fetchedLikes={question.numberOfLikes}
                  isLiked={
                    currentUser
                      ? question.likes.includes(currentUser.user._id)
                      : false
                  }
                  userId={question.userId._id}
                  onDelete={handleQuestionDelete}
                  fetchedNumberOfReplies={question.numberOfReplies}
                  profilePicture={question.userId.profilePicture}
                  userName={question.userId.userName}
                  createdAt={moment(question.createdAt).fromNow()}
                />
              ))
            : "No questions yet."}
        </div>

        {showMore && <Button onClick={loadMoreQuestions}>Load more</Button>}
      </div>
    </div>
  );
}

export default QuestionComp;
