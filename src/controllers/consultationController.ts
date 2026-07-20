import type { Request, Response } from "express";
import { logError } from "../utils/logger.js";
import { consultationCache } from "../cache/consultations/ConsultationCache.js";
import { etiquetteCache } from "../cache/etiquettes/EtiquetteCache.js";

export class ConsultationController {

    static async index(req: Request, res: Response) {
        try {
            const consultations = await consultationCache.getAll();
            res.render("consultations", { consultations });
        } catch (e) {
            logError("Erreur lors de la récupération des consultations :", e instanceof Error ? e.message : String(e));
            console.error("Erreur lors de la récupération des consultations :", e);
            res.status(500).send("Erreur interne du serveur");
        }
    }

    static async show(req: Request, res: Response) {
        const id = Number(req.params.id);
        if(isNaN(id)) {
            res.status(400).send("Invalid consultation ID");
            return;
        }

        try {
            const consultation = consultationCache.get(id);
            if (!consultation) {
                res.status(404).send("Consultation not found");
                return;
            }
            console.log("Consultation found:", consultation);
            res.render("consultation/show", { consultation });
        } catch (e) {
            logError("Erreur lors de la récupération de la consultation :", e instanceof Error ? e.message : String(e));
            console.error(e);
            res.status(500).send("Erreur interne du serveur");
        }
    }

    static async create(req: Request, res: Response) {
        try {
            consultationCache.insert(req.body);
            res.redirect("/consultations");
        } catch (e) {
            logError("Erreur lors de la création de la consultation :", e instanceof Error ? e.message : String(e));
            console.error("Erreur lors de la création de la consultation :", e);
            res.status(400).send("Erreur lors de la création");
        }
    }

    static async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).send("ID invalide");

        try {
            await consultationCache.update(id, req.body);
            res.redirect(`/consultations/${id}`);
        } catch (error) {
            logError("Erreur lors de la mise à jour de la consultation :", error instanceof Error ? error.message : String(error));
            console.error("Erreur lors de la mise à jour de la consultation :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    }

    static async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).send("ID invalide");

        try {
            await consultationCache.delete(id);
            res.redirect("/consultations");
        } catch (error) {
            logError("Erreur lors de la suppression de la consultation :", error instanceof Error ? error.message : String(error));
            console.error("Erreur lors de la suppression de la consultation :", error);
            res.status(500).send("Erreur interne du serveur");
        }
    }
}