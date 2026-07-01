import type { Request, Response } from "express";
import { ConsultationRepository } from "../repositories/ConsultationRepository.js";

export class AdminController {
    static async index(req: Request, res: Response) {

        const consultations = await ConsultationRepository.findAll();
        res.render("administrateur", { consultations });
    }
}