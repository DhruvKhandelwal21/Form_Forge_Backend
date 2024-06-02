import express from "express";
import { getUser, addUser, refreshAccessToken, logoutUser, me } from "./user_controller";
import auth from "../../middleWare/authMiddleware";
import staticSchemaValidation from "../../ajv/validator";
import { createUserValidation, loginUserValidation } from "./user_validation";
const router = express.Router();
router.get("/me",auth(), me);
router.post("/login", staticSchemaValidation(loginUserValidation), getUser);
router.post("/register", staticSchemaValidation(createUserValidation), addUser);
router.put("/refresh-access-token", refreshAccessToken);
router.post("/logout",auth(), logoutUser);

export default router;