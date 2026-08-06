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
        return new Consultation(data);
    }

    getComposanteCache(element: Consultation): number {
        return element.id;
    }

    override async getAll(clause?: string, force = false): Promise<Consultation[]> {
        if (this.tousRecuperes && !force) {
            return this.consultationsOrdredByDate;
        }

        const consultations = await super.getAll(clause, force);

        // getAll equitettes 
        const etiquettes = await etiquetteCache.getAll();

        // SELECT idEtiq associations etiquettes, for each pour les assigner a leurs consultations
        // .query(SELECT *) -> consultation.etiquettes.push(INSTANCE -> cacheEtiquettes.get(idEtiq))
        const etiquetteAssociations = await Database.query<
            {etiquette_id: number, consultation_id: number}
        >("SELECT * FROM consultation_etiquette");

        for(const etiquetteAssociation of etiquetteAssociations){
            const consult = consultationCache.get(etiquetteAssociation.consultation_id);
            const etiq = etiquetteCache.get(etiquetteAssociation.etiquette_id);
            if (consult && etiq) consult.etiquettes.push(etiq);
        }
        
        // idem choixVotes -> new ChoixVote(..data..)
        const choixVotes = await Database.query<ChoixVoteData & {consultation_id: number}>("SELECT * FROM choix_vote");

        for(const choixVote of choixVotes){
            const consult = consultationCache.get(choixVote.consultation_id);
            const choix = new ChoixVote(choixVote);
            if(consult) consult.choix.push(choix);
        }
        

        this.consultationsOrdredByDate = consultations.sort((a, b) => a.dateDebut - b.dateDebut);
        
        return this.consultationsOrdredByDate;

    }

    async getDernieres(n: number): Promise<Consultation[]> {
        if(n <= 0) return [];

        return this.consultationsOrdredByDate.slice(-n-1).reverse();
    }

    async addEtiquetteToConsultation(consultationId: number, etiquetteId: number): Promise<void> {
        await Database.query(
            "INSERT INTO consultation_etiquette (consultation_id, etiquette_id) VALUES (?, ?)",
            [consultationId, etiquetteId]
        );

        let consultation = this.get(consultationId);
        const etiquette = etiquetteCache.get(etiquetteId);

        if (consultation && etiquette) {
            // Évite les doublons dans la liste locale si déjà présente
            if (!consultation.etiquettes.some(e => e.id === etiquette.id)) {
                consultation.etiquettes.push(etiquette);
            }
        }
    }

    async addChoixToConsultation(consultationId: number, choixData: ChoixVoteData): Promise<ChoixVote> {
        const nbVotes = choixData.nb_votes ?? (choixData as ChoixVoteData).nb_votes ?? 0;
        const ordre = choixData.ordre ?? 0;

        await Database.query(
            "INSERT INTO choix_vote (nom, couleur, ordre, nb_votes, consultation_id) VALUES (?, ?, ?, ?, ?)",
            [choixData.nom, choixData.couleur, ordre, nbVotes, consultationId]
        );

        const choix = new ChoixVote({ 
            id: choixData.id, 
            nom: choixData.nom,
            couleur: choixData.couleur,
            ordre: ordre,
            nb_votes: nbVotes
        });

        const consultation = this.get(consultationId);
        if (consultation) {
            if (!consultation.choix) {
                consultation.choix = [];
            }
            consultation.choix.push(choix);
        }

        return choix;
    }

}

export const consultationCache = new ConsultationCache();

