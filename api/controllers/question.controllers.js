import Question from "../models/question.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createQuestion = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this question")
      );
    }

    const newQuestion = new Question({
      content,
      userId: req.user.id,
    });

    const savedQuestion = await newQuestion.save();

    const populatedQuestion = await Question.findById(savedQuestion._id)
      .populate("userId", "userName profilePicture")
      .exec();

    res.status(200).json({
      success: true,
      message: "Question created",
      savedQuestion: populatedQuestion,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  try {
    const questions = await Question.find()
      .populate("userId", "userName profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalQuestions = await Question.countDocuments();

    res.status(200).json({
      success: true,
      message: "Questions found",
      totalQuestions,
      questions,
    });
  } catch (error) {
    next(error);
  }
};

export const likeQuestion = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const questionId = req.params.questionId;

    const question = await Question.findById(questionId).select(
      "likes numberOfLikes"
    );
    if (!question) {
      return next(errorHandler(404, "Question not found"));
    }

    const userHasLiked = question.likes.includes(userId);

    const updateQuery = userHasLiked
      ? { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
      : { $addToSet: { likes: userId }, $inc: { numberOfLikes: 1 } };

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updateQuery,
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Question updated", updatedQuestion });
  } catch (error) {
    next(error);
  }
};

export const editQuestion = async (req, res, next) => {
  try {
    const { content } = req.body;
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, "Question not found"));
    }

    if (question.userId.toString() !== req.user.id.toString()) {
      return next(
        errorHandler(403, "You are not allowed to edit this question")
      );
    }

    question.content = content;
    const editedQuestion = await question.save();

    res
      .status(200)
      .json({ success: true, message: "Question edited", editedQuestion });
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return next(errorHandler(404, "Question not found"));
    }

    if (question.userId.toString() !== req.user.id.toString()) {
      return next(
        errorHandler(403, "You are not allowed to delete this question")
      );
    }

    const deletedQuestion = await Question.findByIdAndDelete(
      req.params.questionId
    );

    res.status(200).json({
      success: true,
      message: "Question has been deleted",
      deletedQuestion,
    });
  } catch (error) {
    next(error);
  }
};
