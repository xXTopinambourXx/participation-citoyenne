import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { utilisateurCache } from "../../../cache/utilisateur/UtilisateurCache.js";
import { logInfo } from "../../../utils/logger.js";

export async function postCreerUtilisateur(req: Request, res: Response): Promise<void> {
    const nouvelUtilisateur = req.body as { nom: string; prenom: string; email: string; motDePasse: string; };

    try {

        // Hacher le mot de passe
        const hash = await bcrypt.hash(nouvelUtilisateur.motDePasse, 10);

        // Rôle administrateur pour le premier utilisateur créé, sinon rôle utilisateur standard
        const estPremierSetup = await utilisateurCache.isAucunUtilisateurEnregistre();
        const utilisateurAdmin = estPremierSetup ? 1 : 0;

        // Insertion de l'utilisateur dans la base de données
        const insertionUtilisateur = await utilisateurCache.insert({
            nom: nouvelUtilisateur.nom,
            prenom: nouvelUtilisateur.prenom,
            email: nouvelUtilisateur.email,
            mot_de_passe: hash,
            est_admin: utilisateurAdmin
        });

        logInfo("Inscription", `Nouvel utilisateur créé avec l'ID : ${insertionUtilisateur.insertId} et l'email : ${nouvelUtilisateur.email}`);

        utilisateurCache['aucunUtilisateurEnregistre'] = false; 
    
        res.json({ success: true, message: "Utilisateur créé avec succès." });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Erreur lors de la création de l'utilisateur :", message);
        res.status(500).json({ success: false, message: "Erreur interne lors de la création de l'utilisateur." });
    }

}
