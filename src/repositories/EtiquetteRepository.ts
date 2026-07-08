import { Database } from "../core/database/Database.js";
import type { Etiquette } from "../models/Etiquette.js";

export class EtiquetteRepository {

    public static async findByConsultation(
        consultationId: number
    ): Promise<Etiquette[]> {

        return Database.query<Etiquette>(
            `
            SELECT e.*
            FROM etiquette e
            INNER JOIN consultation_etiquette ce
                ON ce.etiquette_id = e.id
            WHERE ce.consultation_id = ?
            `,
            [consultationId]
        );
    }

}