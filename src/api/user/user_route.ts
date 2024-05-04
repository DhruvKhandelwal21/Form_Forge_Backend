import express from "express";
import { getUser, addUser } from "./user_controller";
const router = express.Router();
router.post("/login", getUser);
router.post("/register", addUser);
export default router;