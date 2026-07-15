import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";
import { Commentaire, type CommentaireData } from "./Commentaire.js";

export class CommentaireConsultationCache extends DatabaseCacheBase<number, Commentaire, CommentaireData> {
    nomTable = "commentaire";
    colonnesClePrimaire = ["id"];

    /**
     * Instancie un cache de commentaires pour une consultation spécifique.
     * @param consultationId L'identifiant de la consultation pour laquelle le cache de commentaires est créé.
     */
    constructor(consultationId: number) {
        super([consultationId]);
    }

    fromDatabase(data: CommentaireData): Commentaire {
        return new Commentaire(data);
    }

    getComposanteCache(element: Commentaire): number {
        return element.id;
    }
}