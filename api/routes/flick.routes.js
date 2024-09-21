import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  createFlick,
  deleteFlick,
  getFlicks,
} from "../controllers/flick.controllers.js";

const router = express.Router();
router.post("/create", verifyToken, createFlick);
router.get("/getFlicks", getFlicks);
router.delete("/deleteFlick/:flickId/:userId", verifyToken, deleteFlick);

export default router;
