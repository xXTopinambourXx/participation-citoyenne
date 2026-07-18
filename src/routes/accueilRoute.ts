import { Router } from "express";
import { AccueilController } from "../controllers/AccueilController.js";

const router = Router();

router.get("/", AccueilController.index);

export default router;