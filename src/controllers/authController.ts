import { Database } from "../core/database/Database.js";
import { Utilisateur, type UtilisateurData } from "../cache/utilisateur/Utilisateur.js";
import { utilisateurCache } from "../cache/utilisateur/UtilisateurCache.js";
import { logInfo, logError } from "../utils/logger.js";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { generateJwtToken } from "../utils/jwt.js";


export class authController {
    static async postCreerUtilisateur(req: Request, res: Response): Promise<void> {
        const nouvelUtilisateur = req.body as Omit<Utilisateur, "id">;
        
        try {
    
            // Hacher le mot de passe
            const hash = await bcrypt.hash(nouvelUtilisateur.motDePasse, 10);
    
            // Rôle administrateur pour le premier utilisateur créé, sinon rôle utilisateur standard
            const estPremierSetup = await utilisateurCache.isAucunUtilisateurEnregistre();
    
            // Insertion de l'utilisateur dans la base de données
            const insertionUtilisateur = await utilisateurCache.insert({
                nom: nouvelUtilisateur.nom,
                prenom: nouvelUtilisateur.prenom,
                email: nouvelUtilisateur.email,
                mot_de_passe: hash,
                est_admin: estPremierSetup ? 1 : 0
            });

            const id = insertionUtilisateur.insertId;
            const jetonAuth = generateJwtToken(id);
            setJetonAuthentication(res, jetonAuth);
    
            logInfo("Inscription", `Nouvel utilisateur créé avec l'ID : ${insertionUtilisateur.insertId} et l'email : ${nouvelUtilisateur.email}`);
    
            utilisateurCache['aucunUtilisateurEnregistre'] = false; 
        
            res.status(201).json({ success: true, message: "Utilisateur créé avec succès."});
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("Erreur lors de la création de l'utilisateur :", message);
            res.status(500).json({ success: false, message: message});
        }
    }

    static async postLoginUtilisateur(req: Request, res: Response): Promise<void> {
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
            res.json({success: false, message: "Le mot de passe et/ou l'email est incorrect."});
            return;
        }
    
        const utilisateur = new Utilisateur(utilisateurBrut);
        utilisateurCache.set(utilisateurBrut.id, utilisateur);

        const jeton = generateJwtToken(utilisateurBrut.id);
        setJetonAuthentication(res, jeton);

        logInfo("Connexion", `Utilisateur connecté avec l'ID : ${utilisateurBrut.id} et l'email : ${utilisateurBrut.email}`);
    
        res.json({success: true});
    }
}

export function setJetonAuthentication(res: Response, jeton: string): void{
    res.cookie("jeton_auth", jeton, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 16 * 60 * 60 * 1000 // 16 heures
    });
}