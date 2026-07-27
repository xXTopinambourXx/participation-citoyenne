import type { Request, Response } from "express";
import { consultationCache } from "../../cache/consultations/ConsultationCache.js";
import { logError } from "../../utils/logger.js";

export async function getConsultations(req: Request, res: Response) {
    try {
        const consultations = await consultationCache.getAll();
        return res.render("consultations", { consultations });
    } catch (e) {
        logError("Erreur lors de la récupération des consultations :", e instanceof Error ? e.message : String(e));
        console.error("Erreur lors de la récupération des consultations :", e);
        return res.status(500).send("Erreur interne du serveur");
    }
}