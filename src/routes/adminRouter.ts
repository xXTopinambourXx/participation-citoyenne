import { Router } from "express";
import { administrateurController } from "../controllers/administrateurController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const adminRouter = Router();

// GET /administrateur/
adminRouter.get("/", adminMiddleware, administrateurController.getAdmin);

export { adminRouter as adminRouter };