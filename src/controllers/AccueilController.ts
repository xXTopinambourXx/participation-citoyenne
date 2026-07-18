import type { Request, Response } from "express";
import { consultationCache } from "../cache/consultations/ConsultationCache.js";

export class AccueilController {

    static async index(req: Request, res: Response) {
        try {
            const consultations = await consultationCache.getAll();
            res.render("accueil", { consultations });
        } catch (e) {
            console.error("Erreur lors de la récupération des consultations :", e);
            res.status(500).send("Erreur interne du serveur");
        }
    }
}