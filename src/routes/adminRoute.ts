import { Router } from "express";
import { AdminController } from "../controllers/AdminController.js";
import { ConsultationController } from "../controllers/consultationController.js";

const router = Router();

router.get("/", AdminController.index);

export default router;