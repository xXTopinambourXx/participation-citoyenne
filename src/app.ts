import express from "express";
import path from "path";
import "dotenv/config";
import { consultations } from "./data/consultation.js";
import consultationRoutes from "./routes/consultationRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use("/public", express.static("public"));

/* Variables locales pour le titre et le sous-titre */
app.use((req, res, next) => {
  res.locals.title = "Participation Citoyenne";
  res.locals.subtitle = "De la ville de Paris";
  next();
});

app.get("/", (_req, res) => {
  res.render("accueil");
});

app.use("/consultations", consultationRoutes);

app.get("/aide", (_req, res) => {
  res.render("aide");
});

app.get("/admin", (_req, res) => {
  res.render("administrateur", { consultations });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});