import User from "../models/user.model.js";
import argon2 from "argon2";
import { errorHandler } from "../utils/error.js";

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "user have been signout successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({ success: true, message: "user found", user: rest });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    userName,
    emailOrPhone,
    password,
    shortDescription,
    externalLink,
  } = req.body;
  console.log("data from req body", req.body);

  // Ensure the correct user is updating the profile
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  // Check if required fields are not empty
  if (!firstName || !lastName || !userName || !emailOrPhone) {
    return next(errorHandler(400, "Empty fields. All fields are required"));
  }

  try {
    // Prepare fields for update
    const updateData = {
      firstName,
      lastName,
      userName,
      emailOrPhone,
      shortDescription,
      externalLink,
    };

    // Only hash password if provided
    if (password) {
      updateData.password = await argon2.hash(password);
    }

    // Perform the update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateData },
      { new: true }
    );
    // Exclude password from the response
    const { password: _, ...rest } = updatedUser._doc;

    res
      .status(200)
      .json({ success: true, message: "User updated", user: rest });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.userName) {
      return next(errorHandler(500, "Username already exists"));
    } else {
      next(error);
    }
  }
};
