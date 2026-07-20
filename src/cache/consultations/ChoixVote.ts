import { ElementEnCacheBdd } from "../base/ElementEnCacheBdd.js";

export interface ChoixVoteData {
    id: number;
    nom: string;
    couleur: string;
    nb_votes: number;
}

export class ChoixVote extends ElementEnCacheBdd<ChoixVoteData> {
    public id: number;
    public nom: string;
    public couleur: string;
    public nbVotes: number;

    constructor(data: ChoixVoteData) {
        super();
        this.id = data.id;
        this.nom = data.nom;
        this.couleur = data.couleur;
        this.nbVotes = data.nb_votes ?? 0; // Initialiser à 0 si non fourni
    }

    toData(): ChoixVoteData {
        return {
            id: this.id,
            nom: this.nom,
            couleur: this.couleur,
            nb_votes: this.nbVotes
        };
    }
}