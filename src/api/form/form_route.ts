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
import staticSchemaValidation from "../../ajv/validator";
import { createFormValidation, updateFormValidation, deleteValidation } from "./form_validation";
const router = express.Router();

router.get("/get-form-stats", auth(), getFormStats);

router.get("/", auth(), findAll);

router.get("/:id", auth(), findOne);

router.post("/", auth(), staticSchemaValidation(createFormValidation), create);

router.put("/", auth(), staticSchemaValidation(updateFormValidation), update);

router.put("/remove", auth(), staticSchemaValidation(deleteValidation), remove);



router.put("/:shareId/get-form-content", auth(), getFormContent);

export default router;
