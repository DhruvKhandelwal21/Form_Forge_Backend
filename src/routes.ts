import express from "express";
import user_route from "./api/user/user_route";
import formRouter from "./api/form/form_route"
import submitRouter from "./api/submissions/submissions_route";
const router = express.Router();

router.use("/user", user_route);
router.use("/form",formRouter);
router.use("/submit",submitRouter);
export default router;