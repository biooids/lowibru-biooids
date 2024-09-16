import express from "express";
import {
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  getUserSavedPosts,
  likePost,
  savePost,
  unSavePost,
  updatePost,
} from "../controllers/post.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/create", verifyToken, createPost);
router.get("/getPosts", getPosts);
router.get("/getPost/:slug", getPostBySlug);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);

router.put("/likePost/:postId", verifyToken, likePost);

router.put("/updatePost/:postId/:userId", verifyToken, updatePost);
router.post("/savePost", verifyToken, savePost);
router.get("/getUserSavedPosts", verifyToken, getUserSavedPosts);
router.delete("/unSavePost", verifyToken, unSavePost);

export default router;
