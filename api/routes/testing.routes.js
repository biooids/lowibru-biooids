import express from "express";
import { test } from "../controllers/testing.controllers.js";

const router = express.Router();

router.get("/api/testing/test", test);

export default router;
