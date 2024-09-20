import Reply from "../models/reply.model.js";
import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createReply = async (req, res, next) => {
  try {
    const { replyContent, commentId } = req.body;

    if (!req.user.id) {
      return next(errorHandler(403, "You must be logged in to create a reply"));
    }

    const newReply = new Reply({
      replyContent,
      commentId,
      userId: req.user.id,
    });

    const savedReply = await newReply.save();

    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: savedReply._id },
      $inc: { numberOfReplies: 1 },
    });

    const populatedReply = await Reply.findById(savedReply._id)
      .populate("userId", "userName profilePicture")
      .exec();

    res.status(200).json({
      success: true,
      message: "Reply created successfully",
      savedReply: populatedReply,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentReplies = async (req, res, next) => {
  try {
    const replies = await Reply.find({ commentId: req.params.commentId })
      .populate("userId", "userName profilePicture")
      .sort({
        createdAt: -1,
      })
      .exec();
    if (!replies) {
      return next(errorHandler(404, "No replies found for this comment"));
    }

    res.status(200).json({
      success: true,
      message: "Replies fetched successfully",
      replies,
    });
  } catch (error) {
    next(error);
  }
};

export const likeReply = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return next(errorHandler(403, "You must be logged in to like a reply"));
    }
    const replyId = req.params.replyId;

    const reply = await Reply.findById(replyId).select("likes numberOfLikes");
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }

    const userHasLiked = reply.likes.includes(userId);
    const updateQuery = userHasLiked
      ? { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
      : { $addToSet: { likes: userId }, $inc: { numberOfLikes: 1 } };

    const updatedReply = await Reply.findByIdAndUpdate(replyId, updateQuery, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Reply updated", updatedReply });
  } catch (error) {
    next(error);
  }
};

export const editReply = async (req, res, next) => {
  const { replyId, replyContent } = req.body;
  console.log("data from req.body", req.body);

  try {
    const reply = await Reply.findById(replyId);

    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }

    if (
      reply.userId.toString() !== req.user.id.toString() &&
      !req.user.isAdmin &&
      !req.user.isMainAdmin
    ) {
      return next(errorHandler(403, "You are not allowed to edit this reply"));
    }

    const editedReply = await Reply.findByIdAndUpdate(
      replyId,
      {
        replyContent,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reply edited successfully",
      editedReply,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReply = async (req, res, next) => {
  try {
    const reply = await Reply.findById(req.params.replyId);
    if (!reply) {
      return next(errorHandler(404, "Reply not found"));
    }
    if (
      reply.userId.toString() !== req.user.id.toString() &&
      !req.user.isAdmin
    ) {
      return next(
        errorHandler(403, "You are not allowed to delete this reply")
      );
    }

    const deletedReply = await Reply.findByIdAndDelete(req.params.replyId);

    await Comment.findByIdAndUpdate(deletedReply.commentId, {
      $pull: { replies: deletedReply._id },
      $inc: { numberOfReplies: -1 },
    });

    res.status(200).json({
      success: true,
      message: "Reply has been deleted",
      deletedReply,
    });
  } catch (error) {
    next(error);
  }
};
