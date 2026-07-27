import { Router } from "express";
import { useFullRest } from "../useRest.js";
import { getConsultations } from "./getConsultations.js";
import { getConsultation } from "./getConsultation.js";

const consultationsRouter = Router();

// GET /consultations
consultationsRouter.get("/", (req, res) =>
    useFullRest(() => getConsultations(req, res), req, res)
);

// GET /consultations/:id
consultationsRouter.get("/:id", (req, res) =>
    useFullRest(() => getConsultation(req, res), req, res)
);

export { consultationsRouter };