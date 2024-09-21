import mongoose from "mongoose";
const { Schema } = mongoose;

const flicksSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    category: {
      type: Array,
      default: [],
    },
    slug: {
      type: String,
      unique: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    views: {
      type: Number,
      default: 0,
    },
    externalLink: {
      type: String,
      default: "",
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
    saves: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numberOfSaves: {
      type: Number,
      default: 0,
    },

    hashtags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Flick = mongoose.model("Flick", flicksSchema);
export default Flick;
