import mongoose from "mongoose";
const { Schema } = mongoose;

const flicksSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Flick = mongoose.model("Flick", flicksSchema);
export default Flick;
