import type { Request, Response } from "express";
import { Utilisateur, type UtilisateurData } from "../../../cache/utilisateur/Utilisateur.js";
import { Database } from "../../../core/database/Database.js";
import bcrypt from 'bcrypt';
import { logError } from "../../../utils/logger.js";
import { utilisateurCache } from "../../../cache/utilisateur/UtilisateurCache.js";

export async function postLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
        res.status(400).send("Email et mot de passe requis.");
        return;
    }

    const resUtilisateur = await Database.query<UtilisateurData>("SELECT * FROM utilisateur WHERE email = ? LIMIT 1", [email]);
    if (resUtilisateur.length === 0 || resUtilisateur[0] === undefined) {
        res.status(401).send("Identifiants incorrects.");
        return;
    }

    const utilisateurBrut = resUtilisateur[0];

    const estCorrect = await new Promise<boolean>((resolve) => {
        bcrypt.compare(password, utilisateurBrut.mot_de_passe.toString(), (err, result) => {
            if(err){
                logError("Login", "Erreur lors de la comparaison des mots de passe de l'utilisateur.");
                console.error(err);
                resolve(false);
            }
            console.log("Résultat de la comparaison des mots de passe :", result);
            resolve(result);
        });
    });

    if(!estCorrect){
        res.json({success: false, message: "Le mot de passe fourni n'est pas correct"});
        return;
    }

    const utilisateur = new Utilisateur(utilisateurBrut);
    utilisateurCache.set(utilisateurBrut.id, utilisateur);

    res.json({success: true});

}