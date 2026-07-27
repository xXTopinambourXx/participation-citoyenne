import { DatabaseCacheBase } from "../base/DatabaseCacheBase.js";
import { Utilisateur, type UtilisateurData } from "./Utilisateur.js";

export class UtilisateurCache extends DatabaseCacheBase<number, Utilisateur, UtilisateurData> {
    nomTable = "utilisateur";
    colonnesClePrimaire = ["id"];

    private aucunUtilisateurEnregistre: boolean | null = null;

    fromDatabase(data: UtilisateurData): Utilisateur {
        return new Utilisateur(data);
    }

    getComposanteCache(element: Utilisateur): number {
        return element.id;
    }

     /**
     * Renvoit vrai s'il n'y a aucun utilisateur enregistré dans la BDD.
     * @cache Résultat mis en cache.
     */
    public async isAucunUtilisateurEnregistre(): Promise<boolean> {
        if (this.aucunUtilisateurEnregistre === null) {
            const nbUtilisateurs = await this.count();
            this.aucunUtilisateurEnregistre = (nbUtilisateurs === 0);
        }
        return this.aucunUtilisateurEnregistre;
    }

}

export const utilisateurCache = new UtilisateurCache();