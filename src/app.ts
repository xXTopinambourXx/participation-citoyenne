import express from "express";
import path from "path";
import "dotenv/config";
import consultationRoutes from "./routes/consultationRoutes.js";
import adminRoute from "./routes/adminRoute.js";
import accueilRoute from "./routes/accueilRoute.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use("/public", express.static("public"));

/* Variables locales pour le titre et le sous-titre */
app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.ville = "Paris";
  res.locals.sort = req.query.sort || "recentes";
  next();
});

app.use("/", accueilRoute);

app.use("/consultations", consultationRoutes);

app.use("/admin", adminRoute);

app.get("/aide", (_req, res) => {
  res.render("aide");
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});