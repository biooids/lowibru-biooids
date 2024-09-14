import QuestionReply from "../models/reply.question.model.js";
import Question from "../models/question.model.js";
import { errorHandler } from "../utils/error.js";

export const createReply = async (req, res, next) => {
  try {
    const { replyContent } = req.body;
    const { questionId } = req.params;

    if (!req.user.id) {
      return next(
        errorHandler(403, "You must be logged in to create a QuestionReply")
      );
    }

    const newReply = new QuestionReply({
      replyContent,
      questionId,
      userId: req.user.id,
    });

    const savedReply = await newReply.save();

    // Update question to include this reply
    await Question.findByIdAndUpdate(questionId, {
      $push: { replies: savedReply._id },
      $inc: { numberOfReplies: 1 },
    });

    // Here, populate the reply, not the question
    const populatedReply = await QuestionReply.findById(savedReply._id)
      .populate("userId", "userName profilePicture")
      .exec();

    res.status(200).json({
      success: true,
      message: "QuestionReply created successfully",
      savedReply: populatedReply,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionReplies = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  try {
    const { questionId } = req.params;

    const replies = await QuestionReply.find({ questionId })
      .populate("userId", "userName profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalReplies = await QuestionReply.countDocuments({ questionId });

    if (replies.length === 0) {
      return next(errorHandler(404, "No replies found for this question"));
    }

    res.status(200).json({
      success: true,
      message: "Replies fetched successfully",
      replies,
      totalReplies,
    });
  } catch (error) {
    next(error);
  }
};

export const likeReply = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { replyId } = req.params;

    if (!userId) {
      return next(
        errorHandler(403, "You must be logged in to like a QuestionReply")
      );
    }

    const reply = await QuestionReply.findById(replyId).select(
      "likes numberOfLikes"
    );
    if (!reply) {
      return next(errorHandler(404, "QuestionReply not found"));
    }

    const userHasLiked = reply.likes.includes(userId);
    const updateQuery = userHasLiked
      ? { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
      : { $addToSet: { likes: userId }, $inc: { numberOfLikes: 1 } };

    const updatedReply = await QuestionReply.findByIdAndUpdate(
      replyId,
      updateQuery,
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "QuestionReply updated", updatedReply });
  } catch (error) {
    next(error);
  }
};

export const editReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { replyContent } = req.body;

    const reply = await QuestionReply.findById(replyId);
    if (!reply) {
      return next(errorHandler(404, "QuestionReply not found"));
    }

    if (reply.userId.toString() !== req.user.id.toString()) {
      return next(
        errorHandler(403, "You are not allowed to edit this QuestionReply")
      );
    }

    // reply.replyContent = replyContent;
    // const editedReply = await reply.save();

    const editedReply = await QuestionReply.findByIdAndUpdate(
      replyId,
      {
        replyContent,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "QuestionReply edited successfully",
      editedReply,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;

    const reply = await QuestionReply.findById(replyId);
    if (!reply) {
      return next(errorHandler(404, "QuestionReply not found"));
    }

    if (reply.userId.toString() !== req.user.id.toString()) {
      return next(
        errorHandler(403, "You are not allowed to delete this QuestionReply")
      );
    }

    const deletedReply = await QuestionReply.findByIdAndDelete(replyId);

    // Update question to remove this reply
    await Question.findByIdAndUpdate(deletedReply.questionId, {
      $pull: { replies: deletedReply._id },
      $inc: { numberOfReplies: -1 },
    });

    res.status(200).json({
      success: true,
      message: "QuestionReply has been deleted",
      deletedReply,
    });
  } catch (error) {
    next(error);
  }
};
