import { Router } from "express";
import { authController } from "../controllers/authController.js";

const authRouteur = Router();

// POST /utilisateurs/auth/login
// pass the controller methods as route handlers (do not call them here)
authRouteur.post("/login", (req, res) => authController.postLoginUtilisateur(req, res));
// POST /utilisateurs/auth/creer
authRouteur.post("/creer", (req, res) => authController.postCreerUtilisateur(req, res));

// GET /utilisateurs/auth/logout
authRouteur.get("/logout", (req, res) => {
    res.clearCookie("jeton_auth");
    res.redirect("/");
});

export { authRouteur as authRouteur };