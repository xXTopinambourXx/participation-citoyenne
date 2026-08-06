import { Router } from "express";
import { utilisateurController } from "../controllers/utilisateurController.js";
import { authRouteur } from "./authRouter.js";

const utilisateursRouter = Router();

utilisateursRouter.use("/auth", authRouteur);

// GET /utilisateurs/
utilisateursRouter.get("/", (req, res) =>
    utilisateurController.getUtilisateurs(req, res)
);

// GET /utilisateurs/check-email?email=exemple@paris.fr
utilisateursRouter.get("/check-email", (req, res) =>
    utilisateurController.checkEmailExiste(req, res)
);

// DELETE /utilisateurs/:id/
utilisateursRouter.delete("/:id", (req, res) =>
   utilisateurController.deleteUtilisateur(req.params.id)
);

export { utilisateursRouter as utilisateursRouter };