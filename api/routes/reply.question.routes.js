import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  createReply,
  deleteReply,
  editReply,
  getQuestionReplies,
  likeReply,
} from "../controllers/reply.question.controllers.js";

const router = express.Router();

// Route to create a new reply to a question
router.post("/createReply/:questionId", verifyToken, createReply);

// Route to get all replies for a specific question
router.get("/getQuestionReplies/:questionId", getQuestionReplies);

// Route to like/unlike a reply
router.put("/likeReply/:replyId", verifyToken, likeReply);

// Route to edit a reply
router.put("/editReply/:replyId", verifyToken, editReply);

// Route to delete a reply
router.delete("/deleteReply/:replyId", verifyToken, deleteReply);

export default router;
