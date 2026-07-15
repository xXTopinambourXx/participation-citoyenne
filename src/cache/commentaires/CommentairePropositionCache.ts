import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";
import { Commentaire, type CommentaireData } from "./Commentaire.js";

export class CommentairePropositionCache extends DatabaseCacheBase<number, Commentaire, CommentaireData> {
    nomTable = "commentaire";
    colonnesClePrimaire = ["id"];

    /**
     * Instancie un cache de commentaires pour une proposition spécifique.
     * @param propositionId L'identifiant de la proposition pour laquelle le cache de commentaires est créé.
     */
    constructor(propositionId: number) {
        super([propositionId]);
    }

    fromDatabase(data: CommentaireData): Commentaire {
        return new Commentaire(data);
    }

    getComposanteCache(element: Commentaire): number {
        return element.id;
    }
}