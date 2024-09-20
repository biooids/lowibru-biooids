import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log("data from req.body", req.body);

    if (!req.user.id && req.user.id !== userId) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    const savedComment = await newComment.save();
    const populatedComment = await Comment.findById(savedComment._id)
      .populate("userId", "userName profilePicture")
      .exec();

    res
      .status(200)
      .json({ success: true, message: "comment created", populatedComment });
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "userName profilePicture")
      .sort({
        createdAt: -1,
      });
    const totalComments = comments.length;
    res.status(200).json({
      success: true,
      message: "total comments found and comments",
      totalComments,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get user ID from request
    if (!userId) {
      return next(errorHandler(403, "You must be logged in to like a comment"));
    }
    const commentId = req.params.commentId; // Get comment ID from request parameters

    // Step 1: Check if the comment exists and if the user has liked it
    const comment = await Comment.findById(commentId).select(
      "likes numberOfLikes"
    );
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    // Step 2: Determine if the user has already liked the comment
    const userHasLiked = comment.likes.includes(userId);

    // Step 3: Build the update query based on whether the user has liked the comment or not
    const updateQuery = userHasLiked
      ? { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
      : { $addToSet: { likes: userId }, $inc: { numberOfLikes: 1 } };

    // Step 4: Perform the update atomically only if necessary
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updateQuery,
      { new: true }
    );

    // Step 5: Send the response with the updated comment
    res
      .status(200)
      .json({ success: true, message: "Comment updated", updatedComment });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};

export const editComment = async (req, res, next) => {
  const { commentId, content } = req.body;
  console.log("data from req.body", req.body);
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    console.log(comment.userId.toString() === req.user.id.toString());
    if (
      comment.userId.toString() !== req.user.id.toString() &&
      !req.user.isAdmin &&
      !req.user.isMainAdmin &&
      !req.user.isAdmin
    ) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "comment edited", editedComment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  console.log(req.params.commentId);
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (
      comment.userId.toString() !== req.user.id.toString() &&
      !req.user.isAdmin
    ) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );
    }
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    res.status(200).json({
      success: true,
      message: " Comment has been deleted",
      deletedComment,
    });
  } catch (error) {
    next(error);
  }
};
