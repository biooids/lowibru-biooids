import User from "../models/user.model.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

import FormData from "form-data";
import Mailgun from "mailgun.js";
import crypto from "crypto";

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

export const forgotPassword = async (req, res, next) => {
  const { emailOrPhone } = req.body;
  console.log("data req.body", req.body);

  if (!emailOrPhone || emailOrPhone === "") {
    next(errorHandler(400, "all fields required "));
  }

  try {
    const validUser = await User.findOne({ emailOrPhone });
    if (!validUser) {
      next(errorHandler(404, "User not found Sign Up"));
      return;
    }

    const newPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await argon2.hash(newPassword);
    validUser.password = hashedPassword;
    const savedUser = await validUser.save();

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });
    await mg.messages.create("biooids.com", {
      from: "Lowibru intellbiooid@gmail.com",
      to: [emailOrPhone],
      subject: "Hello",
      text: "Testing some Mailgun awesomness!",
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>Password Reset</title>
    <style>
      body {
        margin: 0;
        padding: 20px;
        background-color: #000;
        color: #fff;
        font-family: "Poppins", sans-serif;
      }
      .email-container {
        width: 100%;
        margin: 0 auto;
        padding: 20px;
        background-color: #111;
        border: 1px solid #444;
        border-radius: 8px;
      }
      .email-header {
        width:100%;
        text-align: center;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-around;
      }
      .email-header img {
        max-width: 150px;
      }
      h1 {
        color: gold;
        font-size: 28px;
        margin-bottom: 10px;
      }
      h2 {
        color: #ccc;
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #ddd;
      }
      .reset-code {
        background-color: #333;
        padding: 10px;
        text-align: center;
        color: gold;
        font-size: 18px;
        border-radius: 4px;
        margin: 20px 0;
      }
      .button {
        display: inline-block;
        background-color: gold;
        color: black;
        padding: 12px 24px;
        font-weight: 600;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 20px;
      }
      .email-footer {
        text-align: center;
        padding-top: 30px;
        color: #888;
        font-size: 14px;
      }
      .footer-links {
        margin-top: 30px;
        color: #aaa;
        font-size: 14px;
        border-top: 1px solid #333;
        padding-top: 20px;
      }
      .footer-links a {
        color: gold;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap:10px;
        font-size: 14px;

        text-align: center;
        font-weight: 600;
        margin: 0 10px;

      }
      .footer-links a:hover {
        text-decoration: underline;
      }

      .biooids {
        color: cyan;
      }
      .lowibru {
        color: gold;
      }
    </style>
  </head>
  <body>
    <main class="email-container">
      <header class="email-header">
        <img
          src="https://www.tparents.org/library/unification/photos/u-logo/ffwpu-g1.gif"
          alt="Your Company Logo"
        />
        <img
          src="https://www.tparents.org/library/unification/photos/u-logo/uc-1.gif"
          alt=""
        />
      </header>

      <section>
        <h1>Password Reset Request</h1>
        <h2>Hi there,</h2>
        <p>
          If you did not request a password reset, please ignore this email.
        </p>
        <p>Please use the following code to reset your password:</p>
        <div class="reset-code">${newPassword}</div>
        <p>
          Click the button below to log in, and reset your password immediately:
        </p>
        <a href="#" class="button">Log In</a>
      </section>

      <footer class="email-footer">
        <p>Best regards,</p>
        <p>
          <strong>
            <span class="lowibru">Lowibru</span> Team under
            <span class="biooids">Biooids</span>
          </strong>
        </p>
        <p>If you have any questions, feel free to contact our support team.</p>

        <div class="footer-links">
          <p>Contact us:</p>
          <a href="mailto:intellbiooid@gmail.com"
            >Email: intellbiooid@gmail.com</a
          >
          <a href="https://wa.me/250790931024">WhatsApp: +250790931024</a> 
        
          <a href="https://biooids.com"
            >Tech Team Website: <span class="biooids"> biooids.com</span></a
          >
        </div>
      </footer>
    </main>
  </body>
</html>
`,
    });

    res.status(201).json({
      success: true,
      message: `email sent to ${emailOrPhone}`,
    });
  } catch (error) {
    next(error);
  }
};
