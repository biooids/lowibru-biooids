import express from "express";

import {
  forgotPassword,
  logIn,
  signUp,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/forgotpassword", forgotPassword);

export default router;
