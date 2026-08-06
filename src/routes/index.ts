import { Router } from "express";
import { utilisateursRouter } from "./utilisateurRouter.js";
import { consultationsRouter } from "./consultationsRouter.js";
import { accueilController } from "../controllers/accueilController.js";
import { adminRouter } from "./adminRouter.js";


const router = Router();

router.get("/", accueilController.getAccueil);

router.get("/aide", (req, res) => {
    return res.render("aide");
});

router.get("/cgu", (req, res) =>{
    return res.render("cgu");
});

router.use("/administrateur", adminRouter);
router.use("/consultations", consultationsRouter);
router.use("/utilisateurs", utilisateursRouter);


export { router as indexRouter };