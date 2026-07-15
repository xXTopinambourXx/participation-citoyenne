import { DatabaseCacheBase } from "../../base/DatabaseCacheBase.js";
import { Soutien, type SoutienData } from "./Soutien.js";

export class SoutienCache extends DatabaseCacheBase<number, Soutien, SoutienData> {
    nomTable = "soutien";
    colonnesClePrimaire = ["proposition_id", "utilisateur_id"];

    /**
     * Instancie un nouveau cache de soutiens pour une proposition donnée.
     * @param propositionId L'identifiant de la proposition pour laquelle le cache de soutiens est créé. 
     */
    constructor(propositionId: number) {
        super([propositionId]);
    }

    fromDatabase(data: SoutienData): Soutien {
        return new Soutien(data);
    }

    getComposanteCache(element: Soutien): number {
        return element.utilisateurId;
    }
}