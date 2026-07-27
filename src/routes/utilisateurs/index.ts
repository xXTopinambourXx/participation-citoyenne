import { Router } from "express";
import { useRest } from "../useRest.js";
import { getUtilisateurs } from "./getUtilisateurs.js";
import { deleteUtilisateur } from "./deleteUtilisateur.js";
import { authRouteur } from "./auth/index.js";

const utilisateursRouter = Router();

utilisateursRouter.use("/auth", authRouteur);

// GET /utilisateurs/
utilisateursRouter.get("/", (req, res) =>
    useRest(getUtilisateurs, req, res));

// DELETE /utilisateurs/:id/
utilisateursRouter.delete("/:id", (req, res) =>
    useRest(() => deleteUtilisateur(req.params.id), req, res));

export { utilisateursRouter as utilisateursRouter };