import { Database } from "../core/database/Database.js";
import type { Consultation } from "../models/Consultation.js";

export class ConsultationRepository {

    public static async findAll(): Promise<Consultation[]> {
        return Database.query<Consultation>(`
            SELECT
                c.*,
                COUNT(v.id_vote) AS nbParticipants
            FROM consultation c
            LEFT JOIN vote v
                ON v.consultation_id = c.id_consultation
            GROUP BY c.id_consultation
        `);
    }

    public static async findById(id: number): Promise<Consultation | null> {

        const consultations = await Database.query<Consultation>(
            `
            SELECT
                c.*,
                COUNT(v.id_vote) AS nbParticipants
            FROM consultation c
            LEFT JOIN vote v
                ON v.consultation_id = c.id_consultation
            WHERE c.id_consultation = ?
            GROUP BY c.id_consultation
            `,
            [id]
        );

        return consultations[0] ?? null;
    }

    public static async create(
        consultation: Omit<Consultation, "id_consultation">
    ) {

        return Database.execute(
            `
            INSERT INTO consultation
            (titre, descr, budget, date_creation, date_debut, date_fin, createur_consultation_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                consultation.titre,
                consultation.descr,
                consultation.budget,
                consultation.date_creation,
                consultation.date_debut,
                consultation.date_fin,
                consultation.createur_consultation_id
            ]
        );
    }

    public static async update(
        id: number,
        consultation: Omit<Consultation, "id_consultation" | "titre" | "descr" | "statut" | "nbParticipants" | "budget" | "date_creation" | "createur_consultation_id">
    ) {

        return Database.execute(
            `
            UPDATE consultation
            SET date_debut = ?, date_fin = ?
            WHERE id_consultation = ?
            `,
            [
                consultation.date_debut,
                consultation.date_fin,
                id
            ]
        );
    }

    public static async delete(id: number) {

        return Database.execute(
            "DELETE FROM consultation WHERE id_consultation = ?",
            [id]
        );
    }
}