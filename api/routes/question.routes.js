import express from "express";
import {
  createQuestion,
  //   deleteQuestion,
  //   editQuestion,
  //   getQuestions,
  //   likeQuestion,
} from "../controllers/question.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route to create a new question
router.post("/createQuestion", verifyToken, createQuestion);

// Route to get all questions
// router.get("/getQuestions", verifyToken, getQuestions);

// Route to like/unlike a question
// router.put("/likeQuestion/:questionId", verifyToken, likeQuestion);

// Route to edit a question
// router.put("/editQuestion/:questionId", verifyToken, editQuestion);

// Route to delete a question
// router.delete("/deleteQuestion/:questionId", verifyToken, deleteQuestion);

export default router;
