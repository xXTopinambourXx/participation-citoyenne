import { Consultation, type ConsultationData } from "./Consultation.js";
import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";
import { etiquetteCache } from "../etiquettes/EtiquetteCache.js";
import { ChoixVote, type ChoixVoteData } from "./ChoixVote.js";
import { Database } from "../../core/database/Database.js";

export class ConsultationCache extends DatabaseCacheBase<number, Consultation, ConsultationData> {
    nomTable = "consultation";
    colonnesClePrimaire = ["id"];

    private consultationsOrdredByDate: Consultation[] = [];

    fromDatabase(data: ConsultationData): Consultation {
        return new Consultation({
            ...data,
            choix: [], // Les choix seront récupérés séparément
        });
    }

    getComposanteCache(element: Consultation): number {
        return element.id;
    }

    override async getAll(clause?: string, force = false): Promise<Consultation[]> {
        if (this.tousRecuperes && !force) {
            return this.consultationsOrdredByDate;
        }

        const consultations = await super.getAll(clause, force);

        await Promise.all(consultations.map(async (consultation) => {

            // A. On récupère les choix de vote liés à CETTE consultation
            // On utilise 'ordre' pour que l'affichage respecte ce qui est prévu en BDD
            const choixDonnees = await Database.query<ChoixVoteData>(
                `SELECT cv.id, cv.nom, cv.couleur, COUNT(utilisateur_id) as nb_votes 
                FROM choix_vote cv
                LEFT JOIN vote v ON v.choix_vote_id = cv.id
                WHERE cv.consultation_id = ?
                GROUP BY cv.id
                ORDER BY cv.ordre ASC`,
                [consultation.id]
            );

            // B. On les injecte directement dans l'instance (le constructeur ou la propriété)
            consultation.choix = choixDonnees.map(c => new ChoixVote(c));

            // Récupérer les étiquettes pour chaque consultation
            await consultation.etiquettes.getAll();

            // Récupérer les votes pour chaque consultation
            await consultation.votes.getAll();
        }));
        this.consultationsOrdredByDate = consultations.sort((a, b) => a.dateDebut - b.dateDebut);
        
        return this.consultationsOrdredByDate;

    }

}

export const consultationCache = new ConsultationCache();

