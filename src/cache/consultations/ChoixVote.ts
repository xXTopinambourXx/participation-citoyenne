import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface ChoixVoteData {
    id: number;
    nom: string;
    couleur: string;
}

export class ChoixVote extends ElementEnCacheBdd<ChoixVoteData> {
    public id: number;
    public nom: string;
    public couleur: string;

    constructor(data: ChoixVoteData) {
        super();
        this.id = data.id;
        this.nom = data.nom;
        this.couleur = data.couleur;
    }

    toData(): ChoixVoteData {
        return {
            id: this.id,
            nom: this.nom,
            couleur: this.couleur
        };
    }
}