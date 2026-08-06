import { Router } from "express";
import { consultationController } from "../controllers/consultationController.js";

const consultationsRouter = Router();

// GET /consultations
consultationsRouter.get("/", (req, res) =>
    consultationController.getConsultations(req, res)
);

// GET /consultations/:id
consultationsRouter.get("/:id", consultationController.getConsultation);

export { consultationsRouter };