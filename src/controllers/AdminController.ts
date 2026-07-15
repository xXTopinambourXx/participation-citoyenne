import type { Request, Response } from "express";
import { ConsultationCache } from "../cache/consultations/ConsultationCache.js";

export class AdminController {

    private static cacheConsultation = new ConsultationCache();

    static async index(req: Request, res: Response) {
        try {
            const consultations = this.cacheConsultation.getAll();
            res.render("admin/index", { consultations });
        } catch (e) {
            console.error("Erreur lors de la récupération des consultations :", e);
            res.status(500).send("Erreur interne du serveur");
        }
    }
}