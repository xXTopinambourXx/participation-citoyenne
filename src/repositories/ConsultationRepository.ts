import { Database } from "../core/database/Database.js";

export interface Consultation {
    id_consultation: number;
    titre: string;
    descr: string;
    statut: number;
    budget: number;
    date_creation: number;
    date_debut: number;
    date_fin: number;
    createur_consultation_id: number;
}

export class ConsultationRepository {

    public static async findAll(): Promise<Consultation[]> {
        return Database.query<Consultation>(
            "SELECT * FROM consultation ORDER BY date_creation DESC"
        );
    }

    public static async findById(id: number): Promise<Consultation | null> {

        const consultations = await Database.query<Consultation>(
            "SELECT * FROM consultation WHERE id_consultation = ?",
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
            (titre, descr, statut, budget, date_creation, date_debut, date_fin, createur_consultation_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
        consultation: Omit<Consultation, "id_consultation" | "titre" | "descr" | "statut" | "budget" | "date_creation" | "createur_consultation_id">
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