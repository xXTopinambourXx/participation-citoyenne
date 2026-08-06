import type { Request, Response } from "express";
import { consultationCache } from "../cache/consultations/ConsultationCache.js";
import { logError, logInfo } from "../utils/logger.js";
import { etiquetteCache } from "../cache/etiquettes/EtiquetteCache.js";
import type { Utilisateur } from "../cache/utilisateur/Utilisateur.js";

declare global {
    namespace Express {
        interface Request {
            user?: Utilisateur;
        }
    }
}

export class administrateurController {

    static async getAdmin(req: Request, res: Response): Promise<void> {
        try {
            const consultations = await consultationCache.getAll();
            return res.render("administrateur", { consultations });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logError("Erreur lors de la récupération des consultations pour l'administrateur :", message);
            console.error(error);
        }
    }

    static async getNewConsultation(req: Request, res: Response): Promise<void> {

        const etiquettes = await etiquetteCache.getAll();
        return res.render("administrateur/creer_consultation", { etiquettes });
    }

    static async createConsultation(req: Request, res: Response): Promise<void> {
        if (!req.user || req.user.estAdmin !== 1) {
            res.status(403).json({ error: "Accès refusé. Droits insuffisants." });
            return;
        }

        try {
            const { titre, contenu, dateDebut, dateFin, courverture, budget, etiquettes, choix } = req.body;

            const formattedContenu = JSON.stringify(contenu);

            const newConsultation = await consultationCache.insert({
                titre: titre,
                contenu: formattedContenu,
                date_creation: Math.floor(Date.now() / 1000),
                date_debut: dateDebut,
                date_fin: dateFin,
                statut: 1, // Statut initial à 1 (ouvert)
                couverture: courverture || null,
                budget: budget ? parseFloat(budget) : null,
                utilisateur_id: req.user.id
            });

            const newId = newConsultation.insertId;
            logInfo("Nouvelle consultation créée avec l'ID :", newId.toString());

            for (const etiquetteId of etiquettes) {
                await consultationCache.addEtiquetteToConsultation(newId, parseInt(etiquetteId, 10));
            }

            for (const choixData of choix) {
                await consultationCache.addChoixToConsultation(newId, choixData);
            }

            res.status(201).json({
                success: true,
                consultationId: newId
            });

        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logError("Erreur lors de la création de la consultation :", message);
            console.error(error);

            res.status(500).json({
                error: "Une erreur est survenue lors de la création de la consultation.",
                details: message
            });
        }
    }
}