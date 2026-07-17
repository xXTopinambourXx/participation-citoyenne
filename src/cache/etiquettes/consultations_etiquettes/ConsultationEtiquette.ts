import { ElementEnCacheBdd } from "../../base/ElementEnCacheBdd.js";

export interface ConsultationEtiquetteData {
    consultation_id: number;
    etiquette_id: number;
}

export class ConsultationEtiquette extends ElementEnCacheBdd<ConsultationEtiquetteData> {
    public consultationId: number;
    public etiquetteId: number;

    constructor(data: ConsultationEtiquetteData) {
        super();
        this.consultationId = data.consultation_id;
        this.etiquetteId = data.etiquette_id;
    }
    toData() {
        return {
            consultation_id: this.consultationId,
            etiquette_id: this.etiquetteId
        };
    }
}