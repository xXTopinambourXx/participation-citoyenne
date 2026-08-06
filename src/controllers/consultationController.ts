import type { Request, Response } from "express";
import { consultationCache } from "../cache/consultations/ConsultationCache.js";
import { logError } from "../utils/logger.js";
import type { Utilisateur } from "../cache/utilisateur/Utilisateur.js";

declare global {
    namespace Express {
        interface Request {
            user?: Utilisateur;
        }
    }
}

export class consultationController {
    
    static async getConsultation(req: Request, res: Response): Promise<void> {
        const user = req.user;
        const id = Number(req.params.id);
    
        if (isNaN(id)) {
            res.status(400).send("ID de consultation invalide.");
            return;
        }
    
        try {
            const consultation = consultationCache.get(id);
    
            if (!consultation) {
                return res.status(404).render("error", {
                    error: "404",
                    titre: "Consultation non trouvée",
                    message: "La consultation que vous recherchez n'existe pas."
                });
            }

            if(consultation.statut === 0 || consultation.statut === 4) {
                if(!user){
                    return res.redirect('/?connexion=requise');
                } else if(user.estAdmin !== 1) {
                    return res.status(403).render("error", {
                        error: "403",
                        titre: "Accès refusé",
                        message: "Cette consultation n'est pas encore ouverte ou est archivée."
                    });
                }
            }

            await consultation.commentaires.fetchMore(10);
    
            res.render("consultation/show", { consultation });
            return;
    
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logError("Erreur lors de la récupération de la consultation :", message);
            console.error(error);
    
            res.status(500).send("Erreur interne du serveur.");
            return;
        }
    }

    static async getConsultations(req: Request, res: Response): Promise<void> {
        try {
            const consultations = await consultationCache.getAll();
            res.render("consultations", { consultations });
            return;
        } catch (e) {
            logError("Erreur lors de la récupération des consultations :", e instanceof Error ? e.message : String(e));
            console.error("Erreur lors de la récupération des consultations :", e);
            res.status(500).send("Erreur interne du serveur");
            return;
        }
    }
}