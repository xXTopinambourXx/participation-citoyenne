import { Router } from "express";
import { administrateurController } from "../controllers/administrateurController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const adminRouter = Router();

// GET /administrateur/
adminRouter.get("/", adminMiddleware, administrateurController.getAdmin);

// GET /administrateur/consultations/new
adminRouter.get("/consultations/new", adminMiddleware, administrateurController.getNewConsultation);

// POST /administrateur/consultations
adminRouter.post("/consultations", adminMiddleware, administrateurController.createConsultation);

export { adminRouter as adminRouter };