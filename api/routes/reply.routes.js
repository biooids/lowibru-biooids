import express from "express";

import {
  createReply,
  deleteReply,
  editReply,
  getCommentReplies,
  likeReply,
} from "../controllers/reply.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createReply", verifyToken, createReply);
router.get("/getCommentReplies/:commentId", getCommentReplies);
router.put("/likeReply/:replyId", verifyToken, likeReply);
router.put("/editReply", verifyToken, editReply);
router.delete("/deleteReply/:replyId", verifyToken, deleteReply);

export default router;
