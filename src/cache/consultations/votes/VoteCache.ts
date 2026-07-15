import { DatabaseCacheBase } from "../../base/DatabaseCacheBase.js";
import { Vote, type VoteData } from "./Vote.js";

export class VoteCache extends DatabaseCacheBase<number, Vote, VoteData> {

    nomTable = "vote";
    colonnesClePrimaire = ["consultation_id", "utilisateur_id"];

    /**
     * Instancie un nouveau cache de votes pour une consultation donnée.
     * @param consultationId L'identifiant de la consultation pour laquelle le cache de votes est créé.
     */
    constructor(consultationId: number) {
        super([consultationId]);
    }

    fromDatabase(data: VoteData): Vote {
        return new Vote(data);
    }

    getComposanteCache(element: Vote): number {
        return element.utilisateurId;
    }
}