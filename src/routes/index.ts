import { Router } from "express";
import { utilisateursRouter } from "./utilisateurController.js";
import { consultationsRouter } from "./consultationsRouter.js";
import { accueilController } from "../controllers/accueilController.js";
import { administrateurController } from "../controllers/administrateurController.js";


const router = Router();

router.get("/", accueilController.getAccueil);
router.get("/administrateur", administrateurController.getAdmin);

router.get("/aide", (req, res) => {
    return res.render("aide");
});

router.get("/cgu", (req, res) =>{
    return res.render("cgu");
});

router.use("/consultations", consultationsRouter);
router.use("/utilisateurs", utilisateursRouter);


export { router as indexRouter };