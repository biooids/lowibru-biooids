import express from "express";
import {
  signout,
  deleteUser,
  getUser,
  updateUser,
  //   getUsers,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/signout", signout);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getuser/:userId", getUser);
router.patch("/update/:userId", verifyToken, updateUser);
// router.get("/getusers", verifyToken, getUsers);

export default router;
