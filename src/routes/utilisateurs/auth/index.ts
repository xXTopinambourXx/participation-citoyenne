import { Router } from "express";
import { postLogin } from "./postLogin.js";
import { useFullRest, useRest } from "../../useRest.js";
import { postCreerUtilisateur } from "./postCreerUtilisateur.js";

const authRouteur = Router();

// POST /utilisateurs/auth/login
authRouteur.post("/login", (req, res) => useFullRest(() => postLogin(req, res), req, res));
// POST /utilisateurs/auth/creer
authRouteur.post("/creer", (req, res) => useFullRest(() => postCreerUtilisateur(req, res), req, res));

export { authRouteur as authRouteur };