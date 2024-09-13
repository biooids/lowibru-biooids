import mongoose from "mongoose";
const { Schema } = mongoose;

const questionReplySchema = new Schema(
  {
    replyContent: {
      type: String,
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const QuestionReply = mongoose.model("QuestionReply", questionReplySchema);

export default QuestionReply;
