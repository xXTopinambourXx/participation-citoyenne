import { Consultation, type ConsultationData } from "./Consultation.js";
import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";
import { etiquetteCache } from "../etiquettes/EtiquetteCache.js";

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
        this.consultationsOrdredByDate = consultations.sort((a, b) => a.dateDebut - b.dateDebut);
        
        return this.consultationsOrdredByDate;

    }

}

export const consultationCache = new ConsultationCache();

