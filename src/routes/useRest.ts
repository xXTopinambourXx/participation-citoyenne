import type { Request, Response } from "express";
import { ErreurAccesRefuse, ErreurNonAuthentifie, ErreurRequeteInvalide, ErreurServeur } from "./erreursApi.js";
import { ErreurBase } from "../core/ErreurBase.js";

/**
 * Gérer les erreurs des requêtes REST.
 * @param error L'erreur à gérer.
 * @param res La réponse Express.
 */
export function handleRestError(error: unknown, res: Response) {
    if (res.headersSent) {
        console.error("L'erreur est survenue après l'envoi de la réponse :", error);
        return;
    }

     if (error instanceof ErreurRequeteInvalide) {
        res.status(400).send(error.message ?? "Requête invalide ou mal formée");
    } else if (error instanceof ErreurNonAuthentifie) {
        res.status(401).send("Non authentifié");
    } else if (error instanceof ErreurAccesRefuse) {
        res.status(403).send(error.message ?? "Accès refusé");
    } else if (error instanceof ErreurServeur) {
        res.status(500).send(error.message ?? "Erreur serveur inconnue.");
    } else if (error instanceof ErreurBase) {
        res.status(500).send((error.name ?? "Erreur inconnue") + " : " + error.message);
    } else {
        console.error(error);
        res.status(500).send("Erreur serveur inconnue.");
    }
}