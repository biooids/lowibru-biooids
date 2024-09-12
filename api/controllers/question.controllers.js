import Question from "../models/question.model.js";
import { errorHandler } from "../utils/error.js";

export const createQuestion = async (req, res, next) => {
  try {
    const { content } = req.body;
    console.log("data from req.body", req.body);
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

    res
      .status(200)
      .json({ success: true, message: "Question created", savedQuestion });
  } catch (error) {
    next(error);
  }
};
