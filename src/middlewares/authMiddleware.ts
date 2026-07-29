import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { utilisateurCache } from "../cache/utilisateur/UtilisateurCache.js";
import type { Utilisateur } from "../cache/utilisateur/Utilisateur.js";

declare global {
    namespace Express {
        interface Request {
            user?: Utilisateur;
        }
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.jeton_auth;

        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

            if (decoded && decoded.sub) {
                const user = await utilisateurCache.getOrFetch(Number(decoded.sub));

                if (user) {
                    req.user = user;
                    res.locals.user = user;
                }
            }
        } else {
            res.locals.user = null;
        }

    } catch (error) {
        console.error("Erreur lors de l'authentification :", error);
        res.locals.user = null;
    }

    next();
}