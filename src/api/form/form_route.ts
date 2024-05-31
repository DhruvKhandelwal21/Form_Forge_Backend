import express from "express";
import {
  findAll,
  create,
  update,
  findOne,
  getFormStats,
  getFormContent,
  remove
} from "./form_controller";
import auth from "../../middleWare/authMiddleware";
const router = express.Router();

router.get("/get-form-stats", auth(), getFormStats);

router.get("/", auth(), findAll);

router.get("/:id", auth(), findOne);

router.post("/", auth(), create);

router.put("/", auth(), update);

router.put("/remove", auth(), remove);



router.put("/:shareId/get-form-content", auth(), getFormContent);

export default router;
