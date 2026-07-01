import type { Request, Response } from "express";
import { ConsultationRepository } from "../repositories/ConsultationRepository.js";

export class ConsultationController {

    static async index(req: Request, res: Response) {

        const consultations = await ConsultationRepository.findAll();

        res.render("consultations", { consultations });
    }

    static async show(req: Request, res: Response) {

        const consultation = await ConsultationRepository.findById(
            Number(req.params.id)
        );

        res.render("consultation", { consultation });
    }

    static async create(req: Request, res: Response) {

        const consultation = req.body;

        await ConsultationRepository.create({
            titre: consultation.titre,
            descr: consultation.descr,
            statut: consultation.statut,
            budget: consultation.budget,
            date_creation: consultation.date_creation,
            date_debut: consultation.date_debut,
            date_fin: consultation.date_fin,
            createur_consultation_id: consultation.createur_consultation_id
        });

        res.redirect("/consultations");
    }

    static async update(req: Request, res: Response) {

        const {d_debut, d_fin} = req.body;

        await ConsultationRepository.update(
            Number(req.params.id),
            {
                date_debut: d_debut,
                date_fin: d_fin
            }
        );
        res.redirect("/consultations");
    }

    static async delete(req: Request, res: Response) {

        await ConsultationRepository.delete(Number(req.params.id));

        res.redirect("/consultations");
    }
}