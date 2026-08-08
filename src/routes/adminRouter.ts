import { Router } from "express";
import { administrateurController } from "../controllers/administrateurController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import path from "path";
import multer from "multer";
import fs from "fs";

const adminRouter = Router();

const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), 'public/uploads/temp');
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `temp-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const uploadTemp = multer({ storage: tempStorage });

// Route d'upload générique temporaire
adminRouter.post('/upload-image-temp', adminMiddleware, uploadTemp.single('image'), administrateurController.uploadImageTemp);

// GET /administrateur/
adminRouter.get("/", adminMiddleware, administrateurController.getAdmin);

// GET /administrateur/consultations/new
adminRouter.get("/consultations/new", adminMiddleware, administrateurController.getNewConsultation);

// POST /administrateur/consultations
adminRouter.post("/consultations", adminMiddleware, administrateurController.createConsultation);

export { adminRouter as adminRouter };