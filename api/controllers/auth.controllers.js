import User from "../models/user.model.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  console.log("data from req.body :", req.body);
  const { firstName, lastName, userName, emailOrPhone, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !userName ||
    !emailOrPhone ||
    !password ||
    firstName === "" ||
    lastName === "" ||
    userName === "" ||
    emailOrPhone === "" ||
    password === ""
  ) {
    next(
      errorHandler(
        400,
        "Empty fields. All fields are required. Please fill in all fields."
      )
    );
    return;
  }
  try {
    const hashedPassword = await argon2.hash(password);
    function capitalizeFirstLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    const newUser = new User({
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
      userName,
      emailOrPhone,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password: pass, ...rest } = savedUser._doc;

    const token = jwt.sign(
      {
        id: savedUser._id,
        isDeveloper: savedUser.isDeveloper,
        isAdmin: savedUser.isAdmin,
        isLeader: savedUser.isLeader,
      },
      process.env.JWT_SECRET,
      { expiresIn: "360d" }
    );
    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "You signed up successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
    return;
  }
};

export const logIn = async (req, res, next) => {
  const { emailOrPhone, password } = req.body;
  console.log("data from req.body", req.body);

  if (!emailOrPhone || !password || emailOrPhone === "" || password === "") {
    next(errorHandler(400, "Empty fields. All fields are required"));
    return;
  }

  try {
    const validUser = await User.findOne({ emailOrPhone });
    if (!validUser) {
      next(errorHandler(404, "user not found"));
      return;
    }

    const validPassword = await argon2.verify(validUser.password, password);
    if (!validPassword) {
      next(errorHandler(400, "incorrect password"));
      return;
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        isDeveloper: validUser.isDeveloper,
        isLeader: validUser.isLeader,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "360d",
      }
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 365 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "logged in successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};
