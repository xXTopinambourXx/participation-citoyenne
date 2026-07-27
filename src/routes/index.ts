import { Router } from "express";
import { utilisateursRouter } from "./utilisateurs/index.js";
import { consultationsRouter } from "./consultations/index.js";
import { getAccueil } from "./accueil/getAccueil.js";
import { getAdmin } from "./administrateur/getAdmin.js";


const router = Router();

router.get("/", getAccueil);
router.get("/aide", (req, res) => {
    return res.render("aide");
});
router.get("/administrateur", getAdmin);
router.use("/consultations", consultationsRouter);
router.use("/utilisateurs", utilisateursRouter);


export { router as indexRouter };