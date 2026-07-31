import type { Request, Response, NextFunction } from 'express';
import type { Utilisateur } from '../cache/utilisateur/Utilisateur.js';

declare global {
    namespace Express {
        interface Request {
            user?: Utilisateur;
        }
    }
}

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.redirect('/?connexion=requise');
    }

    if (req.user.estAdmin !== 1) {
        return res.status(403).render("error", {
            error: "403",
            titre: "Accès refusé",
            message: "Seuls les administrateurs ont l'autorisation d'accéder à cette page."
        });
    }

    next();
}