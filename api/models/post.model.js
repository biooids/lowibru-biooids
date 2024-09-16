import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: Array,
      default: [
        "https://firebasestorage.googleapis.com/v0/b/lowibru-biooids.appspot.com/o/1726428547275-post.jpeg?alt=media&token=103317e4-f928-4ca0-822e-08be7ae55985",
      ],
    },
    category: {
      type: String,
      default: "happened",
    },
    schedule: {
      type: String,
      default: "",
    },
    ended: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    externalLink: {
      type: String,
      default: "",
    },
    saveCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
