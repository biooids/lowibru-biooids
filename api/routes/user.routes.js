import express from "express";
import {
  deleteUser,
  //   deleteUser,
  //   getUser,
  //   getUsers,
  signout,
  //   test,
  //   updateUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/signout", signout);
router.delete("/delete/:userId", verifyToken, deleteUser);
// router.get("/test", test);
// router.put("/update/:userId", verifyToken, updateUser);
// router.get("/getusers", verifyToken, getUsers);
// router.get("/:userId", getUser);

export default router;
