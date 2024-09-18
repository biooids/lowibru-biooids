import express from "express";
import mongoose from "mongoose";

import authRoutes from "../api/routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import replyQuestionRoutes from "./routes/reply.question.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import replyRoutes from "./routes/reply.routes.js";

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((error) => {
    console.log(
      "MongoDB Atlas failed to connect due to error :",
      error.message || error
    );
  });

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/replyQuestion", replyQuestionRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRouter);
app.use("/api/reply", replyRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message =
    `action failed due to : ${error.message}` ||
    "action failed due to : internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server is listening at http://${host}:${port}`);
});
