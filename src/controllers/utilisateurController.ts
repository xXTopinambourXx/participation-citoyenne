import type { Request, Response } from "express";
import { Utilisateur } from "../cache/utilisateur/Utilisateur.js";
import { utilisateurCache } from "../cache/utilisateur/UtilisateurCache.js";

export class utilisateurController {

    static async getUtilisateurs(req: Request, res: Response): Promise<Utilisateur[]> {
        const utilisateurs = await utilisateurCache.getAll();
        
        if (utilisateurs === undefined) {
            throw new Error("La liste des utilisateurs n'a pas pu être renvoyées.");
        }
    
        return utilisateurs;
    }

    static async deleteUtilisateur(id: string): Promise<{ success: boolean }> {
        const idUtilisateur = parseInt(id);

        if (isNaN(idUtilisateur)) {
            throw new Error("L'identifiant de l'utilisateur est invalide.");
        }

        try {
            await utilisateurCache.delete(idUtilisateur);
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("Erreur lors de la suppression de l'utilisateur :", message);
            throw new Error("Erreur interne lors de la suppression de l'utilisateur.");
        }
    }

    static async checkEmailExiste(req: Request, res: Response) {
        const email = req.query.email as string;

        if (!email) {
            return res.status(400).json({ error: "Email manquant" });
        }

        const existe = await utilisateurCache.emailExiste(email);
        return res.json({ existe });
    }
}