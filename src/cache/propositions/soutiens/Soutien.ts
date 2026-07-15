import { ElementEnCacheBdd } from "../../base/ElementEnCacheBdd.js";

export interface SoutienData {
    date_soutien: number;
    proposition_id: number;
    utilisateur_id: number;
}

export class Soutien extends ElementEnCacheBdd<SoutienData> {
    public dateSoutien: number;
    public propositionId: number;
    public utilisateurId: number;

    constructor(data: SoutienData) {
        super();
        this.dateSoutien = data.date_soutien;
        this.propositionId = data.proposition_id;
        this.utilisateurId = data.utilisateur_id;
    }

    toData(): SoutienData {
        return {
            date_soutien: this.dateSoutien,
            proposition_id: this.propositionId,
            utilisateur_id: this.utilisateurId
        };
    }
}