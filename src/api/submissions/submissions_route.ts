import express from "express";
import { findAll, create } from "./submissions_controller";
import auth from "../../middleWare/authMiddleware";
const router = express.Router();

router.post('/',auth(), create);
router.get('/:id',auth(), findAll);
export default router;