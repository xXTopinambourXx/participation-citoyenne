import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";
import { Utilisateur, type UtilisateurData } from "./Utilisateur.js";

export class UtilisateurCache extends DatabaseCacheBase<number, Utilisateur, UtilisateurData> {
    nomTable = "utilisateur";
    colonnesClePrimaire = ["id"];

    constructor() {
        super();
    }

    fromDatabase(data: UtilisateurData): Utilisateur {
        return new Utilisateur(data);
    }

    getComposanteCache(element: Utilisateur): number {
        return element.id;
    }
}