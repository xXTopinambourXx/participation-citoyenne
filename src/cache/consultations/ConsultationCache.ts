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

}

export const consultationCache = new ConsultationCache();

