import type { Request, Response } from "express";
import { ConsultationRepository } from "../repositories/ConsultationRepository.js";
import { EtiquetteRepository } from "../repositories/EtiquetteRepository.js";

export class ConsultationController {

    static async index(req: Request, res: Response) {

        const updatedConsultations = await ConsultationRepository.findAll();

        res.render("consultations", { consultations: updatedConsultations });
    }

    static async show(req: Request, res: Response) {

        const consultation = await ConsultationRepository.findById(
            Number(req.params.id)
        );

        if (!consultation) {
            res.status(404).send("Consultation not found");
            return;
        }

        consultation.etiquettes = await EtiquetteRepository.findByConsultation(
            consultation.id
        );

        res.render("consultation/show", { consultation });
    }

    static async create(req: Request, res: Response) {

        const consultation = req.body;

        await ConsultationRepository.create({
            titre: consultation.titre,
            contenu: consultation.contenu,
            statut: consultation.statut,
            budget: consultation.budget,
            nbParticipants: consultation.nbParticipants,
            date_creation: consultation.date_creation,
            date_debut: consultation.date_debut,
            date_fin: consultation.date_fin,
            utilisateur_id: consultation.utilisateur_id
        });

        res.redirect("/consultations");
    }

    static async update(req: Request, res: Response) {

        const {d_debut, d_fin} = req.body;

        await ConsultationRepository.updateDate(
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