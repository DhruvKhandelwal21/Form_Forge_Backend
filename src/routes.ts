import express from "express";
import user_route from "./api/user/user_route";
// import expense_route from "../api/expense/expense_route";
// import income_route from "../api/income/income_route";
const router = express.Router();

router.use("/user", user_route);
// router.use("/expense", expense_route);
// router.use("/income", income_route);
export default router;