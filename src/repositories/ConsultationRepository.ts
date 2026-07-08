import { Database } from "../core/database/Database.js";
import type { Consultation } from "../models/Consultation.js";

export class ConsultationRepository {

    public static async findAll(): Promise<Consultation[]> {
        return Database.query<Consultation>(`
            SELECT
                c.*,
                COUNT(v.utilisateur_id) AS nbParticipants
            FROM consultation c
            LEFT JOIN vote v
                ON v.consultation_id = c.id
            GROUP BY c.id
        `);
    }

    public static async findById(id: number): Promise<Consultation | null> {

        const consultations = await Database.query<Consultation>(
            `
            SELECT
                c.*,
                COUNT(v.utilisateur_id) AS nbParticipants
            FROM consultation c
            LEFT JOIN vote v
                ON v.consultation_id = c.id
            WHERE c.id = ?
            GROUP BY c.id
            `,
            [id]
        );

        return consultations[0] ?? null;
    }

    public static async create(
        consultation: Omit<Consultation, "id">
    ) {

        return Database.execute(
            `
            INSERT INTO consultation
            (titre, contenu, budget, couverture, statut, date_creation, date_debut, date_fin, utilisateur_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                consultation.titre,
                consultation.contenu,
                consultation.budget,
                consultation.couverture ?? null,
                consultation.statut ?? 0, // Utilise la valeur par défaut du schéma (brouillon)
                consultation.date_creation,
                consultation.date_debut,
                consultation.date_fin,
                consultation.utilisateur_id
            ]
        );
    }

    public static async updateDate(
        id: number,
        consultation: Omit<Consultation, "id" | "titre" | "contenu" | "statut" | "nbParticipants" | "budget" | "couverture" | "date_creation" | "utilisateur_id">
    ) {

        return Database.execute(
            `
            UPDATE consultation
            SET date_debut = ?, date_fin = ?
            WHERE id = ?
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
            "DELETE FROM consultation WHERE id = ?",
            [id]
        );
    }

    public static async updateStatut(id: number, statut: number) {
        return Database.execute(`
            UPDATE consultation
            SET statut = ?
            WHERE id = ?
        `, [statut, id]);
    }
}