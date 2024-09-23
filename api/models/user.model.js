import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emailOrPhone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      default: "there is nothing to say!",
    },
    externalLink: {
      type: String,
      default: "https://www.biooids.com/",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeveloper: {
      type: Boolean,
      default: false,
    },
    isLeader: {
      type: Boolean,
      default: false,
    },

    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    },
    country: {
      type: String,
      default: "Unknown",
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);
export default User;
