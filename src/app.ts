import express from "express";
import path from "path";
import "dotenv/config";
import { indexRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import type { Request, Response } from "express";


const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* Variables locales pour le titre et le sous-titre */
app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.ville = "Paris";
  res.locals.sort = req.query.sort || "recentes";
  next();
});

app.use(authMiddleware); // Middleware pour charger la session utilisateur

app.use("/", indexRouter);

app.use((req: Request, res: Response) => {
    res.status(404).render("error", {
        error: "404",
        titre: "Page introuvable",
        message: `La page ${req.originalUrl} que vous recherchez n'existe pas. Veuillez vérifier l'URL ou revenir à la page d'accueil.`
    });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Accessible sur le réseau local via l'IP de ton PC.`);
});
