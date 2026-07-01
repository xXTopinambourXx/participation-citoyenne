import { Router } from "express";
import { ConsultationController } from "../controllers/consultationController.js";

const router = Router();

router.get("/", ConsultationController.index);
router.get("/:id", ConsultationController.show);
router.post("/", ConsultationController.create);
router.put("/:id", ConsultationController.update);
router.delete("/:id", ConsultationController.delete);

export default router;