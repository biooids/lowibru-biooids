import Post from "../models/post.model.js";
import User from "../models/user.model.js";

import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  console.log("data from body", req.body);
  try {
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      message: "post created success full",
      post: savedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const filters = {
      ...(req.query.userId && { userId: req.query.userId }), // Filter by userId if provided
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const posts = await Post.find(filters).populate({
      path: "userId",
      select: "userName profilePicture",
    });

    const totalPosts = await Post.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: "all posts found",
      totalPosts,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    console.log("data from req.body", slug);
    const post = await Post.findOne({ slug });
    if (!post) {
      next(errorHandler(404, "Post not found"));
      return;
    }
    res.status(200).json({ success: true, message: "post found", post: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      next(errorHandler(403, "You do not have permission to delete the post"));
      return;
    }

    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({
      success: true,
      message: "Post has been deleted",
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;
    console.log(postId);

    const post = await Post.findById(postId).select("likes numberOfLikes");
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    const userHasLiked = post.likes.includes(userId);

    const updateQuery = userHasLiked
      ? { $pull: { likes: userId }, $inc: { numberOfLikes: -1 } }
      : { $addToSet: { likes: userId }, $inc: { numberOfLikes: 1 } };

    const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "post updated", updatedPost });
  } catch (error) {
    next(error);
  }
};

export const savePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await Post.findById(postId).select("saves numberOfSaves");
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    const userHasSaved = post.saves.includes(userId);

    const updateQuery = userHasSaved
      ? { $pull: { saves: userId }, $inc: { numberOfSaves: -1 } }
      : { $addToSet: { saves: userId }, $inc: { numberOfSaves: 1 } };

    const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Post updated", updatedPost });
  } catch (error) {
    next(error);
  }
};

export const getUserSavedPosts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return next(errorHandler(404, "User not found log in or sign up"));
    }

    // Find all posts where the `saved` array includes the user ID
    const savedPosts = await Post.find({ saves: userId });

    res.status(200).json({
      success: true,
      message: "Saved posts fetched successfully",
      savedPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  console.log("data from body", req.body);
  const { title, content, category, images, externalLink, schedule } = req.body;
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(
        401,
        "You do not have permission to edit or update this post "
      )
    );
  }

  try {
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title,
          content,
          category,
          images,
          externalLink,
          schedule,
          slug,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "post updated successfully",
      updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// export const getUserSavedPosts = async (req, res, next) => {
//   const { userId } = req.query;
//   console.log(userId);

//   try {
//     const user = await User.findById(userId).populate("savedPosts");

//     if (!user) {
//       return next(errorHandler(404, "User not found"));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Saved posts retrieved successfully",
//       savedPosts: user.savedPosts,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const savePost = async (req, res, next) => {
//   const { postId } = req.body;
//   console.log("data from req.body", postId);

//   if (!req.user.id) {
//     return next(errorHandler(401, "Please log in or sign up first"));
//   }

//   try {
//     const postToSave = await Post.findById(postId); // Find the post to save
//     if (!postToSave) {
//       return next(errorHandler(404, "Post not found"));
//     }

//     const validUser = await User.findById(req.user.id); // Find the user
//     if (!validUser) {
//       return next(
//         errorHandler(404, "User not found. Please log in or sign up first")
//       );
//     }

//     // Ensure savedPosts is initialized
//     if (!Array.isArray(validUser.savedPosts)) {
//       validUser.savedPosts = [];
//     }

//     // Check if post is already saved
//     const isPostAlreadySaved = validUser.savedPosts.some(
//       (savedPost) => savedPost.toString() === postId
//     );

//     if (isPostAlreadySaved) {
//       // Post is already saved
//       return next(errorHandler(400, "This post is already saved"));
//     } else {
//       // Post is not saved, so add it
//       validUser.savedPosts.push(postId);

//       // Increment the save count
//       postToSave.saveCount += 1;
//       await postToSave.save();

//       const updatedUser = await validUser.save();
//       res.status(200).json({
//         success: true,
//         message: "Post saved successfully",
//         updatedUser,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
// export const unSavePost = async (req, res, next) => {
//   const { postId } = req.body;
//   console.log("data from req.body", postId);

//   if (!req.user.id) {
//     return next(errorHandler(401, "Please log in or sign up first"));
//   }

//   try {
//     const postToUnsave = await Post.findById(postId); // Find the post to unsave
//     if (!postToUnsave) {
//       return next(errorHandler(404, "Post not found"));
//     }

//     const validUser = await User.findById(req.user.id); // Find the user
//     if (!validUser) {
//       return next(
//         errorHandler(404, "User not found. Please log in or sign up first")
//       );
//     }

//     // Ensure savedPosts is initialized
//     if (!Array.isArray(validUser.savedPosts)) {
//       validUser.savedPosts = [];
//     }

//     // Check if the post is saved
//     const isPostSaved = validUser.savedPosts.some(
//       (savedPost) => savedPost.toString() === postId
//     );

//     if (!isPostSaved) {
//       // Post is not saved
//       return next(errorHandler(400, "This post is not saved"));
//     } else {
//       // Post is saved, so remove it
//       validUser.savedPosts = validUser.savedPosts.filter(
//         (savedPost) => savedPost.toString() !== postId
//       );

//       // Decrement the save count
//       postToUnsave.saveCount -= 1;
//       await postToUnsave.save();

//       const updatedUser = await validUser.save();
//       res.status(200).json({
//         success: true,
//         message: "Post unsaved successfully",
//         updatedUser,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
