import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface EtiquetteData {
    id: number; // SMALLINT UNSIGNED en BDD
    nom: string;
    icone: string;
    /**
     * Code couleur au format HEX sans le symbole # (ex: "2ECC71")
     * Correspond au CHAR(6) de la base de données
     */
    couleur: string;
}

export class Etiquette extends ElementEnCacheBdd<EtiquetteData> {
    public id: number;
    public nom: string;
    public icone: string;
    public couleur: string;
    
    constructor(data: EtiquetteData) {
        super();
        this.id = data.id;
        this.nom = data.nom;
        this.icone = data.icone;
        this.couleur = data.couleur;
    }

    toData(): EtiquetteData {
        return {
            id: this.id,
            nom: this.nom,
            icone: this.icone,
            couleur: this.couleur
        };
    }
}