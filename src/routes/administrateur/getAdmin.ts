import type { Request, Response } from "express";
import { consultationCache } from "../../cache/consultations/ConsultationCache.js";
import { logError } from "../../utils/logger.js";

export async function getAdmin(req: Request, res: Response): Promise<void> {
    try {
        const consultations = await consultationCache.getAll();
        return res.render("administrateur", { consultations });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logError("Erreur lors de la récupération des consultations pour l'administrateur :", message);
        console.error(error);
    }
}