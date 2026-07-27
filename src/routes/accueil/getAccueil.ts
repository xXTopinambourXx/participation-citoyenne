import type { Request, Response } from "express";
import { consultationCache } from "../../cache/consultations/ConsultationCache.js";
import { logError } from "../../utils/logger.js";

export async function getAccueil(req: Request, res: Response): Promise<void> {
    try {
        // On récupère les 3 dernières consultations depuis le cache
        const dernieresConsultations = await consultationCache.getDernieres(3);

        return res.render("accueil", { consultations: dernieresConsultations });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logError("Erreur lors du chargement de la page d'accueil :", message);
        
        res.status(500).render("accueil", { consultations: [], error: "Impossible de charger les consultations." });
        return;
    }
}