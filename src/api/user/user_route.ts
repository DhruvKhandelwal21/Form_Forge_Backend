import express from "express";
import { getUser, addUser, refreshAccessToken, logoutUser, me } from "./user_controller";
import auth from "../../middleWare/authMiddleware";
const router = express.Router();
router.get("/me",auth(), me);
router.post("/login", getUser);
router.post("/register", addUser);
router.put("/refresh-access-token", refreshAccessToken);
router.post("/logout",auth(), logoutUser);

export default router;