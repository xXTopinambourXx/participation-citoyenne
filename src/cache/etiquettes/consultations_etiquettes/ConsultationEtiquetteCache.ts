import { DatabaseCacheBase } from "../../base/DatabaseCacheBase.js";
import { ConsultationEtiquette, type ConsultationEtiquetteData } from "./ConsultationEtiquette.js";

export class ConsultationEtiquetteCache extends DatabaseCacheBase<number, ConsultationEtiquette, ConsultationEtiquetteData> {
    nomTable = "consultation_etiquette";
    colonnesClePrimaire = ["consultation_id", "etiquette_id"];

    constructor(consultationId: number) {
        super([consultationId]);
    }

    fromDatabase(data: ConsultationEtiquetteData): ConsultationEtiquette {
        return new ConsultationEtiquette(data);
    }

    getComposanteCache(element: ConsultationEtiquette): number {
        return element.etiquetteId;
    }
}